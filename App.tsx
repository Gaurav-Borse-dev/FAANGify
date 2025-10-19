import { useState, useEffect } from "react";
import { AuthPage } from "./components/AuthPage";
import { CompanyCard } from "./components/CompanyCard";
import { FaangCompanyRect } from "./components/FaangCompanyRect";
import { QuestionCard } from "./components/QuestionCard";
import { CodingChallenge } from "./components/CodingChallenge";
import { InterviewTips } from "./components/InterviewTips";
import { ProgressTracker } from "./components/ProgressTracker";
import { ResumeIntake } from "./components/ResumeIntake";
import { ResumeAnalysisResults } from "./components/ResumeAnalysisResults";
import { CustomRoadmap } from "./components/CustomRoadmap";
import { EnhancedPractice } from "./components/EnhancedPractice";
import { GamifiedProgress } from "./components/GamifiedProgress";
import { UserDetailPage } from "./components/UserDetailPage";
import { MockInterviewBot } from "./components/MockInterviewBot";
import { BookmarksPage } from "./components/BookmarksPage";
import { StudyNotes } from "./components/StudyNotes";
import { FlashcardsPage } from "./components/FlashcardsPage";
import { StudyPlanner } from "./components/StudyPlanner";
import { ResourcesLibrary } from "./components/ResourcesLibrary";
import { HelpBot } from "./components/HelpBot";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Badge } from "./components/ui/badge";
import {
  Search,
  BookOpen,
  Target,
  TrendingUp,
  LogOut,
  User,
  Sun,
  Moon,
  Brain,
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
  ChevronDown,
  GraduationCap
} from "lucide-react";

type View =
  | "dashboard"
  | "questions"
  | "challenge"
  | "tips"
  | "progress"
  | "resume-intake"
  | "resume-analysis"
  | "roadmap"
  | "enhanced-practice"
  | "gamified-progress"
  | "user-profile"
  | "mock-interview"
  | "bookmarks"
  | "study-notes"
  | "flashcards"
  | "study-planner"
  | "resources";

interface Question {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
  estimatedTime: number;
  company: string;
  completed: boolean;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  hints: string[];
  solution: string;
}

export default function App() {
  const [currentView, setCurrentView] =
    useState<View>("dashboard");
  const [selectedCompany, setSelectedCompany] = useState<
    string | null
  >(null);
  const [selectedQuestion, setSelectedQuestion] =
    useState<Question | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] =
    useState<string>("all");
  const [topicFilter, setTopicFilter] = useState<string>("all");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('faangify-theme');
    return saved ? saved === 'dark' : false;
  });
  const [userProgress, setUserProgress] = useState(() => {
    const saved = localStorage.getItem(
      "faang-interview-progress",
    );
    return saved
      ? JSON.parse(saved)
      : {
          completedQuestions: [],
          timeSpent: {},
          streakDays: 0,
          lastActivityDate: null,
        };
  });

  // New comprehensive feature states
  const [resumeAnalysis, setResumeAnalysis] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);

  // Check authentication on app load
  useEffect(() => {
    const authData = localStorage.getItem('faang-user-auth');
    if (authData) {
      try {
        const { isAuthenticated: auth, user: userData } = JSON.parse(authData);
        if (auth && userData) {
          setIsAuthenticated(true);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error parsing auth data:', error);
        localStorage.removeItem('faang-user-auth');
      }
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('faangify-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const companies = [
    {
      name: "Google",
      logo: "https://www.citypng.com/public/uploads/preview/google-logo-icon-gsuite-hd-701751694791470gzbayltphh.png",
      description:
        "Focus on algorithms, system design, and Googleyness",
      difficulty: "Hard",
      questionCount: 45,
      topics: [
        "Arrays",
        "Dynamic Programming",
        "Graphs",
        "System Design",
      ],
    },
    {
      name: "Meta",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Meta_Platforms_Inc._logo_%28cropped%29.svg/2560px-Meta_Platforms_Inc._logo_%28cropped%29.svg.png",
      description:
        "Emphasis on behavioral interviews and coding",
      difficulty: "Hard",
      questionCount: 38,
      topics: [
        "Trees",
        "Graphs",
        "Dynamic Programming",
        "Behavioral",
      ],
    },
    {
      name: "Amazon",
      logo: "https://st3.depositphotos.com/1001860/16375/i/450/depositphotos_163757632-stock-photo-amazon-logo-on-a-white.jpg",
      description:
        "Leadership principles and scalable solutions",
      difficulty: "Medium",
      questionCount: 52,
      topics: [
        "Arrays",
        "Strings",
        "Leadership Principles",
        "System Design",
      ],
    },
    {
      name: "Apple",
      logo: "https://www.transparentpng.com/thumb/apple-logo/RRgURB-apple-logo-clipart-hd.png",
      description:
        "Deep technical knowledge and attention to detail",
      difficulty: "Hard",
      questionCount: 28,
      topics: [
        "Low-level Programming",
        "Hardware",
        "Algorithms",
      ],
    },
    {
      name: "Netflix",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9Y9w-vhwNHxfSOZWSDFJ-9iPU8EPY0GR47A&s",
      description:
        "Culture fit and high-performance engineering",
      difficulty: "Medium",
      questionCount: 22,
      topics: ["Scalability", "Performance", "Culture Fit"],
    },
  ];

  const mockQuestions: Question[] = [
    {
      id: "1",
      title: "Two Sum",
      difficulty: "Easy",
      topic: "Arrays",
      estimatedTime: 15,
      company: "Google",
      completed: false,
      description:
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
      examples: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation:
            "Because nums[0] + nums[1] == 9, we return [0, 1].",
        },
        {
          input: "nums = [3,2,4], target = 6",
          output: "[1,2]",
        },
      ],
      constraints: [
        "2 ≤ nums.length ≤ 10⁴",
        "-10⁹ ≤ nums[i] ≤ 10⁹",
        "-10⁹ ≤ target ≤ 10⁹",
        "Only one valid answer exists.",
      ],
      hints: [
        "A really brute force way would be to search for all possible pairs of numbers but that would be too slow.",
        "Try using a hash map to store the numbers you've seen so far.",
        "For each number, check if target - number exists in the hash map.",
      ],
      solution: `def twoSum(nums, target):
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []`,
    },
    {
      id: "2",
      title: "Valid Parentheses",
      difficulty: "Easy",
      topic: "Stack",
      estimatedTime: 20,
      company: "Meta",
      completed: false,
      description:
        "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
      examples: [
        {
          input: 's = "()"',
          output: "true",
        },
        {
          input: 's = "()[]{}"',
          output: "true",
        },
        {
          input: 's = "(]"',
          output: "false",
        },
      ],
      constraints: [
        "1 ≤ s.length ≤ 10⁴",
        "s consists of parentheses only '()[]{}'",
      ],
      hints: [
        "Use a stack to keep track of opening brackets.",
        "When you encounter a closing bracket, check if it matches the most recent opening bracket.",
        "The string is valid if the stack is empty at the end.",
      ],
      solution: `def isValid(s):
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    
    for char in s:
        if char in mapping:
            top_element = stack.pop() if stack else '#'
            if mapping[char] != top_element:
                return False
        else:
            stack.append(char)
    
    return not stack`,
    },
    {
      id: "3",
      title: "Merge Two Sorted Lists",
      difficulty: "Easy",
      topic: "Linked Lists",
      estimatedTime: 25,
      company: "Amazon",
      completed: false,
      description:
        "You are given the heads of two sorted linked lists list1 and list2.\n\nMerge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.",
      examples: [
        {
          input: "list1 = [1,2,4], list2 = [1,3,4]",
          output: "[1,1,2,3,4,4]",
        },
        {
          input: "list1 = [], list2 = []",
          output: "[]",
        },
      ],
      constraints: [
        "The number of nodes in both lists is in the range [0, 50].",
        "-100 ≤ Node.val ≤ 100",
        "Both list1 and list2 are sorted in non-decreasing order.",
      ],
      hints: [
        "Use a dummy node to simplify the merging process.",
        "Compare the values of the current nodes and move the pointer of the smaller value.",
        "Don't forget to append the remaining nodes from the non-empty list.",
      ],
      solution: `def mergeTwoLists(list1, list2):
    dummy = ListNode(0)
    current = dummy
    
    while list1 and list2:
        if list1.val <= list2.val:
            current.next = list1
            list1 = list1.next
        else:
            current.next = list2
            list2 = list2.next
        current = current.next
    
    current.next = list1 or list2
    return dummy.next`,
    },
    {
      id: "4",
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      topic: "Sliding Window",
      estimatedTime: 30,
      company: "Apple",
      completed: false,
      description:
        "Given a string s, find the length of the longest substring without repeating characters.",
      examples: [
        {
          input: 's = "abcabcbb"',
          output: "3",
          explanation:
            'The answer is "abc", with the length of 3.',
        },
        {
          input: 's = "bbbbb"',
          output: "1",
          explanation:
            'The answer is "b", with the length of 1.',
        },
      ],
      constraints: [
        "0 ≤ s.length ≤ 5 * 10⁴",
        "s consists of English letters, digits, symbols and spaces.",
      ],
      hints: [
        "Use the sliding window technique with two pointers.",
        "Keep track of characters you've seen using a set or map.",
        "When you encounter a duplicate, move the left pointer past the previous occurrence.",
      ],
      solution: `def lengthOfLongestSubstring(s):
    char_set = set()
    left = 0
    max_length = 0
    
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_length = max(max_length, right - left + 1)
    
    return max_length`,
    },
    {
      id: "5",
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      topic: "Binary Search",
      estimatedTime: 45,
      company: "Netflix",
      completed: false,
      description:
        "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).",
      examples: [
        {
          input: "nums1 = [1,3], nums2 = [2]",
          output: "2.00000",
          explanation:
            "merged array = [1,2,3] and median is 2.",
        },
        {
          input: "nums1 = [1,2], nums2 = [3,4]",
          output: "2.50000",
          explanation:
            "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.",
        },
      ],
      constraints: [
        "nums1.length == m",
        "nums2.length == n",
        "0 ≤ m ≤ 1000",
        "0 ≤ n ≤ 1000",
        "1 ≤ m + n ≤ 2000",
        "-10⁶ ≤ nums1[i], nums2[i] ≤ 10⁶",
      ],
      hints: [
        "The key insight is to use binary search on the smaller array.",
        "Find the correct partition such that elements on the left are smaller than elements on the right.",
        "Handle edge cases where one array is empty or partitions are at the boundaries.",
      ],
      solution: `def findMedianSortedArrays(nums1, nums2):
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    
    m, n = len(nums1), len(nums2)
    left, right = 0, m
    
    while left <= right:
        partition1 = (left + right) // 2
        partition2 = (m + n + 1) // 2 - partition1
        
        max_left1 = float('-inf') if partition1 == 0 else nums1[partition1 - 1]
        min_right1 = float('inf') if partition1 == m else nums1[partition1]
        
        max_left2 = float('-inf') if partition2 == 0 else nums2[partition2 - 1]
        min_right2 = float('inf') if partition2 == n else nums2[partition2]
        
        if max_left1 <= min_right2 and max_left2 <= min_right1:
            if (m + n) % 2 == 0:
                return (max(max_left1, max_left2) + min(min_right1, min_right2)) / 2
            else:
                return max(max_left1, max_left2)
        elif max_left1 > min_right2:
            right = partition1 - 1
        else:
            left = partition1 + 1`,
    },
    // Additional Google Questions
    {
      id: "6",
      title: "Best Time to Buy and Sell Stock",
      difficulty: "Easy",
      topic: "Arrays",
      estimatedTime: 15,
      company: "Google",
      completed: false,
      description:
        "You are given an array prices where prices[i] is the price of a given stock on the ith day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
      examples: [
        {
          input: "prices = [7,1,5,3,6,4]",
          output: "5",
          explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.",
        },
        {
          input: "prices = [7,6,4,3,1]",
          output: "0",
          explanation: "In this case, no transactions are done and the max profit = 0.",
        },
      ],
      constraints: [
        "1 ≤ prices.length ≤ 10⁵",
        "0 ≤ prices[i] ≤ 10⁴",
      ],
      hints: [
        "Keep track of the minimum price seen so far.",
        "For each price, calculate the profit if we sell at that price.",
        "Update the maximum profit as we iterate.",
      ],
      solution: `def maxProfit(prices):
    min_price = float('inf')
    max_profit = 0
    
    for price in prices:
        min_price = min(min_price, price)
        max_profit = max(max_profit, price - min_price)
    
    return max_profit`,
    },
    {
      id: "7",
      title: "Container With Most Water",
      difficulty: "Medium",
      topic: "Two Pointers",
      estimatedTime: 25,
      company: "Google",
      completed: false,
      description:
        "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.",
      examples: [
        {
          input: "height = [1,8,6,2,5,4,8,3,7]",
          output: "49",
          explanation: "The vertical lines are at indices 1 and 8, forming area = 7 * 7 = 49.",
        },
      ],
      constraints: [
        "n == height.length",
        "2 ≤ n ≤ 10⁵",
        "0 ≤ height[i] ≤ 10⁴",
      ],
      hints: [
        "Use two pointers starting from both ends.",
        "Move the pointer pointing to the shorter line inward.",
        "Calculate area at each step and track the maximum.",
      ],
      solution: `def maxArea(height):
    left, right = 0, len(height) - 1
    max_area = 0
    
    while left < right:
        width = right - left
        max_area = max(max_area, min(height[left], height[right]) * width)
        
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    
    return max_area`,
    },
    {
      id: "8",
      title: "Word Ladder",
      difficulty: "Hard",
      topic: "BFS",
      estimatedTime: 40,
      company: "Google",
      completed: false,
      description:
        "A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:\n\n- Every adjacent pair of words differs by a single letter.\n- Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.\n- sk == endWord\n\nGiven two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.",
      examples: [
        {
          input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
          output: "5",
          explanation: 'One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> "cog", which is 5 words long.',
        },
      ],
      constraints: [
        "1 ≤ beginWord.length ≤ 10",
        "endWord.length == beginWord.length",
        "1 ≤ wordList.length ≤ 5000",
        "wordList[i].length == beginWord.length",
        "All strings consist of lowercase English letters.",
      ],
      hints: [
        "Use BFS to find the shortest path.",
        "Pre-process the word list to find all intermediate states.",
        "Use a queue to track current word and level.",
      ],
      solution: `from collections import deque, defaultdict

def ladderLength(beginWord, endWord, wordList):
    if endWord not in wordList:
        return 0
    
    word_set = set(wordList)
    queue = deque([(beginWord, 1)])
    
    while queue:
        word, level = queue.popleft()
        
        if word == endWord:
            return level
        
        for i in range(len(word)):
            for c in 'abcdefghijklmnopqrstuvwxyz':
                next_word = word[:i] + c + word[i+1:]
                if next_word in word_set:
                    word_set.remove(next_word)
                    queue.append((next_word, level + 1))
    
    return 0`,
    },
    // Amazon Questions
    {
      id: "9",
      title: "Reverse Linked List",
      difficulty: "Easy",
      topic: "Linked Lists",
      estimatedTime: 15,
      company: "Amazon",
      completed: false,
      description:
        "Given the head of a singly linked list, reverse the list, and return the reversed list.",
      examples: [
        {
          input: "head = [1,2,3,4,5]",
          output: "[5,4,3,2,1]",
        },
        {
          input: "head = [1,2]",
          output: "[2,1]",
        },
      ],
      constraints: [
        "The number of nodes in the list is the range [0, 5000].",
        "-5000 ≤ Node.val ≤ 5000",
      ],
      hints: [
        "Use three pointers: prev, current, and next.",
        "Iterate through the list reversing pointers.",
        "Don't forget to handle the head and tail properly.",
      ],
      solution: `def reverseList(head):
    prev = None
    current = head
    
    while current:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node
    
    return prev`,
    },
    {
      id: "10",
      title: "K Closest Points to Origin",
      difficulty: "Medium",
      topic: "Heap",
      estimatedTime: 25,
      company: "Amazon",
      completed: false,
      description:
        "Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).\n\nThe distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)² + (y1 - y2)²).\n\nYou may return the answer in any order.",
      examples: [
        {
          input: "points = [[1,3],[-2,2]], k = 1",
          output: "[[-2,2]]",
          explanation: "The distance between (1, 3) and the origin is sqrt(10). The distance between (-2, 2) and the origin is sqrt(8). Since sqrt(8) < sqrt(10), (-2, 2) is closer.",
        },
      ],
      constraints: [
        "1 ≤ k ≤ points.length ≤ 10⁴",
        "-10⁴ < xi, yi < 10⁴",
      ],
      hints: [
        "Use a max heap to keep track of k closest points.",
        "Calculate distance without taking square root for efficiency.",
        "Python's heapq is a min heap, use negative distances for max heap.",
      ],
      solution: `import heapq

def kClosest(points, k):
    heap = []
    
    for x, y in points:
        dist = -(x*x + y*y)
        if len(heap) < k:
            heapq.heappush(heap, (dist, x, y))
        elif dist > heap[0][0]:
            heapq.heapreplace(heap, (dist, x, y))
    
    return [[x, y] for (_, x, y) in heap]`,
    },
    {
      id: "11",
      title: "Product of Array Except Self",
      difficulty: "Medium",
      topic: "Arrays",
      estimatedTime: 25,
      company: "Amazon",
      completed: false,
      description:
        "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].\n\nThe product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.\n\nYou must write an algorithm that runs in O(n) time and without using the division operation.",
      examples: [
        {
          input: "nums = [1,2,3,4]",
          output: "[24,12,8,6]",
        },
        {
          input: "nums = [-1,1,0,-3,3]",
          output: "[0,0,9,0,0]",
        },
      ],
      constraints: [
        "2 ≤ nums.length ≤ 10⁵",
        "-30 ≤ nums[i] ≤ 30",
      ],
      hints: [
        "Calculate prefix products from left to right.",
        "Calculate suffix products from right to left.",
        "Multiply prefix and suffix for each position.",
      ],
      solution: `def productExceptSelf(nums):
    n = len(nums)
    result = [1] * n
    
    # Left products
    left_product = 1
    for i in range(n):
        result[i] = left_product
        left_product *= nums[i]
    
    # Right products
    right_product = 1
    for i in range(n - 1, -1, -1):
        result[i] *= right_product
        right_product *= nums[i]
    
    return result`,
    },
    {
      id: "12",
      title: "Serialize and Deserialize Binary Tree",
      difficulty: "Hard",
      topic: "Trees",
      estimatedTime: 40,
      company: "Amazon",
      completed: false,
      description:
        "Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.\n\nDesign an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.",
      examples: [
        {
          input: "root = [1,2,3,null,null,4,5]",
          output: "[1,2,3,null,null,4,5]",
        },
      ],
      constraints: [
        "The number of nodes in the tree is in the range [0, 10⁴].",
        "-1000 ≤ Node.val ≤ 1000",
      ],
      hints: [
        "Use pre-order traversal for serialization.",
        "Use 'null' or 'X' to represent null nodes.",
        "Build tree recursively during deserialization.",
      ],
      solution: `class Codec:
    def serialize(self, root):
        def dfs(node):
            if not node:
                return 'X,'
            return str(node.val) + ',' + dfs(node.left) + dfs(node.right)
        return dfs(root)
    
    def deserialize(self, data):
        def dfs():
            val = next(vals)
            if val == 'X':
                return None
            node = TreeNode(int(val))
            node.left = dfs()
            node.right = dfs()
            return node
        
        vals = iter(data.split(','))
        return dfs()`,
    },
    // Meta Questions
    {
      id: "13",
      title: "Binary Tree Level Order Traversal",
      difficulty: "Medium",
      topic: "Trees",
      estimatedTime: 20,
      company: "Meta",
      completed: false,
      description:
        "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
      examples: [
        {
          input: "root = [3,9,20,null,null,15,7]",
          output: "[[3],[9,20],[15,7]]",
        },
      ],
      constraints: [
        "The number of nodes in the tree is in the range [0, 2000].",
        "-1000 ≤ Node.val ≤ 1000",
      ],
      hints: [
        "Use BFS with a queue.",
        "Process nodes level by level.",
        "Track the number of nodes at each level.",
      ],
      solution: `from collections import deque

def levelOrder(root):
    if not root:
        return []
    
    result = []
    queue = deque([root])
    
    while queue:
        level_size = len(queue)
        level = []
        
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        result.append(level)
    
    return result`,
    },
    {
      id: "14",
      title: "Add Two Numbers",
      difficulty: "Medium",
      topic: "Linked Lists",
      estimatedTime: 25,
      company: "Meta",
      completed: false,
      description:
        "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.\n\nYou may assume the two numbers do not contain any leading zero, except the number 0 itself.",
      examples: [
        {
          input: "l1 = [2,4,3], l2 = [5,6,4]",
          output: "[7,0,8]",
          explanation: "342 + 465 = 807.",
        },
      ],
      constraints: [
        "The number of nodes in each linked list is in the range [1, 100].",
        "0 ≤ Node.val ≤ 9",
      ],
      hints: [
        "Use a dummy head to simplify edge cases.",
        "Keep track of carry from previous addition.",
        "Handle lists of different lengths.",
      ],
      solution: `def addTwoNumbers(l1, l2):
    dummy = ListNode(0)
    current = dummy
    carry = 0
    
    while l1 or l2 or carry:
        val1 = l1.val if l1 else 0
        val2 = l2.val if l2 else 0
        
        total = val1 + val2 + carry
        carry = total // 10
        current.next = ListNode(total % 10)
        current = current.next
        
        if l1:
            l1 = l1.next
        if l2:
            l2 = l2.next
    
    return dummy.next`,
    },
    {
      id: "15",
      title: "Clone Graph",
      difficulty: "Medium",
      topic: "Graphs",
      estimatedTime: 30,
      company: "Meta",
      completed: false,
      description:
        "Given a reference of a node in a connected undirected graph.\n\nReturn a deep copy (clone) of the graph.\n\nEach node in the graph contains a value (int) and a list (List[Node]) of its neighbors.",
      examples: [
        {
          input: "adjList = [[2,4],[1,3],[2,4],[1,3]]",
          output: "[[2,4],[1,3],[2,4],[1,3]]",
          explanation: "There are 4 nodes in the graph.",
        },
      ],
      constraints: [
        "The number of nodes in the graph is in the range [0, 100].",
        "1 ≤ Node.val ≤ 100",
      ],
      hints: [
        "Use a hash map to track cloned nodes.",
        "Use DFS or BFS to traverse the graph.",
        "Clone nodes as you encounter them.",
      ],
      solution: `def cloneGraph(node):
    if not node:
        return None
    
    cloned = {}
    
    def dfs(node):
        if node in cloned:
            return cloned[node]
        
        clone = Node(node.val)
        cloned[node] = clone
        
        for neighbor in node.neighbors:
            clone.neighbors.append(dfs(neighbor))
        
        return clone
    
    return dfs(node)`,
    },
    {
      id: "16",
      title: "Regular Expression Matching",
      difficulty: "Hard",
      topic: "Dynamic Programming",
      estimatedTime: 45,
      company: "Meta",
      completed: false,
      description:
        "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:\n\n- '.' Matches any single character.\n- '*' Matches zero or more of the preceding element.\n\nThe matching should cover the entire input string (not partial).",
      examples: [
        {
          input: 's = "aa", p = "a"',
          output: "false",
          explanation: '"a" does not match the entire string "aa".',
        },
        {
          input: 's = "aa", p = "a*"',
          output: "true",
          explanation: "'*' means zero or more of the preceding element, 'a'.",
        },
      ],
      constraints: [
        "1 ≤ s.length ≤ 20",
        "1 ≤ p.length ≤ 30",
      ],
      hints: [
        "Use dynamic programming with 2D table.",
        "Handle '*' by considering zero or more occurrences.",
        "Handle '.' by matching any character.",
      ],
      solution: `def isMatch(s, p):
    m, n = len(s), len(p)
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = True
    
    # Handle patterns like a*, a*b*, a*b*c*
    for j in range(2, n + 1):
        if p[j - 1] == '*':
            dp[0][j] = dp[0][j - 2]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if p[j - 1] == s[i - 1] or p[j - 1] == '.':
                dp[i][j] = dp[i - 1][j - 1]
            elif p[j - 1] == '*':
                dp[i][j] = dp[i][j - 2]
                if p[j - 2] == s[i - 1] or p[j - 2] == '.':
                    dp[i][j] = dp[i][j] or dp[i - 1][j]
    
    return dp[m][n]`,
    },
    // Apple Questions
    {
      id: "17",
      title: "Palindrome Linked List",
      difficulty: "Easy",
      topic: "Linked Lists",
      estimatedTime: 20,
      company: "Apple",
      completed: false,
      description:
        "Given the head of a singly linked list, return true if it is a palindrome or false otherwise.",
      examples: [
        {
          input: "head = [1,2,2,1]",
          output: "true",
        },
        {
          input: "head = [1,2]",
          output: "false",
        },
      ],
      constraints: [
        "The number of nodes in the list is in the range [1, 10⁵].",
        "0 ≤ Node.val ≤ 9",
      ],
      hints: [
        "Use slow and fast pointers to find the middle.",
        "Reverse the second half of the list.",
        "Compare first half with reversed second half.",
      ],
      solution: `def isPalindrome(head):
    # Find middle
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    # Reverse second half
    prev = None
    while slow:
        next_node = slow.next
        slow.next = prev
        prev = slow
        slow = next_node
    
    # Compare
    left, right = head, prev
    while right:
        if left.val != right.val:
            return False
        left = left.next
        right = right.next
    
    return True`,
    },
    {
      id: "18",
      title: "Maximum Subarray",
      difficulty: "Medium",
      topic: "Dynamic Programming",
      estimatedTime: 20,
      company: "Apple",
      completed: false,
      description:
        "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
      examples: [
        {
          input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
          output: "6",
          explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
        },
      ],
      constraints: [
        "1 ≤ nums.length ≤ 10⁵",
        "-10⁴ ≤ nums[i] ≤ 10⁴",
      ],
      hints: [
        "Use Kadane's algorithm.",
        "Keep track of current sum and maximum sum.",
        "Reset current sum to 0 if it becomes negative.",
      ],
      solution: `def maxSubArray(nums):
    max_sum = nums[0]
    current_sum = 0
    
    for num in nums:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    
    return max_sum`,
    },
    {
      id: "19",
      title: "Merge Intervals",
      difficulty: "Medium",
      topic: "Arrays",
      estimatedTime: 25,
      company: "Apple",
      completed: false,
      description:
        "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
      examples: [
        {
          input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
          output: "[[1,6],[8,10],[15,18]]",
          explanation: "Since intervals [1,3] and [2,6] overlap, merge them into [1,6].",
        },
      ],
      constraints: [
        "1 ≤ intervals.length ≤ 10⁴",
        "intervals[i].length == 2",
        "0 ≤ starti ≤ endi ≤ 10⁴",
      ],
      hints: [
        "Sort intervals by start time.",
        "Iterate and merge overlapping intervals.",
        "Check if current start is less than or equal to previous end.",
      ],
      solution: `def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    
    for current in intervals[1:]:
        if current[0] <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], current[1])
        else:
            merged.append(current)
    
    return merged`,
    },
    {
      id: "20",
      title: "Word Search II",
      difficulty: "Hard",
      topic: "Backtracking",
      estimatedTime: 45,
      company: "Apple",
      completed: false,
      description:
        "Given an m x n board of characters and a list of strings words, return all words on the board.\n\nEach word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.",
      examples: [
        {
          input: 'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]',
          output: '["eat","oath"]',
        },
      ],
      constraints: [
        "m == board.length",
        "n == board[i].length",
        "1 ≤ m, n ≤ 12",
        "1 ≤ words.length ≤ 3 * 10⁴",
      ],
      hints: [
        "Build a Trie from the word list.",
        "Use DFS with backtracking on the board.",
        "Prune the Trie as you find words.",
      ],
      solution: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.word = None

def findWords(board, words):
    # Build Trie
    root = TrieNode()
    for word in words:
        node = root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.word = word
    
    result = []
    
    def dfs(i, j, node):
        char = board[i][j]
        if char not in node.children:
            return
        
        next_node = node.children[char]
        if next_node.word:
            result.append(next_node.word)
            next_node.word = None
        
        board[i][j] = '#'
        for di, dj in [(0,1), (1,0), (0,-1), (-1,0)]:
            ni, nj = i + di, j + dj
            if 0 <= ni < len(board) and 0 <= nj < len(board[0]):
                dfs(ni, nj, next_node)
        board[i][j] = char
    
    for i in range(len(board)):
        for j in range(len(board[0])):
            dfs(i, j, root)
    
    return result`,
    },
    // Netflix Questions
    {
      id: "21",
      title: "Find Peak Element",
      difficulty: "Medium",
      topic: "Binary Search",
      estimatedTime: 20,
      company: "Netflix",
      completed: false,
      description:
        "A peak element is an element that is strictly greater than its neighbors.\n\nGiven a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.\n\nYou may imagine that nums[-1] = nums[n] = -∞. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.",
      examples: [
        {
          input: "nums = [1,2,3,1]",
          output: "2",
          explanation: "3 is a peak element and your function should return the index number 2.",
        },
      ],
      constraints: [
        "1 ≤ nums.length ≤ 1000",
        "-2³¹ ≤ nums[i] ≤ 2³¹ - 1",
      ],
      hints: [
        "Use binary search for O(log n) solution.",
        "Check if middle element is greater than its neighbor.",
        "Move towards the side with larger neighbor.",
      ],
      solution: `def findPeakElement(nums):
    left, right = 0, len(nums) - 1
    
    while left < right:
        mid = (left + right) // 2
        
        if nums[mid] > nums[mid + 1]:
            right = mid
        else:
            left = mid + 1
    
    return left`,
    },
    {
      id: "22",
      title: "Group Anagrams",
      difficulty: "Medium",
      topic: "Hash Table",
      estimatedTime: 25,
      company: "Netflix",
      completed: false,
      description:
        "Given an array of strings strs, group the anagrams together. You can return the answer in any order.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
      examples: [
        {
          input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
          output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
        },
      ],
      constraints: [
        "1 ≤ strs.length ≤ 10⁴",
        "0 ≤ strs[i].length ≤ 100",
        "strs[i] consists of lowercase English letters.",
      ],
      hints: [
        "Use sorted string as key in hash map.",
        "Group strings with same sorted form.",
        "Alternatively, use character count as key.",
      ],
      solution: `from collections import defaultdict

def groupAnagrams(strs):
    anagram_map = defaultdict(list)
    
    for s in strs:
        sorted_s = ''.join(sorted(s))
        anagram_map[sorted_s].append(s)
    
    return list(anagram_map.values())`,
    },
    {
      id: "23",
      title: "Top K Frequent Elements",
      difficulty: "Medium",
      topic: "Heap",
      estimatedTime: 25,
      company: "Netflix",
      completed: false,
      description:
        "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",
      examples: [
        {
          input: "nums = [1,1,1,2,2,3], k = 2",
          output: "[1,2]",
        },
        {
          input: "nums = [1], k = 1",
          output: "[1]",
        },
      ],
      constraints: [
        "1 ≤ nums.length ≤ 10⁵",
        "-10⁴ ≤ nums[i] ≤ 10⁴",
        "k is in the range [1, the number of unique elements in the array].",
      ],
      hints: [
        "Use a hash map to count frequencies.",
        "Use a heap to find top k elements.",
        "Alternatively, use bucket sort for O(n) solution.",
      ],
      solution: `from collections import Counter
import heapq

def topKFrequent(nums, k):
    count = Counter(nums)
    return heapq.nlargest(k, count.keys(), key=count.get)`,
    },
    {
      id: "24",
      title: "Longest Consecutive Sequence",
      difficulty: "Medium",
      topic: "Hash Table",
      estimatedTime: 25,
      company: "Netflix",
      completed: false,
      description:
        "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.\n\nYou must write an algorithm that runs in O(n) time.",
      examples: [
        {
          input: "nums = [100,4,200,1,3,2]",
          output: "4",
          explanation: "The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.",
        },
      ],
      constraints: [
        "0 ≤ nums.length ≤ 10⁵",
        "-10⁹ ≤ nums[i] ≤ 10⁹",
      ],
      hints: [
        "Use a hash set for O(1) lookups.",
        "Only start counting from numbers that don't have a predecessor.",
        "For each start, count consecutive numbers.",
      ],
      solution: `def longestConsecutive(nums):
    num_set = set(nums)
    longest = 0
    
    for num in num_set:
        if num - 1 not in num_set:
            current_num = num
            current_length = 1
            
            while current_num + 1 in num_set:
                current_num += 1
                current_length += 1
            
            longest = max(longest, current_length)
    
    return longest`,
    },
    // Additional Mixed Questions
    {
      id: "25",
      title: "Implement Trie (Prefix Tree)",
      difficulty: "Medium",
      topic: "Trie",
      estimatedTime: 30,
      company: "Google",
      completed: false,
      description:
        "A trie (pronounced as 'try') or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.\n\nImplement the Trie class:\n- Trie() Initializes the trie object.\n- void insert(String word) Inserts the string word into the trie.\n- boolean search(String word) Returns true if the string word is in the trie.\n- boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix.",
      examples: [
        {
          input: '["Trie", "insert", "search", "search", "startsWith", "insert", "search"]\\n[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]',
          output: "[null, null, true, false, true, null, true]",
        },
      ],
      constraints: [
        "1 ≤ word.length, prefix.length ≤ 2000",
        "word and prefix consist only of lowercase English letters.",
      ],
      hints: [
        "Each node should have a children dictionary and isEnd flag.",
        "For insert, traverse/create nodes for each character.",
        "For search, check if path exists and ends at a word.",
      ],
      solution: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True
    
    def search(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end
    
    def startsWith(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True`,
    },
    {
      id: "26",
      title: "LRU Cache",
      difficulty: "Medium",
      topic: "Design",
      estimatedTime: 35,
      company: "Amazon",
      completed: false,
      description:
        "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.\n\nImplement the LRUCache class:\n- LRUCache(int capacity) Initialize the LRU cache with positive size capacity.\n- int get(int key) Return the value of the key if the key exists, otherwise return -1.\n- void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.",
      examples: [
        {
          input: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
          output: "[null, null, null, 1, null, -1, null, -1, 3, 4]",
        },
      ],
      constraints: [
        "1 ≤ capacity ≤ 3000",
        "0 ≤ key ≤ 10⁴",
        "0 ≤ value ≤ 10⁵",
      ],
      hints: [
        "Use a combination of hash map and doubly linked list.",
        "Hash map for O(1) access, doubly linked list for O(1) removal.",
        "Move accessed items to the front of the list.",
      ],
      solution: `class Node:
    def __init__(self, key=0, val=0):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head
    
    def _remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev
    
    def _add_to_head(self, node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node
    
    def get(self, key):
        if key not in self.cache:
            return -1
        node = self.cache[key]
        self._remove(node)
        self._add_to_head(node)
        return node.val
    
    def put(self, key, value):
        if key in self.cache:
            self._remove(self.cache[key])
        node = Node(key, value)
        self._add_to_head(node)
        self.cache[key] = node
        if len(self.cache) > self.capacity:
            lru = self.tail.prev
            self._remove(lru)
            del self.cache[lru.key]`,
    },
    {
      id: "27",
      title: "Course Schedule",
      difficulty: "Medium",
      topic: "Graphs",
      estimatedTime: 30,
      company: "Meta",
      completed: false,
      description:
        "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.\n\nReturn true if you can finish all courses. Otherwise, return false.",
      examples: [
        {
          input: "numCourses = 2, prerequisites = [[1,0]]",
          output: "true",
          explanation: "There are 2 courses. To take course 1 you should have finished course 0.",
        },
        {
          input: "numCourses = 2, prerequisites = [[1,0],[0,1]]",
          output: "false",
          explanation: "Impossible to finish both courses due to circular dependency.",
        },
      ],
      constraints: [
        "1 ≤ numCourses ≤ 2000",
        "0 ≤ prerequisites.length ≤ 5000",
      ],
      hints: [
        "This is a cycle detection problem in a directed graph.",
        "Use DFS with a visited set and recursion stack.",
        "Alternatively, use topological sort with Kahn's algorithm.",
      ],
      solution: `def canFinish(numCourses, prerequisites):
    graph = [[] for _ in range(numCourses)]
    for course, prereq in prerequisites:
        graph[course].append(prereq)
    
    visited = [0] * numCourses  # 0: unvisited, 1: visiting, 2: visited
    
    def has_cycle(course):
        if visited[course] == 1:
            return True
        if visited[course] == 2:
            return False
        
        visited[course] = 1
        for prereq in graph[course]:
            if has_cycle(prereq):
                return True
        visited[course] = 2
        return False
    
    for course in range(numCourses):
        if has_cycle(course):
            return False
    
    return True`,
    },
    {
      id: "28",
      title: "Number of Islands",
      difficulty: "Medium",
      topic: "DFS/BFS",
      estimatedTime: 25,
      company: "Amazon",
      completed: false,
      description:
        "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
      examples: [
        {
          input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
          output: "1",
        },
      ],
      constraints: [
        "m == grid.length",
        "n == grid[i].length",
        "1 ≤ m, n ≤ 300",
      ],
      hints: [
        "Use DFS or BFS to explore each island.",
        "Mark visited cells to avoid counting twice.",
        "Increment counter for each new island found.",
      ],
      solution: `def numIslands(grid):
    if not grid:
        return 0
    
    def dfs(i, j):
        if i < 0 or i >= len(grid) or j < 0 or j >= len(grid[0]) or grid[i][j] != '1':
            return
        grid[i][j] = '0'
        dfs(i+1, j)
        dfs(i-1, j)
        dfs(i, j+1)
        dfs(i, j-1)
    
    count = 0
    for i in range(len(grid)):
        for j in range(len(grid[0])):
            if grid[i][j] == '1':
                dfs(i, j)
                count += 1
    
    return count`,
    },
    {
      id: "29",
      title: "Coin Change",
      difficulty: "Medium",
      topic: "Dynamic Programming",
      estimatedTime: 25,
      company: "Apple",
      completed: false,
      description:
        "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.\n\nYou may assume that you have an infinite number of each kind of coin.",
      examples: [
        {
          input: "coins = [1,2,5], amount = 11",
          output: "3",
          explanation: "11 = 5 + 5 + 1",
        },
      ],
      constraints: [
        "1 ≤ coins.length ≤ 12",
        "1 ≤ coins[i] ≤ 2³¹ - 1",
        "0 ≤ amount ≤ 10⁴",
      ],
      hints: [
        "Use bottom-up dynamic programming.",
        "dp[i] represents minimum coins needed for amount i.",
        "For each amount, try all coins and take minimum.",
      ],
      solution: `def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1`,
    },
    {
      id: "30",
      title: "Design Twitter",
      difficulty: "Medium",
      topic: "Design",
      estimatedTime: 35,
      company: "Netflix",
      completed: false,
      description:
        "Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and see the 10 most recent tweets in the user's news feed.\n\nImplement the Twitter class:\n- Twitter() Initializes your twitter object.\n- void postTweet(int userId, int tweetId) Composes a new tweet with ID tweetId by the user userId.\n- List<Integer> getNewsFeed(int userId) Retrieves the 10 most recent tweet IDs in the user's news feed.\n- void follow(int followerId, int followeeId) The user with ID followerId follows the user with ID followeeId.\n- void unfollow(int followerId, int followeeId) The user with ID followerId unfollows the user with ID followeeId.",
      examples: [
        {
          input: '["Twitter", "postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"]\\n[[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]',
          output: "[null, null, [5], null, null, [6, 5], null, [5]]",
        },
      ],
      constraints: [
        "1 ≤ userId, followerId, followeeId ≤ 500",
        "0 ≤ tweetId ≤ 10⁴",
      ],
      hints: [
        "Use a hash map to store followees for each user.",
        "Store tweets with timestamp for ordering.",
        "Use a heap to merge tweets from multiple users.",
      ],
      solution: `from collections import defaultdict
import heapq

class Twitter:
    def __init__(self):
        self.timestamp = 0
        self.tweets = defaultdict(list)
        self.following = defaultdict(set)
    
    def postTweet(self, userId, tweetId):
        self.tweets[userId].append((self.timestamp, tweetId))
        self.timestamp += 1
    
    def getNewsFeed(self, userId):
        heap = []
        self.following[userId].add(userId)
        
        for followee in self.following[userId]:
            if followee in self.tweets:
                tweets = self.tweets[followee]
                index = len(tweets) - 1
                timestamp, tweetId = tweets[index]
                heap.append((-timestamp, tweetId, followee, index - 1))
        
        heapq.heapify(heap)
        result = []
        
        while heap and len(result) < 10:
            _, tweetId, followee, index = heapq.heappop(heap)
            result.append(tweetId)
            
            if index >= 0:
                timestamp, tweetId = self.tweets[followee][index]
                heapq.heappush(heap, (-timestamp, tweetId, followee, index - 1))
        
        return result
    
    def follow(self, followerId, followeeId):
        self.following[followerId].add(followeeId)
    
    def unfollow(self, followerId, followeeId):
        self.following[followerId].discard(followeeId)`,
    },
    // Additional Google Questions (31-55)
    {
      id: "31",
      title: "3Sum",
      difficulty: "Medium",
      topic: "Arrays",
      estimatedTime: 30,
      company: "Google",
      completed: false,
      description:
        "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.\n\nNotice that the solution set must not contain duplicate triplets.",
      examples: [
        {
          input: "nums = [-1,0,1,2,-1,-4]",
          output: "[[-1,-1,2],[-1,0,1]]",
        },
      ],
      constraints: [
        "3 ≤ nums.length ≤ 3000",
        "-10⁵ ≤ nums[i] ≤ 10⁵",
      ],
      hints: [
        "Sort the array first.",
        "Use two pointers for each fixed element.",
        "Skip duplicates to avoid repeated triplets.",
      ],
      solution: `def threeSum(nums):
    nums.sort()
    result = []
    
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i-1]:
            continue
        
        left, right = i + 1, len(nums) - 1
        
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            
            if total == 0:
                result.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left+1]:
                    left += 1
                while left < right and nums[right] == nums[right-1]:
                    right -= 1
                left += 1
                right -= 1
            elif total < 0:
                left += 1
            else:
                right -= 1
    
    return result`,
    },
    {
      id: "32",
      title: "Minimum Window Substring",
      difficulty: "Hard",
      topic: "Sliding Window",
      estimatedTime: 45,
      company: "Google",
      completed: false,
      description:
        "Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string \"\".",
      examples: [
        {
          input: 's = "ADOBECODEBANC", t = "ABC"',
          output: '"BANC"',
        },
      ],
      constraints: [
        "m == s.length",
        "n == t.length",
        "1 ≤ m, n ≤ 10⁵",
      ],
      hints: [
        "Use sliding window with two pointers.",
        "Keep track of character frequencies.",
        "Expand window until all characters are found, then contract.",
      ],
      solution: `from collections import Counter

def minWindow(s, t):
    if not t or not s:
        return ""
    
    dict_t = Counter(t)
    required = len(dict_t)
    l, r = 0, 0
    formed = 0
    window_counts = {}
    ans = float("inf"), None, None
    
    while r < len(s):
        char = s[r]
        window_counts[char] = window_counts.get(char, 0) + 1
        
        if char in dict_t and window_counts[char] == dict_t[char]:
            formed += 1
        
        while l <= r and formed == required:
            char = s[l]
            if r - l + 1 < ans[0]:
                ans = (r - l + 1, l, r)
            
            window_counts[char] -= 1
            if char in dict_t and window_counts[char] < dict_t[char]:
                formed -= 1
            l += 1
        
        r += 1
    
    return "" if ans[0] == float("inf") else s[ans[1]:ans[2] + 1]`,
    },
    {
      id: "33",
      title: "Trapping Rain Water",
      difficulty: "Hard",
      topic: "Arrays",
      estimatedTime: 35,
      company: "Google",
      completed: false,
      description:
        "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
      examples: [
        {
          input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
          output: "6",
        },
      ],
      constraints: [
        "n == height.length",
        "1 ≤ n ≤ 2 * 10⁴",
        "0 ≤ height[i] ≤ 10⁵",
      ],
      hints: [
        "Water level at each position is min(leftMax, rightMax) - height.",
        "Use two pointers from both ends.",
        "Track maximum heights seen so far.",
      ],
      solution: `def trap(height):
    if not height:
        return 0
    
    left, right = 0, len(height) - 1
    left_max, right_max = height[left], height[right]
    water = 0
    
    while left < right:
        if left_max < right_max:
            left += 1
            left_max = max(left_max, height[left])
            water += left_max - height[left]
        else:
            right -= 1
            right_max = max(right_max, height[right])
            water += right_max - height[right]
    
    return water`,
    },
    {
      id: "34",
      title: "First Missing Positive",
      difficulty: "Hard",
      topic: "Arrays",
      estimatedTime: 35,
      company: "Google",
      completed: false,
      description:
        "Given an unsorted integer array nums, return the smallest missing positive integer.\n\nYou must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.",
      examples: [
        {
          input: "nums = [1,2,0]",
          output: "3",
        },
        {
          input: "nums = [3,4,-1,1]",
          output: "2",
        },
      ],
      constraints: [
        "1 ≤ nums.length ≤ 10⁵",
        "-2³¹ ≤ nums[i] ≤ 2³¹ - 1",
      ],
      hints: [
        "Use the array itself as a hash table.",
        "Place each number at its correct index.",
        "Find the first missing positive.",
      ],
      solution: `def firstMissingPositive(nums):
    n = len(nums)
    
    # Place each number at its correct position
    for i in range(n):
        while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:
            nums[nums[i] - 1], nums[i] = nums[i], nums[nums[i] - 1]
    
    # Find first missing positive
    for i in range(n):
        if nums[i] != i + 1:
            return i + 1
    
    return n + 1`,
    },
    {
      id: "35",
      title: "Longest Valid Parentheses",
      difficulty: "Hard",
      topic: "Stack",
      estimatedTime: 40,
      company: "Google",
      completed: false,
      description:
        "Given a string containing just the characters '(' and ')', return the length of the longest valid (well-formed) parentheses substring.",
      examples: [
        {
          input: 's = "(()"',
          output: "2",
          explanation: 'The longest valid parentheses substring is "()".',
        },
      ],
      constraints: [
        "0 ≤ s.length ≤ 3 * 10⁴",
        "s[i] is '(' or ')'",
      ],
      hints: [
        "Use a stack to track indices.",
        "Push -1 initially as a base.",
        "Calculate length when popping matching pairs.",
      ],
      solution: `def longestValidParentheses(s):
    stack = [-1]
    max_len = 0
    
    for i, char in enumerate(s):
        if char == '(':
            stack.append(i)
        else:
            stack.pop()
            if not stack:
                stack.append(i)
            else:
                max_len = max(max_len, i - stack[-1])
    
    return max_len`,
    },
    {
      id: "36",
      title: "Edit Distance",
      difficulty: "Hard",
      topic: "Dynamic Programming",
      estimatedTime: 40,
      company: "Google",
      completed: false,
      description:
        "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.\n\nYou have the following three operations permitted on a word:\n- Insert a character\n- Delete a character\n- Replace a character",
      examples: [
        {
          input: 'word1 = "horse", word2 = "ros"',
          output: "3",
          explanation: "horse -> rorse -> rose -> ros",
        },
      ],
      constraints: [
        "0 ≤ word1.length, word2.length ≤ 500",
      ],
      hints: [
        "Use 2D DP table.",
        "dp[i][j] represents min operations for word1[0:i] to word2[0:j].",
        "Consider insert, delete, and replace operations.",
      ],
      solution: `def minDistance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
    
    return dp[m][n]`,
    },
    {
      id: "37",
      title: "Sliding Window Maximum",
      difficulty: "Hard",
      topic: "Queue",
      estimatedTime: 35,
      company: "Google",
      completed: false,
      description:
        "You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.\n\nReturn the max sliding window.",
      examples: [
        {
          input: "nums = [1,3,-1,-3,5,3,6,7], k = 3",
          output: "[3,3,5,5,6,7]",
        },
      ],
      constraints: [
        "1 ≤ nums.length ≤ 10⁵",
        "-10⁴ ≤ nums[i] ≤ 10⁴",
        "1 ≤ k ≤ nums.length",
      ],
      hints: [
        "Use a deque to store indices.",
        "Maintain deque in decreasing order.",
        "Remove indices outside window.",
      ],
      solution: `from collections import deque

def maxSlidingWindow(nums, k):
    dq = deque()
    result = []
    
    for i, num in enumerate(nums):
        while dq and nums[dq[-1]] < num:
            dq.pop()
        dq.append(i)
        
        if dq[0] <= i - k:
            dq.popleft()
        
        if i >= k - 1:
            result.append(nums[dq[0]])
    
    return result`,
    },
    {
      id: "38",
      title: "Jump Game II",
      difficulty: "Medium",
      topic: "Greedy",
      estimatedTime: 25,
      company: "Google",
      completed: false,
      description:
        "You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0].\n\nEach element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at nums[i], you can jump to any nums[i + j] where 0 <= j <= nums[i] and i + j < n.\n\nReturn the minimum number of jumps to reach nums[n - 1].",
      examples: [
        {
          input: "nums = [2,3,1,1,4]",
          output: "2",
          explanation: "Jump 1 step from index 0 to 1, then 3 steps to the last index.",
        },
      ],
      constraints: [
        "1 ≤ nums.length ≤ 10⁴",
        "0 ≤ nums[i] ≤ 1000",
      ],
      hints: [
        "Use greedy approach.",
        "Track current reach and next reach.",
        "Increment jumps when current reach is exceeded.",
      ],
      solution: `def jump(nums):
    jumps = 0
    current_end = 0
    farthest = 0
    
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        
        if i == current_end:
            jumps += 1
            current_end = farthest
    
    return jumps`,
    },
    {
      id: "39",
      title: "Letter Combinations of a Phone Number",
      difficulty: "Medium",
      topic: "Backtracking",
      estimatedTime: 25,
      company: "Google",
      completed: false,
      description:
        "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.\n\nA mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.",
      examples: [
        {
          input: 'digits = "23"',
          output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]',
        },
      ],
      constraints: [
        "0 ≤ digits.length ≤ 4",
        "digits[i] is a digit in the range ['2', '9']",
      ],
      hints: [
        "Use backtracking to generate combinations.",
        "Map each digit to its corresponding letters.",
        "Build combinations character by character.",
      ],
      solution: `def letterCombinations(digits):
    if not digits:
        return []
    
    phone = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    }
    
    result = []
    
    def backtrack(index, path):
        if index == len(digits):
            result.append(''.join(path))
            return
        
        for letter in phone[digits[index]]:
            path.append(letter)
            backtrack(index + 1, path)
            path.pop()
    
    backtrack(0, [])
    return result`,
    },
    {
      id: "40",
      title: "Decode Ways",
      difficulty: "Medium",
      topic: "Dynamic Programming",
      estimatedTime: 30,
      company: "Google",
      completed: false,
      description:
        "A message containing letters from A-Z can be encoded into numbers using the following mapping:\n\n'A' -> \"1\"\n'B' -> \"2\"\n...\n'Z' -> \"26\"\n\nTo decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, \"11106\" can be mapped into \"AAJF\" or \"KJF\".\n\nGiven a string s containing only digits, return the number of ways to decode it.",
      examples: [
        {
          input: 's = "12"',
          output: "2",
          explanation: '"12" could be decoded as "AB" (1 2) or "L" (12).',
        },
      ],
      constraints: [
        "1 ≤ s.length ≤ 100",
        "s contains only digits and may contain leading zero(s).",
      ],
      hints: [
        "Use dynamic programming.",
        "Consider single digit and two digit decodings.",
        "Handle leading zeros carefully.",
      ],
      solution: `def numDecodings(s):
    if not s or s[0] == '0':
        return 0
    
    n = len(s)
    dp = [0] * (n + 1)
    dp[0] = 1
    dp[1] = 1
    
    for i in range(2, n + 1):
        one_digit = int(s[i-1:i])
        two_digits = int(s[i-2:i])
        
        if 1 <= one_digit <= 9:
            dp[i] += dp[i-1]
        if 10 <= two_digits <= 26:
            dp[i] += dp[i-2]
    
    return dp[n]`,
    },
    {
      id: "41",
      title: "Permutations",
      difficulty: "Medium",
      topic: "Backtracking",
      estimatedTime: 25,
      company: "Google",
      completed: false,
      description:
        "Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.",
      examples: [
        {
          input: "nums = [1,2,3]",
          output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
        },
      ],
      constraints: [
        "1 ≤ nums.length ≤ 6",
        "-10 ≤ nums[i] ≤ 10",
        "All the integers of nums are unique.",
      ],
      hints: [
        "Use backtracking with recursion.",
        "Swap elements to generate permutations.",
        "Track which elements are used.",
      ],
      solution: `def permute(nums):
    result = []
    
    def backtrack(start):
        if start == len(nums):
            result.append(nums[:])
            return
        
        for i in range(start, len(nums)):
            nums[start], nums[i] = nums[i], nums[start]
            backtrack(start + 1)
            nums[start], nums[i] = nums[i], nums[start]
    
    backtrack(0)
    return result`,
    },
    {
      id: "42",
      title: "Spiral Matrix",
      difficulty: "Medium",
      topic: "Matrix",
      estimatedTime: 30,
      company: "Google",
      completed: false,
      description:
        "Given an m x n matrix, return all elements of the matrix in spiral order.",
      examples: [
        {
          input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
          output: "[1,2,3,6,9,8,7,4,5]",
        },
      ],
      constraints: [
        "m == matrix.length",
        "n == matrix[i].length",
        "1 ≤ m, n ≤ 10",
      ],
      hints: [
        "Track boundaries: top, bottom, left, right.",
        "Move in spiral direction.",
        "Update boundaries after each complete side.",
      ],
      solution: `def spiralOrder(matrix):
    if not matrix:
        return []
    
    result = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    
    while top <= bottom and left <= right:
        for col in range(left, right + 1):
            result.append(matrix[top][col])
        top += 1
        
        for row in range(top, bottom + 1):
            result.append(matrix[row][right])
        right -= 1
        
        if top <= bottom:
            for col in range(right, left - 1, -1):
                result.append(matrix[bottom][col])
            bottom -= 1
        
        if left <= right:
            for row in range(bottom, top - 1, -1):
                result.append(matrix[row][left])
            left += 1
    
    return result`,
    },
    {
      id: "43",
      title: "Search in Rotated Sorted Array II",
      difficulty: "Medium",
      topic: "Binary Search",
      estimatedTime: 30,
      company: "Google",
      completed: false,
      description:
        "There is an integer array nums sorted in non-decreasing order (not necessarily with distinct values).\n\nBefore being passed to your function, nums is rotated at an unknown pivot index k. Given the array nums after the rotation and an integer target, return true if target is in nums, or false if it is not.",
      examples: [
        {
          input: "nums = [2,5,6,0,0,1,2], target = 0",
          output: "true",
        },
      ],
      constraints: [
        "1 ≤ nums.length ≤ 5000",
        "-10⁴ ≤ nums[i] ≤ 10⁴",
      ],
      hints: [
        "Use modified binary search.",
        "Handle duplicates by moving pointers.",
        "Check which half is sorted.",
      ],
      solution: `def search(nums, target):
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if nums[mid] == target:
            return True
        
        if nums[left] == nums[mid] == nums[right]:
            left += 1
            right -= 1
        elif nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    
    return False`,
    },
    {
      id: "44",
      title: "Unique Paths",
      difficulty: "Medium",
      topic: "Dynamic Programming",
      estimatedTime: 20,
      company: "Google",
      completed: false,
      description:
        "There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.\n\nGiven the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.",
      examples: [
        {
          input: "m = 3, n = 7",
          output: "28",
        },
      ],
      constraints: [
        "1 ≤ m, n ≤ 100",
      ],
      hints: [
        "Use 2D DP array.",
        "Base case: first row and column are all 1.",
        "dp[i][j] = dp[i-1][j] + dp[i][j-1]",
      ],
      solution: `def uniquePaths(m, n):
    dp = [[1] * n for _ in range(m)]
    
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
    
    return dp[m-1][n-1]`,
    },
    {
      id: "45",
      title: "Combination Sum",
      difficulty: "Medium",
      topic: "Backtracking",
      estimatedTime: 30,
      company: "Google",
      completed: false,
      description:
        "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.\n\nThe same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.",
      examples: [
        {
          input: "candidates = [2,3,6,7], target = 7",
          output: "[[2,2,3],[7]]",
        },
      ],
      constraints: [
        "1 ≤ candidates.length ≤ 30",
        "2 ≤ candidates[i] ≤ 40",
        "1 ≤ target ≤ 40",
      ],
      hints: [
        "Use backtracking with recursion.",
        "Allow reusing same element.",
        "Sort candidates to optimize.",
      ],
      solution: `def combinationSum(candidates, target):
    result = []
    
    def backtrack(start, target, path):
        if target == 0:
            result.append(path[:])
            return
        if target < 0:
            return
        
        for i in range(start, len(candidates)):
            path.append(candidates[i])
            backtrack(i, target - candidates[i], path)
            path.pop()
    
    backtrack(0, target, [])
    return result`,
    },
    {
      id: "46",
      title: "Subsets",
      difficulty: "Medium",
      topic: "Backtracking",
      estimatedTime: 25,
      company: "Google",
      completed: false,
      description:
        "Given an integer array nums of unique elements, return all possible subsets (the power set).\n\nThe solution set must not contain duplicate subsets. Return the solution in any order.",
      examples: [
        {
          input: "nums = [1,2,3]",
          output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
        },
      ],
      constraints: [
        "1 ≤ nums.length ≤ 10",
        "-10 ≤ nums[i] ≤ 10",
        "All the numbers of nums are unique.",
      ],
      hints: [
        "Use backtracking to generate all subsets.",
        "For each element, decide to include or exclude.",
        "Build subsets incrementally.",
      ],
      solution: `def subsets(nums):
    result = []
    
    def backtrack(start, path):
        result.append(path[:])
        
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()
    
    backtrack(0, [])
    return result`,
    },
    {
      id: "47",
      title: "Word Break",
      difficulty: "Medium",
      topic: "Dynamic Programming",
      estimatedTime: 30,
      company: "Google",
      completed: false,
      description:
        "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.\n\nNote that the same word in the dictionary may be reused multiple times in the segmentation.",
      examples: [
        {
          input: 's = "leetcode", wordDict = ["leet","code"]',
          output: "true",
          explanation: '"leetcode" can be segmented as "leet code".',
        },
      ],
      constraints: [
        "1 ≤ s.length ≤ 300",
        "1 ≤ wordDict.length ≤ 1000",
        "1 ≤ wordDict[i].length ≤ 20",
      ],
      hints: [
        "Use DP array where dp[i] means s[0:i] can be segmented.",
        "Check all possible word endings at each position.",
        "Use set for faster word lookup.",
      ],
      solution: `def wordBreak(s, wordDict):
    word_set = set(wordDict)
    dp = [False] * (len(s) + 1)
    dp[0] = True
    
    for i in range(1, len(s) + 1):
        for j in range(i):
            if dp[j] and s[j:i] in word_set:
                dp[i] = True
                break
    
    return dp[len(s)]`,
    },
    {
      id: "48",
      title: "Generate Parentheses",
      difficulty: "Medium",
      topic: "Backtracking",
      estimatedTime: 25,
      company: "Google",
      completed: false,
      description:
        "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
      examples: [
        {
          input: "n = 3",
          output: '["((()))","(()())","(())()","()(())","()()()"]',
        },
      ],
      constraints: [
        "1 ≤ n ≤ 8",
      ],
      hints: [
        "Use backtracking with open and close counts.",
        "Add '(' if open < n.",
        "Add ')' if close < open.",
      ],
      solution: `def generateParenthesis(n):
    result = []
    
    def backtrack(path, open_count, close_count):
        if len(path) == 2 * n:
            result.append(''.join(path))
            return
        
        if open_count < n:
            path.append('(')
            backtrack(path, open_count + 1, close_count)
            path.pop()
        
        if close_count < open_count:
            path.append(')')
            backtrack(path, open_count, close_count + 1)
            path.pop()
    
    backtrack([], 0, 0)
    return result`,
    },
    {
      id: "49",
      title: "N-Queens",
      difficulty: "Hard",
      topic: "Backtracking",
      estimatedTime: 45,
      company: "Google",
      completed: false,
      description:
        "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.\n\nGiven an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.",
      examples: [
        {
          input: "n = 4",
          output: '[[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]]',
        },
      ],
      constraints: [
        "1 ≤ n ≤ 9",
      ],
      hints: [
        "Use backtracking with column, diagonal tracking.",
        "Place queens row by row.",
        "Check if placement is safe.",
      ],
      solution: `def solveNQueens(n):
    result = []
    board = [['.'] * n for _ in range(n)]
    cols = set()
    diag1 = set()
    diag2 = set()
    
    def backtrack(row):
        if row == n:
            result.append([''.join(r) for r in board])
            return
        
        for col in range(n):
            if col in cols or (row - col) in diag1 or (row + col) in diag2:
                continue
            
            board[row][col] = 'Q'
            cols.add(col)
            diag1.add(row - col)
            diag2.add(row + col)
            
            backtrack(row + 1)
            
            board[row][col] = '.'
            cols.remove(col)
            diag1.remove(row - col)
            diag2.remove(row + col)
    
    backtrack(0)
    return result`,
    },
    {
      id: "50",
      title: "Wildcard Matching",
      difficulty: "Hard",
      topic: "Dynamic Programming",
      estimatedTime: 45,
      company: "Google",
      completed: false,
      description:
        "Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for '?' and '*' where:\n- '?' Matches any single character.\n- '*' Matches any sequence of characters (including the empty sequence).",
      examples: [
        {
          input: 's = "aa", p = "*"',
          output: "true",
        },
      ],
      constraints: [
        "0 ≤ s.length, p.length ≤ 2000",
      ],
      hints: [
        "Use 2D DP or two pointers.",
        "Handle '*' by considering zero or more characters.",
        "Track match position for backtracking.",
      ],
      solution: `def isMatch(s, p):
    m, n = len(s), len(p)
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = True
    
    for j in range(1, n + 1):
        if p[j-1] == '*':
            dp[0][j] = dp[0][j-1]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if p[j-1] == '*':
                dp[i][j] = dp[i-1][j] or dp[i][j-1]
            elif p[j-1] == '?' or s[i-1] == p[j-1]:
                dp[i][j] = dp[i-1][j-1]
    
    return dp[m][n]`,
    },
    {
      id: "51",
      title: "Alien Dictionary",
      difficulty: "Hard",
      topic: "Graphs",
      estimatedTime: 45,
      company: "Google",
      completed: false,
      description:
        "There is a new alien language that uses the English alphabet. However, the order among the letters is unknown to you.\n\nYou are given a list of strings words from the alien language's dictionary, where the strings in words are sorted lexicographically by the rules of this new language.\n\nReturn a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules. If there is no solution, return \"\". If there are multiple solutions, return any of them.",
      examples: [
        {
          input: 'words = ["wrt","wrf","er","ett","rftt"]',
          output: '"wertf"',
        },
      ],
      constraints: [
        "1 ≤ words.length ≤ 100",
        "1 ≤ words[i].length ≤ 100",
      ],
      hints: [
        "Build a graph of character dependencies.",
        "Use topological sort.",
        "Detect cycles for invalid input.",
      ],
      solution: `from collections import defaultdict, deque

def alienOrder(words):
    graph = defaultdict(set)
    in_degree = {c: 0 for word in words for c in word}
    
    for i in range(len(words) - 1):
        w1, w2 = words[i], words[i + 1]
        min_len = min(len(w1), len(w2))
        
        if w1[:min_len] == w2[:min_len] and len(w1) > len(w2):
            return ""
        
        for j in range(min_len):
            if w1[j] != w2[j]:
                if w2[j] not in graph[w1[j]]:
                    graph[w1[j]].add(w2[j])
                    in_degree[w2[j]] += 1
                break
    
    queue = deque([c for c in in_degree if in_degree[c] == 0])
    result = []
    
    while queue:
        c = queue.popleft()
        result.append(c)
        
        for neighbor in graph[c]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    return ''.join(result) if len(result) == len(in_degree) else ""`,
    },
    {
      id: "52",
      title: "Meeting Rooms II",
      difficulty: "Medium",
      topic: "Heap",
      estimatedTime: 30,
      company: "Google",
      completed: false,
      description:
        "Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.",
      examples: [
        {
          input: "intervals = [[0,30],[5,10],[15,20]]",
          output: "2",
        },
      ],
      constraints: [
        "1 ≤ intervals.length ≤ 10⁴",
        "0 ≤ starti < endi ≤ 10⁶",
      ],
      hints: [
        "Sort meetings by start time.",
        "Use min heap to track end times.",
        "Remove rooms that are free.",
      ],
      solution: `import heapq

def minMeetingRooms(intervals):
    if not intervals:
        return 0
    
    intervals.sort(key=lambda x: x[0])
    heap = []
    heapq.heappush(heap, intervals[0][1])
    
    for i in range(1, len(intervals)):
        if intervals[i][0] >= heap[0]:
            heapq.heappop(heap)
        heapq.heappush(heap, intervals[i][1])
    
    return len(heap)`,
    },
    {
      id: "53",
      title: "Longest Increasing Path in a Matrix",
      difficulty: "Hard",
      topic: "DFS",
      estimatedTime: 40,
      company: "Google",
      completed: false,
      description:
        "Given an m x n integers matrix, return the length of the longest increasing path in matrix.\n\nFrom each cell, you can either move in four directions: left, right, up, or down. You may not move diagonally or move outside the boundary.",
      examples: [
        {
          input: "matrix = [[9,9,4],[6,6,8],[2,1,1]]",
          output: "4",
          explanation: "The longest increasing path is [1, 2, 6, 9].",
        },
      ],
      constraints: [
        "m == matrix.length",
        "n == matrix[i].length",
        "1 ≤ m, n ≤ 200",
      ],
      hints: [
        "Use DFS with memoization.",
        "Cache results for each cell.",
        "Explore all four directions.",
      ],
      solution: `def longestIncreasingPath(matrix):
    if not matrix:
        return 0
    
    m, n = len(matrix), len(matrix[0])
    memo = {}
    
    def dfs(i, j):
        if (i, j) in memo:
            return memo[(i, j)]
        
        max_length = 1
        for di, dj in [(0,1), (1,0), (0,-1), (-1,0)]:
            ni, nj = i + di, j + dj
            if 0 <= ni < m and 0 <= nj < n and matrix[ni][nj] > matrix[i][j]:
                max_length = max(max_length, 1 + dfs(ni, nj))
        
        memo[(i, j)] = max_length
        return max_length
    
    return max(dfs(i, j) for i in range(m) for j in range(n))`,
    },
    {
      id: "54",
      title: "Largest Rectangle in Histogram",
      difficulty: "Hard",
      topic: "Stack",
      estimatedTime: 40,
      company: "Google",
      completed: false,
      description:
        "Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.",
      examples: [
        {
          input: "heights = [2,1,5,6,2,3]",
          output: "10",
        },
      ],
      constraints: [
        "1 ≤ heights.length ≤ 10⁵",
        "0 ≤ heights[i] ≤ 10⁴",
      ],
      hints: [
        "Use stack to track indices.",
        "Calculate area when popping from stack.",
        "Maintain increasing order in stack.",
      ],
      solution: `def largestRectangleArea(heights):
    stack = []
    max_area = 0
    heights.append(0)
    
    for i, h in enumerate(heights):
        while stack and heights[stack[-1]] > h:
            height = heights[stack.pop()]
            width = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, height * width)
        stack.append(i)
    
    return max_area`,
    },
    {
      id: "55",
      title: "Text Justification",
      difficulty: "Hard",
      topic: "Strings",
      estimatedTime: 45,
      company: "Google",
      completed: false,
      description:
        "Given an array of strings words and a width maxWidth, format the text such that each line has exactly maxWidth characters and is fully (left and right) justified.\n\nYou should pack your words in a greedy approach; that is, pack as many words as you can in each line.",
      examples: [
        {
          input: 'words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16',
          output: '["This    is    an","example  of text","justification.  "]',
        },
      ],
      constraints: [
        "1 ≤ words.length ≤ 300",
        "1 ≤ words[i].length ≤ 20",
        "1 ≤ maxWidth ≤ 100",
      ],
      hints: [
        "Process line by line greedily.",
        "Distribute spaces evenly.",
        "Handle last line specially (left-justified).",
      ],
      solution: `def fullJustify(words, maxWidth):
    result = []
    current_line = []
    current_length = 0
    
    for word in words:
        if current_length + len(word) + len(current_line) > maxWidth:
            for i in range(maxWidth - current_length):
                current_line[i % (len(current_line) - 1 or 1)] += ' '
            result.append(''.join(current_line))
            current_line = []
            current_length = 0
        
        current_line.append(word)
        current_length += len(word)
    
    result.append(' '.join(current_line).ljust(maxWidth))
    return result`,
    },
  ];

  const interviewTipsData = [
    {
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png",
      tips: {
        technical: [
          "Focus on algorithm optimization and Big O complexity analysis",
          "Practice system design for senior roles (L4+)",
          "Be prepared to code in your preferred language without IDE assistance",
          "Explain your thought process clearly as you solve problems",
          "Practice with Google-specific questions on arrays, trees, and graphs",
        ],
        behavioral: [
          'Demonstrate "Googleyness" - being comfortable with ambiguity and taking initiative',
          "Use the STAR method for behavioral questions",
          "Show examples of leadership and collaboration",
          "Discuss times you've gone above and beyond your role",
          "Be prepared to discuss your motivation for joining Google",
        ],
        process: [
          "Phone/video screening with a recruiter (30 minutes)",
          "Technical phone interview (45 minutes)",
          "Onsite interviews: 4-5 rounds including coding, system design, and behavioral",
          "Committee review process can take 1-2 weeks",
          "Be prepared for follow-up questions or additional interviews",
        ],
        culture: [
          "Emphasizes innovation, collaboration, and user focus",
          "Values diverse perspectives and inclusive thinking",
          'Encourages "20% time" for personal projects',
          "Data-driven decision making is highly valued",
          "Strong emphasis on technical excellence and continuous learning",
        ],
      },
    },
    {
      name: "Meta",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Meta_Platforms_Inc._logo_%28cropped%29.svg/2560px-Meta_Platforms_Inc._logo_%28cropped%29.svg.png",
      tips: {
        technical: [
          "Strong focus on coding and problem-solving skills",
          "Practice with graphs, trees, and dynamic programming",
          "System design rounds for E4+ levels",
          "Be ready to optimize solutions and discuss trade-offs",
          "Mobile development questions for relevant roles",
        ],
        behavioral: [
          "Focus on Meta's core values: Move Fast, Be Bold, Focus on Impact",
          "Prepare examples showing bias for action and quick decision-making",
          "Discuss times you've worked in ambiguous situations",
          "Show examples of building and maintaining relationships",
          "Be ready to discuss challenges you've overcome",
        ],
        process: [
          "Recruiter phone screen (30 minutes)",
          "Technical phone interview (45 minutes)",
          "Onsite: 4-5 interviews including coding, system design, and behavioral",
          'Emphasis on "performance calibration" discussions',
          "Process typically takes 4-6 weeks total",
        ],
        culture: [
          "Fast-paced environment with emphasis on shipping quickly",
          "Values transparency and open communication",
          "Strong focus on global impact and connecting people",
          "Encourages taking risks and learning from failures",
          "Emphasis on building for the next billion users",
        ],
      },
    },
    {
      name: "Amazon",
      logo: "https://st3.depositphotos.com/1001860/16375/i/450/depositphotos_163757632-stock-photo-amazon-logo-on-a-white.jpg",
      tips: {
        technical: [
          "Practice coding questions focusing on arrays, strings, and trees",
          "System design questions emphasize scalability and reliability",
          "Be familiar with AWS services for relevant roles",
          "Focus on writing clean, maintainable code",
          "Practice explaining complex technical concepts simply",
        ],
        behavioral: [
          "Master Amazon's 16 Leadership Principles",
          "Prepare multiple STAR examples for each principle",
          "Focus on customer obsession and ownership",
          "Show examples of diving deep and delivering results",
          "Demonstrate bias for action and frugality",
        ],
        process: [
          "Online assessment (OA) with coding and behavioral questions",
          "Technical phone interview focusing on coding",
          'Onsite "Loop": 4-5 interviews covering coding, system design, and behavioral',
          "Heavy emphasis on Leadership Principles in all rounds",
          "Bar raiser interview to maintain hiring standards",
        ],
        culture: [
          "Customer obsession is the top priority",
          "High ownership and accountability culture",
          "Emphasis on long-term thinking and innovation",
          "Values disagreement and commitment",
          "Strong focus on operational excellence",
        ],
      },
    },
  ];

  const progressData = {
    totalQuestions: mockQuestions.length,
    completedQuestions: userProgress.completedQuestions.length,
    averageTime: 25,
    streakDays: userProgress.streakDays,
    companiesProgress: companies
      .map((company) => ({
        company: company.name,
        logo: company.logo,
        completed: mockQuestions.filter(
          (q) =>
            q.company === company.name &&
            userProgress.completedQuestions.includes(q.id),
        ).length,
        total: mockQuestions.filter(
          (q) => q.company === company.name,
        ).length,
      }))
      .filter((c) => c.total > 0),
    topicProgress: [
      { topic: "Arrays", completed: 2, total: 3 },
      { topic: "Linked Lists", completed: 1, total: 2 },
      { topic: "Trees", completed: 0, total: 4 },
      { topic: "Graphs", completed: 1, total: 3 },
      { topic: "Dynamic Programming", completed: 0, total: 5 },
    ],
    recentActivity: userProgress.completedQuestions
      .slice(-3)
      .map((id: string) => {
        const question = mockQuestions.find((q) => q.id === id);
        if (!question) return null;
        return {
          questionTitle: question.title,
          company: question.company,
          difficulty: question.difficulty as
            | "Easy"
            | "Medium"
            | "Hard",
          timeTaken: userProgress.timeSpent[id] || 25,
          completedAt: "2 hours ago",
        };
      })
      .filter(
        (item): item is NonNullable<typeof item> =>
          item !== null,
      ),
  };

  const handleAuthSuccess = (userData: any) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('faang-user-auth');
    localStorage.removeItem('faang-interview-progress');
    setUserProgress({
      completedQuestions: [],
      timeSpent: {},
      streakDays: 0,
      lastActivityDate: null,
    });
    setCurrentView('dashboard');
  };

  const saveProgress = (newProgress: any) => {
    setUserProgress(newProgress);
    localStorage.setItem(
      "faang-interview-progress",
      JSON.stringify(newProgress),
    );
  };

  const handleQuestionComplete = (
    questionId: string,
    code: string,
    timeTaken: number,
  ) => {
    const newProgress = {
      ...userProgress,
      completedQuestions:
        userProgress.completedQuestions.includes(questionId)
          ? userProgress.completedQuestions
          : [...userProgress.completedQuestions, questionId],
      timeSpent: {
        ...userProgress.timeSpent,
        [questionId]: timeTaken,
      },
    };
    saveProgress(newProgress);
    setCurrentView("questions");
  };

  // New comprehensive feature handlers
  const handleResumeAnalysisComplete = (analysis: any) => {
    setResumeAnalysis(analysis);
    
    // Create user profile from analysis
    const profile = {
      experienceLevel: analysis.experienceLevel,
      targetRole: 'Software Engineer', // This would come from the resume intake form
      targetCompany: 'Google', // This would come from the resume intake form
      currentSkills: analysis.skillsExtracted,
      missingSkills: analysis.missingSkills,
      timeCommitment: 10 // Default 10 hours per week
    };
    setUserProfile(profile);
    
    setCurrentView("resume-analysis");
  };

  const handleGenerateRoadmap = () => {
    if (userProfile) {
      setCurrentView("roadmap");
    }
  };

  const handleGenerateCompanyRoadmap = (company: any) => {
    if (userProfile) {
      // Update user profile with the selected company
      const updatedProfile = {
        ...userProfile,
        targetCompany: company.name,
        companySpecific: {
          companyMatch: company,
          focusAreas: company.gaps,
          interviewFocus: company.interviewFocus,
          requirements: company.requirements
        }
      };
      setUserProfile(updatedProfile);
      setCurrentView("roadmap");
    }
  };

  const handleStartPracticeSession = (session: any) => {
    // This would start a specific practice session
    console.log("Starting practice session:", session);
  };

  // Update questions with completion status
  const questionsWithStatus = mockQuestions.map((q) => ({
    ...q,
    completed: userProgress.completedQuestions.includes(q.id),
  }));

  const filteredQuestions = questionsWithStatus.filter(
    (question) => {
      const matchesSearch =
        question.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        question.topic
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesDifficulty =
        difficultyFilter === "all" ||
        question.difficulty === difficultyFilter;
      const matchesTopic =
        topicFilter === "all" || question.topic === topicFilter;
      const matchesCompany =
        !selectedCompany ||
        question.company === selectedCompany;

      return (
        matchesSearch &&
        matchesDifficulty &&
        matchesTopic &&
        matchesCompany
      );
    },
  );

  const allTopics = [
    ...new Set(mockQuestions.map((q) => q.topic)),
  ];

  // Show auth page if not authenticated
  if (!isAuthenticated) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  if (currentView === "challenge" && selectedQuestion) {
    return (
      <CodingChallenge
        question={selectedQuestion}
        onBack={() => setCurrentView("questions")}
        onComplete={handleQuestionComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Enhanced Navigation for Full Screen */}
      <nav className="border-b border-border bg-card/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="w-full px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl flex items-center justify-center font-bold text-lg">
                F
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  FAANGify
                </h1>
                <p className="text-xs text-muted-foreground">AI-Powered Interview Prep</p>
              </div>
            </div>

            {/* Main Navigation */}
            <div className="flex items-center gap-1">
              <Button
                variant={currentView === "dashboard" ? "default" : "ghost"}
                onClick={() => setCurrentView("dashboard")}
                className="h-10 px-4"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant={currentView === "resume-intake" ? "default" : "ghost"}
                onClick={() => setCurrentView("resume-intake")}
                className="h-10 px-4"
              >
                <FileText className="w-4 h-4 mr-2" />
                Resume Analysis
              </Button>
              <Button
                variant={currentView === "enhanced-practice" ? "default" : "ghost"}
                onClick={() => setCurrentView("enhanced-practice")}
                className="h-10 px-4"
              >
                <Zap className="w-4 h-4 mr-2" />
                Practice Hub
              </Button>
              <Button
                variant={currentView === "roadmap" ? "default" : "ghost"}
                onClick={() => setCurrentView("roadmap")}
                className="h-10 px-4"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Roadmap
              </Button>
              <Button
                variant={currentView === "gamified-progress" ? "default" : "ghost"}
                onClick={() => setCurrentView("gamified-progress")}
                className="h-10 px-4"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Progress
              </Button>
              <Button
                variant={currentView === "tips" ? "default" : "ghost"}
                onClick={() => setCurrentView("tips")}
                className="h-10 px-4"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Interview Tips
              </Button>
              <Button
                variant={currentView === "mock-interview" ? "default" : "ghost"}
                onClick={() => setCurrentView("mock-interview")}
                className="h-10 px-4"
              >
                <Mic className="w-4 h-4 mr-2" />
                Mock Interview
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={["bookmarks", "study-notes", "flashcards", "study-planner", "resources"].includes(currentView) ? "default" : "ghost"}
                    className="h-10 px-4"
                  >
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Study Tools
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => setCurrentView("bookmarks")}>
                    <Bookmark className="w-4 h-4 mr-2" />
                    Bookmarks
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCurrentView("study-notes")}>
                    <StickyNote className="w-4 h-4 mr-2" />
                    Study Notes
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCurrentView("flashcards")}>
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Flashcards
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCurrentView("study-planner")}>
                    <CalendarDays className="w-4 h-4 mr-2" />
                    Study Planner
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCurrentView("resources")}>
                    <Library className="w-4 h-4 mr-2" />
                    Resources Library
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* User Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="text-muted-foreground hover:text-foreground h-10 px-3"
                title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 mr-2" />
                ) : (
                  <Moon className="w-4 h-4 mr-2" />
                )}
                {isDarkMode ? "Light" : "Dark"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView("user-profile")}
                className="text-muted-foreground hover:text-foreground h-10 px-3"
              >
                <User className="w-4 h-4 mr-2" />
                {user?.name}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="h-10 px-3"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - Full Screen Optimized */}
      <main className="flex-1 w-full px-8 py-6 overflow-auto">
        {currentView === "dashboard" && (
          <div className="space-y-10 max-w-none">
            {/* Hero Section - Full Screen Optimized */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 dark:from-blue-950/50 dark:via-purple-950/50 dark:to-cyan-950/50 border border-blue-200/50 dark:border-blue-800/50">
              <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
              <div className="relative p-12 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
                  <Brain className="w-4 h-4" />
                  AI-Powered Interview Platform
                </div>
                <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                  Welcome back, {user?.name?.split(' ')[0]}! 👋
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Your comprehensive AI-powered interview preparation platform designed to help you land your dream job at top tech companies
                </p>
                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>{userProgress.completedQuestions.length} Problems Solved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span>{userProgress.streakDays} Day Streak</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span>5 Companies Available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Cards - Optimized Grid for Laptop */}
            <div className="grid grid-cols-6 gap-6">
              <div 
                className="group p-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200/50 dark:border-blue-800/30 rounded-2xl cursor-pointer hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                onClick={() => setCurrentView("resume-intake")}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Resume Analysis</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Get AI-powered insights and optimization suggestions for your resume
                    </p>
                  </div>
                  <Badge className="bg-blue-500 text-white px-4 py-1 group-hover:bg-blue-600 transition-colors">
                    Start Here
                  </Badge>
                </div>
              </div>

              <div 
                className="group p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200/50 dark:border-purple-800/30 rounded-2xl cursor-pointer hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                onClick={() => setCurrentView("enhanced-practice")}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Enhanced Practice</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      DSA, System Design, Behavioral, and Mock Interview practice
                    </p>
                  </div>
                  <Badge className="bg-purple-500 text-white px-4 py-1 group-hover:bg-purple-600 transition-colors">
                    Practice Now
                  </Badge>
                </div>
              </div>

              <div 
                className="group p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200/50 dark:border-green-800/30 rounded-2xl cursor-pointer hover:shadow-xl hover:shadow-green-500/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                onClick={() => userProfile ? setCurrentView("roadmap") : setCurrentView("resume-intake")}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Custom Roadmap</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Personalized learning path based on your profile and goals
                    </p>
                  </div>
                  <Badge className="bg-green-500 text-white px-4 py-1 group-hover:bg-green-600 transition-colors">
                    {userProfile ? "View Roadmap" : "Setup First"}
                  </Badge>
                </div>
              </div>

              <div 
                className="group p-8 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 border border-yellow-200/50 dark:border-yellow-800/30 rounded-2xl cursor-pointer hover:shadow-xl hover:shadow-yellow-500/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                onClick={() => setCurrentView("gamified-progress")}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Progress & XP</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Track achievements, earn XP, and compete on leaderboards
                    </p>
                  </div>
                  <Badge className="bg-yellow-500 text-white px-4 py-1 group-hover:bg-orange-500 transition-colors">
                    View Progress
                  </Badge>
                </div>
              </div>

              <div 
                className="group p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200/50 dark:border-purple-800/30 rounded-2xl cursor-pointer hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                onClick={() => setCurrentView("mock-interview")}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Mic className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Mock Interview</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      AI-powered interview practice with voice and behavioral analysis
                    </p>
                  </div>
                  <Badge className="bg-purple-500 text-white px-4 py-1 group-hover:bg-pink-500 transition-colors">
                    Start Practice
                  </Badge>
                </div>
              </div>

              <div 
                className="group p-8 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border border-indigo-200/50 dark:border-indigo-800/30 rounded-2xl cursor-pointer hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                onClick={() => setCurrentView("user-profile")}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">My Profile</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      View detailed stats, achievements, and personalized insights
                    </p>
                  </div>
                  <Badge className="bg-indigo-500 text-white px-4 py-1 group-hover:bg-blue-500 transition-colors">
                    View Profile
                  </Badge>
                </div>
              </div>
            </div>

            {/* Study Tools Section */}
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Study Tools & Resources
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Enhance your learning with our comprehensive study tools
                </p>
              </div>
              
              <div className="grid grid-cols-5 gap-6">
                <div 
                  className="group p-6 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border border-purple-200/50 dark:border-purple-800/30 rounded-2xl cursor-pointer hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                  onClick={() => setCurrentView("bookmarks")}
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Bookmark className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-lg">Bookmarks</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Save and organize important questions and resources
                    </p>
                  </div>
                </div>

                <div 
                  className="group p-6 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30 border border-green-200/50 dark:border-green-800/30 rounded-2xl cursor-pointer hover:shadow-xl hover:shadow-green-500/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                  onClick={() => setCurrentView("study-notes")}
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <StickyNote className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-lg">Study Notes</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Create and organize notes for better retention
                    </p>
                  </div>
                </div>

                <div 
                  className="group p-6 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 border border-yellow-200/50 dark:border-yellow-800/30 rounded-2xl cursor-pointer hover:shadow-xl hover:shadow-yellow-500/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                  onClick={() => setCurrentView("flashcards")}
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-lg">Flashcards</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Quick revision with spaced repetition learning
                    </p>
                  </div>
                </div>

                <div 
                  className="group p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 border border-orange-200/50 dark:border-orange-800/30 rounded-2xl cursor-pointer hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                  onClick={() => setCurrentView("study-planner")}
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <CalendarDays className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-lg">Study Planner</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Schedule and track your study sessions
                    </p>
                  </div>
                </div>

                <div 
                  className="group p-6 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 border border-cyan-200/50 dark:border-cyan-800/30 rounded-2xl cursor-pointer hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                  onClick={() => setCurrentView("resources")}
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Library className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-lg">Resources</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Curated learning materials and references
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Selection - FAANG Rectangular Layout */}
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Company-Specific Preparation
                </h2>
                <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
                  Master interview preparation for the world's most prestigious tech companies. Each company has unique interview patterns, cultural expectations, and technical focus areas.
                </p>
                <div className="flex items-center justify-center gap-8 mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    <span className="text-sm font-medium text-muted-foreground">185+ Total Questions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                    <span className="text-sm font-medium text-muted-foreground">Company-Specific Tips</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-muted-foreground">Real Interview Patterns</span>
                  </div>
                </div>
              </div>
              
              {/* FAANG Companies - Vertical Stack */}
              <div className="space-y-6 max-w-7xl mx-auto">
                {companies.map((company, index) => (
                  <div 
                    key={company.name}
                    className="animate-slide-in-bottom"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <FaangCompanyRect
                      company={company}
                      onClick={() => {
                        setSelectedCompany(company.name);
                        setCurrentView("questions");
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Additional Info Section */}
              <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-cyan-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-cyan-950/20 rounded-3xl p-8 border border-blue-200/50 dark:border-blue-800/30 mt-12">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Why Company-Specific Preparation Matters
                  </h3>
                  <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                    Each FAANG company has distinct interview processes, technical focuses, and cultural values. Our platform provides targeted preparation materials based on real interview experiences and insider knowledge from current employees.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-2xl">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h4 className="font-semibold text-lg mb-2">Targeted Questions</h4>
                      <p className="text-sm text-muted-foreground">Questions actually asked in recent interviews at each company</p>
                    </div>
                    <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-2xl">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <h4 className="font-semibold text-lg mb-2">Success Patterns</h4>
                      <p className="text-sm text-muted-foreground">Learn what successful candidates did to ace their interviews</p>
                    </div>
                    <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-2xl">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h4 className="font-semibold text-lg mb-2">Cultural Fit</h4>
                      <p className="text-sm text-muted-foreground">Understand company values and behavioral expectations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Overview for Full Screen */}
            <div className="grid grid-cols-4 gap-6 mt-12">
              <div className="p-6 bg-card rounded-2xl border shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold">Total Questions</h3>
                </div>
                <p className="text-3xl font-bold">{mockQuestions.length}</p>
                <p className="text-sm text-muted-foreground">Available across all companies</p>
              </div>
              
              <div className="p-6 bg-card rounded-2xl border shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold">Completed</h3>
                </div>
                <p className="text-3xl font-bold">{userProgress.completedQuestions.length}</p>
                <p className="text-sm text-muted-foreground">Problems solved successfully</p>
              </div>
              
              <div className="p-6 bg-card rounded-2xl border shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Zap className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="font-semibold">Current Streak</h3>
                </div>
                <p className="text-3xl font-bold">{userProgress.streakDays}</p>
                <p className="text-sm text-muted-foreground">Days of consistent practice</p>
              </div>
              
              <div className="p-6 bg-card rounded-2xl border shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <Trophy className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="font-semibold">Success Rate</h3>
                </div>
                <p className="text-3xl font-bold">
                  {mockQuestions.length > 0 ? Math.round((userProgress.completedQuestions.length / mockQuestions.length) * 100) : 0}%
                </p>
                <p className="text-sm text-muted-foreground">Overall completion rate</p>
              </div>
            </div>
          </div>
        )}

        {currentView === "questions" && (
          <div className="space-y-8 max-w-none">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl p-8 border border-blue-200/50 dark:border-blue-800/30">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Practice Questions
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    {selectedCompany
                      ? `${selectedCompany} specific questions and interview preparation`
                      : "Comprehensive collection from all top tech companies"}
                  </p>
                  <div className="flex items-center gap-4 mt-4">
                    <Badge variant="outline" className="px-3 py-1">
                      {filteredQuestions.length} Questions Available
                    </Badge>
                    <Badge variant="outline" className="px-3 py-1">
                      {userProgress.completedQuestions.filter(id => filteredQuestions.some(q => q.id === id)).length} Completed
                    </Badge>
                  </div>
                </div>
                {selectedCompany && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCompany(null);
                      setCurrentView("dashboard");
                    }}
                    className="px-6 py-3"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </Button>
                )}
              </div>
            </div>

            {/* Enhanced Filters */}
            <div className="bg-card rounded-2xl p-6 border shadow-sm">
              <div className="flex flex-wrap gap-6 items-center">
                <div className="relative flex-1 min-w-[300px]">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search questions by title, topic, or keyword..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 text-base"
                  />
                </div>
                <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                  <SelectTrigger className="w-[160px] h-12">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={topicFilter} onValueChange={setTopicFilter}>
                  <SelectTrigger className="w-[180px] h-12">
                    <SelectValue placeholder="Topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Topics</SelectItem>
                    {allTopics.map((topic) => (
                      <SelectItem key={topic} value={topic}>
                        {topic}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {(searchTerm || difficultyFilter !== "all" || topicFilter !== "all") && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSearchTerm("");
                      setDifficultyFilter("all");
                      setTopicFilter("all");
                    }}
                    className="h-12"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>

            {/* Questions Grid - Optimized for Laptop */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {filteredQuestions.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  onStart={(q) => {
                    setSelectedQuestion(q);
                    setCurrentView("challenge");
                  }}
                />
              ))}
            </div>

            {filteredQuestions.length === 0 && (
              <div className="text-center py-16 bg-card rounded-2xl border">
                <div className="max-w-md mx-auto space-y-4">
                  <Search className="w-16 h-16 text-muted-foreground mx-auto opacity-50" />
                  <h3 className="text-xl font-semibold">No Questions Found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria or filters to find more questions.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setDifficultyFilter("all");
                      setTopicFilter("all");
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {currentView === "tips" && (
          <InterviewTips companies={interviewTipsData} />
        )}

        {currentView === "progress" && (
          <ProgressTracker progress={progressData} />
        )}

        {/* New Comprehensive Features */}
        {currentView === "resume-intake" && (
          <ResumeIntake 
            onBack={() => setCurrentView("dashboard")}
            onAnalysisComplete={handleResumeAnalysisComplete}
          />
        )}

        {currentView === "resume-analysis" && resumeAnalysis && (
          <ResumeAnalysisResults 
            analysis={resumeAnalysis}
            onBack={() => setCurrentView("resume-intake")}
            onReanalyze={() => setCurrentView("resume-intake")}
            onGenerateRoadmap={handleGenerateRoadmap}
            onGenerateCompanyRoadmap={handleGenerateCompanyRoadmap}
          />
        )}

        {currentView === "roadmap" && userProfile && (
          <CustomRoadmap 
            userProfile={userProfile}
            onBack={() => setCurrentView("resume-analysis")}
            onStartItem={(item) => {
              console.log("Starting roadmap item:", item);
              // Could redirect to specific practice modes
            }}
          />
        )}

        {currentView === "enhanced-practice" && (
          <EnhancedPractice 
            onBack={() => setCurrentView("dashboard")}
            onStartSession={handleStartPracticeSession}
          />
        )}

        {currentView === "gamified-progress" && (
          <GamifiedProgress 
            onBack={() => setCurrentView("dashboard")}
          />
        )}

        {currentView === "user-profile" && (
          <UserDetailPage 
            user={user}
            userProgress={userProgress}
            userProfile={userProfile}
            onEditProfile={() => setCurrentView("resume-intake")}
            onStartPractice={() => setCurrentView("enhanced-practice")}
            onViewRoadmap={() => setCurrentView("roadmap")}
            onBack={() => setCurrentView("dashboard")}
          />
        )}

        {currentView === "mock-interview" && (
          <MockInterviewBot 
            selectedCompany={selectedCompany || "Google"}
            onBack={() => setCurrentView("dashboard")}
          />
        )}

        {currentView === "bookmarks" && (
          <BookmarksPage 
            onBack={() => setCurrentView("dashboard")}
            onOpenQuestion={(questionId) => {
              const question = mockQuestions.find(q => q.id === questionId);
              if (question) {
                setSelectedQuestion(question);
                setCurrentView("challenge");
              }
            }}
          />
        )}

        {currentView === "study-notes" && (
          <StudyNotes 
            onBack={() => setCurrentView("dashboard")}
          />
        )}

        {currentView === "flashcards" && (
          <FlashcardsPage 
            onBack={() => setCurrentView("dashboard")}
          />
        )}

        {currentView === "study-planner" && (
          <StudyPlanner 
            onBack={() => setCurrentView("dashboard")}
          />
        )}

        {currentView === "resources" && (
          <ResourcesLibrary 
            onBack={() => setCurrentView("dashboard")}
          />
        )}
      </main>

      {/* Help Bot - Always visible */}
      <HelpBot onNavigate={(view) => setCurrentView(view as View)} />
    </div>
  );
}