import React from 'react';
import { soundFx } from '../utils/sound';
import {
  Terminal,
  Code2,
  Heart,
  Sparkles,
  Github,
  Send,
  Facebook,
  Globe,
  Compass,
  Map,
  BookOpen,
  User,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'map' | 'tracks' | 'lab' | 'auth') => void;
  onOpenAiGenerator: () => void;
  onOpenShop: () => void;
  onOpenLeaderboard: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenAiGenerator,
  onOpenShop,
  onOpenLeaderboard, }) => {
  const handleLinkClick = (action: () => void) => {
    soundFx.playClick();
    action();
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 font-sans relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-32 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-32 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-10 border-b border-slate-800/80">
          
          {/* Col 1 & 2: Platform Info */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => handleLinkClick(() => onNavigate('home'))}
              className="inline-flex items-center gap-2 cursor-pointer group"
            >
              <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 shadow-md group-hover:scale-105 transition-transform">
                <Terminal className="w-5 h-5 font-black" />
              </div>
              <div>
                <span className="text-lg font-black text-white group-hover:text-amber-400 transition-colors">
                  KhmerCode Quest
                </span>
                <span className="block text-[11px] text-amber-400 font-semibold -mt-1">
                  ល្បែងរៀនសរសេរកូដខ្មែរ
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              វេទិការៀនសរសេរកូដបែបហ្គេមដំបូងគេបង្អស់ជាភាសាខ្មែរ! បង្កើនជំនាញ JavaScript, Python, React, HTML/CSS ជាមួយ AI Khmer Tutor និងប្រព័ន្ធបេសកកម្មសប្បាយៗ។
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 text-xs font-semibold">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% ឥតគិតថ្លៃសម្រាប់សិស្សខ្មែរ</span>
              </span>
            </div>
          </div>

          {/* Col 3: Menu Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>ម៉ឺនុយរហ័ស</span>
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleLinkClick(() => onNavigate('home'))}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span>• ទំព័រដើម (Home)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick(() => onNavigate('map'))}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span>• ផែនទីលំហាត់ (Quest Map)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick(() => onNavigate('tracks'))}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span>• មុខវិជ្ជាកូដ (Tracks)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick(() => onNavigate('auth'))}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-amber-300 font-semibold"
                >
                  <span>• គណនី / ចូលប្រើប្រាស់</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Features & AI */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>មុខងារពិសេស</span>
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleLinkClick(onOpenAiGenerator)}
                  className="hover:text-purple-300 transition-colors flex items-center gap-1.5 text-purple-400"
                >
                  <span>• បង្កើតលំហាត់ AI ស្វ័យប្រវត្តិ</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick(onOpenShop)}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-slate-300"
                >
                  <span>• ហាងទំនិញ (Shop & Gems)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick(onOpenLeaderboard)}
                  className="hover:text-yellow-300 transition-colors flex items-center gap-1.5 text-slate-300"
                >
                  <span>• តារាងចំណាត់ថ្នាក់ (Leaderboard)</span>
                </button>
              </li>
              <li className="text-slate-500 pt-1">
                <span>• ប្រព័ន្ធសំឡេង Interactive SoundFX</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Community & Socials */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>សហគមន៍ & ទំនាក់ទំនង</span>
            </h3>
            <p className="text-xs text-slate-400">
              ចូលរួមសហគមន៍អ្នកសរសេរកូដខ្មែរ ដើម្បីចែករំលែកចំណេះដឹង និងដោះស្រាយលំហាត់រួមគ្នា។
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition"
                title="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-cyan-400 transition"
                title="Telegram Group"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-blue-400 transition"
                title="Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Credit */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} KhmerCode Quest. រក្សាសិទ្ធិគ្រប់យ៉ាង។</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <span>បង្កើតឡើងដោយក្ដីស្រឡាញ់</span>
            <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500 animate-pulse" />
            <span>សម្រាប់អ្នកអភិវឌ្ឍន៍ និងសិស្សនិស្សិតកម្ពុជា</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
