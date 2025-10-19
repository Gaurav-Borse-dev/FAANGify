import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Calendar } from "./ui/calendar";
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
  Calendar as CalendarIcon,
  Plus,
  Clock,
  Target,
  CheckCircle2,
  Circle,
  Trash2,
  Edit,
} from "lucide-react";

interface StudySession {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  duration: number; // in minutes
  type: "coding" | "system-design" | "behavioral" | "revision" | "mock-interview";
  topics: string[];
  completed: boolean;
  completedAt?: string;
}

interface StudyPlannerProps {
  onBack: () => void;
}

export function StudyPlanner({ onBack }: StudyPlannerProps) {
  const [sessions, setSessions] = useState<StudySession[]>(() => {
    const saved = localStorage.getItem("faangify-study-sessions");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<StudySession | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    startTime: "09:00",
    duration: 60,
    type: "coding" as StudySession["type"],
    topics: "",
  });

  useEffect(() => {
    localStorage.setItem("faangify-study-sessions", JSON.stringify(sessions));
  }, [sessions]);

  const sessionsOnSelectedDate = sessions.filter(
    (s) => s.date === selectedDate.toISOString().split("T")[0]
  );

  const upcomingSessions = sessions
    .filter((s) => !s.completed && new Date(s.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const handleSubmit = () => {
    if (!formData.title || !formData.date) return;

    const sessionData: StudySession = {
      id: editingSession?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      date: formData.date,
      startTime: formData.startTime,
      duration: formData.duration,
      type: formData.type,
      topics: formData.topics.split(",").map((t) => t.trim()).filter(Boolean),
      completed: editingSession?.completed || false,
      completedAt: editingSession?.completedAt,
    };

    if (editingSession) {
      setSessions(sessions.map((s) => (s.id === editingSession.id ? sessionData : s)));
    } else {
      setSessions([...sessions, sessionData]);
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      startTime: "09:00",
      duration: 60,
      type: "coding",
      topics: "",
    });
    setEditingSession(null);
  };

  const startEdit = (session: StudySession) => {
    setEditingSession(session);
    setFormData({
      title: session.title,
      description: session.description,
      date: session.date,
      startTime: session.startTime,
      duration: session.duration,
      type: session.type,
      topics: session.topics.join(", "),
    });
    setIsDialogOpen(true);
  };

  const deleteSession = (id: string) => {
    setSessions(sessions.filter((s) => s.id !== id));
  };

  const toggleComplete = (id: string) => {
    setSessions(
      sessions.map((s) =>
        s.id === id
          ? {
              ...s,
              completed: !s.completed,
              completedAt: !s.completed ? new Date().toISOString() : undefined,
            }
          : s
      )
    );
  };

  const getTypeColor = (type: StudySession["type"]) => {
    const colors = {
      coding: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      "system-design":
        "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      behavioral:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      revision:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      "mock-interview":
        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    };
    return colors[type];
  };

  const totalHoursThisWeek = sessions
    .filter((s) => {
      const sessionDate = new Date(s.date);
      const now = new Date();
      const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
      return sessionDate >= weekStart && s.completed;
    })
    .reduce((sum, s) => sum + s.duration, 0) / 60;

  const completionRate =
    sessions.length > 0
      ? Math.round((sessions.filter((s) => s.completed).length / sessions.length) * 100)
      : 0;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 rounded-2xl p-8 border border-orange-200/50 dark:border-orange-800/30">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Button variant="ghost" onClick={onBack} className="mb-4 -ml-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Study Planner
            </h1>
            <p className="text-lg text-muted-foreground">
              Schedule and track your interview preparation sessions
            </p>
          </div>
          <div className="text-right space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-3xl font-bold text-orange-600">
                  {totalHoursThisWeek.toFixed(1)}h
                </div>
                <p className="text-xs text-muted-foreground">This Week</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">
                  {completionRate}%
                </div>
                <p className="text-xs text-muted-foreground">Completion</p>
              </div>
            </div>
            <Dialog
              open={isDialogOpen}
              onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) resetForm();
              }}
            >
              <DialogTrigger asChild>
                <Button className="bg-orange-600 hover:bg-orange-700 w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Session
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingSession ? "Edit Session" : "Schedule Study Session"}
                  </DialogTitle>
                  <DialogDescription>
                    Plan your interview preparation session
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Session Title
                    </label>
                    <Input
                      placeholder="e.g., Practice Dynamic Programming"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Description
                    </label>
                    <Textarea
                      placeholder="What will you focus on?"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Date
                      </label>
                      <Input
                        type="date"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Start Time
                      </label>
                      <Input
                        type="time"
                        value={formData.startTime}
                        onChange={(e) =>
                          setFormData({ ...formData, startTime: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Duration (minutes)
                      </label>
                      <Select
                        value={formData.duration.toString()}
                        onValueChange={(value) =>
                          setFormData({ ...formData, duration: parseInt(value) })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="90">1.5 hours</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                          <SelectItem value="180">3 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Session Type
                      </label>
                      <Select
                        value={formData.type}
                        onValueChange={(value: any) =>
                          setFormData({ ...formData, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="coding">Coding Practice</SelectItem>
                          <SelectItem value="system-design">
                            System Design
                          </SelectItem>
                          <SelectItem value="behavioral">Behavioral</SelectItem>
                          <SelectItem value="revision">Revision</SelectItem>
                          <SelectItem value="mock-interview">
                            Mock Interview
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Topics (comma separated)
                    </label>
                    <Input
                      placeholder="Arrays, Dynamic Programming, Graphs"
                      value={formData.topics}
                      onChange={(e) =>
                        setFormData({ ...formData, topics: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSubmit} className="flex-1">
                      {editingSession ? "Update Session" : "Schedule Session"}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Study Calendar
            </h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
              modifiers={{
                scheduled: sessions.map((s) => new Date(s.date)),
                completed: sessions
                  .filter((s) => s.completed)
                  .map((s) => new Date(s.date)),
              }}
              modifiersStyles={{
                scheduled: {
                  fontWeight: "bold",
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                },
                completed: {
                  backgroundColor: "rgba(34, 197, 94, 0.2)",
                  color: "rgb(22, 163, 74)",
                },
              }}
            />
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-blue-100 dark:bg-blue-900/30"></div>
                <span className="text-muted-foreground">Scheduled</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-200 dark:bg-green-900/50"></div>
                <span className="text-muted-foreground">Completed</span>
              </div>
            </div>
          </Card>

          {/* Upcoming Sessions */}
          <Card className="p-6 mt-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Upcoming Sessions
            </h3>
            <div className="space-y-3">
              {upcomingSessions.length > 0 ? (
                upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-3 bg-muted rounded-lg text-sm"
                  >
                    <div className="font-medium line-clamp-1">
                      {session.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {new Date(session.date).toLocaleDateString()} at{" "}
                      {session.startTime}
                    </div>
                    <Badge
                      className={`${getTypeColor(session.type)} mt-2 text-xs`}
                    >
                      {session.type}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No upcoming sessions scheduled
                </p>
              )}
            </div>
          </Card>
        </div>

        {/* Sessions on Selected Date */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">
              Sessions on {selectedDate.toLocaleDateString()}
            </h3>
            {sessionsOnSelectedDate.length > 0 ? (
              <div className="space-y-4">
                {sessionsOnSelectedDate.map((session) => (
                  <Card key={session.id} className="p-6 group">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleComplete(session.id)}
                              className="p-0 h-auto"
                            >
                              {session.completed ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                              ) : (
                                <Circle className="w-5 h-5 text-muted-foreground" />
                              )}
                            </Button>
                            <h4
                              className={`font-semibold text-lg ${
                                session.completed
                                  ? "line-through text-muted-foreground"
                                  : ""
                              }`}
                            >
                              {session.title}
                            </h4>
                          </div>
                          {session.description && (
                            <p className="text-sm text-muted-foreground mb-3">
                              {session.description}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => startEdit(session)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteSession(session.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge className={getTypeColor(session.type)}>
                          {session.type}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {session.startTime} ({session.duration}min)
                        </Badge>
                      </div>

                      {session.topics.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {session.topics.map((topic, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {session.completed && session.completedAt && (
                        <div className="text-xs text-green-600 dark:text-green-400">
                          ✓ Completed on{" "}
                          {new Date(session.completedAt).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No sessions scheduled for this date</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      date: selectedDate.toISOString().split("T")[0],
                    });
                    setIsDialogOpen(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Session
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}