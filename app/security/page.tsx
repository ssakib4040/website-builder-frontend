import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  ArrowRight,
  Shield,
  Lock,
  Eye,
  Server,
  FileText,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

const practices = [
  {
    icon: Lock,
    title: "Encryption everywhere",
    body: "All data in transit is encrypted using TLS 1.3. Data at rest — including user content, credentials, and media — is encrypted using AES-256. Encryption keys are managed via AWS KMS with automatic rotation.",
  },
  {
    icon: Shield,
    title: "SOC 2 Type II certified",
    body: "WebCraft has completed a SOC 2 Type II audit covering Security, Availability, and Confidentiality trust service criteria. Reports are available to enterprise customers under NDA.",
  },
  {
    icon: Eye,
    title: "Access control",
    body: "All internal access to production systems follows the principle of least privilege. Access requires multi-factor authentication, is logged, and is reviewed quarterly. No engineer has standing access to customer data.",
  },
  {
    icon: Server,
    title: "Infrastructure security",
    body: "Our infrastructure runs on AWS across multiple availability zones. We use private VPCs, security groups, and WAF rules. Automated vulnerability scanning runs continuously on all services.",
  },
  {
    icon: FileText,
    title: "GDPR & CCPA compliance",
    body: "We act as a data processor on behalf of our users. We maintain a GDPR-compliant data processing agreement (DPA), support right-to-erasure requests, and offer EU data residency for enterprise customers.",
  },
  {
    icon: AlertCircle,
    title: "Vulnerability disclosure",
    body: "We operate a responsible disclosure programme. If you discover a security issue, please report it to security@webcraft.io. We commit to acknowledging reports within 24 hours and resolving critical issues within 72 hours.",
  },
];

const certifications = [
  { name: "SOC 2 Type II", note: "Security, Availability, Confidentiality" },
  { name: "GDPR Compliant", note: "EU data processing agreement available" },
  { name: "CCPA Compliant", note: "California privacy rights supported" },
  { name: "PCI DSS", note: "Payments via Stripe (PCI DSS Level 1)" },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteNav />

      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 py-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs text-muted-foreground bg-accent/30">
            <Shield className="w-3 h-3" />
            Security
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Security at WebCraft
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Protecting your data and your users&apos; data is fundamental to
            everything we build. This page describes how we secure our platform,
            your data, and your published sites.
          </p>
        </section>

        {/* Certifications */}
        <section className="border-y border-border bg-card/30">
          <div className="max-w-4xl mx-auto px-6 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {certifications.map(({ name, note }) => (
                <div key={name} className="text-center space-y-1.5">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mx-auto">
                    <Shield className="w-6 h-6 text-foreground" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    {name}
                  </p>
                  <p className="text-xs text-muted-foreground">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Practices */}
        <section className="max-w-4xl mx-auto px-6 py-20 space-y-12">
          <h2 className="text-2xl font-bold text-foreground">
            Our security practices
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {practices.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="space-y-3 p-6 rounded-xl border border-border bg-background"
              >
                <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                  <Icon className="w-5 h-5 text-foreground" />
                </div>
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Penetration testing */}
        <section className="border-t border-border bg-card/30">
          <div className="max-w-4xl mx-auto px-6 py-16 space-y-4">
            <h2 className="text-xl font-bold text-foreground">
              Penetration testing
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
              We conduct annual penetration tests with a third-party security
              firm. Internal red team exercises run quarterly. Findings are
              triaged and tracked to resolution through our security issue
              management programme. Enterprise customers may request penetration
              test summaries under NDA.
            </p>
          </div>
        </section>

        {/* Responsible disclosure */}
        <section className="max-w-4xl mx-auto px-6 py-16 space-y-4">
          <h2 className="text-xl font-bold text-foreground">
            Responsible disclosure
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
            We welcome security researchers to help us identify vulnerabilities.
            If you discover a potential issue:
          </p>
          <ol className="space-y-2 text-base text-muted-foreground list-decimal list-inside max-w-2xl">
            <li>
              Email a description to{" "}
              <a
                href="mailto:security@webcraft.io"
                className="text-foreground hover:underline"
              >
                security@webcraft.io
              </a>
            </li>
            <li>Include steps to reproduce and affected components</li>
            <li>
              Allow us 90 days to investigate and remediate before public
              disclosure
            </li>
          </ol>
          <p className="text-base text-muted-foreground max-w-2xl">
            We acknowledge reports within 24 hours. Critical vulnerabilities are
            patched within 72 hours. We do not take legal action against
            researchers who act in good faith.
          </p>
        </section>

        {/* More questions CTA */}
        <section className="border-t border-border bg-card/30">
          <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-foreground">
                Security questions?
              </h2>
              <p className="text-base text-muted-foreground">
                Enterprise customers can request the full SOC 2 report and
                detailed security questionnaire responses.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Contact security team
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
