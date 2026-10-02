import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

export const metadata: Metadata = {
  title: 'Maison Jollof | Pre-Order Haute Cuisine West African Dishes',
  description: 'Maison Jollof presents West African culinary heritage with European fine-dining culture. Tagline: From the pot to the table. Reserve your woodfired pre-order feast.',
  keywords: ['Maison Jollof', 'West African Fine Dining', 'Jollof Pre-Order', 'Lagos Fine Dining', 'Suya Ribeye', 'African Haute Cuisine'],
  authors: [{ name: 'Maison Jollof' }],
  openGraph: {
    title: 'Maison Jollof | From the pot to the table',
    description: 'An haute cuisine tribute to West African culinary heritage, crafted with European fine-dining culture.',
    url: 'https://maisonjollof.com',
    siteName: 'Maison Jollof',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Maison Jollof Signature Pot',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#FAF7F2] text-[#0B201A] font-sans antialiased selection:bg-[#C5A059] selection:text-[#0B201A] bg-grain min-h-screen flex flex-col">
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
