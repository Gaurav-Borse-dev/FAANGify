import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Alert, AlertDescription } from "./ui/alert";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { 
  Upload, 
  FileText, 
  Brain, 
  CheckCircle, 
  AlertCircle, 
  Trash2, 
  Download,
  Sparkles,
  TrendingUp,
  Award,
  Target,
  BookOpen,
  Users,
  Clock,
  ArrowRight,
  Star
} from "lucide-react";

interface CompanyMatch {
  name: string;
  score: number;
  strengths: string[];
  gaps: string[];
  requirements: string[];
  interviewFocus: string[];
  logo: string;
}

interface ResumeAnalysis {
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  skillsExtracted: string[];
  experienceLevel: 'Entry' | 'Mid' | 'Senior' | 'Staff';
  targetCompanies: string[];
  missingSkills: string[];
  atsCompatibility: number;
  keywordDensity: { [key: string]: number };
  companyMatches: CompanyMatch[];
  bestMatch: CompanyMatch;
}

interface ResumeIntakeProps {
  onAnalysisComplete: (analysis: ResumeAnalysis) => void;
  onBack: () => void;
}

export function ResumeIntake({ onAnalysisComplete, onBack }: ResumeIntakeProps) {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [targetCompany, setTargetCompany] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [uploadMethod, setUploadMethod] = useState<'file' | 'text'>('file');
  const [dragOver, setDragOver] = useState(false);

  const handleFileDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type === 'application/pdf' || file.type.includes('document') || file.name.endsWith('.txt')) {
        setResumeFile(file);
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const simulateAnalysis = async () => {
    const steps = [
      'Parsing resume content...',
      'Extracting skills and experience...',
      'Analyzing ATS compatibility...',
      'Comparing with industry standards...',
      'Generating personalized recommendations...',
      'Finalizing analysis...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(steps[i]);
      setAnalysisProgress(((i + 1) / steps.length) * 100);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
  };

  const handleAnalyze = async () => {
    if (!resumeFile && !resumeText.trim()) return;
    if (!targetRole.trim()) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    try {
      await simulateAnalysis();

      // Mock company matches data
      const companyMatches: CompanyMatch[] = [
        {
          name: 'Google',
          score: 87,
          strengths: [
            'Strong algorithmic thinking and CS fundamentals',
            'Experience with scalable web applications',
            'Good problem-solving track record'
          ],
          gaps: [
            'Limited system design experience',
            'Missing distributed systems knowledge',
            'Need more focus on code optimization'
          ],
          requirements: ['Algorithms', 'System Design', 'Coding', 'Googleyness'],
          interviewFocus: ['Coding', 'System Design', 'Behavioral', 'Technical Leadership'],
          logo: 'https://images.unsplash.com/photo-1696891953733-ff861e7e3dae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHb29nbGUlMjBsb2dvJTIwYnJhbmR8ZW58MXx8fHwxNzU4MzAyODgxfDA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          name: 'Meta',
          score: 82,
          strengths: [
            'Frontend development expertise',
            'React experience aligns with Meta stack',
            'Good collaborative project experience'
          ],
          gaps: [
            'Limited mobile development experience',
            'Need more large-scale system experience',
            'Missing GraphQL knowledge'
          ],
          requirements: ['Coding', 'System Design', 'Product Sense', 'Values Alignment'],
          interviewFocus: ['Coding', 'System Design', 'Behavioral', 'Product'],
          logo: 'https://images.unsplash.com/photo-1665799871677-f1fd17338b43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNZXRhJTIwRmFjZWJvb2slMjBsb2dvfGVufDF8fHx8MTc1ODMwMjg4MXww&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          name: 'Amazon',
          score: 79,
          strengths: [
            'Strong technical implementation skills',
            'Good understanding of web services',
            'Leadership potential demonstrated'
          ],
          gaps: [
            'Limited AWS/Cloud experience',
            'Need more customer-focused project examples',
            'Missing large-scale distributed systems experience'
          ],
          requirements: ['Coding', 'System Design', 'Leadership Principles', 'Customer Obsession'],
          interviewFocus: ['Coding', 'System Design', 'Leadership Principles', 'Behavioral'],
          logo: 'https://images.unsplash.com/photo-1704204656144-3dd12c110dd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBbWF6b24lMjBsb2dvJTIwYnJhbmR8ZW58MXx8fHwxNzU4MzAyODgxfDA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          name: 'Apple',
          score: 75,
          strengths: [
            'Strong programming fundamentals',
            'Attention to code quality',
            'Good problem-solving approach'
          ],
          gaps: [
            'Limited iOS/macOS development experience',
            'Missing hardware-software integration knowledge',
            'Need more performance optimization experience'
          ],
          requirements: ['Coding', 'System Design', 'Platform Knowledge', 'Technical Excellence'],
          interviewFocus: ['Coding', 'System Design', 'Platform-specific', 'Technical Deep-dive'],
          logo: 'https://images.unsplash.com/photo-1703756292090-f086a84d1cfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBcHBsZSUyMGxvZ28lMjBicmFuZHxlbnwxfHx8fDE3NTgzMDI4ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          name: 'Netflix',
          score: 73,
          strengths: [
            'Good JavaScript and Python experience',
            'Understanding of web application architecture',
            'Problem-solving mindset'
          ],
          gaps: [
            'Limited streaming/media technology experience',
            'Missing microservices architecture knowledge',
            'Need more high-performance system experience'
          ],
          requirements: ['Coding', 'System Design', 'Culture Fit', 'High Performance'],
          interviewFocus: ['Coding', 'System Design', 'Culture', 'Performance'],
          logo: 'https://images.unsplash.com/photo-1627873649417-c67f701f1949?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOZXRmbGl4JTIwbG9nbyUyMGJyYW5kfGVufDF8fHx8MTc1ODMwMjg4Mnww&ixlib=rb-4.1.0&q=80&w=1080'
        }
      ];

      // Sort by score and get best match
      const sortedMatches = companyMatches.sort((a, b) => b.score - a.score);
      const bestMatch = sortedMatches[0];

      // Mock analysis results
      const mockAnalysis: ResumeAnalysis = {
        overallScore: 78,
        strengths: [
          'Strong technical background in software development',
          'Excellent problem-solving skills demonstrated through projects',
          'Leadership experience in team-based environments',
          'Relevant internship experience at tech companies',
          'Strong educational background in Computer Science'
        ],
        weaknesses: [
          'Limited system design experience mentioned',
          'Could benefit from more quantified achievements',
          'Missing cloud platform certifications',
          'Limited open source contributions highlighted'
        ],
        suggestions: [
          'Add specific metrics to your achievements (e.g., "Improved performance by 40%")',
          'Include more system design projects or coursework',
          'Highlight any cloud platform experience (AWS, GCP, Azure)',
          'Add links to GitHub repositories or portfolio projects',
          'Consider getting certified in relevant technologies',
          'Emphasize leadership and collaboration skills more prominently'
        ],
        skillsExtracted: [
          'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git', 
          'Algorithms', 'Data Structures', 'REST APIs', 'MongoDB',
          'TypeScript', 'HTML/CSS', 'Agile', 'Problem Solving'
        ],
        experienceLevel: 'Mid',
        targetCompanies: ['Google', 'Meta', 'Amazon', 'Microsoft', 'Apple'],
        missingSkills: [
          'System Design', 'Microservices', 'Docker', 'Kubernetes',
          'AWS/Cloud Platforms', 'GraphQL', 'Redis', 'Kafka'
        ],
        atsCompatibility: 85,
        keywordDensity: {
          'Software Engineer': 8,
          'JavaScript': 12,
          'Python': 10,
          'React': 9,
          'Problem Solving': 6,
          'Team Lead': 4,
          'Agile': 5
        },
        companyMatches: sortedMatches,
        bestMatch: bestMatch
      };

      onAnalysisComplete(mockAnalysis);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const suggestedRoles = [
    'Software Engineer',
    'Frontend Developer', 
    'Backend Developer',
    'Full Stack Developer',
    'Data Scientist',
    'Product Manager',
    'DevOps Engineer',
    'Mobile Developer'
  ];

  const suggestedCompanies = [
    'Google', 'Meta', 'Amazon', 'Apple', 'Microsoft',
    'Netflix', 'Uber', 'Airbnb', 'Tesla', 'Spotify'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Resume Analysis
            </h1>
            <p className="text-muted-foreground">
              Get AI-powered insights to optimize your resume for FAANG companies
            </p>
          </div>
          <Button variant="outline" onClick={onBack} className="gap-2">
            ← Back to Dashboard
          </Button>
        </div>

        {/* Analysis in Progress */}
        {isAnalyzing && (
          <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Analyzing Your Resume</h3>
                    <p className="text-sm text-muted-foreground">{currentStep}</p>
                  </div>
                </div>
                <Progress value={analysisProgress} className="h-3" />
                <p className="text-sm text-center text-muted-foreground">
                  {Math.round(analysisProgress)}% Complete - This usually takes 30-60 seconds
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {!isAnalyzing && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Resume
                </CardTitle>
                <CardDescription>
                  Upload your resume or paste the content directly
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Upload Method Toggle */}
                <div className="flex gap-2">
                  <Button
                    variant={uploadMethod === 'file' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setUploadMethod('file')}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Upload File
                  </Button>
                  <Button
                    variant={uploadMethod === 'text' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setUploadMethod('text')}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Paste Text
                  </Button>
                </div>

                {uploadMethod === 'file' ? (
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragOver
                        ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleFileDrop}
                  >
                    {resumeFile ? (
                      <div className="space-y-3">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                        <div>
                          <p className="font-medium">{resumeFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setResumeFile(null)}
                          className="gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                        <div>
                          <p className="font-medium">Drop your resume here</p>
                          <p className="text-sm text-muted-foreground">
                            or click to browse files
                          </p>
                        </div>
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx,.txt"
                          onChange={handleFileChange}
                          className="hidden"
                          id="resume-upload"
                        />
                        <Label htmlFor="resume-upload" className="cursor-pointer">
                          <Button variant="outline" asChild>
                            <span>Choose File</span>
                          </Button>
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Supports PDF, DOC, DOCX, and TXT files
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="resume-text">Resume Content</Label>
                    <Textarea
                      id="resume-text"
                      placeholder="Paste your resume content here..."
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      className="min-h-[200px] resize-y"
                    />
                    <p className="text-xs text-muted-foreground">
                      Paste the full text content of your resume
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Target Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Target Position
                </CardTitle>
                <CardDescription>
                  Help us provide more targeted analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="target-role">Target Role</Label>
                  <Input
                    id="target-role"
                    placeholder="e.g., Software Engineer"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {suggestedRoles.map((role) => (
                      <Badge
                        key={role}
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        onClick={() => setTargetRole(role)}
                      >
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target-company">Target Company (Optional)</Label>
                  <Input
                    id="target-company"
                    placeholder="e.g., Google"
                    value={targetCompany}
                    onChange={(e) => setTargetCompany(e.target.value)}
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {suggestedCompanies.map((company) => (
                      <Badge
                        key={company}
                        variant="outline"
                        className="cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/20"
                        onClick={() => setTargetCompany(company)}
                      >
                        {company}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Analysis Features
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { icon: TrendingUp, label: 'ATS Compatibility Score' },
                      { icon: Award, label: 'Skills Gap Analysis' },
                      { icon: BookOpen, label: 'Keyword Optimization' },
                      { icon: Users, label: 'Industry Benchmarking' },
                      { icon: Clock, label: 'Experience Level Assessment' },
                      { icon: Star, label: 'Personalized Recommendations' }
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <feature.icon className="w-4 h-4 text-blue-500" />
                        {feature.label}
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleAnalyze}
                  disabled={(!resumeFile && !resumeText.trim()) || !targetRole.trim()}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 gap-2"
                >
                  <Brain className="w-4 h-4" />
                  Analyze Resume
                  <ArrowRight className="w-4 h-4" />
                </Button>

                {(!resumeFile && !resumeText.trim()) && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Please upload a resume file or paste your resume content to continue.
                    </AlertDescription>
                  </Alert>
                )}

                {!targetRole.trim() && (resumeFile || resumeText.trim()) && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Please specify your target role for personalized analysis.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tips Section */}
        {!isAnalyzing && (
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 border-green-200 dark:border-green-800">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-green-900 dark:text-green-100">
                    Pro Tips for Better Analysis
                  </h3>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                    <li>• Upload the latest version of your resume</li>
                    <li>• Ensure your resume includes specific achievements with metrics</li>
                    <li>• Include relevant technical skills and project details</li>
                    <li>• Specify the exact role title you're targeting for better recommendations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}