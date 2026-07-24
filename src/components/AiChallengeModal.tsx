import React, { useState } from 'react';
import { CodingChallenge } from '../types';
import { soundFx } from '../utils/sound';
import { Sparkles, X, Loader2, Code, ShieldAlert, Check } from 'lucide-react';

interface AiChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGeneratedChallenge: (challenge: CodingChallenge) => void;
}

export const AiChallengeModal: React.FC<AiChallengeModalProps> = ({
  isOpen,
  onClose,
  onStartGeneratedChallenge,
}) => {
  const [topic, setTopic] = useState<string>('JavaScript Basics');
  const [difficulty, setDifficulty] = useState<string>('Beginner');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    soundFx.playClick();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/generate-challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, difficulty }),
      });

      const data = await res.json();
      if (data.challenge && data.challenge.title) {
        // Format to CodingChallenge object
        const generated: CodingChallenge = {
          id: `ai-quest-${Date.now()}`,
          levelNum: 99,
          titleKhmer: data.challenge.title,
          titleEn: data.challenge.titleEn || topic,
          category: 'ai_generated',
          difficulty: 'មធ្យម',
          xp: data.challenge.xp || 150,
          gems: data.challenge.gems || 30,
          storyKhmer: data.challenge.story || 'បេសកកម្ម AI ពិសេសត្រូវបានបង្កើតឡើងសម្រាប់អ្នក!',
          descriptionKhmer: data.challenge.description || 'សរសេរកូដដោះស្រាយលំហាត់',
          theoryKhmer: data.challenge.solutionHint || 'ប្រើប្រាស់ចំណេះដឹងកូដរបស់អ្នកដើម្បីដោះស្រាយ',
          keyConcepts: [topic.toLowerCase(), 'ai-generated'],
          starterCode: data.challenge.starterCode || '// សរសេរកូដនៅទីនេះ\nfunction solution() {\n  return "";\n}',
          solutionHintKhmer: data.challenge.solutionHint || 'ពិនិត្យមើលលក្ខខណ្ឌ',
          solutionCode: data.challenge.starterCode,
          testCases: data.challenge.testCases.map((tc: any, i: number) => ({
            id: `tc-ai-${i}`,
            inputDescription: tc.inputDescription || tc.testFnCall,
            testFnCall: tc.testFnCall,
            expectedOutput: tc.expectedOutput,
            isSecret: tc.isSecret || false,
          })),
        };

        soundFx.playVictory();
        onStartGeneratedChallenge(generated);
        onClose();
      } else {
        setErrorMsg('មិនអាចបង្កើតលំហាត់បានទេ សូមព្យាយាមម្តងទៀត។');
      }
    } catch (err: any) {
      setErrorMsg('មានបញ្ហាក្នុងការភ្ជាប់ទៅ AI Service');
    } finally {
      setLoading(false);
    }
  };

  const POPULAR_TOPICS = [
    'JavaScript Math',
    'String Operations',
    'Array Manipulation',
    'Object Lookup',
    'Logical Puzzles',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg bg-slate-900 border border-purple-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 p-4">
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

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white">បង្កើតលំហាត់ AI ថ្មី</h3>
            <p className="text-xs text-slate-400">បង្កើតបេសកកម្មកូដខ្មែរគ្មានដែនកំណត់ដោយប្រើ AI</p>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-bold mb-1.5">
              ប្រធានបទលំហាត់ (Topic):
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="ឧទាហរណ៍: Arrays, Strings, Loops, Logic"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-purple-500"
            />
            {/* Quick Chips */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {POPULAR_TOPICS.map((top, idx) => (
                <button
                  key={idx}
                  onClick={() => setTopic(top)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] border border-slate-700"
                >
                  {top}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1.5">
              កម្រិតលំបាក (Difficulty):
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Beginner (ងាយ)', 'Intermediate (មធ្យម)', 'Advanced (ពិបាក)'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`py-2 rounded-xl text-xs font-bold border transition ${
                    difficulty === diff
                      ? 'bg-purple-600 text-white border-purple-400'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  {diff.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-xs text-red-300">
            {errorMsg}
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleGenerate}
          disabled={loading || !topic.trim()}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-sm shadow-xl transition active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-amber-300" />
              <span>AI កំពុងបង្កើតលំហាត់កូដខ្មែរ...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>ចាប់ផ្តើមបង្កើត និងលេងឥឡូវ</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
