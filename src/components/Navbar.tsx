import React from 'react';
import { UserStats } from '../types';
import { ALL_LANGUAGE_TRACKS } from '../data/challenges';
import { toKhmerNumber } from '../utils/khmer';
import { useAppSelector } from '../store';
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
  Crown,
  Code2,
  Home,
  Map,
  Compass,
  Terminal,
  LogIn,
  User,
} from 'lucide-react';

interface NavbarProps {
  stats: UserStats;
  currentView: 'home' | 'map' | 'tracks' | 'lab' | 'auth';
  onNavigate: (view: 'home' | 'map' | 'tracks' | 'lab' | 'auth') => void;
  onOpenShop: () => void;
  onOpenAchievements: () => void;
  onOpenLeaderboard: () => void;
  onOpenAiGenerator: () => void;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  stats,
  currentView,
  onNavigate,
  onOpenShop,
  onOpenAchievements,
  onOpenLeaderboard,
  onOpenAiGenerator,
  onToggleSound,
}) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const xpForNextLevel = stats.level * 100;
  const xpPercentage = Math.min(100, Math.floor((stats.xp / xpForNextLevel) * 100));

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white px-3 sm:px-4 py-2 shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 flex-nowrap">
        
        {/* App Title Logo & Primary Nav Tabs */}
        <div className="flex items-center gap-3 lg:gap-5 flex-shrink-0">
          <button
            onClick={() => {
              soundFx.playClick();
              onNavigate('home');
            }}
            className="flex items-center gap-2 group text-left transition transform active:scale-95 flex-shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
              <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="hidden xs:block sm:block">
              <div className="flex items-center gap-1 font-bold text-base sm:text-lg bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-200 bg-clip-text text-transparent whitespace-nowrap">
                KhmerCode Quest
              </div>
              <p className="text-[10px] text-amber-200/80 font-medium tracking-wide whitespace-nowrap">
                ល្បែងរៀនសរសេរកូដខ្មែរ
              </p>
            </div>
          </button>

          {/* Navigation Tabs Bar */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-950/80 p-1 rounded-2xl border border-slate-800 text-xs font-bold flex-shrink-0">
            <button
              onClick={() => {
                soundFx.playClick();
                onNavigate('home');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition whitespace-nowrap ${
                currentView === 'home'
                  ? 'bg-amber-500 text-slate-950 font-extrabold shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>ទំព័រដើម</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onNavigate('tracks');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition whitespace-nowrap ${
                currentView === 'tracks'
                  ? 'bg-amber-500 text-slate-950 font-extrabold shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>ជំនាញ ({ALL_LANGUAGE_TRACKS.length})</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onNavigate('map');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition whitespace-nowrap ${
                currentView === 'map'
                  ? 'bg-amber-500 text-slate-950 font-extrabold shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>ផែនទីលំហាត់</span>
            </button>

            {isAuthenticated && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onNavigate('auth');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition whitespace-nowrap ${
                  currentView === 'auth'
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow'
                    : 'text-emerald-300 border border-emerald-800/60 bg-emerald-950/40 hover:bg-emerald-900/60'
                }`}
              >
                <User className="w-3.5 h-3.5 text-emerald-400" />
                <span className="truncate max-w-[100px]">{user?.fullName || 'គណនី'}</span>
              </button>
            )}

            {currentView === 'lab' && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onNavigate('lab');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-extrabold shadow whitespace-nowrap"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>ល្បងកូដ (IDE)</span>
              </button>
            )}
          </nav>
        </div>

        {/* Player Stats Bar & Game Actions - Grouped together to stay on single line */}
        {isAuthenticated ? (
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Stats Bar */}
            <div className="flex items-center gap-2 sm:gap-2.5 bg-slate-800/80 px-2.5 py-1 rounded-xl border border-slate-700/80 text-xs">
              {/* Level & Avatar */}
              <div className="flex items-center gap-1.5 pr-2 border-r border-slate-700">
                <span className="text-xl" role="img" aria-label="avatar">
                  {stats.avatar}
                </span>
                <div className="hidden sm:block">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-300">
                    <span className="text-amber-400 font-extrabold">Lv.{stats.level}</span>
                  </div>
                  <div className="w-14 bg-slate-700 h-1 rounded-full overflow-hidden mt-0.5 border border-slate-600">
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
                className="flex items-center gap-1 text-red-400 font-bold text-xs px-1.5 py-0.5 rounded-lg bg-red-950/40 border border-red-800/40"
              >
                <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500 animate-pulse" />
                <span>{stats.hearts}</span>
              </div>

              {/* Gems */}
              <div
                title="ត្បូង Gems"
                className="flex items-center gap-1 text-cyan-300 font-bold text-xs px-1.5 py-0.5 rounded-lg bg-cyan-950/40 border border-cyan-800/40"
              >
                <Gem className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20" />
                <span>{stats.gems}</span>
              </div>

              {/* Streak */}
              <div
                title="ថ្ងៃរៀនជាប់គ្នា (Streak)"
                className="flex items-center gap-1 text-orange-400 font-bold text-xs px-1.5 py-0.5 rounded-lg bg-orange-950/40 border border-orange-800/40"
              >
                <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500/30" />
                <span>{stats.streakDays}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1">
              {/* AI Generator Button */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenAiGenerator();
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white text-xs font-semibold shadow-md transition active:scale-95 border border-purple-400/30 whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
                <span className="hidden md:inline">លំហាត់ AI</span>
              </button>

              {/* Shop Button */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenShop();
                }}
                className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition active:scale-95"
                title="ហាងលក់ទំនិញ (Shop)"
              >
                <ShoppingBag className="w-4 h-4 text-amber-400" />
              </button>

              {/* Achievements */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenAchievements();
                }}
                className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 transition active:scale-95"
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
                className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-yellow-400 border border-slate-700 transition active:scale-95"
                title="តារាងចំណាត់ថ្នាក់ (Leaderboard)"
              >
                <Crown className="w-4 h-4" />
              </button>

              {/* Mute/Unmute */}
              <button
                onClick={() => {
                  onToggleSound();
                }}
                className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition active:scale-95"
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
        ) : (
          /* When NOT logged in: show Login/Register CTA and sound toggle cleanly on right */
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFx.playClick();
                onNavigate('auth');
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-xs shadow-lg transition active:scale-95"
            >
              <LogIn className="w-4 h-4" />
              <span>ចូលប្រើប្រាស់ / ចុះឈ្មោះ</span>
            </button>

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
        )}
      </div>

      {/* Mobile Nav Subbar */}
      <div className="flex lg:hidden items-center justify-around bg-slate-950/90 border-t border-slate-800 mt-2 pt-2 pb-1 text-xs font-bold">
        <button
          onClick={() => {
            soundFx.playClick();
            onNavigate('home');
          }}
          className={`flex items-center gap-1 px-3 py-1 rounded-lg ${
            currentView === 'home' ? 'text-amber-400 font-extrabold' : 'text-slate-400'
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>ទំព័រដើម</span>
        </button>

        <button
          onClick={() => {
            soundFx.playClick();
            onNavigate('tracks');
          }}
          className={`flex items-center gap-1 px-3 py-1 rounded-lg ${
            currentView === 'tracks' ? 'text-amber-400 font-extrabold' : 'text-slate-400'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>ជំនាញ</span>
        </button>

        <button
          onClick={() => {
            soundFx.playClick();
            onNavigate('map');
          }}
          className={`flex items-center gap-1 px-3 py-1 rounded-lg ${
            currentView === 'map' ? 'text-amber-400 font-extrabold' : 'text-slate-400'
          }`}
        >
          <Map className="w-3.5 h-3.5" />
          <span>ផែនទី</span>
        </button>

        <button
          onClick={() => {
            soundFx.playClick();
            onNavigate('auth');
          }}
          className={`flex items-center gap-1 px-3 py-1 rounded-lg ${
            currentView === 'auth' ? 'text-amber-400 font-extrabold' : 'text-slate-400'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>គណនី</span>
        </button>

        {currentView === 'lab' && (
          <button
            onClick={() => {
              soundFx.playClick();
              onNavigate('lab');
            }}
            className="flex items-center gap-1 px-3 py-1 rounded-lg text-indigo-400 font-extrabold"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>IDE</span>
          </button>
        )}
      </div>
    </header>
  );
};
