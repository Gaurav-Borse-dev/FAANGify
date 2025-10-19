import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Alert, AlertDescription } from "./ui/alert";
import { Progress } from "./ui/progress";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Code,
  Play,
  RotateCcw,
  Copy,
  Check,
  Lightbulb,
  Clock,
  Eye,
  EyeOff,
  Zap,
  Terminal,
  Settings,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Loader2,
  BookOpen,
  ArrowLeft,
} from "lucide-react";

interface Question {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
  company: string;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  hints: string[];
  solution: string;
  testCases?: Array<{
    input: string;
    expectedOutput: string;
    hidden?: boolean;
  }>;
}

interface CodeCompilerBotProps {
  question: Question;
  onBack: () => void;
  onComplete?: (code: string, timeTaken: number) => void;
}

interface LanguageTemplate {
  name: string;
  value: string;
  boilerplate: string;
  commentSyntax: string;
}

const LANGUAGES: LanguageTemplate[] = [
  {
    name: "Python",
    value: "python",
    boilerplate: `def solution():
    # Write your code here
    pass

# Test your solution
result = solution()
print(result)`,
    commentSyntax: "#",
  },
  {
    name: "JavaScript",
    value: "javascript",
    boilerplate: `function solution() {
    // Write your code here
    
}

// Test your solution
const result = solution();
console.log(result);`,
    commentSyntax: "//",
  },
  {
    name: "TypeScript",
    value: "typescript",
    boilerplate: `function solution(): any {
    // Write your code here
    
}

// Test your solution
const result = solution();
console.log(result);`,
    commentSyntax: "//",
  },
  {
    name: "Java",
    value: "java",
    boilerplate: `public class Solution {
    public static void main(String[] args) {
        Solution sol = new Solution();
        // Test your solution
        System.out.println(sol.solution());
    }
    
    public Object solution() {
        // Write your code here
        return null;
    }
}`,
    commentSyntax: "//",
  },
  {
    name: "C++",
    value: "cpp",
    boilerplate: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    void solution() {
        // Write your code here
        
    }
};

int main() {
    Solution sol;
    sol.solution();
    return 0;
}`,
    commentSyntax: "//",
  },
  {
    name: "C",
    value: "c",
    boilerplate: `#include <stdio.h>
#include <stdlib.h>

void solution() {
    // Write your code here
    
}

int main() {
    solution();
    return 0;
}`,
    commentSyntax: "//",
  },
  {
    name: "Go",
    value: "go",
    boilerplate: `package main

import "fmt"

func solution() {
    // Write your code here
    
}

func main() {
    solution()
}`,
    commentSyntax: "//",
  },
  {
    name: "Rust",
    value: "rust",
    boilerplate: `fn solution() {
    // Write your code here
    
}

fn main() {
    solution();
}`,
    commentSyntax: "//",
  },
  {
    name: "Swift",
    value: "swift",
    boilerplate: `func solution() {
    // Write your code here
    
}

// Test your solution
solution()`,
    commentSyntax: "//",
  },
  {
    name: "Kotlin",
    value: "kotlin",
    boilerplate: `fun solution() {
    // Write your code here
    
}

fun main() {
    solution()
}`,
    commentSyntax: "//",
  },
];

export function CodeCompilerBot({ question, onBack, onComplete }: CodeCompilerBotProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("python");
  const [code, setCode] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [showHints, setShowHints] = useState(false);
  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [showSolution, setShowSolution] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Initialize code with boilerplate
  useEffect(() => {
    const lang = LANGUAGES.find((l) => l.value === selectedLanguage);
    if (lang && !code) {
      setCode(lang.boilerplate);
    }
  }, [selectedLanguage]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleLanguageChange = (value: string) => {
    const lang = LANGUAGES.find((l) => l.value === value);
    if (lang) {
      if (confirm("Changing language will reset your code. Continue?")) {
        setSelectedLanguage(value);
        setCode(lang.boilerplate);
        setOutput("");
        setTestResults([]);
      }
    }
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput("");
    
    // Simulate code execution
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Mock output
    const mockOutput = `Executing ${selectedLanguage} code...

Code compiled successfully! ✓

Sample test case:
Input: ${question.examples[0]?.input || "N/A"}
Output: ${question.examples[0]?.output || "N/A"}

Note: This is a frontend simulation. In production, code would be executed on a secure backend server.`;
    
    setOutput(mockOutput);
    setIsRunning(false);
  };

  const handleRunTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    
    // Simulate running test cases
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const testCases = question.testCases || question.examples.map((ex, idx) => ({
      input: ex.input,
      expectedOutput: ex.output,
      hidden: false,
    }));

    // Mock test results
    const results = testCases.map((tc, idx) => ({
      id: idx + 1,
      passed: Math.random() > 0.3, // 70% pass rate for demo
      input: tc.input,
      expectedOutput: tc.expectedOutput,
      actualOutput: tc.expectedOutput, // In real scenario, this would be from execution
      hidden: tc.hidden || false,
      runtime: `${Math.floor(Math.random() * 100)}ms`,
    }));
    
    setTestResults(results);
    setIsRunning(false);
  };

  const handleSubmit = async () => {
    setIsRunning(true);
    
    // Run all tests
    await handleRunTests();
    
    // Check if all tests passed
    const allPassed = testResults.every((r) => r.passed);
    
    if (allPassed && onComplete) {
      onComplete(code, timer);
    }
    
    setIsRunning(false);
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset your code?")) {
      const lang = LANGUAGES.find((l) => l.value === selectedLanguage);
      if (lang) {
        setCode(lang.boilerplate);
        setOutput("");
        setTestResults([]);
      }
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRevealHint = () => {
    if (revealedHints < question.hints.length) {
      setRevealedHints(revealedHints + 1);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const passedTests = testResults.filter((r) => r.passed).length;
  const totalTests = testResults.length;
  const passPercentage = totalTests > 0 ? (passedTests / totalTests) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-[1800px] mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onBack}
                  className="bg-white/20 hover:bg-white/30 text-white border-0"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <div>
                  <h1 className="text-2xl font-bold mb-2">{question.title}</h1>
                  <div className="flex items-center gap-3">
                    <Badge className={getDifficultyColor(question.difficulty)}>
                      {question.difficulty}
                    </Badge>
                    <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                      {question.topic}
                    </Badge>
                    <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                      {question.company}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center bg-white/20 rounded-lg px-6 py-3">
                  <Clock className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-2xl font-bold font-mono">{formatTime(timer)}</div>
                  <div className="text-xs opacity-80">Time Elapsed</div>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowSettings(!showSettings)}
                  className="bg-white/20 hover:bg-white/30 text-white border-0"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Layout - Split View */}
        <div className="grid grid-cols-2 gap-6 h-[calc(100vh-250px)]">
          {/* Left Panel - Problem Description */}
          <Card className="flex flex-col overflow-hidden">
            <CardHeader className="border-b">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="description">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Description
                  </TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                  <TabsTrigger value="hints">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Hints ({revealedHints}/{question.hints.length})
                  </TabsTrigger>
                  <TabsTrigger value="solution" disabled={!showSolution}>
                    <Eye className="w-4 h-4 mr-2" />
                    Solution
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto p-6">
              <Tabs value={activeTab} className="h-full">
                <TabsContent value="description" className="space-y-4 mt-0">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Problem Statement</h3>
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {question.description}
                    </p>
                  </div>
                  
                  {question.constraints.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Constraints</h3>
                      <ul className="space-y-2">
                        {question.constraints.map((constraint, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>{constraint}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="examples" className="space-y-4 mt-0">
                  {question.examples.map((example, idx) => (
                    <Card key={idx} className="bg-muted/50">
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm font-medium text-muted-foreground mb-1">
                              Input:
                            </div>
                            <code className="block bg-background p-3 rounded-lg font-mono text-sm">
                              {example.input}
                            </code>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-muted-foreground mb-1">
                              Output:
                            </div>
                            <code className="block bg-background p-3 rounded-lg font-mono text-sm">
                              {example.output}
                            </code>
                          </div>
                          {example.explanation && (
                            <div>
                              <div className="text-sm font-medium text-muted-foreground mb-1">
                                Explanation:
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {example.explanation}
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="hints" className="space-y-4 mt-0">
                  <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertDescription>
                      Hints are revealed one at a time. Try to solve the problem before revealing all hints!
                    </AlertDescription>
                  </Alert>
                  
                  <div className="space-y-3">
                    {question.hints.slice(0, revealedHints).map((hint, idx) => (
                      <Card key={idx} className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                              {idx + 1}
                            </div>
                            <p className="text-sm leading-relaxed">{hint}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {revealedHints < question.hints.length && (
                    <Button
                      variant="outline"
                      onClick={handleRevealHint}
                      className="w-full gap-2"
                    >
                      <Lightbulb className="w-4 h-4" />
                      Reveal Next Hint ({revealedHints + 1}/{question.hints.length})
                    </Button>
                  )}
                  
                  {revealedHints === question.hints.length && (
                    <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-700 dark:text-green-300">
                        All hints revealed! Ready to view the solution?
                      </AlertDescription>
                    </Alert>
                  )}
                </TabsContent>

                <TabsContent value="solution" className="space-y-4 mt-0">
                  <Alert className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                    <Eye className="h-4 w-4 text-purple-600" />
                    <AlertDescription className="text-purple-700 dark:text-purple-300">
                      This is the optimal solution. Make sure you've tried solving it yourself first!
                    </AlertDescription>
                  </Alert>
                  
                  <Card className="bg-muted/50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Solution Code</CardTitle>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(question.solution);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          }}
                        >
                          {copied ? (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 mr-2" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <pre className="bg-background p-4 rounded-lg overflow-auto font-mono text-sm">
                        <code>{question.solution}</code>
                      </pre>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Right Panel - Code Editor */}
          <div className="flex flex-col gap-4">
            {/* Editor Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Code className="w-5 h-5 text-blue-500" />
                    <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {LANGUAGES.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyCode}
                    >
                      {copied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReset}
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowSolution(!showSolution)}
                    >
                      {showSolution ? (
                        <>
                          <EyeOff className="w-4 h-4 mr-2" />
                          Hide Solution
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-2" />
                          View Solution
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Code Editor */}
            <Card className="flex-1 flex flex-col overflow-hidden">
              <CardContent className="flex-1 p-0 overflow-hidden">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full font-mono resize-none border-0 focus-visible:ring-0 rounded-none"
                  style={{ fontSize: `${fontSize}px` }}
                  placeholder="Write your code here..."
                  spellCheck={false}
                />
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    variant="outline"
                    className="gap-2"
                  >
                    {isRunning ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    Run Code
                  </Button>
                  <Button
                    onClick={handleRunTests}
                    disabled={isRunning}
                    variant="outline"
                    className="gap-2"
                  >
                    {isRunning ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Terminal className="w-4 h-4" />
                    )}
                    Run Tests
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isRunning}
                    className="gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  >
                    {isRunning ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Zap className="w-4 h-4" />
                    )}
                    Submit
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Output/Results Panel */}
            {(output || testResults.length > 0) && (
              <Card className="max-h-[300px] overflow-auto">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Terminal className="w-5 h-5" />
                    {testResults.length > 0 ? "Test Results" : "Output"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {testResults.length > 0 ? (
                    <div className="space-y-4">
                      {/* Test Summary */}
                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                          <div className="text-sm text-muted-foreground">Test Cases</div>
                          <div className="text-2xl font-bold">
                            {passedTests} / {totalTests} Passed
                          </div>
                        </div>
                        <div className="text-right">
                          <Progress value={passPercentage} className="w-32 mb-2" />
                          <div className="text-sm font-medium">
                            {Math.round(passPercentage)}% Success Rate
                          </div>
                        </div>
                      </div>

                      {/* Individual Test Results */}
                      <div className="space-y-2">
                        {testResults.map((result) => (
                          <Card
                            key={result.id}
                            className={`${
                              result.passed
                                ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                                : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                            }`}
                          >
                            <CardContent className="pt-4">
                              <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3 flex-1">
                                  {result.passed ? (
                                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                                  ) : (
                                    <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                                  )}
                                  <div className="flex-1 space-y-2">
                                    <div className="font-medium">
                                      Test Case {result.id}
                                      {result.hidden && (
                                        <Badge variant="outline" className="ml-2 text-xs">
                                          Hidden
                                        </Badge>
                                      )}
                                    </div>
                                    {!result.hidden && (
                                      <>
                                        <div className="text-sm">
                                          <span className="text-muted-foreground">Input:</span>{" "}
                                          <code className="bg-background px-2 py-1 rounded text-xs">
                                            {result.input}
                                          </code>
                                        </div>
                                        <div className="text-sm">
                                          <span className="text-muted-foreground">Expected:</span>{" "}
                                          <code className="bg-background px-2 py-1 rounded text-xs">
                                            {result.expectedOutput}
                                          </code>
                                        </div>
                                        {!result.passed && (
                                          <div className="text-sm">
                                            <span className="text-muted-foreground">Got:</span>{" "}
                                            <code className="bg-background px-2 py-1 rounded text-xs text-red-600">
                                              {result.actualOutput}
                                            </code>
                                          </div>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {result.runtime}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <pre className="bg-muted p-4 rounded-lg overflow-auto font-mono text-sm whitespace-pre-wrap">
                      {output}
                    </pre>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editor Settings</DialogTitle>
            <DialogDescription>
              Customize your coding environment
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Font Size</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="10"
                  max="24"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm font-mono w-12">{fontSize}px</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Editor Theme</label>
              <Select value={theme} onValueChange={(v: any) => setTheme(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}