import React from 'react';
import { UserStats } from '../types';
import { INITIAL_ACHIEVEMENTS } from '../data/challenges';
import { soundFx } from '../utils/sound';
import { Trophy, X, Award, CheckCircle2, Gem } from 'lucide-react';

interface AchievementsModalProps {
  isOpen: boolean;
  stats: UserStats;
  onClose: () => void;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  stats,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-3xl p-6 shadow-2xl relative space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">ពានរង្វាន់កូដខ្មែរ (Achievements)</h3>
              <p className="text-xs text-slate-400">បញ្ចប់បេសកកម្មដើម្បីទទួលបានពានរង្វាន់ និង Gems បន្ថែម</p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Badges List */}
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {INITIAL_ACHIEVEMENTS.map((badge) => {
            const isUnlocked =
              stats.completedChallengeIds.length >= badge.requiredXpOrLevel ||
              stats.level >= badge.requiredXpOrLevel;

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border flex items-center justify-between transition ${
                  isUnlocked
                    ? 'bg-slate-950/90 border-amber-500/40'
                    : 'bg-slate-950/40 border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="text-3xl p-2.5 rounded-2xl bg-slate-900 border border-slate-800 shrink-0">
                    {badge.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm flex items-center gap-2">
                      <span>{badge.titleKhmer}</span>
                      {isUnlocked && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">{badge.descKhmer}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold shrink-0">
                  <span className="text-cyan-300 flex items-center gap-1 bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-800">
                    <Gem className="w-3.5 h-3.5 fill-cyan-400/20" /> +{badge.rewardGems}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
