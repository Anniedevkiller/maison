import { Resend } from 'resend';

export interface EmailOrderPayload {
  id: string;
  email: string;
  name: string;
  phone: string;
  fulfilment_type: 'delivery' | 'pickup' | string;
  address?: string | null;
  preorder_date: string;
  time_slot: string;
  notes?: string | null;
  total: number;
  status?: string;
}

export interface EmailOrderItemPayload {
  dish_name: string;
  quantity: number;
  price: number;
}

function escapeHtml(str: string | null | undefined): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatPrice(amount: number): string {
  return '₦' + new Intl.NumberFormat('en-NG', {
    maximumFractionDigits: 0,
  }).format(amount || 0);
}

/**
 * Sends order confirmation email via Resend to the customer.
 * Should only be called from server environments (API routes / server actions).
 */
export async function sendOrderEmail(
  order: EmailOrderPayload,
  items: EmailOrderItemPayload[]
): Promise<{ success: boolean; error?: any; id?: string }> {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('Resend Email Error: RESEND_API_KEY environment variable is not set.');
      return {
        success: false,
        error: new Error('RESEND_API_KEY environment variable is not set.'),
      };
    }

    const resend = new Resend(apiKey);
    const fromEmail = process.env.FROM_EMAIL || 'Maison Jollof <onboarding@resend.dev>';
    const recipientEmail = order.email;

    if (!recipientEmail) {
      console.error('Resend Email Error: Recipient email address is missing.');
      return {
        success: false,
        error: new Error('Recipient email address is missing.'),
      };
    }

    const orderRef = order.id ? order.id.slice(0, 8).toUpperCase() : 'RESERVATION';
    const safeName = escapeHtml(order.name);
    const safeAddress = escapeHtml(order.address || '');
    const safeNotes = escapeHtml(order.notes || '');
    const safeDate = escapeHtml(order.preorder_date);
    const safeTimeSlot = escapeHtml(order.time_slot);
    const safePhone = escapeHtml(order.phone);
    const isDelivery = order.fulfilment_type === 'delivery';

    const formattedItems = items.map((item) => ({
      name: escapeHtml(item.dish_name),
      quantity: item.quantity,
      unitPrice: item.price,
      totalPrice: item.price * item.quantity,
    }));

    // Plain Text Version
    const textContent = `
Dear ${order.name},

Thank you for your pre-order reservation with Maison Jollof!

========================================
ORDER CONFIRMATION: #${orderRef}
========================================

Pre-Order Date: ${order.preorder_date}
Time Slot: ${order.time_slot}
Fulfilment: ${isDelivery ? 'Private Delivery' : 'Maison Pickup'}
Phone: ${order.phone}
${isDelivery && order.address ? `Delivery Address: ${order.address}\n` : ''}${order.notes ? `Chef Instructions: ${order.notes}\n` : ''}
RESERVED COURSES:
----------------------------------------
${formattedItems
  .map(
    (item) =>
      `• ${item.name} (${item.quantity}x) - ${formatPrice(item.totalPrice)}`
  )
  .join('\n')}
----------------------------------------
Total Recorded Amount: ${formatPrice(order.total)}

Our culinary team is preparing your woodfired feast with slow-cooked precision. We look forward to serving you.

Warm regards,
The Maison Jollof Culinary Team
Maison Jollof — From the pot to the table
`.trim();

    // HTML Version with inline CSS (Cream, Deep Green, Gold)
    const itemsTableRows = formattedItems
      .map(
        (item) => `
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #EFEAE1; color: #0B201A; font-weight: 500;">
          ${item.name}
        </td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #EFEAE1; color: #2B4C40; text-align: center;">
          ${item.quantity}
        </td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #EFEAE1; color: #0B201A; font-weight: bold; text-align: right;">
          ${formatPrice(item.totalPrice)}
        </td>
      </tr>
    `
      )
      .join('');

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Pre-Order Confirmation #${orderRef}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF7F2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0B201A; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FAF7F2; padding: 40px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #FFFDF9; border: 1px solid #C5A059; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(11, 32, 26, 0.08);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #0B201A; padding: 32px 24px; text-align: center; border-bottom: 3px solid #C5A059;">
              <h1 style="margin: 0; color: #C5A059; font-family: Georgia, serif; font-size: 26px; letter-spacing: 2px; text-transform: uppercase;">
                Maison Jollof
              </h1>
              <p style="margin: 6px 0 0 0; color: #FAF7F2; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; font-weight: 300;">
                From the pot to the table
              </p>
            </td>
          </tr>

          <!-- Main Body Content -->
          <tr>
            <td style="padding: 32px 28px;">
              <p style="margin: 0 0 16px 0; font-size: 16px; font-weight: bold; color: #0B201A;">
                Dear ${safeName},
              </p>
              <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.6; color: #2B4C40;">
                Thank you for placing your pre-order reservation with <strong>Maison Jollof</strong>. Your feast has been recorded in our culinary registry and will be slow-cooked over woodfire for your reserved date.
              </p>

              <!-- Reservation Meta Box -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FAF7F2; border: 1px solid rgba(197, 160, 89, 0.3); border-radius: 10px; margin-bottom: 24px; padding: 16px;">
                <tr>
                  <td style="padding: 4px 8px; font-size: 12px; color: #2B4C40; width: 40%;">Order Reference:</td>
                  <td style="padding: 4px 8px; font-size: 13px; font-weight: bold; color: #C5A059;">#${orderRef}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 8px; font-size: 12px; color: #2B4C40;">Pre-Order Date:</td>
                  <td style="padding: 4px 8px; font-size: 13px; font-weight: bold; color: #0B201A;">${safeDate}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 8px; font-size: 12px; color: #2B4C40;">Time Slot:</td>
                  <td style="padding: 4px 8px; font-size: 13px; font-weight: bold; color: #0B201A;">${safeTimeSlot}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 8px; font-size: 12px; color: #2B4C40;">Fulfilment Option:</td>
                  <td style="padding: 4px 8px; font-size: 13px; font-weight: bold; color: #0B201A;">
                    ${isDelivery ? 'Private Delivery (Insulated Thermal Box)' : 'Maison Pickup (Victoria Island)'}
                  </td>
                </tr>
                ${
                  isDelivery && safeAddress
                    ? `
                <tr>
                  <td style="padding: 4px 8px; font-size: 12px; color: #2B4C40; vertical-align: top;">Delivery Address:</td>
                  <td style="padding: 4px 8px; font-size: 13px; color: #0B201A;">${safeAddress}</td>
                </tr>
                `
                    : ''
                }
                <tr>
                  <td style="padding: 4px 8px; font-size: 12px; color: #2B4C40;">Contact Phone:</td>
                  <td style="padding: 4px 8px; font-size: 13px; color: #0B201A;">${safePhone}</td>
                </tr>
                ${
                  safeNotes
                    ? `
                <tr>
                  <td style="padding: 4px 8px; font-size: 12px; color: #2B4C40; vertical-align: top;">Chef Instructions:</td>
                  <td style="padding: 4px 8px; font-size: 13px; font-style: italic; color: #2B4C40;">${safeNotes}</td>
                </tr>
                `
                    : ''
                }
              </table>

              <!-- Reserved Dishes Table -->
              <h3 style="margin: 0 0 12px 0; font-family: Georgia, serif; font-size: 16px; color: #0B201A; text-transform: uppercase; letter-spacing: 1px;">
                Reserved Courses
              </h3>
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; margin-bottom: 24px; font-size: 13px;">
                <thead>
                  <tr style="background-color: #0B201A; color: #C5A059;">
                    <th style="padding: 10px 16px; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Course</th>
                    <th style="padding: 10px 16px; text-align: center; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Qty</th>
                    <th style="padding: 10px 16px; text-align: right; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsTableRows}
                </tbody>
              </table>

              <!-- Total Banner -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top: 2px solid #C5A059; padding-top: 16px; margin-bottom: 32px;">
                <tr>
                  <td style="font-family: Georgia, serif; font-size: 16px; font-weight: bold; color: #0B201A;">
                    Total Recorded Amount
                  </td>
                  <td style="font-family: Georgia, serif; font-size: 22px; font-weight: bold; color: #C5A059; text-align: right;">
                    ${formatPrice(order.total)}
                  </td>
                </tr>
              </table>

              <!-- Sign Off -->
              <p style="margin: 0 0 6px 0; font-size: 14px; color: #0B201A;">
                Warmest regards,
              </p>
              <p style="margin: 0; font-family: Georgia, serif; font-size: 15px; font-weight: bold; color: #0B201A;">
                The Maison Jollof Culinary Team
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #FAF7F2; padding: 20px 24px; text-align: center; border-top: 1px solid #EFEAE1; font-size: 11px; color: #2B4C40; line-height: 1.5;">
              <p style="margin: 0;">Maison Jollof • West African Fine Dining • Victoria Island, Lagos</p>
              <p style="margin: 4px 0 0 0; color: #C5A059;">From the pot to the table</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    const response = await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
      subject: `Order Confirmation #${orderRef} - Maison Jollof`,
      html: htmlContent,
      text: textContent,
    });

    if (response.error) {
      console.error('Full Resend Error on Server:', response.error);
      return { success: false, error: response.error };
    }

    console.log('Confirmation email dispatched via Resend:', response.data);
    return { success: true, id: response.data?.id };
  } catch (err: any) {
    console.error('Full Resend Exception on Server:', err);
    return { success: false, error: err };
  }
}
