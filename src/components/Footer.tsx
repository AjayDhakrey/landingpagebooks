import React from 'react';
import { Phone, Mail, MessageSquare, ShieldCheck, MapPin, ExternalLink } from 'lucide-react';

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
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>Parent Concierge: 1800-845-VANGUARD (Mon–Sat, 8am–8pm)</span>
              </div>
              <div className="flex items-center gap-2">
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
          <div className="flex items-center gap-4">
            <a href="#faqs" className="hover:text-slate-300">Privacy Policy</a>
            <span>·</span>
            <a href="#faqs" className="hover:text-slate-300">Terms of Service</a>
            <span>·</span>
            <a href="#faqs" className="hover:text-slate-300">Anti-Piracy Compliance</a>
            <span>·</span>
            <button onClick={onOpenStaffLogin} className="hover:text-slate-300">
              Staff Login
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
