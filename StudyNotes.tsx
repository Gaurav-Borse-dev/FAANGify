import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
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
  BookOpen,
  Plus,
  Search,
  Edit,
  Trash2,
  Tag,
  Calendar,
  Filter,
} from "lucide-react";

interface StudyNote {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  relatedQuestion?: string;
  company?: string;
  createdAt: string;
  updatedAt: string;
  isPinned: boolean;
}

interface StudyNotesProps {
  onBack: () => void;
}

export function StudyNotes({ onBack }: StudyNotesProps) {
  const [notes, setNotes] = useState<StudyNote[]>(() => {
    const saved = localStorage.getItem("faangify-study-notes");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<StudyNote | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "algorithms",
    tags: "",
    relatedQuestion: "",
    company: "",
  });

  useEffect(() => {
    localStorage.setItem("faangify-study-notes", JSON.stringify(notes));
  }, [notes]);

  const categories = [
    "algorithms",
    "data-structures",
    "system-design",
    "behavioral",
    "company-specific",
    "general",
  ];

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || note.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const pinnedNotes = filteredNotes.filter((n) => n.isPinned);
  const regularNotes = filteredNotes.filter((n) => !n.isPinned);

  const handleSubmit = () => {
    if (!formData.title || !formData.content) return;

    const noteData: StudyNote = {
      id: editingNote?.id || Date.now().toString(),
      title: formData.title,
      content: formData.content,
      category: formData.category,
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      relatedQuestion: formData.relatedQuestion || undefined,
      company: formData.company || undefined,
      createdAt: editingNote?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPinned: editingNote?.isPinned || false,
    };

    if (editingNote) {
      setNotes(notes.map((n) => (n.id === editingNote.id ? noteData : n)));
    } else {
      setNotes([noteData, ...notes]);
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      category: "algorithms",
      tags: "",
      relatedQuestion: "",
      company: "",
    });
    setEditingNote(null);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const togglePin = (id: string) => {
    setNotes(
      notes.map((n) => (n.id === id ? { ...n, isPinned: !n.isPinned } : n))
    );
  };

  const startEdit = (note: StudyNote) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      content: note.content,
      category: note.category,
      tags: note.tags.join(", "),
      relatedQuestion: note.relatedQuestion || "",
      company: note.company || "",
    });
    setIsDialogOpen(true);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      algorithms: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      "data-structures": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      "system-design": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      behavioral: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      "company-specific": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      general: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
    };
    return colors[category] || colors.general;
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl p-8 border border-green-200/50 dark:border-green-800/30">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Button variant="ghost" onClick={onBack} className="mb-4 -ml-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Study Notes
            </h1>
            <p className="text-lg text-muted-foreground">
              Create and organize your learning notes for better retention
            </p>
          </div>
          <div className="text-right space-y-2">
            <div className="text-5xl font-bold text-green-600">{notes.length}</div>
            <p className="text-sm text-muted-foreground">Total Notes</p>
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  New Note
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingNote ? "Edit Note" : "Create New Note"}
                  </DialogTitle>
                  <DialogDescription>
                    Add your study notes, insights, and key learnings
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Title
                    </label>
                    <Input
                      placeholder="Note title..."
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Content
                    </label>
                    <Textarea
                      placeholder="Your notes here..."
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      rows={8}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
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
                              {cat.replace("-", " ")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Tags (comma separated)
                      </label>
                      <Input
                        placeholder="tag1, tag2, tag3"
                        value={formData.tags}
                        onChange={(e) =>
                          setFormData({ ...formData, tags: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Related Question (optional)
                      </label>
                      <Input
                        placeholder="Question ID or title"
                        value={formData.relatedQuestion}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            relatedQuestion: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Company (optional)
                      </label>
                      <Input
                        placeholder="Google, Meta, etc."
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSubmit} className="flex-1">
                      {editingNote ? "Update Note" : "Create Note"}
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

      {/* Filters */}
      <div className="bg-card rounded-2xl p-6 border shadow-sm space-y-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search notes by title, content, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[200px] h-12">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat.replace("-", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="space-y-6">
        {pinnedNotes.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Pinned Notes ({pinnedNotes.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {pinnedNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={startEdit}
                  onDelete={deleteNote}
                  onTogglePin={togglePin}
                  getCategoryColor={getCategoryColor}
                />
              ))}
            </div>
          </div>
        )}

        {regularNotes.length > 0 && (
          <div>
            {pinnedNotes.length > 0 && (
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                All Notes ({regularNotes.length})
              </h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {regularNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={startEdit}
                  onDelete={deleteNote}
                  onTogglePin={togglePin}
                  getCategoryColor={getCategoryColor}
                />
              ))}
            </div>
          </div>
        )}

        {filteredNotes.length === 0 && (
          <div className="text-center py-16 bg-card rounded-2xl border">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto opacity-50 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Notes Found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || categoryFilter !== "all"
                ? "Try adjusting your filters"
                : "Start creating study notes to organize your learning"}
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Note
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function NoteCard({
  note,
  onEdit,
  onDelete,
  onTogglePin,
  getCategoryColor,
}: {
  note: StudyNote;
  onEdit: (note: StudyNote) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
  getCategoryColor: (category: string) => string;
}) {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 group">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Badge className={getCategoryColor(note.category)} variant="outline">
              {note.category.replace("-", " ")}
            </Badge>
            <h3 className="font-semibold text-lg mt-2 line-clamp-2">
              {note.title}
            </h3>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onTogglePin(note.id)}
              title={note.isPinned ? "Unpin" : "Pin"}
            >
              📌
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onEdit(note)}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(note.id)}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-4">
          {note.content}
        </p>

        {note.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {note.tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(note.updatedAt).toLocaleDateString()}
          </div>
          {note.company && <Badge variant="outline">{note.company}</Badge>}
        </div>
      </div>
    </Card>
  );
}