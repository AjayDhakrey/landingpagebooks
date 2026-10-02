import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Can I purchase only specific textbooks instead of the complete bundle?',
      a: 'Yes! While the complete bundle offers an 8%–12% bundled institutional discount and includes mandatory customized school notebooks and diaries, you can customize your bundle in our booklist viewer to remove optional items like art kits and book covers.',
    },
    {
      q: 'How does the "No Login Required" tracking work?',
      a: 'We understand parents have enough accounts and passwords to remember. Every Vanguard order is assigned an encrypted 7-character identifier (e.g., VG-84920). You can check your real-time packing, tamper-proof seal status, and delivery vehicle dispatch simply by entering your Order ID or your WhatsApp mobile number.',
    },
    {
      q: 'What if our school alters a textbook edition after my order is placed?',
      a: 'Vanguard maintains direct digital integration with each partner school registrar. If the school academic council updates any title or syllabus edition prior to term commencement, Vanguard automatically dispatches the updated revision to your doorstep at zero extra cost, picking up the superseded volume.',
    },
    {
      q: 'What is your return and replacement policy for misprints or defective pages?',
      a: 'Every bundle comes with a 100% Zero-Defect Guarantee. If any book has missing pages, inverted binding, or shipping damage, simply tap "Request Replacement" from the Order Tracking screen or text our WhatsApp concierge. A brand-new copy is delivered within 24 hours.',
    },
    {
      q: 'How does Vanguard ensure books are 100% genuine and not pirated copies?',
      a: 'Vanguard procures strictly through direct institutional purchase orders with primary publishers including NCERT, Oxford University Press, Cambridge University Press, Pearson, Selina, and S. Chand. Every book passes barcode verification before packaging.',
    },
    {
      q: 'Can schools use Vanguard for physical distribution on campus?',
      a: 'Absolutely. Many of our 450+ partner schools utilize Vanguard Campus POS terminals during orientation week. Parents can collect pre-packed boxes at school counters with roll-number lookup, or choose doorstep delivery.',
    },
  ];

  return (
    <section id="faqs" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <p className="text-xs font-bold tracking-wider text-blue-700 uppercase">
            Frequently Asked Questions
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Got Questions? We’ve Got Answers.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Everything you need to know about school curriculums, bundle customizations, and doorstep delivery.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-900 text-sm sm:text-base">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-blue-700' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
