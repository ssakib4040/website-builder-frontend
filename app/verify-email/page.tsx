"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteNav } from "@/components/site/SiteNav";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function VerifyEmailPage() {
  const [resent, setResent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleResend() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResent(true);
    }, 1000);
  }

  function handleVerify() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVerified(true);
    }, 1200);
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteNav />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm text-center space-y-6">
          {verified ? (
            <>
              <div className="flex justify-center">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-foreground">
                  Email verified!
                </h1>
                <p className="text-base text-muted-foreground">
                  Your account is ready. Let&apos;s start building.
                </p>
              </div>
              <Link href="/dashboard">
                <Button className="w-full">Go to dashboard</Button>
              </Link>
            </>
          ) : (
            <>
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                  <Mail className="w-8 h-8 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-foreground">
                  Verify your email
                </h1>
                <p className="text-base text-muted-foreground">
                  We sent a confirmation link to your email address. Click it to
                  activate your account.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full"
                  onClick={handleVerify}
                  disabled={loading}
                >
                  {loading ? "Verifying…" : "I&apos;ve verified my email"}
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleResend}
                  disabled={loading || resent}
                >
                  {resent ? "Email sent!" : "Resend verification email"}
                </Button>
              </div>

              {resent && (
                <p className="text-sm text-green-600 dark:text-green-400">
                  Verification email resent. Check your inbox.
                </p>
              )}

              <p className="text-sm text-muted-foreground">
                Wrong email?{" "}
                <Link
                  href="/sign-up"
                  className="text-foreground hover:underline"
                >
                  Sign up again
                </Link>
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
