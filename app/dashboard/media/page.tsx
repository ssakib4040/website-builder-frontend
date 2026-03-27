"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Upload,
  Search,
  MoreHorizontal,
  Copy,
  Trash2,
  Download,
  FileImage,
  FileVideo,
  FileText,
  Grid2X2,
  LayoutList,
  HardDrive,
} from "lucide-react";

type AssetType = "image" | "video" | "document";

interface Asset {
  id: string;
  name: string;
  type: AssetType;
  size: string;
  url: string;
  uploadedAt: string;
  dimensions?: string;
}

const mockAssets: Asset[] = [
  {
    id: "1",
    name: "hero-banner.png",
    type: "image",
    size: "1.2 MB",
    url: "https://placehold.co/400x300/1a1a2e/ffffff?text=hero-banner",
    uploadedAt: "2 hours ago",
    dimensions: "1920×1080",
  },
  {
    id: "2",
    name: "team-photo.jpg",
    type: "image",
    size: "856 KB",
    url: "https://placehold.co/400x300/16213e/ffffff?text=team-photo",
    uploadedAt: "Yesterday",
    dimensions: "1200×800",
  },
  {
    id: "3",
    name: "product-showcase.mp4",
    type: "video",
    size: "24 MB",
    url: "",
    uploadedAt: "3 days ago",
  },
  {
    id: "4",
    name: "logo-dark.svg",
    type: "image",
    size: "12 KB",
    url: "https://placehold.co/400x300/0f3460/ffffff?text=logo-dark",
    uploadedAt: "5 days ago",
    dimensions: "200×60",
  },
  {
    id: "5",
    name: "pricing-table.png",
    type: "image",
    size: "340 KB",
    url: "https://placehold.co/400x300/533483/ffffff?text=pricing",
    uploadedAt: "1 week ago",
    dimensions: "800×600",
  },
  {
    id: "6",
    name: "brand-guidelines.pdf",
    type: "document",
    size: "2.8 MB",
    url: "",
    uploadedAt: "1 week ago",
  },
  {
    id: "7",
    name: "feature-icon-1.png",
    type: "image",
    size: "28 KB",
    url: "https://placehold.co/400x300/2d6a4f/ffffff?text=icon-1",
    uploadedAt: "2 weeks ago",
    dimensions: "64×64",
  },
  {
    id: "8",
    name: "feature-icon-2.png",
    type: "image",
    size: "31 KB",
    url: "https://placehold.co/400x300/40916c/ffffff?text=icon-2",
    uploadedAt: "2 weeks ago",
    dimensions: "64×64",
  },
  {
    id: "9",
    name: "background-texture.jpg",
    type: "image",
    size: "412 KB",
    url: "https://placehold.co/400x300/1b4332/ffffff?text=texture",
    uploadedAt: "3 weeks ago",
    dimensions: "2560×1440",
  },
  {
    id: "10",
    name: "onboarding-video.mp4",
    type: "video",
    size: "48 MB",
    url: "",
    uploadedAt: "1 month ago",
  },
  {
    id: "11",
    name: "terms-of-service.pdf",
    type: "document",
    size: "156 KB",
    url: "",
    uploadedAt: "1 month ago",
  },
  {
    id: "12",
    name: "og-image.png",
    type: "image",
    size: "98 KB",
    url: "https://placehold.co/400x300/370617/ffffff?text=og-image",
    uploadedAt: "1 month ago",
    dimensions: "1200×630",
  },
];

const typeFilters = ["All", "Images", "Videos", "Documents"] as const;
type TypeFilter = (typeof typeFilters)[number];

const typeIcons: Record<AssetType, typeof FileImage> = {
  image: FileImage,
  video: FileVideo,
  document: FileText,
};

const usedStorage = 78.4;
const totalStorage = 500;

export default function MediaPage() {
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [filter, setFilter] = useState<TypeFilter>("All");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [preview, setPreview] = useState<Asset | null>(null);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = assets.filter((a) => {
    const matchType =
      filter === "All" ||
      (filter === "Images" && a.type === "image") ||
      (filter === "Videos" && a.type === "video") ||
      (filter === "Documents" && a.type === "document");
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      const newAsset: Asset = {
        id: String(Date.now()),
        name: `uploaded-file-${Date.now() % 1000}.png`,
        type: "image",
        size: "256 KB",
        url: "https://placehold.co/400x300/6c757d/ffffff?text=new-upload",
        uploadedAt: "Just now",
        dimensions: "800×600",
      };
      setAssets((prev) => [newAsset, ...prev]);
      setUploading(false);
    }, 1500);
  };

  const handleDelete = (id: string) => {
    setAssets((prev) => prev.filter((a) => a.id !== id));
    if (preview?.id === id) setPreview(null);
  };

  const handleCopyUrl = (asset: Asset) => {
    setCopied(asset.id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <DashboardShell>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="border-b border-border px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              Media Library
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage images, videos, and documents
            </p>
          </div>
          <Button onClick={handleUpload} disabled={uploading} size="sm">
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? "Uploading…" : "Upload Files"}
          </Button>
        </div>

        {/* Storage bar */}
        <div className="px-6 py-3 border-b border-border bg-muted/30">
          <div className="flex items-center gap-3">
            <HardDrive className="w-4 h-4 text-muted-foreground shrink-0" />
            <div className="flex-1 max-w-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">
                  Storage used
                </span>
                <span className="text-xs font-medium text-foreground">
                  {usedStorage} GB / {totalStorage} GB
                </span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-foreground rounded-full transition-all"
                  style={{ width: `${(usedStorage / totalStorage) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="px-6 py-3 flex items-center gap-3 border-b border-border">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search files…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-8 text-sm"
            />
          </div>

          <div className="flex items-center gap-1 border border-border rounded-md p-0.5">
            {typeFilters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  filter === f
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 border border-border rounded-md p-0.5 ml-auto">
            <button
              onClick={() => setView("grid")}
              className={`p-1.5 rounded transition-colors ${view === "grid" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Grid2X2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-1.5 rounded transition-colors ${view === "list" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
            >
              <LayoutList className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <FileImage className="w-10 h-10 text-muted-foreground/40 mb-3" />
              <p className="text-sm font-medium text-muted-foreground">
                No files found
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Try adjusting your search or upload new files
              </p>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filtered.map((asset) => {
                const Icon = typeIcons[asset.type];
                return (
                  <div
                    key={asset.id}
                    className="group relative border border-border rounded-lg overflow-hidden bg-muted/20 hover:border-foreground/30 transition-all cursor-pointer"
                    onClick={() => setPreview(asset)}
                  >
                    <div className="aspect-square flex items-center justify-center bg-muted/40">
                      {asset.type === "image" ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={asset.url}
                          alt={asset.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Icon className="w-8 h-8 text-muted-foreground/50" />
                      )}
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-medium text-foreground truncate">
                        {asset.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {asset.size}
                      </p>
                    </div>
                    {/* Actions overlay */}
                    <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="icon"
                            variant="secondary"
                            className="h-6 w-6 shadow-sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="w-3 h-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyUrl(asset);
                            }}
                          >
                            <Copy className="w-3.5 h-3.5 mr-2" />
                            {copied === asset.id ? "Copied!" : "Copy URL"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Download className="w-3.5 h-3.5 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(asset.id);
                            }}
                          >
                            <Trash2 className="w-3.5 h-3.5 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                      Name
                    </th>
                    <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                      Type
                    </th>
                    <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                      Size
                    </th>
                    <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                      Dimensions
                    </th>
                    <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                      Uploaded
                    </th>
                    <th className="px-4 py-2.5" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((asset) => {
                    const Icon = typeIcons[asset.type];
                    return (
                      <tr
                        key={asset.id}
                        className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                            <span className="font-medium text-foreground truncate max-w-45">
                              {asset.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            variant="outline"
                            className="text-xs capitalize"
                          >
                            {asset.type}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {asset.size}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {asset.dimensions ?? "—"}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {asset.uploadedAt}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1 justify-end">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => handleCopyUrl(asset)}
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive hover:text-destructive"
                              onClick={() => handleDelete(asset.id)}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Preview dialog */}
      <Dialog open={!!preview} onOpenChange={() => setPreview(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="truncate">{preview?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {preview?.type === "image" && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview.url}
                alt={preview.name}
                className="w-full rounded-lg border border-border"
              />
            )}
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                ["Type", preview?.type],
                ["Size", preview?.size],
                ["Dimensions", preview?.dimensions ?? "—"],
                ["Uploaded", preview?.uploadedAt],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">
                    {label}
                  </span>
                  <span className="font-medium text-foreground capitalize">
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => preview && handleCopyUrl(preview)}
              >
                <Copy className="w-3.5 h-3.5 mr-2" />
                {preview && copied === preview.id ? "Copied!" : "Copy URL"}
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Download className="w-3.5 h-3.5 mr-2" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={() => {
                  if (preview) handleDelete(preview.id);
                }}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  );
}
