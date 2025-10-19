import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  BookOpen,
  Target,
  TrendingUp,
  FileText,
  Zap,
  Trophy,
  MapPin,
  Sparkles,
  Mic,
  Bookmark,
  StickyNote,
  Lightbulb,
  CalendarDays,
  Library,
  User,
  Search,
  X,
  ChevronRight,
  HelpCircle,
} from "lucide-react";

interface HelpBotProps {
  onNavigate: (view: string) => void;
}

interface NavigationItem {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: string;
  keywords: string[];
}

export function HelpBot({ onNavigate }: HelpBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const navigationItems: NavigationItem[] = [
    {
      id: "dashboard",
      title: "Dashboard",
      description: "Overview of your progress and quick actions",
      icon: BookOpen,
      category: "Main",
      keywords: ["home", "overview", "main", "start", "dashboard"],
    },
    {
      id: "resume-intake",
      title: "Resume Analysis",
      description: "Upload and analyze your resume with AI",
      icon: FileText,
      category: "Features",
      keywords: ["resume", "cv", "upload", "analyze", "ai", "analysis"],
    },
    {
      id: "enhanced-practice",
      title: "Practice Hub",
      description: "DSA, System Design, and Behavioral practice",
      icon: Zap,
      category: "Practice",
      keywords: ["practice", "dsa", "system design", "behavioral", "coding", "algorithm"],
    },
    {
      id: "roadmap",
      title: "Learning Roadmap",
      description: "Personalized study plan and milestones",
      icon: MapPin,
      category: "Features",
      keywords: ["roadmap", "plan", "path", "learning", "study plan", "milestones"],
    },
    {
      id: "gamified-progress",
      title: "Progress & Achievements",
      description: "Track XP, levels, and achievements",
      icon: Trophy,
      category: "Main",
      keywords: ["progress", "xp", "level", "achievements", "stats", "leaderboard"],
    },
    {
      id: "tips",
      title: "Interview Tips",
      description: "Company-specific interview guidance",
      icon: Sparkles,
      category: "Resources",
      keywords: ["tips", "interview", "company", "advice", "guidance", "preparation"],
    },
    {
      id: "mock-interview",
      title: "Mock Interview",
      description: "AI-powered interview practice with feedback",
      icon: Mic,
      category: "Practice",
      keywords: ["mock", "interview", "practice", "ai", "voice", "feedback"],
    },
    {
      id: "questions",
      title: "Coding Questions",
      description: "Browse and solve coding challenges",
      icon: Target,
      category: "Practice",
      keywords: ["questions", "coding", "challenges", "problems", "leetcode"],
    },
    {
      id: "bookmarks",
      title: "Bookmarks",
      description: "Saved questions and important resources",
      icon: Bookmark,
      category: "Study Tools",
      keywords: ["bookmarks", "saved", "favorites", "marked"],
    },
    {
      id: "study-notes",
      title: "Study Notes",
      description: "Create and organize your study notes",
      icon: StickyNote,
      category: "Study Tools",
      keywords: ["notes", "study", "write", "organize", "documentation"],
    },
    {
      id: "flashcards",
      title: "Flashcards",
      description: "Spaced repetition learning with flashcards",
      icon: Lightbulb,
      category: "Study Tools",
      keywords: ["flashcards", "memorize", "spaced repetition", "review", "cards"],
    },
    {
      id: "study-planner",
      title: "Study Planner",
      description: "Schedule and plan your study sessions",
      icon: CalendarDays,
      category: "Study Tools",
      keywords: ["planner", "schedule", "calendar", "plan", "organize", "time"],
    },
    {
      id: "resources",
      title: "Resources Library",
      description: "Curated learning materials and references",
      icon: Library,
      category: "Study Tools",
      keywords: ["resources", "library", "materials", "books", "videos", "articles"],
    },
    {
      id: "user-profile",
      title: "My Profile",
      description: "View your detailed stats and achievements",
      icon: User,
      category: "Main",
      keywords: ["profile", "account", "stats", "user", "me", "settings"],
    },
  ];

  const filteredItems = navigationItems.filter((item) => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.keywords.some((keyword) => keyword.includes(query)) ||
      item.category.toLowerCase().includes(query)
    );
  });

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, NavigationItem[]>);

  const handleNavigate = (viewId: string) => {
    onNavigate(viewId);
    setIsOpen(false);
    setSearchQuery("");
  };

  const quickActions = [
    { id: "questions", title: "Start Practicing", icon: Target },
    { id: "resume-intake", title: "Analyze Resume", icon: FileText },
    { id: "mock-interview", title: "Mock Interview", icon: Mic },
    { id: "roadmap", title: "View Roadmap", icon: MapPin },
  ];

  return (
    <>
      {/* Floating Help Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-110 relative group"
          aria-label="Help and Navigation"
        >
          <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20"></div>
          <span className="relative text-2xl font-bold">F</span>
          
          {/* Tooltip */}
          {isHovered && (
            <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap animate-fade-in">
              Need help? Click here!
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          )}
        </Button>
      </div>

      {/* Help Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold">
                F
              </div>
              <div>
                <DialogTitle className="text-2xl">FAANGify Help Center</DialogTitle>
                <DialogDescription>
                  Find any section or feature quickly
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="px-6 pb-6 overflow-y-auto max-h-[calc(85vh-140px)]">
            {/* Search Bar */}
            <div className="sticky top-0 bg-background pb-4 pt-2 z-10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search for features, tools, or sections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 h-12 text-base"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            {!searchQuery && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={action.id}
                        onClick={() => handleNavigate(action.id)}
                        className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-blue-200/50 dark:border-blue-800/30 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 group"
                      >
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                          <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="font-medium text-sm">{action.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Navigation Items */}
            {Object.entries(groupedItems).length > 0 ? (
              <div className="space-y-6">
                {Object.entries(groupedItems).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      {category}
                    </h3>
                    <div className="space-y-2">
                      {items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleNavigate(item.id)}
                            className="w-full flex items-center justify-between p-4 bg-card hover:bg-accent border rounded-xl transition-all duration-200 group hover:shadow-md"
                          >
                            <div className="flex items-center gap-4">
                              <div className="p-2 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors">
                                <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                              </div>
                              <div className="text-left">
                                <div className="font-semibold group-hover:text-primary transition-colors">
                                  {item.title}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {item.description}
                                </div>
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-4">
                  Try searching with different keywords
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSearchQuery("")}
                  className="gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear Search
                </Button>
              </div>
            )}

            {/* Help Tips */}
            {!searchQuery && (
              <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200/50 dark:border-blue-800/30 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mt-0.5">
                    <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">Pro Tips</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Use the search bar to quickly find any feature</li>
                      <li>• Start with Resume Analysis to get personalized recommendations</li>
                      <li>• Practice regularly to maintain your streak and earn XP</li>
                      <li>• Bookmark important questions for later review</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
}
