import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Lightbulb, Users, MessageCircle, Target } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Company {
  name: string;
  logo: string;
  tips: {
    technical: string[];
    behavioral: string[];
    process: string[];
    culture: string[];
  };
}

interface InterviewTipsProps {
  companies: Company[];
}

export function InterviewTips({ companies }: InterviewTipsProps) {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Interview Tips & Insights</h1>
        <p className="text-muted-foreground">
          Company-specific advice from successful candidates
        </p>
      </div>

      <div className="grid gap-6">
        {companies.map((company) => (
          <Card key={company.name}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                  {company.logo.startsWith('http') ? (
                    <ImageWithFallback
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="font-bold text-lg">{company.logo}</span>
                  )}
                </div>
                <div>
                  <CardTitle>{company.name}</CardTitle>
                  <CardDescription>Interview preparation guide</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="technical" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="technical">Technical</TabsTrigger>
                  <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
                  <TabsTrigger value="process">Process</TabsTrigger>
                  <TabsTrigger value="culture">Culture</TabsTrigger>
                </TabsList>

                <TabsContent value="technical" className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-5 h-5 text-blue-600" />
                    <h3 className="font-medium">Technical Interview Tips</h3>
                  </div>
                  <ul className="space-y-2">
                    {company.tips.technical.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-blue-600">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="behavioral" className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                    <h3 className="font-medium">Behavioral Interview Tips</h3>
                  </div>
                  <ul className="space-y-2">
                    {company.tips.behavioral.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-green-600">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="process" className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                    <h3 className="font-medium">Interview Process</h3>
                  </div>
                  <ul className="space-y-2">
                    {company.tips.process.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-yellow-600">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="culture" className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5 text-purple-600" />
                    <h3 className="font-medium">Company Culture</h3>
                  </div>
                  <ul className="space-y-2">
                    {company.tips.culture.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-purple-600">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}