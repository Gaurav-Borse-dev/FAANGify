import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight, Code, Clock, Target, TrendingUp } from "lucide-react";

interface FaangCompanyRectProps {
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

export function FaangCompanyRect({ company, onClick }: FaangCompanyRectProps) {
  const difficultyColors = {
    'Easy': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800',
    'Medium': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
    'Hard': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800'
  };

  const companyThemes = {
    'Google': 'from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-800/30',
    'Meta': 'from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 border-purple-200 dark:border-purple-800/30',
    'Amazon': 'from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/20 border-orange-200 dark:border-orange-800/30',
    'Apple': 'from-gray-50 to-gray-100 dark:from-gray-950/30 dark:to-gray-900/20 border-gray-200 dark:border-gray-800/30',
    'Netflix': 'from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20 border-red-200 dark:border-red-800/30'
  };

  return (
    <Card className={`group relative overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 border-2 bg-gradient-to-r ${companyThemes[company.name as keyof typeof companyThemes] || companyThemes.Google}`} onClick={onClick}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>
      
      <div className="relative p-6">
        <div className="flex items-stretch gap-8 min-h-[200px]">
          {/* Left Side - Company Logo - Full Height */}
          <div className="flex-shrink-0 flex items-center">
            <div className="w-36 h-44 bg-white dark:bg-gray-800 rounded-3xl shadow-lg flex items-center justify-center overflow-hidden group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 border-4 border-white dark:border-gray-700">
              {company.logo.startsWith('http') ? (
                <ImageWithFallback
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="w-32 h-40 object-contain p-3"
                />
              ) : (
                <span className="font-bold text-7xl text-gray-600 dark:text-gray-300">{company.logo}</span>
              )}
            </div>
          </div>

          {/* Right Side - Company Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {company.name}
                  </h3>
                  <Badge className={`px-4 py-2 font-semibold border ${difficultyColors[company.difficulty as keyof typeof difficultyColors]} flex items-center gap-2`}>
                    <Target className="w-4 h-4" />
                    {company.difficulty}
                  </Badge>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                  {company.description}
                </p>
              </div>
              
              <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-2 transition-all duration-300 flex-shrink-0 ml-4" />
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-8 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-bold text-xl text-gray-900 dark:text-white">{company.questionCount}</p>
                  <p className="text-sm text-muted-foreground">Practice Questions</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-bold text-xl text-gray-900 dark:text-white">25-45</p>
                  <p className="text-sm text-muted-foreground">Avg. Time (min)</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="font-bold text-xl text-gray-900 dark:text-white">{company.topics.length}</p>
                  <p className="text-sm text-muted-foreground">Focus Areas</p>
                </div>
              </div>
            </div>

            {/* Topics and Action */}
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2 flex-1 mr-6">
                {company.topics.map((topic) => (
                  <Badge 
                    key={topic} 
                    variant="outline" 
                    className="px-3 py-1 text-sm bg-white/80 dark:bg-gray-800/80 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
              
              <Button 
                size="lg"
                className="px-8 py-3 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <span>Start Practicing</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}