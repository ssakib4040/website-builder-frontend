import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

const cookieTypes = [
  {
    name: "Strictly necessary",
    required: true,
    description:
      "These cookies are required for the website to function. They include session management, authentication tokens, and security cookies. They cannot be disabled.",
    examples: ["session_id", "csrf_token", "auth_token"],
  },
  {
    name: "Analytics",
    required: false,
    description:
      "These cookies help us understand how visitors interact with the site by collecting and reporting information anonymously. We use this data to improve the service.",
    examples: ["_ga", "_gid", "webcraft_analytics"],
  },
  {
    name: "Functional",
    required: false,
    description:
      "These cookies enable enhanced functionality and personalisation, such as remembering your theme preference, sidebar state, or recently viewed pages.",
    examples: ["theme", "sidebar_collapsed", "last_viewed_page"],
  },
  {
    name: "Marketing",
    required: false,
    description:
      "These cookies may be set by our advertising partners to build a profile of your interests and show you relevant adverts on other sites. We currently do not run targeted advertising.",
    examples: [],
  },
];

export default function CookiesPage() {
  const updated = "June 1, 2025";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteNav />

      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-6 py-16 space-y-10">
          <header className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Cookie Policy
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated: {updated}
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              This Cookie Policy explains what cookies are, how WebCraft uses
              them, and the choices you have. By continuing to use our service
              you consent to our use of cookies as described here.
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              What are cookies?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cookies are small text files placed on your device when you visit
              a website. They serve many purposes: keeping you signed in,
              remembering your preferences, understanding how you use the site,
              and helping us improve. Cookies are not programs and cannot be
              used to read files on your device.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              How long do cookies last?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Session cookies</strong>{" "}
              expire when you close your browser. They are used primarily for
              authentication and security.{" "}
              <strong className="text-foreground">Persistent cookies</strong>{" "}
              have an expiry date and remain on your device until that date or
              until you manually delete them. We use persistent cookies for
              preference storage (e.g. theme) with a maximum expiry of 12
              months.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-lg font-semibold text-foreground">
              Cookie types we use
            </h2>
            <div className="space-y-4">
              {cookieTypes.map(({ name, required, description, examples }) => (
                <div
                  key={name}
                  className="rounded-xl border border-border bg-card/40 p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground text-sm">
                      {name}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        required
                          ? "bg-foreground/10 text-foreground"
                          : "border border-border text-muted-foreground"
                      }`}
                    >
                      {required ? "Always active" : "Optional"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                  {examples.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {examples.map((ex) => (
                        <code
                          key={ex}
                          className="px-2 py-0.5 rounded bg-accent text-xs text-foreground font-mono"
                        >
                          {ex}
                        </code>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              Third-party cookies
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Some features of WebCraft rely on third-party services that may
              set their own cookies. Currently these include:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                {
                  name: "Stripe",
                  purpose:
                    "Payment processing. Stripe may set cookies for fraud prevention.",
                },
                {
                  name: "Google Analytics",
                  purpose:
                    "Aggregate usage analytics. Data is anonymised and does not identify individual users.",
                },
                {
                  name: "Intercom",
                  purpose:
                    "In-product help chat and onboarding. Can be disabled in your account settings.",
                },
              ].map(({ name, purpose }) => (
                <li key={name} className="flex gap-2">
                  <strong className="text-foreground shrink-0">{name}:</strong>
                  <span>{purpose}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              Managing cookies
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You can control and delete cookies through your browser settings.
              Note that disabling cookies may affect the functionality of
              WebCraft — in particular, you will not be able to stay signed in
              if session cookies are disabled.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              For more information on managing cookies in your browser, visit{" "}
              <a
                href="https://www.allaboutcookies.org"
                className="text-foreground hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                allaboutcookies.org
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              Changes to this policy
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We may update this Cookie Policy periodically. When we do, we will
              revise the &quot;Last updated&quot; date. Continued use of the service
              constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Contact</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Questions about this policy? Email{" "}
              <a
                href="mailto:privacy@webcraft.io"
                className="text-foreground hover:underline"
              >
                privacy@webcraft.io
              </a>
              .
            </p>
          </section>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
