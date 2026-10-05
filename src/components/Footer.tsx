import React from 'react';
import { Phone, Mail, MessageSquare, ShieldCheck, MapPin, ExternalLink, Smartphone, Star, QrCode } from 'lucide-react';

interface FooterProps {
  onOpenTrack: () => void;
  onOpenStaffLogin: () => void;
  onRequestDemo: () => void;
  onSelectSchoolAnchor: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTrack,
  onOpenStaffLogin,
  onRequestDemo,
  onSelectSchoolAnchor,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top App Download CTA Banner */}
        <div className="mb-14 bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-800/40 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/15 transition-all" />
          
          {/* Left: App Pitch */}
          <div className="space-y-2 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-full text-blue-400 font-semibold text-[11px]">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Vanguard Mobile App for iOS &amp; Android</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Order Verified School Books on the Go
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              1-tap curriculum bundle ordering, instant ISBN lookup, live GPS courier tracking, 
              and direct school diary notifications right from your phone.
            </p>
            <div className="pt-1 flex items-center justify-center lg:justify-start gap-4 text-[11px] text-slate-400">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-bold text-white">4.9 / 5.0</span>
              </div>
              <span>·</span>
              <span>120,000+ Active Parents</span>
              <span>·</span>
              <span className="text-emerald-400 font-medium">Free Download</span>
            </div>
          </div>

          {/* Right: App Store & Google Play Download Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 z-10 shrink-0">
            
            {/* Apple App Store Button */}
            <a
              href="https://apple.com/app-store"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download on the Apple App Store"
              className="bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-500 text-white rounded-2xl px-5 py-3 flex items-center gap-3.5 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 group/app"
            >
              {/* Apple SVG Logo */}
              <svg className="w-7 h-7 text-white fill-current shrink-0 group-hover/app:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 7.17c.65-.8 1.1-1.91.98-3.03-.95.04-2.1.63-2.77 1.42-.59.68-1.11 1.77-.97 2.85 1.06.08 2.14-.54 2.76-1.24z"/>
              </svg>
              <div className="text-left leading-tight">
                <p className="text-[10px] text-slate-400 font-medium">Download on the</p>
                <p className="text-sm font-bold text-white tracking-wide">App Store</p>
              </div>
            </a>

            {/* Google Play Store Button */}
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get it on Google Play"
              className="bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-500 text-white rounded-2xl px-5 py-3 flex items-center gap-3.5 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 group/play"
            >
              {/* Google Play Multi-Color SVG Logo */}
              <svg className="w-7 h-7 shrink-0 group-hover/play:scale-110 transition-transform" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M3.609 1.814L13.793 12 3.61 22.186c-.365-.327-.61-.806-.61-1.386V3.2c0-.58.245-1.059.61-1.386z"/>
                <path fill="#FBBC05" d="M17.18 8.613L13.793 12l3.387 3.387 3.842-2.187c.725-.413.725-1.987 0-2.4L17.18 8.613z"/>
                <path fill="#34A853" d="M3.61 22.186L13.793 12l3.387 3.387-9.566 5.446c-.722.411-1.748.163-2.004-.647z"/>
                <path fill="#EA4335" d="M3.609 1.814c.256-.81 1.282-1.058 2.004-.647l9.566 5.446L13.793 12 3.609 1.814z"/>
              </svg>
              <div className="text-left leading-tight">
                <p className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">GET IT ON</p>
                <p className="text-sm font-bold text-white tracking-wide">Google Play</p>
              </div>
            </a>

          </div>
        </div>

        {/* 5 Column Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                V
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Vanguard<span className="text-blue-500">.</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              The modern school book &amp; stationery distribution platform connecting Parents, 
              Schools, Publishers, and Distributors into one synchronized educational network.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-slate-300 text-xs">
              <div className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>Parent Concierge: 1800-845-VANGUARD (Mon–Sat, 8am–8pm)</span>
              </div>
              <div className="flex items-center gap-2 hover:text-white transition-colors">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Order Support: +91 98112-BOOKLIST</span>
              </div>
            </div>
          </div>

          {/* Col 2: For Parents */}
          <div className="space-y-3">
            <p className="font-bold text-white uppercase tracking-wider text-[11px]">
              Parent Services
            </p>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onSelectSchoolAnchor}
                  className="hover:text-white transition-colors text-left"
                >
                  Find My School Booklist
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTrack}
                  className="hover:text-white transition-colors text-left"
                >
                  Track Order (No Login)
                </button>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How Book Bundles Work
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-white transition-colors">
                  Returns &amp; Replacements
                </a>
              </li>
              <li>
                <span className="text-emerald-400">Zero Missing Book Guarantee</span>
              </li>
            </ul>
          </div>

          {/* Col 3: For Schools & Partners */}
          <div className="space-y-3">
            <p className="font-bold text-white uppercase tracking-wider text-[11px]">
              Schools &amp; Publishers
            </p>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onRequestDemo}
                  className="hover:text-white transition-colors text-left"
                >
                  Request Institution Demo
                </button>
              </li>
              <li>
                <a href="#for-schools" className="hover:text-white transition-colors">
                  Campus POS Counter Software
                </a>
              </li>
              <li>
                <a href="#for-schools" className="hover:text-white transition-colors">
                  Demand Forecasting Engine
                </a>
              </li>
              <li>
                <a href="#for-schools" className="hover:text-white transition-colors">
                  Publisher Purchase Orders
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenStaffLogin}
                  className="text-blue-400 hover:text-blue-300 transition-colors font-medium flex items-center gap-1"
                >
                  <span>Staff &amp; Admin Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Regional Hubs & Trust */}
          <div className="space-y-3">
            <p className="font-bold text-white uppercase tracking-wider text-[11px]">
              Distribution Centers
            </p>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li>• New Delhi NCR Central Hub</li>
              <li>• Bengaluru Whitefield Hub</li>
              <li>• Mumbai Bhiwandi Logistics Depot</li>
              <li>• Hyderabad Gachibowli Node</li>
            </ul>
            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <p>Affiliated with CBSE, ICSE, Cambridge Assessment International Education &amp; IB World Schools.</p>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Meta */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <p>© {new Date().getFullYear()} Vanguard Distribution Technologies Inc. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#faqs" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#faqs" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <span>·</span>
            <a href="#faqs" className="hover:text-slate-300 transition-colors">Anti-Piracy Compliance</a>
            <span>·</span>
            <button onClick={onOpenStaffLogin} className="hover:text-slate-300 transition-colors">
              Staff Login
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
