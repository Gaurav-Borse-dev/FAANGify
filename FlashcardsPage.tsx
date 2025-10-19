import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  ArrowLeft,
  Plus,
  Play,
  RotateCw,
  Edit,
  Trash2,
  Sparkles,
  Check,
  X,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  masteryLevel: number; // 0-100
  lastReviewed?: string;
  timesReviewed: number;
  timesCorrect: number;
}

interface FlashcardsPageProps {
  onBack: () => void;
}

export function FlashcardsPage({ onBack }: FlashcardsPageProps) {
  const [flashcards, setFlashcards] = useState<Flashcard[]>(() => {
    const saved = localStorage.getItem("faangify-flashcards");
    return saved
      ? JSON.parse(saved)
      : [
          // Default flashcards
          {
            id: "1",
            question: "What is the time complexity of Binary Search?",
            answer: "O(log n) - Binary search divides the search space in half with each comparison, resulting in logarithmic time complexity.",
            category: "algorithms",
            difficulty: "Easy",
            tags: ["binary-search", "time-complexity"],
            masteryLevel: 0,
            timesReviewed: 0,
            timesCorrect: 0,
          },
          {
            id: "2",
            question: "Explain the difference between Stack and Queue",
            answer: "Stack follows LIFO (Last In First Out) principle where elements are added and removed from the same end. Queue follows FIFO (First In First Out) where elements are added at one end and removed from the other.",
            category: "data-structures",
            difficulty: "Easy",
            tags: ["stack", "queue", "fundamentals"],
            masteryLevel: 0,
            timesReviewed: 0,
            timesCorrect: 0,
          },
        ];
  });

  const [studyMode, setStudyMode] = useState<"browse" | "study">("browse");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "algorithms",
    difficulty: "Medium" as "Easy" | "Medium" | "Hard",
    tags: "",
  });

  useEffect(() => {
    localStorage.setItem("faangify-flashcards", JSON.stringify(flashcards));
  }, [flashcards]);

  const categories = [
    "algorithms",
    "data-structures",
    "system-design",
    "behavioral",
    "coding-patterns",
  ];

  const filteredCards =
    categoryFilter === "all"
      ? flashcards
      : flashcards.filter((c) => c.category === categoryFilter);

  const handleSubmit = () => {
    if (!formData.question || !formData.answer) return;

    const cardData: Flashcard = {
      id: editingCard?.id || Date.now().toString(),
      question: formData.question,
      answer: formData.answer,
      category: formData.category,
      difficulty: formData.difficulty,
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      masteryLevel: editingCard?.masteryLevel || 0,
      lastReviewed: editingCard?.lastReviewed,
      timesReviewed: editingCard?.timesReviewed || 0,
      timesCorrect: editingCard?.timesCorrect || 0,
    };

    if (editingCard) {
      setFlashcards(flashcards.map((c) => (c.id === editingCard.id ? cardData : c)));
    } else {
      setFlashcards([...flashcards, cardData]);
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      question: "",
      answer: "",
      category: "algorithms",
      difficulty: "Medium",
      tags: "",
    });
    setEditingCard(null);
  };

  const startEdit = (card: Flashcard) => {
    setEditingCard(card);
    setFormData({
      question: card.question,
      answer: card.answer,
      category: card.category,
      difficulty: card.difficulty,
      tags: card.tags.join(", "),
    });
    setIsDialogOpen(true);
  };

  const deleteCard = (id: string) => {
    setFlashcards(flashcards.filter((c) => c.id !== id));
  };

  const markCard = (correct: boolean) => {
    const card = filteredCards[currentCardIndex];
    const updatedCard = {
      ...card,
      timesReviewed: card.timesReviewed + 1,
      timesCorrect: card.timesCorrect + (correct ? 1 : 0),
      lastReviewed: new Date().toISOString(),
      masteryLevel: Math.min(
        100,
        Math.max(
          0,
          card.masteryLevel + (correct ? 10 : -5)
        )
      ),
    };

    setFlashcards(
      flashcards.map((c) => (c.id === card.id ? updatedCard : c))
    );

    // Move to next card
    if (currentCardIndex < filteredCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      setStudyMode("browse");
      setCurrentCardIndex(0);
      setIsFlipped(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Hard":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getMasteryColor = (level: number) => {
    if (level >= 80) return "text-green-600";
    if (level >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  if (studyMode === "study" && filteredCards.length > 0) {
    const currentCard = filteredCards[currentCardIndex];
    const progress = ((currentCardIndex + 1) / filteredCards.length) * 100;

    return (
      <div className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center space-y-8 max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="w-full space-y-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setStudyMode("browse")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Exit Study Mode
            </Button>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1">
                Card {currentCardIndex + 1} of {filteredCards.length}
              </div>
              <Progress value={progress} className="w-32" />
            </div>
          </div>
        </div>

        {/* Flashcard */}
        <div
          className="w-full max-w-2xl aspect-[16/10] perspective-1000 cursor-pointer"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div
            className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
              isFlipped ? "rotate-y-180" : ""
            }`}
          >
            {/* Front */}
            <Card
              className={`absolute inset-0 backface-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-2 border-blue-200 dark:border-blue-800 flex flex-col items-center justify-center p-12 ${
                isFlipped ? "hidden" : ""
              }`}
            >
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center gap-2 mb-8">
                  <Badge className={getDifficultyColor(currentCard.difficulty)}>
                    {currentCard.difficulty}
                  </Badge>
                  <Badge variant="outline">{currentCard.category}</Badge>
                </div>
                <h2 className="text-3xl font-bold leading-relaxed">
                  {currentCard.question}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Click to reveal answer
                </p>
              </div>
            </Card>

            {/* Back */}
            <Card
              className={`absolute inset-0 backface-hidden bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-2 border-green-200 dark:border-green-800 p-12 ${
                !isFlipped ? "hidden" : ""
              }`}
            >
              <div className="h-full flex flex-col">
                <div className="flex-1 overflow-y-auto">
                  <p className="text-lg leading-relaxed">{currentCard.answer}</p>
                </div>
                <div className="flex items-center justify-between mt-6 pt-6 border-t">
                  <div className="text-sm text-muted-foreground">
                    Mastery:{" "}
                    <span className={getMasteryColor(currentCard.masteryLevel)}>
                      {currentCard.masteryLevel}%
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {currentCard.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Controls */}
        {isFlipped && (
          <div className="flex gap-4">
            <Button
              size="lg"
              variant="outline"
              onClick={() => markCard(false)}
              className="border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/30"
            >
              <X className="w-5 h-5 mr-2 text-red-600" />
              Incorrect
            </Button>
            <Button
              size="lg"
              onClick={() => markCard(true)}
              className="bg-green-600 hover:bg-green-700"
            >
              <Check className="w-5 h-5 mr-2" />
              Correct
            </Button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            disabled={currentCardIndex === 0}
            onClick={() => {
              setCurrentCardIndex(currentCardIndex - 1);
              setIsFlipped(false);
            }}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            disabled={currentCardIndex === filteredCards.length - 1}
            onClick={() => {
              setCurrentCardIndex(currentCardIndex + 1);
              setIsFlipped(false);
            }}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl p-8 border border-blue-200/50 dark:border-blue-800/30">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Button variant="ghost" onClick={onBack} className="mb-4 -ml-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Flashcards
            </h1>
            <p className="text-lg text-muted-foreground">
              Quick revision and spaced repetition learning
            </p>
          </div>
          <div className="text-right space-y-2">
            <div className="text-5xl font-bold text-blue-600">
              {flashcards.length}
            </div>
            <p className="text-sm text-muted-foreground">Total Cards</p>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  if (filteredCards.length > 0) {
                    setStudyMode("study");
                    setCurrentCardIndex(0);
                    setIsFlipped(false);
                  }
                }}
                disabled={filteredCards.length === 0}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Play className="w-4 h-4 mr-2" />
                Study Now
              </Button>
              <Dialog
                open={isDialogOpen}
                onOpenChange={(open) => {
                  setIsDialogOpen(open);
                  if (!open) resetForm();
                }}
              >
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    New Card
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingCard ? "Edit Flashcard" : "Create New Flashcard"}
                    </DialogTitle>
                    <DialogDescription>
                      Add a new flashcard for quick revision
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Question
                      </label>
                      <Textarea
                        placeholder="What's the question?"
                        value={formData.question}
                        onChange={(e) =>
                          setFormData({ ...formData, question: e.target.value })
                        }
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Answer
                      </label>
                      <Textarea
                        placeholder="What's the answer?"
                        value={formData.answer}
                        onChange={(e) =>
                          setFormData({ ...formData, answer: e.target.value })
                        }
                        rows={5}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Category
                        </label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) =>
                            setFormData({ ...formData, category: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Difficulty
                        </label>
                        <Select
                          value={formData.difficulty}
                          onValueChange={(value: any) =>
                            setFormData({ ...formData, difficulty: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Easy">Easy</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Tags
                        </label>
                        <Input
                          placeholder="tag1, tag2"
                          value={formData.tags}
                          onChange={(e) =>
                            setFormData({ ...formData, tags: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleSubmit} className="flex-1">
                        {editingCard ? "Update Card" : "Create Card"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          resetForm();
                          setIsDialogOpen(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-card rounded-2xl p-6 border shadow-sm">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[200px] h-12">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Cards Grid */}
      {filteredCards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCards.map((card) => (
            <Card
              key={card.id}
              className="p-6 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getDifficultyColor(card.difficulty)}>
                      {card.difficulty}
                    </Badge>
                    <Badge variant="outline">{card.category}</Badge>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEdit(card)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteCard(card.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 line-clamp-2">
                    {card.question}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {card.answer}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Mastery Level</span>
                    <span className={getMasteryColor(card.masteryLevel)}>
                      {card.masteryLevel}%
                    </span>
                  </div>
                  <Progress value={card.masteryLevel} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Reviewed: {card.timesReviewed}</span>
                    <span>
                      Correct: {card.timesCorrect}/{card.timesReviewed}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-card rounded-2xl border">
          <Sparkles className="w-16 h-16 text-muted-foreground mx-auto opacity-50 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Flashcards Found</h3>
          <p className="text-muted-foreground mb-4">
            {categoryFilter !== "all"
              ? "Try selecting a different category"
              : "Create flashcards to start learning"}
          </p>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Flashcard
          </Button>
        </div>
      )}
    </div>
  );
}