"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Inbox,
  Mail,
  MailOpen,
  Trash2,
  Download,
  AlertTriangle,
  ChevronRight,
  Calendar,
  User,
  AtSign,
  MessageSquare,
} from "lucide-react";

type SubmissionStatus = "unread" | "read" | "spam";

interface Submission {
  id: string;
  name: string;
  email: string;
  message: string;
  receivedAt: string;
  status: SubmissionStatus;
  formId: string;
}

interface Form {
  id: string;
  name: string;
  path: string;
  submissions: number;
  unread: number;
  lastSubmission: string;
}

const mockForms: Form[] = [
  {
    id: "f1",
    name: "Contact Form",
    path: "/contact",
    submissions: 84,
    unread: 7,
    lastSubmission: "10 minutes ago",
  },
  {
    id: "f2",
    name: "Newsletter Signup",
    path: "/",
    submissions: 312,
    unread: 24,
    lastSubmission: "2 hours ago",
  },
  {
    id: "f3",
    name: "Beta Waitlist",
    path: "/waitlist",
    submissions: 1204,
    unread: 0,
    lastSubmission: "Yesterday",
  },
  {
    id: "f4",
    name: "Support Request",
    path: "/contact",
    submissions: 56,
    unread: 3,
    lastSubmission: "3 hours ago",
  },
];

const mockSubmissions: Submission[] = [
  {
    id: "s1",
    formId: "f1",
    name: "Jessica Liu",
    email: "jliu@example.com",
    message:
      "Hi there! I'm interested in the Pro plan but I have a few questions about the page limit. Can someone reach out to me?",
    receivedAt: "10 minutes ago",
    status: "unread",
  },
  {
    id: "s2",
    formId: "f1",
    name: "Marcus Webb",
    email: "marcus@somestartup.io",
    message:
      "Would love to schedule a demo. We have a team of 12 and are looking for a no-code solution for our marketing site.",
    receivedAt: "42 minutes ago",
    status: "unread",
  },
  {
    id: "s3",
    formId: "f1",
    name: "Priya Nair",
    email: "priya.n@designco.com",
    message:
      "Do you offer white-label options? We're an agency and want to resell your platform to clients.",
    receivedAt: "1 hour ago",
    status: "unread",
  },
  {
    id: "s4",
    formId: "f1",
    name: "David Okafor",
    email: "d.okafor@gmail.com",
    message:
      "I noticed a small typo on the pricing page. The word 'Unlimited' is spelled 'Unlimtied' in the Starter plan section.",
    receivedAt: "3 hours ago",
    status: "read",
  },
  {
    id: "s5",
    formId: "f1",
    name: "Samantha Reed",
    email: "sam@reeddesigns.com",
    message:
      "Loved the product! Just signed up for the annual plan. Any chance you could send me the receipt again? It didn't arrive in my inbox.",
    receivedAt: "5 hours ago",
    status: "read",
  },
  {
    id: "s6",
    formId: "f1",
    name: "Get Rich Quick",
    email: "promo@spam123.xyz",
    message:
      "Congratulations! You have been selected for a $10,000 prize. Click here to claim: http://spam.link",
    receivedAt: "6 hours ago",
    status: "spam",
  },
  {
    id: "s7",
    formId: "f1",
    name: "Tom Bradley",
    email: "tom@bradleyco.com",
    message:
      "Quick question — does the plan include eCommerce features or is that a separate add-on?",
    receivedAt: "Yesterday",
    status: "read",
  },
];

const statusBadge: Record<
  SubmissionStatus,
  { label: string; className: string }
> = {
  unread: {
    label: "Unread",
    className:
      "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400",
  },
  read: {
    label: "Read",
    className: "bg-muted text-muted-foreground border-border",
  },
  spam: {
    label: "Spam",
    className: "bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400",
  },
};

export default function FormsPage() {
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>(mockSubmissions);
  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);
  const [filter, setFilter] = useState<SubmissionStatus | "all">("all");

  const formSubmissions = submissions.filter(
    (s) => s.formId === selectedForm?.id,
  );
  const filtered = formSubmissions.filter(
    (s) => filter === "all" || s.status === filter,
  );

  const handleMarkRead = (id: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "read" } : s)),
    );
    if (selectedSubmission?.id === id) {
      setSelectedSubmission((prev) =>
        prev ? { ...prev, status: "read" } : null,
      );
    }
  };

  const handleMarkSpam = (id: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "spam" } : s)),
    );
    if (selectedSubmission?.id === id) {
      setSelectedSubmission((prev) =>
        prev ? { ...prev, status: "spam" } : null,
      );
    }
  };

  const handleDelete = (id: string) => {
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
    if (selectedSubmission?.id === id) setSelectedSubmission(null);
  };

  const openSubmission = (sub: Submission) => {
    setSelectedSubmission(sub);
    handleMarkRead(sub.id);
  };

  if (selectedForm) {
    return (
      <DashboardShell>
        <div className="flex flex-col h-full">
          <div className="border-b border-border px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedForm(null)}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                Forms
              </button>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-semibold text-foreground">
                {selectedForm.name}
              </span>
              {selectedForm.unread > 0 && (
                <Badge className="text-xs bg-foreground text-background">
                  {selectedForm.unread} new
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Export CSV
              </Button>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="border-b border-border px-6 flex items-center gap-1">
            {(["all", "unread", "read", "spam"] as const).map((f) => {
              const count =
                f === "all"
                  ? formSubmissions.length
                  : formSubmissions.filter((s) => s.status === f).length;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${
                    filter === f
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f}{" "}
                  {count > 0 && <span className="ml-1 text-xs">({count})</span>}
                </button>
              );
            })}
          </div>

          <div className="flex-1 overflow-auto">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Inbox className="w-10 h-10 text-muted-foreground/40 mb-3" />
                <p className="text-sm font-medium text-muted-foreground">
                  No submissions
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filtered.map((sub) => {
                  const { label, className } = statusBadge[sub.status];
                  return (
                    <div
                      key={sub.id}
                      className={`px-6 py-4 hover:bg-muted/20 transition-colors cursor-pointer ${sub.status === "unread" ? "bg-muted/10" : ""}`}
                      onClick={() => openSubmission(sub)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                            <User className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-sm font-medium ${sub.status === "unread" ? "text-foreground" : "text-muted-foreground"}`}
                              >
                                {sub.name}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {sub.email}
                              </span>
                              <Badge
                                variant="outline"
                                className={`text-[10px] ${className}`}
                              >
                                {label}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-0.5 truncate">
                              {sub.message}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs text-muted-foreground">
                            {sub.receivedAt}
                          </span>
                          <div
                            className="flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {sub.status !== "read" && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => handleMarkRead(sub.id)}
                              >
                                <MailOpen className="w-3.5 h-3.5" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => handleMarkSpam(sub.id)}
                            >
                              <AlertTriangle className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive hover:text-destructive"
                              onClick={() => handleDelete(sub.id)}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Submission detail */}
        <Dialog
          open={!!selectedSubmission}
          onOpenChange={() => setSelectedSubmission(null)}
        >
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                Submission from {selectedSubmission?.name}
              </DialogTitle>
            </DialogHeader>
            {selectedSubmission && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-foreground font-medium">
                      {selectedSubmission.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <AtSign className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {selectedSubmission.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm col-span-2">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {selectedSubmission.receivedAt}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Message
                    </span>
                  </div>
                  <div className="bg-muted/40 rounded-lg p-4 text-sm text-foreground border border-border whitespace-pre-wrap">
                    {selectedSubmission.message}
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    asChild
                  >
                    <a href={`mailto:${selectedSubmission.email}`}>
                      <Mail className="w-3.5 h-3.5 mr-2" /> Reply
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMarkSpam(selectedSubmission.id)}
                  >
                    <AlertTriangle className="w-3.5 h-3.5 mr-2" /> Spam
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(selectedSubmission.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="flex flex-col h-full">
        <div className="border-b border-border px-6 py-4">
          <h1 className="text-lg font-semibold text-foreground">Forms</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            View and manage form submissions from your site
          </p>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockForms.map((form) => (
              <button
                key={form.id}
                className="border border-border rounded-xl p-5 bg-card hover:border-foreground/30 transition-all text-left group"
                onClick={() => {
                  setSelectedForm(form);
                  setFilter("all");
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Inbox className="w-5 h-5 text-muted-foreground" />
                  </div>
                  {form.unread > 0 && (
                    <Badge className="text-xs bg-foreground text-background">
                      {form.unread} new
                    </Badge>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-foreground group-hover:underline">
                  {form.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                  {form.path}
                </p>
                <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {form.submissions.toLocaleString()}
                  </span>{" "}
                  submissions
                  <span>·</span>
                  <span>Last: {form.lastSubmission}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
