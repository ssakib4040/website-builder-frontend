"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Users,
  Plus,
  Trash2,
  Mail,
  Crown,
  UserCheck,
  Pencil,
  Shield,
  Eye,
  Clock,
} from "lucide-react";

type Role = "owner" | "admin" | "editor" | "viewer";

interface Member {
  id: string;
  name: string;
  email: string;
  role: Role;
  joinedAt: string;
  avatarInitials: string;
  avatarColor: string;
  isCurrentUser?: boolean;
}

interface PendingInvite {
  id: string;
  email: string;
  role: Role;
  sentAt: string;
}

const roleConfig: Record<
  Role,
  { label: string; icon: typeof Crown; color: string; description: string }
> = {
  owner: {
    label: "Owner",
    icon: Crown,
    color:
      "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400",
    description: "Full access including billing and deletion",
  },
  admin: {
    label: "Admin",
    icon: Shield,
    color:
      "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400",
    description: "Manage members, settings, and all content",
  },
  editor: {
    label: "Editor",
    icon: Pencil,
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400",
    description: "Create and edit pages, media, and data",
  },
  viewer: {
    label: "Viewer",
    icon: Eye,
    color: "bg-muted text-muted-foreground border-border",
    description: "View-only access to all content",
  },
};

const mockMembers: Member[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah@company.com",
    role: "owner",
    joinedAt: "6 months ago",
    avatarInitials: "SC",
    avatarColor: "bg-violet-500",
    isCurrentUser: true,
  },
  {
    id: "2",
    name: "Alex Park",
    email: "alex@company.com",
    role: "admin",
    joinedAt: "4 months ago",
    avatarInitials: "AP",
    avatarColor: "bg-blue-500",
  },
  {
    id: "3",
    name: "Maya Torres",
    email: "maya@company.com",
    role: "editor",
    joinedAt: "2 months ago",
    avatarInitials: "MT",
    avatarColor: "bg-emerald-500",
  },
  {
    id: "4",
    name: "David Kim",
    email: "dkim@agency.com",
    role: "editor",
    joinedAt: "3 weeks ago",
    avatarInitials: "DK",
    avatarColor: "bg-orange-500",
  },
  {
    id: "5",
    name: "Emma Wilson",
    email: "emma@company.com",
    role: "viewer",
    joinedAt: "1 week ago",
    avatarInitials: "EW",
    avatarColor: "bg-pink-500",
  },
];

const mockPendingInvites: PendingInvite[] = [
  {
    id: "p1",
    email: "james@newstartup.io",
    role: "editor",
    sentAt: "2 days ago",
  },
  {
    id: "p2",
    email: "design@freelancer.com",
    role: "viewer",
    sentAt: "5 days ago",
  },
];

export default function TeamPage() {
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [invites, setInvites] = useState<PendingInvite[]>(mockPendingInvites);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Role>("editor");
  const [inviting, setInviting] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleInvite = () => {
    if (!inviteEmail.trim()) return;
    setInviting(true);
    setTimeout(() => {
      setInvites((prev) => [
        {
          id: String(Date.now()),
          email: inviteEmail.trim(),
          role: inviteRole,
          sentAt: "Just now",
        },
        ...prev,
      ]);
      setInviteEmail("");
      setInviting(false);
      setInviteOpen(false);
    }, 1000);
  };

  const handleChangeRole = (memberId: string, newRole: Role) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, role: newRole } : m)),
    );
  };

  const handleRemoveMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    setRemovingId(null);
  };

  const handleRevoke = (id: string) => {
    setInvites((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <DashboardShell>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Team</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage team members and permissions
            </p>
          </div>
          <Button size="sm" onClick={() => setInviteOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Invite Member
          </Button>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* Members */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-muted-foreground" />
                Members{" "}
                <span className="text-muted-foreground font-normal">
                  ({members.length})
                </span>
              </h2>
            </div>
            <div className="border border-border rounded-xl overflow-hidden bg-card">
              {members.map((member, idx) => {
                const {
                  label,
                  icon: RoleIcon,
                  color,
                } = roleConfig[member.role];
                return (
                  <div
                    key={member.id}
                    className={`flex items-center gap-4 px-5 py-4 ${idx < members.length - 1 ? "border-b border-border" : ""} hover:bg-muted/20 transition-colors`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-9 h-9 rounded-full ${member.avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                    >
                      {member.avatarInitials}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">
                          {member.name}
                        </span>
                        {member.isCurrentUser && (
                          <span className="text-[10px] text-muted-foreground">
                            (you)
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {member.email}
                        </span>
                      </div>
                    </div>

                    {/* Role */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground hidden sm:block">
                        Joined {member.joinedAt}
                      </span>
                      {member.isCurrentUser || member.role === "owner" ? (
                        <Badge variant="outline" className={`text-xs ${color}`}>
                          <RoleIcon className="w-2.5 h-2.5 mr-1" />
                          {label}
                        </Badge>
                      ) : (
                        <Select
                          value={member.role}
                          onValueChange={(v) =>
                            handleChangeRole(member.id, v as Role)
                          }
                        >
                          <SelectTrigger className="h-7 text-xs w-28 border-border">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {(["admin", "editor", "viewer"] as Role[]).map(
                              (r) => {
                                const { label: rl, icon: RI } = roleConfig[r];
                                return (
                                  <SelectItem key={r} value={r}>
                                    <div className="flex items-center gap-1.5">
                                      <RI className="w-3 h-3" />
                                      {rl}
                                    </div>
                                  </SelectItem>
                                );
                              },
                            )}
                          </SelectContent>
                        </Select>
                      )}

                      {!member.isCurrentUser && member.role !== "owner" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive hover:text-destructive"
                          onClick={() => setRemovingId(member.id)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Pending invites */}
          {invites.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-muted-foreground" />
                Pending Invites{" "}
                <span className="text-muted-foreground font-normal">
                  ({invites.length})
                </span>
              </h2>
              <div className="border border-border rounded-xl overflow-hidden bg-card">
                {invites.map((invite, idx) => {
                  const {
                    label,
                    icon: RoleIcon,
                    color,
                  } = roleConfig[invite.role];
                  return (
                    <div
                      key={invite.id}
                      className={`flex items-center gap-4 px-5 py-4 ${idx < invites.length - 1 ? "border-b border-border" : ""} hover:bg-muted/20 transition-colors`}
                    >
                      <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground">
                          {invite.email}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          Sent {invite.sentAt}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className={`text-xs ${color}`}>
                          <RoleIcon className="w-2.5 h-2.5 mr-1" />
                          {label}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7"
                          onClick={() => handleRevoke(invite.id)}
                        >
                          Revoke
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Role guide */}
          <section>
            <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-muted-foreground" />
              Role Permissions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {(["owner", "admin", "editor", "viewer"] as Role[]).map((r) => {
                const { label, icon: Icon, color, description } = roleConfig[r];
                return (
                  <div
                    key={r}
                    className="border border-border rounded-xl p-4 bg-card"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      <Badge variant="outline" className={`text-xs ${color}`}>
                        {label}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      {/* Invite modal */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Email address
              </label>
              <Input
                type="email"
                placeholder="colleague@company.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleInvite()}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Role
              </label>
              <Select
                value={inviteRole}
                onValueChange={(v) => setInviteRole(v as Role)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["admin", "editor", "viewer"] as Role[]).map((r) => {
                    const { label, icon: Icon, description } = roleConfig[r];
                    return (
                      <SelectItem key={r} value={r}>
                        <div className="flex items-start gap-2">
                          <Icon className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                          <div>
                            <div className="font-medium">{label}</div>
                            <div className="text-xs text-muted-foreground">
                              {description}
                            </div>
                          </div>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInviteOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleInvite}
              disabled={inviting || !inviteEmail.trim()}
            >
              {inviting ? "Sending…" : "Send Invite"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remove confirmation */}
      <Dialog open={!!removingId} onOpenChange={() => setRemovingId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Team Member?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">
              {members.find((m) => m.id === removingId)?.name}
            </strong>{" "}
            will lose access to this project immediately.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRemovingId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => removingId && handleRemoveMember(removingId)}
            >
              <Users className="w-4 h-4 mr-2" />
              Remove Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  );
}
