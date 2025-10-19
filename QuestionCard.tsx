import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Clock, Code, CheckCircle, ArrowRight, Trophy, Target } from "lucide-react";

interface Question {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  estimatedTime: number;
  company: string;
  completed: boolean;
  description: string;
}

interface QuestionCardProps {
  question: Question;
  onStart: (question: Question) => void;
}

export function QuestionCard({ question, onStart }: QuestionCardProps) {
  const difficultyColors = {
    Easy: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800',
    Medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
    Hard: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800'
  };

  const companyColors = {
    Google: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    Meta: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    Amazon: 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    Apple: 'bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
    Netflix: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  };

  return (
    <Card className="group relative hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 border-2 hover:border-blue-200 dark:hover:border-blue-800/50 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
      {/* Completion Badge */}
      {question.completed && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="bg-green-500 text-white rounded-full p-2 shadow-lg">
            <CheckCircle className="w-4 h-4" />
          </div>
        </div>
      )}

      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <CardTitle className="text-xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                {question.title}
              </CardTitle>
              {question.completed && (
                <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                  <Trophy className="w-4 h-4" />
                  <span className="text-xs font-medium">Solved</span>
                </div>
              )}
            </div>
            <CardDescription className="text-base leading-relaxed line-clamp-2">
              {question.description}
            </CardDescription>
          </div>
          <Badge className={`px-3 py-2 font-medium border ${difficultyColors[question.difficulty]} flex-shrink-0`}>
            <Target className="w-3 h-3 mr-1" />
            {question.difficulty}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Question Meta Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Code className="w-4 h-4 text-blue-500" />
              <span className="font-medium">{question.topic}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4 text-green-500" />
              <span className="font-medium">{question.estimatedTime} min</span>
            </div>
          </div>
          <Badge className={`px-3 py-1 font-medium ${companyColors[question.company as keyof typeof companyColors] || 'bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'}`}>
            {question.company}
          </Badge>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-border/50">
          <Button 
            onClick={() => onStart(question)}
            className="w-full h-12 text-base font-semibold group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300 flex items-center justify-center gap-2"
            variant={question.completed ? "outline" : "default"}
          >
            <span>{question.completed ? 'Review Solution' : 'Start Challenge'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>

        {/* Progress Indicator */}
        {question.completed && (
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800/30">
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Completed successfully</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}