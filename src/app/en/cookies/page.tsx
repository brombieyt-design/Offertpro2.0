import type { Metadata } from "next";
import Link from "next/link";
import NavbarEn from "@/components/landing/en/NavbarEn";
import FooterEn from "@/components/landing/en/FooterEn";
import { cookies } from "@/content/cookies";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";
const LAST_UPDATED = "2026-04-15";

export const metadata: Metadata = {
  title: "Cookie policy – Offert Pro",
  description:
    "Which cookies Offert Pro uses and why. We use a minimum of essential cookies and cookie-less web analytics.",
  alternates: {
    canonical: `${SITE_URL}/en/cookies`,
    languages: {
      "sv-SE": `${SITE_URL}/cookies`,
      en: `${SITE_URL}/en/cookies`,
      de: `${SITE_URL}/de/cookies`,
      "x-default": `${SITE_URL}/cookies`,
    },
  },
  openGraph: {
    title: "Cookie policy – Offert Pro",
    description: "Which cookies we use and why.",
    url: `${SITE_URL}/en/cookies`,
    locale: "en",
    alternateLocale: ["sv_SE", "de"],
    type: "website",
  },
};

const categoryLabel: Record<string, string> = {
  essential: "Essential",
  preferences: "Preferences",
  analytics: "Analytics",
};

export default function CookiesPageEn() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarEn />

      <article className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">Cookie policy</h1>
          <p className="text-sm text-gray-400 mb-12">
            Last updated: {new Date(LAST_UPDATED).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="prose prose-gray max-w-none prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-p:leading-relaxed prose-p:text-gray-600 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline">
            <p>
              We use a minimum of cookies for the service to work. We do not
              use marketing cookies. Web analytics is provided by{" "}
              <a href="https://plausible.io" rel="nofollow">Plausible</a>,
              which uses no cookies and does not track individuals across
              sites.
            </p>

            <h2>Cookies we set</h2>
          </div>

          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm">
              <thead className="text-xs text-gray-500 uppercase tracking-wide">
                <tr>
                  <th className="text-left py-3 px-2 border-b border-gray-200">Name</th>
                  <th className="text-left py-3 px-2 border-b border-gray-200">Category</th>
                  <th className="text-left py-3 px-2 border-b border-gray-200">Lifetime</th>
                  <th className="text-left py-3 px-2 border-b border-gray-200">Purpose</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {cookies.map((c) => (
                  <tr key={c.name} className="align-top">
                    <td className="py-3 px-2 border-b border-gray-100 font-mono text-xs">{c.name}</td>
                    <td className="py-3 px-2 border-b border-gray-100">{categoryLabel[c.category]}</td>
                    <td className="py-3 px-2 border-b border-gray-100">{c.lifetime.en}</td>
                    <td className="py-3 px-2 border-b border-gray-100">{c.purpose.en}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="prose prose-gray max-w-none prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-p:leading-relaxed prose-p:text-gray-600 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline">
            <h2>How to manage cookies</h2>
            <p>
              Essential cookies cannot be disabled as they are required for the
              service to work. Preference cookies can be cleared from your
              browser settings. Because we don&rsquo;t use third-party
              analytics or marketing cookies, you don&rsquo;t need to manage
              consent separately.
            </p>

            <h2>More</h2>
            <p>
              See also our <Link href="/en/privacy">privacy policy</Link> for a
              broader description of how we process personal data.
            </p>
          </div>
        </div>
      </article>

      <FooterEn />
    </div>
  );
}
