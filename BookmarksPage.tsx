import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  ArrowLeft,
  Bookmark,
  Search,
  Trash2,
  FolderOpen,
  Plus,
  Tag,
} from "lucide-react";

interface BookmarkedItem {
  id: string;
  type: "question" | "note" | "resource";
  title: string;
  description?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  topic?: string;
  company?: string;
  tags: string[];
  bookmarkedAt: string;
  folder?: string;
}

interface BookmarksPageProps {
  onBack: () => void;
  onOpenQuestion?: (questionId: string) => void;
}

export function BookmarksPage({ onBack, onOpenQuestion }: BookmarksPageProps) {
  const [bookmarks, setBookmarks] = useState<BookmarkedItem[]>(() => {
    const saved = localStorage.getItem("faangify-bookmarks");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  useEffect(() => {
    localStorage.setItem("faangify-bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const folders = ["all", ...new Set(bookmarks.map((b) => b.folder).filter(Boolean))];
  
  const filteredBookmarks = bookmarks.filter((bookmark) => {
    const matchesSearch =
      bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFolder = selectedFolder === "all" || bookmark.folder === selectedFolder;
    const matchesType = selectedType === "all" || bookmark.type === selectedType;
    return matchesSearch && matchesFolder && matchesType;
  });

  const removeBookmark = (id: string) => {
    setBookmarks(bookmarks.filter((b) => b.id !== id));
  };

  const getDifficultyColor = (difficulty?: string) => {
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

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-2xl p-8 border border-purple-200/50 dark:border-purple-800/30">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Button
              variant="ghost"
              onClick={onBack}
              className="mb-4 -ml-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Bookmarks & Saved Items
            </h1>
            <p className="text-lg text-muted-foreground">
              Your collection of saved questions, notes, and resources
            </p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold text-purple-600">
              {bookmarks.length}
            </div>
            <p className="text-sm text-muted-foreground">Total Bookmarks</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-2xl p-6 border shadow-sm space-y-4">
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search bookmarks by title, tags, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12"
            />
          </div>
        </div>

        <Tabs value={selectedType} onValueChange={setSelectedType}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Items ({bookmarks.length})</TabsTrigger>
            <TabsTrigger value="question">
              Questions ({bookmarks.filter((b) => b.type === "question").length})
            </TabsTrigger>
            <TabsTrigger value="note">
              Notes ({bookmarks.filter((b) => b.type === "note").length})
            </TabsTrigger>
            <TabsTrigger value="resource">
              Resources ({bookmarks.filter((b) => b.type === "resource").length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {folders.length > 1 && (
          <div className="flex gap-2 flex-wrap">
            {folders.map((folder) => (
              <Button
                key={folder}
                variant={selectedFolder === folder ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFolder(folder)}
              >
                <FolderOpen className="w-4 h-4 mr-2" />
                {folder === "all" ? "All Folders" : folder}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Bookmarks Grid */}
      {filteredBookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredBookmarks.map((bookmark) => (
            <Card
              key={bookmark.id}
              className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Bookmark className="w-4 h-4 text-purple-600 fill-purple-600" />
                      <Badge variant="outline" className="text-xs">
                        {bookmark.type}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {bookmark.title}
                    </h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBookmark(bookmark.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>

                {/* Description */}
                {bookmark.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {bookmark.description}
                  </p>
                )}

                {/* Metadata */}
                <div className="flex flex-wrap gap-2">
                  {bookmark.difficulty && (
                    <Badge className={getDifficultyColor(bookmark.difficulty)}>
                      {bookmark.difficulty}
                    </Badge>
                  )}
                  {bookmark.topic && (
                    <Badge variant="outline">{bookmark.topic}</Badge>
                  )}
                  {bookmark.company && (
                    <Badge variant="outline">{bookmark.company}</Badge>
                  )}
                </div>

                {/* Tags */}
                {bookmark.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {bookmark.tags.map((tag, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 text-xs text-muted-foreground"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </div>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-xs text-muted-foreground">
                    {new Date(bookmark.bookmarkedAt).toLocaleDateString()}
                  </span>
                  {bookmark.type === "question" && onOpenQuestion && (
                    <Button
                      size="sm"
                      onClick={() => onOpenQuestion(bookmark.id)}
                    >
                      Open Question
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-card rounded-2xl border">
          <Bookmark className="w-16 h-16 text-muted-foreground mx-auto opacity-50 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Bookmarks Found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || selectedFolder !== "all" || selectedType !== "all"
              ? "Try adjusting your filters"
              : "Start bookmarking questions, notes, and resources"}
          </p>
          {(searchTerm || selectedFolder !== "all" || selectedType !== "all") && (
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedFolder("all");
                setSelectedType("all");
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}