import React from 'react';
import { UserStats } from '../types';
import { soundFx } from '../utils/sound';
import {
  Flame,
  Heart,
  Gem,
  Trophy,
  ShoppingBag,
  Sparkles,
  Volume2,
  VolumeX,
  Award,
  Crown,
  Code2,
} from 'lucide-react';

interface NavbarProps {
  stats: UserStats;
  onOpenShop: () => void;
  onOpenAchievements: () => void;
  onOpenLeaderboard: () => void;
  onOpenAiGenerator: () => void;
  onToggleSound: () => void;
  onGoHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  stats,
  onOpenShop,
  onOpenAchievements,
  onOpenLeaderboard,
  onOpenAiGenerator,
  onToggleSound,
  onGoHome,
}) => {
  const xpForNextLevel = stats.level * 100;
  const xpPercentage = Math.min(100, Math.floor((stats.xp / xpForNextLevel) * 100));

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white px-4 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* App Title & Logo */}
        <button
          onClick={() => {
            soundFx.playClick();
            onGoHome();
          }}
          className="flex items-center gap-2.5 group text-left transition transform active:scale-95"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-lg bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-200 bg-clip-text text-transparent">
              KhmerCode Quest
            </div>
            <p className="text-xs text-amber-200/80 font-medium tracking-wide">
              ល្បែងរៀនសរសេរកូដខ្មែរ
            </p>
          </div>
        </button>

        {/* Player Stats Bar */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-4 bg-slate-800/80 px-3 py-1.5 rounded-2xl border border-slate-700/80">
          {/* Level & Avatar */}
          <div className="flex items-center gap-2 pr-2 border-r border-slate-700">
            <span className="text-2xl" role="img" aria-label="avatar">
              {stats.avatar}
            </span>
            <div>
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-300">
                <span className="text-amber-400">Lv.{stats.level}</span>
                <span className="text-slate-400 font-normal truncate max-w-[90px]">
                  {stats.title}
                </span>
              </div>
              {/* XP Progress bar */}
              <div className="w-24 bg-slate-700 h-2 rounded-full overflow-hidden mt-0.5 border border-slate-600">
                <div
                  className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full transition-all duration-500"
                  style={{ width: `${xpPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Hearts / Lives */}
          <div
            title="បេះដូងជីវិត (Hearts)"
            className="flex items-center gap-1 text-red-400 font-bold text-sm px-2 py-1 rounded-lg bg-red-950/40 border border-red-800/40"
          >
            <Heart className="w-4 h-4 fill-red-500 text-red-500 animate-pulse" />
            <span>
              {stats.hearts}/{stats.maxHearts}
            </span>
          </div>

          {/* Gems */}
          <div
            title="ត្បូង Gems"
            className="flex items-center gap-1 text-cyan-300 font-bold text-sm px-2 py-1 rounded-lg bg-cyan-950/40 border border-cyan-800/40"
          >
            <Gem className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
            <span>{stats.gems}</span>
          </div>

          {/* Streak */}
          <div
            title="ថ្ងៃរៀនជាប់គ្នា (Streak)"
            className="flex items-center gap-1 text-orange-400 font-bold text-sm px-2 py-1 rounded-lg bg-orange-950/40 border border-orange-800/40"
          >
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500/30" />
            <span>{stats.streakDays} ថ្ងៃ</span>
          </div>
        </div>

        {/* Action Controls & Game Menus */}
        <div className="flex items-center gap-2">
          {/* AI Generator Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenAiGenerator();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white text-xs font-semibold shadow-md shadow-purple-900/40 transition active:scale-95 border border-purple-400/30"
          >
            <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
            <span className="hidden sm:inline">លំហាត់ AI ថ្មី</span>
            <span className="sm:hidden">AI</span>
          </button>

          {/* Shop Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenShop();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold border border-slate-700 transition active:scale-95"
            title="ហាងលក់ទំនិញ (Shop)"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">ហាង</span>
          </button>

          {/* Achievements */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenAchievements();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 transition active:scale-95"
            title="ពានរង្វាន់ (Achievements)"
          >
            <Trophy className="w-4 h-4" />
          </button>

          {/* Leaderboard */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenLeaderboard();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-yellow-400 border border-slate-700 transition active:scale-95"
            title="តារាងចំណាត់ថ្នាក់ (Leaderboard)"
          >
            <Crown className="w-4 h-4" />
          </button>

          {/* Mute/Unmute */}
          <button
            onClick={() => {
              onToggleSound();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition active:scale-95"
            title={stats.soundEnabled ? 'បិទសំឡេង' : 'បើកសំឡេង'}
          >
            {stats.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
