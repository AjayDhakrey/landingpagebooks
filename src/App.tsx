import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { PartnerSchools } from './components/PartnerSchools';
import { BooklistModal } from './components/BooklistModal';
import { OrderTracking } from './components/OrderTracking';
import { B2BSection } from './components/B2BSection';
import { DemoRequestModal } from './components/DemoRequestModal';
import { CartDrawer } from './components/CartDrawer';
import { StaffLoginModal } from './components/StaffLoginModal';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { School, CartItem, OrderTrackingInfo } from './types';
import { SAMPLE_ORDERS } from './data/ordersData';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function App() {
  // Modal states
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [modalGrade, setModalGrade] = useState<string>('Grade 8');
  const [isBooklistOpen, setIsBooklistOpen] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isStaffLoginOpen, setIsStaffLoginOpen] = useState(false);

  // Active tracking order ID
  const [activeTrackingId, setActiveTrackingId] = useState<string>('VG-84920');

  // Success toast notification
  const [orderToast, setOrderToast] = useState<{
    orderId: string;
    message: string;
  } | null>(null);

  // Handlers
  const handleSelectSchoolGrade = (school: School, grade: string) => {
    setSelectedSchool(school);
    setModalGrade(grade);
    setIsBooklistOpen(true);
  };

  const handleSelectSchool = (school: School) => {
    setSelectedSchool(school);
    const available = Object.keys(school.booklists);
    setModalGrade(available[0] || 'Grade 8');
    setIsBooklistOpen(true);
  };

  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
    setIsBooklistOpen(false);
    setIsCartOpen(true);
  };

  const handleDirectCheckout = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
    setIsBooklistOpen(false);
    setIsCartOpen(true);
  };

  const handleRemoveCartItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOrderSuccess = (newOrder: OrderTrackingInfo) => {
    // Register dynamically in SAMPLE_ORDERS map
    SAMPLE_ORDERS[newOrder.orderId] = newOrder;
    setCart([]);
    setActiveTrackingId(newOrder.orderId);

    setOrderToast({
      orderId: newOrder.orderId,
      message: `Order #${newOrder.orderId} placed successfully! Doorstep delivery dispatched.`,
    });

    // Smooth scroll to track order section
    setTimeout(() => {
      const element = document.getElementById('track-order');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);

    setTimeout(() => {
      setOrderToast(null);
    }, 8000);
  };

  const scrollToSearch = () => {
    const input = document.getElementById('school-search-input');
    if (input) {
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      input.focus();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToTrack = () => {
    const el = document.getElementById('track-order');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSchools = () => {
    const el = document.getElementById('schools');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      {/* Top Banner Notice */}
      <div className="bg-blue-900 text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span>Academic Year 2026–2027 Bundles Now Live for Over 450+ Partner Schools.</span>
        <button
          onClick={scrollToSchools}
          className="underline hover:text-blue-200 ml-1 font-semibold"
        >
          View School Directory
        </button>
      </div>

      {/* Primary Top Bar */}
      <Navbar
        onOpenSearch={scrollToSearch}
        onOpenTrack={scrollToTrack}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenStaffLogin={() => setIsStaffLoginOpen(true)}
        cart={cart}
      />

      {/* Floating Order Toast when an order is created */}
      {orderToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-xs">{orderToast.message}</p>
            <p className="text-[11px] text-slate-400">Viewing real-time tracker below.</p>
          </div>
          <button
            onClick={() => setOrderToast(null)}
            className="text-slate-400 hover:text-white text-xs ml-2"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero Section with Prominent School Search & Verified Bundle Preview */}
        <Hero
          onSelectSchoolGrade={handleSelectSchoolGrade}
          onOpenTrack={scrollToTrack}
        />

        {/* 2. How It Works (Simple 3-step visual) */}
        <HowItWorks onStartOrder={scrollToSearch} />

        {/* 3. Partner Schools Cards Grid */}
        <PartnerSchools onSelectSchool={handleSelectSchool} />

        {/* 4. Order Tracking (No Login Required) */}
        <OrderTracking initialOrderId={activeTrackingId} />

        {/* 5. For Schools & Distributors (B2B Platform) */}
        <B2BSection onRequestDemo={() => setIsDemoOpen(true)} />

        {/* 6. Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenTrack={scrollToTrack}
        onOpenStaffLogin={() => setIsStaffLoginOpen(true)}
        onRequestDemo={() => setIsDemoOpen(true)}
        onSelectSchoolAnchor={scrollToSchools}
      />

      {/* Modals & Drawers */}
      <BooklistModal
        school={selectedSchool}
        initialGrade={modalGrade}
        isOpen={isBooklistOpen}
        onClose={() => setIsBooklistOpen(false)}
        onAddToCart={handleAddToCart}
        onDirectCheckout={handleDirectCheckout}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveItem={handleRemoveCartItem}
        onOrderSuccess={handleOrderSuccess}
      />

      <DemoRequestModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />

      <StaffLoginModal
        isOpen={isStaffLoginOpen}
        onClose={() => setIsStaffLoginOpen(false)}
      />
    </div>
  );
}
