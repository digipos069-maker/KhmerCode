import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { loginSuccess, logout, setAuthError } from '../store/authSlice';
import { soundFx } from '../utils/sound';
import {
  LogIn,
  UserPlus,
  Mail,
  Phone,
  Lock,
  User,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Code2,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface AuthPageProps {
  onSuccessNavigateHome: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onSuccessNavigateHome }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, error } = useAppSelector((state) => state.auth);

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleToggleMode = (newMode: 'login' | 'register') => {
    soundFx.playClick();
    setMode(newMode);
    setValidationError(null);
    dispatch(setAuthError(null));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!emailOrPhone.trim()) {
      setValidationError('សូមបញ្ចូលអ៊ីមែល ឬលេខទូរស័ព្ទ');
      return;
    }
    if (!password.trim() || password.length < 4) {
      setValidationError('ពាក្យសម្ងាត់ត្រូវមានយ៉ាងហោចណាស់ ៤ តួអក្សរ');
      return;
    }
    if (mode === 'register' && !fullName.trim()) {
      setValidationError('សូមបញ្ចូលឈ្មោះពេញរបស់អ្នក');
      return;
    }

    soundFx.playVictory();

    // Create user profile object
    const createdUser = {
      id: `usr-${Date.now()}`,
      fullName: mode === 'register' ? fullName : emailOrPhone.split('@')[0] || 'Khmer Coder',
      emailOrPhone: emailOrPhone.trim(),
      avatar: '🧙‍♂️',
      role: 'Hero Developer',
      createdAt: new Date().toISOString(),
    };

    dispatch(loginSuccess(createdUser));
    onSuccessNavigateHome();
  };

  const handleDemoLogin = () => {
    soundFx.playVictory();
    const demoUser = {
      id: `demo-${Date.now()}`,
      fullName: 'សុខ វិសាល (Visal Developer)',
      emailOrPhone: 'visal.coder@khmercode.app',
      avatar: '🧙‍♂️',
      role: 'Senior Khmer Developer',
      createdAt: new Date().toISOString(),
    };
    dispatch(loginSuccess(demoUser));
    onSuccessNavigateHome();
  };

  const handleLogout = () => {
    soundFx.playClick();
    dispatch(logout());
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-slate-950 text-slate-100 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Background Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Card Header Brand */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>ប្រព័ន្ធគ្រប់គ្រងគណនី Redux Authentication</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {isAuthenticated
              ? 'គណនីរបស់អ្នកបានចូលរួចហើយ'
              : mode === 'login'
              ? 'ចូលប្រើប្រាស់ KhmerCode Quest'
              : 'ចុះឈ្មោះបង្កើតគណនីថ្មី'}
          </h1>
          <p className="text-xs text-slate-400">
            {isAuthenticated
              ? 'រក្សាទុកទិន្នន័យ XP, Gems, Badges និងប្រវត្តិដោះស្រាយកូដរបស់អ្នក'
              : 'ចូលប្រើប្រាស់តាមអ៊ីមែល ឬលេខទូរស័ព្ទដើម្បីរក្សាទុកស្នាដៃកូដ'}
          </p>
        </div>

        {/* Logged In State Box */}
        {isAuthenticated && user ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 text-center">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-4xl shadow-xl">
              {user.avatar}
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-black text-white">{user.fullName}</h2>
              <p className="text-xs text-amber-400 font-bold">{user.emailOrPhone}</p>
              <span className="inline-block px-3 py-0.5 rounded-full bg-slate-950 text-[11px] font-semibold text-slate-400 border border-slate-800 mt-2">
                {user.role || 'Member Developer'}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-800/50 text-xs text-emerald-300 flex items-center justify-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>កាលបរិច្ឆេទបង្កើត: {new Date(user.createdAt).toLocaleDateString()}</span>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={onSuccessNavigateHome}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-lg hover:from-amber-400 hover:to-orange-400 transition"
              >
                ទៅកាន់ទំព័រដើម / ផែនទីលំហាត់
              </button>

              <button
                onClick={handleLogout}
                className="w-full py-3 rounded-2xl bg-red-950/40 hover:bg-red-900/60 text-red-300 font-bold text-xs border border-red-800/40 transition flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>ចាកចេញពីគណនី (Log Out)</span>
              </button>
            </div>
          </div>
        ) : (
          /* Form Auth Box */
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 p-1 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-bold">
              <button
                type="button"
                onClick={() => handleToggleMode('login')}
                className={`py-2.5 rounded-xl transition flex items-center justify-center gap-2 ${
                  mode === 'login'
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>ចូលប្រើប្រាស់</span>
              </button>

              <button
                type="button"
                onClick={() => handleToggleMode('register')}
                className={`py-2.5 rounded-xl transition flex items-center justify-center gap-2 ${
                  mode === 'register'
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>ចុះឈ្មោះ</span>
              </button>
            </div>

            {/* Error Message Display */}
            {(validationError || error) && (
              <div className="p-3.5 rounded-2xl bg-red-950/60 border border-red-800/60 text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{validationError || error}</span>
              </div>
            )}

            {/* Form Inputs */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    ឈ្មោះពេញរបស់អ្នក (Full Name)
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="ឧទាហរណ៍: សុខ ជា"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  អ៊ីមែល ឬ លេខទូរស័ព្ទ (Email or Phone Number)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="ឧទាហរណ៍: 012345678 ឬ dev@gmail.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  ពាក្យសម្ងាត់ (Password)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-xl transition active:scale-95 flex items-center justify-center gap-2"
              >
                {mode === 'login' ? (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>ចូលប្រើប្រាស់គណនី</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>បង្កើតគណនីថ្មី</span>
                  </>
                )}
              </button>
            </form>

            <div className="relative border-t border-slate-800 pt-4 text-center">
              <span className="bg-slate-900 px-3 text-[10px] text-slate-500 font-bold uppercase absolute -top-2.5 left-1/2 -translate-x-1/2">
                ឬ
              </span>

              {/* Instant Demo Quick Login */}
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full mt-2 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-800 transition flex items-center justify-center gap-2 group"
              >
                <Zap className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>ចូលប្រើប្រាស់គំរូទាន់ចិត្ត (Instant Demo Login)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
