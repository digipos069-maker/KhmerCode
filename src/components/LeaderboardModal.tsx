import React from 'react';
import { UserStats } from '../types';
import { soundFx } from '../utils/sound';
import { Crown, X, Medal, Flame, Sparkles } from 'lucide-react';

interface LeaderboardModalProps {
  isOpen: boolean;
  stats: UserStats;
  onClose: () => void;
}

const KHMER_LEAGUE_RIVALS = [
  { name: 'សុខ ជា (Sok Chea)', level: 12, xp: 1250, streak: 7, avatar: '👑', isUser: false },
  { name: 'ចាន់ធី (Chanthy)', level: 10, xp: 980, streak: 5, avatar: '🧙‍♂️', isUser: false },
  { name: 'វិចិត្រ (Vicheat)', level: 8, xp: 820, streak: 4, avatar: '🐉', isUser: false },
  { name: 'ពិសិដ្ឋ (Piseth)', level: 6, xp: 600, streak: 3, avatar: '⚡', isUser: false },
  { name: 'បូរី (Borey)', level: 4, xp: 410, streak: 2, avatar: '🚀', isUser: false },
];

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  stats,
  onClose,
}) => {
  if (!isOpen) return null;

  // Insert user dynamically into list and sort by XP
  const fullList = [
    ...KHMER_LEAGUE_RIVALS,
    {
      name: `អ្នកក្លាហានខ្មែរ (អ្នក)`,
      level: stats.level,
      xp: stats.xp + (stats.level - 1) * 100,
      streak: stats.streakDays,
      avatar: stats.avatar,
      isUser: true,
    },
  ].sort((a, b) => b.xp - a.xp);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-xl bg-slate-900 border border-yellow-500/30 rounded-3xl p-6 shadow-2xl relative space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center">
              <Crown className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">តារាងចំណាត់ថ្នាក់ (Khmer League)</h3>
              <p className="text-xs text-slate-400">តារាងកិត្តិយសអ្នកសរសេរកូដខ្មែរឆ្នើមប្រចាំសប្តាហ៍</p>
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

        {/* Rankings List */}
        <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {fullList.map((player, idx) => {
            const rank = idx + 1;
            return (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border flex items-center justify-between transition ${
                  player.isUser
                    ? 'bg-gradient-to-r from-amber-500/20 via-slate-900 to-amber-500/20 border-amber-500/60 ring-1 ring-amber-500/30'
                    : 'bg-slate-950/80 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 text-center font-extrabold text-sm">
                    {rank === 1 ? (
                      <span className="text-xl">🥇</span>
                    ) : rank === 2 ? (
                      <span className="text-xl">🥈</span>
                    ) : rank === 3 ? (
                      <span className="text-xl">🥉</span>
                    ) : (
                      <span className="text-slate-500">#{rank}</span>
                    )}
                  </div>

                  <span className="text-2xl">{player.avatar}</span>

                  <div>
                    <h4
                      className={`font-bold text-sm ${
                        player.isUser ? 'text-amber-300' : 'text-white'
                      }`}
                    >
                      {player.name}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      កម្រិត Lv.{player.level} • {player.xp} XP
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-orange-400 font-bold bg-orange-950/60 px-2.5 py-1 rounded-full border border-orange-800">
                  <Flame className="w-3.5 h-3.5 fill-orange-500/30" />
                  <span>{player.streak} ថ្ងៃ</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
