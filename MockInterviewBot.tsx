import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Brain,
  Clock,
  Volume2,
  Target,
  ArrowRight,
  BookOpen,
  Lightbulb,
  Award,
  BarChart3,
  MessageCircle,
  Eye,
  Smile,
  Zap,
  Video,
  VideoOff,
  Camera,
  User,
  AlertTriangle
} from "lucide-react";

interface MockInterviewBotProps {
  selectedCompany?: string;
  onBack: () => void;
}

interface InterviewQuestion {
  id: string;
  category: 'behavioral' | 'technical' | 'leadership' | 'cultural';
  question: string;
  company: string;
  followUp?: string[];
  idealPoints: string[];
  timeLimit: number;
}

interface VoiceAnalysis {
  pace: number; // words per minute
  clarity: number; // 0-100
  confidence: number; // 0-100
  filler_words: number;
  pauses: number;
  volume: number; // 0-100
}

interface BehavioralAnalysis {
  structure: number; // STAR method usage
  specificity: number; // concrete examples
  leadership: number; // leadership qualities shown
  collaboration: number; // teamwork emphasis
  problem_solving: number; // analytical thinking
  cultural_fit: number; // company values alignment
}

interface FacialAnalysis {
  eye_contact: number; // 0-100
  smile_frequency: number; // 0-100
  confidence_score: number; // 0-100
  posture_score: number; // 0-100
  engagement_level: number; // 0-100
  nervousness_indicators: number; // 0-100 (lower is better)
}

interface InterviewFeedback {
  overall_score: number;
  voice_analysis: VoiceAnalysis;
  behavioral_analysis: BehavioralAnalysis;
  facial_analysis: FacialAnalysis;
  strengths: string[];
  areas_for_improvement: string[];
  specific_suggestions: string[];
  next_practice_focus: string[];
}

const companyQuestions: Record<string, InterviewQuestion[]> = {
  Google: [
    {
      id: "g1",
      category: "behavioral",
      question: "Tell me about a time you had to work with ambiguous requirements. How did you handle it?",
      company: "Google",
      followUp: ["What was the outcome?", "How did you communicate with stakeholders?"],
      idealPoints: ["Broke down ambiguity", "Asked clarifying questions", "Created structure", "Communicated progress"],
      timeLimit: 180
    },
    {
      id: "g2", 
      category: "leadership",
      question: "Describe a situation where you had to influence others without formal authority.",
      company: "Google",
      followUp: ["What strategies did you use?", "How did you measure success?"],
      idealPoints: ["Built relationships", "Used data/logic", "Found common ground", "Achieved results"],
      timeLimit: 180
    },
    {
      id: "g3",
      category: "cultural",
      question: "Tell me about a time you took initiative on a project outside your core responsibilities.",
      company: "Google",
      idealPoints: ["Identified opportunity", "Took ownership", "Delivered impact", "Learned new skills"],
      timeLimit: 180
    }
  ],
  Meta: [
    {
      id: "m1",
      category: "behavioral",
      question: "Tell me about a time you had to make a decision with incomplete information.",
      company: "Meta",
      followUp: ["How did you gather more information?", "What was the impact?"],
      idealPoints: ["Analyzed available data", "Made reasonable assumptions", "Moved quickly", "Adjusted based on feedback"],
      timeLimit: 180
    },
    {
      id: "m2",
      category: "leadership",
      question: "Describe a situation where you had to give difficult feedback to a peer or team member.",
      company: "Meta",
      idealPoints: ["Prepared thoughtfully", "Was direct but kind", "Focused on behavior", "Followed up"],
      timeLimit: 180
    }
  ],
  Amazon: [
    {
      id: "a1",
      category: "leadership",
      question: "Tell me about a time you had to make a trade-off between short-term and long-term goals.",
      company: "Amazon",
      followUp: ["How did you evaluate the options?", "What was the customer impact?"],
      idealPoints: ["Considered customer impact", "Analyzed trade-offs", "Made data-driven decision", "Owned the outcome"],
      timeLimit: 180
    },
    {
      id: "a2",
      category: "behavioral",
      question: "Describe a time when you had to dive deep into a problem to find the root cause.",
      company: "Amazon",
      idealPoints: ["Asked probing questions", "Used data analysis", "Persisted through complexity", "Found actionable solution"],
      timeLimit: 180
    }
  ]
};

export function MockInterviewBot({ selectedCompany = "Google", onBack }: MockInterviewBotProps) {
  const [currentPhase, setCurrentPhase] = useState<'setup' | 'recording' | 'feedback'>('setup');
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<InterviewQuestion | null>(null);
  const [interviewFeedback, setInterviewFeedback] = useState<InterviewFeedback | null>(null);
  const [selectedQuestions, setSelectedQuestions] = useState<InterviewQuestion[]>([]);
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
  const [facialMetrics, setFacialMetrics] = useState({
    eyeContact: 0,
    smileDetected: false,
    headPosition: 'center' as 'center' | 'left' | 'right' | 'down',
    engagement: 0
  });
  
  const recordingInterval = useRef<NodeJS.Timeout>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const facialAnalysisInterval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Initialize with company-specific questions
    const questions = companyQuestions[selectedCompany] || companyQuestions.Google;
    setSelectedQuestions(questions.slice(0, 3)); // Start with 3 questions
  }, [selectedCompany]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      stopCamera();
      if (recordingInterval.current) {
        clearInterval(recordingInterval.current);
      }
      if (facialAnalysisInterval.current) {
        clearInterval(facialAnalysisInterval.current);
      }
    };
  }, []);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        }, 
        audio: true 
      });
      
      mediaStreamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setCameraPermissionGranted(true);
      setIsCameraActive(true);
      
      return true;
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Camera access is required for facial analysis during mock interviews. Please allow camera permissions.');
      return false;
    }
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsCameraActive(false);
  };

  const startFacialAnalysis = () => {
    // Simulate facial analysis every 2 seconds
    facialAnalysisInterval.current = setInterval(() => {
      analyzeFacialFeatures();
    }, 2000);
  };

  const stopFacialAnalysis = () => {
    if (facialAnalysisInterval.current) {
      clearInterval(facialAnalysisInterval.current);
    }
  };

  const analyzeFacialFeatures = () => {
    // Simulate facial analysis (in production, use face-api.js or MediaPipe)
    const metrics = {
      eyeContact: Math.random() * 100,
      smileDetected: Math.random() > 0.7,
      headPosition: (['center', 'left', 'right', 'down'] as const)[Math.floor(Math.random() * 4)],
      engagement: Math.random() * 100
    };
    
    setFacialMetrics(metrics);
    
    // Capture frame for analysis
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      }
    }
  };

  const startRecording = async () => {
    if (!mediaStreamRef.current) {
      alert('Please enable camera first');
      return;
    }

    // Start media recorder for video
    try {
      const mediaRecorder = new MediaRecorder(mediaStreamRef.current, {
        mimeType: 'video/webm;codecs=vp9'
      });
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.start(1000); // Capture in 1-second chunks
      mediaRecorderRef.current = mediaRecorder;
    } catch (error) {
      console.error('Error starting media recorder:', error);
    }

    setIsRecording(true);
    setRecordingTime(0);
    
    recordingInterval.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);

    startFacialAnalysis();
  };

  const stopRecording = () => {
    setIsRecording(false);
    
    if (recordingInterval.current) {
      clearInterval(recordingInterval.current);
    }
    
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    
    stopFacialAnalysis();
    
    // Process the recording and generate feedback
    setTimeout(() => {
      generateMockFeedback();
    }, 1000);
  };

  const generateMockFeedback = () => {
    // Simulate AI analysis with realistic feedback including facial analysis
    const mockFeedback: InterviewFeedback = {
      overall_score: Math.floor(Math.random() * 20) + 70, // 70-90 range
      voice_analysis: {
        pace: Math.floor(Math.random() * 40) + 130, // 130-170 WPM
        clarity: Math.floor(Math.random() * 20) + 75,
        confidence: Math.floor(Math.random() * 25) + 70,
        filler_words: Math.floor(Math.random() * 8) + 2,
        pauses: Math.floor(Math.random() * 5) + 3,
        volume: Math.floor(Math.random() * 20) + 70
      },
      behavioral_analysis: {
        structure: Math.floor(Math.random() * 30) + 65,
        specificity: Math.floor(Math.random() * 25) + 70,
        leadership: Math.floor(Math.random() * 20) + 75,
        collaboration: Math.floor(Math.random() * 25) + 70,
        problem_solving: Math.floor(Math.random() * 20) + 75,
        cultural_fit: Math.floor(Math.random() * 25) + 70
      },
      facial_analysis: {
        eye_contact: Math.floor(Math.random() * 25) + 70,
        smile_frequency: Math.floor(Math.random() * 30) + 60,
        confidence_score: Math.floor(Math.random() * 20) + 75,
        posture_score: Math.floor(Math.random() * 25) + 70,
        engagement_level: Math.floor(Math.random() * 20) + 75,
        nervousness_indicators: Math.floor(Math.random() * 30) + 10 // Lower is better
      },
      strengths: [
        "Strong eye contact maintained throughout",
        "Clear communication style",
        "Good use of specific examples",
        "Demonstrated leadership qualities",
        "Positive and engaging demeanor"
      ],
      areas_for_improvement: [
        "Could improve STAR method structure",
        "Reduce use of filler words",
        "Maintain more consistent posture",
        "Provide more quantifiable results",
        "Better alignment with company values"
      ],
      specific_suggestions: [
        "Practice the STAR method: Situation, Task, Action, Result",
        "Prepare 3-4 detailed stories that showcase different skills",
        "Record yourself practicing to reduce filler words and improve body language",
        "Research company values and weave them into your responses",
        "Practice maintaining eye contact with the camera lens",
        "Work on reducing nervous gestures and maintaining upright posture"
      ],
      next_practice_focus: [
        "Leadership and influence stories",
        "Customer obsession examples",
        "Technical problem-solving scenarios",
        "Cross-functional collaboration experiences",
        "Behavioral communication skills"
      ]
    };

    setInterviewFeedback(mockFeedback);
    setCurrentPhase('feedback');
    stopCamera();
  };

  const startInterview = async (question: InterviewQuestion) => {
    setCurrentQuestion(question);
    const cameraEnabled = await requestCameraPermission();
    if (cameraEnabled) {
      setCurrentPhase('recording');
    }
  };

  const resetInterview = () => {
    setCurrentPhase('setup');
    setCurrentQuestion(null);
    setInterviewFeedback(null);
    setIsRecording(false);
    setRecordingTime(0);
    stopCamera();
    recordedChunksRef.current = [];
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (currentPhase === 'setup') {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 rounded-2xl p-8 border border-purple-200/50 dark:border-purple-800/30">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Mock Interview Bot
              </h1>
              <p className="text-lg text-muted-foreground">
                AI-powered interview practice with real-time voice, facial, and behavioral analysis
              </p>
              <div className="flex items-center gap-3 mt-4">
                <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                  {selectedCompany} Interview Prep
                </Badge>
                <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 flex items-center gap-1">
                  <Camera className="w-3 h-3" />
                  Camera Required
                </Badge>
              </div>
            </div>
            <Button variant="outline" onClick={onBack} className="px-6 py-3">
              <BookOpen className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>

        {/* Interview Setup */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Question Selection */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-purple-600" />
                  Interview Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedQuestions.map((question) => (
                  <Card key={question.id} className="p-6 hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-purple-200 dark:hover:border-purple-800/50">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="capitalize">
                              {question.category}
                            </Badge>
                            <Badge variant="outline">
                              <Clock className="w-3 h-3 mr-1" />
                              {question.timeLimit / 60} min
                            </Badge>
                          </div>
                          <p className="text-base font-medium leading-relaxed mb-3">
                            {question.question}
                          </p>
                          {question.followUp && (
                            <div className="text-sm text-muted-foreground">
                              <strong>Follow-up questions:</strong>
                              <ul className="list-disc list-inside mt-1 space-y-1">
                                {question.followUp.map((follow, idx) => (
                                  <li key={idx}>{follow}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                      <Button 
                        onClick={() => startInterview(question)}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Start Practice
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Features & Tips */}
          <div className="space-y-6">
            {/* AI Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-600" />
                  AI Analysis Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Volume2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Voice Analysis</p>
                      <p className="text-sm text-muted-foreground">Pace, clarity, confidence</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <Eye className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Facial Analysis</p>
                      <p className="text-sm text-muted-foreground">Eye contact, expressions</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Body Language</p>
                      <p className="text-sm text-muted-foreground">Posture, engagement</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                      <Target className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium">STAR Method</p>
                      <p className="text-sm text-muted-foreground">Structure assessment</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Camera Notice */}
            <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                  <Camera className="w-5 h-5" />
                  Camera Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-600 dark:text-blue-300 leading-relaxed">
                  This mock interview uses your camera to analyze facial expressions, eye contact, and body language - just like a real interview! Make sure you're in a well-lit area and the camera can see your face clearly.
                </p>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  Interview Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800/30">
                    <p className="font-medium text-yellow-800 dark:text-yellow-400">Look at the Camera</p>
                    <p className="text-yellow-700 dark:text-yellow-300 text-xs mt-1">Maintain eye contact with the lens</p>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800/30">
                    <p className="font-medium text-blue-800 dark:text-blue-400">Sit Up Straight</p>
                    <p className="text-blue-700 dark:text-blue-300 text-xs mt-1">Good posture shows confidence</p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800/30">
                    <p className="font-medium text-green-800 dark:text-green-400">Smile & Engage</p>
                    <p className="text-green-700 dark:text-green-300 text-xs mt-1">Show enthusiasm naturally</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (currentPhase === 'recording' && currentQuestion) {
    return (
      <div className="space-y-8">
        {/* Recording Header */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 rounded-2xl p-8 border border-red-200/50 dark:border-red-800/30">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <h1 className="text-3xl font-bold">
                  {isRecording ? 'Recording in Progress' : 'Ready to Record'}
                </h1>
              </div>
              <p className="text-lg text-muted-foreground">
                Time: {formatTime(recordingTime)} / {formatTime(currentQuestion.timeLimit)}
              </p>
            </div>
            <Button variant="outline" onClick={resetInterview}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Feed & Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Preview */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative bg-black aspect-video">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                  
                  {/* Video Overlay Info */}
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                    <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <div className="flex items-center gap-2 text-white">
                        <div className={`w-2 h-2 rounded-full ${isCameraActive ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                        <span className="text-sm font-medium">{isCameraActive ? 'Camera Active' : 'Camera Off'}</span>
                      </div>
                    </div>
                    
                    {/* Real-time Facial Metrics */}
                    {isRecording && (
                      <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg">
                        <div className="flex items-center gap-4 text-white text-sm">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{Math.round(facialMetrics.eyeContact)}%</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Smile className={`w-4 h-4 ${facialMetrics.smileDetected ? 'text-green-400' : 'text-gray-400'}`} />
                            {facialMetrics.smileDetected && <CheckCircle className="w-3 h-3 text-green-400" />}
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            <span className="text-xs">{facialMetrics.headPosition}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Center Guideline */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-48 h-64 border-2 border-dashed border-white/30 rounded-lg"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recording Controls */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-4">
                  {!isRecording ? (
                    <Button
                      onClick={startRecording}
                      size="lg"
                      className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Start Recording
                    </Button>
                  ) : (
                    <Button
                      onClick={stopRecording}
                      size="lg"
                      variant="destructive"
                      className="px-8"
                    >
                      <Pause className="w-5 h-5 mr-2" />
                      Stop Recording
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question & Tips */}
          <div className="space-y-6">
            {/* Question Display */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Your Question</CardTitle>
                  <Badge className="capitalize">{currentQuestion.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-base leading-relaxed">
                  {currentQuestion.question}
                </p>
                
                {currentQuestion.followUp && (
                  <div>
                    <p className="text-sm font-medium mb-2">Potential Follow-ups:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {currentQuestion.followUp.map((q, idx) => (
                        <li key={idx}>{q}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Key Points to Cover */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  Key Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {currentQuestion.idealPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Live Tips */}
            <Card className="border-yellow-200 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-950/20">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
                  <Lightbulb className="w-4 h-4" />
                  Remember
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-xs text-yellow-600 dark:text-yellow-300">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Look directly at the camera</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Sit up straight and smile</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Use the STAR method</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Speak clearly and at a steady pace</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (currentPhase === 'feedback' && interviewFeedback) {
    return (
      <div className="space-y-8">
        {/* Feedback Header */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl p-8 border border-green-200/50 dark:border-green-800/30">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Award className="w-10 h-10 text-green-600" />
                <h1 className="text-4xl font-bold">Interview Complete!</h1>
              </div>
              <p className="text-lg text-muted-foreground">
                Here's your detailed performance analysis
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Overall Score</p>
              <p className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {interviewFeedback.overall_score}
              </p>
              <p className="text-sm text-muted-foreground">out of 100</p>
            </div>
          </div>
        </div>

        {/* Detailed Analysis Tabs */}
        <Tabs defaultValue="voice" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="voice" className="flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              Voice
            </TabsTrigger>
            <TabsTrigger value="facial" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Facial
            </TabsTrigger>
            <TabsTrigger value="behavioral" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Behavioral
            </TabsTrigger>
            <TabsTrigger value="summary" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Summary
            </TabsTrigger>
          </TabsList>

          {/* Voice Analysis */}
          <TabsContent value="voice" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-blue-600" />
                  Voice Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Speaking Pace</span>
                      <span className="text-sm text-muted-foreground">{interviewFeedback.voice_analysis.pace} WPM</span>
                    </div>
                    <Progress value={(interviewFeedback.voice_analysis.pace - 100) / 1.2} className="h-2" />
                    <p className="text-xs text-muted-foreground">Ideal: 120-150 WPM</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Clarity</span>
                      <span className="text-sm text-muted-foreground">{interviewFeedback.voice_analysis.clarity}%</span>
                    </div>
                    <Progress value={interviewFeedback.voice_analysis.clarity} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Confidence</span>
                      <span className="text-sm text-muted-foreground">{interviewFeedback.voice_analysis.confidence}%</span>
                    </div>
                    <Progress value={interviewFeedback.voice_analysis.confidence} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Volume</span>
                      <span className="text-sm text-muted-foreground">{interviewFeedback.voice_analysis.volume}%</span>
                    </div>
                    <Progress value={interviewFeedback.voice_analysis.volume} className="h-2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-400">Filler Words</p>
                    <p className="text-2xl font-bold text-yellow-600">{interviewFeedback.voice_analysis.filler_words}</p>
                    <p className="text-xs text-muted-foreground">Try to reduce to &lt;5</p>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-400">Pauses</p>
                    <p className="text-2xl font-bold text-blue-600">{interviewFeedback.voice_analysis.pauses}</p>
                    <p className="text-xs text-muted-foreground">Natural pauses are good</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Facial Analysis */}
          <TabsContent value="facial" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-green-600" />
                  Facial & Body Language Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Eye Contact</span>
                      <span className="text-sm text-muted-foreground">{interviewFeedback.facial_analysis.eye_contact}%</span>
                    </div>
                    <Progress value={interviewFeedback.facial_analysis.eye_contact} className="h-2" />
                    <p className="text-xs text-muted-foreground">Great! Maintain 70%+ eye contact</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Smile & Engagement</span>
                      <span className="text-sm text-muted-foreground">{interviewFeedback.facial_analysis.smile_frequency}%</span>
                    </div>
                    <Progress value={interviewFeedback.facial_analysis.smile_frequency} className="h-2" />
                    <p className="text-xs text-muted-foreground">Natural smiling shows confidence</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Confidence Score</span>
                      <span className="text-sm text-muted-foreground">{interviewFeedback.facial_analysis.confidence_score}%</span>
                    </div>
                    <Progress value={interviewFeedback.facial_analysis.confidence_score} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Posture Score</span>
                      <span className="text-sm text-muted-foreground">{interviewFeedback.facial_analysis.posture_score}%</span>
                    </div>
                    <Progress value={interviewFeedback.facial_analysis.posture_score} className="h-2" />
                    <p className="text-xs text-muted-foreground">Keep shoulders back, sit upright</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Engagement Level</span>
                      <span className="text-sm text-muted-foreground">{interviewFeedback.facial_analysis.engagement_level}%</span>
                    </div>
                    <Progress value={interviewFeedback.facial_analysis.engagement_level} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Nervousness</span>
                      <span className="text-sm text-muted-foreground">{interviewFeedback.facial_analysis.nervousness_indicators}%</span>
                    </div>
                    <Progress value={100 - interviewFeedback.facial_analysis.nervousness_indicators} className="h-2" />
                    <p className="text-xs text-muted-foreground">Lower is better - you're doing great!</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Behavioral Analysis */}
          <TabsContent value="behavioral" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  Behavioral Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">STAR Structure</span>
                      <span className="text-sm text-muted-foreground">{interviewFeedback.behavioral_analysis.structure}%</span>
                    </div>
                    <Progress value={interviewFeedback.behavioral_analysis.structure} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Specificity</span>
                      <span className="text-sm text-muted-foreground">{interviewFeedback.behavioral_analysis.specificity}%</span>
                    </div>
                    <Progress value={interviewFeedback.behavioral_analysis.specificity} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Leadership</span>
                      <span className="text-sm text-muted-foreground">{interviewFeedback.behavioral_analysis.leadership}%</span>
                    </div>
                    <Progress value={interviewFeedback.behavioral_analysis.leadership} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Collaboration</span>
                      <span className="text-sm text-muted-foreground">{interviewFeedback.behavioral_analysis.collaboration}%</span>
                    </div>
                    <Progress value={interviewFeedback.behavioral_analysis.collaboration} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Problem Solving</span>
                      <span className="text-sm text-muted-foreground">{interviewFeedback.behavioral_analysis.problem_solving}%</span>
                    </div>
                    <Progress value={interviewFeedback.behavioral_analysis.problem_solving} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Cultural Fit</span>
                      <span className="text-sm text-muted-foreground">{interviewFeedback.behavioral_analysis.cultural_fit}%</span>
                    </div>
                    <Progress value={interviewFeedback.behavioral_analysis.cultural_fit} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Summary */}
          <TabsContent value="summary" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Strengths */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {interviewFeedback.strengths.map((strength, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <TrendingUp className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Areas for Improvement */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-600">
                    <AlertCircle className="w-5 h-5" />
                    Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {interviewFeedback.areas_for_improvement.map((area, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <TrendingDown className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Specific Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  Specific Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {interviewFeedback.specific_suggestions.map((suggestion, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Zap className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Next Practice Focus */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Next Practice Focus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {interviewFeedback.next_practice_focus.map((focus, idx) => (
                    <div key={idx} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800/30">
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-400">{focus}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={resetInterview}
            size="lg"
            variant="outline"
            className="px-8"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Practice Again
          </Button>
          <Button
            onClick={onBack}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8"
          >
            Back to Dashboard
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
