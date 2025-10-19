import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription } from "./ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  CheckCircle, 
  AlertTriangle, 
  Lightbulb, 
  TrendingUp, 
  Award, 
  Target, 
  BookOpen, 
  Download,
  Share2,
  RefreshCw,
  Star,
  BarChart3,
  Users,
  Zap,
  Brain,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Trophy,
  Building2,
  Sparkles,
  MapPin,
  Crown
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

interface ResumeAnalysisResultsProps {
  analysis: ResumeAnalysis;
  onGenerateRoadmap: () => void;
  onGenerateCompanyRoadmap: (company: CompanyMatch) => void;
  onBack: () => void;
  onReanalyze: () => void;
}

export function ResumeAnalysisResults({ 
  analysis, 
  onGenerateRoadmap,
  onGenerateCompanyRoadmap, 
  onBack, 
  onReanalyze 
}: ResumeAnalysisResultsProps) {
  const [copiedSuggestion, setCopiedSuggestion] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('company-match');

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-600';
    if (score >= 60) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-rose-600';
  };

  const handleCopySuggestion = (suggestion: string, index: number) => {
    navigator.clipboard.writeText(suggestion);
    setCopiedSuggestion(index);
    setTimeout(() => setCopiedSuggestion(null), 2000);
  };

  const skillCategories = {
    'Programming Languages': analysis.skillsExtracted.filter(skill => 
      ['JavaScript', 'Python', 'Java', 'C++', 'Go', 'Rust', 'TypeScript', 'C#'].includes(skill)
    ),
    'Frameworks & Libraries': analysis.skillsExtracted.filter(skill => 
      ['React', 'Angular', 'Vue.js', 'Node.js', 'Express', 'Django', 'Flask', 'Spring'].includes(skill)
    ),
    'Databases': analysis.skillsExtracted.filter(skill => 
      ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Cassandra'].includes(skill)
    ),
    'Tools & Technologies': analysis.skillsExtracted.filter(skill => 
      ['Git', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'Jenkins'].includes(skill)
    ),
    'Soft Skills': analysis.skillsExtracted.filter(skill => 
      ['Problem Solving', 'Team Lead', 'Agile', 'Communication', 'Leadership'].includes(skill)
    )
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Resume Analysis Results
            </h1>
            <p className="text-muted-foreground">
              Comprehensive analysis of your resume with actionable insights
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onReanalyze} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Re-analyze
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export PDF
            </Button>
            <Button variant="outline" onClick={onBack} className="gap-2">
              ← Back
            </Button>
          </div>
        </div>

        {/* Best Company Match Card */}
        <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 border-emerald-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-800 shadow-lg border-4 border-emerald-200 flex items-center justify-center overflow-hidden">
                    <img 
                      src={analysis.bestMatch.logo} 
                      alt={analysis.bestMatch.name}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-600 uppercase tracking-wide">Best Match</span>
                  </div>
                  <h2 className="text-2xl font-bold">{analysis.bestMatch.name}</h2>
                  <p className="text-muted-foreground text-lg">
                    {analysis.bestMatch.score}% compatibility • Perfect for your background
                  </p>
                  <div className="flex items-center gap-2">
                    <Progress value={analysis.bestMatch.score} className="h-2 w-32" />
                    <span className="text-sm font-medium text-emerald-600">{analysis.bestMatch.score}%</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button 
                  onClick={() => onGenerateCompanyRoadmap(analysis.bestMatch)}
                  className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 gap-2 text-lg px-8 py-6"
                >
                  <MapPin className="w-5 h-5" />
                  Get {analysis.bestMatch.name} Roadmap
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button 
                  variant="outline"
                  onClick={onGenerateRoadmap}
                  className="gap-2 px-8 py-3"
                >
                  <Brain className="w-4 h-4" />
                  General Roadmap
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overall Score Card */}
        <Card className="bg-gradient-to-r from-white to-blue-50 dark:from-gray-900 dark:to-blue-900/20 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${getScoreGradient(analysis.overallScore)} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                    {analysis.overallScore}
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Star className="w-3 h-3 text-yellow-800" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Overall Resume Score</h3>
                  <p className="text-muted-foreground">
                    {analysis.overallScore >= 80 ? 'Excellent resume!' : 
                     analysis.overallScore >= 60 ? 'Good resume with room for improvement' :
                     'Needs significant improvements'}
                  </p>
                  <div className="flex items-center gap-4">
                    <Badge variant={analysis.overallScore >= 80 ? 'default' : 'secondary'} className="text-sm">
                      {analysis.experienceLevel} Level
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                      ATS Compatible: {analysis.atsCompatibility}%
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="company-match">Company Match</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
            <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
          </TabsList>

          {/* Company Match Tab */}
          <TabsContent value="company-match" className="space-y-6">
            {/* Best Match Details */}
            <Card className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border-emerald-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                  <Crown className="w-5 h-5" />
                  Best Match: {analysis.bestMatch.name}
                </CardTitle>
                <CardDescription>
                  {analysis.bestMatch.score}% compatibility based on your resume analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Your Strengths for {analysis.bestMatch.name}</h4>
                      <div className="space-y-2">
                        {analysis.bestMatch.strengths.map((strength, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-green-800 dark:text-green-200">{strength}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Interview Focus Areas</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.bestMatch.interviewFocus.map((focus, index) => (
                          <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            {focus}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">Areas to Improve</h4>
                      <div className="space-y-2">
                        {analysis.bestMatch.gaps.map((gap, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <Target className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                            <span className="text-orange-800 dark:text-orange-200">{gap}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button 
                      onClick={() => onGenerateCompanyRoadmap(analysis.bestMatch)}
                      className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 gap-2"
                    >
                      <MapPin className="w-4 h-4" />
                      Get Personalized {analysis.bestMatch.name} Roadmap
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* All Company Matches */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  FAANG Company Compatibility
                </CardTitle>
                <CardDescription>
                  How well your resume aligns with each company's requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysis.companyMatches.map((company, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow border-2 border-gray-200 flex items-center justify-center overflow-hidden">
                            <img 
                              src={company.logo} 
                              alt={company.name}
                              className="w-8 h-8 object-contain"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{company.name}</h4>
                              {company.name === analysis.bestMatch.name && (
                                <Badge className="bg-emerald-500 text-white text-xs">
                                  <Crown className="w-3 h-3 mr-1" />
                                  Best Match
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-3 mt-1">
                              <Progress value={company.score} className="h-2 w-32" />
                              <span className={`font-medium text-sm ${
                                company.score >= 80 ? 'text-green-600' : 
                                company.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {company.score}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onGenerateCompanyRoadmap(company)}
                            className="gap-2"
                          >
                            <MapPin className="w-4 h-4" />
                            Get Roadmap
                          </Button>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h5 className="font-medium text-green-700 dark:text-green-400 mb-1">Key Strengths</h5>
                          <ul className="text-muted-foreground space-y-1">
                            {company.strengths.slice(0, 2).map((strength, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                {strength}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-orange-700 dark:text-orange-400 mb-1">Areas to Focus</h5>
                          <ul className="text-muted-foreground space-y-1">
                            {company.gaps.slice(0, 2).map((gap, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <span className="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                                {gap}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Strengths */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    Key Strengths
                  </CardTitle>
                  <CardDescription>
                    What makes your resume stand out
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysis.strengths.map((strength, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-green-800 dark:text-green-200">{strength}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Areas for Improvement */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
                    <AlertTriangle className="w-5 h-5" />
                    Areas for Improvement
                  </CardTitle>
                  <CardDescription>
                    Opportunities to enhance your resume
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysis.weaknesses.map((weakness, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                        <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-orange-800 dark:text-orange-200">{weakness}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ATS Compatibility */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  ATS Compatibility Analysis
                </CardTitle>
                <CardDescription>
                  How well your resume performs with Applicant Tracking Systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">ATS Compatibility Score</span>
                    <span className={`font-bold text-lg ${getScoreColor(analysis.atsCompatibility)}`}>
                      {analysis.atsCompatibility}%
                    </span>
                  </div>
                  <Progress value={analysis.atsCompatibility} className="h-3" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">✓</div>
                      <div className="text-sm font-medium">Readable Format</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">✓</div>
                      <div className="text-sm font-medium">Standard Sections</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">⚠</div>
                      <div className="text-sm font-medium">Keyword Density</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Extracted Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Skills Found in Your Resume
                  </CardTitle>
                  <CardDescription>
                    Technical and soft skills we identified
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(skillCategories).map(([category, skills]) => (
                      skills.length > 0 && (
                        <div key={category} className="space-y-2">
                          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                            {category}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Missing Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                    <Target className="w-5 h-5" />
                    Recommended Skills to Add
                  </CardTitle>
                  <CardDescription>
                    High-impact skills that could strengthen your profile
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysis.missingSkills.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-red-600" />
                          <span className="font-medium text-red-800 dark:text-red-200">{skill}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          High Priority
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Alert className="mt-4">
                    <Lightbulb className="h-4 w-4" />
                    <AlertDescription>
                      Consider taking courses or building projects to gain these skills before applying.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Suggestions Tab */}
          <TabsContent value="suggestions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Actionable Recommendations
                </CardTitle>
                <CardDescription>
                  Specific steps to improve your resume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysis.suggestions.map((suggestion, index) => (
                    <div key={index} className="group p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                            {suggestion}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopySuggestion(suggestion, index)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          {copiedSuggestion === index ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Keywords Tab */}
          <TabsContent value="keywords" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Keyword Analysis
                </CardTitle>
                <CardDescription>
                  Important keywords and their frequency in your resume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(analysis.keywordDensity)
                    .sort(([,a], [,b]) => b - a)
                    .map(([keyword, count]) => (
                      <div key={keyword} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{keyword}</Badge>
                          <span className="text-sm text-muted-foreground">
                            appears {count} times
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${(count / 15) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{count}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Benchmarks Tab */}
          <TabsContent value="benchmarks" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Industry Benchmarks
                  </CardTitle>
                  <CardDescription>
                    How your resume compares to industry standards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { metric: 'Technical Skills Count', your: '14', average: '12', status: 'above' },
                      { metric: 'Experience Descriptions', your: '8', average: '10', status: 'below' },
                      { metric: 'Quantified Achievements', your: '3', average: '6', status: 'below' },
                      { metric: 'Resume Length (pages)', your: '2', average: '1.5', status: 'above' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{item.metric}</div>
                          <div className="text-sm text-muted-foreground">
                            Industry average: {item.average}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold ${item.status === 'above' ? 'text-green-600' : 'text-red-600'}`}>
                            {item.your}
                          </div>
                          <div className={`text-sm ${item.status === 'above' ? 'text-green-600' : 'text-red-600'}`}>
                            {item.status === 'above' ? '↑ Above' : '↓ Below'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Next Steps
                  </CardTitle>
                  <CardDescription>
                    Recommended actions based on your analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full justify-start gap-3 h-auto p-4 bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700" onClick={() => onGenerateCompanyRoadmap(analysis.bestMatch)}>
                      <MapPin className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium">Get {analysis.bestMatch.name} Roadmap</div>
                        <div className="text-sm opacity-90">Tailored for your best company match</div>
                      </div>
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start gap-3 h-auto p-4" onClick={onGenerateRoadmap}>
                      <Brain className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium">Generate General Roadmap</div>
                        <div className="text-sm text-muted-foreground">Get a personalized general plan</div>
                      </div>
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start gap-3 h-auto p-4">
                      <Zap className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium">Practice Interview Questions</div>
                        <div className="text-sm text-muted-foreground">Based on your target role</div>
                      </div>
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start gap-3 h-auto p-4">
                      <ExternalLink className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium">View Sample Resumes</div>
                        <div className="text-sm text-muted-foreground">See successful resume examples</div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}