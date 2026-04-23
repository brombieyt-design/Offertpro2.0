import type { Metadata } from "next";
import Link from "next/link";
import NavbarDe from "@/components/landing/de/NavbarDe";
import FooterDe from "@/components/landing/de/FooterDe";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";
const LAST_UPDATED = "2026-04-15";

export const metadata: Metadata = {
  title: "Datenschutzerklärung – Offert Pro",
  description:
    "Wie Offert Pro Ihre personenbezogenen Daten gemäß DSGVO erhebt, verwendet und schützt. EU-gehostet, verschlüsselt und auf Ihrer Einwilligung basierend.",
  alternates: {
    canonical: `${SITE_URL}/de/datenschutz`,
    languages: {
      "sv-SE": `${SITE_URL}/integritet`,
      en: `${SITE_URL}/en/privacy`,
      de: `${SITE_URL}/de/datenschutz`,
      "x-default": `${SITE_URL}/integritet`,
    },
  },
  openGraph: {
    title: "Datenschutzerklärung – Offert Pro",
    description:
      "Wie wir Ihre personenbezogenen Daten gemäß DSGVO behandeln.",
    url: `${SITE_URL}/de/datenschutz`,
    locale: "de",
    alternateLocale: ["sv_SE", "en"],
    type: "website",
  },
};

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarDe />

      <article className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">
            Rechtliches
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Datenschutzerklärung
          </h1>
          <p className="text-sm text-gray-400 mb-12">
            Zuletzt aktualisiert:{" "}
            {new Date(LAST_UPDATED).toLocaleDateString("de-DE", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="prose prose-gray max-w-none prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-p:leading-relaxed prose-p:text-gray-600 prose-li:text-gray-600 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline">
            <p>
              Diese Erklärung beschreibt, wie die Offert Pro AB
              (&bdquo;Offert Pro&ldquo;, &bdquo;wir&ldquo;, &bdquo;uns&ldquo;)
              Ihre personenbezogenen Daten verarbeitet, wenn Sie unseren
              Dienst auf <Link href="/de">offertpro.se</Link> nutzen. Wir sind
              Verantwortliche im Sinne der DSGVO für die Daten, die Sie uns
              überlassen.
            </p>

            <h2>1. Welche Daten wir erheben</h2>
            <ul>
              <li><strong>Kontodaten</strong> — Name, E-Mail, gehashtes Passwort, Firmenname, USt-ID.</li>
              <li><strong>Inhalte, die Sie erstellen</strong> — Angebote, Rechnungen, Kundendaten, Vorlagen, Anhänge.</li>
              <li><strong>Nutzungsdaten</strong> — IP-Adresse, Browser, Seitenaufrufe, Klicks (zu Fehlerbehebung und Produktverbesserung).</li>
              <li><strong>Zahlungsdaten</strong> — werden direkt von Stripe verarbeitet; wir speichern nur Abonnementstatus und Rechnungsadresse.</li>
            </ul>

            <h2>2. Warum wir sie verarbeiten</h2>
            <ul>
              <li><strong>Vertrag</strong> (Art. 6 Abs. 1 lit. b DSGVO) — zur Bereitstellung des bestellten Dienstes.</li>
              <li><strong>Berechtigtes Interesse</strong> (Art. 6 Abs. 1 lit. f) — zur Produktverbesserung, Missbrauchsabwehr und Betriebssicherheit.</li>
              <li><strong>Rechtliche Verpflichtung</strong> (Art. 6 Abs. 1 lit. c) — für Buchhaltung und steuerliche Aufzeichnungen.</li>
              <li><strong>Einwilligung</strong> (Art. 6 Abs. 1 lit. a) — für nicht-essentielle Cookies und Marketing-E-Mails.</li>
            </ul>

            <h2>3. Wie lange wir Daten aufbewahren</h2>
            <p>
              Kontodaten und Inhalte bleiben gespeichert, solange Ihr Konto
              aktiv ist. Bei Kündigung löschen wir alles innerhalb von 30
              Tagen, mit Ausnahme von Daten, die wir aus rechtlichen Gründen
              aufbewahren müssen (typischerweise 10 Jahre für steuerrelevante
              Belege gemäß §§ 147 AO bzw. 257 HGB in Deutschland).
            </p>

            <h2>4. Wo Daten gespeichert werden</h2>
            <p>
              Alle Daten werden innerhalb der EU gespeichert. Primärregion ist
              Frankfurt (AWS eu-central-1) mit Backup in Stockholm. Keine
              personenbezogenen Daten werden in die USA oder Drittländer
              übermittelt, ohne dass eine geeignete Schutzmaßnahme vorliegt
              (Standardvertragsklauseln oder EU-US Data Privacy Framework).
              Details: <Link href="/de/sicherheit">Sicherheit</Link>.
            </p>

            <h2>5. Wer Zugriff hat</h2>
            <p>
              Nur erforderliche Mitarbeitende von Offert Pro sowie unsere
              geprüften Unterauftragsverarbeiter, gelistet auf{" "}
              <Link href="/de/sicherheit">/de/sicherheit</Link>. Alle
              Unterauftragsverarbeiter sind durch Auftragsverarbeitungsverträge
              (AV-Verträge) gebunden.
            </p>

            <h2>6. Ihre Rechte nach DSGVO</h2>
            <ul>
              <li>Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16)</li>
              <li>Löschung Ihrer Daten (Art. 17)</li>
              <li>Einschränkung oder Widerspruch gegen Verarbeitung (Art. 18, 21)</li>
              <li>Datenübertragbarkeit (Art. 20)</li>
              <li>Beschwerde bei Ihrer Aufsichtsbehörde (z. B. BfDI in Deutschland)</li>
            </ul>
            <p>
              Zur Ausübung Ihrer Rechte schreiben Sie an{" "}
              <a href="mailto:privacy@offertpro.se">privacy@offertpro.se</a>.
              Wir antworten innerhalb von 30 Tagen.
            </p>

            <h2>7. Cookies</h2>
            <p>
              Wir setzen ein Minimum an Cookies ein, damit der Dienst
              funktioniert. Details in unserer{" "}
              <Link href="/de/cookies">Cookie-Erklärung</Link>.
            </p>

            <h2>8. Sicherheit</h2>
            <p>
              Alle Daten werden mit AES-256 ruhend und TLS 1.3 bei Übertragung
              verschlüsselt. Nach Art. 33 DSGVO sind wir verpflichtet,
              Datenschutzverletzungen innerhalb von 72 Stunden bei der
              zuständigen Aufsichtsbehörde zu melden. Sicherheitsthemen an{" "}
              <a href="mailto:security@offertpro.se">security@offertpro.se</a>.
            </p>

            <h2>9. Änderungen</h2>
            <p>
              Wir aktualisieren diese Erklärung, wenn sich der Dienst oder die
              geltenden Gesetze ändern. Wesentliche Änderungen werden per
              E-Mail und in der App mindestens 30 Tage im Voraus mitgeteilt.
            </p>

            <h2>10. Kontakt</h2>
            <p>
              Offert Pro AB · Stockholm, Schweden ·{" "}
              <a href="mailto:privacy@offertpro.se">privacy@offertpro.se</a>
            </p>
          </div>
        </div>
      </article>

      <FooterDe />
    </div>
  );
}
