import React, { useState } from 'react';
import { 
  Building2, 
  BarChart3, 
  Layers, 
  ShoppingCart, 
  BadgeDollarSign, 
  Truck, 
  ArrowRight, 
  CheckCircle2, 
  FileSpreadsheet, 
  ScanLine, 
  Warehouse,
  ShieldCheck,
  Sparkles,
  Store
} from 'lucide-react';
import { B2BSupplyChain3D } from './3d/B2BSupplyChain3D';

interface B2BSectionProps {
  onRequestDemo: () => void;
}

export const B2BSection: React.FC<B2BSectionProps> = ({ onRequestDemo }) => {
  const [activeTab, setActiveTab] = useState<'forecasting' | 'pos' | 'po' | 'reconciliation'>('forecasting');

  const b2bFeatures = [
    {
      id: 'forecasting',
      label: 'Demand Forecasting',
      title: 'Predict Exact Enrollment Print Runs',
      description:
        'Vanguard aggregates student registration numbers across sections and grades to calculate precise textbook order quantities. Eliminate over-ordering stock and prevent mid-term stockouts.',
      metrics: [
        { label: 'Inventory Waste Reduction', value: '94%' },
        { label: 'Turnaround Time', value: '3 Days' },
        { label: 'Active Affiliated Campuses', value: '450+' },
      ],
      previewHeadline: 'Automated Class Strength Aggregator',
      previewItems: [
        { label: 'Grade 6 CBSE (Sections A–F)', projected: '240 Bundles', ordered: '240 Reserved' },
        { label: 'Grade 7 CBSE (Sections A–E)', projected: '210 Bundles', ordered: '210 Reserved' },
        { label: 'Grade 8 CBSE (Sections A–G)', projected: '280 Bundles', ordered: '280 Reserved' },
      ],
    },
    {
      id: 'pos',
      label: 'Store & Campus POS',
      title: 'High-Speed Campus Distribution Terminal',
      description:
        'Deploy our cloud-synchronized web and tablet POS directly in your school bookstore or annual book distribution counters. Supports barcode scanning, student roll-lookup, and instant digital invoicing.',
      metrics: [
        { label: 'Parent Counter Wait Time', value: '<45s' },
        { label: 'Offline Sync Support', value: '100%' },
        { label: 'Direct School ERP Hook', value: 'REST API' },
      ],
      previewHeadline: 'Campus POS Terminal · Live Station #03',
      previewItems: [
        { label: 'Student Lookup: Aarav Sharma (Gr 6B)', projected: 'Roll #18', ordered: 'Bundle Paid' },
        { label: 'Barcode Scan: 978-81-7450-524-8', projected: 'NCERT Exemplar', ordered: 'Verified OK' },
        { label: 'Student Almanac & Diary', projected: 'DPS Customized', ordered: 'Allocated' },
      ],
    },
    {
      id: 'po',
      label: 'Publisher POs',
      title: 'Direct Purchase Orders with Tier-1 Publishers',
      description:
        'Automate institutional procurement with Oxford University Press, Cambridge, Pearson, NCERT, and regional educational publishers. Instant wholesale discount application and shipment tracing.',
      metrics: [
        { label: 'Direct Publisher Ties', value: '60+' },
        { label: 'Wholesale Discount Edge', value: 'Up to 24%' },
        { label: 'Automated PO Dispatch', value: 'Instant' },
      ],
      previewHeadline: 'Enterprise Procurement Manifest',
      previewItems: [
        { label: 'PO-2026-OUP-091 · Oxford Univ Press', projected: '1,450 Units', ordered: 'In Transit' },
        { label: 'PO-2026-NCERT-442 · NCERT Official', projected: '3,800 Units', ordered: 'Dock Received' },
        { label: 'PO-2026-SELINA-108 · Selina ICSE', projected: '920 Units', ordered: 'Dispatched' },
      ],
    },
    {
      id: 'reconciliation',
      label: 'Payments & Reconciliation',
      title: 'Automated Multi-Party Ledger & Escrow',
      description:
        'Eliminate manual spreadsheets and reconciliation headaches. Vanguard automatically splits transaction payouts between publisher invoices, distributor margins, and school administrative royalties with instant audit reports.',
      metrics: [
        { label: 'Reconciliation Speed', value: 'Same-Day' },
        { label: 'Audit Compliance', value: 'GST & TDS Auto' },
        { label: 'Disputed Transactions', value: '<0.02%' },
      ],
      previewHeadline: 'Real-Time Financial Settlement Hub',
      previewItems: [
        { label: 'Campus Sale Split #4891', projected: '₹2,840', ordered: 'Publisher ₹2,100 / Fee ₹740' },
        { label: 'Daily School Royalty Batch', projected: '₹1,42,800', ordered: 'Settled to School Trust' },
        { label: 'GST Input Credit Invoice', projected: '18% ITC', ordered: 'Generated' },
      ],
    },
  ];

  const currentTab = b2bFeatures.find((f) => f.id === activeTab) || b2bFeatures[0];

  return (
    <section id="for-schools" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Background architectural mesh */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">
              B2B Enterprise Distribution ERP
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-balance">
              The Complete Distribution Platform for Schools &amp; Publishers
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Vanguard modernizes the entire textbook supply chain. From admission pre-orders 
              and publisher purchase orders to on-campus POS counters and automated financial reconciliation.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={onRequestDemo}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all duration-200 group"
            >
              <span>Request Institutional Demo</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* 3D Supply Chain & Warehouse Visualization Feature */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-300">
              Interactive 3D Supply Chain &amp; Automated Warehouse Engine
            </h3>
          </div>
          <B2BSupplyChain3D />
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 mb-10 text-xs sm:text-sm font-semibold">
          {b2bFeatures.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all duration-200 flex items-center gap-2 hover:scale-105 active:scale-95 ${
                activeTab === tab.id
                  ? 'bg-blue-700 text-white shadow-md shadow-blue-600/30 ring-2 ring-blue-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Details Column */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {currentTab.title}
            </h3>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {currentTab.description}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800">
              {currentTab.metrics.map((metric, i) => (
                <div key={i} className="space-y-1 p-2 rounded-xl hover:bg-slate-800/50 transition-colors duration-200 hover:scale-105">
                  <p className="text-2xl sm:text-3xl font-black text-white font-mono tabular-nums">
                    {metric.value}
                  </p>
                  <p className="text-xs text-slate-400 font-medium">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={onRequestDemo}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1.5 transition-all duration-200 hover:translate-x-1 group"
              >
                <span>Learn how Vanguard deploys in 48 hours</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Interactive B2B Dashboard Console Simulator */}
          <div className="lg:col-span-6">
            <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-5 sm:p-6 shadow-2xl backdrop-blur-xs space-y-4 hover:border-slate-600 hover:shadow-blue-900/20 transition-all duration-300">
              
              {/* Console Header Bar */}
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 ml-2">
                    Vanguard Console · {currentTab.label}
                  </span>
                </div>
                
                <span className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Synced
                </span>
              </div>

              {/* Console Headline */}
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">
                  {currentTab.previewHeadline}
                </p>
              </div>

              {/* Data Rows */}
              <div className="space-y-2.5">
                {currentTab.previewItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between text-xs transition-all duration-200 hover:border-blue-500/40 hover:bg-slate-900 hover:translate-x-1 group"
                  >
                    <div>
                      <p className="font-semibold text-white group-hover:text-blue-300 transition-colors">{item.label}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{item.projected}</p>
                    </div>
                    <span className="font-mono text-xs font-bold text-blue-400 bg-blue-950/70 border border-blue-800 px-2.5 py-1 rounded-md tabular-nums group-hover:bg-blue-900 group-hover:text-white transition-colors">
                      {item.ordered}
                    </span>
                  </div>
                ))}
              </div>

              {/* Console Footer Stats */}
              <div className="p-3 bg-blue-950/40 rounded-xl border border-blue-900/50 flex items-center justify-between text-xs text-blue-200 hover:bg-blue-950/60 transition-colors">
                <span>Integrated with DPS, St. Xavier&rsquo;s &amp; 450+ Partner Trusts</span>
                <span className="font-semibold text-white">ISO 27001 Certified</span>
              </div>

            </div>
          </div>

        </div>

        {/* 4 Pillar Grid for B2B */}
        <div className="mt-20 pt-16 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group p-5 rounded-2xl bg-slate-800/40 border border-slate-800 hover:border-blue-500/40 hover:bg-slate-800/80 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-900/20 transition-all duration-300 space-y-2 cursor-default">
            <Warehouse className="w-5 h-5 text-blue-400 group-hover:scale-125 group-hover:rotate-6 transition-transform duration-300" />
            <h4 className="font-bold text-white text-base group-hover:text-blue-300 transition-colors">Multi-Campus Inventory</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time synchronization across branch campuses, regional warehouses, and school bookstores.
            </p>
          </div>

          <div className="group p-5 rounded-2xl bg-slate-800/40 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-800/80 hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-900/20 transition-all duration-300 space-y-2 cursor-default">
            <ScanLine className="w-5 h-5 text-emerald-400 group-hover:scale-125 group-hover:rotate-6 transition-transform duration-300" />
            <h4 className="font-bold text-white text-base group-hover:text-emerald-300 transition-colors">Barcode Verification</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zero packaging errors. Every bundle requires a complete ISBN scan before sealing tape application.
            </p>
          </div>

          <div className="group p-5 rounded-2xl bg-slate-800/40 border border-slate-800 hover:border-purple-500/40 hover:bg-slate-800/80 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-900/20 transition-all duration-300 space-y-2 cursor-default">
            <FileSpreadsheet className="w-5 h-5 text-purple-400 group-hover:scale-125 group-hover:rotate-6 transition-transform duration-300" />
            <h4 className="font-bold text-white text-base group-hover:text-purple-300 transition-colors">Publisher EDI Orders</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Direct automated purchase orders dispatched to NCERT, Oxford, Cambridge, and Selina without emails.
            </p>
          </div>

          <div className="group p-5 rounded-2xl bg-slate-800/40 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-800/80 hover:-translate-y-2 hover:shadow-xl hover:shadow-amber-900/20 transition-all duration-300 space-y-2 cursor-default">
            <BadgeDollarSign className="w-5 h-5 text-amber-400 group-hover:scale-125 group-hover:rotate-6 transition-transform duration-300" />
            <h4 className="font-bold text-white text-base group-hover:text-amber-300 transition-colors">Instant Escrow Payouts</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automated payment disbursements to publishers and schools upon verified delivery confirmation.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
