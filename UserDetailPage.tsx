import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  User, 
  Trophy, 
  Target, 
  Calendar, 
  Clock, 
  Star, 
  Zap, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Brain, 
  Code, 
  Users, 
  Flame,
  ChevronRight,
  Edit3,
  Share2,
  Download,
  BarChart3,
  Sparkles,
  MapPin,
  Lightbulb,
  CheckCircle2,
  Crown,
  Rocket,
  ArrowUp,
  Calendar as CalendarIcon,
  GitBranch,
  Activity,
  Settings,
  Camera,
  Medal,
  Coins,
  Shield,
  Swords,
  Heart
} from "lucide-react";
import { motion } from "motion/react";

interface UserDetailPageProps {
  user: any;
  userProgress: any;
  userProfile: any;
  onEditProfile: () => void;
  onStartPractice: () => void;
  onViewRoadmap: () => void;
  onBack: () => void;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Stat {
  label: string;
  value: string | number;
  icon: any;
  color: string;
  gradient: string;
  trend?: number;
}

export function UserDetailPage({ 
  user, 
  userProgress, 
  userProfile, 
  onEditProfile, 
  onStartPractice, 
  onViewRoadmap, 
  onBack 
}: UserDetailPageProps) {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'achievements' | 'activity' | 'skills'>('overview');
  const [currentStreak, setCurrentStreak] = useState(7);
  const [totalXP, setTotalXP] = useState(2850);
  const [userLevel, setUserLevel] = useState(12);
  const [isHovered, setIsHovered] = useState(false);

  // Mock achievements data with rarity
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Victory',
      description: 'Complete your first coding challenge',
      icon: CheckCircle2,
      unlocked: true,
      unlockedAt: '2 days ago',
      rarity: 'common'
    },
    {
      id: '2',
      title: 'Fire Starter',
      description: 'Maintain a 7-day streak',
      icon: Flame,
      unlocked: true,
      unlockedAt: '1 day ago',
      rarity: 'rare'
    },
    {
      id: '3',
      title: 'Lightning Fast',
      description: 'Solve 5 problems in under 10 minutes each',
      icon: Zap,
      unlocked: false,
      progress: 3,
      maxProgress: 5,
      rarity: 'epic'
    },
    {
      id: '4',
      title: 'FAANG Legend',
      description: 'Complete company-specific preparation for all FAANG companies',
      icon: Crown,
      unlocked: false,
      progress: 2,
      maxProgress: 5,
      rarity: 'legendary'
    },
    {
      id: '5',
      title: 'Knowledge Master',
      description: 'Read 20 interview tips',
      icon: Brain,
      unlocked: true,
      unlockedAt: '3 days ago',
      rarity: 'common'
    },
    {
      id: '6',
      title: 'Perfectionist',
      description: 'Solve 10 problems without any hints',
      icon: Shield,
      unlocked: false,
      progress: 6,
      maxProgress: 10,
      rarity: 'epic'
    },
    {
      id: '7',
      title: 'Code Warrior',
      description: 'Complete 100 coding problems',
      icon: Swords,
      unlocked: false,
      progress: 45,
      maxProgress: 100,
      rarity: 'rare'
    },
    {
      id: '8',
      title: 'Marathon Runner',
      description: 'Maintain a 30-day streak',
      icon: Rocket,
      unlocked: false,
      progress: 7,
      maxProgress: 30,
      rarity: 'epic'
    }
  ];

  // Enhanced user stats with gradients
  const stats: Stat[] = [
    {
      label: 'Problems Solved',
      value: userProgress?.completedQuestions?.length || 0,
      icon: Code,
      color: 'text-blue-600',
      gradient: 'from-blue-500 to-cyan-500',
      trend: 12
    },
    {
      label: 'Current Streak',
      value: `${currentStreak}`,
      icon: Flame,
      color: 'text-orange-600',
      gradient: 'from-orange-500 to-red-500',
      trend: 5
    },
    {
      label: 'Total XP',
      value: totalXP.toLocaleString(),
      icon: Star,
      color: 'text-yellow-600',
      gradient: 'from-yellow-500 to-amber-500',
      trend: 8
    },
    {
      label: 'Rank',
      value: '#' + Math.floor(Math.random() * 500 + 100),
      icon: Trophy,
      color: 'text-purple-600',
      gradient: 'from-purple-500 to-pink-500',
      trend: 15
    }
  ];

  // Skills data for radar chart visualization
  const skills = [
    { name: 'Data Structures', level: 75, icon: GitBranch, color: 'text-blue-500' },
    { name: 'Algorithms', level: 85, icon: Brain, color: 'text-purple-500' },
    { name: 'System Design', level: 60, icon: Activity, color: 'text-green-500' },
    { name: 'Problem Solving', level: 80, icon: Lightbulb, color: 'text-yellow-500' },
    { name: 'Code Quality', level: 70, icon: Code, color: 'text-pink-500' },
    { name: 'Communication', level: 65, icon: Users, color: 'text-cyan-500' }
  ];

  // Recent activity mock data
  const recentActivity = [
    {
      type: 'completed',
      title: 'Two Sum',
      company: 'Google',
      time: '2 hours ago',
      xp: 50,
      difficulty: 'Easy'
    },
    {
      type: 'achievement',
      title: 'Fire Starter achievement unlocked',
      time: '1 day ago',
      xp: 100
    },
    {
      type: 'completed',
      title: 'Valid Parentheses',
      company: 'Meta',
      time: '2 days ago',
      xp: 75,
      difficulty: 'Easy'
    },
    {
      type: 'roadmap',
      title: 'Started Google preparation roadmap',
      time: '3 days ago',
      xp: 25
    },
    {
      type: 'completed',
      title: 'Longest Substring',
      company: 'Apple',
      time: '4 days ago',
      xp: 100,
      difficulty: 'Medium'
    }
  ];

  // Study streak heatmap data (7 weeks)
  const generateHeatmapData = () => {
    const data = [];
    const today = new Date();
    for (let week = 6; week >= 0; week--) {
      const weekData = [];
      for (let day = 0; day < 7; day++) {
        const date = new Date(today);
        date.setDate(date.getDate() - (week * 7 + day));
        const intensity = Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 1 : 0;
        weekData.push({ date, intensity });
      }
      data.push(weekData);
    }
    return data.reverse();
  };

  const heatmapData = generateHeatmapData();

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const progressAchievements = achievements.filter(a => !a.unlocked);

  // Calculate XP to next level
  const xpForNextLevel = 3000;
  const currentLevelXP = totalXP % 1000;
  const xpToNextLevel = xpForNextLevel - totalXP;
  const levelProgress = (currentLevelXP / 1000) * 100;

  // Get achievement rarity color
  const getRarityColor = (rarity?: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-500';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getRarityBorder = (rarity?: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 dark:border-gray-600';
      case 'rare': return 'border-blue-400 dark:border-blue-500';
      case 'epic': return 'border-purple-400 dark:border-purple-500';
      case 'legendary': return 'border-yellow-400 dark:border-yellow-500';
      default: return 'border-gray-300 dark:border-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-950 dark:via-blue-950/20 dark:to-purple-950/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-6 hover:bg-white/50 dark:hover:bg-gray-800/50 backdrop-blur-sm"
          >
            ← Back to Dashboard
          </Button>
        </motion.div>

        {/* Hero Profile Section with 3D Effect */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-8"
        >
          {/* Premium Badge Overlay */}
          <div className="absolute -top-4 -right-4 z-20">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 animate-bounce-in">
              <Crown className="w-4 h-4" />
              <span className="font-bold text-sm">Level {userLevel}</span>
            </div>
          </div>

          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-2 border-white/50 dark:border-gray-700/50 rounded-3xl overflow-hidden shadow-2xl">
            {/* Gradient Header Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            
            <div className="relative p-8">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Animated Avatar Section */}
                <div className="flex flex-col items-center">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Animated Ring */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-md opacity-75 animate-pulse"></div>
                    
                    {/* Avatar Container */}
                    <div className="relative w-40 h-40 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1 shadow-2xl">
                      <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                        <User className="w-20 h-20 text-gray-400" />
                      </div>
                    </div>

                    {/* Floating Level Badge */}
                    <motion.div 
                      className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full w-14 h-14 flex items-center justify-center font-bold text-xl shadow-2xl border-4 border-white dark:border-gray-800"
                      animate={isHovered ? { scale: [1, 1.2, 1], rotate: [0, 360, 360] } : {}}
                      transition={{ duration: 0.6 }}
                    >
                      {userLevel}
                    </motion.div>

                    {/* XP Ring Progress */}
                    <svg className="absolute -inset-3 w-[164px] h-[164px]" style={{ transform: 'rotate(-90deg)' }}>
                      <circle
                        cx="82"
                        cy="82"
                        r="78"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        className="text-gray-200 dark:text-gray-700"
                      />
                      <circle
                        cx="82"
                        cy="82"
                        r="78"
                        stroke="url(#gradient)"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray={`${levelProgress * 4.9} 490`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="50%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.div>

                  {/* Camera Button for Avatar */}
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="mt-4 backdrop-blur-sm"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Change Photo
                  </Button>
                </div>
                
                {/* Profile Info */}
                <div className="flex-1 text-center lg:text-left space-y-4">
                  <div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 animate-gradient">
                      {user?.name || 'User'}
                    </h1>
                    <div className="flex items-center gap-3 justify-center lg:justify-start mb-3">
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 text-sm">
                        {userProfile?.targetRole || 'Software Engineer'}
                      </Badge>
                      <span className="text-gray-500 dark:text-gray-400">•</span>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <Target className="w-4 h-4" />
                        <span>{userProfile?.targetCompany || 'FAANG Companies'}</span>
                      </div>
                    </div>
                  </div>

                  {/* XP Progress Bar */}
                  <div className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 dark:border-gray-600/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">Level {userLevel} Progress</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {xpToNextLevel.toLocaleString()} XP to Level {userLevel + 1}
                      </span>
                    </div>
                    <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${levelProgress}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span>{currentLevelXP.toLocaleString()} XP</span>
                      <span>1,000 XP</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    <Button onClick={onEditProfile} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" className="backdrop-blur-sm hover:bg-white/50">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Progress
                    </Button>
                    <Button variant="outline" className="backdrop-blur-sm hover:bg-white/50">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </div>

                {/* Quick Stats Cards - Floating */}
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="relative group"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                      <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-5 border border-white/50 dark:border-gray-700/50 shadow-xl">
                        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.gradient} mb-3 shadow-lg`}>
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">{stat.label}</div>
                        {stat.trend && (
                          <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                            <ArrowUp className="w-3 h-3" />
                            <span>+{stat.trend}% this week</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Navigation Tabs with Icons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex gap-2 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border-2 border-white/50 dark:border-gray-700/50 shadow-xl">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3, gradient: 'from-blue-500 to-cyan-500' },
              { id: 'achievements', label: 'Achievements', icon: Trophy, gradient: 'from-yellow-500 to-orange-500' },
              { id: 'activity', label: 'Activity', icon: Activity, gradient: 'from-green-500 to-emerald-500' },
              { id: 'skills', label: 'Skills', icon: Brain, gradient: 'from-purple-500 to-pink-500' }
            ].map(tab => (
              <Button
                key={tab.id}
                variant="ghost"
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex-1 relative transition-all duration-300 ${
                  selectedTab === tab.id 
                    ? 'bg-gradient-to-r ' + tab.gradient + ' text-white shadow-lg scale-105' 
                    : 'hover:bg-white/50 dark:hover:bg-gray-700/50'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                <span className="font-medium">{tab.label}</span>
                {selectedTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} rounded-xl -z-10`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={selectedTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {selectedTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Activity Heatmap */}
              <Card className="lg:col-span-2 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-2 border-white/50 dark:border-gray-700/50 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <CalendarIcon className="w-6 h-6 mr-3 text-green-500" />
                  Study Streak Heatmap
                </h3>
                <div className="space-y-2">
                  <div className="flex gap-2 text-xs text-gray-500 mb-3">
                    <span>Mon</span>
                    <span className="ml-auto">Sun</span>
                  </div>
                  {heatmapData.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex gap-2">
                      {week.map((day, dayIndex) => (
                        <motion.div
                          key={dayIndex}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: (weekIndex * 7 + dayIndex) * 0.01 }}
                          whileHover={{ scale: 1.2 }}
                          className={`w-full aspect-square rounded-lg cursor-pointer transition-all ${
                            day.intensity === 0 ? 'bg-gray-100 dark:bg-gray-700' :
                            day.intensity === 1 ? 'bg-green-200 dark:bg-green-900/40' :
                            day.intensity === 2 ? 'bg-green-400 dark:bg-green-700/60' :
                            day.intensity === 3 ? 'bg-green-600 dark:bg-green-600/80' :
                            'bg-green-800 dark:bg-green-500'
                          } hover:ring-2 ring-green-500`}
                          title={day.date.toDateString()}
                        />
                      ))}
                    </div>
                  ))}
                  <div className="flex items-center gap-3 mt-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>Less</span>
                    <div className="flex gap-1">
                      {[0, 1, 2, 3, 4].map(i => (
                        <div key={i} className={`w-4 h-4 rounded ${
                          i === 0 ? 'bg-gray-100 dark:bg-gray-700' :
                          i === 1 ? 'bg-green-200 dark:bg-green-900/40' :
                          i === 2 ? 'bg-green-400 dark:bg-green-700/60' :
                          i === 3 ? 'bg-green-600 dark:bg-green-600/80' :
                          'bg-green-800 dark:bg-green-500'
                        }`} />
                      ))}
                    </div>
                    <span>More</span>
                  </div>
                </div>
              </Card>

              {/* Quick Actions Card */}
              <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 backdrop-blur-xl border-2 border-white/50 dark:border-gray-700/50 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Rocket className="w-6 h-6 mr-3 text-purple-500" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button onClick={onStartPractice} className="w-full justify-start bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-xl text-base py-6">
                      <Code className="w-5 h-5 mr-3" />
                      Start Practice Session
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button onClick={onViewRoadmap} variant="outline" className="w-full justify-start backdrop-blur-sm text-base py-6">
                      <MapPin className="w-5 h-5 mr-3" />
                      View Learning Roadmap
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" className="w-full justify-start backdrop-blur-sm text-base py-6">
                      <Users className="w-5 h-5 mr-3" />
                      Mock Interview
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" className="w-full justify-start backdrop-blur-sm text-base py-6">
                      <BookOpen className="w-5 h-5 mr-3" />
                      Study Resources
                    </Button>
                  </motion.div>
                </div>

                {/* Mini Stats */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">Today's Progress</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Problems Solved</span>
                      <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">3/5</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Study Time</span>
                      <Badge className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">2.5 hrs</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">XP Earned</span>
                      <Badge className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300">+225</Badge>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Recent Activity Feed */}
              <Card className="lg:col-span-3 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-2 border-white/50 dark:border-gray-700/50 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-blue-500" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.01, x: 5 }}
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all"
                    >
                      <div className={`p-3 rounded-xl shadow-lg ${
                        activity.type === 'completed' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                        activity.type === 'achievement' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 
                        'bg-gradient-to-r from-blue-500 to-purple-600'
                      }`}>
                        {activity.type === 'completed' ? <CheckCircle2 className="w-6 h-6 text-white" /> :
                         activity.type === 'achievement' ? <Trophy className="w-6 h-6 text-white" /> :
                         <MapPin className="w-6 h-6 text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white">{activity.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400">{activity.time}</span>
                          {activity.company && (
                            <>
                              <span className="text-gray-400">•</span>
                              <Badge variant="outline" className="text-xs">{activity.company}</Badge>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 font-bold">
                          <Coins className="w-5 h-5" />
                          <span>+{activity.xp}</span>
                        </div>
                        {activity.difficulty && (
                          <Badge 
                            className={`mt-2 ${
                              activity.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                              activity.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                              'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                            }`}
                          >
                            {activity.difficulty}
                          </Badge>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {selectedTab === 'achievements' && (
            <div className="space-y-6">
              {/* Achievement Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { label: 'Total Achievements', value: achievements.length, icon: Medal, color: 'from-yellow-500 to-orange-500' },
                  { label: 'Unlocked', value: unlockedAchievements.length, icon: CheckCircle2, color: 'from-green-500 to-emerald-500' },
                  { label: 'In Progress', value: progressAchievements.length, icon: Target, color: 'from-blue-500 to-cyan-500' },
                  { label: 'Completion Rate', value: `${Math.round((unlockedAchievements.length / achievements.length) * 100)}%`, icon: TrendingUp, color: 'from-purple-500 to-pink-500' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity`}></div>
                    <Card className="relative p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-white/50 dark:border-gray-700/50 text-center">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-3 shadow-lg`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Unlocked Achievements */}
              <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-2 border-white/50 dark:border-gray-700/50 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Trophy className="w-6 h-6 mr-3 text-yellow-500" />
                  Unlocked Achievements ({unlockedAchievements.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {unlockedAchievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      className="relative group"
                    >
                      {/* Rarity Glow Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${getRarityColor(achievement.rarity)} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                      
                      <div className={`relative p-5 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl border-2 ${getRarityBorder(achievement.rarity)} shadow-lg`}>
                        <div className="flex items-start gap-3">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${getRarityColor(achievement.rarity)} shadow-lg transform group-hover:rotate-12 transition-transform`}>
                            <achievement.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-yellow-900 dark:text-yellow-100">{achievement.title}</h4>
                              <Badge className={`text-xs bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white border-0`}>
                                {achievement.rarity}
                              </Badge>
                            </div>
                            <p className="text-sm text-yellow-800 dark:text-yellow-200">{achievement.description}</p>
                            <div className="flex items-center gap-2 mt-3">
                              <Clock className="w-3 h-3 text-yellow-700 dark:text-yellow-300" />
                              <span className="text-xs text-yellow-700 dark:text-yellow-300">Unlocked {achievement.unlockedAt}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* In Progress Achievements */}
              <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-2 border-white/50 dark:border-gray-700/50 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Target className="w-6 h-6 mr-3 text-blue-500" />
                  In Progress ({progressAchievements.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {progressAchievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-2xl border-2 border-gray-200 dark:border-gray-600 shadow-lg hover:shadow-xl transition-all"
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <div className="p-3 bg-gray-300 dark:bg-gray-600 rounded-xl">
                          <achievement.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold">{achievement.title}</h4>
                            <Badge variant="outline" className="text-xs">{achievement.rarity}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{achievement.description}</p>
                        </div>
                      </div>
                      {achievement.progress && achievement.maxProgress && (
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600 dark:text-gray-400">Progress</span>
                            <span className="font-semibold">{achievement.progress}/{achievement.maxProgress}</span>
                          </div>
                          <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div 
                              className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {selectedTab === 'activity' && (
            <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-2 border-white/50 dark:border-gray-700/50 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Activity className="w-6 h-6 mr-3 text-green-500" />
                Complete Activity Timeline
              </h3>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>
                
                <div className="space-y-6">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative flex items-start gap-6 pl-20"
                    >
                      {/* Timeline Node */}
                      <div className="absolute left-0">
                        <div className={`w-16 h-16 rounded-2xl shadow-xl flex items-center justify-center bg-gradient-to-r ${
                          activity.type === 'completed' ? 'from-green-500 to-emerald-600' :
                          activity.type === 'achievement' ? 'from-yellow-500 to-orange-500' : 
                          'from-blue-500 to-purple-600'
                        }`}>
                          {activity.type === 'completed' ? <CheckCircle2 className="w-8 h-8 text-white" /> :
                           activity.type === 'achievement' ? <Trophy className="w-8 h-8 text-white" /> :
                           <MapPin className="w-8 h-8 text-white" />}
                        </div>
                      </div>

                      {/* Activity Content */}
                      <div className="flex-1 bg-gradient-to-br from-gray-50 to-white dark:from-gray-700/50 dark:to-gray-800/50 rounded-2xl p-6 border-2 border-gray-200/50 dark:border-gray-600/50 shadow-lg hover:shadow-xl transition-all">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{activity.title}</h4>
                            <div className="flex items-center gap-3 flex-wrap">
                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Clock className="w-4 h-4" />
                                {activity.time}
                              </div>
                              {activity.company && (
                                <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                  {activity.company}
                                </Badge>
                              )}
                              {activity.difficulty && (
                                <Badge 
                                  className={`${
                                    activity.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                                    activity.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                                  }`}
                                >
                                  {activity.difficulty}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-xl font-bold shadow-lg">
                            <Coins className="w-5 h-5" />
                            <span>+{activity.xp}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {selectedTab === 'skills' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Skill Levels */}
              <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-2 border-white/50 dark:border-gray-700/50 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Brain className="w-6 h-6 mr-3 text-purple-500" />
                  Skill Levels
                </h3>
                <div className="space-y-6">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                            <skill.icon className={`w-5 h-5 ${skill.color}`} />
                          </div>
                          <span className="font-semibold">{skill.name}</span>
                        </div>
                        <span className="text-sm font-bold text-gray-600 dark:text-gray-300">{skill.level}%</span>
                      </div>
                      <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div 
                          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${
                            skill.level >= 80 ? 'from-green-500 to-emerald-600' :
                            skill.level >= 60 ? 'from-blue-500 to-cyan-600' :
                            'from-orange-500 to-red-600'
                          } rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Skill Recommendations */}
              <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 backdrop-blur-xl border-2 border-white/50 dark:border-gray-700/50 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Lightbulb className="w-6 h-6 mr-3 text-yellow-500" />
                  Improvement Suggestions
                </h3>
                <div className="space-y-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-white/80 dark:bg-gray-800/80 rounded-xl border border-purple-200 dark:border-purple-800"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">Focus on System Design</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                          Your system design skills could use improvement. Practice designing scalable systems.
                        </p>
                        <Button size="sm" variant="outline">
                          Start Practice <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-4 bg-white/80 dark:bg-gray-800/80 rounded-xl border border-blue-200 dark:border-blue-800"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">Improve Communication Skills</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                          Practice explaining your solutions clearly. Try mock interviews.
                        </p>
                        <Button size="sm" variant="outline">
                          Mock Interview <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 bg-white/80 dark:bg-gray-800/80 rounded-xl border border-green-200 dark:border-green-800"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <Rocket className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">Great Algorithm Skills!</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                          Keep up the excellent work. You're in the top 15% of users!
                        </p>
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                          <Heart className="w-4 h-4 fill-current" />
                          <span className="text-sm font-semibold">Keep Going!</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </Card>

              {/* Learning Path Visualization */}
              <Card className="lg:col-span-2 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-2 border-white/50 dark:border-gray-700/50 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <GitBranch className="w-6 h-6 mr-3 text-cyan-500" />
                  Your Learning Journey
                </h3>
                <div className="relative">
                  <div className="flex items-center justify-between">
                    {['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Master'].map((stage, index) => (
                      <div key={stage} className="flex flex-col items-center flex-1">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg shadow-xl ${
                            index <= 1 
                              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                              : index === 2
                              ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white animate-pulse'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                          }`}
                        >
                          {index <= 1 ? <CheckCircle2 className="w-8 h-8" /> : index + 1}
                        </motion.div>
                        <span className="text-sm font-semibold mt-3">{stage}</span>
                        {index <= 1 && <Badge className="mt-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">Completed</Badge>}
                        {index === 2 && <Badge className="mt-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">In Progress</Badge>}
                      </div>
                    ))}
                  </div>
                  {/* Connecting Line */}
                  <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -z-10">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-green-500 via-blue-500 to-gray-300"
                      initial={{ width: '0%' }}
                      animate={{ width: '50%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </div>
                </div>
              </Card>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}