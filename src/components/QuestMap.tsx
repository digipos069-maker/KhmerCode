import React, { useState } from 'react';
import { CodingChallenge, UserStats, CategoryId } from '../types';
import { soundFx } from '../utils/sound';
import {
  Lock,
  CheckCircle2,
  Play,
  Crown,
  Sparkles,
  BookOpen,
  Compass,
  Star,
  Award,
  Swords,
  ChevronRight,
} from 'lucide-react';

interface QuestMapProps {
  challenges: CodingChallenge[];
  stats: UserStats;
  onSelectChallenge: (challenge: CodingChallenge) => void;
  onOpenAiGenerator: () => void;
}

const CATEGORY_TABS: { id: CategoryId | 'all'; labelKhmer: string; icon: string }[] = [
  { id: 'all', labelKhmer: '🗺️ ផ្លូវបេសកកម្មទាំងអស់', icon: '🗺️' },
  { id: 'basics', labelKhmer: '🌱 មូលដ្ឋានកូដ (Basics)', icon: '🌱' },
  { id: 'control_flow', labelKhmer: '🔀 លក្ខខណ្ឌ (If/Else)', icon: '🔀' },
  { id: 'functions', labelKhmer: '⚙️ អនុគមន៍ (Functions)', icon: '⚙️' },
  { id: 'arrays', labelKhmer: '🧺 កន្ត្រកទិន្នន័យ (Arrays)', icon: '🧺' },
  { id: 'objects', labelKhmer: '💎 វត្ថុ (Objects)', icon: '💎' },
  { id: 'algorithms', labelKhmer: '👑 មេកូដ (Algorithms)', icon: '👑' },
];

export const QuestMap: React.FC<QuestMapProps> = ({
  challenges,
  stats,
  onSelectChallenge,
  onOpenAiGenerator,
}) => {
  const [selectedCat, setSelectedCat] = useState<CategoryId | 'all'>('all');

  const filteredChallenges = challenges.filter(
    (c) => selectedCat === 'all' || c.category === selectedCat
  );

  return (
    <div className="min-h-[calc(100vh-65px)] bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Banner Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 p-6 md:p-8 shadow-2xl">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>រៀនសរសេរកូដតាមរយៈល្បែងកម្សាន្តខ្មែរ</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-amber-200 bg-clip-text text-transparent">
                ពិភពបេសកកម្មកូដខ្មែរ (KhmerCode Quest Map)
              </h1>
              <p className="text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed">
                សូមស្វាគមន៍អ្នកក្លាហាន! ជ្រើសរើសវគ្គសិក្សាកូដតាមលំដាប់លំដោយ ដោះស្រាយប្រឡងកូដ ទទួលបាន XP និង Gems ដើម្បីដំឡើងកម្រិតស្ដេចកូដខ្មែរ!
              </p>
            </div>

            {/* Quick Play & AI Generator trigger */}
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenAiGenerator();
                }}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-950/60 border border-purple-400/30 transition transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
                <span>បង្កើតលំហាត់ AI ដោយខ្លួនឯង</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORY_TABS.map((tab) => {
            const isActive = selectedCat === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedCat(tab.id);
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20 scale-105'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {tab.labelKhmer}
              </button>
            );
          })}
        </div>

        {/* RPG Quest Nodes Map Tree */}
        <div className="relative py-4 px-2">
          {/* Vertical Connecting Map Path Line */}
          <div className="absolute left-1/2 top-10 bottom-10 w-1.5 -translate-x-1/2 bg-gradient-to-b from-amber-500/50 via-indigo-500/40 to-purple-600/30 rounded-full z-0 hidden md:block" />

          <div className="space-y-8 relative z-10">
            {filteredChallenges.map((challenge, idx) => {
              const isCompleted = stats.completedChallengeIds.includes(challenge.id);
              const isUnlocked =
                challenge.levelNum === 1 ||
                stats.completedChallengeIds.includes(`quest-${challenge.levelNum - 1}`) ||
                stats.unlockedChallengeIds.includes(challenge.id);

              const isBoss = challenge.difficulty === 'មេបញ្ជាការ (Boss)';

              // Alternate zigzag position for desktop RPG road look
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={challenge.id}
                  className={`flex flex-col md:flex-row items-center gap-4 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Left or Right Content Card */}
                  <div className="w-full md:w-5/12">
                    <div
                      onClick={() => {
                        if (isUnlocked) {
                          soundFx.playClick();
                          onSelectChallenge(challenge);
                        } else {
                          soundFx.playTestFail();
                        }
                      }}
                      className={`group relative p-5 rounded-3xl border transition-all duration-300 cursor-pointer ${
                        isCompleted
                          ? 'bg-slate-900/90 border-emerald-500/50 hover:border-emerald-400 shadow-lg shadow-emerald-950/20'
                          : isUnlocked
                          ? isBoss
                            ? 'bg-gradient-to-br from-amber-950/80 via-slate-900 to-red-950/80 border-amber-500/60 hover:border-amber-400 shadow-xl shadow-amber-950/40 hover:-translate-y-1'
                            : 'bg-slate-900/90 border-indigo-500/40 hover:border-indigo-400 shadow-lg hover:-translate-y-1'
                          : 'bg-slate-950/60 border-slate-800/80 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      {/* Card Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              isBoss
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                            }`}
                          >
                            កម្រិត Level {challenge.levelNum}
                          </span>
                          <span className="text-xs font-semibold text-slate-400">
                            {challenge.difficulty}
                          </span>
                        </div>

                        {/* Status Badge */}
                        {isCompleted ? (
                          <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/50">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>បញ្ចប់ហើយ</span>
                          </div>
                        ) : isUnlocked ? (
                          <div className="flex items-center gap-1 text-amber-300 text-xs font-bold bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-800/50 group-hover:scale-105 transition-transform">
                            <Play className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                            <span>ចាប់ផ្តើម</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-slate-500 text-xs font-bold bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
                            <Lock className="w-3 h-3 text-slate-500" />
                            <span>ជាប់សោ</span>
                          </div>
                        )}
                      </div>

                      {/* Quest Title */}
                      <h3 className="text-base md:text-lg font-bold text-white group-hover:text-amber-300 transition-colors flex items-center gap-2">
                        <span>{challenge.titleKhmer}</span>
                        {isBoss && <Crown className="w-5 h-5 text-amber-400 inline" />}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium mb-3">
                        {challenge.titleEn}
                      </p>

                      {/* Story Snippet */}
                      <p className="text-xs text-slate-300 line-clamp-2 mb-4 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/50">
                        {challenge.storyKhmer}
                      </p>

                      {/* Rewards Footer */}
                      <div className="flex items-center justify-between text-xs font-semibold border-t border-slate-800/80 pt-3">
                        <div className="flex items-center gap-3">
                          <span className="text-amber-400 flex items-center gap-1">
                            ⚡ +{challenge.xp} XP
                          </span>
                          <span className="text-cyan-300 flex items-center gap-1">
                            💎 +{challenge.gems} Gems
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-indigo-300 group-hover:translate-x-1 transition-transform">
                          <span>លេងឥឡូវ</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center Map Node Icon */}
                  <div className="relative shrink-0 flex items-center justify-center my-2 md:my-0">
                    <button
                      onClick={() => {
                        if (isUnlocked) {
                          soundFx.playClick();
                          onSelectChallenge(challenge);
                        } else {
                          soundFx.playTestFail();
                        }
                      }}
                      className={`w-14 h-14 md:w-16 md:h-16 rounded-3xl flex items-center justify-center font-black text-lg transition-all duration-300 shadow-2xl relative ${
                        isCompleted
                          ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 border-4 border-slate-950 ring-4 ring-emerald-500/30'
                          : isUnlocked
                          ? isBoss
                            ? 'bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 text-white border-4 border-slate-950 ring-4 ring-amber-500/50 animate-bounce'
                            : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-4 border-slate-950 ring-4 ring-indigo-500/40 hover:scale-110'
                          : 'bg-slate-900 text-slate-600 border-4 border-slate-950 ring-2 ring-slate-800'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-8 h-8 text-slate-950" />
                      ) : isUnlocked ? (
                        isBoss ? (
                          <Swords className="w-8 h-8 text-white" />
                        ) : (
                          <span>{challenge.levelNum}</span>
                        )
                      ) : (
                        <Lock className="w-6 h-6 text-slate-600" />
                      )}
                    </button>
                  </div>

                  {/* Spacer for opposite side alignment */}
                  <div className="hidden md:block w-5/12" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
