import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const posts = [
  {
    slug: "building-fast-websites-without-code",
    category: "Product",
    title: "Building fast websites without writing a single line of code",
    excerpt:
      "Modern no-code tools have crossed a threshold — the sites they produce are now genuinely fast, accessible, and SEO-friendly. Here's how WebCraft achieves sub-2s load times for every site.",
    author: "Sarah Chen",
    date: "Jun 12, 2025",
    readTime: "6 min read",
    avatar: "SC",
  },
  {
    slug: "design-tokens-for-non-designers",
    category: "Design",
    title: "Design tokens explained for non-designers",
    excerpt:
      "You've heard the term, maybe seen it in Figma or a Tailwind config. But what actually are design tokens, and why do they make your website dramatically easier to maintain?",
    author: "Priya Nair",
    date: "Jun 5, 2025",
    readTime: "5 min read",
    avatar: "PN",
  },
  {
    slug: "seo-checklist-for-new-websites",
    category: "SEO",
    title: "The 12-point SEO checklist every new website owner needs",
    excerpt:
      "Launching a new site? These are the technical and on-page SEO fundamentals that have the biggest impact in the first 90 days — and how WebCraft handles most of them automatically.",
    author: "James Wu",
    date: "May 28, 2025",
    readTime: "8 min read",
    avatar: "JW",
  },
  {
    slug: "responsive-design-principles",
    category: "Design",
    title: "5 responsive design principles that hold up in 2025",
    excerpt:
      "Mobile-first is table stakes. We dig into the nuanced decisions — fluid typography, container queries, and adaptive images — that separate great responsive sites from mediocre ones.",
    author: "Priya Nair",
    date: "May 20, 2025",
    readTime: "7 min read",
    avatar: "PN",
  },
  {
    slug: "why-page-speed-matters",
    category: "Performance",
    title: "Why page speed is still your #1 conversion lever",
    excerpt:
      "Google's research says 53% of mobile users abandon a site that takes more than 3 seconds to load. We break down exactly why — and what you can do about it today without touching any code.",
    author: "Marcus Hill",
    date: "May 12, 2025",
    readTime: "5 min read",
    avatar: "MH",
  },
  {
    slug: "june-product-update",
    category: "Updates",
    title: "June product update: version history, new templates, and more",
    excerpt:
      "We shipped 23 improvements in June. The biggest: full 90-day version history for every page, 12 new industry templates, and a completely redesigned media library with bulk operations.",
    author: "Sarah Chen",
    date: "May 1, 2025",
    readTime: "4 min read",
    avatar: "SC",
  },
];

const categories = [
  "All",
  "Product",
  "Design",
  "SEO",
  "Performance",
  "Updates",
];

const categoryColors: Record<string, string> = {
  Product: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Design:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  SEO: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Performance:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Updates: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteNav />

      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 py-20 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Product updates, design thinking, and practical guides for building
            great websites.
          </p>
        </section>

        {/* Category filter */}
        <section className="border-t border-border">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={
                  cat === "All"
                    ? "/blog"
                    : `/blog?category=${cat.toLowerCase()}`
                }
                className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  cat === "All"
                    ? "bg-foreground text-background"
                    : "border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </section>

        {/* Posts grid */}
        <section className="max-w-4xl mx-auto px-6 py-12 space-y-8">
          {/* Featured post */}
          <Link
            href={`/blog/${posts[0].slug}`}
            className="group block rounded-xl border border-border bg-card/40 hover:border-foreground/20 transition-colors overflow-hidden"
          >
            <div className="bg-accent/30 h-48 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Cover image</span>
            </div>
            <div className="p-6 space-y-3">
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[posts[0].category]}`}
              >
                {posts[0].category}
              </span>
              <h2 className="text-xl font-bold text-foreground group-hover:underline underline-offset-2">
                {posts[0].title}
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                {posts[0].excerpt}
              </p>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-xs font-medium text-foreground">
                    {posts[0].avatar}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {posts[0].author}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {posts[0].date} · {posts[0].readTime}
                </span>
              </div>
            </div>
          </Link>

          {/* Remaining posts */}
          <div className="grid sm:grid-cols-2 gap-6">
            {posts.slice(1).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-xl border border-border bg-card/40 hover:border-foreground/20 transition-colors p-5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[post.category]}`}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {post.readTime}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground text-sm group-hover:underline underline-offset-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-xs font-medium text-foreground">
                      {post.avatar}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {post.author}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {post.date}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Load more */}
          <div className="text-center pt-4">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-accent/60 transition-colors text-foreground">
              Load more posts
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
