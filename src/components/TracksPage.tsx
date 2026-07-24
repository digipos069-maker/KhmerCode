import React, { useState } from 'react';
import { UserStats, LanguageTrackId, CodingChallenge } from '../types';
import { ALL_LANGUAGE_TRACKS } from '../data/challenges';
import { soundFx } from '../utils/sound';
import {
  Code2,
  BookOpen,
  CheckCircle2,
  Play,
  ArrowRight,
  Sparkles,
  Layers,
  Terminal,
} from 'lucide-react';

interface TracksPageProps {
  stats: UserStats;
  challenges: CodingChallenge[];
  onSelectTrack: (lang: LanguageTrackId) => void;
  onOpenAiGenerator: () => void;
}

export const TracksPage: React.FC<TracksPageProps> = ({
  stats,
  challenges,
  onSelectTrack,
  onOpenAiGenerator,
}) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'frontend' | 'fullstack' | 'backend'>('all');

  const filteredTracks = ALL_LANGUAGE_TRACKS.filter((track) => {
    if (filterCategory === 'all') return true;
    return track.categoryType === filterCategory;
  });

  return (
    <div className="min-h-[calc(100vh-65px)] bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900/80 p-6 md:p-8 rounded-3xl border border-slate-800">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Code2 className="w-3.5 h-3.5 text-amber-400" />
              <span>កាតាលុកជំនាញទាំង ១៥ (All 15 Learning Tracks)</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-white">
              ជ្រើសរើសជំនាញរៀនសរសេរកូដ (Coding Track Catalog)
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              ស្វែងយល់ពីបណ្តុំភាសារៀនកូដ, Web Frameworks និង ប្រព័ន្ធទិន្នន័យ Databases (PostgreSQL, MySQL, Oracle) ទាំង ១៥។ ចុចលើជំនាញណាមួយដើម្បីចូលទៅប្រកួតដោះស្រាយលំហាត់ក្នុងផែនទីបេសកកម្ម!
            </p>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onOpenAiGenerator();
            }}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xl border border-purple-400/30 transition active:scale-95 flex items-center justify-center gap-2 shrink-0 self-start md:self-auto"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>បង្កើតលំហាត់ AI</span>
          </button>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center flex-wrap gap-2 bg-slate-900/60 p-2 rounded-2xl border border-slate-800">
          <button
            onClick={() => {
              soundFx.playClick();
              setFilterCategory('all');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              filterCategory === 'all'
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ទាំងអស់ (All Tracks - 15)
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setFilterCategory('frontend');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              filterCategory === 'frontend'
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🎨 Frontend Web (HTML, CSS, JS, React, Vue)
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setFilterCategory('fullstack');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              filterCategory === 'fullstack'
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ⛰️ Fullstack (Next.js, Nuxt.js)
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setFilterCategory('backend');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              filterCategory === 'backend'
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🟢 Backend & APIs (Node, Express, Nest, Laravel)
          </button>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTracks.map((track) => {
            const trackChallenges = challenges.filter((c) => c.language === track.id);
            const completedCount = trackChallenges.filter((c) =>
              stats.completedChallengeIds.includes(c.id)
            ).length;

            const progressPct =
              trackChallenges.length > 0
                ? Math.round((completedCount / trackChallenges.length) * 100)
                : 0;

            return (
              <div
                key={track.id}
                className="group relative p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-400/80 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between space-y-5"
              >
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-3xl shadow-inner group-hover:scale-105 transition-transform">
                      {track.icon}
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${track.badgeBg}`}>
                      {track.categoryType.toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-extrabold text-white group-hover:text-amber-300 transition-colors">
                      {track.nameKhmer}
                    </h3>
                    <p className="text-xs text-slate-400 font-semibold">{track.nameEn}</p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed min-h-[36px]">
                    {track.descriptionKhmer}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                      <span>វឌ្ឍនភាព (Progress):</span>
                      <span className="text-amber-400 font-bold">{progressPct}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">
                    មាន <strong className="text-white">{trackChallenges.length}</strong> លំហាត់
                  </span>

                  <button
                    onClick={() => {
                      soundFx.playClick();
                      onSelectTrack(track.id);
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-md transition transform active:scale-95 flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                    <span>ចូលរៀនផ្លូវនេះ</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
