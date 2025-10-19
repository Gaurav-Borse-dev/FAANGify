import { CodeCompilerBot } from "./CodeCompilerBot";

interface Question {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  estimatedTime: number;
  company: string;
  description: string;
  examples: Array<{ input: string; output: string; explanation?: string }>;
  constraints: string[];
  hints: string[];
  solution: string;
}

interface CodingChallengeProps {
  question: Question;
  onBack: () => void;
  onComplete: (questionId: string, code: string, timeTaken: number) => void;
}

export function CodingChallenge({ question, onBack, onComplete }: CodingChallengeProps) {
  const handleComplete = (code: string, timeTaken: number) => {
    onComplete(question.id, code, timeTaken);
  };

  return (
    <CodeCompilerBot 
      question={question} 
      onBack={onBack} 
      onComplete={handleComplete}
    />
  );
}