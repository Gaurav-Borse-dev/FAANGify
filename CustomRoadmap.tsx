import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription } from "./ui/alert";
import { 
  MapPin, 
  Clock, 
  Target, 
  Star, 
  CheckCircle, 
  Play, 
  BookOpen, 
  Code, 
  Users, 
  Award,
  Calendar,
  ArrowRight,
  Lightbulb,
  Zap,
  Trophy,
  Sparkles,
  Brain,
  Rocket,
  Timer,
  TrendingUp,
  FileText,
  Video,
  ExternalLink,
  Flag
} from "lucide-react";

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  type: 'course' | 'practice' | 'project' | 'reading' | 'mock';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  priority: 'High' | 'Medium' | 'Low';
  prerequisites: string[];
  skills: string[];
  completed: boolean;
  progress: number;
  resources: {
    type: 'video' | 'article' | 'course' | 'tool' | 'book';
    title: string;
    url: string;
    provider: string;
  }[];
}

interface RoadmapWeek {
  weekNumber: number;
  theme: string;
  items: RoadmapItem[];
  totalHours: number;
}

interface CustomRoadmapProps {
  userProfile: {
    experienceLevel: string;
    targetRole: string;
    targetCompany?: string;
    currentSkills: string[];
    missingSkills: string[];
    timeCommitment: number; // hours per week
    companySpecific?: {
      companyMatch: {
        name: string;
        score: number;
        strengths: string[];
        gaps: string[];
        requirements: string[];
        interviewFocus: string[];
        logo: string;
      };
      focusAreas: string[];
      interviewFocus: string[];
      requirements: string[];
    };
  };
  onBack: () => void;
  onStartItem: (item: RoadmapItem) => void;
}

export function CustomRoadmap({ userProfile, onBack, onStartItem }: CustomRoadmapProps) {
  const [roadmapWeeks, setRoadmapWeeks] = useState<RoadmapWeek[]>([]);
  const [isGenerating, setIsGenerating] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [generationProgress, setGenerationProgress] = useState(0);

  useEffect(() => {
    generateRoadmap();
  }, []);

  const generateRoadmap = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulate AI roadmap generation
    const steps = [
      'Analyzing your profile...',
      'Identifying skill gaps...',
      'Creating learning path...',
      'Selecting resources...',
      'Optimizing timeline...',
      'Finalizing roadmap...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setGenerationProgress(((i + 1) / steps.length) * 100);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Generate mock roadmap data
    const mockRoadmap: RoadmapWeek[] = [
      {
        weekNumber: 1,
        theme: "Foundation & Assessment",
        totalHours: 12,
        items: [
          {
            id: "1-1",
            title: "System Design Fundamentals",
            description: "Learn the basics of system design including scalability, reliability, and performance",
            type: "course",
            difficulty: "Beginner",
            estimatedHours: 8,
            priority: "High",
            prerequisites: [],
            skills: ["System Design", "Architecture"],
            completed: false,
            progress: 0,
            resources: [
              { type: "course", title: "System Design Interview Course", url: "#", provider: "Tech Academy" },
              { type: "book", title: "Designing Data-Intensive Applications", url: "#", provider: "Amazon" }
            ]
          },
          {
            id: "1-2",
            title: "LeetCode Practice - Arrays",
            description: "Master array manipulation problems commonly asked in technical interviews",
            type: "practice",
            difficulty: "Intermediate",
            estimatedHours: 4,
            priority: "High",
            prerequisites: [],
            skills: ["Algorithms", "Data Structures"],
            completed: false,
            progress: 0,
            resources: [
              { type: "tool", title: "LeetCode Array Problems", url: "#", provider: "LeetCode" },
              { type: "video", title: "Array Problem Patterns", url: "#", provider: "YouTube" }
            ]
          }
        ]
      },
      {
        weekNumber: 2,
        theme: "Core Algorithms",
        totalHours: 15,
        items: [
          {
            id: "2-1",
            title: "Dynamic Programming Mastery",
            description: "Deep dive into DP patterns and solve classic problems",
            type: "practice",
            difficulty: "Advanced",
            estimatedHours: 10,
            priority: "High",
            prerequisites: ["Basic algorithms knowledge"],
            skills: ["Dynamic Programming", "Problem Solving"],
            completed: false,
            progress: 0,
            resources: [
              { type: "course", title: "Dynamic Programming Course", url: "#", provider: "Coursera" },
              { type: "article", title: "DP Patterns Guide", url: "#", provider: "GeeksforGeeks" }
            ]
          },
          {
            id: "2-2",
            title: "Build a Microservices Project",
            description: "Create a scalable microservices architecture with Docker and Kubernetes",
            type: "project",
            difficulty: "Advanced",
            estimatedHours: 5,
            priority: "Medium",
            prerequisites: ["Docker basics", "API design"],
            skills: ["Microservices", "Docker", "Kubernetes"],
            completed: false,
            progress: 0,
            resources: [
              { type: "video", title: "Microservices Tutorial", url: "#", provider: "YouTube" },
              { type: "tool", title: "Docker Hub", url: "#", provider: "Docker" }
            ]
          }
        ]
      },
      {
        weekNumber: 3,
        theme: "System Design & Architecture",
        totalHours: 18,
        items: [
          {
            id: "3-1",
            title: "Design a Chat Application",
            description: "Learn to design scalable real-time systems",
            type: "project",
            difficulty: "Advanced",
            estimatedHours: 12,
            priority: "High",
            prerequisites: ["System design basics", "Database design"],
            skills: ["System Design", "Real-time Systems", "WebSockets"],
            completed: false,
            progress: 0,
            resources: [
              { type: "article", title: "Chat System Design", url: "#", provider: "High Scalability" },
              { type: "video", title: "WhatsApp Architecture", url: "#", provider: "Tech Talks" }
            ]
          },
          {
            id: "3-2",
            title: "Mock System Design Interview",
            description: "Practice with a mock interviewer for system design questions",
            type: "mock",
            difficulty: "Advanced",
            estimatedHours: 6,
            priority: "High",
            prerequisites: ["System design knowledge"],
            skills: ["System Design", "Communication", "Problem Solving"],
            completed: false,
            progress: 0,
            resources: [
              { type: "tool", title: "Pramp Mock Interviews", url: "#", provider: "Pramp" },
              { type: "article", title: "System Design Interview Tips", url: "#", provider: "Medium" }
            ]
          }
        ]
      },
      {
        weekNumber: 4,
        theme: "Behavioral & Final Prep",
        totalHours: 10,
        items: [
          {
            id: "4-1",
            title: "STAR Method Mastery",
            description: "Perfect your behavioral interview responses using the STAR framework",
            type: "practice",
            difficulty: "Intermediate",
            estimatedHours: 4,
            priority: "High",
            prerequisites: [],
            skills: ["Behavioral", "Communication", "Leadership"],
            completed: false,
            progress: 0,
            resources: [
              { type: "course", title: "Behavioral Interview Course", url: "#", provider: "Interview School" },
              { type: "article", title: "STAR Method Guide", url: "#", provider: "Harvard Business Review" }
            ]
          },
          {
            id: "4-2",
            title: "Full Mock Interview Session",
            description: "Complete end-to-end interview practice with feedback",
            type: "mock",
            difficulty: "Advanced",
            estimatedHours: 6,
            priority: "High",
            prerequisites: ["Technical preparation complete"],
            skills: ["Interview Skills", "Communication", "Technical Skills"],
            completed: false,
            progress: 0,
            resources: [
              { type: "tool", title: "InterviewBit Mock", url: "#", provider: "InterviewBit" },
              { type: "video", title: "Interview Performance Tips", url: "#", provider: "Career Coach" }
            ]
          }
        ]
      }
    ];

    setRoadmapWeeks(mockRoadmap);
    setIsGenerating(false);
  };

  const handleCompleteItem = (itemId: string) => {
    setCompletedItems(prev => [...prev, itemId]);
    setRoadmapWeeks(prev => 
      prev.map(week => ({
        ...week,
        items: week.items.map(item => 
          item.id === itemId ? { ...item, completed: true, progress: 100 } : item
        )
      }))
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return BookOpen;
      case 'practice': return Code;
      case 'project': return Rocket;
      case 'reading': return FileText;
      case 'mock': return Users;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'practice': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'project': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'reading': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'mock': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'Medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'Low': return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      default: return 'border-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const totalWeeks = roadmapWeeks.length;
  const totalItems = roadmapWeeks.reduce((acc, week) => acc + week.items.length, 0);
  const completedCount = completedItems.length;
  const overallProgress = totalItems > 0 ? (completedCount / totalItems) * 100 : 0;

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto">
                <Brain className="w-8 h-8 text-white animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Generating Your Custom Roadmap</h3>
                <p className="text-muted-foreground">Creating a personalized learning path based on your profile...</p>
              </div>
              <Progress value={generationProgress} className="h-3" />
              <p className="text-sm text-muted-foreground">
                {Math.round(generationProgress)}% Complete
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-2">
            {userProfile.companySpecific ? (
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow border-2 border-gray-200 flex items-center justify-center overflow-hidden">
                  <img 
                    src={userProfile.companySpecific.companyMatch.logo} 
                    alt={userProfile.companySpecific.companyMatch.name}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {userProfile.companySpecific.companyMatch.name} Interview Roadmap
                  </h1>
                  <p className="text-muted-foreground">
                    Customized for {userProfile.targetRole} • {userProfile.companySpecific.companyMatch.score}% match
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Your Personalized Roadmap
                </h1>
                <p className="text-muted-foreground">
                  Custom learning path for {userProfile.targetRole} at {userProfile.targetCompany || 'FAANG companies'}
                </p>
              </div>
            )}
          </div>
          <Button variant="outline" onClick={onBack} className="gap-2">
            ← Back to Analysis
          </Button>
        </div>

        {/* Company-Specific Information */}
        {userProfile.companySpecific && (
          <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 border-emerald-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-emerald-600" />
                {userProfile.companySpecific.companyMatch.name} Interview Focus
              </CardTitle>
              <CardDescription>
                Key areas this roadmap will help you master for {userProfile.companySpecific.companyMatch.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-2">Interview Focus Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.companySpecific.interviewFocus.map((focus, index) => (
                      <Badge key={index} className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                        {focus}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Key Requirements</h4>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.companySpecific.requirements.map((req, index) => (
                      <Badge key={index} variant="outline" className="border-blue-300 text-blue-700 dark:text-blue-300">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">{totalWeeks}</div>
                  <div className="text-sm text-muted-foreground">Weeks</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-green-500" />
                <div>
                  <div className="text-2xl font-bold">{totalItems}</div>
                  <div className="text-sm text-muted-foreground">Items</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-purple-500" />
                <div>
                  <div className="text-2xl font-bold">
                    {roadmapWeeks.reduce((acc, week) => acc + week.totalHours, 0)}h
                  </div>
                  <div className="text-sm text-muted-foreground">Total Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-yellow-500" />
                <div>
                  <div className="text-2xl font-bold">{Math.round(overallProgress)}%</div>
                  <div className="text-sm text-muted-foreground">Complete</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Overall Progress
                </CardTitle>
                <CardDescription>
                  {completedCount} of {totalItems} items completed
                </CardDescription>
              </div>
              <Badge className="bg-purple-500 text-white">
                {userProfile.experienceLevel} Track
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={overallProgress} className="h-4 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                <div className="text-lg font-bold text-green-600">{completedCount}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                <div className="text-lg font-bold text-blue-600">{totalItems - completedCount}</div>
                <div className="text-sm text-muted-foreground">Remaining</div>
              </div>
              <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                <div className="text-lg font-bold text-purple-600">
                  {userProfile.timeCommitment}h/week
                </div>
                <div className="text-sm text-muted-foreground">Time Commitment</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Roadmap */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Weekly Learning Plan
            </CardTitle>
            <CardDescription>
              Follow this structured path to achieve your goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedWeek.toString()} onValueChange={(value) => setSelectedWeek(parseInt(value))}>
              <TabsList className="grid w-full grid-cols-4">
                {roadmapWeeks.map((week) => (
                  <TabsTrigger key={week.weekNumber} value={week.weekNumber.toString()}>
                    Week {week.weekNumber}
                  </TabsTrigger>
                ))}
              </TabsList>

              {roadmapWeeks.map((week) => (
                <TabsContent key={week.weekNumber} value={week.weekNumber.toString()} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{week.theme}</h3>
                      <p className="text-muted-foreground">{week.totalHours} hours total</p>
                    </div>
                    <Badge variant="outline" className="gap-1">
                      <Flag className="w-3 h-3" />
                      Week {week.weekNumber}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    {week.items.map((item) => {
                      const IconComponent = getTypeIcon(item.type);
                      const isCompleted = completedItems.includes(item.id);
                      
                      return (
                        <Card 
                          key={item.id} 
                          className={`transition-all duration-200 hover:shadow-md ${
                            isCompleted ? 'bg-green-50 dark:bg-green-900/20 border-green-200' : ''
                          } ${getPriorityColor(item.priority)} border-l-4`}
                        >
                          <CardContent className="pt-6">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 space-y-3">
                                <div className="flex items-start gap-3">
                                  <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                                    <IconComponent className="w-5 h-5" />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-lg">{item.title}</h4>
                                    <p className="text-muted-foreground">{item.description}</p>
                                  </div>
                                  {isCompleted && (
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                                  )}
                                </div>

                                <div className="flex flex-wrap gap-2">
                                  <Badge className={getTypeColor(item.type)}>
                                    {item.type}
                                  </Badge>
                                  <Badge variant="outline">
                                    {item.difficulty}
                                  </Badge>
                                  <Badge variant={item.priority === 'High' ? 'destructive' : 'secondary'}>
                                    {item.priority} Priority
                                  </Badge>
                                  <Badge variant="outline" className="gap-1">
                                    <Timer className="w-3 h-3" />
                                    {item.estimatedHours}h
                                  </Badge>
                                </div>

                                <div className="space-y-2">
                                  <div className="flex flex-wrap gap-1">
                                    {item.skills.map((skill) => (
                                      <Badge key={skill} variant="secondary" className="text-xs">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                  
                                  {item.prerequisites.length > 0 && (
                                    <div className="text-sm text-muted-foreground">
                                      Prerequisites: {item.prerequisites.join(', ')}
                                    </div>
                                  )}
                                </div>

                                {item.resources.length > 0 && (
                                  <div className="space-y-2">
                                    <h5 className="font-medium text-sm">Resources:</h5>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                      {item.resources.map((resource, index) => (
                                        <div key={index} className="flex items-center gap-2 text-sm p-2 bg-muted/50 rounded">
                                          {resource.type === 'video' && <Video className="w-4 h-4" />}
                                          {resource.type === 'article' && <FileText className="w-4 h-4" />}
                                          {resource.type === 'course' && <BookOpen className="w-4 h-4" />}
                                          {resource.type === 'tool' && <Zap className="w-4 h-4" />}
                                          {resource.type === 'book' && <FileText className="w-4 h-4" />}
                                          <div className="flex-1">
                                            <div className="font-medium">{resource.title}</div>
                                            <div className="text-xs text-muted-foreground">{resource.provider}</div>
                                          </div>
                                          <ExternalLink className="w-3 h-3" />
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="flex flex-col gap-2">
                                {!isCompleted ? (
                                  <>
                                    <Button 
                                      onClick={() => onStartItem(item)}
                                      className="gap-2"
                                    >
                                      <Play className="w-4 h-4" />
                                      Start
                                    </Button>
                                    <Button 
                                      variant="outline" 
                                      onClick={() => handleCompleteItem(item.id)}
                                      className="gap-2"
                                    >
                                      <CheckCircle className="w-4 h-4" />
                                      Mark Complete
                                    </Button>
                                  </>
                                ) : (
                                  <Badge className="bg-green-500 text-white gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    Completed
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Tips & Motivation */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <Lightbulb className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-yellow-900 dark:text-yellow-100">
                  Success Tips
                </h3>
                <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                  <li>• Consistency is key - spend {userProfile.timeCommitment} hours per week as planned</li>
                  <li>• Focus on high-priority items first to maximize impact</li>
                  <li>• Don't skip the practice problems - they're crucial for interview success</li>
                  <li>• Take notes and review regularly to reinforce learning</li>
                  <li>• Join online communities for support and motivation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}