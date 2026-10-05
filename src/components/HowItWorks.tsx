import React, { useState, useEffect, useRef } from 'react';
import { Check, ArrowRight, Sparkles, Repeat, Pause, Play, Layers } from 'lucide-react';
import { HowItWorks3D } from './3d/HowItWorks3D';

interface HowItWorksProps {
  onStartOrder: () => void;
}

const STEP_DURATION = 4500; // 4.5 seconds per step

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartOrder }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoTransition, setIsAutoTransition] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100%

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
      shortTitle: '3D Book Stacking & Bundle',
      description:
        'Review the mandatory textbook list and choose your optional add-ons: custom-slit book covers, school diary, geometry box, or premium art kits.',
      details: [
        'Books automatically stack into a certified bundle in 3D',
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
      shortTitle: 'Pay & Live GPS Tracking',
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

  // Automatic transition timer & progress bar tick
  useEffect(() => {
    if (!isAutoTransition || isHovered) return;

    const intervalTime = 50; // update every 50ms
    const stepIncrement = (intervalTime / STEP_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStep((curr) => (curr + 1) % steps.length);
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isAutoTransition, isHovered, steps.length]);

  const handleStepSelect = (index: number) => {
    setActiveStep(index);
    setProgress(0);
  };

  return (
    <section id="how-it-works" className="py-20 bg-slate-50/80 border-y border-slate-200/80 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-100/70 border border-blue-200/80 px-3.5 py-1 rounded-full shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span>Interactive Visual Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            How Vanguard Delivers Your School Books
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Eliminate chaotic queues outside stationery stores. Get the exact, school-approved 
            curriculum package packaged with care and delivered before the academic term starts.
          </p>

          {/* Auto-Transition status bar */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => setIsAutoTransition((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold border transition-all duration-200 shadow-xs active:scale-95 ${
                isAutoTransition
                  ? 'bg-blue-600 border-blue-700 text-white hover:bg-blue-700'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
              title={isAutoTransition ? 'Click to pause automatic transitions' : 'Click to enable automatic transitions'}
            >
              {isAutoTransition ? (
                <>
                  <Pause className="w-3 h-3" />
                  <span>Auto Transition: {isHovered ? 'Paused (Hovering)' : 'Active (4.5s)'}</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3" />
                  <span>Auto Transition: Paused</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 3 Step Cards Grid */}
        <div 
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {steps.map((step, index) => {
            const isSelected = activeStep === index;
            return (
              <div
                key={step.number}
                onClick={() => handleStepSelect(index)}
                className={`group relative bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 border transition-all duration-300 cursor-pointer overflow-hidden ${
                  isSelected
                    ? 'border-blue-600 ring-2 ring-blue-600/20 shadow-xl shadow-blue-900/10 -translate-y-2 scale-[1.015]'
                    : 'border-slate-200/90 hover:border-blue-300 shadow-sm hover:shadow-lg hover:shadow-blue-900/5 hover:-translate-y-1'
                }`}
              >
                {/* Active progress countdown line */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-blue-100 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-75 ease-linear"
                      style={{
                        width: isAutoTransition && !isHovered ? `${progress}%` : '100%',
                      }}
                    />
                  </div>
                )}

                {/* Step Editorial Index & Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-2xl font-extrabold transition-colors duration-200 ${
                      isSelected ? 'text-blue-700' : 'text-slate-400 group-hover:text-blue-600'
                    }`}>
                      {step.number}
                    </span>
                    {isSelected && (
                      <span className="inline-block w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                    )}
                  </div>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md transition-all duration-200 ${
                    isSelected 
                      ? 'bg-blue-100 text-blue-800 ring-1 ring-blue-300/60' 
                      : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-700'
                  }`}>
                    {step.previewBadge}
                  </span>
                </div>

                {/* Title */}
                <h3 className={`text-xl font-bold mb-2 transition-colors duration-200 ${
                  isSelected ? 'text-blue-950' : 'text-slate-900 group-hover:text-blue-900'
                }`}>
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-2.5 pt-4 border-t border-slate-100 text-xs text-slate-600">
                  {step.details.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 group/item hover:text-slate-900 transition-colors">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 transition-transform duration-200 ${
                        isSelected ? 'text-blue-600 group-hover/item:scale-125' : 'text-emerald-600'
                      }`} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Interactive 3D Step Visualizer Box */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="mt-12 bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 hover:border-blue-300 transition-all duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: 3D Animated Scene for the Step */}
            <div className="lg:col-span-5 bg-gradient-to-b from-blue-50/70 to-slate-100/50 rounded-2xl border border-blue-100/60 overflow-hidden relative group">
              <HowItWorks3D stepIndex={activeStep} />
              
              <div className="absolute bottom-3 inset-x-0 text-center">
                <span className="backdrop-blur-md bg-white/85 border border-slate-200/80 px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-slate-700 shadow-xs group-hover:bg-white group-hover:border-blue-300 transition-all duration-200 inline-flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-blue-600" />
                  {activeStep === 0 && '3D School Model · Verified Syllabus'}
                  {activeStep === 1 && '3D Book Stacking · Custom Bundle'}
                  {activeStep === 2 && '3D Delivery Box · Live GPS Route'}
                </span>
              </div>
            </div>

            {/* Right Column: Step Narrative & Action with Smooth Transition */}
            <div key={activeStep} className="lg:col-span-7 space-y-4 animate-in fade-in duration-300 slide-in-from-bottom-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                  <span>Interactive Step {steps[activeStep].number}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-500">{steps[activeStep].shortTitle}</span>
                </div>

                <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                  <Repeat className="w-3.5 h-3.5 text-blue-600" />
                  <span>Auto-Transitions in {Math.max(1, Math.ceil((1 - progress / 100) * 4.5))}s</span>
                </div>
              </div>

              <h4 className="text-xl sm:text-2xl font-bold text-slate-900 transition-colors">
                {steps[activeStep].previewContent.headline}
              </h4>
              
              <p className="text-sm text-slate-600 leading-relaxed">
                {steps[activeStep].previewContent.subtitle}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors px-3 py-1.5 rounded-lg border border-slate-200/60 shadow-2xs">
                  {steps[activeStep].previewContent.stats}
                </span>

                <button
                  onClick={onStartOrder}
                  className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-4.5 py-2.5 rounded-xl shadow-sm hover:shadow-lg hover:shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all duration-200 whitespace-nowrap group/btn"
                >
                  <span>Select School &amp; Order</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>

              {/* Stepper progress dots with clickable jumps and active timer indicator */}
              <div className="pt-4 flex items-center gap-2.5">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleStepSelect(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeStep === i 
                        ? 'w-10 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm' 
                        : 'w-2.5 bg-slate-200 hover:bg-blue-300'
                    }`}
                    aria-label={`Go to step ${i + 1}`}
                    title={`Jump to Step ${i + 1}`}
                  />
                ))}
                <span className="text-[11px] text-slate-400 font-mono ml-2">
                  0{activeStep + 1} / 03
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
