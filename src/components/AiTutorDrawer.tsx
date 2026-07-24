import React, { useState, useRef, useEffect } from 'react';
import { AiMessage } from '../types';
import { soundFx } from '../utils/sound';
import {
  Bot,
  X,
  Send,
  Loader2,
  Sparkles,
  User,
  Lightbulb,
  Code2,
} from 'lucide-react';

interface AiTutorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  currentCode?: string;
  challengeTitle?: string;
}

export const AiTutorDrawer: React.FC<AiTutorDrawerProps> = ({
  isOpen,
  onClose,
  initialQuery,
  currentCode,
  challengeTitle,
}) => {
  const [messages, setMessages] = useState<AiMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: 'សួស្តីប្អូន! ខ្ញុំគឺជា "អ្នកគ្រូកូដ AI" 👩‍🏫✨\nតើប្អូនមានចម្ងល់ ឬត្រូវការជំនួយក្នុងការសរសេរកូដផ្នែកណាដែរ? ខ្ញុំរីករាយនឹងជួយពន្យល់ជាភាសាខ្មែរយ៉ាងលម្អិត!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialQuery && isOpen) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const queryText = textToSend || input;
    if (!queryText.trim() || loading) return;

    soundFx.playClick();

    const userMsg: AiMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userCode: currentCode,
          challengeTitle: challengeTitle || 'កូដទូទៅ',
          userQuery: queryText,
          mode: 'chat',
        }),
      });

      const data = await res.json();
      const replyText = data.reply || 'សុំទោស មិនអាចឆ្លើយតបបានទេនៅពេលនេះ។';

      const aiMsg: AiMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      soundFx.playGemCollect();
    } catch (err) {
      const errorMsg: AiMessage = {
        id: `err-${Date.now()}`,
        sender: 'system',
        text: '⚠️ មានបញ្ហាក្នុងការទាក់ទង AI Mentor។ សូមពិនិត្យមើលការតភ្ជាប់អ៊ីនធឺណិត។',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const QUICK_PROMPTS = [
    '💡 សូមអោយតម្រុយធ្វើលំហាត់នេះ',
    '❓ តើ return មានប្រយោជន៍អ្វី?',
    '🌀 ពន្យល់ពី for loop ឱ្យងាយយល់',
    '🧺 តើ Array ជាអ្វី?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 flex flex-col h-full shadow-2xl">
        {/* Drawer Header */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base flex items-center gap-1.5">
                <span>អ្នកគ្រូកូដ AI</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </h3>
              <p className="text-xs text-slate-400">គ្រូបង្រៀនកូដផ្ទាល់ខ្លួនជាភាសាខ្មែរ</p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const isSystem = msg.sender === 'system';

            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && !isSystem && (
                  <div className="w-8 h-8 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-indigo-300" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed space-y-1 ${
                    isUser
                      ? 'bg-amber-500 text-slate-950 font-medium rounded-br-none'
                      : isSystem
                      ? 'bg-red-950/60 text-red-300 border border-red-800/40'
                      : 'bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className="block text-[9px] opacity-60 text-right">
                    {msg.timestamp}
                  </span>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-amber-300" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-indigo-300 bg-slate-800/60 p-3 rounded-2xl w-fit">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
              <span>អ្នកគ្រូកំពុងសរសេរចម្លើយ...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="p-2 bg-slate-950/60 border-t border-slate-800/60 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {QUICK_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] whitespace-nowrap border border-slate-700 transition"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="សួរអ្នកគ្រូ AI ជាភាសាខ្មែរ..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500 transition"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={loading || !input.trim()}
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition active:scale-95 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
