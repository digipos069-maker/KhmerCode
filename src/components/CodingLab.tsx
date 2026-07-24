import React, { useState, useEffect } from 'react';
import { CodingChallenge, TestResult, UserStats } from '../types';
import { runCodeAndTest, CodeExecutionReport } from '../utils/codeRunner';
import { soundFx } from '../utils/sound';
import {
  Play,
  RotateCcw,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BookOpen,
  Terminal,
  Code,
  Lightbulb,
  MessageSquare,
  Bot,
  AlertTriangle,
  Send,
  Loader2,
} from 'lucide-react';

interface CodingLabProps {
  challenge: CodingChallenge;
  stats: UserStats;
  onBack: () => void;
  onSuccessComplete: (challenge: CodingChallenge, report: CodeExecutionReport) => void;
  onOpenAiTutor: (initialQuery?: string) => void;
}

export const CodingLab: React.FC<CodingLabProps> = ({
  challenge,
  stats,
  onBack,
  onSuccessComplete,
  onOpenAiTutor,
}) => {
  const [code, setCode] = useState<string>(challenge.starterCode);
  const [report, setReport] = useState<CodeExecutionReport | null>(null);
  const [activeLeftTab, setActiveLeftTab] = useState<'quest' | 'tests'>('quest');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [aiQuickLoading, setAiQuickLoading] = useState<boolean>(false);
  const [aiQuickReply, setAiQuickReply] = useState<string | null>(null);

  // Line numbers calculation
  const lineCount = code.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 12) }, (_, i) => i + 1);

  // Reset code
  const handleResetCode = () => {
    soundFx.playClick();
    setCode(challenge.starterCode);
    setReport(null);
    setAiQuickReply(null);
  };

  // Run Code & Execute Unit Tests
  const handleRunCode = () => {
    soundFx.playClick();
    setIsExecuting(true);
    setAiQuickReply(null);

    setTimeout(() => {
      const execReport = runCodeAndTest(code, challenge.testCases);
      setReport(execReport);
      setIsExecuting(false);
      setActiveLeftTab('tests');

      if (execReport.allPassed) {
        soundFx.playVictory();
        onSuccessComplete(challenge, execReport);
      } else if (execReport.passCount > 0) {
        soundFx.playTestPass();
      } else {
        soundFx.playTestFail();
      }
    }, 200);
  };

  // Request AI Quick Hint or Error Explanation
  const handleAiQuickAction = async (mode: 'hint' | 'explain-error') => {
    soundFx.playClick();
    setAiQuickLoading(true);
    setAiQuickReply(null);

    try {
      const res = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userCode: code,
          challengeTitle: challenge.titleKhmer,
          challengeDesc: challenge.descriptionKhmer,
          userQuery: mode === 'explain-error' && report ? report.logs.join('\n') : undefined,
          mode,
        }),
      });

      const data = await res.json();
      if (data.reply) {
        setAiQuickReply(data.reply);
      } else if (data.error) {
        setAiQuickReply(`⚠️ ${data.error}`);
      }
    } catch (err: any) {
      setAiQuickReply('⚠️ មិនអាចទាក់ទង AI Tutor បានទេ សូមព្យាយាមម្តងទៀត។');
    } finally {
      setAiQuickLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Bar Navigation & Controls */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundFx.playClick();
              onBack();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition active:scale-95"
            title="ត្រឡប់ទៅផែនទី (Back to Map)"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30">
                កម្រិត Level {challenge.levelNum}
              </span>
              <h2 className="text-base font-bold text-white truncate max-w-[200px] sm:max-w-md">
                {challenge.titleKhmer}
              </h2>
            </div>
            <p className="text-xs text-slate-400">{challenge.titleEn}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleResetCode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">កំណត់ឡើងវិញ</span>
          </button>

          <button
            onClick={handleRunCode}
            disabled={isExecuting}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-950/50 transition transform hover:scale-105 active:scale-95 border border-emerald-300/30 disabled:opacity-50"
          >
            {isExecuting ? (
              <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
            ) : (
              <Play className="w-4 h-4 fill-slate-950 text-slate-950" />
            )}
            <span>រត់កូដ និងធ្វើតេស្ត</span>
          </button>
        </div>
      </div>

      {/* Main Split Body */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Side: Quest Info / Theory / Test Results (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/60 border-r border-slate-800/80 flex flex-col h-full overflow-hidden">
          {/* Left Navigation Tabs */}
          <div className="flex items-center bg-slate-900 border-b border-slate-800 p-1">
            <button
              onClick={() => {
                soundFx.playClick();
                setActiveLeftTab('quest');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeLeftTab === 'quest'
                  ? 'bg-slate-800 text-amber-300 border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>បេសកកម្ម & ទ្រឹស្តី</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setActiveLeftTab('tests');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 relative ${
                activeLeftTab === 'tests'
                  ? 'bg-slate-800 text-indigo-300 border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>លទ្ធផលតេស្ត</span>
              {report && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    report.allPassed
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-red-500/20 text-red-400 border border-red-500/40'
                  }`}
                >
                  {report.passCount}/{report.totalCount}
                </span>
              )}
            </button>
          </div>

          {/* Left Content Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {activeLeftTab === 'quest' ? (
              <>
                {/* Quest Story Box */}
                <div className="bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 p-4 rounded-2xl border border-indigo-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                    <Sparkles className="w-4 h-4" />
                    <span>សាច់រឿងបេសកកម្ម</span>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed font-medium">
                    {challenge.storyKhmer}
                  </p>
                </div>

                {/* Instructions Box */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    ការណែនាំលំហាត់ (Instructions)
                  </h3>
                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-sm text-slate-200 whitespace-pre-line leading-relaxed font-medium">
                    {challenge.descriptionKhmer}
                  </div>
                </div>

                {/* Theory & Concepts */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>មេរៀនទ្រឹស្តីកូដ (Coding Concept)</span>
                  </h3>
                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800/80 text-xs text-slate-300 space-y-2 whitespace-pre-line">
                    {challenge.theoryKhmer}
                  </div>
                </div>

                {/* Key Concepts Chips */}
                <div className="flex items-center flex-wrap gap-1.5 pt-2">
                  {challenge.keyConcepts.map((concept, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-mono"
                    >
                      #{concept}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              /* Test Cases Results Tab */
              <div className="space-y-4">
                {!report ? (
                  <div className="text-center py-12 space-y-3">
                    <Terminal className="w-10 h-10 text-slate-600 mx-auto animate-pulse" />
                    <p className="text-sm text-slate-400">
                      សូមចុចប៊ូតុង <span className="text-emerald-400 font-bold">"រត់កូដ និងធ្វើតេស្ត"</span> ដើម្បីត្រួតពិនិត្យភាពត្រឹមត្រូវនៃកូដរបស់អ្នក!
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Execution Pass/Fail Header Banner */}
                    <div
                      className={`p-4 rounded-2xl border flex items-center justify-between ${
                        report.allPassed
                          ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                          : 'bg-red-950/60 border-red-500/50 text-red-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {report.allPassed ? (
                          <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0" />
                        ) : (
                          <XCircle className="w-7 h-7 text-red-400 shrink-0" />
                        )}
                        <div>
                          <h4 className="font-extrabold text-base">
                            {report.allPassed
                              ? '🎉 អបអរសាទរ! ធ្វើតេស្តឆ្លងទាំងអស់'
                              : '⚠️ តេស្តនៅមិនទាន់ឆ្លងទាំងអស់នៅឡើយ'}
                          </h4>
                          <p className="text-xs opacity-90">
                            បានឆ្លង {report.passCount} ក្នុងចំណោម {report.totalCount} ករណីតេស្ត ({report.runtimeMs}ms)
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Test List Details */}
                    <div className="space-y-3">
                      {report.results.map((res, idx) => (
                        <div
                          key={res.testCaseId}
                          className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                            res.passed
                              ? 'bg-slate-900/80 border-emerald-500/30'
                              : 'bg-slate-900/80 border-red-500/40'
                          }`}
                        >
                          <div className="flex items-center justify-between font-bold">
                            <span className="text-slate-300 flex items-center gap-1.5">
                              <span>ករណីតេស្ត #{idx + 1}:</span>
                              <code className="text-amber-300 bg-slate-950 px-2 py-0.5 rounded font-mono">
                                {res.inputDesc}
                              </code>
                            </span>
                            {res.passed ? (
                              <span className="text-emerald-400 font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> ឆ្លង
                              </span>
                            ) : (
                              <span className="text-red-400 font-bold flex items-center gap-1">
                                <XCircle className="w-3.5 h-3.5" /> បរាជ័យ
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono">
                            <div>
                              <span className="text-slate-500 block text-[10px]">តម្លៃរំពឹងទុក (Expected):</span>
                              <span className="text-emerald-300 font-semibold">{res.expected}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block text-[10px]">តម្លៃជាក់ស្តែង (Actual):</span>
                              <span
                                className={res.passed ? 'text-emerald-300 font-semibold' : 'text-red-400 font-semibold'}
                              >
                                {res.actual}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Code Editor & Console Output (7 cols) */}
        <div className="lg:col-span-7 flex flex-col h-full bg-slate-950">
          {/* Editor Header */}
          <div className="bg-slate-900/90 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-slate-200">solution.js</span>
            </div>
            <span>JavaScript (ES6)</span>
          </div>

          {/* Main Code Editor Input Pane */}
          <div className="flex-1 relative font-mono text-sm overflow-hidden flex bg-slate-950">
            {/* Line Numbers Sidebar */}
            <div className="w-10 select-none bg-slate-900/40 text-slate-600 text-right pr-3 py-3 border-r border-slate-800/60 leading-6 text-xs">
              {lineNumbers.map((n) => (
                <div key={n}>{n}</div>
              ))}
            </div>

            {/* Code Textarea */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="flex-1 bg-transparent text-emerald-300 p-3 outline-none resize-none leading-6 font-mono font-medium focus:ring-0 selection:bg-indigo-600 selection:text-white"
              placeholder="// សរសេរកូដនៅទីនេះ..."
            />
          </div>

          {/* Console Log Drawer */}
          <div className="bg-slate-900 border-t border-slate-800 p-3 max-h-36 overflow-y-auto font-mono text-xs text-slate-300 space-y-1">
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-sans border-b border-slate-800 pb-1 mb-1">
              <span className="flex items-center gap-1 font-bold">
                <Terminal className="w-3.5 h-3.5 text-amber-400" /> Console Output
              </span>
              <span>{report?.logs.length || 0} logs</span>
            </div>

            {report && report.logs.length > 0 ? (
              report.logs.map((log, i) => (
                <div key={i} className="text-slate-300">
                  <span className="text-slate-600 mr-2">&gt;</span>
                  {log}
                </div>
              ))
            ) : (
              <p className="text-slate-600 italic">គ្មានទិន្នន័យ console output ឡើយ</p>
            )}
          </div>

          {/* Bottom AI Tutor Assistant Strip */}
          <div className="bg-slate-900/95 border-t border-slate-800 p-3 space-y-3">
            {/* Quick Helper Buttons */}
            <div className="flex items-center flex-wrap gap-2">
              <button
                onClick={() => handleAiQuickAction('hint')}
                disabled={aiQuickLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 transition active:scale-95 disabled:opacity-50"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>💡 សុំតម្រុយ (Get Hint)</span>
              </button>

              <button
                onClick={() => handleAiQuickAction('explain-error')}
                disabled={aiQuickLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-semibold border border-red-500/30 transition active:scale-95 disabled:opacity-50"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                <span>🐞 ពន្យល់ Error</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenAiTutor(`សូមជួយពន្យល់ពីរបៀបធ្វើលំហាត់ "${challenge.titleKhmer}" អោយខ្ញុំបន្តិច`);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 text-xs font-semibold border border-indigo-500/40 transition active:scale-95 ml-auto"
              >
                <Bot className="w-4 h-4 text-indigo-400" />
                <span>ឆាតជាមួយអ្នកគ្រូ AI</span>
              </button>
            </div>

            {/* Quick AI Response Display Box */}
            {aiQuickLoading && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-amber-300 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                <span>អ្នកគ្រូកូដ AI កំពុងវិភាគកូដរបស់អ្នក...</span>
              </div>
            )}

            {aiQuickReply && (
              <div className="p-3.5 rounded-2xl bg-indigo-950/70 border border-indigo-500/40 text-xs text-slate-100 space-y-2 animate-fadeIn max-h-48 overflow-y-auto">
                <div className="flex items-center justify-between font-bold text-amber-300 border-b border-indigo-800/60 pb-1">
                  <span className="flex items-center gap-1.5">
                    <Bot className="w-4 h-4 text-indigo-400" />
                    <span>ការណែនាំពីអ្នកគ្រូកូដ AI:</span>
                  </span>
                  <button
                    onClick={() => setAiQuickReply(null)}
                    className="text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <p className="whitespace-pre-line leading-relaxed">{aiQuickReply}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
