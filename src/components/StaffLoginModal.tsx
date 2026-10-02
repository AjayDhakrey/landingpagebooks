import React, { useState } from 'react';
import { X, Lock, Building, Warehouse, BookMarked, UserCheck, ShieldAlert, ArrowRight } from 'lucide-react';

interface StaffLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StaffLoginModal: React.FC<StaffLoginModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [selectedRole, setSelectedRole] = useState<'school' | 'pos' | 'warehouse' | 'publisher'>('school');
  const [email, setEmail] = useState('admin@dpsrkpuram.edu.in');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const roles = [
    {
      id: 'school',
      title: 'School Administrator',
      icon: Building,
      desc: 'Approve annual syllabi, monitor parent order adoption & royalties.',
      demoEmail: 'admin@dpsrkpuram.edu.in',
    },
    {
      id: 'pos',
      title: 'Campus POS Terminal',
      icon: UserCheck,
      desc: 'On-site book counter checkout, barcode scanner & roll-call lookup.',
      demoEmail: 'counter01@vanguard.pos',
    },
    {
      id: 'warehouse',
      title: 'Warehouse & Fulfillment',
      icon: Warehouse,
      desc: 'Batch packing line, tamper-proof sealing & BlueDart manifest dispatch.',
      demoEmail: 'hub.delhi@vanguard.logistics',
    },
    {
      id: 'publisher',
      title: 'Publisher Partner',
      icon: BookMarked,
      desc: 'Direct PO orders, print run scheduling & bulk invoicing ledger.',
      demoEmail: 'institutional@oxfordpress.edu',
    },
  ];

  const handleRoleSelect = (roleId: any) => {
    setSelectedRole(roleId);
    const found = roles.find((r) => r.id === roleId);
    if (found) setEmail(found.demoEmail);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 text-slate-800"
        role="dialog"
        aria-modal="true"
        aria-labelledby="staff-modal-title"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-700" />
            <h3 id="staff-modal-title" className="font-bold text-slate-900 text-base">
              Vanguard Enterprise Portal
            </h3>
          </div>
          <button
            onClick={() => {
              setIsLoggedIn(false);
              onClose();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isLoggedIn ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <UserCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              Authenticated: {roles.find((r) => r.id === selectedRole)?.title}
            </h4>
            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-200 text-left space-y-1">
              <p><strong>Campus Instance:</strong> Delhi Public School, R.K. Puram</p>
              <p><strong>Active Session:</strong> JWT Institutional Escrow Token</p>
              <p><strong>Pending Batch:</strong> 248 Bundles awaiting courier scan</p>
            </div>
            <button
              onClick={() => {
                setIsLoggedIn(false);
                onClose();
              }}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-2.5 rounded-xl transition-colors"
            >
              Exit Staff Simulation
            </button>
          </div>
        ) : (
          <div className="p-6 space-y-5 text-xs">
            <p className="text-slate-600">
              Select your organization role to access Vanguard institutional tools.
            </p>

            {/* Role cards */}
            <div className="grid grid-cols-2 gap-2">
              {roles.map((role) => {
                const isSelected = selectedRole === role.id;
                const IconComponent = role.icon;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => handleRoleSelect(role.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 mb-1.5 ${isSelected ? 'text-blue-700' : 'text-slate-500'}`} />
                    <p className={`font-bold ${isSelected ? 'text-blue-900' : 'text-slate-800'}`}>
                      {role.title}
                    </p>
                    <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                      {role.demoEmail}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-3.5 pt-2">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Institutional ID / Work Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:border-blue-600 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Access Key / Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:border-blue-600 font-mono text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs py-2.5 rounded-xl shadow-sm transition-colors"
                >
                  <span>Launch Staff Console</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-[10px] text-slate-400 text-center">
                Protected by 256-bit institutional encryption. Contact school IT for single sign-on.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
