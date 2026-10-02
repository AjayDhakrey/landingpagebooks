import React, { useState } from 'react';
import { CartItem, OrderTrackingInfo } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2, CreditCard, Sparkles, MapPin, User } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveItem: (id: string) => void;
  onOrderSuccess: (order: OrderTrackingInfo) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onRemoveItem,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [studentName, setStudentName] = useState('Aarav Sharma');
  const [studentRoll, setStudentRoll] = useState('Sec B / Roll #14');
  const [parentName, setParentName] = useState('Sunita Sharma');
  const [phone, setPhone] = useState('+91 98110 54321');
  const [address, setAddress] = useState('Apartment 604, Tower 3, DLF Phase 5, Gurugram, Haryana 122009');
  const [paymentMode, setPaymentMode] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      const generatedOrderId = `VG-${randomNum}`;

      const primaryItem = cart[0];
      const newOrder: OrderTrackingInfo = {
        orderId: generatedOrderId,
        customerName: studentName ? `${studentName} (c/o ${parentName})` : parentName,
        customerPhone: phone,
        schoolName: primaryItem.schoolName,
        schoolCode: primaryItem.schoolCode,
        grade: `${primaryItem.grade} Bundle`,
        orderDate: 'Just Now · October 2026',
        estimatedDelivery: 'Tomorrow by 4:00 PM',
        currentStatus: 'placed',
        statusDescription: 'Order confirmed. Student syllabus matched with school registrar. Packaging in progress.',
        carrier: 'Vanguard Express Logistics',
        trackingNumber: `VG-EXP-${randomNum}`,
        shippingAddress: address,
        packageDetails: {
          weightKg: '4.5 kg',
          totalBooks: primaryItem.selectedBooks.length,
          totalNotebooks: primaryItem.selectedNotebooks.reduce((a, b) => a + b.quantity, 0),
          tamperProofSealId: `SEAL-VG-${randomNum}-SEC`,
        },
        totalAmount: subtotal,
        timeline: [
          {
            status: 'placed',
            title: 'Order Placed & Verified',
            description: 'Curriculum bundle payment verified. Dispatch order transmitted to regional center.',
            timestamp: 'Just Now',
            completed: true,
            active: true,
          },
          {
            status: 'preparing',
            title: 'Picking & Tamper-Proof Sealing',
            description: 'Barcode scanning of all textbooks & custom book cover packing.',
            timestamp: 'Scheduled Today, 2:00 PM',
            completed: false,
            active: false,
          },
          {
            status: 'dispatched',
            title: 'Out for Doorstep Delivery',
            description: 'Handover to priority delivery executive.',
            timestamp: 'Scheduled Tomorrow, 09:00 AM',
            completed: false,
            active: false,
          },
          {
            status: 'delivered',
            title: 'Doorstep Delivery',
            description: 'OTP confirmation upon package handover.',
            timestamp: 'Expected Tomorrow, 04:00 PM',
            completed: false,
            active: false,
          },
        ],
      };

      onOrderSuccess(newOrder);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden text-slate-800"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-700" />
            <h3 id="cart-drawer-title" className="font-bold text-slate-900 text-lg">
              Student Order Bag ({cart.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="font-semibold text-slate-700 text-sm">Your order bag is empty</p>
              <p className="text-slate-500 max-w-xs mx-auto text-xs">
                Select your school from the directory and customize your student&rsquo;s grade booklist bundle to get started.
              </p>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                <p className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  Selected Curriculum Bundles
                </p>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 relative"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-mono font-semibold text-blue-700">
                          {item.schoolCode} · {item.grade}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm mt-0.5">
                          {item.schoolName}
                        </h4>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                        title="Remove bundle"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-slate-600 text-[11px] space-y-0.5">
                      <p>• {item.selectedBooks.length} Prescribed Official Textbooks</p>
                      <p>• {item.selectedNotebooks.length} Ruled Exercise Books &amp; Practical Registers</p>
                      <p>• {item.selectedStationery.length} School Stationery Add-Ons &amp; Almanac</p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                      <span className="text-emerald-700 font-semibold text-[11px]">
                        School-Verified Package
                      </span>
                      <span className="font-mono text-sm font-bold text-slate-900 tabular-nums">
                        ₹{item.totalPrice}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Student & Delivery Information */}
              <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4 pt-2">
                <p className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  Student &amp; Delivery Details
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-blue-600 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">
                      Section / Roll No (Optional)
                    </label>
                    <input
                      type="text"
                      value={studentRoll}
                      onChange={(e) => setStudentRoll(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-blue-600 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">
                      Parent / Guardian Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-blue-600 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">
                      WhatsApp Mobile No *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-blue-600 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">
                    Doorstep Delivery Address *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-blue-600 font-medium"
                  />
                </div>

                {/* Payment Mode Selector */}
                <div>
                  <label className="block text-slate-600 font-medium mb-1.5">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'upi', label: 'UPI / GPay' },
                      { id: 'card', label: 'Cards' },
                      { id: 'netbanking', label: 'Net Banking' },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setPaymentMode(mode.id as any)}
                        className={`p-2 rounded-lg border font-semibold text-center transition-colors ${
                          paymentMode === mode.id
                            ? 'border-blue-600 bg-blue-50 text-blue-800'
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Footer with Total & CTA */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-slate-200 bg-slate-50 shrink-0 space-y-4">
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span>Subtotal ({cart.length} Bundles)</span>
                <span className="font-mono font-semibold text-slate-900 tabular-nums">₹{subtotal}</span>
              </div>
              <div className="flex items-center justify-between text-emerald-700">
                <span>Standard Doorstep Shipping</span>
                <span className="font-semibold">FREE</span>
              </div>
              <div className="flex items-center justify-between text-slate-900 font-bold text-sm pt-2 border-t border-slate-200">
                <span>Total Payable</span>
                <span className="font-mono text-lg font-black text-blue-900 tabular-nums">₹{subtotal}</span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              disabled={isProcessing}
              className="w-full inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm py-3 rounded-xl shadow-md transition-all active:scale-98 disabled:opacity-60"
            >
              {isProcessing ? (
                <span>Generating Order &amp; Routing...</span>
              ) : (
                <>
                  <span>Confirm Order &amp; Track Live</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Secure Checkout · Zero Login Required to Track</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
