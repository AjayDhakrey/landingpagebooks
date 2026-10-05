import React, { useState, useMemo } from 'react';
import { School, EducationBoard } from '../types';
import { PARTNER_SCHOOLS } from '../data/schoolsData';
import { Search, MapPin, CheckCircle2, ChevronRight, BookOpen, GraduationCap, Building2, Users } from 'lucide-react';

interface PartnerSchoolsProps {
  onSelectSchool: (school: School) => void;
}

export const PartnerSchools: React.FC<PartnerSchoolsProps> = ({ onSelectSchool }) => {
  const [boardFilter, setBoardFilter] = useState<'All' | EducationBoard>('All');
  const [cityFilter, setCityFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const cities = ['All', 'New Delhi', 'Bengaluru', 'Mumbai', 'Hyderabad', 'Gurugram'];
  const boards: ('All' | EducationBoard)[] = ['All', 'CBSE', 'ICSE', 'Cambridge / IB'];

  const filteredSchools = useMemo(() => {
    return PARTNER_SCHOOLS.filter((school) => {
      const matchBoard = boardFilter === 'All' || school.board === boardFilter;
      const matchCity = cityFilter === 'All' || school.city.toLowerCase() === cityFilter.toLowerCase();
      const matchQuery =
        searchQuery.trim() === '' ||
        school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.city.toLowerCase().includes(searchQuery.toLowerCase());
      return matchBoard && matchCity && matchQuery;
    });
  }, [boardFilter, cityFilter, searchQuery]);

  return (
    <section id="schools" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <p className="text-xs font-bold tracking-wider text-blue-700 uppercase">
              Official Institutional Network
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Partner Schools Directory
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
              Browse approved schools with verified booklists. Official book bundles are cross-checked 
              with each school’s academic curriculum before dispatch.
            </p>
          </div>

          <div className="shrink-0 text-left md:text-right">
            <span className="text-xs font-semibold text-slate-500">
              Showing {filteredSchools.length} of {PARTNER_SCHOOLS.length} verified partner institutions
            </span>
          </div>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by school name, city, or code (e.g. DPS, TISB)..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition-colors"
              />
            </div>

            {/* City Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
              <span className="text-slate-400 font-medium shrink-0">City:</span>
              {cities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setCityFilter(city)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                    cityFilter === city
                      ? 'bg-blue-700 text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

          </div>

          {/* Board Selector */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-200/70 overflow-x-auto text-xs">
            <span className="text-slate-400 font-medium shrink-0">Academic Board:</span>
            {boards.map((board) => (
              <button
                key={board}
                type="button"
                onClick={() => setBoardFilter(board)}
                className={`px-3 py-1 rounded-md font-medium transition-colors whitespace-nowrap ${
                  boardFilter === board
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200/60'
                }`}
              >
                {board}
              </button>
            ))}
          </div>
        </div>

        {/* Schools Grid */}
        {filteredSchools.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <GraduationCap className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-700">No partner schools matched your search criteria</p>
            <p className="text-xs text-slate-500 mt-1">Try clearing filters or search for another city.</p>
            <button
              onClick={() => {
                setBoardFilter('All');
                setCityFilter('All');
                setSearchQuery('');
              }}
              className="mt-4 text-xs font-semibold text-blue-700 hover:underline"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSchools.map((school) => {
              const availableClassCount = school.classes.length;
              const gradeRange = `${school.classes[0]} – ${school.classes[availableClassCount - 1]}`;

              return (
                <div
                  key={school.id}
                  className="group bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-900/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between p-5 relative overflow-hidden"
                >
                  {/* Subtle top ambient glow on hover */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors pointer-events-none" />

                  <div className="space-y-3.5 relative z-10">
                    
                    {/* Top Row: School Crest monogram & Verification */}
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/60 border border-blue-200/60 text-blue-800 font-extrabold flex items-center justify-center text-xs tracking-wider shadow-xs group-hover:scale-105 group-hover:shadow-md group-hover:border-blue-300 transition-all duration-300">
                        {school.code.split('-')[0]}
                      </div>
                      
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50/80 px-2 py-0.5 rounded-full border border-emerald-200/60">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Verified 26–27</span>
                      </div>
                    </div>

                    {/* School Name & Info */}
                    <div>
                      <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
                        {school.name}
                      </h3>
                      
                      {/* Quiet unboxed metadata */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {school.city}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{school.board}</span>
                      </div>
                    </div>

                    {/* Classes & Student Specs with 3D Book Icon preview on hover */}
                    <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Classes:</span>
                        <span className="font-semibold text-slate-800">{gradeRange}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Delivery:</span>
                        <span className="font-medium text-emerald-700">{school.deliveryEstimate}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">School Code:</span>
                        <span className="font-mono text-slate-600 font-semibold">{school.code}</span>
                      </div>
                    </div>

                    {/* Floating micro book stack indicator that reveals on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-1 flex items-center gap-1.5 text-[11px] text-blue-700 font-semibold">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{Object.keys(school.booklists).length * 6}+ Curriculums Loaded</span>
                    </div>

                  </div>

                  {/* Action Button with Enhanced Hover State */}
                  <div className="pt-4 mt-3 border-t border-slate-100 relative z-10">
                    <button
                      onClick={() => onSelectSchool(school)}
                      className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 group-hover:bg-gradient-to-r group-hover:from-blue-700 group-hover:to-blue-600 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-xs group-hover:shadow-md group-hover:shadow-blue-700/20 transition-all duration-300 active:scale-98"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>View Official Booklist</span>
                      <ChevronRight className="w-3.5 h-3.5 ml-auto group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
