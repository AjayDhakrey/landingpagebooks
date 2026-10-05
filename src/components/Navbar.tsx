import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenTrack: () => void;
  onOpenCart: () => void;
  onOpenStaffLogin: () => void;
  cart: CartItem[];
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenTrack,
  onOpenCart,
  onOpenStaffLogin,
  cart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartCount = cart.length;

  const handleMobileNavClick = (callback: () => void) => {
    setMobileMenuOpen(false);
    callback();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/90 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single Brand Wordmark */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-slate-900 group shrink-0 focus-visible:outline-2 focus-visible:outline-blue-600 rounded-md"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-blue-800 transition-colors">
            V
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">
            Bookstore<span className="text-blue-600">.</span>
          </span>
        </a>

        {/* Zone 2: Clean Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <a
            href="#schools"
            className="hover:text-blue-700 transition-colors py-1 hover:underline underline-offset-8"
          >
            Find My School
          </a>
          <a
            href="#how-it-works"
            className="hover:text-blue-700 transition-colors py-1 hover:underline underline-offset-8"
          >
            How It Works
          </a>
          <a
            href="#track-order"
            onClick={(e) => {
              e.preventDefault();
              onOpenTrack();
              const el = document.getElementById('track-order');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-blue-700 transition-colors py-1 hover:underline underline-offset-8"
          >
            Track Order
          </a>
          <a
            href="#for-schools"
            className="hover:text-blue-700 transition-colors py-1 hover:underline underline-offset-8"
          >
            For Schools & Partners
          </a>
          <a
            href="#faqs"
            className="hover:text-blue-700 transition-colors py-1 hover:underline underline-offset-8"
          >
            FAQs
          </a>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Cart preview button if items in cart */}
          {totalCartCount > 0 && (
            <button
              onClick={onOpenCart}
              className="relative p-2 text-slate-700 hover:text-blue-700 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label={`Shopping bag with ${totalCartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center tabular-nums shadow-xs">
                {totalCartCount}
              </span>
            </button>
          )}

          <button
            onClick={onOpenStaffLogin}
            className="hidden sm:inline-flex text-xs font-semibold text-slate-700 hover:text-blue-700 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap"
          >
            Staff & Admin Login
          </button>

          <button
            onClick={onOpenSearch}
            className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-medium text-xs sm:text-sm px-3.5 py-2 sm:px-4.5 sm:py-2.5 rounded-xl shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-blue-600 whitespace-nowrap active:scale-98"
          >
            <Search className="w-4 h-4" />
            <span className="hidden xs:inline">Order School Books</span>
            <span className="xs:hidden">Order</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 lg:hidden transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 pt-3 pb-5 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <a
            href="#schools"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            Find My School
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            How It Works
          </a>
          <button
            onClick={() => handleMobileNavClick(onOpenTrack)}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100 flex items-center justify-between"
          >
            <span>Track Order (No Login)</span>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </button>
          <a
            href="#for-schools"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            For Schools &amp; Partners
          </a>
          <a
            href="#faqs"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            FAQs
          </a>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => handleMobileNavClick(onOpenStaffLogin)}
              className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-600 hover:text-blue-700"
            >
              Staff &amp; Admin Portal Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

