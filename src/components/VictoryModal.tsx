import React from 'react';
import { CodingChallenge } from '../types';
import { soundFx } from '../utils/sound';
import { Trophy, Sparkles, Gem, ArrowRight, CheckCircle2, Star } from 'lucide-react';

interface VictoryModalProps {
  isOpen: boolean;
  challenge: CodingChallenge;
  onNextQuest: () => void;
  onGoToMap: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  challenge,
  onNextQuest,
  onGoToMap,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 border-2 border-amber-400/60 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
        {/* Glowing backdrop circle */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Trophy Icon */}
        <div className="relative z-10 w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 via-orange-500 to-yellow-300 p-0.5 shadow-xl shadow-amber-500/30 animate-bounce">
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
            <Trophy className="w-10 h-10 text-amber-400" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold border border-emerald-500/40">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>ជោគជ័យ ១០០% (Passed)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-amber-300 via-yellow-200 to-white bg-clip-text text-transparent">
            បញ្ចប់បេសកកម្ម!
          </h2>
          <p className="text-sm font-semibold text-slate-300">{challenge.titleKhmer}</p>
        </div>

        {/* Rewards Breakdown */}
        <div className="grid grid-cols-2 gap-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 relative z-10">
          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 block font-semibold">XP ទទួលបាន</span>
            <span className="text-lg font-black text-amber-400 flex items-center justify-center gap-1">
              ⚡ +{challenge.xp}
            </span>
          </div>

          <div className="space-y-1 border-l border-slate-800">
            <span className="text-[11px] text-slate-400 block font-semibold">Gems ទទួលបាន</span>
            <span className="text-lg font-black text-cyan-300 flex items-center justify-center gap-1">
              <Gem className="w-4 h-4 fill-cyan-400/20" /> +{challenge.gems}
            </span>
          </div>
        </div>

        {/* Stars */}
        <div className="flex items-center justify-center gap-2 relative z-10">
          <Star className="w-8 h-8 text-amber-400 fill-amber-400 animate-pulse" />
          <Star className="w-10 h-10 text-amber-400 fill-amber-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
          <Star className="w-8 h-8 text-amber-400 fill-amber-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>

        {/* Actions */}
        <div className="space-y-2.5 pt-2 relative z-10">
          <button
            onClick={() => {
              soundFx.playClick();
              onNextQuest();
            }}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 transition transform active:scale-95 flex items-center justify-center gap-2"
          >
            <span>បន្តទៅបេសកកម្មបន្ទាប់</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onGoToMap();
            }}
            className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition"
          >
            ត្រឡប់ទៅផែនទីបេសកកម្ម (Map)
          </button>
        </div>
      </div>
    </div>
  );
};
