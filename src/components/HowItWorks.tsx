import React, { useState } from 'react';
import { School, SlidersHorizontal, PackageCheck, Check, ArrowRight, ShieldCheck, Truck, Sparkles, Box, Compass } from 'lucide-react';
import { HowItWorks3D } from './3d/HowItWorks3D';

interface HowItWorksProps {
  onStartOrder: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartOrder }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Select School & Grade',
      shortTitle: 'Select School',
      description:
        'Search your institution by name, city, or unique school code. Vanguard loads the verified syllabus signed off by your school administration.',
      details: [
        'Over 450+ CBSE, ICSE, Cambridge & IB schools registered',
        'Official academic edition lock — no outdated reprints',
        'Instant grade selection from Nursery through Grade 12',
      ],
      previewBadge: 'Verified Syllabus',
      previewContent: {
        headline: 'DPS R.K. Puram · Grade 6 CBSE',
        subtitle: 'Curriculum Code: CBSE-2026-VI-DEL',
        stats: '7 Textbooks · 9 Notebooks · 1 Almanac',
      },
    },
    {
      number: '02',
      title: 'Build Your Bundle',
      shortTitle: 'Build Bundle',
      description:
        'Review the mandatory textbook list and choose your optional add-ons: custom-slit book covers, school diary, geometry box, or premium art kits.',
      details: [
        'Books automatically stack into a certified bundle',
        'Pre-cut laminated protective covers with school crest',
        'Transparent itemized pricing with bundle savings',
      ],
      previewBadge: 'Flexible Add-Ons',
      previewContent: {
        headline: 'Included: 7 Textbooks + Ruled Notebook Set',
        subtitle: 'Add-ons: Pre-cut book covers (Selected) + Art kit (Optional)',
        stats: 'Bundle Savings: 8% off publisher MRP',
      },
    },
    {
      number: '03',
      title: 'Pay & Live Track',
      shortTitle: 'Pay & Track',
      description:
        'Bundle enters a reinforced delivery box and real-time tracking begins. Checkout securely with UPI or cards — no login required to track.',
      details: [
        'Tamper-evident reinforced packaging with hologram seal',
        'Live SMS & WhatsApp updates with courier GPS link',
        'Guaranteed delivery before the first day of school',
      ],
      previewBadge: 'No Login Required',
      previewContent: {
        headline: 'Order #VG-84920 · Dispatched for Doorstep Delivery',
        subtitle: 'Courier: BlueDart Priority · Delivery Window: Today, 5:30 PM',
        stats: 'Tamper-Proof Seal: SEAL-VG-7741-OK',
      },
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-50/80 border-y border-slate-200/80 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <p className="text-xs font-bold tracking-wider text-blue-700 uppercase">
            Interactive Visual Journey
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            How Vanguard Delivers Your School Books
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Eliminate chaotic queues outside stationery stores. Get the exact, school-approved 
            curriculum package packaged with care and delivered before the academic term starts.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => {
            const isSelected = activeStep === index;
            return (
              <div
                key={step.number}
                onClick={() => setActiveStep(index)}
                className={`relative bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-blue-600 ring-2 ring-blue-600/15 shadow-xl shadow-blue-900/10 -translate-y-1'
                    : 'border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-md hover:-translate-y-0.5'
                }`}
              >
                {/* Step Editorial Index */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-2xl font-extrabold text-blue-700">
                    {step.number}
                  </span>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md transition-colors ${
                    isSelected ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {step.previewBadge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-2.5 pt-4 border-t border-slate-100 text-xs text-slate-600">
                  {step.details.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Interactive 3D Step Visualizer Box */}
        <div className="mt-12 bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xl shadow-blue-900/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: 3D Animated Scene for the Step */}
            <div className="lg:col-span-5 bg-gradient-to-b from-blue-50/70 to-slate-100/50 rounded-2xl border border-blue-100/60 overflow-hidden relative">
              <HowItWorks3D stepIndex={activeStep} />
              
              <div className="absolute bottom-3 inset-x-0 text-center">
                <span className="backdrop-blur-md bg-white/80 border border-slate-200/80 px-3 py-1 rounded-full text-[11px] font-semibold text-slate-700 shadow-xs">
                  {activeStep === 0 && '3D School Model · Verified Syllabus'}
                  {activeStep === 1 && '3D Book Stacking · Custom Bundle'}
                  {activeStep === 2 && '3D Delivery Box · Live GPS Route'}
                </span>
              </div>
            </div>

            {/* Right Column: Step Narrative & Action */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                <span>Interactive Step {steps[activeStep].number}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-500">{steps[activeStep].shortTitle}</span>
              </div>

              <h4 className="text-xl sm:text-2xl font-bold text-slate-900">
                {steps[activeStep].previewContent.headline}
              </h4>
              
              <p className="text-sm text-slate-600">
                {steps[activeStep].previewContent.subtitle}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/60">
                  {steps[activeStep].previewContent.stats}
                </span>

                <button
                  onClick={onStartOrder}
                  className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-4.5 py-2.5 rounded-xl shadow-sm transition-all whitespace-nowrap active:scale-98"
                >
                  <span>Select School &amp; Order</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Stepper progress dots */}
              <div className="pt-4 flex items-center gap-2">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`h-2 rounded-full transition-all ${
                      activeStep === i ? 'w-8 bg-blue-700' : 'w-2 bg-slate-200 hover:bg-slate-300'
                    }`}
                    aria-label={`Go to step ${i + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
