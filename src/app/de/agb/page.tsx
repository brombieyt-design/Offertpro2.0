import type { Metadata } from "next";
import Link from "next/link";
import NavbarDe from "@/components/landing/de/NavbarDe";
import FooterDe from "@/components/landing/de/FooterDe";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";
const LAST_UPDATED = "2026-04-15";

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen – Offert Pro",
  description:
    "AGB für die Nutzung des Offert-Pro-Dienstes. Vertrag, Abonnement, Haftung und schwedisches Recht.",
  alternates: {
    canonical: `${SITE_URL}/de/agb`,
    languages: {
      "sv-SE": `${SITE_URL}/villkor`,
      en: `${SITE_URL}/en/terms`,
      de: `${SITE_URL}/de/agb`,
      "x-default": `${SITE_URL}/villkor`,
    },
  },
  openGraph: {
    title: "AGB – Offert Pro",
    description: "Allgemeine Geschäftsbedingungen für den Offert-Pro-Dienst.",
    url: `${SITE_URL}/de/agb`,
    locale: "de",
    alternateLocale: ["sv_SE", "en"],
    type: "website",
  },
};

export default function AgbPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarDe />

      <article className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">Rechtliches</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Allgemeine Geschäftsbedingungen
          </h1>
          <p className="text-sm text-gray-400 mb-12">
            Zuletzt aktualisiert:{" "}
            {new Date(LAST_UPDATED).toLocaleDateString("de-DE", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="prose prose-gray max-w-none prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-p:leading-relaxed prose-p:text-gray-600 prose-li:text-gray-600 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline">
            <p>
              Diese AGB regeln Ihre Nutzung des Offert-Pro-Dienstes (der
              &bdquo;Dienst&ldquo;), der von der Offert Pro AB, Reg.-Nr.
              559123-4567 (&bdquo;wir&ldquo;, &bdquo;uns&ldquo;), bereitgestellt
              wird. Mit der Erstellung eines Kontos akzeptieren Sie diese AGB.
            </p>

            <h2>1. Vertragsschluss</h2>
            <p>
              Der Vertrag kommt zustande, wenn Sie ein Konto erstellen und
              diese AGB bestätigen. Verbraucherinnen und Verbrauchern in der
              EU steht ein 14-tägiges Widerrufsrecht nach der
              Verbraucherrechte-Richtlinie (2011/83/EU) bzw. § 312g BGB zu —
              es sei denn, Sie verzichten ausdrücklich darauf, um den Dienst
              sofort zu nutzen.
            </p>

            <h2>2. Leistungsumfang</h2>
            <p>
              Wir stellen eine webbasierte Plattform zur Erstellung,
              Versendung, Signatur und Abrechnung von Angeboten bereit.
              Tarif-Funktionen finden Sie unter{" "}
              <Link href="/de/pricing">Preise</Link>. Wir behalten uns vor, den
              Dienst weiterzuentwickeln; wesentliche Reduktionen kostenpflichtiger
              Funktionen werden mindestens 30 Tage im Voraus angekündigt.
            </p>

            <h2>3. Abonnement und Abrechnung</h2>
            <ul>
              <li>Der Dienst wird in einer kostenlosen Stufe sowie in Bezahltarifen gemäß Preisliste angeboten.</li>
              <li>Bezahltarife werden monatlich oder jährlich im Voraus über Stripe abgerechnet.</li>
              <li>Preise verstehen sich zzgl. MwSt. und können mit 60 Tagen Ankündigung geändert werden.</li>
              <li>Bei ausbleibender Zahlung werden Bezahlfunktionen pausiert, bis der Saldo ausgeglichen ist.</li>
            </ul>

            <h2>4. Kündigung</h2>
            <p>
              Sie können Ihr Konto jederzeit in der App kündigen. Die
              Kündigung wirkt zum Ende des laufenden Abrechnungszeitraums; es
              erfolgt keine anteilige Erstattung. Wir löschen Ihre Daten
              innerhalb von 30 Tagen gemäß unserer{" "}
              <Link href="/de/datenschutz">Datenschutzerklärung</Link>, mit
              Ausnahme dessen, was aus rechtlichen Gründen aufbewahrt werden
              muss.
            </p>

            <h2>5. Ihre Inhalte</h2>
            <p>
              Sämtliche von Ihnen hochgeladenen oder erstellten Inhalte
              (Angebote, Rechnungen, Kundendaten, Vorlagen) verbleiben in
              Ihrem Eigentum. Sie räumen uns eine beschränkte, nicht
              ausschließliche Lizenz ein, die Inhalte zur Bereitstellung des
              Dienstes zu speichern und zu verarbeiten.
            </p>
            <p>
              Sie sind dafür verantwortlich, dass die Inhalte rechtmäßig sind
              und Sie zur Verarbeitung der enthaltenen personenbezogenen
              Daten berechtigt sind. Soweit personenbezogene Daten in Ihrem
              Auftrag verarbeitet werden, handeln wir als Auftragsverarbeiter
              auf Grundlage unseres{" "}
              <Link href="/de/avv">Auftragsverarbeitungsvertrags (AVV)</Link>.
            </p>

            <h2>6. Zulässige Nutzung</h2>
            <ul>
              <li>Keine rechtswidrigen, irreführenden oder schädlichen Aktivitäten</li>
              <li>Kein Reverse Engineering oder unbefugter Zugriffsversuch</li>
              <li>Kein Massenversand von kommerziellen E-Mails entgegen DSGVO oder Richtlinie 2002/58/EG (ePrivacy)</li>
              <li>Keine Nutzung, die unsere Systeme überlastet (Fair Use gilt)</li>
            </ul>

            <h2>7. Verfügbarkeit und Support</h2>
            <p>
              Wir streben eine Verfügbarkeit von 99,9 % pro Kalendermonat
              gemessen an den Hauptkomponenten des Dienstes an (siehe{" "}
              <Link href="/de/status">Status</Link>). Service-Gutschriften für
              Unterschreitung des Pro-SLA werden nach Kundenvereinbarung
              behandelt. Standard-Support erfolgt per E-Mail; Antwortzeiten je
              Tarif finden Sie auf der Preisseite.
            </p>

            <h2>8. Haftungsbegrenzung</h2>
            <p>
              Im größtmöglichen gesetzlich zulässigen Rahmen ist unsere
              gesamte Haftung Ihnen gegenüber pro Kalenderjahr begrenzt auf
              den Betrag, den Sie für den Dienst im selben Zeitraum gezahlt
              haben. Wir haften nicht für mittelbare Schäden, entgangenen
              Gewinn oder Datenverluste, die Sie durch regelmäßige Exporte
              hätten verhindern können.
            </p>

            <h2>9. Höhere Gewalt</h2>
            <p>
              Wir haften nicht für Ausfälle, die durch Umstände außerhalb
              unserer angemessenen Kontrolle verursacht werden (z. B. Ausfall
              des Cloud-Anbieters, Cyberangriffe, Krieg, Naturkatastrophen).
            </p>

            <h2>10. Änderungen</h2>
            <p>
              Wir können diese AGB anpassen. Wesentliche Änderungen werden
              per E-Mail und in der App mindestens 30 Tage im Voraus
              angekündigt. Die fortgesetzte Nutzung nach Inkrafttreten gilt
              als Zustimmung.
            </p>

            <h2>11. Anwendbares Recht und Streitbeilegung</h2>
            <p>
              Es gilt schwedisches Recht. Streitigkeiten werden vor
              schwedischen ordentlichen Gerichten beigelegt; erste Instanz
              ist das Bezirksgericht Stockholm. Verbraucherinnen und
              Verbraucher können sich zudem an die Online-Streitbeilegungsplattform
              der EU-Kommission wenden.
            </p>

            <h2>12. Kontakt</h2>
            <p>
              Offert Pro AB · Stockholm, Schweden ·{" "}
              <a href="mailto:hello@offertpro.se">hello@offertpro.se</a>
            </p>
          </div>
        </div>
      </article>

      <FooterDe />
    </div>
  );
}
