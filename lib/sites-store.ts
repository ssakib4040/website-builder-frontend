import { create } from "zustand";

export type SiteStatus = "live" | "draft" | "building";

export interface Site {
  id: string;
  name: string;
  subdomain: string;
  customDomain?: string;
  status: SiteStatus;
  plan: "hobby" | "pro" | "team";
  lastDeployedAt: string;
  pageCount: number;
  collectionCount: number;
  gradient: string; // tailwind from-x to-y classes for bg-linear-to-br
}

interface SitesStore {
  sites: Site[];
  currentSiteId: string;
  setCurrentSite: (id: string) => void;
  addSite: (name: string) => Site;
  removeSite: (id: string) => void;
}

const mockSites: Site[] = [
  {
    id: "site_1",
    name: "My Portfolio",
    subdomain: "portfolio.webcraft.app",
    status: "live",
    plan: "pro",
    lastDeployedAt: "2 hours ago",
    pageCount: 8,
    collectionCount: 3,
    gradient: "from-violet-500 to-indigo-600",
  },
  {
    id: "site_2",
    name: "Acme Marketing",
    subdomain: "acme.webcraft.app",
    customDomain: "acmecorp.com",
    status: "live",
    plan: "team",
    lastDeployedAt: "Yesterday",
    pageCount: 14,
    collectionCount: 5,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "site_3",
    name: "Dev Blog",
    subdomain: "devblog.webcraft.app",
    status: "draft",
    plan: "hobby",
    lastDeployedAt: "Never",
    pageCount: 5,
    collectionCount: 2,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "site_4",
    name: "Online Store",
    subdomain: "store.webcraft.app",
    status: "building",
    plan: "pro",
    lastDeployedAt: "3 minutes ago",
    pageCount: 12,
    collectionCount: 6,
    gradient: "from-orange-500 to-pink-500",
  },
  {
    id: "site_5",
    name: "Launch Landing",
    subdomain: "launch.webcraft.app",
    status: "live",
    plan: "hobby",
    lastDeployedAt: "Dec 15, 2025",
    pageCount: 3,
    collectionCount: 1,
    gradient: "from-rose-500 to-pink-600",
  },
  {
    id: "site_6",
    name: "Agency Showcase",
    subdomain: "agency.webcraft.app",
    status: "draft",
    plan: "hobby",
    lastDeployedAt: "Never",
    pageCount: 2,
    collectionCount: 0,
    gradient: "from-slate-500 to-zinc-600",
  },
];

let siteCounter = mockSites.length + 1;

export const useSitesStore = create<SitesStore>((set) => ({
  sites: mockSites,
  currentSiteId: "site_1",

  setCurrentSite: (id) => set({ currentSiteId: id }),

  addSite: (name) => {
    const newSite: Site = {
      id: `site_${siteCounter++}`,
      name,
      subdomain: `${name.toLowerCase().replace(/\s+/g, "-")}.webcraft.app`,
      status: "draft",
      plan: "hobby",
      lastDeployedAt: "Never",
      pageCount: 0,
      collectionCount: 0,
      gradient: "from-neutral-500 to-stone-600",
    };
    set((state) => ({ sites: [...state.sites, newSite] }));
    return newSite;
  },

  removeSite: (id) =>
    set((state) => {
      const remaining = state.sites.filter((s) => s.id !== id);
      return {
        sites: remaining,
        currentSiteId:
          state.currentSiteId === id
            ? (remaining[0]?.id ?? "")
            : state.currentSiteId,
      };
    }),
}));
