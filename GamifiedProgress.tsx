import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  Trophy, 
  Star, 
  Flame, 
  Zap, 
  Target, 
  Award, 
  TrendingUp, 
  Users, 
  Calendar, 
  BookOpen,
  Code,
  Brain,
  MessageSquare,
  Crown,
  Medal,
  Gift,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Minus,
  ChevronRight,
  Clock,
  CheckCircle,
  Lock,
  Unlock,
  Gem,
  Shield,
  Rocket,
  Heart,
  Lightning
} from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'coding' | 'streak' | 'social' | 'milestone' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xpReward: number;
  unlocked: boolean;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
}

interface LeaderboardEntry {
  rank: number;
  user: {
    id: string;
    name: string;
    avatar?: string;
    level: number;
  };
  xp: number;
  weeklyXp: number;
  streak: number;
  completedChallenges: number;
  change: 'up' | 'down' | 'same';
}

interface UserStats {
  totalXp: number;
  level: number;
  currentLevelXp: number;
  nextLevelXp: number;
  streak: number;
  longestStreak: number;
  completedChallenges: number;
  averageScore: number;
  weeklyXp: number;
  monthlyXp: number;
  rank: number;
  achievements: Achievement[];
}

interface GamifiedProgressProps {
  onBack: () => void;
}

export function GamifiedProgress({ onBack }: GamifiedProgressProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  useEffect(() => {
    // Mock user stats
    const mockStats: UserStats = {
      totalXp: 2450,
      level: 5,
      currentLevelXp: 450,
      nextLevelXp: 500,
      streak: 12,
      longestStreak: 28,
      completedChallenges: 28,
      averageScore: 87,
      weeklyXp: 340,
      monthlyXp: 1200,
      rank: 15,
      achievements: [
        {
          id: 'first-solve',
          title: 'First Steps',
          description: 'Solve your first coding problem',
          icon: '🎯',
          category: 'milestone',
          rarity: 'common',
          xpReward: 50,
          unlocked: true,
          unlockedAt: new Date('2024-12-01'),
          progress: 1,
          maxProgress: 1
        },
        {
          id: 'streak-7',
          title: 'Week Warrior',
          description: 'Maintain a 7-day practice streak',
          icon: '🔥',
          category: 'streak',
          rarity: 'rare',
          xpReward: 100,
          unlocked: true,
          unlockedAt: new Date('2024-12-15'),
          progress: 7,
          maxProgress: 7
        },
        {
          id: 'problem-solver',
          title: 'Problem Solver',
          description: 'Solve 25 coding problems',
          icon: '💡',
          category: 'coding',
          rarity: 'rare',
          xpReward: 150,
          unlocked: true,
          unlockedAt: new Date('2024-12-20'),
          progress: 25,
          maxProgress: 25
        },
        {
          id: 'perfect-score',
          title: 'Perfectionist',
          description: 'Get 100% score on 5 problems',
          icon: '⭐',
          category: 'milestone',
          rarity: 'epic',
          xpReward: 200,
          unlocked: false,
          progress: 3,
          maxProgress: 5
        },
        {
          id: 'streak-master',
          title: 'Streak Master',
          description: 'Maintain a 30-day practice streak',
          icon: '👑',
          category: 'streak',
          rarity: 'legendary',
          xpReward: 500,
          unlocked: false,
          progress: 12,
          maxProgress: 30
        },
        {
          id: 'system-designer',
          title: 'System Architect',
          description: 'Complete 10 system design challenges',
          icon: '🏗️',
          category: 'coding',
          rarity: 'epic',
          xpReward: 300,
          unlocked: false,
          progress: 2,
          maxProgress: 10
        }
      ]
    };

    const mockLeaderboard: LeaderboardEntry[] = [
      {
        rank: 1,
        user: { id: '1', name: 'Alex Chen', level: 8 },
        xp: 4250,
        weeklyXp: 520,
        streak: 45,
        completedChallenges: 75,
        change: 'up'
      },
      {
        rank: 2,
        user: { id: '2', name: 'Sarah Johnson', level: 7 },
        xp: 3980,
        weeklyXp: 480,
        streak: 23,
        completedChallenges: 68,
        change: 'down'
      },
      {
        rank: 3,
        user: { id: '3', name: 'Mike Rodriguez', level: 7 },
        xp: 3750,
        weeklyXp: 450,
        streak: 31,
        completedChallenges: 62,
        change: 'up'
      },
      // ... add more entries
      {
        rank: 15,
        user: { id: '15', name: 'You', level: 5 },
        xp: 2450,
        weeklyXp: 340,
        streak: 12,
        completedChallenges: 28,
        change: 'up'
      }
    ];

    setUserStats(mockStats);
    setLeaderboard(mockLeaderboard);
  }, []);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-400 bg-gray-50 dark:bg-gray-900/20';
      case 'rare': return 'border-blue-400 bg-blue-50 dark:bg-blue-900/20';
      case 'epic': return 'border-purple-400 bg-purple-50 dark:bg-purple-900/20';
      case 'legendary': return 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
      default: return 'border-gray-400 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getRarityGradient = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-500 to-gray-600';
      case 'rare': return 'from-blue-500 to-blue-600';
      case 'epic': return 'from-purple-500 to-purple-600';
      case 'legendary': return 'from-yellow-500 to-yellow-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getChangeIcon = (change: string) => {
    switch (change) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const calculateLevel = (xp: number) => {
    return Math.floor(Math.sqrt(xp / 100)) + 1;
  };

  const calculateLevelProgress = (xp: number, level: number) => {
    const currentLevelMinXp = (level - 1) ** 2 * 100;
    const nextLevelMinXp = level ** 2 * 100;
    const currentLevelXp = xp - currentLevelMinXp;
    const xpToNextLevel = nextLevelMinXp - currentLevelMinXp;
    
    return {
      current: currentLevelXp,
      total: xpToNextLevel,
      percentage: (currentLevelXp / xpToNextLevel) * 100
    };
  };

  if (!userStats) {
    return <div>Loading...</div>;
  }

  const levelProgress = calculateLevelProgress(userStats.totalXp, userStats.level);
  const unlockedAchievements = userStats.achievements.filter(a => a.unlocked);
  const lockedAchievements = userStats.achievements.filter(a => !a.unlocked);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Your Progress Dashboard
            </h1>
            <p className="text-muted-foreground">
              Track your journey, earn achievements, and compete with others
            </p>
          </div>
          <Button variant="outline" onClick={onBack} className="gap-2">
            ← Back to Dashboard
          </Button>
        </div>

        {/* User Level & XP */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    {userStats.level}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Crown className="w-4 h-4 text-yellow-800" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Level {userStats.level}</h2>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Zap className="w-4 h-4" />
                      {levelProgress.current.toLocaleString()} / {levelProgress.total.toLocaleString()} XP
                    </div>
                    <Progress value={levelProgress.percentage} className="w-48 h-3" />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {levelProgress.total - levelProgress.current} XP to next level
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="font-bold text-lg">{userStats.totalXp.toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Total XP</div>
                </div>
                <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="font-bold text-lg">{userStats.streak}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Day Streak</div>
                </div>
                <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Target className="w-4 h-4 text-green-500" />
                    <span className="font-bold text-lg">{userStats.completedChallenges}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
                <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="font-bold text-lg">#{userStats.rank}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Global Rank</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Recent Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {unlockedAchievements.slice(-3).map((achievement) => (
                      <div key={achievement.id} className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{achievement.title}</div>
                          <div className="text-xs text-muted-foreground">+{achievement.xpReward} XP</div>
                        </div>
                        <Badge className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                          {achievement.rarity}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    This Week
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">XP Earned</span>
                      <span className="font-bold">{userStats.weeklyXp}</span>
                    </div>
                    <Progress value={(userStats.weeklyXp / 500) * 100} className="h-2" />
                    
                    <div className="grid grid-cols-7 gap-1">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                        <div key={index} className="text-center">
                          <div className="text-xs text-muted-foreground mb-1">{day}</div>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                            index < 5 ? 'bg-green-500 text-white' : 'bg-muted'
                          }`}>
                            {index < 5 ? <CheckCircle className="w-3 h-3" /> : ''}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Streak Tracker */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flame className="w-5 h-5" />
                    Streak Tracker
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-orange-500">
                      {userStats.streak}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Current Streak
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Personal Best</span>
                        <span className="font-medium">{userStats.longestStreak} days</span>
                      </div>
                      <Progress value={(userStats.streak / userStats.longestStreak) * 100} className="h-2" />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Complete a challenge today to continue your streak!
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activity Heatmap */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Activity Heatmap
                </CardTitle>
                <CardDescription>
                  Your practice activity over the last 12 weeks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-12 gap-1">
                  {Array.from({ length: 84 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-sm ${
                        Math.random() > 0.7 ? 'bg-green-500' :
                        Math.random() > 0.4 ? 'bg-green-300' :
                        Math.random() > 0.2 ? 'bg-green-100' : 'bg-muted'
                      }`}
                      title={`Week ${Math.floor(i / 7) + 1}, Day ${(i % 7) + 1}`}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                  <span>Less</span>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-muted rounded-sm" />
                    <div className="w-3 h-3 bg-green-100 rounded-sm" />
                    <div className="w-3 h-3 bg-green-300 rounded-sm" />
                    <div className="w-3 h-3 bg-green-500 rounded-sm" />
                  </div>
                  <span>More</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Achievement Gallery</h2>
                <p className="text-muted-foreground">
                  {unlockedAchievements.length} of {userStats.achievements.length} achievements unlocked
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-yellow-500">
                  {unlockedAchievements.reduce((acc, a) => acc + a.xpReward, 0)}
                </div>
                <div className="text-sm text-muted-foreground">XP from achievements</div>
              </div>
            </div>

            {/* Achievement Categories */}
            <div className="space-y-6">
              {['milestone', 'coding', 'streak', 'social', 'special'].map((category) => {
                const categoryAchievements = userStats.achievements.filter(a => a.category === category);
                if (categoryAchievements.length === 0) return null;

                return (
                  <Card key={category}>
                    <CardHeader>
                      <CardTitle className="capitalize flex items-center gap-2">
                        {category === 'milestone' && <Target className="w-5 h-5" />}
                        {category === 'coding' && <Code className="w-5 h-5" />}
                        {category === 'streak' && <Flame className="w-5 h-5" />}
                        {category === 'social' && <Users className="w-5 h-5" />}
                        {category === 'special' && <Sparkles className="w-5 h-5" />}
                        {category} Achievements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categoryAchievements.map((achievement) => (
                          <Card 
                            key={achievement.id} 
                            className={`relative overflow-hidden border-2 ${
                              achievement.unlocked ? getRarityColor(achievement.rarity) : 'opacity-60 grayscale'
                            }`}
                          >
                            <div className={`absolute top-0 right-0 w-0 h-0 border-l-[40px] border-b-[40px] border-l-transparent bg-gradient-to-br ${getRarityGradient(achievement.rarity)}`} />
                            
                            <CardContent className="pt-6">
                              <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                  <div className="text-3xl relative">
                                    {achievement.icon}
                                    {!achievement.unlocked && (
                                      <Lock className="absolute -bottom-1 -right-1 w-4 h-4 text-gray-500 bg-white dark:bg-gray-800 rounded-full p-0.5" />
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="font-semibold">{achievement.title}</h3>
                                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                                  </div>
                                </div>

                                {!achievement.unlocked && (
                                  <div className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                      <span>Progress</span>
                                      <span>{achievement.progress}/{achievement.maxProgress}</span>
                                    </div>
                                    <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                                  </div>
                                )}

                                <div className="flex items-center justify-between">
                                  <Badge className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                                    {achievement.rarity}
                                  </Badge>
                                  <div className="flex items-center gap-1 text-sm">
                                    <Zap className="w-3 h-3 text-yellow-500" />
                                    <span className="font-medium">+{achievement.xpReward}</span>
                                  </div>
                                </div>

                                {achievement.unlocked && achievement.unlockedAt && (
                                  <div className="text-xs text-muted-foreground">
                                    Unlocked {achievement.unlockedAt.toLocaleDateString()}
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Global Leaderboard</h2>
                <p className="text-muted-foreground">
                  See how you rank against other FAANGify users
                </p>
              </div>
              <div className="flex gap-2">
                {(['daily', 'weekly', 'monthly'] as const).map((period) => (
                  <Button
                    key={period}
                    variant={selectedPeriod === period ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedPeriod(period)}
                    className="capitalize"
                  >
                    {period}
                  </Button>
                ))}
              </div>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {leaderboard.map((entry, index) => (
                    <div 
                      key={entry.user.id}
                      className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                        entry.user.name === 'You' 
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200' 
                          : 'bg-muted/30 hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          entry.rank === 1 ? 'bg-yellow-500 text-white' :
                          entry.rank === 2 ? 'bg-gray-400 text-white' :
                          entry.rank === 3 ? 'bg-amber-600 text-white' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {entry.rank <= 3 ? (
                            entry.rank === 1 ? <Crown className="w-4 h-4" /> :
                            entry.rank === 2 ? <Medal className="w-4 h-4" /> :
                            <Award className="w-4 h-4" />
                          ) : (
                            entry.rank
                          )}
                        </div>
                        {getChangeIcon(entry.change)}
                      </div>

                      <Avatar className="w-10 h-10">
                        <AvatarImage src={entry.user.avatar} />
                        <AvatarFallback>
                          {entry.user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{entry.user.name}</span>
                          {entry.user.name === 'You' && (
                            <Badge className="bg-blue-500 text-white text-xs">You</Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Level {entry.user.level} • {entry.completedChallenges} challenges
                        </div>
                      </div>

                      <div className="text-right space-y-1">
                        <div className="font-bold">{entry.xp.toLocaleString()} XP</div>
                        <div className="text-sm text-muted-foreground">
                          +{entry.weeklyXp} this week
                        </div>
                      </div>

                      <div className="text-right space-y-1">
                        <div className="flex items-center gap-1">
                          <Flame className="w-4 h-4 text-orange-500" />
                          <span className="font-medium">{entry.streak}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">day streak</div>
                      </div>

                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* XP Over Time */}
              <Card>
                <CardHeader>
                  <CardTitle>XP Progress</CardTitle>
                  <CardDescription>Your experience points over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-end justify-between gap-2">
                    {Array.from({ length: 12 }, (_, i) => (
                      <div key={i} className="flex-1 bg-blue-500 rounded-t" style={{
                        height: `${Math.random() * 80 + 20}%`
                      }} />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>Jan</span>
                    <span>Dec</span>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Breakdown</CardTitle>
                  <CardDescription>Your scores across different categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { category: 'Algorithms', score: 87, icon: Code },
                      { category: 'System Design', score: 75, icon: Brain },
                      { category: 'Behavioral', score: 92, icon: MessageSquare },
                      { category: 'Mock Interviews', score: 83, icon: Users }
                    ].map((item) => (
                      <div key={item.category} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <item.icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{item.category}</span>
                          </div>
                          <span className="text-sm font-bold">{item.score}%</span>
                        </div>
                        <Progress value={item.score} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">145h</div>
                  <div className="text-sm text-muted-foreground">Time Practiced</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">87%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <BookOpen className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-muted-foreground">Topics Mastered</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-sm text-muted-foreground">Consistency</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}