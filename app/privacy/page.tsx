import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

export default function PrivacyPage() {
  const updated = "June 1, 2025";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteNav />

      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-6 py-16 space-y-10">
          <header className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Privacy Policy
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated: {updated}
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              WebCraft Inc. (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;)
              is committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you use our service.
            </p>
          </header>

          {[
            {
              title: "1. Information we collect",
              body: `We collect information you provide directly to us, such as when you create an account, use our builder, contact us for support, or subscribe to our newsletter. This includes your name, email address, password (hashed), billing information (processed by Stripe — we never store card numbers), and content you create using our service.\n\nWe also collect information automatically when you use our service, including log data (IP address, browser type, pages visited, timestamps), device information, and cookies. See our Cookie Policy for details.`,
            },
            {
              title: "2. How we use your information",
              body: `We use the information we collect to provide, maintain, and improve our services; process transactions and send related information including purchase confirmations and invoices; send technical notices, security alerts, and support messages; respond to your comments, questions, and customer service requests; and send promotional communications (you can opt out at any time).\n\nWe do not sell, trade, or rent your personal information to third parties.`,
            },
            {
              title: "3. Cookies and tracking",
              body: `We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. See our Cookie Policy for full details.`,
            },
            {
              title: "4. Data sharing and disclosure",
              body: `We may share your information with third-party vendors and service providers that perform services on our behalf, such as payment processing (Stripe), email delivery (SendGrid), error monitoring (Sentry), and cloud infrastructure (AWS). We require these parties to process personal data only as instructed and in accordance with this Privacy Policy.\n\nWe may also disclose your information if required by law, to protect our rights, or in connection with a merger or acquisition.`,
            },
            {
              title: "5. Data retention",
              body: `We retain your personal information for as long as your account is active or as needed to provide you services. You may request deletion of your account and associated data at any time by contacting privacy@webcraft.io. We will respond within 30 days. Certain information may be retained for legal or legitimate business purposes even after deletion.`,
            },
            {
              title: "6. Security",
              body: `We implement industry-standard security measures including TLS 1.3 encryption in transit, AES-256 encryption at rest for sensitive data, regular security audits, and access controls. Despite our safeguards, no electronic transmission over the Internet is 100% secure.`,
            },
            {
              title: "7. Your rights (GDPR / CCPA)",
              body: `Depending on your jurisdiction, you may have the right to access, correct, or delete personal data we hold about you; object to or restrict processing; data portability; and withdraw consent at any time. To exercise these rights, email privacy@webcraft.io. We will respond within 30 days (or 45 days where permitted by law).`,
            },
            {
              title: "8. Children's privacy",
              body: `Our service is not directed to children under 13. We do not knowingly collect personal information from children under 13. If we discover we have collected such information, we will delete it promptly.`,
            },
            {
              title: "9. Changes to this policy",
              body: `We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. Continued use of the service after changes constitutes your acceptance.`,
            },
            {
              title: "10. Contact us",
              body: `If you have questions about this Privacy Policy, please contact us at:\nWebCraft Inc., 340 Pine St, Suite 800, San Francisco, CA 94104\nEmail: privacy@webcraft.io`,
            },
          ].map(({ title, body }) => (
            <section key={title} className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">{title}</h2>
              {body.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line"
                >
                  {para}
                </p>
              ))}
            </section>
          ))}
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
