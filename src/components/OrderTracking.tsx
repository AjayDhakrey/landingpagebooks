import React, { useState, useEffect, useRef } from 'react';
import { Search, Package, Truck, CheckCircle2, Clock, ShieldCheck, MapPin, RefreshCw, AlertCircle, Phone, Sparkles, Repeat, Pause, Play } from 'lucide-react';
import { SAMPLE_ORDERS } from '../data/ordersData';
import { OrderTrackingInfo } from '../types';

interface OrderTrackingProps {
  initialOrderId?: string;
}

export const OrderTracking: React.FC<OrderTrackingProps> = ({ initialOrderId = 'VG-84920' }) => {
  const [orderQuery, setOrderQuery] = useState(initialOrderId);
  const [currentOrder, setCurrentOrder] = useState<OrderTrackingInfo | null>(
    SAMPLE_ORDERS[initialOrderId] || SAMPLE_ORDERS['VG-84920']
  );
  const [isSearching, setIsSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // Status mapping to step index (0: Placed, 1: Preparing, 2: Ready, 3: Dispatched/Out for Delivery, 4: Delivered)
  const statusMap: Record<string, number> = {
    placed: 0,
    preparing: 1,
    ready: 2,
    dispatched: 3,
    delivered: 4,
  };

  const targetStepIdx = currentOrder ? (statusMap[currentOrder.currentStatus] ?? 3) : 3;
  // Maximum step for the 4-section flow (indices 0, 1, 2, 3)
  const maxLoopStep = Math.min(targetStepIdx, 3);

  const [animatedStepIdx, setAnimatedStepIdx] = useState(0);
  const [isAutoLoop, setIsAutoLoop] = useState(true);
  const loopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Continuous looping animation through the 4 sections (Step 0 -> 1 -> 2 -> 3)
  useEffect(() => {
    if (!isAutoLoop) return;

    let isMounted = true;
    let currentStep = 0;

    const stepInterval = 850; // ms per step transition
    const holdAtEndDuration = 2400; // ms to pause at 4th section (Out for Delivery) before restarting

    const runStep = () => {
      if (!isMounted) return;

      setAnimatedStepIdx(currentStep);

      if (currentStep < maxLoopStep) {
        currentStep += 1;
        loopTimeoutRef.current = setTimeout(runStep, stepInterval);
      } else {
        // Hold at 4th section (Out for Delivery), then loop back to first step
        loopTimeoutRef.current = setTimeout(() => {
          if (!isMounted) return;
          currentStep = 0;
          setAnimatedStepIdx(0);
          loopTimeoutRef.current = setTimeout(runStep, 400);
        }, holdAtEndDuration);
      }
    };

    runStep();

    return () => {
      isMounted = false;
      if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
    };
  }, [isAutoLoop, currentOrder?.orderId, maxLoopStep]);

  const handleManualReplay = () => {
    if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
    setIsAutoLoop(true);
    setAnimatedStepIdx(0);
  };

  const handleTrackSubmit = (e?: React.FormEvent, customId?: string) => {
    if (e) e.preventDefault();
    const query = (customId || orderQuery).trim().toUpperCase();
    setIsSearching(true);
    setNotFound(false);

    setTimeout(() => {
      setIsSearching(false);
      // Look up by orderId or phone
      const found =
        SAMPLE_ORDERS[query] ||
        Object.values(SAMPLE_ORDERS).find(
          (o) => o.orderId.toUpperCase() === query || o.customerPhone.includes(query)
        );

      if (found) {
        setCurrentOrder(found);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    }, 250);
  };

  const sampleOrderIds = ['VG-84920', 'VG-92841', 'VG-77402', 'VG-61093'];

  // Calculate percentage width for line and position of courier badge (10% to 90% across 5 nodes)
  // Node centers are located at: 10% (0), 30% (1), 50% (2), 70% (3), 90% (4)
  const lineFillWidth = `${animatedStepIdx * 20}%`;
  const courierLeftPos = `calc(10% + ${animatedStepIdx * 20}%)`;

  return (
    <section id="track-order" className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-100/90 text-emerald-900 text-xs font-bold px-3.5 py-1.5 rounded-full border border-emerald-300/80 shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>No Login Required for Parents</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Track Your School Book Bundle
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
            Zero accounts or passwords needed. Simply enter your Order ID or registered mobile number to follow 
            live assembly, tamper-proof packaging, and delivery vehicle dispatch.
          </p>
        </div>

        {/* Search Bar & Sample ID Bar */}
        <div className="max-w-2xl mx-auto mb-10 space-y-3">
          <form onSubmit={(e) => handleTrackSubmit(e)} className="relative">
            <div className="relative flex items-center">
              <input
                type="text"
                value={orderQuery}
                onChange={(e) => {
                  setOrderQuery(e.target.value);
                  setNotFound(false);
                }}
                placeholder="Enter Order ID (e.g. VG-84920) or Mobile Number..."
                className="w-full pl-11 pr-32 py-3.5 text-sm bg-white border border-slate-300 rounded-2xl shadow-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition-colors uppercase font-mono tracking-wider font-semibold placeholder:normal-case placeholder:font-normal placeholder:tracking-normal text-slate-900"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              
              <button
                type="submit"
                disabled={isSearching}
                className="absolute right-2 top-2 bottom-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs px-5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                {isSearching ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <span>Track Status</span>
                )}
              </button>
            </div>
          </form>

          {/* Quick sample chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span className="font-medium text-slate-400">Try live sample order:</span>
            {sampleOrderIds.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setOrderQuery(id);
                  handleTrackSubmit(undefined, id);
                }}
                className={`font-mono text-xs px-2.5 py-1 rounded-md border transition-colors ${
                  currentOrder?.orderId === id
                    ? 'bg-blue-100 border-blue-300 text-blue-900 font-bold'
                    : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                {id}
              </button>
            ))}
          </div>

          {notFound && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>
                Order not found. Please verify your ID format (e.g., <strong>VG-84920</strong>) or click one of the live sample orders above.
              </span>
            </div>
          )}
        </div>

        {/* Visual Tracking Progress Card */}
        {currentOrder && (
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
            
            {/* Card Header */}
            <div className="p-6 bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-blue-300 font-medium">
                  <span>Order Identifier</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono font-bold text-white text-sm">{currentOrder.orderId}</span>
                </div>
                <h3 className="text-xl font-bold mt-1 text-white">
                  {currentOrder.schoolName}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  {currentOrder.grade} · Student Recipient: {currentOrder.customerName}
                </p>
              </div>

              <div className="flex flex-col md:items-end gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Auto-Loop Toggle */}
                  <button
                    onClick={() => setIsAutoLoop((prev) => !prev)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all shadow-xs active:scale-95 ${
                      isAutoLoop
                        ? 'bg-blue-600/90 border-blue-400 text-white shadow-blue-500/30 ring-2 ring-blue-400/30'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                    title="Toggle continuous 4-step loop animation"
                  >
                    <Repeat className={`w-3.5 h-3.5 ${isAutoLoop ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
                    <span>{isAutoLoop ? 'Looping 4 Steps' : 'Loop Paused'}</span>
                  </button>

                  {/* Replay Flow */}
                  <button
                    onClick={handleManualReplay}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 border border-slate-700 text-slate-200 hover:bg-blue-900 hover:text-white transition-all shadow-xs active:scale-95"
                    title="Replay 4-step dispatch flow from beginning"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Replay</span>
                  </button>

                  {/* Status Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 border border-emerald-500/40 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="capitalize">{currentOrder.currentStatus}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400">
                  Est. Delivery: <strong className="text-white">{currentOrder.estimatedDelivery}</strong>
                </p>
              </div>
            </div>

            {/* Stepper: Order Placed → Preparing → Ready → Out for Delivery → Delivered */}
            <div className="px-6 py-10 border-b border-slate-200 bg-slate-50/70 relative overflow-hidden">
              
              {/* Progress Line Bar (Desktop Horizontal) */}
              <div className="relative mb-6">
                
                {/* 1. Base Grey Track Line connecting all node centers (from 10% to 90%) */}
                <div className="hidden md:block absolute top-5 left-[10%] right-[10%] h-1.5 bg-slate-200 rounded-full z-0" />
                
                {/* 2. Animated Flow Line - Dynamic Gradient connecting from step 0 to active step */}
                <div
                  className="hidden md:block absolute top-5 left-[10%] h-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500 rounded-full z-0 transition-all duration-700 ease-out shadow-[0_0_12px_rgba(37,99,235,0.45)]"
                  style={{ width: lineFillWidth }}
                />

                {/* 3. Traveling Package Courier Icon that glides along the 4 steps in a loop */}
                <div
                  className="hidden md:flex absolute top-1 items-center justify-center z-30 transition-all duration-700 ease-out -translate-x-1/2 pointer-events-none"
                  style={{ left: courierLeftPos }}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing radar ring */}
                    <div className="absolute w-10 h-10 rounded-full bg-blue-500/30 animate-ping" />
                    
                    {/* Glowing courier package bubble */}
                    <div className="w-8 h-8 rounded-full bg-blue-700 text-white shadow-lg shadow-blue-600/40 flex items-center justify-center border-2 border-white animate-courier-bob">
                      <Package className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* 4. Milestone Nodes (5 steps total, looping through the 4 active sections) */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-0 relative z-10">
                  {currentOrder.timeline.map((step, idx) => {
                    const isStepReached = idx <= animatedStepIdx;
                    const isStepCompleted = idx < animatedStepIdx;
                    const isStepActive = idx === animatedStepIdx;

                    return (
                      <div
                        key={idx}
                        className={`flex md:flex-col items-start md:items-center text-left md:text-center gap-4 md:gap-3 cursor-pointer group transition-all duration-500 ${
                          isStepReached ? 'opacity-100' : 'opacity-60 hover:opacity-90'
                        }`}
                        onClick={() => {
                          if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
                          setIsAutoLoop(false);
                          setAnimatedStepIdx(idx);
                        }}
                      >
                        {/* Milestone Circle */}
                        <div className="relative flex items-center justify-center">
                          {/* Active Blue Halo when reached in the loop */}
                          {isStepActive && (
                            <div className="absolute -inset-2 rounded-full bg-blue-500/20 animate-pulse pointer-events-none" />
                          )}

                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-mono text-xs font-bold transition-all duration-500 shadow-md ${
                              isStepCompleted
                                ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 shadow-emerald-500/30 scale-100'
                                : isStepActive
                                ? idx === 3
                                  ? 'bg-blue-600 text-white ring-8 ring-blue-100/90 shadow-blue-600/40 scale-110'
                                  : 'bg-emerald-600 text-white ring-4 ring-emerald-100 shadow-emerald-500/30 scale-105'
                                : 'bg-white border-2 border-slate-300 text-slate-400'
                            } ${isStepReached ? 'animate-pop-bounce' : ''}`}
                          >
                            {isStepCompleted || (isStepActive && idx < 3) ? (
                              <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                            ) : (
                              <span>0{idx + 1}</span>
                            )}
                          </div>
                        </div>

                        {/* Title & Timestamp */}
                        <div className="transition-all duration-300">
                          <p
                            className={`text-xs font-bold leading-tight transition-colors ${
                              isStepActive
                                ? idx === 3 ? 'text-blue-700 font-extrabold' : 'text-emerald-700 font-bold'
                                : isStepCompleted
                                ? 'text-slate-900'
                                : 'text-slate-400'
                            }`}
                          >
                            {step.title}
                          </p>
                          <p
                            className={`text-[11px] mt-0.5 transition-colors ${
                              isStepActive ? 'text-blue-600 font-semibold' : 'text-slate-500'
                            }`}
                          >
                            {step.timestamp}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Detailed Manifest & Logistics Data */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
              
              {/* Column 1: Live Status */}
              <div className="space-y-2 border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-4">
                <p className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  Fulfillment Status
                </p>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {currentOrder.statusDescription}
                </p>
                <div className="pt-2 text-slate-500 space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Carrier Partner:</span>
                    <span className="font-semibold text-slate-800">{currentOrder.carrier}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>AWB Docket:</span>
                    <span className="font-mono text-slate-800 font-semibold">{currentOrder.trackingNumber}</span>
                  </div>
                </div>
              </div>

              {/* Column 2: Package Manifest */}
              <div className="space-y-2 border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-4">
                <p className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  Package Contents
                </p>
                <div className="space-y-1.5 text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Textbooks Prescribed:</span>
                    <span className="font-bold text-slate-900 tabular-nums">{currentOrder.packageDetails.totalBooks} Volumes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Exercise Notebooks:</span>
                    <span className="font-bold text-slate-900 tabular-nums">{currentOrder.packageDetails.totalNotebooks} Units</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total Weight:</span>
                    <span className="font-bold text-slate-900 tabular-nums">{currentOrder.packageDetails.weightKg}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tamper-Proof Seal:</span>
                    <span className="font-mono font-semibold text-blue-700">{currentOrder.packageDetails.tamperProofSealId}</span>
                  </div>
                </div>
              </div>

              {/* Column 3: Destination & Assistance */}
              <div className="space-y-2">
                <p className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  Delivery Address
                </p>
                <p className="text-slate-700 leading-relaxed">
                  {currentOrder.shippingAddress}
                </p>
                <div className="pt-2">
                  <div className="flex items-center gap-1.5 text-blue-700 font-semibold">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Courier Helpline: 1800-845-VANGUARD</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    WhatsApp dispatch notification sent to {currentOrder.customerPhone}
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
