import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight, Code, Target } from "lucide-react";

interface CompanyCardProps {
  company: {
    name: string;
    logo: string;
    description: string;
    difficulty: string;
    questionCount: number;
    topics: string[];
  };
  onClick: () => void;
}

export function CompanyCard({ company, onClick }: CompanyCardProps) {
  const difficultyColors = {
    'Easy': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'Medium': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    'Hard': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  };

  return (
    <Card className="group cursor-pointer hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border-2 hover:border-blue-200 dark:hover:border-blue-800/50 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50" onClick={onClick}>
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center overflow-hidden shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
            {company.logo.startsWith('http') ? (
              <ImageWithFallback
                src={company.logo}
                alt={`${company.name} logo`}
                className="w-12 h-12 object-contain"
              />
            ) : (
              <span className="font-bold text-2xl text-gray-600 dark:text-gray-300">{company.logo}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {company.name}
              </CardTitle>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
            </div>
            <CardDescription className="text-base mt-2 leading-relaxed">
              {company.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-blue-500" />
            <span className="font-medium">{company.questionCount} Questions</span>
          </div>
          <Badge className={`px-3 py-1 font-medium ${difficultyColors[company.difficulty as keyof typeof difficultyColors]}`}>
            <Target className="w-3 h-3 mr-1" />
            {company.difficulty}
          </Badge>
        </div>
        
        {/* Topics */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Focus Areas:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {company.topics.map((topic) => (
              <Badge 
                key={topic} 
                variant="outline" 
                className="px-3 py-1 text-sm bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                {topic}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action hint */}
        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Click to start practicing</span>
            <div className="flex items-center gap-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              <span>Begin</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}