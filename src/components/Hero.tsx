import React, { useState, useMemo } from 'react';
import { Search, MapPin, CheckCircle2, ShieldCheck, Truck, BookOpen, ChevronRight, Sparkles, Box } from 'lucide-react';
import { School } from '../types';
import { PARTNER_SCHOOLS, SAMPLE_GRADES } from '../data/schoolsData';
import { Hero3DCanvas } from './3d/Hero3DCanvas';

interface HeroProps {
  onSelectSchoolGrade: (school: School, grade: string) => void;
  onOpenTrack: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectSchoolGrade, onOpenTrack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('Grade 6');
  const [selectedCity, setSelectedCity] = useState('All');
  const [isFocused, setIsFocused] = useState(false);

  const filteredSchools = useMemo(() => {
    return PARTNER_SCHOOLS.filter((school) => {
      const matchesCity = selectedCity === 'All' || school.city.toLowerCase().includes(selectedCity.toLowerCase());
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCity;
      return (
        matchesCity &&
        (school.name.toLowerCase().includes(query) ||
          school.code.toLowerCase().includes(query) ||
          school.city.toLowerCase().includes(query) ||
          school.board.toLowerCase().includes(query))
      );
    });
  }, [searchQuery, selectedCity]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (filteredSchools.length > 0) {
      onSelectSchoolGrade(filteredSchools[0], selectedGrade);
    }
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pt-10 lg:pb-20 bg-gradient-to-b from-blue-50/60 via-slate-50 to-white">
      {/* Subtle 3D background lighting effect */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-emerald-400/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#1d4ed8_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Interactive School Finder */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.14] text-balance">
              Get Official School Booklists &amp; Stationery Delivered to Your Doorstep.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              Choose your school and class to find verified curriculum books, stationery and complete school bundles.
            </p>

            {/* Premium Search Component */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xl shadow-blue-900/5 border border-slate-200/90 relative">
              <form onSubmit={handleSearchSubmit} className="space-y-3.5">
                
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                  {/* School Name / Code Input */}
                  <div className="sm:col-span-7 relative">
                    <label htmlFor="school-search-input" className="sr-only">Search School Name, Code or City</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Search className="w-4 h-4" />
                      </div>
                      <input
                        id="school-search-input"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        placeholder="Search School Name, Code or City..."
                        className="w-full pl-10 pr-3 py-3 text-sm bg-slate-50/80 hover:bg-slate-100/70 focus:bg-white text-slate-900 border border-slate-200 focus:border-blue-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/15 transition-all font-medium placeholder:font-normal placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Grade Selector */}
                  <div className="sm:col-span-5 relative">
                    <label htmlFor="grade-select" className="sr-only">Select Grade</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <select
                        id="grade-select"
                        value={selectedGrade}
                        onChange={(e) => setSelectedGrade(e.target.value)}
                        className="w-full pl-10 pr-8 py-3 text-sm bg-slate-50/80 hover:bg-slate-100/70 focus:bg-white text-slate-900 border border-slate-200 focus:border-blue-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/15 transition-all appearance-none font-semibold cursor-pointer"
                      >
                        {SAMPLE_GRADES.map((grade) => (
                          <option key={grade} value={grade}>
                            {grade} Bundle
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                        <ChevronRight className="w-4 h-4 rotate-90" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* City Quick Filter & Find Books Primary CTA */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 text-xs text-slate-600">
                    <span className="text-slate-400 font-medium shrink-0">City:</span>
                    {['All', 'Delhi', 'Bengaluru', 'Mumbai', 'Hyderabad'].map((city) => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => setSelectedCity(city)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                          selectedCity === city
                            ? 'bg-blue-700 text-white shadow-xs scale-102'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md shadow-blue-700/20 transition-all focus-visible:outline-2 focus-visible:outline-blue-600 whitespace-nowrap active:scale-98"
                  >
                    <span>Find Books</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Instant Live Results Preview dropdown if typing or focused */}
                {isFocused && searchQuery.trim().length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                      <span>Matching Verified Institutions ({filteredSchools.length})</span>
                      <button
                        type="button"
                        onClick={() => setIsFocused(false)}
                        className="hover:text-slate-800"
                      >
                        Close
                      </button>
                    </div>
                    {filteredSchools.length === 0 ? (
                      <p className="text-xs text-slate-500 py-2">
                        No partner schools found for &ldquo;{searchQuery}&rdquo;. Try searching Delhi, Mumbai, or school code.
                      </p>
                    ) : (
                      <div className="max-h-56 overflow-y-auto space-y-1 divide-y divide-slate-100">
                        {filteredSchools.slice(0, 4).map((school) => (
                          <div
                            key={school.id}
                            onClick={() => onSelectSchoolGrade(school, selectedGrade)}
                            className="p-2 hover:bg-blue-50/70 rounded-lg cursor-pointer transition-colors flex items-center justify-between text-left group"
                          >
                            <div className="min-w-0 pr-3">
                              <p className="text-xs font-semibold text-slate-900 group-hover:text-blue-700 truncate">
                                {school.name}
                              </p>
                              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                                <span>{school.city}</span>
                                <span aria-hidden="true">·</span>
                                <span>{school.board}</span>
                                <span aria-hidden="true">·</span>
                                <span className="font-mono text-slate-400">{school.code}</span>
                              </div>
                            </div>
                            <span className="text-xs font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 shrink-0">
                              View {selectedGrade}
                              <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </form>
            </div>

            {/* Trust Badges */}
            <div className="pt-1 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>School-Verified Editions</span>
              </div>
              <span className="text-slate-300 hidden sm:inline" aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Secure Payments</span>
              </div>
              <span className="text-slate-300 hidden sm:inline" aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Live Order Tracking</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D "School → Books → Bundle → Delivery Box → Home" Interactive Scene */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Glassmorphic 3D Viewport Carrier */}
              <div className="relative bg-white/70 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-2xl shadow-blue-900/10 overflow-hidden p-2">
                <Hero3DCanvas onExploreBundle={() => {
                  const dps = PARTNER_SCHOOLS[0];
                  onSelectSchoolGrade(dps, 'Grade 6');
                }} />

                {/* Micro Bar: Quick Booklist Inspect & Live Tracker CTA */}
                <div className="p-3 bg-white/90 backdrop-blur-xs rounded-2xl border border-slate-100 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                    <p className="font-semibold text-slate-800 truncate">
                      DPS R.K. Puram · Grade 6 Bundle Ready
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        const dps = PARTNER_SCHOOLS.find(s => s.code === 'DPS-RKP') || PARTNER_SCHOOLS[0];
                        onSelectSchoolGrade(dps, selectedGrade);
                      }}
                      className="text-xs font-bold text-blue-700 hover:text-blue-800 hover:underline px-2 py-1"
                    >
                      Inspect List
                    </button>
                    <button
                      onClick={onOpenTrack}
                      className="bg-slate-900 hover:bg-blue-700 text-white font-semibold text-xs px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Track Order
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
