import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

export default function TermsPage() {
  const updated = "June 1, 2025";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteNav />

      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-6 py-16 space-y-10">
          <header className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Terms of Service
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated: {updated}
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Please read these Terms of Service carefully before using
              WebCraft. By accessing or using our service you agree to be bound
              by these Terms.
            </p>
          </header>

          {[
            {
              title: "1. Acceptance of terms",
              body: `By creating a WebCraft account or accessing any part of our service, you agree to these Terms of Service and our Privacy Policy. If you are using WebCraft on behalf of an organisation, you represent that you have the authority to bind that organisation to these Terms.`,
            },
            {
              title: "2. Description of service",
              body: `WebCraft provides a cloud-based visual website builder that allows users to create, host, and publish websites. We offer free and paid subscription tiers. Features vary by plan; see our Pricing page for details. We reserve the right to modify, suspend, or discontinue the service at any time with reasonable notice.`,
            },
            {
              title: "3. Your account",
              body: `You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorised use. You must be at least 13 years old to create an account. You may not use automated means to create accounts in bulk.`,
            },
            {
              title: "4. Acceptable use",
              body: `You agree not to use WebCraft to publish content that is illegal, harmful, deceptive, defamatory, or infringes the intellectual property rights of others. You may not use our infrastructure for spam, phishing, malware distribution, or cryptocurrency mining. Violations may result in immediate account termination without refund.`,
            },
            {
              title: "5. Your content",
              body: `You retain ownership of all content you create using WebCraft. By publishing content through our service, you grant us a limited licence to host, display, and deliver your content to end users. You are solely responsible for ensuring you have the rights to all content you publish.`,
            },
            {
              title: "6. Subscription, billing, and refunds",
              body: `Paid subscriptions are billed in advance on a monthly or annual basis. Prices are shown inclusive of applicable taxes where required. If you downgrade or cancel, you retain access until the end of the current billing period — we do not issue pro-rated refunds for partial periods.\n\nIf you believe you were charged in error, contact billing@webcraft.io within 30 days of the charge and we will investigate promptly.`,
            },
            {
              title: "7. Intellectual property",
              body: `WebCraft and its licensors own all rights to the service, including the builder interface, templates, and underlying code. You may not copy, modify, distribute, or create derivative works of any part of the service without our written permission.`,
            },
            {
              title: "8. Third-party services",
              body: `WebCraft integrates with third-party services (e.g. Stripe, Google Analytics, Mailchimp). Your use of those services is governed by their own terms. We are not responsible for the availability or actions of third-party services.`,
            },
            {
              title: "9. Disclaimers and limitation of liability",
              body: `The service is provided "as is" without warranties of any kind, express or implied. To the maximum extent permitted by law, WebCraft shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service. Our total liability to you in any calendar year shall not exceed the fees you paid us in that year.`,
            },
            {
              title: "10. Governing law",
              body: `These Terms are governed by the laws of the State of California, without regard to conflict of law principles. Any disputes shall be resolved in the courts of San Francisco County, California.`,
            },
            {
              title: "11. Changes to terms",
              body: `We may revise these Terms at any time. We will provide at least 14 days' notice of material changes via email or a banner in the product. Continued use after the effective date constitutes acceptance.`,
            },
            {
              title: "12. Contact",
              body: `For questions about these Terms, email legal@webcraft.io or write to WebCraft Inc., 340 Pine St, Suite 800, San Francisco, CA 94104.`,
            },
          ].map(({ title, body }) => (
            <section key={title} className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">{title}</h2>
              {body.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className="text-base text-muted-foreground leading-relaxed"
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
