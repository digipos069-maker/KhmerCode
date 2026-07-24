import React, { useState, useEffect } from 'react';
import { UserStats, CodingChallenge, LanguageTrackId } from './types';
import { KHMER_CODING_CHALLENGES } from './data/challenges';
import { soundFx } from './utils/sound';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { TracksPage } from './components/TracksPage';
import { QuestMap } from './components/QuestMap';
import { CodingLab } from './components/CodingLab';
import { AiTutorDrawer } from './components/AiTutorDrawer';
import { AiChallengeModal } from './components/AiChallengeModal';
import { ShopModal } from './components/ShopModal';
import { AchievementsModal } from './components/AchievementsModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { VictoryModal } from './components/VictoryModal';
import { CodeExecutionReport } from './utils/codeRunner';

const STORAGE_KEY = 'khmercode_quest_stats_v2';

const DEFAULT_STATS: UserStats = {
  level: 1,
  xp: 0,
  maxXp: 100,
  gems: 50,
  hearts: 5,
  maxHearts: 5,
  streakDays: 3,
  completedChallengeIds: [],
  unlockedChallengeIds: [
    'quest-1',
    'quest-html-1',
    'quest-css-1',
    'quest-tw-1',
    'quest-react-1',
    'quest-vue-1',
    'quest-nuxt-1',
    'quest-next-1',
    'quest-node-1',
    'quest-express-1',
    'quest-nest-1',
    'quest-laravel-1',
  ],
  avatar: '🧙‍♂️',
  title: 'អ្នកសរសេរកូដដំបូង',
  soundEnabled: true,
  theme: 'default',
  purchasedItems: [],
};

export default function App() {
  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return DEFAULT_STATS;
  });

  const [selectedLanguage, setSelectedLanguage] = useState<LanguageTrackId>('javascript');
  const [challenges, setChallenges] = useState<CodingChallenge[]>(KHMER_CODING_CHALLENGES);
  const [activeChallenge, setActiveChallenge] = useState<CodingChallenge | null>(null);
  const [view, setView] = useState<'home' | 'map' | 'tracks' | 'lab'>('home');

  // Modals
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isAiGeneratorOpen, setIsAiGeneratorOpen] = useState(false);
  const [isVictoryOpen, setIsVictoryOpen] = useState(false);

  // AI Tutor Drawer
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);
  const [aiTutorInitialQuery, setAiTutorInitialQuery] = useState<string | undefined>(undefined);

  // Save stats to localStorage on update
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch {
      // Ignore storage errors
    }
    soundFx.enabled = stats.soundEnabled;
  }, [stats]);

  // Handle Challenge Select
  const handleSelectChallenge = (challenge: CodingChallenge) => {
    setActiveChallenge(challenge);
    setView('lab');
  };

  // Handle Challenge Completion
  const handleSuccessComplete = (challenge: CodingChallenge, report: CodeExecutionReport) => {
    setStats((prev) => {
      const isFirstTime = !prev.completedChallengeIds.includes(challenge.id);
      const xpGained = isFirstTime ? challenge.xp : Math.round(challenge.xp * 0.3);
      const gemsGained = isFirstTime ? challenge.gems : 5;

      let newXp = prev.xp + xpGained;
      let newLevel = prev.level;
      let newMaxXp = prev.maxXp;

      // Level up logic
      if (newXp >= newMaxXp) {
        newLevel += 1;
        newXp -= newMaxXp;
        newMaxXp = newLevel * 100;
      }

      const updatedCompleted = isFirstTime
        ? [...prev.completedChallengeIds, challenge.id]
        : prev.completedChallengeIds;

      const nextLevelId = `quest-${challenge.levelNum + 1}`;
      const updatedUnlocked = prev.unlockedChallengeIds.includes(nextLevelId)
        ? prev.unlockedChallengeIds
        : [...prev.unlockedChallengeIds, nextLevelId];

      return {
        ...prev,
        level: newLevel,
        xp: newXp,
        maxXp: newMaxXp,
        gems: prev.gems + gemsGained,
        completedChallengeIds: updatedCompleted,
        unlockedChallengeIds: updatedUnlocked,
      };
    });

    setIsVictoryOpen(true);
  };

  // Handle Next Quest Button
  const handleNextQuest = () => {
    setIsVictoryOpen(false);
    if (!activeChallenge) return;

    const currentLevel = activeChallenge.levelNum;
    const nextChallenge = challenges.find(
      (c) => c.language === activeChallenge.language && c.levelNum === currentLevel + 1
    );

    if (nextChallenge) {
      setActiveChallenge(nextChallenge);
    } else {
      setView('map');
    }
  };

  // Handle Shop Purchase
  const handleBuyItem = (
    itemId: string,
    type: string,
    priceGems: number,
    value: string
  ) => {
    setStats((prev) => {
      if (prev.gems < priceGems) return prev;

      let newAvatar = prev.avatar;
      let newTitle = prev.title;
      let newHearts = prev.hearts;

      if (type === 'avatar') newAvatar = value;
      if (type === 'title') newTitle = value;
      if (type === 'heart') newHearts = prev.maxHearts;

      return {
        ...prev,
        gems: prev.gems - priceGems,
        avatar: newAvatar,
        title: newTitle,
        hearts: newHearts,
        purchasedItems: [...prev.purchasedItems, itemId],
      };
    });
  };

  // Toggle Sound FX
  const handleToggleSound = () => {
    setStats((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  // Open AI Tutor Drawer
  const handleOpenAiTutor = (query?: string) => {
    setAiTutorInitialQuery(query);
    setIsAiTutorOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Header Bar */}
      <Navbar
        stats={stats}
        currentView={view}
        onNavigate={(v) => setView(v)}
        onOpenShop={() => setIsShopOpen(true)}
        onOpenAchievements={() => setIsAchievementsOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onOpenAiGenerator={() => setIsAiGeneratorOpen(true)}
        onToggleSound={handleToggleSound}
      />

      {/* Main Multi-Page Router */}
      <main>
        {view === 'home' && (
          <HomePage
            stats={stats}
            challenges={challenges}
            onStartQuestMap={(lang) => {
              if (lang) setSelectedLanguage(lang);
              setView('map');
            }}
            onExploreTracks={() => setView('tracks')}
            onOpenAiGenerator={() => setIsAiGeneratorOpen(true)}
            onOpenAiTutor={() => handleOpenAiTutor()}
          />
        )}

        {view === 'tracks' && (
          <TracksPage
            stats={stats}
            challenges={challenges}
            onSelectTrack={(lang) => {
              setSelectedLanguage(lang);
              setView('map');
            }}
            onOpenAiGenerator={() => setIsAiGeneratorOpen(true)}
          />
        )}

        {view === 'map' && (
          <QuestMap
            challenges={challenges}
            stats={stats}
            selectedLanguage={selectedLanguage}
            onSelectLanguage={(lang) => setSelectedLanguage(lang)}
            onSelectChallenge={handleSelectChallenge}
            onOpenAiGenerator={() => setIsAiGeneratorOpen(true)}
          />
        )}

        {view === 'lab' && activeChallenge && (
          <CodingLab
            challenge={activeChallenge}
            stats={stats}
            onBack={() => setView('map')}
            onSuccessComplete={handleSuccessComplete}
            onOpenAiTutor={handleOpenAiTutor}
          />
        )}
      </main>

      {/* Slide-over AI Khmer Tutor Chat */}
      <AiTutorDrawer
        isOpen={isAiTutorOpen}
        onClose={() => setIsAiTutorOpen(false)}
        initialQuery={aiTutorInitialQuery}
        currentCode={activeChallenge?.starterCode}
        challengeTitle={activeChallenge?.titleKhmer}
      />

      {/* AI Challenge Generator Modal */}
      <AiChallengeModal
        isOpen={isAiGeneratorOpen}
        selectedLanguage={selectedLanguage}
        onClose={() => setIsAiGeneratorOpen(false)}
        onStartGeneratedChallenge={(generated) => {
          setChallenges((prev) => [generated, ...prev]);
          setSelectedLanguage(generated.language);
          setActiveChallenge(generated);
          setView('lab');
        }}
      />

      {/* Shop Modal */}
      <ShopModal
        isOpen={isShopOpen}
        stats={stats}
        onClose={() => setIsShopOpen(false)}
        onBuyItem={handleBuyItem}
      />

      {/* Achievements Modal */}
      <AchievementsModal
        isOpen={isAchievementsOpen}
        stats={stats}
        onClose={() => setIsAchievementsOpen(false)}
      />

      {/* Leaderboard Modal */}
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        stats={stats}
        onClose={() => setIsLeaderboardOpen(false)}
      />

      {/* Victory Level Completed Modal */}
      {activeChallenge && (
        <VictoryModal
          isOpen={isVictoryOpen}
          challenge={activeChallenge}
          onNextQuest={handleNextQuest}
          onGoToMap={() => {
            setIsVictoryOpen(false);
            setView('map');
          }}
        />
      )}
    </div>
  );
}
