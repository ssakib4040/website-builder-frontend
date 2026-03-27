"use client";

import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Mail, MapPin, MessageCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name || !email || !message) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1400);
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteNav />

      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 py-20 text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Get in touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Questions, feedback, or partnership ideas — we&apos;d love to hear
            from you. We read every message and reply within one business day.
          </p>
        </section>

        {/* Content */}
        <section className="max-w-5xl mx-auto px-6 pb-24 grid md:grid-cols-5 gap-12">
          {/* Contact info */}
          <aside className="md:col-span-2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Contact info
              </h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Email us
                    </p>
                    <p className="text-base text-muted-foreground">
                      hello@webcraft.io
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Replies within 24h
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center shrink-0 mt-0.5">
                    <MessageCircle className="w-4 h-4 text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Live chat
                    </p>
                    <p className="text-base text-muted-foreground">
                      Available Monday–Friday
                    </p>
                    <p className="text-xs text-muted-foreground">
                      9am – 5pm PST
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Office
                    </p>
                    <p className="text-base text-muted-foreground">
                      340 Pine St, Suite 800
                    </p>
                    <p className="text-xs text-muted-foreground">
                      San Francisco, CA 94104
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card/50 space-y-2">
              <p className="text-sm font-medium text-foreground">
                Looking for support?
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                For billing issues or technical help, check our help center
                first — most answers are there instantly.
              </p>
              <a
                href="#"
                className="text-xs text-foreground hover:underline font-medium"
                onClick={(e) => e.preventDefault()}
              >
                Visit Help Center →
              </a>
            </div>
          </aside>

          {/* Form */}
          <div className="md:col-span-3">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                <CheckCircle className="w-12 h-12 text-green-500" />
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold text-foreground">
                    Message sent!
                  </h2>
                  <p className="text-base text-muted-foreground">
                    Thanks, {name.split(" ")[0]}. We&apos;ll get back to you at{" "}
                    <strong>{email}</strong> shortly.
                  </p>
                </div>
                <button
                  className="text-base text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                  onClick={() => {
                    setSent(false);
                    setName("");
                    setEmail("");
                    setSubject("");
                    setMessage("");
                  }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">
                      Name *
                    </label>
                    <Input
                      placeholder="Jane Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">
                      Email *
                    </label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Subject
                  </label>
                  <Input
                    placeholder="How can we help?"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Message *
                  </label>
                  <textarea
                    className="w-full min-h-[160px] px-3 py-2 text-sm rounded-md border border-input bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    placeholder="Tell us what's on your mind..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                {error && <p className="text-xs text-red-500">{error}</p>}

                <Button
                  type="submit"
                  className="w-full sm:w-auto px-8"
                  disabled={loading}
                >
                  {loading ? "Sending…" : "Send message"}
                </Button>
              </form>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
