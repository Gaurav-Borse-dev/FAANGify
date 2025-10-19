import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Trophy, Target, Clock, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProgressData {
  totalQuestions: number;
  completedQuestions: number;
  averageTime: number;
  streakDays: number;
  companiesProgress: Array<{
    company: string;
    logo: string;
    completed: number;
    total: number;
  }>;
  topicProgress: Array<{
    topic: string;
    completed: number;
    total: number;
  }>;
  recentActivity: Array<{
    questionTitle: string;
    company: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    timeTaken: number;
    completedAt: string;
  }>;
}

interface ProgressTrackerProps {
  progress: ProgressData;
}

export function ProgressTracker({ progress }: ProgressTrackerProps) {
  const completionRate = Math.round((progress.completedQuestions / progress.totalQuestions) * 100);

  const difficultyColors = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800'
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Your Progress</h1>
        <p className="text-muted-foreground">
          Track your interview preparation journey
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-medium">{progress.completedQuestions}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-medium">{completionRate}%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <div>
                <div className="font-medium">{progress.averageTime}m</div>
                <div className="text-sm text-muted-foreground">Avg Time</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              <div>
                <div className="font-medium">{progress.streakDays}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Progress by Company</CardTitle>
            <CardDescription>Your completion status for each company</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {progress.companiesProgress.map((company) => (
              <div key={company.company} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center overflow-hidden">
                      {company.logo.startsWith('http') ? (
                        <ImageWithFallback
                          src={company.logo}
                          alt={`${company.company} logo`}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-xs font-medium">{company.logo}</span>
                      )}
                    </div>
                    <span className="text-sm">{company.company}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {company.completed}/{company.total}
                  </span>
                </div>
                <Progress value={(company.completed / company.total) * 100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Topic Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Progress by Topic</CardTitle>
            <CardDescription>Your mastery of different algorithm topics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {progress.topicProgress.map((topic) => (
              <div key={topic.topic} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{topic.topic}</span>
                  <span className="text-sm text-muted-foreground">
                    {topic.completed}/{topic.total}
                  </span>
                </div>
                <Progress value={(topic.completed / topic.total) * 100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest completed challenges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {progress.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium">{activity.questionTitle}</div>
                    <div className="text-sm text-muted-foreground">{activity.company}</div>
                  </div>
                  <Badge className={difficultyColors[activity.difficulty]}>
                    {activity.difficulty}
                  </Badge>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <div>{activity.timeTaken}m</div>
                  <div>{activity.completedAt}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}