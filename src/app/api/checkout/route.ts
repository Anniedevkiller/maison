import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { DISHES } from '@/data/dishes';
import { sendOrderEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // 1. Authenticate user session
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required. Please sign in to place your pre-order.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { items, customer, fulfilmentType } = body;

    // 2. Server Validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Your cart is empty.' }, { status: 400 });
    }

    if (!customer?.name || typeof customer.name !== 'string' || customer.name.trim() === '') {
      return NextResponse.json({ error: 'Full name is required.' }, { status: 400 });
    }

    if (!customer?.phone || typeof customer.phone !== 'string' || customer.phone.trim() === '') {
      return NextResponse.json({ error: 'Phone number is required.' }, { status: 400 });
    }

    if (fulfilmentType === 'delivery') {
      if (!customer?.address || typeof customer.address !== 'string' || customer.address.trim() === '') {
        return NextResponse.json({ error: 'Delivery address is required for private delivery.' }, { status: 400 });
      }
    }

    // Minimum 48 hours date validation
    if (!customer?.date) {
      return NextResponse.json({ error: 'Pre-order date is required.' }, { status: 400 });
    }

    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 2);
    minDate.setHours(0, 0, 0, 0);

    const chosenDate = new Date(customer.date);
    if (chosenDate < minDate) {
      return NextResponse.json(
        { error: 'Pre-order date must be at least 48 hours in advance for slow-woodfire preparation.' },
        { status: 400 }
      );
    }

    // 3. Server Price Recalculation (Never trust browser total)
    let calculatedSubtotal = 0;
    const validatedItems: {
      dishSlug: string;
      dishName: string;
      portionName: string;
      quantity: number;
      unitPrice: number;
    }[] = [];

    for (const item of items) {
      const dish = DISHES.find((d) => d.id === item.dishId || d.slug === item.dishSlug);
      if (!dish) {
        return NextResponse.json({ error: `Dish "${item.dishName || 'Unknown'}" is invalid.` }, { status: 400 });
      }

      const portion = dish.portions.find((p) => p.name === item.portionName) || dish.portions[0];
      const unitPrice = Math.round(dish.price * (portion?.priceMultiplier || 1));
      const qty = Math.max(1, parseInt(item.quantity, 10) || 1);

      calculatedSubtotal += unitPrice * qty;

      validatedItems.push({
        dishSlug: dish.slug,
        dishName: dish.name,
        portionName: portion.name,
        quantity: qty,
        unitPrice,
      });
    }

    const deliveryFee = fulfilmentType === 'delivery' ? 5000 : 0;
    const serverTotal = calculatedSubtotal + deliveryFee;

    // 4. Insert into `orders` table
    const { data: order, error: orderInsertError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        email: user.email || customer.email,
        name: customer.name.trim(),
        phone: customer.phone.trim(),
        fulfilment_type: fulfilmentType,
        address: fulfilmentType === 'delivery' ? customer.address.trim() : null,
        preorder_date: customer.date,
        time_slot: customer.timeSlot || '18:00 - 20:00 (Evening Feast)',
        notes: customer.notes ? customer.notes.trim() : '',
        total: serverTotal,
        status: 'pending',
      })
      .select()
      .single();

    if (orderInsertError || !order) {
      console.error('Database Order Insert Error:', orderInsertError);
      return NextResponse.json(
        { error: 'Failed to record pre-order in database. Please check your Supabase tables.' },
        { status: 500 }
      );
    }

    // 5. Insert into `order_items` table
    const orderItemsPayload = validatedItems.map((item) => ({
      order_id: order.id,
      dish_slug: item.dishSlug,
      dish_name: `${item.dishName} (${item.portionName})`,
      quantity: item.quantity,
      price: item.unitPrice,
    }));

    const { error: itemsInsertError } = await supabase
      .from('order_items')
      .insert(orderItemsPayload);

    if (itemsInsertError) {
      console.error('Database Order Items Insert Error:', itemsInsertError);
      // Rollback order insertion
      await supabase.from('orders').delete().eq('id', order.id);
      return NextResponse.json(
        { error: 'Failed to save order items. Pre-order rolled back.' },
        { status: 500 }
      );
    }

    // 6. Send Order Confirmation Email via Resend
    let emailSent = false;
    try {
      const emailResult = await sendOrderEmail(order, orderItemsPayload);
      emailSent = emailResult.success;
      if (!emailResult.success) {
        console.error('Checkout API: Order saved but email dispatch failed:', emailResult.error);
      }
    } catch (emailErr) {
      console.error('Checkout API: Unexpected error while sending order email:', emailErr);
    }

    // 7. Return success response
    return NextResponse.json({
      success: true,
      orderId: order.id,
      emailSent,
    });
  } catch (err: any) {
    console.error('Checkout API Exception:', err);
    return NextResponse.json(
      { error: err.message || 'An unexpected server error occurred.' },
      { status: 500 }
    );
  }
}
