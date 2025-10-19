import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  ArrowLeft,
  BookOpen,
  Video,
  FileText,
  ExternalLink,
  Search,
  Star,
  TrendingUp,
  Code,
  Layers,
} from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "article" | "video" | "course" | "documentation" | "book";
  category: string;
  url: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  tags: string[];
  featured?: boolean;
}

interface ResourcesLibraryProps {
  onBack: () => void;
}

export function ResourcesLibrary({ onBack }: ResourcesLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Curated resources (40+ high-quality resources)
  const resources: Resource[] = [
    // Algorithms & Data Structures (15 resources)
    {
      id: "1",
      title: "Introduction to Algorithms (CLRS)",
      description:
        "The comprehensive guide to algorithms and data structures. Essential reading for technical interviews.",
      type: "book",
      category: "algorithms",
      url: "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/",
      difficulty: "Advanced",
      rating: 5,
      tags: ["algorithms", "data-structures", "fundamentals"],
      featured: true,
    },
    {
      id: "2",
      title: "LeetCode Patterns",
      description:
        "Common patterns and techniques for solving coding interview problems efficiently.",
      type: "article",
      category: "algorithms",
      url: "https://leetcode.com/discuss/general-discussion/458695/dynamic-programming-patterns",
      difficulty: "Intermediate",
      rating: 5,
      tags: ["patterns", "dynamic-programming", "leetcode"],
      featured: true,
    },
    {
      id: "3",
      title: "NeetCode - Coding Interview Roadmap",
      description:
        "150 essential LeetCode problems organized by patterns with video solutions.",
      type: "course",
      category: "algorithms",
      url: "https://neetcode.io/",
      difficulty: "Intermediate",
      rating: 5,
      tags: ["coding", "patterns", "roadmap"],
      featured: true,
    },
    {
      id: "16",
      title: "The Algorithm Design Manual",
      description:
        "Steven Skiena's practical guide to designing and implementing algorithms with real-world examples.",
      type: "book",
      category: "algorithms",
      url: "https://www.algorist.com/",
      difficulty: "Intermediate",
      rating: 5,
      tags: ["algorithms", "problem-solving", "implementation"],
    },
    {
      id: "17",
      title: "VisuAlgo - Algorithm Visualizations",
      description:
        "Interactive visualizations of data structures and algorithms to help you understand them better.",
      type: "course",
      category: "algorithms",
      url: "https://visualgo.net/",
      difficulty: "Beginner",
      rating: 5,
      tags: ["visualization", "learning", "interactive"],
    },
    {
      id: "18",
      title: "Graph Algorithms for Technical Interviews",
      description:
        "Comprehensive guide to graph traversal, shortest paths, and advanced graph algorithms.",
      type: "article",
      category: "algorithms",
      url: "https://leetcode.com/discuss/general-discussion/655708/graph-for-beginners-problems-pattern-sample-solutions",
      difficulty: "Intermediate",
      rating: 4,
      tags: ["graphs", "dfs", "bfs", "algorithms"],
    },
    {
      id: "19",
      title: "Dynamic Programming Patterns",
      description:
        "Master DP through pattern recognition - covers all major DP problem types.",
      type: "article",
      category: "algorithms",
      url: "https://leetcode.com/discuss/general-discussion/662866/dp-for-beginners-problems-patterns-sample-solutions",
      difficulty: "Advanced",
      rating: 5,
      tags: ["dynamic-programming", "patterns", "optimization"],
    },
    {
      id: "20",
      title: "Cracking the Coding Interview",
      description:
        "Gayle Laakmann McDowell's classic book with 189 programming questions and solutions.",
      type: "book",
      category: "algorithms",
      url: "https://www.crackingthecodinginterview.com/",
      difficulty: "Intermediate",
      rating: 5,
      tags: ["coding", "interviews", "problem-solving"],
      featured: true,
    },
    {
      id: "21",
      title: "Binary Search Patterns",
      description:
        "Complete guide to binary search and its variations for interview problems.",
      type: "article",
      category: "algorithms",
      url: "https://leetcode.com/discuss/general-discussion/786126/python-powerful-ultimate-binary-search-template-solved-many-problems",
      difficulty: "Intermediate",
      rating: 4,
      tags: ["binary-search", "algorithms", "templates"],
    },
    {
      id: "22",
      title: "Two Pointers Technique",
      description:
        "Master the two-pointer pattern for arrays and linked list problems.",
      type: "article",
      category: "algorithms",
      url: "https://leetcode.com/articles/two-pointer-technique/",
      difficulty: "Beginner",
      rating: 4,
      tags: ["two-pointers", "arrays", "techniques"],
    },
    {
      id: "23",
      title: "Sliding Window Pattern Guide",
      description:
        "Comprehensive tutorial on sliding window technique with 20+ practice problems.",
      type: "article",
      category: "algorithms",
      url: "https://leetcode.com/discuss/general-discussion/657507/sliding-window-for-beginners-problems-template-sample-solutions",
      difficulty: "Intermediate",
      rating: 5,
      tags: ["sliding-window", "arrays", "strings"],
    },
    {
      id: "24",
      title: "AlgoExpert",
      description:
        "100+ curated coding interview questions with video explanations and solutions.",
      type: "course",
      category: "algorithms",
      url: "https://www.algoexpert.io/",
      difficulty: "Intermediate",
      rating: 4,
      tags: ["coding", "video-solutions", "practice"],
    },
    {
      id: "25",
      title: "Backtracking Problems Template",
      description:
        "General approach and template for solving backtracking problems efficiently.",
      type: "article",
      category: "algorithms",
      url: "https://leetcode.com/problems/permutations/discuss/18239/A-general-approach-to-backtracking-questions",
      difficulty: "Advanced",
      rating: 4,
      tags: ["backtracking", "recursion", "templates"],
    },
    {
      id: "26",
      title: "Tree Traversal Techniques",
      description:
        "Master all tree traversal methods: inorder, preorder, postorder, and level-order.",
      type: "article",
      category: "algorithms",
      url: "https://leetcode.com/articles/a-recursive-approach-to-binary-tree-traversal/",
      difficulty: "Beginner",
      rating: 4,
      tags: ["trees", "traversal", "recursion"],
    },
    {
      id: "27",
      title: "Trie Data Structure Guide",
      description:
        "Complete guide to implementing and using Trie for string problems.",
      type: "article",
      category: "algorithms",
      url: "https://leetcode.com/articles/implement-trie-prefix-tree/",
      difficulty: "Intermediate",
      rating: 4,
      tags: ["trie", "strings", "data-structures"],
    },
    
    // System Design (10 resources)
    {
      id: "4",
      title: "System Design Primer",
      description:
        "Learn how to design large-scale systems. Prep for the system design interview.",
      type: "documentation",
      category: "system-design",
      url: "https://github.com/donnemartin/system-design-primer",
      difficulty: "Intermediate",
      rating: 5,
      tags: ["system-design", "scalability", "architecture"],
      featured: true,
    },
    {
      id: "5",
      title: "Designing Data-Intensive Applications",
      description:
        "The big ideas behind reliable, scalable, and maintainable systems by Martin Kleppmann.",
      type: "book",
      category: "system-design",
      url: "https://dataintensive.net/",
      difficulty: "Advanced",
      rating: 5,
      tags: ["databases", "distributed-systems", "scalability"],
      featured: true,
    },
    {
      id: "6",
      title: "ByteByteGo - System Design Interview",
      description:
        "Visual guides and explanations for system design interview questions.",
      type: "course",
      category: "system-design",
      url: "https://bytebytego.com/",
      difficulty: "Intermediate",
      rating: 5,
      tags: ["system-design", "visual-learning", "interviews"],
    },
    {
      id: "28",
      title: "Grokking the System Design Interview",
      description:
        "Structured approach to system design with 15+ real interview questions from FAANG.",
      type: "course",
      category: "system-design",
      url: "https://www.educative.io/courses/grokking-the-system-design-interview",
      difficulty: "Intermediate",
      rating: 5,
      tags: ["system-design", "faang", "interviews"],
      featured: true,
    },
    {
      id: "29",
      title: "System Design Interview (Alex Xu)",
      description:
        "Step-by-step guide for acing system design interviews with detailed diagrams.",
      type: "book",
      category: "system-design",
      url: "https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF",
      difficulty: "Intermediate",
      rating: 5,
      tags: ["system-design", "interviews", "architecture"],
    },
    {
      id: "30",
      title: "High Scalability Blog",
      description:
        "Real-world system architecture case studies from companies like Netflix, Uber, and Twitter.",
      type: "article",
      category: "system-design",
      url: "http://highscalability.com/",
      difficulty: "Advanced",
      rating: 4,
      tags: ["scalability", "architecture", "case-studies"],
    },
    {
      id: "31",
      title: "AWS Architecture Center",
      description:
        "Reference architectures, diagrams, and best practices for cloud system design.",
      type: "documentation",
      category: "system-design",
      url: "https://aws.amazon.com/architecture/",
      difficulty: "Intermediate",
      rating: 4,
      tags: ["aws", "cloud", "architecture"],
    },
    {
      id: "32",
      title: "Microservices Patterns",
      description:
        "Chris Richardson's guide to designing and implementing microservice architectures.",
      type: "book",
      category: "system-design",
      url: "https://microservices.io/patterns/",
      difficulty: "Advanced",
      rating: 4,
      tags: ["microservices", "patterns", "architecture"],
    },
    {
      id: "33",
      title: "Database Internals",
      description:
        "Deep dive into how databases work internally - essential for system design.",
      type: "book",
      category: "system-design",
      url: "https://www.databass.dev/",
      difficulty: "Advanced",
      rating: 5,
      tags: ["databases", "internals", "storage"],
    },

    // Behavioral (7 resources)
    {
      id: "7",
      title: "STAR Method Guide",
      description:
        "Master the STAR (Situation, Task, Action, Result) method for behavioral interviews.",
      type: "article",
      category: "behavioral",
      url: "https://www.indeed.com/career-advice/interviewing/how-to-use-the-star-interview-response-technique",
      difficulty: "Beginner",
      rating: 4,
      tags: ["behavioral", "star-method", "interviews"],
      featured: true,
    },
    {
      id: "8",
      title: "Amazon Leadership Principles",
      description:
        "Deep dive into Amazon's 16 leadership principles with examples and preparation tips.",
      type: "article",
      category: "behavioral",
      url: "https://www.amazon.jobs/content/en/our-workplace/leadership-principles",
      difficulty: "Intermediate",
      rating: 5,
      tags: ["amazon", "leadership-principles", "behavioral"],
    },
    {
      id: "34",
      title: "Google's Guide to Behavioral Interviews",
      description:
        "Official preparation guide for Google behavioral interviews with sample questions.",
      type: "article",
      category: "behavioral",
      url: "https://careers.google.com/how-we-hire/",
      difficulty: "Intermediate",
      rating: 4,
      tags: ["google", "behavioral", "interviews"],
    },
    {
      id: "35",
      title: "Meta's Interview Prep Resources",
      description:
        "Meta's official guide to preparing for behavioral and cultural fit interviews.",
      type: "article",
      category: "behavioral",
      url: "https://www.metacareers.com/life/preparing-for-your-software-engineering-interview-at-meta",
      difficulty: "Intermediate",
      rating: 4,
      tags: ["meta", "behavioral", "culture-fit"],
    },
    {
      id: "36",
      title: "Behavioral Interview Questions Database",
      description:
        "Comprehensive collection of 100+ behavioral questions asked at top tech companies.",
      type: "article",
      category: "behavioral",
      url: "https://www.techinterviewhandbook.org/behavioral-interview-questions/",
      difficulty: "Beginner",
      rating: 4,
      tags: ["behavioral", "questions", "preparation"],
    },
    {
      id: "37",
      title: "The Effective Engineer",
      description:
        "Edmond Lau's book on maximizing impact and leveling up your engineering career.",
      type: "book",
      category: "behavioral",
      url: "https://www.effectiveengineer.com/",
      difficulty: "Intermediate",
      rating: 5,
      tags: ["career", "impact", "engineering"],
    },
    {
      id: "38",
      title: "Staff Engineer: Leadership Beyond the Management Track",
      description:
        "Will Larson's guide to advancing as a senior IC with real stories from staff engineers.",
      type: "book",
      category: "behavioral",
      url: "https://staffeng.com/book",
      difficulty: "Advanced",
      rating: 4,
      tags: ["career", "leadership", "staff-engineer"],
    },

    // Coding & Practice Platforms (8 resources)
    {
      id: "9",
      title: "Grokking the Coding Interview",
      description:
        "Pattern-based approach to ace coding interviews at FAANG companies.",
      type: "course",
      category: "coding",
      url: "https://www.educative.io/courses/grokking-coding-interview-patterns-python",
      difficulty: "Intermediate",
      rating: 5,
      tags: ["patterns", "coding", "faang"],
      featured: true,
    },
    {
      id: "10",
      title: "Blind 75 LeetCode Questions",
      description:
        "The most important 75 LeetCode questions for technical interviews, curated by a former Facebook engineer.",
      type: "article",
      category: "algorithms",
      url: "https://www.teamblind.com/post/New-Year-Gift---Curated-List-of-Top-75-LeetCode-Questions-to-Save-Your-Time-OaM1orEU",
      difficulty: "Intermediate",
      rating: 5,
      tags: ["leetcode", "essentials", "coding"],
      featured: true,
    },

    // Languages & Fundamentals
    {
      id: "11",
      title: "Big O Notation Cheat Sheet",
      description:
        "Quick reference for time and space complexity of common algorithms and data structures.",
      type: "documentation",
      category: "fundamentals",
      url: "https://www.bigocheatsheet.com/",
      difficulty: "Beginner",
      rating: 5,
      tags: ["big-o", "complexity", "reference"],
    },
    {
      id: "12",
      title: "Python for Coding Interviews",
      description:
        "Essential Python syntax, built-in functions, and data structures for coding interviews.",
      type: "article",
      category: "fundamentals",
      url: "https://docs.python.org/3/tutorial/",
      difficulty: "Beginner",
      rating: 4,
      tags: ["python", "syntax", "coding"],
    },

    // Practice Platforms & More Resources
    {
      id: "13",
      title: "LeetCode",
      description:
        "The most popular platform for practicing coding interview questions.",
      type: "course",
      category: "practice",
      url: "https://leetcode.com/",
      difficulty: "Intermediate",
      rating: 5,
      tags: ["practice", "coding", "interviews"],
      featured: true,
    },
    {
      id: "14",
      title: "HackerRank Interview Preparation Kit",
      description:
        "Structured interview preparation with practice problems and tutorials.",
      type: "course",
      category: "practice",
      url: "https://www.hackerrank.com/interview/interview-preparation-kit",
      difficulty: "Intermediate",
      rating: 4,
      tags: ["practice", "coding", "tutorials"],
    },
    {
      id: "15",
      title: "Pramp - Free Mock Interviews",
      description:
        "Practice live coding interviews with peers for free.",
      type: "course",
      category: "practice",
      url: "https://www.pramp.com/",
      difficulty: "Intermediate",
      rating: 4,
      tags: ["mock-interview", "practice", "peer-learning"],
    },
    {
      id: "39",
      title: "Interviewing.io",
      description:
        "Anonymous technical interview practice with engineers from top companies.",
      type: "course",
      category: "practice",
      url: "https://interviewing.io/",
      difficulty: "Intermediate",
      rating: 4,
      tags: ["mock-interview", "anonymous", "practice"],
    },
    {
      id: "40",
      title: "CodeSignal",
      description:
        "Practice coding challenges and take company-specific assessments.",
      type: "course",
      category: "practice",
      url: "https://codesignal.com/",
      difficulty: "Intermediate",
      rating: 4,
      tags: ["practice", "assessments", "coding"],
    },
    {
      id: "41",
      title: "Codewars",
      description:
        "Level up your coding skills through gamified challenges and kata.",
      type: "course",
      category: "practice",
      url: "https://www.codewars.com/",
      difficulty: "Beginner",
      rating: 4,
      tags: ["practice", "gamification", "challenges"],
    },
    {
      id: "42",
      title: "TopCoder",
      description:
        "Competitive programming platform with algorithm competitions and practice problems.",
      type: "course",
      category: "practice",
      url: "https://www.topcoder.com/",
      difficulty: "Advanced",
      rating: 4,
      tags: ["competitive", "algorithms", "practice"],
    },
    {
      id: "43",
      title: "Tech Interview Handbook",
      description:
        "Free curated collection of interview preparation resources and tips.",
      type: "documentation",
      category: "fundamentals",
      url: "https://www.techinterviewhandbook.org/",
      difficulty: "Intermediate",
      rating: 5,
      tags: ["guide", "resources", "comprehensive"],
      featured: true,
    },
    {
      id: "44",
      title: "Codeforces",
      description:
        "Competitive programming contests to sharpen problem-solving skills.",
      type: "course",
      category: "practice",
      url: "https://codeforces.com/",
      difficulty: "Advanced",
      rating: 4,
      tags: ["competitive", "contests", "algorithms"],
    },
    {
      id: "45",
      title: "GeeksforGeeks Interview Preparation",
      description:
        "Comprehensive tutorials and practice problems for technical interviews.",
      type: "course",
      category: "algorithms",
      url: "https://www.geeksforgeeks.org/",
      difficulty: "Intermediate",
      rating: 4,
      tags: ["tutorials", "practice", "learning"],
    },
    {
      id: "46",
      title: "Elements of Programming Interviews",
      description:
        "The insiders' guide with 300+ coding interview problems in Java, Python, and C++.",
      type: "book",
      category: "algorithms",
      url: "https://elementsofprogramminginterviews.com/",
      difficulty: "Advanced",
      rating: 5,
      tags: ["coding", "interviews", "problems"],
    },
    {
      id: "47",
      title: "LeetCode Discuss - Company Tags",
      description:
        "Community-curated questions organized by company with recent interview experiences.",
      type: "article",
      category: "coding",
      url: "https://leetcode.com/discuss/interview-question",
      difficulty: "Intermediate",
      rating: 5,
      tags: ["leetcode", "companies", "experiences"],
    },
    {
      id: "48",
      title: "Daily Coding Problem",
      description:
        "Get a coding problem in your inbox every day from real interviews.",
      type: "course",
      category: "practice",
      url: "https://www.dailycodingproblem.com/",
      difficulty: "Intermediate",
      rating: 4,
      tags: ["daily", "practice", "email"],
    },
  ];

  const categories = [
    "all",
    "algorithms",
    "system-design",
    "behavioral",
    "coding",
    "fundamentals",
    "practice",
  ];

  const totalResources = resources.length;

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory =
      categoryFilter === "all" || resource.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const featuredResources = filteredResources.filter((r) => r.featured);
  const regularResources = filteredResources.filter((r) => !r.featured);

  const getTypeIcon = (type: Resource["type"]) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />;
      case "book":
        return <BookOpen className="w-4 h-4" />;
      case "course":
        return <Layers className="w-4 h-4" />;
      case "documentation":
        return <Code className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Advanced":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 rounded-2xl p-8 border border-cyan-200/50 dark:border-cyan-800/30">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Button variant="ghost" onClick={onBack} className="mb-4 -ml-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Resources Library
            </h1>
            <p className="text-lg text-muted-foreground">
              Curated learning materials for interview preparation
            </p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold text-cyan-600">
              {totalResources}
            </div>
            <p className="text-sm text-muted-foreground">Curated Resources</p>
            <div className="flex gap-4 mt-4 text-xs text-muted-foreground">
              <div>
                <span className="font-semibold text-blue-600">
                  {resources.filter(r => r.category === 'algorithms').length}
                </span> Algorithms
              </div>
              <div>
                <span className="font-semibold text-purple-600">
                  {resources.filter(r => r.category === 'system-design').length}
                </span> System Design
              </div>
              <div>
                <span className="font-semibold text-green-600">
                  {resources.filter(r => r.category === 'practice').length}
                </span> Practice
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-card rounded-2xl p-6 border shadow-sm space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search resources by title, description, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12"
          />
        </div>

        <Tabs value={categoryFilter} onValueChange={setCategoryFilter}>
          <TabsList className="grid w-full grid-cols-7">
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {cat === "all" ? "All" : cat.replace("-", " ")}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Featured Resources */}
      {featuredResources.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-cyan-600" />
            Featured Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {featuredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} getTypeIcon={getTypeIcon} getDifficultyColor={getDifficultyColor} />
            ))}
          </div>
        </div>
      )}

      {/* All Resources */}
      {regularResources.length > 0 && (
        <div className="space-y-4">
          {featuredResources.length > 0 && (
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-cyan-600" />
              All Resources
            </h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {regularResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} getTypeIcon={getTypeIcon} getDifficultyColor={getDifficultyColor} />
            ))}
          </div>
        </div>
      )}

      {filteredResources.length === 0 && (
        <div className="text-center py-16 bg-card rounded-2xl border">
          <Search className="w-16 h-16 text-muted-foreground mx-auto opacity-50 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Resources Found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filters
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setCategoryFilter("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}

function ResourceCard({
  resource,
  getTypeIcon,
  getDifficultyColor,
}: {
  resource: Resource;
  getTypeIcon: (type: Resource["type"]) => JSX.Element;
  getDifficultyColor: (difficulty: string) => string;
}) {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
      {resource.featured && (
        <div className="absolute top-0 right-0">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 text-xs font-semibold flex items-center gap-1 rounded-bl-lg">
            <Star className="w-3 h-3 fill-white" />
            Featured
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg text-cyan-600">
              {getTypeIcon(resource.type)}
            </div>
            <Badge variant="outline" className="text-xs">
              {resource.type}
            </Badge>
            <Badge className={`${getDifficultyColor(resource.difficulty)} text-xs`}>
              {resource.difficulty}
            </Badge>
          </div>
          
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-cyan-600 transition-colors">
            {resource.title}
          </h3>
          
          <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
            {resource.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {resource.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {resource.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{resource.tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < resource.rating
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => window.open(resource.url, "_blank")}
            className="group-hover:bg-cyan-50 dark:group-hover:bg-cyan-950/30"
          >
            Visit <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </div>
    </Card>
  );
}