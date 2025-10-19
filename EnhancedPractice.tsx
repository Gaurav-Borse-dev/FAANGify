import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Alert, AlertDescription } from "./ui/alert";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { 
  Code, 
  Brain, 
  Users, 
  Video, 
  Clock, 
  Target, 
  Star, 
  Play, 
  Pause, 
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Zap,
  Trophy,
  TrendingUp,
  BarChart3,
  BookOpen,
  Mic,
  Camera,
  Settings,
  ArrowRight,
  Timer,
  Award,
  Flag,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Eye,
  PenTool,
  ArrowLeft,
  Send,
  X
} from "lucide-react";

interface Question {
  id: string;
  question: string;
  hint?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeLimit: number;
}

interface PracticeSession {
  id: string;
  type: 'dsa' | 'system-design' | 'behavioral' | 'mock';
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: number;
  topics: string[];
  completed: boolean;
  score?: number;
  questions: Question[];
}

interface EnhancedPracticeProps {
  onBack: () => void;
  onStartSession: (session: PracticeSession) => void;
}

export function EnhancedPractice({ onBack, onStartSession }: EnhancedPracticeProps) {
  const [activeMode, setActiveMode] = useState('dsa');
  const [selectedSession, setSelectedSession] = useState<PracticeSession | null>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSessionActive && !isPaused) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive, isPaused]);

  const dsaSessions: PracticeSession[] = [
    {
      id: 'dsa-1',
      type: 'dsa',
      title: 'Two Pointers Technique',
      description: 'Master the two pointers approach for array and string problems',
      difficulty: 'Medium',
      estimatedTime: 45,
      topics: ['Arrays', 'Strings', 'Two Pointers'],
      completed: false,
      score: 85,
      questions: [
        {
          id: 'dsa-1-q1',
          question: 'Given a sorted array, find two numbers that add up to a target sum using two pointers.',
          hint: 'Use one pointer at the start and one at the end',
          difficulty: 'Easy',
          timeLimit: 15
        },
        {
          id: 'dsa-1-q2',
          question: 'Remove duplicates from a sorted array in-place using two pointers.',
          hint: 'Keep one pointer for unique elements',
          difficulty: 'Easy',
          timeLimit: 15
        },
        {
          id: 'dsa-1-q3',
          question: 'Find the container with most water using the two pointer technique.',
          hint: 'Move the pointer pointing to the shorter line',
          difficulty: 'Medium',
          timeLimit: 20
        }
      ]
    },
    {
      id: 'dsa-2',
      type: 'dsa',
      title: 'Dynamic Programming Fundamentals',
      description: 'Learn core DP patterns with classic problems',
      difficulty: 'Hard',
      estimatedTime: 60,
      topics: ['Dynamic Programming', 'Optimization'],
      completed: true,
      score: 92,
      questions: [
        {
          id: 'dsa-2-q1',
          question: 'Solve the classic Fibonacci problem using dynamic programming with memoization.',
          hint: 'Store previously computed values',
          difficulty: 'Easy',
          timeLimit: 15
        },
        {
          id: 'dsa-2-q2',
          question: 'Find the longest increasing subsequence in an array using DP.',
          hint: 'Use dp[i] to store LIS ending at index i',
          difficulty: 'Medium',
          timeLimit: 25
        },
        {
          id: 'dsa-2-q3',
          question: 'Solve the 0/1 Knapsack problem using dynamic programming.',
          hint: 'Create a 2D DP table',
          difficulty: 'Hard',
          timeLimit: 30
        }
      ]
    },
    {
      id: 'dsa-3',
      type: 'dsa',
      title: 'Binary Tree Traversals',
      description: 'Practice different tree traversal methods and their applications',
      difficulty: 'Medium',
      estimatedTime: 40,
      topics: ['Trees', 'Recursion', 'DFS', 'BFS'],
      completed: false,
      questions: [
        {
          id: 'dsa-3-q1',
          question: 'Implement inorder traversal of a binary tree recursively.',
          hint: 'Left -> Root -> Right',
          difficulty: 'Easy',
          timeLimit: 15
        },
        {
          id: 'dsa-3-q2',
          question: 'Implement level-order traversal using BFS and a queue.',
          hint: 'Use a queue to track nodes level by level',
          difficulty: 'Medium',
          timeLimit: 20
        },
        {
          id: 'dsa-3-q3',
          question: 'Find the maximum depth of a binary tree using DFS.',
          hint: 'Recursively calculate depth of left and right subtrees',
          difficulty: 'Easy',
          timeLimit: 15
        }
      ]
    },
    {
      id: 'dsa-4',
      type: 'dsa',
      title: 'Graph Algorithms Deep Dive',
      description: 'Explore shortest path, MST, and topological sorting',
      difficulty: 'Hard',
      estimatedTime: 75,
      topics: ['Graphs', 'Dijkstra', 'Union Find'],
      completed: false,
      questions: [
        {
          id: 'dsa-4-q1',
          question: 'Implement DFS for a graph represented as an adjacency list.',
          hint: 'Use recursion or a stack',
          difficulty: 'Medium',
          timeLimit: 20
        },
        {
          id: 'dsa-4-q2',
          question: 'Find the shortest path in an unweighted graph using BFS.',
          hint: 'BFS naturally finds shortest path',
          difficulty: 'Medium',
          timeLimit: 25
        },
        {
          id: 'dsa-4-q3',
          question: 'Implement Dijkstra\'s algorithm for shortest path in weighted graph.',
          hint: 'Use a priority queue',
          difficulty: 'Hard',
          timeLimit: 35
        }
      ]
    },
    {
      id: 'dsa-5',
      type: 'dsa',
      title: 'Sliding Window Pattern',
      description: 'Master sliding window for substring and subarray problems',
      difficulty: 'Medium',
      estimatedTime: 50,
      topics: ['Arrays', 'Strings', 'Sliding Window'],
      completed: false,
      questions: [
        {
          id: 'dsa-5-q1',
          question: 'Find the maximum sum of a subarray of size k.',
          hint: 'Slide the window and update sum',
          difficulty: 'Easy',
          timeLimit: 15
        },
        {
          id: 'dsa-5-q2',
          question: 'Find the longest substring without repeating characters.',
          hint: 'Expand window until duplicate, then shrink',
          difficulty: 'Medium',
          timeLimit: 20
        },
        {
          id: 'dsa-5-q3',
          question: 'Find minimum window substring containing all characters.',
          hint: 'Use hashmap to track character frequencies',
          difficulty: 'Hard',
          timeLimit: 30
        }
      ]
    },
    {
      id: 'dsa-6',
      type: 'dsa',
      title: 'Binary Search Mastery',
      description: 'Practice binary search and its variations',
      difficulty: 'Medium',
      estimatedTime: 45,
      topics: ['Binary Search', 'Arrays', 'Search'],
      completed: false,
      questions: [
        {
          id: 'dsa-6-q1',
          question: 'Implement classic binary search in a sorted array.',
          hint: 'Compare middle element with target',
          difficulty: 'Easy',
          timeLimit: 15
        },
        {
          id: 'dsa-6-q2',
          question: 'Find the first and last position of target in sorted array.',
          hint: 'Use binary search twice',
          difficulty: 'Medium',
          timeLimit: 20
        },
        {
          id: 'dsa-6-q3',
          question: 'Search in a rotated sorted array.',
          hint: 'Find the pivot first',
          difficulty: 'Medium',
          timeLimit: 25
        }
      ]
    },
    {
      id: 'dsa-7',
      type: 'dsa',
      title: 'Stack and Queue Problems',
      description: 'Solve problems using stack and queue data structures',
      difficulty: 'Medium',
      estimatedTime: 40,
      topics: ['Stack', 'Queue', 'Data Structures'],
      completed: false,
      questions: [
        {
          id: 'dsa-7-q1',
          question: 'Implement a queue using two stacks.',
          hint: 'Use one stack for enqueue, one for dequeue',
          difficulty: 'Medium',
          timeLimit: 20
        },
        {
          id: 'dsa-7-q2',
          question: 'Evaluate a postfix expression using a stack.',
          hint: 'Push operands, pop for operators',
          difficulty: 'Easy',
          timeLimit: 15
        },
        {
          id: 'dsa-7-q3',
          question: 'Find the next greater element for each element in array.',
          hint: 'Use a monotonic stack',
          difficulty: 'Medium',
          timeLimit: 20
        }
      ]
    },
    {
      id: 'dsa-8',
      type: 'dsa',
      title: 'Heap and Priority Queue',
      description: 'Master heap-based problems and priority queue applications',
      difficulty: 'Hard',
      estimatedTime: 55,
      topics: ['Heap', 'Priority Queue', 'Sorting'],
      completed: false,
      questions: [
        {
          id: 'dsa-8-q1',
          question: 'Find the kth largest element in an array using a min heap.',
          hint: 'Maintain a heap of size k',
          difficulty: 'Medium',
          timeLimit: 20
        },
        {
          id: 'dsa-8-q2',
          question: 'Merge k sorted linked lists using a priority queue.',
          hint: 'Add first element of each list to heap',
          difficulty: 'Hard',
          timeLimit: 30
        },
        {
          id: 'dsa-8-q3',
          question: 'Find median from data stream using two heaps.',
          hint: 'Use max heap for lower half, min heap for upper half',
          difficulty: 'Hard',
          timeLimit: 35
        }
      ]
    },
    {
      id: 'dsa-9',
      type: 'dsa',
      title: 'Backtracking Techniques',
      description: 'Solve combinatorial problems using backtracking',
      difficulty: 'Hard',
      estimatedTime: 60,
      topics: ['Backtracking', 'Recursion', 'Combinatorics'],
      completed: false,
      questions: [
        {
          id: 'dsa-9-q1',
          question: 'Generate all permutations of a given array.',
          hint: 'Swap elements and backtrack',
          difficulty: 'Medium',
          timeLimit: 25
        },
        {
          id: 'dsa-9-q2',
          question: 'Solve the N-Queens problem using backtracking.',
          hint: 'Place queens row by row, check validity',
          difficulty: 'Hard',
          timeLimit: 35
        },
        {
          id: 'dsa-9-q3',
          question: 'Find all subsets of a set (power set).',
          hint: 'Include or exclude each element',
          difficulty: 'Medium',
          timeLimit: 20
        }
      ]
    },
    {
      id: 'dsa-10',
      type: 'dsa',
      title: 'Linked List Operations',
      description: 'Master linked list manipulation and traversal',
      difficulty: 'Medium',
      estimatedTime: 45,
      topics: ['Linked Lists', 'Pointers', 'Data Structures'],
      completed: false,
      questions: [
        {
          id: 'dsa-10-q1',
          question: 'Reverse a singly linked list iteratively and recursively.',
          hint: 'Change next pointers while traversing',
          difficulty: 'Easy',
          timeLimit: 15
        },
        {
          id: 'dsa-10-q2',
          question: 'Detect a cycle in a linked list using Floyd\'s algorithm.',
          hint: 'Use slow and fast pointers',
          difficulty: 'Medium',
          timeLimit: 20
        },
        {
          id: 'dsa-10-q3',
          question: 'Merge two sorted linked lists.',
          hint: 'Compare nodes and adjust pointers',
          difficulty: 'Easy',
          timeLimit: 15
        }
      ]
    },
    {
      id: 'dsa-11',
      type: 'dsa',
      title: 'Greedy Algorithms',
      description: 'Learn when and how to apply greedy techniques',
      difficulty: 'Medium',
      estimatedTime: 50,
      topics: ['Greedy', 'Optimization', 'Algorithms'],
      completed: false,
      questions: [
        {
          id: 'dsa-11-q1',
          question: 'Solve the activity selection problem using greedy approach.',
          hint: 'Sort by finish time',
          difficulty: 'Medium',
          timeLimit: 20
        },
        {
          id: 'dsa-11-q2',
          question: 'Find minimum number of coins for change (greedy when possible).',
          hint: 'Choose largest coin first',
          difficulty: 'Easy',
          timeLimit: 15
        },
        {
          id: 'dsa-11-q3',
          question: 'Jump game: determine if you can reach the last index.',
          hint: 'Track the furthest reachable position',
          difficulty: 'Medium',
          timeLimit: 20
        }
      ]
    },
    {
      id: 'dsa-12',
      type: 'dsa',
      title: 'Bit Manipulation',
      description: 'Master bitwise operations and tricks',
      difficulty: 'Medium',
      estimatedTime: 40,
      topics: ['Bit Manipulation', 'Binary', 'Math'],
      completed: false,
      questions: [
        {
          id: 'dsa-12-q1',
          question: 'Count the number of 1 bits in an integer.',
          hint: 'Use n & (n-1) trick',
          difficulty: 'Easy',
          timeLimit: 15
        },
        {
          id: 'dsa-12-q2',
          question: 'Find the single number in array where every other appears twice.',
          hint: 'XOR all numbers',
          difficulty: 'Easy',
          timeLimit: 15
        },
        {
          id: 'dsa-12-q3',
          question: 'Reverse bits of a 32-bit unsigned integer.',
          hint: 'Process bit by bit',
          difficulty: 'Medium',
          timeLimit: 20
        }
      ]
    },
    {
      id: 'dsa-13',
      type: 'dsa',
      title: 'Trie Data Structure',
      description: 'Implement and use Trie for string problems',
      difficulty: 'Medium',
      estimatedTime: 45,
      topics: ['Trie', 'Strings', 'Data Structures'],
      completed: false,
      questions: [
        {
          id: 'dsa-13-q1',
          question: 'Implement a Trie with insert, search, and startsWith methods.',
          hint: 'Each node has 26 children for lowercase letters',
          difficulty: 'Medium',
          timeLimit: 25
        },
        {
          id: 'dsa-13-q2',
          question: 'Find all words in a dictionary that match a pattern with wildcards.',
          hint: 'Use Trie and DFS',
          difficulty: 'Hard',
          timeLimit: 30
        },
        {
          id: 'dsa-13-q3',
          question: 'Implement autocomplete using a Trie.',
          hint: 'DFS from prefix node to find all words',
          difficulty: 'Medium',
          timeLimit: 25
        }
      ]
    },
    {
      id: 'dsa-14',
      type: 'dsa',
      title: 'String Algorithms',
      description: 'Advanced string matching and manipulation',
      difficulty: 'Hard',
      estimatedTime: 55,
      topics: ['Strings', 'Pattern Matching', 'Algorithms'],
      completed: false,
      questions: [
        {
          id: 'dsa-14-q1',
          question: 'Implement the KMP pattern matching algorithm.',
          hint: 'Build LPS (Longest Prefix Suffix) array',
          difficulty: 'Hard',
          timeLimit: 30
        },
        {
          id: 'dsa-14-q2',
          question: 'Find all anagrams of a pattern in a string.',
          hint: 'Use sliding window with frequency map',
          difficulty: 'Medium',
          timeLimit: 25
        },
        {
          id: 'dsa-14-q3',
          question: 'Check if a string is a valid palindrome.',
          hint: 'Two pointers from both ends',
          difficulty: 'Easy',
          timeLimit: 15
        }
      ]
    },
    {
      id: 'dsa-15',
      type: 'dsa',
      title: 'Matrix Problems',
      description: 'Solve 2D array and matrix manipulation problems',
      difficulty: 'Medium',
      estimatedTime: 45,
      topics: ['Matrix', '2D Arrays', 'Traversal'],
      completed: false,
      questions: [
        {
          id: 'dsa-15-q1',
          question: 'Rotate a matrix 90 degrees clockwise in-place.',
          hint: 'Transpose then reverse rows',
          difficulty: 'Medium',
          timeLimit: 20
        },
        {
          id: 'dsa-15-q2',
          question: 'Spiral order traversal of a matrix.',
          hint: 'Track boundaries and move in spiral',
          difficulty: 'Medium',
          timeLimit: 25
        },
        {
          id: 'dsa-15-q3',
          question: 'Search for a target in a row-wise and column-wise sorted matrix.',
          hint: 'Start from top-right or bottom-left',
          difficulty: 'Medium',
          timeLimit: 20
        }
      ]
    }
  ];

  const systemDesignSessions: PracticeSession[] = [
    {
      id: 'sd-1',
      type: 'system-design',
      title: 'Design a URL Shortener',
      description: 'Learn to design a scalable URL shortening service like bit.ly',
      difficulty: 'Medium',
      estimatedTime: 45,
      topics: ['Scalability', 'Databases', 'Caching', 'Load Balancing'],
      completed: true,
      score: 88,
      questions: [
        {
          id: 'sd-1-q1',
          question: 'What are the functional requirements for a URL shortener?',
          hint: 'Think about shortening, redirecting, and analytics',
          difficulty: 'Easy',
          timeLimit: 10
        },
        {
          id: 'sd-1-q2',
          question: 'How would you generate unique short URLs? Compare different approaches.',
          hint: 'Consider base62 encoding, hashing, and collision handling',
          difficulty: 'Medium',
          timeLimit: 15
        },
        {
          id: 'sd-1-q3',
          question: 'Design the database schema and explain your caching strategy.',
          hint: 'Think about read-heavy workload',
          difficulty: 'Medium',
          timeLimit: 20
        }
      ]
    },
    {
      id: 'sd-2',
      type: 'system-design',
      title: 'Design a Chat System',
      description: 'Build a real-time messaging system with millions of users',
      difficulty: 'Hard',
      estimatedTime: 60,
      topics: ['Real-time', 'WebSockets', 'Message Queues', 'Sharding'],
      completed: false,
      questions: [
        {
          id: 'sd-2-q1',
          question: 'How would you handle real-time message delivery?',
          hint: 'Consider WebSockets, long polling, or server-sent events',
          difficulty: 'Medium',
          timeLimit: 15
        },
        {
          id: 'sd-2-q2',
          question: 'Design the architecture for group chat with 1000+ members.',
          hint: 'Think about fan-out strategies',
          difficulty: 'Hard',
          timeLimit: 20
        },
        {
          id: 'sd-2-q3',
          question: 'How would you ensure message ordering and delivery guarantees?',
          hint: 'Consider sequence numbers and acknowledgments',
          difficulty: 'Hard',
          timeLimit: 25
        }
      ]
    },
    {
      id: 'sd-3',
      type: 'system-design',
      title: 'Design a Social Media Feed',
      description: 'Create a news feed system for a social media platform',
      difficulty: 'Hard',
      estimatedTime: 55,
      topics: ['Timeline Generation', 'Fan-out', 'Caching', 'CDN'],
      completed: false,
      questions: [
        {
          id: 'sd-3-q1',
          question: 'Explain the difference between fan-out on write vs fan-out on read.',
          hint: 'Consider trade-offs for different user behaviors',
          difficulty: 'Medium',
          timeLimit: 15
        },
        {
          id: 'sd-3-q2',
          question: 'How would you rank and personalize the feed?',
          hint: 'Think about ML models and real-time signals',
          difficulty: 'Hard',
          timeLimit: 20
        },
        {
          id: 'sd-3-q3',
          question: 'Design the caching strategy for optimal performance.',
          hint: 'Multi-level caching with different TTLs',
          difficulty: 'Medium',
          timeLimit: 20
        }
      ]
    },
    {
      id: 'sd-4',
      type: 'system-design',
      title: 'Design a Video Streaming Service',
      description: 'Build a video platform like YouTube or Netflix',
      difficulty: 'Hard',
      estimatedTime: 70,
      topics: ['Video Encoding', 'CDN', 'Metadata Storage', 'Analytics'],
      completed: false,
      questions: [
        {
          id: 'sd-4-q1',
          question: 'Explain the video upload and encoding pipeline.',
          hint: 'Multiple resolutions, formats, and adaptive bitrate',
          difficulty: 'Medium',
          timeLimit: 20
        },
        {
          id: 'sd-4-q2',
          question: 'How would you design the CDN strategy for global distribution?',
          hint: 'Edge locations, cache invalidation, and origin servers',
          difficulty: 'Hard',
          timeLimit: 25
        },
        {
          id: 'sd-4-q3',
          question: 'Design the recommendation system architecture.',
          hint: 'Collaborative filtering, content-based, and hybrid approaches',
          difficulty: 'Hard',
          timeLimit: 25
        }
      ]
    },
    {
      id: 'sd-5',
      type: 'system-design',
      title: 'Design Twitter',
      description: 'Build a microblogging platform with timeline and trends',
      difficulty: 'Hard',
      estimatedTime: 65,
      topics: ['Timeline', 'Trends', 'Search', 'Scalability'],
      completed: false,
      questions: [
        {
          id: 'sd-5-q1',
          question: 'How would you design the tweet posting and timeline generation?',
          hint: 'Hybrid fan-out approach',
          difficulty: 'Hard',
          timeLimit: 25
        },
        {
          id: 'sd-5-q2',
          question: 'Design the trending topics feature.',
          hint: 'Real-time analytics with time windows',
          difficulty: 'Hard',
          timeLimit: 20
        },
        {
          id: 'sd-5-q3',
          question: 'How would you implement the search functionality?',
          hint: 'Inverted index and distributed search',
          difficulty: 'Medium',
          timeLimit: 20
        }
      ]
    },
    {
      id: 'sd-6',
      type: 'system-design',
      title: 'Design Instagram',
      description: 'Build a photo-sharing platform with feed and stories',
      difficulty: 'Hard',
      estimatedTime: 60,
      topics: ['Image Storage', 'CDN', 'Feed', 'Stories'],
      completed: false,
      questions: [
        {
          id: 'sd-6-q1',
          question: 'How would you handle image upload, storage, and delivery?',
          hint: 'Object storage, CDN, and multiple resolutions',
          difficulty: 'Medium',
          timeLimit: 20
        },
        {
          id: 'sd-6-q2',
          question: 'Design the stories feature with 24-hour expiration.',
          hint: 'TTL-based storage and cleanup',
          difficulty: 'Medium',
          timeLimit: 15
        },
        {
          id: 'sd-6-q3',
          question: 'How would you implement the explore page?',
          hint: 'Recommendation engine and personalization',
          difficulty: 'Hard',
          timeLimit: 25
        }
      ]
    },
    {
      id: 'sd-7',
      type: 'system-design',
      title: 'Design Uber/Lyft',
      description: 'Build a ride-sharing platform with real-time matching',
      difficulty: 'Hard',
      estimatedTime: 70,
      topics: ['Geolocation', 'Matching', 'Real-time', 'Pricing'],
      completed: false,
      questions: [
        {
          id: 'sd-7-q1',
          question: 'How would you implement driver-rider matching?',
          hint: 'Geospatial indexing and proximity search',
          difficulty: 'Hard',
          timeLimit: 25
        },
        {
          id: 'sd-7-q2',
          question: 'Design the real-time location tracking system.',
          hint: 'WebSockets and geo-partitioning',
          difficulty: 'Medium',
          timeLimit: 20
        },
        {
          id: 'sd-7-q3',
          question: 'How would you implement surge pricing?',
          hint: 'Supply-demand analysis in real-time',
          difficulty: 'Hard',
          timeLimit: 25
        }
      ]
    },
    {
      id: 'sd-8',
      type: 'system-design',
      title: 'Design Google Drive',
      description: 'Build a cloud file storage and synchronization service',
      difficulty: 'Hard',
      estimatedTime: 65,
      topics: ['File Storage', 'Sync', 'Versioning', 'Sharing'],
      completed: false,
      questions: [
        {
          id: 'sd-8-q1',
          question: 'How would you handle file upload, storage, and chunking?',
          hint: 'Break large files into chunks, deduplication',
          difficulty: 'Medium',
          timeLimit: 20
        },
        {
          id: 'sd-8-q2',
          question: 'Design the file synchronization mechanism across devices.',
          hint: 'Metadata sync, delta sync, conflict resolution',
          difficulty: 'Hard',
          timeLimit: 25
        },
        {
          id: 'sd-8-q3',
          question: 'How would you implement version control and file sharing?',
          hint: 'Snapshot-based versioning, permission levels',
          difficulty: 'Medium',
          timeLimit: 20
        }
      ]
    },
    {
      id: 'sd-9',
      type: 'system-design',
      title: 'Design Dropbox',
      description: 'Build a distributed file storage system',
      difficulty: 'Hard',
      estimatedTime: 60,
      topics: ['Distributed Storage', 'Sync', 'Metadata', 'Deduplication'],
      completed: false,
      questions: [
        {
          id: 'sd-9-q1',
          question: 'Explain the client-server architecture for sync.',
          hint: 'Metadata server, block server, client watcher',
          difficulty: 'Medium',
          timeLimit: 20
        },
        {
          id: 'sd-9-q2',
          question: 'How would you implement deduplication?',
          hint: 'Content-based hashing at block level',
          difficulty: 'Medium',
          timeLimit: 15
        },
        {
          id: 'sd-9-q3',
          question: 'Design the offline editing and conflict resolution strategy.',
          hint: 'Vector clocks or last-write-wins with user intervention',
          difficulty: 'Hard',
          timeLimit: 25
        }
      ]
    },
    {
      id: 'sd-10',
      type: 'system-design',
      title: 'Design Netflix',
      description: 'Build a global video streaming platform',
      difficulty: 'Hard',
      estimatedTime: 70,
      topics: ['Video Streaming', 'CDN', 'Recommendation', 'Analytics'],
      completed: false,
      questions: [
        {
          id: 'sd-10-q1',
          question: 'How would you optimize video delivery for different network conditions?',
          hint: 'Adaptive bitrate streaming (ABR)',
          difficulty: 'Medium',
          timeLimit: 20
        },
        {
          id: 'sd-10-q2',
          question: 'Design the content recommendation engine.',
          hint: 'Collaborative filtering, deep learning models',
          difficulty: 'Hard',
          timeLimit: 25
        },
        {
          id: 'sd-10-q3',
          question: 'Explain the CDN strategy for global content delivery.',
          hint: 'Open Connect, edge caching, pre-positioning',
          difficulty: 'Hard',
          timeLimit: 25
        }
      ]
    },
    {
      id: 'sd-11',
      type: 'system-design',
      title: 'Design Web Crawler',
      description: 'Build a distributed web crawler for search engines',
      difficulty: 'Hard',
      estimatedTime: 60,
      topics: ['Crawling', 'Distributed Systems', 'Deduplication', 'Politeness'],
      completed: false,
      questions: [
        {
          id: 'sd-11-q1',
          question: 'How would you design the URL frontier and prioritization?',
          hint: 'Priority queue, freshness, importance',
          difficulty: 'Medium',
          timeLimit: 20
        },
        {
          id: 'sd-11-q2',
          question: 'Explain your approach to avoid duplicate URLs.',
          hint: 'Bloom filters, URL normalization',
          difficulty: 'Medium',
          timeLimit: 15
        },
        {
          id: 'sd-11-q3',
          question: 'How would you implement politeness and avoid being blocked?',
          hint: 'Rate limiting per domain, robots.txt',
          difficulty: 'Medium',
          timeLimit: 25
        }
      ]
    },
    {
      id: 'sd-12',
      type: 'system-design',
      title: 'Design Search Engine',
      description: 'Build a distributed search engine like Google',
      difficulty: 'Hard',
      estimatedTime: 75,
      topics: ['Indexing', 'Ranking', 'Distributed Search', 'Cache'],
      completed: false,
      questions: [
        {
          id: 'sd-12-q1',
          question: 'How would you build the inverted index?',
          hint: 'Map-reduce, distributed indexing',
          difficulty: 'Hard',
          timeLimit: 25
        },
        {
          id: 'sd-12-q2',
          question: 'Design the ranking algorithm.',
          hint: 'PageRank, TF-IDF, ML-based ranking',
          difficulty: 'Hard',
          timeLimit: 30
        },
        {
          id: 'sd-12-q3',
          question: 'How would you handle query processing at scale?',
          hint: 'Query parsing, distributed search, result merging',
          difficulty: 'Hard',
          timeLimit: 20
        }
      ]
    },
    {
      id: 'sd-13',
      type: 'system-design',
      title: 'Design Rate Limiter',
      description: 'Build a distributed rate limiting system',
      difficulty: 'Medium',
      estimatedTime: 45,
      topics: ['Rate Limiting', 'Distributed Systems', 'Algorithms'],
      completed: false,
      questions: [
        {
          id: 'sd-13-q1',
          question: 'Compare different rate limiting algorithms.',
          hint: 'Token bucket, leaky bucket, fixed window, sliding window',
          difficulty: 'Medium',
          timeLimit: 15
        },
        {
          id: 'sd-13-q2',
          question: 'How would you implement distributed rate limiting?',
          hint: 'Redis-based counters with Lua scripts',
          difficulty: 'Hard',
          timeLimit: 20
        },
        {
          id: 'sd-13-q3',
          question: 'Design rate limiting with different tiers (free, premium).',
          hint: 'Per-user quotas stored in cache',
          difficulty: 'Medium',
          timeLimit: 10
        }
      ]
    },
    {
      id: 'sd-14',
      type: 'system-design',
      title: 'Design Notification System',
      description: 'Build a multi-channel notification delivery system',
      difficulty: 'Medium',
      estimatedTime: 50,
      topics: ['Notifications', 'Message Queues', 'Webhooks', 'Real-time'],
      completed: false,
      questions: [
        {
          id: 'sd-14-q1',
          question: 'How would you support multiple notification channels?',
          hint: 'SMS, email, push, in-app - plugin architecture',
          difficulty: 'Medium',
          timeLimit: 15
        },
        {
          id: 'sd-14-q2',
          question: 'Design the notification priority and delivery guarantee system.',
          hint: 'Priority queues, retry mechanisms, idempotency',
          difficulty: 'Medium',
          timeLimit: 20
        },
        {
          id: 'sd-14-q3',
          question: 'How would you handle notification preferences and do-not-disturb?',
          hint: 'User settings, time windows, frequency capping',
          difficulty: 'Easy',
          timeLimit: 15
        }
      ]
    },
    {
      id: 'sd-15',
      type: 'system-design',
      title: 'Design Payment System',
      description: 'Build a secure and reliable payment processing system',
      difficulty: 'Hard',
      estimatedTime: 65,
      topics: ['Payments', 'Transactions', 'Security', 'Compliance'],
      completed: false,
      questions: [
        {
          id: 'sd-15-q1',
          question: 'How would you ensure exactly-once payment processing?',
          hint: 'Idempotency keys, distributed transactions',
          difficulty: 'Hard',
          timeLimit: 25
        },
        {
          id: 'sd-15-q2',
          question: 'Design the security and PCI compliance architecture.',
          hint: 'Tokenization, encryption, separate networks',
          difficulty: 'Hard',
          timeLimit: 20
        },
        {
          id: 'sd-15-q3',
          question: 'How would you handle payment reconciliation and disputes?',
          hint: 'Audit logs, state machines, manual review queue',
          difficulty: 'Medium',
          timeLimit: 20
        }
      ]
    }
  ];

  const behavioralSessions: PracticeSession[] = [
    {
      id: 'beh-1',
      type: 'behavioral',
      title: 'Leadership & Influence',
      description: 'Practice STAR method responses for leadership questions',
      difficulty: 'Medium',
      estimatedTime: 30,
      topics: ['Leadership', 'Team Management', 'Conflict Resolution'],
      completed: true,
      score: 90,
      questions: [
        {
          id: 'beh-1-q1',
          question: 'Tell me about a time when you had to lead a team through a difficult project.',
          hint: 'Use STAR: Situation, Task, Action, Result',
          difficulty: 'Medium',
          timeLimit: 10
        },
        {
          id: 'beh-1-q2',
          question: 'Describe a situation where you had to influence others without direct authority.',
          hint: 'Focus on persuasion and collaboration',
          difficulty: 'Medium',
          timeLimit: 10
        },
        {
          id: 'beh-1-q3',
          question: 'Give an example of how you resolved a conflict within your team.',
          hint: 'Demonstrate active listening and problem-solving',
          difficulty: 'Medium',
          timeLimit: 10
        }
      ]
    },
    {
      id: 'beh-2',
      type: 'behavioral',
      title: 'Problem Solving & Innovation',
      description: 'Demonstrate analytical thinking and creative solutions',
      difficulty: 'Medium',
      estimatedTime: 35,
      topics: ['Problem Solving', 'Innovation', 'Critical Thinking'],
      completed: false,
      questions: [
        {
          id: 'beh-2-q1',
          question: 'Describe a complex problem you solved with an innovative solution.',
          hint: 'Highlight your analytical approach',
          difficulty: 'Medium',
          timeLimit: 12
        },
        {
          id: 'beh-2-q2',
          question: 'Tell me about a time when you had to think outside the box.',
          hint: 'Show creativity and impact',
          difficulty: 'Medium',
          timeLimit: 10
        },
        {
          id: 'beh-2-q3',
          question: 'Give an example of how you improved an existing process or system.',
          hint: 'Quantify the impact',
          difficulty: 'Easy',
          timeLimit: 13
        }
      ]
    },
    {
      id: 'beh-3',
      type: 'behavioral',
      title: 'Failure & Learning',
      description: 'Share examples of overcoming challenges and learning from mistakes',
      difficulty: 'Medium',
      estimatedTime: 25,
      topics: ['Resilience', 'Growth Mindset', 'Learning'],
      completed: false,
      questions: [
        {
          id: 'beh-3-q1',
          question: 'Tell me about a time when you failed and what you learned from it.',
          hint: 'Be honest and show growth',
          difficulty: 'Medium',
          timeLimit: 10
        },
        {
          id: 'beh-3-q2',
          question: 'Describe a situation where you received critical feedback. How did you respond?',
          hint: 'Show openness to feedback',
          difficulty: 'Easy',
          timeLimit: 8
        },
        {
          id: 'beh-3-q3',
          question: 'Give an example of how you turned a mistake into an opportunity.',
          hint: 'Focus on lessons learned and improvements made',
          difficulty: 'Medium',
          timeLimit: 7
        }
      ]
    },
    {
      id: 'beh-4',
      type: 'behavioral',
      title: 'Collaboration & Communication',
      description: 'Show your ability to work effectively with others',
      difficulty: 'Easy',
      estimatedTime: 30,
      topics: ['Teamwork', 'Communication', 'Stakeholder Management'],
      completed: false,
      questions: [
        {
          id: 'beh-4-q1',
          question: 'Describe a time when you worked with a difficult team member.',
          hint: 'Show empathy and professionalism',
          difficulty: 'Medium',
          timeLimit: 10
        },
        {
          id: 'beh-4-q2',
          question: 'Tell me about a successful collaboration with cross-functional teams.',
          hint: 'Highlight communication skills',
          difficulty: 'Easy',
          timeLimit: 10
        },
        {
          id: 'beh-4-q3',
          question: 'Give an example of how you communicated a complex technical concept to non-technical stakeholders.',
          hint: 'Show ability to simplify',
          difficulty: 'Medium',
          timeLimit: 10
        }
      ]
    },
    {
      id: 'beh-5',
      type: 'behavioral',
      title: 'Time Management & Priorities',
      description: 'Demonstrate ability to manage multiple priorities',
      difficulty: 'Medium',
      estimatedTime: 30,
      topics: ['Time Management', 'Prioritization', 'Deadlines'],
      completed: false,
      questions: [
        {
          id: 'beh-5-q1',
          question: 'Tell me about a time when you had to manage multiple high-priority projects.',
          hint: 'Explain your prioritization framework',
          difficulty: 'Medium',
          timeLimit: 10
        },
        {
          id: 'beh-5-q2',
          question: 'Describe a situation where you had to meet a tight deadline.',
          hint: 'Show planning and execution skills',
          difficulty: 'Easy',
          timeLimit: 10
        },
        {
          id: 'beh-5-q3',
          question: 'How do you handle competing priorities from different stakeholders?',
          hint: 'Discuss negotiation and alignment',
          difficulty: 'Medium',
          timeLimit: 10
        }
      ]
    },
    {
      id: 'beh-6',
      type: 'behavioral',
      title: 'Customer Focus',
      description: 'Show your commitment to customer satisfaction',
      difficulty: 'Medium',
      estimatedTime: 25,
      topics: ['Customer Obsession', 'User Experience', 'Feedback'],
      completed: false,
      questions: [
        {
          id: 'beh-6-q1',
          question: 'Describe a time when you went above and beyond for a customer.',
          hint: 'Show customer obsession',
          difficulty: 'Medium',
          timeLimit: 10
        },
        {
          id: 'beh-6-q2',
          question: 'Tell me about a product decision you made based on customer feedback.',
          hint: 'Show data-driven decision making',
          difficulty: 'Medium',
          timeLimit: 8
        },
        {
          id: 'beh-6-q3',
          question: 'Give an example of how you balanced customer needs with business constraints.',
          hint: 'Show strategic thinking',
          difficulty: 'Hard',
          timeLimit: 7
        }
      ]
    },
    {
      id: 'beh-7',
      type: 'behavioral',
      title: 'Ownership & Accountability',
      description: 'Demonstrate taking full ownership of projects',
      difficulty: 'Medium',
      estimatedTime: 30,
      topics: ['Ownership', 'Accountability', 'Results'],
      completed: false,
      questions: [
        {
          id: 'beh-7-q1',
          question: 'Tell me about a time when you took ownership of a problem that wasn\'t yours.',
          hint: 'Show initiative and responsibility',
          difficulty: 'Medium',
          timeLimit: 10
        },
        {
          id: 'beh-7-q2',
          question: 'Describe a project where you were solely accountable for the outcome.',
          hint: 'Highlight end-to-end ownership',
          difficulty: 'Medium',
          timeLimit: 10
        },
        {
          id: 'beh-7-q3',
          question: 'Give an example of taking accountability for a mistake or failure.',
          hint: 'Show maturity and learning',
          difficulty: 'Medium',
          timeLimit: 10
        }
      ]
    },
    {
      id: 'beh-8',
      type: 'behavioral',
      title: 'Data-Driven Decisions',
      description: 'Show how you use data to make informed decisions',
      difficulty: 'Medium',
      estimatedTime: 28,
      topics: ['Analytics', 'Metrics', 'Decision Making'],
      completed: false,
      questions: [
        {
          id: 'beh-8-q1',
          question: 'Describe a time when you used data to influence a major decision.',
          hint: 'Show analytical skills',
          difficulty: 'Medium',
          timeLimit: 10
        },
        {
          id: 'beh-8-q2',
          question: 'Tell me about a situation where data contradicted your intuition.',
          hint: 'Show willingness to change based on evidence',
          difficulty: 'Medium',
          timeLimit: 9
        },
        {
          id: 'beh-8-q3',
          question: 'How do you define and track success metrics for your projects?',
          hint: 'Discuss KPIs and measurement',
          difficulty: 'Easy',
          timeLimit: 9
        }
      ]
    },
    {
      id: 'beh-9',
      type: 'behavioral',
      title: 'Bias for Action',
      description: 'Demonstrate ability to move quickly and decisively',
      difficulty: 'Medium',
      estimatedTime: 25,
      topics: ['Speed', 'Decision Making', 'Risk Taking'],
      completed: false,
      questions: [
        {
          id: 'beh-9-q1',
          question: 'Tell me about a time when you made a quick decision with incomplete information.',
          hint: 'Show calculated risk-taking',
          difficulty: 'Medium',
          timeLimit: 10
        },
        {
          id: 'beh-9-q2',
          question: 'Describe a situation where speed was critical to success.',
          hint: 'Show ability to move fast',
          difficulty: 'Easy',
          timeLimit: 8
        },
        {
          id: 'beh-9-q3',
          question: 'Give an example of when you had to choose between perfect and good enough.',
          hint: 'Show pragmatism',
          difficulty: 'Medium',
          timeLimit: 7
        }
      ]
    },
    {
      id: 'beh-10',
      type: 'behavioral',
      title: 'Technical Excellence',
      description: 'Show commitment to high-quality technical work',
      difficulty: 'Medium',
      estimatedTime: 30,
      topics: ['Code Quality', 'Architecture', 'Best Practices'],
      completed: false,
      questions: [
        {
          id: 'beh-10-q1',
          question: 'Describe a time when you improved code quality or architecture.',
          hint: 'Show technical leadership',
          difficulty: 'Medium',
          timeLimit: 10
        },
        {
          id: 'beh-10-q2',
          question: 'Tell me about a technical decision you made that you\'re proud of.',
          hint: 'Explain trade-offs and reasoning',
          difficulty: 'Medium',
          timeLimit: 10
        },
        {
          id: 'beh-10-q3',
          question: 'How do you ensure your code is maintainable and scalable?',
          hint: 'Discuss testing, documentation, and design patterns',
          difficulty: 'Easy',
          timeLimit: 10
        }
      ]
    },
    {
      id: 'beh-11',
      type: 'behavioral',
      title: 'Mentorship & Growth',
      description: 'Show your ability to mentor and develop others',
      difficulty: 'Medium',
      estimatedTime: 25,
      topics: ['Mentorship', 'Coaching', 'Team Development'],
      completed: false,
      questions: [
        {
          id: 'beh-11-q1',
          question: 'Tell me about a time when you mentored a junior engineer.',
          hint: 'Show teaching and patience',
          difficulty: 'Medium',
          timeLimit: 10
        },
        {
          id: 'beh-11-q2',
          question: 'Describe how you helped someone improve their skills.',
          hint: 'Show investment in others',
          difficulty: 'Easy',
          timeLimit: 8
        },
        {
          id: 'beh-11-q3',
          question: 'Give an example of receiving mentorship and how it helped you grow.',
          hint: 'Show willingness to learn',
          difficulty: 'Easy',
          timeLimit: 7
        }
      ]
    },
    {
      id: 'beh-12',
      type: 'behavioral',
      title: 'Dealing with Ambiguity',
      description: 'Show how you handle unclear situations',
      difficulty: 'Medium',
      estimatedTime: 28,
      topics: ['Ambiguity', 'Uncertainty', 'Adaptability'],
      completed: false,
      questions: [
        {
          id: 'beh-12-q1',
          question: 'Describe a project where requirements were unclear or constantly changing.',
          hint: 'Show adaptability',
          difficulty: 'Medium',
          timeLimit: 10
        },
        {
          id: 'beh-12-q2',
          question: 'Tell me about a time when you had to make assumptions to move forward.',
          hint: 'Show proactive approach',
          difficulty: 'Medium',
          timeLimit: 9
        },
        {
          id: 'beh-12-q3',
          question: 'How do you handle situations where there\'s no clear right answer?',
          hint: 'Discuss framework for decision making',
          difficulty: 'Medium',
          timeLimit: 9
        }
      ]
    },
    {
      id: 'beh-13',
      type: 'behavioral',
      title: 'Disagreement & Commitment',
      description: 'Show how you handle disagreements professionally',
      difficulty: 'Medium',
      estimatedTime: 25,
      topics: ['Conflict', 'Commitment', 'Professionalism'],
      completed: false,
      questions: [
        {
          id: 'beh-13-q1',
          question: 'Tell me about a time when you disagreed with a decision but had to commit.',
          hint: 'Show professionalism and teamwork',
          difficulty: 'Medium',
          timeLimit: 10
        },
        {
          id: 'beh-13-q2',
          question: 'Describe a situation where you challenged your manager\'s decision.',
          hint: 'Show respectful disagreement',
          difficulty: 'Hard',
          timeLimit: 8
        },
        {
          id: 'beh-13-q3',
          question: 'Give an example of building consensus among team members with different opinions.',
          hint: 'Show facilitation skills',
          difficulty: 'Medium',
          timeLimit: 7
        }
      ]
    },
    {
      id: 'beh-14',
      type: 'behavioral',
      title: 'Scale & Impact',
      description: 'Demonstrate working on high-impact projects',
      difficulty: 'Hard',
      estimatedTime: 30,
      topics: ['Scale', 'Impact', 'Business Value'],
      completed: false,
      questions: [
        {
          id: 'beh-14-q1',
          question: 'Tell me about the most impactful project you\'ve worked on.',
          hint: 'Quantify the impact',
          difficulty: 'Medium',
          timeLimit: 10
        },
        {
          id: 'beh-14-q2',
          question: 'Describe a system you built that handled significant scale.',
          hint: 'Discuss technical challenges',
          difficulty: 'Hard',
          timeLimit: 10
        },
        {
          id: 'beh-14-q3',
          question: 'How do you prioritize work to maximize business impact?',
          hint: 'Show strategic thinking',
          difficulty: 'Medium',
          timeLimit: 10
        }
      ]
    },
    {
      id: 'beh-15',
      type: 'behavioral',
      title: 'Continuous Learning',
      description: 'Show commitment to personal and professional growth',
      difficulty: 'Easy',
      estimatedTime: 22,
      topics: ['Learning', 'Growth', 'Skills Development'],
      completed: false,
      questions: [
        {
          id: 'beh-15-q1',
          question: 'Tell me about a new technology or skill you recently learned.',
          hint: 'Show curiosity and initiative',
          difficulty: 'Easy',
          timeLimit: 8
        },
        {
          id: 'beh-15-q2',
          question: 'How do you stay current with industry trends and best practices?',
          hint: 'Discuss learning habits',
          difficulty: 'Easy',
          timeLimit: 7
        },
        {
          id: 'beh-15-q3',
          question: 'Describe a time when you had to quickly learn something outside your expertise.',
          hint: 'Show adaptability and learning speed',
          difficulty: 'Medium',
          timeLimit: 7
        }
      ]
    }
  ];

  const mockSessions: PracticeSession[] = [
    {
      id: 'mock-1',
      type: 'mock',
      title: 'Google SWE L4 Interview',
      description: 'Full technical interview simulation with coding and system design',
      difficulty: 'Hard',
      estimatedTime: 90,
      topics: ['Coding', 'System Design', 'Behavioral', 'Culture Fit'],
      completed: false,
      questions: [
        {
          id: 'mock-1-q1',
          question: 'Coding: Design an algorithm to find the longest palindromic substring.',
          difficulty: 'Medium',
          timeLimit: 30
        },
        {
          id: 'mock-1-q2',
          question: 'System Design: Design a distributed cache system like Memcached.',
          difficulty: 'Hard',
          timeLimit: 40
        },
        {
          id: 'mock-1-q3',
          question: 'Behavioral: Tell me about a time you demonstrated Googleyness.',
          difficulty: 'Medium',
          timeLimit: 20
        }
      ]
    },
    {
      id: 'mock-2',
      type: 'mock',
      title: 'Meta E4 Technical Round',
      description: 'Focus on algorithms, data structures, and Meta-specific questions',
      difficulty: 'Hard',
      estimatedTime: 75,
      topics: ['Algorithms', 'Data Structures', 'Product Sense'],
      completed: true,
      score: 87,
      questions: [
        {
          id: 'mock-2-q1',
          question: 'Implement a data structure that supports insert, delete, and getRandom in O(1).',
          difficulty: 'Hard',
          timeLimit: 35
        },
        {
          id: 'mock-2-q2',
          question: 'How would you design Instagram Stories?',
          difficulty: 'Hard',
          timeLimit: 30
        },
        {
          id: 'mock-2-q3',
          question: 'Tell me about a time you moved fast and broke things (then fixed them).',
          difficulty: 'Medium',
          timeLimit: 10
        }
      ]
    },
    {
      id: 'mock-3',
      type: 'mock',
      title: 'Amazon SDE II Bar Raiser',
      description: 'Complete interview loop with leadership principles focus',
      difficulty: 'Hard',
      estimatedTime: 120,
      topics: ['Technical', 'Leadership Principles', 'Behavioral'],
      completed: false,
      questions: [
        {
          id: 'mock-3-q1',
          question: 'Design Amazon\'s product recommendation system.',
          difficulty: 'Hard',
          timeLimit: 40
        },
        {
          id: 'mock-3-q2',
          question: 'Coding: Implement LRU Cache.',
          difficulty: 'Medium',
          timeLimit: 30
        },
        {
          id: 'mock-3-q3',
          question: 'Behavioral: Give an example of Customer Obsession.',
          difficulty: 'Medium',
          timeLimit: 15
        },
        {
          id: 'mock-3-q4',
          question: 'Behavioral: Tell me about a time you had to Dive Deep.',
          difficulty: 'Medium',
          timeLimit: 15
        },
        {
          id: 'mock-3-q5',
          question: 'Behavioral: Describe a situation showing Ownership.',
          difficulty: 'Medium',
          timeLimit: 20
        }
      ]
    },
    {
      id: 'mock-4',
      type: 'mock',
      title: 'Apple Senior Engineer',
      description: 'Deep technical dive with system-level programming focus',
      difficulty: 'Hard',
      estimatedTime: 85,
      topics: ['Low-level Programming', 'Performance', 'System Design'],
      completed: false,
      questions: [
        {
          id: 'mock-4-q1',
          question: 'Explain memory management and implement a custom allocator.',
          difficulty: 'Hard',
          timeLimit: 35
        },
        {
          id: 'mock-4-q2',
          question: 'Optimize a function for performance - discuss Big O and real-world optimizations.',
          difficulty: 'Hard',
          timeLimit: 30
        },
        {
          id: 'mock-4-q3',
          question: 'Design a file system with versioning.',
          difficulty: 'Hard',
          timeLimit: 20
        }
      ]
    }
  ];

  const getAllSessions = () => {
    switch (activeMode) {
      case 'dsa': return dsaSessions;
      case 'system-design': return systemDesignSessions;
      case 'behavioral': return behavioralSessions;
      case 'mock': return mockSessions;
      default: return dsaSessions;
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'dsa': return Code;
      case 'system-design': return Brain;
      case 'behavioral': return MessageSquare;
      case 'mock': return Users;
      default: return Code;
    }
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'dsa': return 'from-blue-500 to-cyan-600';
      case 'system-design': return 'from-purple-500 to-indigo-600';
      case 'behavioral': return 'from-green-500 to-emerald-600';
      case 'mock': return 'from-red-500 to-pink-600';
      default: return 'from-blue-500 to-cyan-600';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const sessions = getAllSessions();
  const completedSessions = sessions.filter(s => s.completed).length;
  const averageScore = sessions.filter(s => s.score).reduce((acc, s) => acc + (s.score || 0), 0) / sessions.filter(s => s.score).length || 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartSession = (session: PracticeSession) => {
    setSelectedSession(session);
    setIsSessionActive(true);
    setCurrentQuestionIndex(0);
    setSessionTime(0);
    setIsPaused(false);
    setUserAnswer("");
    setAnswers({});
  };

  const handleNextQuestion = () => {
    if (selectedSession && currentQuestionIndex < selectedSession.questions.length - 1) {
      // Save current answer
      setAnswers({ ...answers, [currentQuestionIndex]: userAnswer });
      setUserAnswer("");
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      // Save current answer
      setAnswers({ ...answers, [currentQuestionIndex]: userAnswer });
      // Load previous answer
      setUserAnswer(answers[currentQuestionIndex - 1] || "");
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinishSession = () => {
    // Save final answer
    setAnswers({ ...answers, [currentQuestionIndex]: userAnswer });
    // Here you would calculate score and save progress
    alert(`Session completed! Time: ${formatTime(sessionTime)}`);
    setIsSessionActive(false);
    setSelectedSession(null);
  };

  const handleExitSession = () => {
    if (confirm('Are you sure you want to exit? Your progress will be lost.')) {
      setIsSessionActive(false);
      setSelectedSession(null);
      setCurrentQuestionIndex(0);
      setSessionTime(0);
      setAnswers({});
      setUserAnswer("");
    }
  };

  // Active Session View
  if (isSessionActive && selectedSession) {
    const currentQuestion = selectedSession.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / selectedSession.questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Session Header */}
          <Card className="bg-white dark:bg-gray-800 border-2">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <h1 className="text-2xl font-bold">{selectedSession.title}</h1>
                  <p className="text-muted-foreground">
                    Question {currentQuestionIndex + 1} of {selectedSession.questions.length}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {formatTime(sessionTime)}
                    </div>
                    <div className="text-sm text-muted-foreground">Elapsed</div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsPaused(!isPaused)}
                    >
                      {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleExitSession}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Exit
                    </Button>
                  </div>
                </div>
              </div>
              
              <Progress value={progress} className="h-2" />
            </CardContent>
          </Card>

          {/* Question Card */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
                      {currentQuestion.difficulty}
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <Timer className="w-3 h-3" />
                      {currentQuestion.timeLimit} min
                    </Badge>
                  </div>
                  <h2 className="text-xl font-semibold leading-relaxed">
                    {currentQuestion.question}
                  </h2>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentQuestion.hint && (
                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Hint:</strong> {currentQuestion.hint}
                  </AlertDescription>
                </Alert>
              )}

              {/* Answer Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Answer:</label>
                <Textarea
                  placeholder="Type your answer here... (For coding questions, write your solution. For behavioral, use STAR method.)"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="min-h-[300px] font-mono text-sm"
                  disabled={isPaused}
                />
                <div className="text-sm text-muted-foreground">
                  {userAnswer.length} characters
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <div className="flex gap-2">
                  {currentQuestionIndex < selectedSession.questions.length - 1 ? (
                    <Button onClick={handleNextQuestion} className="gap-2">
                      Next Question
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button onClick={handleFinishSession} className="gap-2 bg-green-600 hover:bg-green-700">
                      <CheckCircle className="w-4 h-4" />
                      Finish Session
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Question Navigator */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-sm">Question Navigator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {selectedSession.questions.map((q, idx) => (
                  <Button
                    key={idx}
                    variant={idx === currentQuestionIndex ? "default" : answers[idx] ? "outline" : "ghost"}
                    size="sm"
                    onClick={() => {
                      setAnswers({ ...answers, [currentQuestionIndex]: userAnswer });
                      setUserAnswer(answers[idx] || "");
                      setCurrentQuestionIndex(idx);
                    }}
                    className="w-10 h-10"
                  >
                    {idx + 1}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Main Practice Hub View
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Enhanced Practice Modes
            </h1>
            <p className="text-muted-foreground">
              Comprehensive interview preparation with AI-powered feedback
            </p>
          </div>
          <Button variant="outline" onClick={onBack} className="gap-2">
            ← Back to Dashboard
          </Button>
        </div>

        {/* Mode Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">{sessions.length}</div>
                  <div className="text-sm text-muted-foreground">Available Sessions</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <div>
                  <div className="text-2xl font-bold">{completedSessions}</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-yellow-500" />
                <div>
                  <div className="text-2xl font-bold">{Math.round(averageScore) || 0}</div>
                  <div className="text-sm text-muted-foreground">Avg Score</div>
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
                    {Math.round(sessions.reduce((acc, s) => acc + s.estimatedTime, 0) / 60)}h
                  </div>
                  <div className="text-sm text-muted-foreground">Total Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Practice Mode Tabs */}
        <Tabs value={activeMode} onValueChange={setActiveMode} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dsa" className="gap-2">
              <Code className="w-4 h-4" />
              DSA Practice
            </TabsTrigger>
            <TabsTrigger value="system-design" className="gap-2">
              <Brain className="w-4 h-4" />
              System Design
            </TabsTrigger>
            <TabsTrigger value="behavioral" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Behavioral
            </TabsTrigger>
            <TabsTrigger value="mock" className="gap-2">
              <Users className="w-4 h-4" />
              Mock Interviews
            </TabsTrigger>
          </TabsList>

          {/* DSA Practice */}
          <TabsContent value="dsa" className="space-y-6">
            <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Data Structures & Algorithms
                </CardTitle>
                <CardDescription>
                  Master coding interviews with pattern-based practice sessions - {dsaSessions.length} sessions available
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {dsaSessions.map((session) => (
                    <Card key={session.id} className={`hover:shadow-md transition-shadow ${session.completed ? 'bg-green-50 dark:bg-green-900/20 border-green-200' : ''}`}>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <h3 className="font-semibold text-lg">{session.title}</h3>
                              <p className="text-sm text-muted-foreground">{session.description}</p>
                            </div>
                            {session.completed && (
                              <Badge className="bg-green-500 text-white">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Done
                              </Badge>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Badge className={getDifficultyColor(session.difficulty)}>
                              {session.difficulty}
                            </Badge>
                            <Badge variant="outline" className="gap-1">
                              <Timer className="w-3 h-3" />
                              {session.estimatedTime}m
                            </Badge>
                            <Badge variant="outline" className="gap-1">
                              <BookOpen className="w-3 h-3" />
                              {session.questions.length} questions
                            </Badge>
                            {session.score && (
                              <Badge variant="outline" className="gap-1">
                                <Star className="w-3 h-3" />
                                {session.score}%
                              </Badge>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {session.topics.map((topic) => (
                              <Badge key={topic} variant="secondary" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>

                          <Button 
                            className="w-full gap-2"
                            onClick={() => handleStartSession(session)}
                          >
                            <Play className="w-4 h-4" />
                            {session.completed ? 'Practice Again' : 'Start Session'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Design */}
          <TabsContent value="system-design" className="space-y-6">
            <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  System Design Practice
                </CardTitle>
                <CardDescription>
                  Learn to design scalable systems with real-world scenarios - {systemDesignSessions.length} sessions available
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {systemDesignSessions.map((session) => (
                    <Card key={session.id} className={`hover:shadow-md transition-shadow ${session.completed ? 'bg-green-50 dark:bg-green-900/20 border-green-200' : ''}`}>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <h3 className="font-semibold text-lg">{session.title}</h3>
                              <p className="text-sm text-muted-foreground">{session.description}</p>
                            </div>
                            {session.completed && (
                              <Badge className="bg-green-500 text-white">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Done
                              </Badge>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Badge className={getDifficultyColor(session.difficulty)}>
                              {session.difficulty}
                            </Badge>
                            <Badge variant="outline" className="gap-1">
                              <Timer className="w-3 h-3" />
                              {session.estimatedTime}m
                            </Badge>
                            <Badge variant="outline" className="gap-1">
                              <BookOpen className="w-3 h-3" />
                              {session.questions.length} questions
                            </Badge>
                            {session.score && (
                              <Badge variant="outline" className="gap-1">
                                <Star className="w-3 h-3" />
                                {session.score}%
                              </Badge>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {session.topics.map((topic) => (
                              <Badge key={topic} variant="secondary" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>

                          <Button 
                            className="w-full gap-2"
                            onClick={() => handleStartSession(session)}
                          >
                            <Play className="w-4 h-4" />
                            Start Design
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Behavioral */}
          <TabsContent value="behavioral" className="space-y-6">
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Behavioral Interview Practice
                </CardTitle>
                <CardDescription>
                  Master the STAR method and showcase your soft skills effectively - {behavioralSessions.length} sessions available
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg border">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    STAR Method Framework
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-blue-600">Situation</div>
                      <div className="text-muted-foreground">Set the context</div>
                    </div>
                    <div>
                      <div className="font-medium text-green-600">Task</div>
                      <div className="text-muted-foreground">Explain the challenge</div>
                    </div>
                    <div>
                      <div className="font-medium text-purple-600">Action</div>
                      <div className="text-muted-foreground">Describe your actions</div>
                    </div>
                    <div>
                      <div className="font-medium text-orange-600">Result</div>
                      <div className="text-muted-foreground">Share the outcome</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {behavioralSessions.map((session) => (
                    <Card key={session.id} className={`hover:shadow-md transition-shadow ${session.completed ? 'bg-green-50 dark:bg-green-900/20 border-green-200' : ''}`}>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <h3 className="font-semibold text-lg">{session.title}</h3>
                              <p className="text-sm text-muted-foreground">{session.description}</p>
                            </div>
                            {session.completed && (
                              <Badge className="bg-green-500 text-white">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Done
                              </Badge>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Badge className={getDifficultyColor(session.difficulty)}>
                              {session.difficulty}
                            </Badge>
                            <Badge variant="outline" className="gap-1">
                              <Timer className="w-3 h-3" />
                              {session.estimatedTime}m
                            </Badge>
                            <Badge variant="outline" className="gap-1">
                              <BookOpen className="w-3 h-3" />
                              {session.questions.length} questions
                            </Badge>
                            {session.score && (
                              <Badge variant="outline" className="gap-1">
                                <Star className="w-3 h-3" />
                                {session.score}%
                              </Badge>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {session.topics.map((topic) => (
                              <Badge key={topic} variant="secondary" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>

                          <Button 
                            className="w-full gap-2"
                            onClick={() => handleStartSession(session)}
                          >
                            <Mic className="w-4 h-4" />
                            Practice Questions
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mock Interviews */}
          <TabsContent value="mock" className="space-y-6">
            <Card className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Mock Interview Sessions
                </CardTitle>
                <CardDescription>
                  Full interview simulations with real-time feedback and scoring - {mockSessions.length} sessions available
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-6">
                  <Video className="h-4 w-4" />
                  <AlertDescription>
                    Mock interviews include comprehensive question sets across multiple topics.
                    Prepare as you would for a real interview!
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {mockSessions.map((session) => (
                    <Card key={session.id} className={`hover:shadow-md transition-shadow ${session.completed ? 'bg-green-50 dark:bg-green-900/20 border-green-200' : ''}`}>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <h3 className="font-semibold text-lg">{session.title}</h3>
                              <p className="text-sm text-muted-foreground">{session.description}</p>
                            </div>
                            {session.completed && (
                              <Badge className="bg-green-500 text-white">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Done
                              </Badge>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Badge className={getDifficultyColor(session.difficulty)}>
                              {session.difficulty}
                            </Badge>
                            <Badge variant="outline" className="gap-1">
                              <Timer className="w-3 h-3" />
                              {session.estimatedTime}m
                            </Badge>
                            <Badge variant="outline" className="gap-1">
                              <BookOpen className="w-3 h-3" />
                              {session.questions.length} questions
                            </Badge>
                            {session.score && (
                              <Badge variant="outline" className="gap-1">
                                <Star className="w-3 h-3" />
                                {session.score}%
                              </Badge>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {session.topics.map((topic) => (
                              <Badge key={topic} variant="secondary" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>

                          <Button 
                            className="w-full gap-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
                            onClick={() => handleStartSession(session)}
                          >
                            <Video className="w-4 h-4" />
                            Start Interview
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Your Progress Overview</h3>
              <Button variant="outline" size="sm" className="gap-2">
                <BarChart3 className="w-4 h-4" />
                View Detailed Analytics
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                <Code className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <div className="font-bold text-lg">
                  {dsaSessions.filter(s => s.completed).length}/{dsaSessions.length}
                </div>
                <div className="text-sm text-muted-foreground">DSA Complete</div>
              </div>
              <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                <Brain className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                <div className="font-bold text-lg">
                  {systemDesignSessions.filter(s => s.completed).length}/{systemDesignSessions.length}
                </div>
                <div className="text-sm text-muted-foreground">System Design</div>
              </div>
              <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                <MessageSquare className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className="font-bold text-lg">
                  {behavioralSessions.filter(s => s.completed).length}/{behavioralSessions.length}
                </div>
                <div className="text-sm text-muted-foreground">Behavioral</div>
              </div>
              <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                <Users className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <div className="font-bold text-lg">
                  {mockSessions.filter(s => s.completed).length}/{mockSessions.length}
                </div>
                <div className="text-sm text-muted-foreground">Mock Interviews</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}