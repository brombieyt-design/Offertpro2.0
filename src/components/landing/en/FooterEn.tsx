import Link from "next/link";
import { Mail } from "lucide-react";
import LanguageSwitcher from "@/components/landing/LanguageSwitcher";

const columns = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/en/how-it-works" },
      { label: "Services", href: "/en/services" },
      { label: "Pricing", href: "/en/pricing" },
      { label: "Integrations", href: "/en/integrations" },
      { label: "For businesses", href: "/en/for-businesses" },
      { label: "For AI", href: "/en/for-ai" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Blog", href: "/en/blog" },
      { label: "Editorial team", href: "/en/authors" },
      { label: "Changelog", href: "/en/changelog" },
      { label: "Press", href: "/en/press" },
      { label: "Contact", href: "mailto:hello@offertpro.se" },
      { label: "Swedish site", href: "/" },
      { label: "German site", href: "/de" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "/en/contact" },
      { label: "FAQ", href: "/en/faq" },
      { label: "Security", href: "/en/security" },
      { label: "Status", href: "/en/status" },
      { label: "Log in", href: "/login" },
      { label: "Create account", href: "/signup" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/en/privacy" },
      { label: "Terms of service", href: "/en/terms" },
      { label: "DPA", href: "/en/dpa" },
      { label: "Cookies", href: "/en/cookies" },
    ],
  },
];

export default function FooterEn() {
  return (
    <footer className="bg-gray-950 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 lg:gap-12">
          <div className="col-span-2">
            <Link href="/en" className="inline-flex items-center gap-2.5 mb-6 group">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-brand-600 transition-colors duration-300">
                <span className="text-white text-xs font-bold">OP</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Offert Pro
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mb-8">
              The modern platform for proposals and invoices. Build professional
              documents, track in real time and close more deals.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:hello@offertpro.se"
                className="flex items-center gap-2.5 text-sm text-gray-500 hover:text-gray-300 transition-colors duration-300"
              >
                <Mail className="h-4 w-4" />
                hello@offertpro.se
              </a>
            </div>
            <div className="mt-6">
              <LanguageSwitcher variant="inline" />
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-6">
                {col.title}
              </h4>
              <ul className="space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            &copy; 2026 Offert Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
