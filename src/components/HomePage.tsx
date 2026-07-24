import React from 'react';
import { UserStats, LanguageTrackId, CodingChallenge } from '../types';
import { ALL_LANGUAGE_TRACKS } from '../data/challenges';
import { soundFx } from '../utils/sound';
import {
  Sparkles,
  Play,
  Code2,
  Trophy,
  Bot,
  Zap,
  Target,
  Users,
  Compass,
  ArrowRight,
  Flame,
  Award,
  BookOpen,
} from 'lucide-react';

interface HomePageProps {
  stats: UserStats;
  challenges: CodingChallenge[];
  onStartQuestMap: (lang?: LanguageTrackId) => void;
  onExploreTracks: () => void;
  onOpenAiGenerator: () => void;
  onOpenAiTutor: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  stats,
  challenges,
  onStartQuestMap,
  onExploreTracks,
  onOpenAiGenerator,
  onOpenAiTutor,
}) => {
  return (
    <div className="min-h-[calc(100vh-65px)] bg-slate-950 text-slate-100 flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 px-4 md:px-8 bg-gradient-to-b from-slate-900 via-indigo-950/40 to-slate-950 border-b border-slate-800/80">
        {/* Glow ambient lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-lg shadow-amber-500/5">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>វេទិការៀនកូដជាភាសាខ្មែរដំបូងគេបង្អស់ Gamified RPG Platform</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight bg-gradient-to-r from-white via-slate-100 to-amber-200 bg-clip-text text-transparent">
            រៀនសរសេរកូដខ្មែរតាមបែប RPG <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
              ជាមួយ ១២ ភាសា & Frameworks ពេញនិយម
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
            អភិវឌ្ឍជំនាញ Coding របស់អ្នកពីកម្រិតដំបូងរហូតដល់ Senior Developer! រៀន HTML, CSS, Tailwind, JS, React, Vue, Nuxt, Next, Node, Express, NestJS និង Laravel ដោយប្រកួតដោះស្រាយលំហាត់ និងទទួលបាន XP, Gems & Badges!
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                soundFx.playClick();
                onStartQuestMap('javascript');
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-base shadow-xl shadow-amber-950/50 transition transform hover:-translate-y-1 active:scale-95 border border-amber-300/40 flex items-center justify-center gap-3"
            >
              <Play className="w-5 h-5 fill-slate-950 text-slate-950" />
              <span>ចាប់ផ្តើមលេងបេសកកម្មឥឡូវ</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onExploreTracks();
              }}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-sm border border-slate-700 transition transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
            >
              <Compass className="w-5 h-5 text-indigo-400" />
              <span>មើលជំនាញទាំង ១២ (Tracks)</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onOpenAiGenerator();
              }}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-purple-950/60 hover:bg-purple-900/80 text-purple-200 font-bold text-sm border border-purple-500/40 transition transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>បង្កើតលំហាត់ AI</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quick Statistics Strip */}
      <section className="bg-slate-900/80 border-b border-slate-800 py-6 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-black text-amber-400">១២ ភាសា</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Languages & Frameworks</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">១០០+ លំហាត់</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Interactive Coding Quests</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">១០០% ខ្មែរ</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Khmer Language & Stories</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-black text-indigo-400">២៤/៧ AI Tutor</div>
            <div className="text-xs text-slate-400 font-medium mt-1">អ្នកគ្រូកូដ AI ចាំជួយ</div>
          </div>
        </div>
      </section>

      {/* 12 Language & Framework Tracks Showcase */}
      <section className="py-12 px-4 md:px-8 max-w-6xl mx-auto w-full space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Code2 className="w-4 h-4" />
              <span>ជ្រើសរើសជំនាញរៀនកូដ (Coding Tracks)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              ១២ ផ្លូវរៀនសរសេរកូដ Frontend, Backend & Fullstack
            </h2>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onExploreTracks();
            }}
            className="text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>មើលផ្លូវជំនាញទាំងអស់</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ALL_LANGUAGE_TRACKS.map((track) => {
            const trackChallenges = challenges.filter((c) => c.language === track.id);
            const completedCount = trackChallenges.filter((c) =>
              stats.completedChallengeIds.includes(c.id)
            ).length;

            return (
              <div
                key={track.id}
                onClick={() => {
                  soundFx.playClick();
                  onStartQuestMap(track.id);
                }}
                className="group relative p-5 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-amber-400/80 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-amber-500/10 cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl group-hover:scale-110 transition-transform">{track.icon}</span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${track.badgeBg}`}>
                      {track.categoryType.toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {track.nameKhmer}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">{track.nameEn}</p>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {track.descriptionKhmer}
                  </p>
                </div>

                <div className="border-t border-slate-800/80 pt-3 flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-400">
                    {completedCount}/{trackChallenges.length} បញ្ចប់
                  </span>
                  <span className="text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>ចូលរៀន</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* RPG Gameplay How It Works Section */}
      <section className="py-12 px-4 md:px-8 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              របៀបលេង និងរៀនកូដ (How KhmerCode Quest Works)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              រៀនកូដដោយមិនធុញទ្រាន់! បំពេញបេសកកម្ម ទទួលបាន XP ឡើង Level និងក្លាយជាគ្រូមន្តអាគមកូដខ្មែរ!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-black text-xl">
                ១
              </div>
              <h3 className="text-base font-bold text-white">ជ្រើសរើសភាសាកូដ</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                ជ្រើសរើស HTML, CSS, JS, React, Next, Express, Nest ឬ Laravel តាមការចង់បានរបស់អ្នក។
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-black text-xl">
                ២
              </div>
              <h3 className="text-base font-bold text-white">សរសេរកូដ & រត់តេស្ត</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                សរសេរកូដក្នុង IDE ផ្ទាល់ រួចរត់លទ្ធផល Unit Tests និង Live Preview ភ្លាមៗ។
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-black text-xl">
                ៣
              </div>
              <h3 className="text-base font-bold text-white">ប្រមូល XP & Gems</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                រាល់ពេលដោះស្រាយលំហាត់ត្រូវ ទទួលបាន XP ឡើង Level និងប្រមូល Gems ទិញសំលៀកបំពាក់កូដ!
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center font-black text-xl">
                ៤
              </div>
              <h3 className="text-base font-bold text-white">ជំនួយពី AI Tutor</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                ជួប Error ឬស្ទះកូដ? ចុចសួរអ្នកគ្រូកូដ AI ដើម្បីអោយគាត់ពន្យល់ជាភាសាខ្មែរ ២៤/៧!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Tutor Feature Banner */}
      <section className="py-12 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-950 via-indigo-900 to-slate-900 border border-purple-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/40">
              <Bot className="w-4 h-4 text-purple-300" />
              <span>អ្នកគ្រូកូដ AI ចាំជួយសម្រួល</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              មានចម្ងល់ ឬស្ទះកូដ? AI Tutor ជួយពន្យល់ជាភាសាខ្មែរ!
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              អ្នកអាចសួរនាំ AI ពីវិធីដោះស្រាយ error, ទ្រឹស្តីកូដ, និងរបៀបសរសេរកូដអោយត្រឹមត្រូវតាមប្រព័ន្ធស្វ័យប្រវត្តគ្រប់ពេលវេលា!
            </p>
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenAiTutor();
              }}
              className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg transition active:scale-95 inline-flex items-center gap-2"
            >
              <Bot className="w-4 h-4" />
              <span>បើកឆាតជាមួយ AI Tutor</span>
            </button>
          </div>

          <div className="w-full md:w-80 p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs space-y-3 font-mono shadow-2xl">
            <div className="flex items-center gap-2 text-amber-300 font-bold border-b border-slate-800 pb-2">
              <Bot className="w-4 h-4 text-purple-400" />
              <span>AI Tutor Example</span>
            </div>
            <p className="text-slate-300 font-sans">
              "ជំរាបសួរ! នៅក្នុងករណី If/Else នេះ អ្នកភ្លេចរ៉ីថើនតម្លៃ 'អនុញ្ញាត'។ ព្យាយាមបន្ថែម `return 'អនុញ្ញាត';` មើលណា!"
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
