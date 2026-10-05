import React, { useState, useMemo } from 'react';
import { School, GradeBooklist, BookItem, NotebookItem, StationeryItem, CartItem } from '../types';
import { X, CheckCircle2, BookOpen, Check, ShoppingBag, ShieldCheck, ChevronRight, FileText, Info } from 'lucide-react';

interface BooklistModalProps {
  school: School | null;
  initialGrade?: string;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
  onDirectCheckout: (item: CartItem) => void;
}

export const BooklistModal: React.FC<BooklistModalProps> = ({
  school,
  initialGrade = 'Grade 8',
  isOpen,
  onClose,
  onAddToCart,
  onDirectCheckout,
}) => {
  if (!isOpen || !school) return null;

  // Grade state
  const availableGrades = Object.keys(school.booklists);
  const defaultGrade = availableGrades.includes(initialGrade) ? initialGrade : availableGrades[0] || 'Grade 8';
  const [selectedGrade, setSelectedGrade] = useState<string>(defaultGrade);

  const booklist: GradeBooklist = school.booklists[selectedGrade] || school.booklists[availableGrades[0]];

  // Optional stationery toggles
  const [selectedStationeryIds, setSelectedStationeryIds] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    if (booklist) {
      booklist.stationery.forEach((s) => {
        initial[s.id] = s.selectedByDefault;
      });
    }
    return initial;
  });

  const toggleStationery = (id: string) => {
    setSelectedStationeryIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Calculations
  const textbooksTotal = useMemo(() => {
    return booklist?.textbooks.reduce((sum, item) => sum + item.price, 0) || 0;
  }, [booklist]);

  const notebooksTotal = useMemo(() => {
    return booklist?.notebooks.reduce((sum, item) => sum + item.price, 0) || 0;
  }, [booklist]);

  const stationeryTotal = useMemo(() => {
    return (
      booklist?.stationery.reduce((sum, item) => {
        return selectedStationeryIds[item.id] ? sum + item.price : sum;
      }, 0) || 0
    );
  }, [booklist, selectedStationeryIds]);

  const grossTotal = textbooksTotal + notebooksTotal + stationeryTotal;
  const bundleDiscount = Math.round(grossTotal * 0.08); // 8% institutional savings
  const finalPrice = grossTotal - bundleDiscount;

  const buildCartItem = (): CartItem => {
    const selectedStationery = booklist.stationery.filter((s) => selectedStationeryIds[s.id]);
    return {
      id: `${school.id}-${selectedGrade}-${Date.now()}`,
      schoolId: school.id,
      schoolName: school.name,
      schoolCode: school.code,
      grade: selectedGrade,
      studentName: 'Student Bundle',
      selectedBooks: booklist.textbooks,
      selectedNotebooks: booklist.notebooks,
      selectedStationery,
      totalPrice: finalPrice,
    };
  };

  const handleAdd = () => {
    onAddToCart(buildCartItem());
  };

  const handleDirect = () => {
    onDirectCheckout(buildCartItem());
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booklist-modal-title"
      >
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-200 bg-slate-50/80 flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Official School-Approved Curriculum</span>
              <span className="text-slate-300" aria-hidden="true">·</span>
              <span className="text-slate-500 font-mono">{school.code}</span>
            </div>
            <h3 id="booklist-modal-title" className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
              {school.name}
            </h3>
            <p className="text-xs text-slate-500">
              {school.city} · {school.board} Board · Academic Year {school.academicYear}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            aria-label="Close booklist modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Grade Selection Bar */}
        <div className="px-5 sm:px-6 py-3 bg-white border-b border-slate-200 flex items-center gap-2 overflow-x-auto shrink-0">
          <span className="text-xs font-semibold text-slate-500 shrink-0">Select Class:</span>
          {availableGrades.map((grade) => (
            <button
              key={grade}
              onClick={() => setSelectedGrade(grade)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedGrade === grade
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {grade}
            </button>
          ))}
        </div>

        {/* Content Body: Scrollable */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          
          {/* Section 1: Prescribed Textbooks */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-700" />
                <h4 className="font-bold text-slate-900 text-sm">
                  1. Prescribed Textbooks ({booklist.textbooks.length} Books)
                </h4>
              </div>
              <span className="text-xs font-mono text-slate-500 font-semibold tabular-nums">
                Subtotal: ₹{textbooksTotal}
              </span>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 bg-white">
              {booklist.textbooks.map((book) => (
                <div key={book.id} className="p-3 sm:p-3.5 flex items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {book.title}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                      <span className="font-medium text-blue-700">{book.subject}</span>
                      <span aria-hidden="true">·</span>
                      <span>Pub: {book.publisher}</span>
                      <span aria-hidden="true" className="hidden sm:inline">·</span>
                      <span className="font-mono text-slate-400 hidden sm:inline">{book.isbn}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono text-xs font-bold text-slate-900 tabular-nums">
                      ₹{book.price}
                    </span>
                    <p className="text-[10px] text-emerald-700 font-medium">Mandatory</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: School Exercise Notebooks */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-700" />
                <h4 className="font-bold text-slate-900 text-sm">
                  2. School-Prescribed Exercise Notebooks
                </h4>
              </div>
              <span className="text-xs font-mono text-slate-500 font-semibold tabular-nums">
                Subtotal: ₹{notebooksTotal}
              </span>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 bg-white">
              {booklist.notebooks.map((nb) => (
                <div key={nb.id} className="p-3 sm:p-3.5 flex items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {nb.title} ({nb.quantity} Units)
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {nb.specification}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono text-xs font-bold text-slate-900 tabular-nums">
                      ₹{nb.price}
                    </span>
                    <p className="text-[10px] text-slate-500">Qty: {nb.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Stationery & Add-ons */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                <h4 className="font-bold text-slate-900 text-sm">
                  3. Student Diary, Custom Covers &amp; Stationery
                </h4>
              </div>
              <span className="text-xs font-mono text-slate-500 font-semibold tabular-nums">
                Subtotal: ₹{stationeryTotal}
              </span>
            </div>

            <div className="space-y-2">
              {booklist.stationery.map((item) => {
                const isSelected = !!selectedStationeryIds[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (item.optional) toggleStationery(item.id);
                    }}
                    className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-4 ${
                      item.optional
                        ? 'cursor-pointer hover:border-blue-300'
                        : 'cursor-default bg-slate-50/60'
                    } ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/30'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                          isSelected
                            ? 'bg-blue-700 border-blue-700 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-slate-900">
                            {item.title}
                          </p>
                          {!item.optional && (
                            <span className="text-[10px] font-semibold text-blue-700 bg-blue-100 px-1.5 py-0.2 rounded">
                              Required by School
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono text-xs font-bold text-slate-900 tabular-nums">
                        ₹{item.price}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Guarantee Note */}
          <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-3.5 flex items-center gap-3 text-xs text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Bookstore Complete Assurance:</strong> Every book matches the official curriculum notified by the principal’s office. If any edition differs, we replace it within 24 hours at zero cost.
            </span>
          </div>

        </div>

        {/* Footer with Totals & Actions */}
        <div className="px-5 sm:px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 font-mono tabular-nums">
                ₹{finalPrice}
              </span>
              <span className="text-xs text-slate-400 line-through font-mono tabular-nums">
                ₹{grossTotal}
              </span>
              <span className="text-xs font-bold text-emerald-700">
                (Save ₹{bundleDiscount} with Bundle)
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Tax inclusive · Free doorstep delivery included
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAdd}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-300 shadow-xs transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Bag</span>
            </button>

            <button
              onClick={handleDirect}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-colors whitespace-nowrap"
            >
              <span>Instant Checkout</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
