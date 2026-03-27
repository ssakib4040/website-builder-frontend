import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

const posts: Record<
  string,
  {
    category: string;
    title: string;
    author: string;
    avatar: string;
    date: string;
    readTime: string;
    excerpt: string;
    content: { heading?: string; body: string }[];
  }
> = {
  "building-fast-websites-without-code": {
    category: "Product",
    title: "Building fast websites without writing a single line of code",
    author: "Sarah Chen",
    avatar: "SC",
    date: "Jun 12, 2025",
    readTime: "6 min read",
    excerpt:
      "Modern no-code tools have crossed a threshold — the sites they produce are now genuinely fast, accessible, and SEO-friendly.",
    content: [
      {
        body: "Three years ago, if you wanted a website that loaded in under two seconds, you needed a developer. Today, that's no longer true — and the shift has happened faster than most people realise.",
      },
      {
        heading: "The performance gap is closing",
        body: "No-code builders used to have a bad reputation for producing bloated, JavaScript-heavy pages that crawled on mobile. The criticism was fair. But the underlying technology has matured enormously. WebCraft outputs clean, minimal HTML with zero unnecessary runtime JavaScript. Images are automatically converted to WebP and lazy loaded. Fonts are subset and preloaded. The result is a Lighthouse score that consistently sits above 90 out of the box.",
      },
      {
        heading: "What we optimise automatically",
        body: "When you publish a site on WebCraft, several optimisations happen without you doing anything. Critical CSS is inlined above the fold. Non-critical CSS is deferred. Images are served at the correct size for the user's device with responsive srcset attributes. Third-party scripts (analytics, live chat) are loaded with the defer strategy by default.",
      },
      {
        heading: "Where human judgment still matters",
        body: "Automation can only take you so far. If you upload a 4MB hero image, we'll compress it — but we can't stop you from using an image that was the wrong size to begin with. Similarly, if you embed a heavy third-party widget on every page, that will cost you. The best results come from combining WebCraft's automatic optimisations with conscious decisions about what you actually put on the page.",
      },
      {
        heading: "The benchmark",
        body: "We tested 500 randomly selected WebCraft sites in May 2025. The median Largest Contentful Paint was 1.8 seconds on a simulated mid-range Android device on a 4G connection. 73% of those sites scored above 90 on Lighthouse Performance. These aren't curated showcase sites — they're real sites built by real users.",
      },
    ],
  },
  "design-tokens-for-non-designers": {
    category: "Design",
    title: "Design tokens explained for non-designers",
    author: "Priya Nair",
    avatar: "PN",
    date: "Jun 5, 2025",
    readTime: "5 min read",
    excerpt:
      "You've heard the term, maybe seen it in Figma or a Tailwind config. But what actually are design tokens?",
    content: [
      {
        body: "A design token is just a named variable that stores a design decision. Color, font size, spacing, border radius — anything that would otherwise be a hardcoded value in your CSS is a candidate for becoming a token.",
      },
      {
        heading: "Why they matter",
        body: "Imagine your brand color is #6366f1. Now imagine it appears in 200 places across your website. When the rebrand happens and the new color is #7c3aed, changing a single token updates all 200 places simultaneously. That's the core value proposition.",
      },
      {
        heading: "Tokens in WebCraft",
        body: "In WebCraft, you define your design tokens in the Theme panel. You set your primary color, accent, font families, base font size, and spacing scale. Every element in the builder respects these tokens. Change your primary color token and the change cascades everywhere — buttons, links, section backgrounds, badges.",
      },
      {
        heading: "You don't need to be a designer to use them",
        body: "Tokens feel like a designer concept, but they're really just good practice for anyone building a website. If you've ever manually updated a hex color in five different places, you've experienced the problem tokens solve. Start with the minimum: one primary color, one secondary, and two font families. That's enough to make your site feel cohesive.",
      },
    ],
  },
};

type Post = {
  category: string;
  title: string;
  author: string;
  avatar: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: { heading?: string; body: string }[];
};

// For slugs we don't have full content for, generate a generic post
function getPost(slug: string): Post {
  if (posts[slug]) return posts[slug];
  return {
    category: "Article",
    title: slug
      .split("-")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" "),
    author: "WebCraft Team",
    avatar: "WC",
    date: "May 2025",
    readTime: "5 min read",
    excerpt: "A deep-dive article from the WebCraft blog.",
    content: [
      {
        body: "This article is coming soon. Check back shortly for the full content. In the meantime, browse our other posts or sign up to get notified when new articles are published.",
      },
    ],
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteNav />

      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-6 py-16 space-y-8">
          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>

          {/* Header */}
          <header className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent text-foreground">
                {post.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 pt-2 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-semibold text-foreground">
                  {post.avatar}
                </div>
                <span className="text-sm font-medium text-foreground">
                  {post.author}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </div>
            </div>
          </header>

          {/* Cover placeholder */}
          <div className="rounded-xl bg-accent/30 h-64 flex items-center justify-center border border-border">
            <span className="text-sm text-muted-foreground">Cover image</span>
          </div>

          {/* Body */}
          <div className="space-y-6">
            {post.content.map((section, i) => (
              <div key={i} className="space-y-2">
                {section.heading && (
                  <h2 className="text-xl font-semibold text-foreground">
                    {section.heading}
                  </h2>
                )}
                <p className="text-base text-muted-foreground leading-relaxed">
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          {/* Author card */}
          <div className="mt-12 p-5 rounded-xl border border-border bg-card/40 flex gap-4">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-sm font-semibold text-foreground shrink-0">
              {post.avatar}
            </div>
            <div className="space-y-1">
              <p className="text-base font-semibold text-foreground">
                {post.author}
              </p>
              <p className="text-xs text-muted-foreground">
                WebCraft team member. Building tools that help people build
                things.
              </p>
            </div>
          </div>

          {/* More articles */}
          <div className="pt-8 border-t border-border space-y-4">
            <h3 className="text-base font-semibold text-foreground">
              More from the blog
            </h3>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Browse all articles →
            </Link>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
