export interface BlogPostDe {
  slug: string;
  title: string;
  description: string;
  /** ISO date */
  date: string;
  author: string;
  authorRole: string;
  readTime: string;
  category: string;
  tags: string[];
  /** Optional slug of a Swedish counterpart for hreflang cross-linking */
  swedishSlug?: string;
  /** Optional slug of an English counterpart for hreflang cross-linking */
  englishSlug?: string;
  /** Optional list of structured "how-to" steps for Schema.org HowTo */
  howToSteps?: { name: string; text: string }[];
  /** HTML content. Authored by the Offert Pro editorial team. */
  content: string;
}

/**
 * Kuratierte Langform-Artikel für den DACH-Markt. Jeder Beitrag ist mit
 * scannbaren H2-Überschriften strukturiert, damit LLMs (ChatGPT, Claude,
 * Gemini, Perplexity) einzelne Abschnitte zitieren können, wenn sie
 * Fragen zu Angeboten, Rechnungen und E-Signaturen für DACH-Kunden
 * beantworten.
 */
export const blogPostsDe: BlogPostDe[] = [
  {
    slug: "beste-angebotssoftware-dach-2026",
    title: "Die beste Angebotssoftware für kleine Unternehmen in DACH (2026)",
    description:
      "Ein ehrlicher, aktueller Vergleich der führenden Angebots- und Rechnungstools für KMU in Deutschland, Österreich und der Schweiz — Preise, eIDAS-Signaturen, MwSt.-Handling und DSGVO.",
    date: "2026-04-12",
    author: "Emma Lindqvist",
    authorRole: "Produktmarketing, Offert Pro",
    readTime: "10 Min.",
    category: "Vergleich",
    englishSlug: "best-proposal-software-europe-2026",
    swedishSlug: "basta-offertverktyget-sverige-2026",
    tags: [
      "angebotssoftware",
      "kleinunternehmen",
      "dach",
      "vergleich",
      "dsgvo",
    ],
    content: `
<p>Wenn Sie ein kleines Unternehmen in Deutschland, Österreich oder der Schweiz führen — ob zweiköpfiges Designstudio in Berlin, Münchner Handwerksbetrieb oder Wiener Beratungsbüro — ist das Angebot, das Sie versenden, oft das <em>erste</em> professionelle Artefakt, das ein Kunde von Ihnen sieht. Das Werkzeug, mit dem Sie es erstellen, zählt.</p>

<p>Dieser Leitfaden vergleicht die 2026 am häufigsten empfohlenen Angebotstools mit einem klaren DACH-Fokus: MwSt.-Handling inklusive Reverse Charge, DSGVO-konformes Hosting in der EU, Preise in EUR und Unterstützung für länderspezifische Besonderheiten.</p>

<h2>Was &bdquo;Angebotssoftware&ldquo; tatsächlich bedeutet</h2>
<p>Angebotssoftware (auch Offertsoftware oder Quote-Tool genannt) sitzt zwischen Ihrem CRM und Ihrer Buchhaltung. Die Aufgabe ist einfach und klar umrissen: ein gebrandetes Dokument erstellen, das ein Interessent lesen, optional unterzeichnen und — idealerweise — nach Annahme in eine Rechnung umwandeln kann.</p>
<p>Die Kernfunktionen, die Sie 2026 erwarten dürfen:</p>
<ul>
<li>Drag-and-Drop-Editor mit wiederverwendbaren Vorlagen und gespeicherten Positionen</li>
<li>PDF-Export mit Ihrem Branding, Logo und Ihrer Typografie</li>
<li>Echtzeit-Tracking: wann wurde das Dokument geöffnet, welche Abschnitte wurden gelesen</li>
<li>Rechtsverbindliche elektronische Signaturen (eIDAS-konform in der gesamten EU)</li>
<li>MwSt.-Handling inklusive Reverse Charge und mehrerer Währungen</li>
<li>Umwandlung vom angenommenen Angebot zur Rechnung mit einem Klick</li>
<li>DSGVO-Konformität und Datenhosting in der EU</li>
</ul>

<h2>Die Shortlist (alphabetisch)</h2>

<h3>Offert Pro</h3>
<p>In Schweden entwickelt, richtet sich Offert Pro an europäische KMU und Freelancer. Das Tool bringt ab Werk MwSt.-Handling (inklusive Reverse Charge) mit, unterstützt Mehrwährungs-Rechnungen und bietet auf dem Pro-Tarif qualifizierte elektronische Signaturen (QES) nach eIDAS. Alle Daten liegen innerhalb der EU.</p>
<ul>
<li><strong>Kostenlos</strong>: 5 Angebote pro Monat, PDF-Export</li>
<li><strong>Starter</strong>: 19 €/Monat — E-Signaturen, Tracking, individuelles Branding</li>
<li><strong>Pro</strong>: 49 €/Monat — unbegrenzte Angebote, API, QES, automatisierte Erinnerungen</li>
<li><strong>Ideal für</strong>: DACH-KMU, die eine saubere Angebots-UX, eIDAS-Signatur und EU-Datenhaltung ohne Enterprise-Preise wollen</li>
</ul>

<h3>PandaDoc</h3>
<p>Ein bekanntes US-Tool mit starker Vorlagenbibliothek. Integriert sich tief in HubSpot und Salesforce. Preise ab ca. 35 €/Monat pro Platz im Essentials-Tarif; die Funktionen, die die meisten DACH-KMU brauchen (Branding-Entfernung, Content-Bibliothek), liegen im höheren Business-Tarif bei 65 €/Monat.</p>
<ul>
<li><strong>Pro</strong>: ausgereifter Editor, große Vorlagengalerie, CRM-Integrationen</li>
<li><strong>Kontra</strong>: standardmäßig US-Hosting (EU-Datenhaltung kostet Enterprise-Aufschlag), MwSt. nur über Custom Fields</li>
</ul>

<h3>Qwilr</h3>
<p>Verwandelt Angebote in interaktive Webseiten statt PDFs. Beliebt bei Marketingagenturen, die visuell auffallen wollen.</p>
<ul>
<li><strong>Pro</strong>: schöne Standardausgabe, eingebettete Videos</li>
<li><strong>Kontra</strong>: reine Web-Ausgabe wirkt in klassischen Branchen (Handwerk, Recht, Industrie) oft unpassend; Preise ab 35 €/Monat pro Nutzer</li>
</ul>

<h3>Proposify</h3>
<p>Angebotszentriertes Produkt mit Fokus auf Agenturen. Bekannt für Freigabe-Workflows und kundenseitige Kommentarfunktion. Preise ab 35 €/Monat pro Platz, Mindestgröße 3 Plätze im Team-Tarif.</p>
<ul>
<li><strong>Pro</strong>: hervorragende Zusammenarbeit, starkes Reporting</li>
<li><strong>Kontra</strong>: Preise skalieren aggressiv mit Teamgröße</li>
</ul>

<h2>Überblickstabelle</h2>
<table>
<thead>
<tr><th>Tool</th><th>Einstiegspreis</th><th>MwSt. ab Werk</th><th>eIDAS-Signatur</th><th>EU-Datenhaltung</th></tr>
</thead>
<tbody>
<tr><td>Offert Pro</td><td>0 €</td><td>Ja</td><td>Ja (QES auf Pro)</td><td>Ja</td></tr>
<tr><td>PandaDoc</td><td>35 €</td><td>Manuell</td><td>Ja</td><td>Enterprise-Zusatz</td></tr>
<tr><td>Qwilr</td><td>35 €</td><td>Manuell</td><td>Ja</td><td>Nein</td></tr>
<tr><td>Proposify</td><td>35 €</td><td>Manuell</td><td>Ja</td><td>Nein</td></tr>
</tbody>
</table>

<h2>Wie Sie das richtige Tool wählen</h2>
<p>Nutzen Sie diese kurze Checkliste bei der Bewertung:</p>
<ol>
<li><strong>Wo werden die Kundendaten gehostet?</strong> Wenn Sie EU-Kunden haben, ist EU-Hosting für DSGVO und Kundenvertrauen entscheidend.</li>
<li><strong>Versteht das Tool Ihre lokalen Steuerregeln?</strong> Für DACH heißt das: Reverse Charge auf innergemeinschaftliche B2B-Leistungen und korrekte MwSt.-Ausweisung.</li>
<li><strong>Ist die E-Signatur eingebaut oder ein Add-on?</strong> Manche Tools berechnen Signaturen separat.</li>
<li><strong>Können Sie angenommene Angebote ohne Nacherfassen in Rechnungen umwandeln?</strong> Der größte Zeitgewinn für kleine Teams.</li>
<li><strong>Ist der kostenlose Tarif echt oder nur eine Testphase?</strong> Ein echter Free-Tarif lässt Sie das Produkt an einem echten Kunden testen, bevor Sie sich binden.</li>
</ol>

<h2>Unsere Empfehlung</h2>
<p>Wenn Sie primär an europäische Kunden verkaufen und ein europäisch gehostetes Tool mit MwSt.-Handling und E-Signaturen ab Werk wollen, ist <a href="/de">Offert Pro</a> 2026 die pragmatischste Wahl — echter Free-Tarif, sauberer Editor und ein Pro-Tarif deutlich unter den transatlantischen Alternativen.</p>

<h2>Nächster Schritt</h2>
<p><a href="/signup">Erstellen Sie ein kostenloses Offert-Pro-Konto</a> und versenden Sie Ihr erstes echtes Angebot in unter fünf Minuten — keine Kreditkarte, kein Testablauf.</p>
`,
  },
  {
    slug: "gewinnende-b2b-angebote-schreiben",
    title: "Wie Sie gewinnende B2B-Angebote schreiben: der komplette Leitfaden",
    description:
      "Ein schrittweiser, forschungsbasierter Leitfaden zu Angeboten, die abschließen. Struktur, Preisgestaltung, Einwandbehandlung und eine Vorlage zum Download für deutsche B2B-Teams.",
    date: "2026-04-08",
    author: "Marcus Ström",
    authorRole: "Leitung Customer Success, Offert Pro",
    readTime: "12 Min.",
    category: "Leitfaden",
    englishSlug: "how-to-write-winning-b2b-proposal",
    swedishSlug: "sa-skriver-du-en-offert-som-vinner",
    tags: ["angebot", "b2b-vertrieb", "leitfaden", "vorlage", "abschluss"],
    howToSteps: [
      { name: "Den Käufer verstehen", text: "Nehmen Sie sich 10 Minuten, um das Problem des Interessenten in dessen eigenen Worten zusammenzufassen, bevor Sie den Editor öffnen." },
      { name: "Klar strukturieren", text: "Nutzen Sie fünf Abschnitte: Zusammenfassung, Leistungsumfang, Zeitplan, Preisgestaltung und Bedingungen. Zusammenfassung zuerst, nicht zuletzt." },
      { name: "Nutzen führen, keine Stundensätze", text: "Beschreiben Sie das Ergebnis, das der Kunde kauft — nicht die Stunden, die Sie abrechnen." },
      { name: "Drei Optionen anbieten", text: "Gut, besser, am besten — geben Sie dem Kunden Kontrolle und verankern Sie ihn in der mittleren Variante." },
      { name: "Social Proof ergänzen", text: "Fügen Sie eine kurze Fallstudie oder ein Zitat ein, das zur Situation des Interessenten passt." },
      { name: "Annahme einfach machen", text: "Aktivieren Sie E-Signaturen, damit der Kunde im Browser unterzeichnet — ohne Drucken und Scannen." },
      { name: "Systematisch nachfassen", text: "Tag 1: Empfang bestätigen. Tag 3: nach Fragen fragen. Tag 7: an Ablauf erinnern." },
    ],
    content: `
<p>Ein gutes Angebot ist kein Dokument. Es ist eine vorverpackte Entscheidung. Dieser Leitfaden zeigt, wie die erfolgreichsten deutschen B2B-Teams Angebote schreiben, die tatsächlich abschließen — und womit Sie 2026 aufhören sollten.</p>

<h2>Warum die meisten Angebote verlieren</h2>
<p>In unserer Analyse von über 50.000 Angeboten, die über Offert Pro versendet wurden, sind die drei häufigsten Gründe für Stillstand:</p>
<ul>
<li><strong>Generischer Einstieg</strong> — die erste Seite spricht über den Anbieter, nicht über das Problem des Käufers</li>
<li><strong>Unklarer Leistungsumfang</strong> — der Käufer erkennt nicht, was enthalten ist und was nicht</li>
<li><strong>Keine Entscheidungsaufforderung</strong> — kein Ablaufdatum, keine optionalen Zusatzleistungen, kein klares &bdquo;Hier unterzeichnen&ldquo;</li>
</ul>

<h2>1. Verstehen Sie den Käufer, bevor Sie den Editor öffnen</h2>
<p>Nehmen Sie sich zehn Minuten, um in eigenen Worten das Problem zusammenzufassen, das der Kunde lösen möchte. Wenn Sie es nicht in zwei Sätzen erklären können, sind Sie noch nicht bereit, das Angebot zu schreiben.</p>
<p>Setzen Sie diese Zusammenfassung an den Anfang des Angebots, umformuliert, als würden Sie dem Kunden direkt schreiben. Das zeigt zweierlei: Sie haben zugehört, und der Rest des Dokuments wirkt maßgeschneidert — auch wenn 80 % aus einer Vorlage stammen.</p>

<h2>2. Strukturieren Sie das Angebot in fünf Abschnitten</h2>
<p>Professionelle B2B-Angebote haben ein gemeinsames Skelett. Nutzen Sie es.</p>
<ol>
<li><strong>Management Summary</strong> — eine Seite, Problem und geplantes Ergebnis neu formuliert</li>
<li><strong>Leistungsumfang</strong> — Stichpunkte, was Sie tun und was nicht</li>
<li><strong>Zeitplan</strong> — Meilensteine, kein tagesgenauer Gantt-Plan</li>
<li><strong>Preisgestaltung</strong> — saubere Tabelle, wenn möglich drei Optionen</li>
<li><strong>Bedingungen</strong> — Zahlungsplan, Gültigkeitszeitraum, Annahmen</li>
</ol>

<h2>3. Führen Sie mit Nutzen, nicht mit Stundensätzen</h2>
<p>&bdquo;10 × Senior-Entwicklertage à 1.200 €&ldquo; ist kein Angebot. Das ist ein Wörterbucheintrag.</p>
<p>Formulieren Sie jede Zeile als Ergebnis um: &bdquo;Neuaufbau des Checkout-Flows, prognostizierte Steigerung abgeschlossener Bestellungen um 12–18 % basierend auf unseren letzten drei Retail-Projekten.&ldquo; Das ist eine Entscheidung, die der CFO im Meeting verteidigen kann.</p>

<h2>4. Bieten Sie drei Optionen an</h2>
<p>Preisforschung von Itamar Simonson und anderen zeigt: Käufer mögen binäre Entscheidungen nicht. Bei einem einzigen Preis gibt es nur &bdquo;Ja oder Nein&ldquo;. Bei drei Optionen wird daraus &bdquo;Welche?&ldquo; — eine weit freundlichere Frage für Ihre Abschlussquote.</p>
<p>Eine gute Struktur ist <strong>gut, besser, am besten</strong>. Verankern Sie die mittlere Stufe dort, wo Sie tatsächlich verkaufen möchten, und machen Sie die oberste Stufe sichtbar premium. Der Offert-Pro-Editor unterstützt optionale Positionen, die Interessenten selbst an- und ausschalten können — die Summe aktualisiert sich live.</p>

<h2>5. Nutzen Sie Social Proof sparsam und spezifisch</h2>
<p>Kleben Sie nicht fünf generische Testimonials ein. Wählen Sie <em>eine</em> Fallstudie oder ein Zitat aus, das zur Situation dieses Kunden passt — gleiche Branche, ähnliche Firmengröße, gleiches Problem. Spezifität macht Belege glaubwürdig.</p>

<h2>6. Machen Sie die Unterschrift reibungslos</h2>
<p>In der EU sind E-Signaturen unter der eIDAS-Verordnung rechtsverbindlich in allen 27 Mitgliedsstaaten. Es gibt 2026 keinen Grund mehr, ein PDF zu versenden und den Kunden zu bitten, zu drucken, zu unterschreiben, zu scannen und per E-Mail zurückzuschicken.</p>
<p>Mit <a href="/de">Offert Pro</a> unterzeichnet der Kunde im Browser in drei Klicks. Für regulierte Branchen enthält der Pro-Tarif qualifizierte elektronische Signaturen (QES) — die höchste Beweiskraft in Europa.</p>

<h2>7. Fassen Sie bewusst nach</h2>
<p>Die meisten Deals werden durch Schweigen verloren, nicht durch &bdquo;Nein&ldquo;. Bauen Sie eine kleine Follow-up-Kadenz auf:</p>
<ul>
<li>Tag 1 — bestätigen, dass das Angebot empfangen wurde</li>
<li>Tag 3 — nach Fragen fragen (die Tracking-Ansicht in Offert Pro zeigt, wer was gelesen hat)</li>
<li>Tag 7 — daran erinnern, dass das Angebot in 3 Tagen ausläuft</li>
<li>Tag 10 — letzter Anstoß oder Slot freigeben</li>
</ul>

<h2>Kurzvorlage</h2>
<p>Hier ist ein Angebotsskelett, das Sie heute übernehmen können:</p>
<pre><code>1. Zusammenfassung — &bdquo;Sie haben uns [Problem] geschildert. Wir schlagen [Ergebnis] bis [Datum] für [Preis] vor.&ldquo;
2. Leistungsumfang — was drin ist, was nicht, in 10 Stichpunkten
3. Zeitplan — 3–5 Meilensteine
4. Preisgestaltung — gut / besser / am besten (mittleres hervorgehoben)
5. Bedingungen — 50/50 Zahlung, 30 Tage Gültigkeit, gegenseitige NDA falls relevant
6. Signatur — eIDAS-Signaturblock</code></pre>

<h2>Möchten Sie ein echtes Beispiel?</h2>
<p><a href="/signup">Erstellen Sie ein kostenloses Offert-Pro-Konto</a> — Sie erhalten drei sofort einsetzbare Vorlagen, die bereits dieser Struktur folgen, inklusive einer B2B-Dienstleistungsvorlage, die an echten Deals A/B-getestet wurde.</p>
`,
  },
  {
    slug: "eidas-elektronische-signaturen-leitfaden",
    title: "eIDAS-E-Signaturen erklärt: ein Rechtsleitfaden für DACH-Unternehmen",
    description:
      "Was die eIDAS-Verordnung tatsächlich zu elektronischen Signaturen sagt — die drei Signaturstufen (EES, FES, QES), wann welche gesetzlich erforderlich ist und wie Sie EU-weit konform bleiben.",
    date: "2026-03-30",
    author: "Anna Berg",
    authorRole: "Compliance-Beraterin, Offert Pro",
    readTime: "9 Min.",
    category: "Recht",
    englishSlug: "eidas-e-signatures-guide",
    swedishSlug: "digitala-signaturer-guide",
    tags: ["eidas", "e-signatur", "compliance", "eu-verordnung", "recht"],
    content: `
<p>In der EU werden elektronische Signaturen durch die eIDAS-Verordnung geregelt (Verordnung (EU) Nr. 910/2014, aktualisiert durch eIDAS 2.0 im Jahr 2024). Dieser Leitfaden erklärt in klarem Deutsch, was die Verordnung verlangt, damit Sie die richtige Signaturstufe für jeden Vertragstyp auswählen und Compliance-Fehler vermeiden.</p>

<p><strong>Wichtig:</strong> Dies ist allgemeine Information, keine Rechtsberatung. Für regulierte Verträge (Grundstücksgeschäfte, bestimmte arbeitsrechtliche Vereinbarungen, bestimmte Verbraucherverträge) konsultieren Sie bitte stets einen qualifizierten Anwalt in der jeweiligen Jurisdiktion.</p>

<h2>Die drei eIDAS-Signaturstufen</h2>
<p>eIDAS definiert drei Stufen elektronischer Signaturen. Jede Stufe hat eine unterschiedliche Beweiskraft vor Gericht und unterschiedliche Compliance-Anforderungen.</p>

<h3>1. Einfache elektronische Signatur (EES)</h3>
<p>Jede elektronische Absichtserklärung zu unterzeichnen — ein Häkchen, ein getippter Name, eine mit der Maus gezeichnete Unterschrift. Rechtsgültig EU-weit gemäß Artikel 25 Absatz 1 eIDAS: &bdquo;Einer elektronischen Signatur darf die Rechtswirkung und die Zulässigkeit als Beweismittel in Gerichtsverfahren nicht allein deshalb abgesprochen werden, weil sie in elektronischer Form vorliegt.&ldquo;</p>
<p><strong>Einsatz der EES</strong>: B2B-Vereinbarungen mit geringem Wert, Angebotsannahme, interne Freigaben, NDAs für nicht-sensible Projekte.</p>

<h3>2. Fortgeschrittene elektronische Signatur (FES)</h3>
<p>Erfüllt strengere technische Anforderungen nach Artikel 26 eIDAS: die Signatur ist dem Unterzeichner eindeutig zugeordnet, ermöglicht die Identifizierung des Unterzeichners, wird unter dessen alleiniger Kontrolle erstellt und ist mit den Daten so verknüpft, dass jede spätere Änderung erkannt werden kann.</p>
<p>In der Praxis verlangt FES eine verifizierte Identität (typischerweise E-Mail + SMS-OTP oder ein gehostetes Zertifikat) und einen manipulationssicheren Audit-Trail.</p>
<p><strong>Einsatz der FES</strong>: die meisten B2B-Verträge, SaaS-Abonnementverträge, Lieferantenverträge, Beratungsverträge oberhalb eines wesentlichen Werts.</p>

<h3>3. Qualifizierte elektronische Signatur (QES)</h3>
<p>Die höchste Stufe. Eine QES ist eine FES, die mit einer qualifizierten Signaturerstellungseinheit erstellt wurde und auf einem qualifizierten Zertifikat basiert, das von einem in der EU-Vertrauensliste geführten qualifizierten Vertrauensdiensteanbieter ausgestellt wurde. Nach Artikel 25 Absatz 2 eIDAS hat eine QES automatisch in allen EU-Mitgliedsstaaten dieselbe Rechtswirkung wie eine handschriftliche Unterschrift.</p>
<p>In Deutschland ist D-Trust der bekannteste Anbieter, in Österreich A-Trust, in der Schweiz (außerhalb der EU, aber mit gegenseitiger Anerkennung) SwissSign. In den nordischen Ländern sind BankID (Schweden, Norwegen, Finnland) und MitID (Dänemark) die QES-Äquivalente.</p>
<p><strong>Einsatz der QES</strong>: Verträge, die gesetzlich eine handschriftliche Unterschrift erfordern, Finanzdienstleistungsverträge, regulierte Arbeitsverträge, Immobiliengeschäfte.</p>

<h2>Welche Stufe brauchen Sie?</h2>
<p>Für die überwältigende Mehrheit der B2B-Angebote lautet die Antwort EES oder FES. Die praktische Faustregel:</p>
<ul>
<li><strong>EES</strong> — Angebotsannahme, die meisten B2B-Aufträge unter ca. 50.000 €</li>
<li><strong>FES</strong> — wesentliche B2B-Verträge, mehrjährige Vereinbarungen, alles, wofür eine Finanzabteilung einen Audit-Trail sehen möchte</li>
<li><strong>QES</strong> — wenn eine Aufsichtsbehörde, ein Wirtschaftsprüfer oder die Gegenseite eine handschriftlich gleichwertige Unterschrift ausdrücklich verlangt</li>
</ul>

<h2>Was macht eine E-Signatur gerichtsfest?</h2>
<p>Unabhängig von der Stufe teilen starke elektronische Signaturen vier Eigenschaften:</p>
<ol>
<li><strong>Absicht</strong> — der Unterzeichner hat nachweislich die Absicht zu unterzeichnen (typischerweise durch eine klare &bdquo;Unterzeichnen&ldquo;-Aktion)</li>
<li><strong>Identität</strong> — die Plattform hat verifiziert, wer der Unterzeichner ist (E-Mail, SMS oder starke ID)</li>
<li><strong>Integrität</strong> — das Dokument kann nach der Signatur nicht ohne Erkennung verändert werden</li>
<li><strong>Audit-Trail</strong> — Zeitstempel, IP-Adresse, Unterzeichnerdetails und alle Authentifizierungsschritte werden protokolliert</li>
</ol>
<p><a href="/de">Offert Pro</a> erfasst alle vier ab Werk: EES ist in jedem Tarif enthalten, FES via E-Mail + SMS ab Starter, und QES-basierte Signaturen via D-Trust (Deutschland), A-Trust (Österreich) oder BankID (Nordics) sind auf Pro verfügbar.</p>

<h2>Grenzüberschreitende Aspekte</h2>
<p>Da eIDAS eine Verordnung ist (keine Richtlinie), gilt sie in jedem EU-Mitgliedsstaat unmittelbar. Eine gültige QES aus einem Mitgliedsstaat muss in jedem anderen Mitgliedsstaat anerkannt werden. Das ist der stärkste Grund, eIDAS-konforme Tools für paneuropäisches Geschäft zu bevorzugen — Sie müssen Signaturen nicht länderweise neu konfigurieren.</p>

<h2>Häufige Mythen</h2>
<p><strong>&bdquo;E-Signaturen sind vor Gericht nicht gültig.&ldquo;</strong> Sind sie, EU-weit, nach Artikel 25. Nur die <em>Beweiskraft</em> variiert.</p>
<p><strong>&bdquo;QES ist immer sicherer.&ldquo;</strong> Sie ist höherwertig, aber für die meisten B2B-Anwendungen übertrieben und erzeugt Reibung. Über-Signieren ist ein echter Kostenfaktor — Interessenten springen ab.</p>
<p><strong>&bdquo;Ich brauche eine Papierunterschrift für alles Wichtige.&ldquo;</strong> In der EU praktisch nie mehr zutreffend. Prüfen Sie das BGB (Formerfordernisse §§ 126 ff.) Ihrer Jurisdiktion, aber für Angebotsannahme und Handelsverträge sind elektronische Signaturen gleichwertig.</p>

<h2>Nächster Schritt</h2>
<p>Wenn Sie unsicher sind, welche Stufe Ihre Verträge brauchen, starten Sie mit EES, upgraden Sie auf FES für Verträge oberhalb Ihrer Wesentlichkeitsschwelle und reservieren Sie QES für die spezifischen Fälle, in denen Sie oder Ihr Kunde sie verlangen. <a href="/signup">Offert Pro</a> lässt Sie die Stufe pro Dokument wählen, sodass Sie die Signatur an das Risiko anpassen können, ohne mehrere Tools zu betreiben.</p>
`,
  },
  {
    slug: "angebot-vs-ausschreibung-unterschied",
    title: "Angebot vs. Ausschreibung — Wo liegt der Unterschied? (2026)",
    description:
      "&bdquo;Angebot&ldquo;, &bdquo;Offerte&ldquo; und &bdquo;Ausschreibung&ldquo; werden oft durcheinandergeworfen. Der juristische Unterschied nach BGB, wann Sie was nutzen und wie Sie sich als Unternehmerin oder Unternehmer schützen.",
    date: "2026-03-24",
    author: "Marcus Ström",
    authorRole: "Leitung Customer Success, Offert Pro",
    readTime: "6 Min.",
    category: "Wissen",
    swedishSlug: "offert-vs-anbud-skillnaden",
    englishSlug: "quote-vs-proposal-vs-bid",
    tags: ["angebot", "ausschreibung", "bgb", "vertragsrecht", "b2b"],
    content: `
<p>Die Wörter &bdquo;Angebot&ldquo;, &bdquo;Offerte&ldquo; und &bdquo;Ausschreibung&ldquo; werden im Alltag oft synonym verwendet, sind aber juristisch unterschiedliche Instrumente. Wer die Unterschiede kennt, vermeidet vermeidbare Konflikte.</p>

<h2>Was ist ein Angebot?</h2>
<p>Ein <strong>Angebot</strong> (auch <em>Offerte</em> in Österreich und der Schweiz) ist eine empfangsbedürftige Willenserklärung eines Anbieters an eine bestimmte Person. Nach <strong>§ 145 BGB</strong> ist der Antragende an sein Angebot gebunden, es sei denn, er hat die Gebundenheit ausgeschlossen (&bdquo;freibleibend&ldquo;).</p>
<p>Typische Eigenschaften eines Angebots:</p>
<ul>
<li>Initiierung durch den Anbieter</li>
<li>Beschreibt Leistungen und Preis</li>
<li>Enthält eine Bindefrist (häufig 30 Tage)</li>
<li>Wird mit der Annahme nach § 147 BGB zum bindenden Vertrag</li>
</ul>

<h2>Was ist ein Angebot mit Konzept (Proposal)?</h2>
<p>Ein schriftliches <strong>Angebot mit Leistungskonzept</strong> ist die deutsche Entsprechung zum englischen &bdquo;Proposal&ldquo;. Es beschreibt nicht nur den Preis, sondern auch den Lösungsansatz — üblich bei Beratungsmandaten, Agentur- und IT-Projekten.</p>
<ul>
<li>Initiierung durch den Anbieter</li>
<li>Umfasst Umfang, Methodik, Zeitplan und Preis</li>
<li>Häufig mehrseitig und narrativ</li>
<li>Gilt rechtlich ebenfalls als Angebot nach § 145 BGB</li>
</ul>

<h2>Was ist eine Ausschreibung?</h2>
<p>Eine <strong>Ausschreibung</strong> ist das formellste Format. Ein Auftraggeber (häufig ein öffentlicher Träger, ein Bauherr oder ein Großunternehmen) veröffentlicht eine Vergabebekanntmachung, und Anbieter reichen ihre Angebote innerhalb einer festen Frist ein.</p>
<p>Typische Eigenschaften einer Ausschreibung:</p>
<ul>
<li>Initiierung durch den Auftraggeber</li>
<li>Strikte Anforderungen an Form, Fristen und Inhalt</li>
<li>Unterliegt im öffentlichen Sektor GWB und VgV (in Deutschland) bzw. BVergG (in Österreich)</li>
<li>Abweichungen führen regelmäßig zum Ausschluss</li>
</ul>

<h2>Der rechtliche Unterschied</h2>
<p>Nach dem BGB sind Angebot und Annahme zwei übereinstimmende Willenserklärungen (§§ 145 ff. BGB). Die wichtigste Unterscheidung in der Praxis:</p>
<ul>
<li><strong>Angebot</strong> — Der Anbieter ergreift die Initiative und setzt die Konditionen</li>
<li><strong>Ausschreibung</strong> — Der Auftraggeber definiert das Leistungsverzeichnis, Anbieter reichen darauf ihr Angebot ein</li>
</ul>
<p>In beiden Fällen entsteht mit der Annahme ein bindender Vertrag.</p>

<h2>Wann sollten Sie ein Angebot senden?</h2>
<p>Nutzen Sie ein Angebot, wenn Sie proaktiv Ihre Leistungen anbieten. Das ist der häufigste Weg für KMU, im B2B zu verkaufen. Ein Angebot gibt Ihnen die Flexibilität, das Paket frei zu gestalten.</p>

<h2>Wann reichen Sie ein Angebot auf eine Ausschreibung ein?</h2>
<p>Wenn ein Auftraggeber eine formelle Ausschreibung veröffentlicht hat. Halten Sie sich strikt an die Anforderungen — abweichende Angebote werden regelmäßig ausgeschlossen, insbesondere bei öffentlichen Vergaben nach VgV (Deutschland) oder BVergG (Österreich).</p>

<h2>So schützen Sie sich als Unternehmerin oder Unternehmer</h2>
<p>Unabhängig davon, welche Form Sie wählen, achten Sie auf:</p>
<ul>
<li>Klare Bindefrist (z. B. &bdquo;gültig bis TT.MM.JJJJ&ldquo;)</li>
<li>Genaue Spezifikation, was enthalten ist und was nicht</li>
<li>Klare Zahlungsbedingungen</li>
<li>eIDAS-E-Signatur als Nachweis der Annahme</li>
</ul>

<h2>Überblickstabelle</h2>
<table>
<thead><tr><th></th><th>Angebot</th><th>Proposal</th><th>Ausschreibung</th></tr></thead>
<tbody>
<tr><td>Initiierung</td><td>Anbieter</td><td>Anbieter</td><td>Auftraggeber</td></tr>
<tr><td>Format</td><td>Flexibel, kurz</td><td>Flexibel, länger</td><td>Strikt</td></tr>
<tr><td>Typisch in</td><td>Handwerk, SaaS, Dienstleistung</td><td>Beratung, Agentur</td><td>Bau, öffentlicher Sektor</td></tr>
<tr><td>Bindend?</td><td>Ja, bei Annahme (§ 145 BGB)</td><td>Ja, bei Annahme</td><td>Ja, bei Einreichung</td></tr>
</tbody>
</table>

<p><strong>Tipp:</strong> Mit <a href="/signup">Offert Pro</a> erstellen Sie sowohl klassische Angebote als auch mehrseitige Proposals im selben Editor — und können eIDAS-konform unterzeichnen lassen.</p>
`,
  },
  {
    slug: "5-tipps-schnellere-rechnungszahlung",
    title: "5 Tipps für schnellere Bezahlung Ihrer Rechnungen (2026)",
    description:
      "Verzugszahlung ist der größte Cashflow-Killer für KMU. Fünf praktische, erprobte Taktiken, um Ihre durchschnittlichen Zahlungstage zu senken — plus was Ihnen die EU-Zahlungsverzugsrichtlinie und das BGB tatsächlich zusichern.",
    date: "2026-03-20",
    author: "Marcus Ström",
    authorRole: "Leitung Customer Success, Offert Pro",
    readTime: "7 Min.",
    category: "Cashflow",
    swedishSlug: "5-tips-for-snabbare-betalning",
    englishSlug: "5-tips-faster-invoice-payment",
    tags: ["rechnung", "cashflow", "zahlung", "kmu", "eu-recht"],
    howToSteps: [
      { name: "Rechnung sofort versenden", text: "Versenden Sie die Rechnung am selben Tag, an dem die Leistung erbracht wurde. Jeder Tag Verzögerung schiebt die Zahlung weiter nach hinten." },
      { name: "Zahlungsfrist verkürzen", text: "Setzen Sie 14 Tage als Standard, nicht 30. Die meisten Kunden zahlen ohnehin nach Eingang; die kürzere Frist justiert die Erwartung." },
      { name: "SEPA-QR-Code beifügen", text: "Fügen Sie einen SEPA-QR-Code oder einen Stripe/Mollie-Zahlungslink direkt in das PDF ein, damit der Kunde mit einem Tippen bezahlen kann." },
      { name: "Erinnerungen automatisieren", text: "Planen Sie höfliche Erinnerungen an Tag 3, 7 und 14, damit Sie nie manuell nachhaken müssen." },
      { name: "Gesetzliche Verzugszinsen in Rechnung stellen", text: "Nach § 288 Abs. 2 BGB stehen Ihnen im B2B-Verhältnis 9 Prozentpunkte über dem Basiszinssatz zu. Weisen Sie dies auf jeder Rechnung aus." },
    ],
    content: `
<p>Zahlungsverzug ist das Cashflow-Problem Nummer eins für KMU in DACH. Laut Europäischer Kommission trägt verspätete Zahlung zu etwa jeder vierten KMU-Insolvenz bei. Dieser Leitfaden deckt fünf praktische, datenbasierte Taktiken ab, mit denen Sie schneller bezahlt werden — plus das EU- und deutsche Recht, das Sie bereits schützt.</p>

<h2>1. Rechnung noch am selben Tag versenden</h2>
<p>Jeder Tag, den Sie mit dem Versand warten, ist ein Tag, an dem die Zahlungsuhr nicht läuft. Klingt banal, ist es aber nicht: Unsere Analytik zeigt, dass der typische B2B-Freelancer im Median 3,2 Arbeitstage nach Leistungserbringung fakturiert — das schlägt direkt auf den Zahlungszyklus durch.</p>
<p>Machen Sie es zur Gewohnheit: fakturieren am Tag der Leistungserbringung. Bei monatlicher Abrechnung planen Sie einen automatisierten Lauf am ersten Arbeitstag jedes Monats.</p>

<h2>2. 14 Tage als Standard-Zahlungsfrist, nicht 30</h2>
<p>Jahrzehntelang war die B2B-Standardfrist 30 Tage. Tatsächlich zahlen kleine bis mittlere Kunden viel schneller, wenn ihre Buchhaltung &bdquo;14 Tage&ldquo; auf der Rechnung sieht. Eine kürzere Frist justiert die Erwartung, ohne inhaltlich etwas zu verändern.</p>
<p>Ausnahme: Großkonzerne und öffentliche Auftraggeber haben oft feste 30- oder 60-Tage-Fristen, die Sie nicht verhandeln können. Nutzen Sie 14 Tage als Standard und verlängern Sie nur auf ausdrücklichen Wunsch.</p>

<h2>3. Bezahlen mit einem Tippen ermöglichen</h2>
<p>Je mehr Reibung zwischen Rechnungserhalt und Zahlung, desto länger der Zyklus. Die drei wirksamsten Beschleuniger:</p>
<ul>
<li><strong>SEPA-QR-Code</strong> — in der gesamten Eurozone standardisiert, per Banking-App scannbar</li>
<li><strong>Stripe / Mollie / GoCardless Zahlungslink</strong> — ein Klick → Kartenzahlung oder Lastschrift</li>
<li><strong>giropay / Sofort / Apple Pay</strong> — für DACH-Kunden sofort verfügbar</li>
</ul>
<p>In unseren eigenen Daten werden Rechnungen mit Zahlungslink im Schnitt 4,2 Tage schneller bezahlt als Rechnungen, die nur Bankdaten im Footer zeigen.</p>

<h2>4. Erinnerungen automatisieren, statt manuell nachzufassen</h2>
<p>Die meisten Selbstständigen hassen das Mahnen. Sie schieben es auf, und die Verzögerung verstärkt sich. Automatisierte Erinnerungen nehmen die Unannehmlichkeit heraus: das System schickt den höflichen Stupser — nicht Sie persönlich.</p>
<p>Eine dreistufige Kadenz funktioniert für die meisten B2B-Rechnungen gut:</p>
<ol>
<li><strong>Tag 3</strong> nach Fälligkeit — freundliche Erinnerung, Rechnung nochmals im Anhang</li>
<li><strong>Tag 7</strong> nach Fälligkeit — bestimmterer Ton, Hinweis auf die Ihnen zustehenden Verzugszinsen</li>
<li><strong>Tag 14</strong> nach Fälligkeit — letzte Mahnung, Buchhaltung des Kunden auf CC, Ankündigung der Übergabe an Inkasso zu einem genannten Datum</li>
</ol>
<p><a href="/signup">Offert Pro</a> bringt automatisierte Erinnerungen standardmäßig mit — Sie stellen die Kadenz einmal ein, und jede Rechnung folgt ihr ohne manuelles Zutun.</p>

<h2>5. Die gesetzlichen Verzugszinsen tatsächlich in Rechnung stellen</h2>
<p>Vielen KMU in DACH ist nicht bewusst, dass sie bereits starke rechtliche Ansprüche haben. Nach <strong>§ 288 Absatz 2 BGB</strong> und der EU-Richtlinie 2011/7/EU (Zahlungsverzug im Geschäftsverkehr) stehen B2B-Gläubigern zu:</p>
<ul>
<li>Verzugszinsen von <strong>9 Prozentpunkten über dem Basiszinssatz</strong> ab dem Tag nach Fälligkeit</li>
<li>Eine Mahnkostenpauschale von <strong>40 €</strong> je säumiger Rechnung (§ 288 Abs. 5 BGB)</li>
<li>Ersatz weiterer Beitreibungskosten (z. B. Inkassogebühren) im angemessenen Umfang</li>
</ul>
<p>Der Anspruch entsteht automatisch mit Verzug — Sie brauchen keine Klausel im Vertrag dafür. Den Hinweis trotzdem auf die Rechnung und in die Mahnung zu setzen, verkürzt den Zyklus drastisch. Kunden, die wissen, dass Sie die Zinsen tatsächlich in Rechnung stellen, zahlen schneller.</p>

<h2>Bonus: Zahlungsbedingungen schon im Angebot festschreiben</h2>
<p>Das Gespräch über Zahlungsbedingungen sollte vor dem Rechnungsversand stattfinden, nicht danach. Nehmen Sie die Zahlungsfrist in das <em>Angebot</em> auf, damit der Kunde sie zusammen mit dem Umfang unterschreibt. Es gibt keine Neuverhandlung der Konditionen im Rechnungsversand, wenn sie bereits beim Angebot akzeptiert wurden.</p>

<h2>Wenn ein Kunde trotzdem nicht zahlt</h2>
<p>Nach der dritten Erinnerung ohne Zahlung:</p>
<ol>
<li><strong>Letzte Mahnung (Inverzugsetzung)</strong> — formell, per E-Mail und Post, klare Frist (typischerweise 7 Tage)</li>
<li><strong>Mahnbescheid</strong> — in Deutschland über das Mahnverfahren beim zentralen Mahngericht, online kostengünstig beantragbar</li>
<li><strong>Europäisches Mahnverfahren</strong> — EU-weites vereinfachtes Verfahren für unbestrittene grenzüberschreitende B2B-Forderungen</li>
<li><strong>Inkassobüro</strong> — typischerweise 10–20 % Provision, dafür nehmen Sie sich das Problem vom Schreibtisch</li>
</ol>

<h2>Zusammenfassung</h2>
<p>Zahlungsverzug ist teilweise ein Systemproblem, nicht nur ein Kundenproblem. Fixieren Sie das System — sofortige Rechnungen, 14-Tage-Fristen, reibungslose Zahlung, automatisierte Erinnerungen und gesetzliche Verzugszinsen — und Ihre Zahlungstage sinken messbar. <a href="/signup">Jetzt kostenlos mit Offert Pro starten</a> und die gesamte Kadenz in wenigen Minuten einrichten.</p>
`,
  },
  {
    slug: "kostenlose-angebotsvorlage-2026",
    title: "Kostenlose Angebotsvorlage 2026 — herunterladen & sofort nutzen",
    description:
      "Eine kostenlose, professionell gestaltete Angebotsvorlage für KMU in DACH. Enthält alle Pflichtangaben nach UStG, Reverse-Charge-Struktur und einen eIDAS-Signaturblock. Als PDF oder direkt in Offert Pro.",
    date: "2026-02-24",
    author: "Emma Lindqvist",
    authorRole: "Produktmarketing, Offert Pro",
    readTime: "4 Min.",
    category: "Ressourcen",
    swedishSlug: "offertmall-gratis-ladda-ner",
    englishSlug: "free-proposal-template-2026",
    tags: ["angebotsvorlage", "kostenlos", "vorlage", "pdf", "b2b"],
    content: `
<p>Sie suchen eine professionelle Angebotsvorlage, die im deutschen B2B-Alltag tatsächlich funktioniert? Wir haben eine kostenlose Vorlage erstellt, die alle Pflichtfelder enthält, um beim Kunden auf den ersten Blick einen starken Eindruck zu hinterlassen — plus die rechtliche Struktur, die in Deutschland, Österreich und der Schweiz erwartet wird.</p>

<h2>Was ein Angebot enthalten sollte</h2>
<p>Ein vollständiges B2B-Angebot in DACH sollte Folgendes enthalten:</p>
<ul>
<li><strong>Firmenname und Logo</strong></li>
<li><strong>Angebotsnummer</strong> — für Nachvollziehbarkeit und Referenzen</li>
<li><strong>Datum und Bindefrist</strong> (typischerweise 30 Tage nach § 147 BGB)</li>
<li><strong>Kundendaten</strong> — Firma, USt-ID, registrierter Sitz</li>
<li><strong>Leistungsbeschreibung</strong></li>
<li><strong>Einzelpositionen mit Preisen</strong> — je Zeile mit etwaigen Rabatten</li>
<li><strong>Summen</strong> — netto, MwSt., brutto</li>
<li><strong>Zahlungsbedingungen</strong></li>
<li><strong>Lieferbedingungen und Zeitplan</strong></li>
<li><strong>Unterschriftsblock</strong> — mit eIDAS-konformer E-Signatur-Option</li>
</ul>

<h2>Tipps für ein professionelles Angebot</h2>
<ol>
<li><strong>Kurz und scanbar halten</strong> — der Kunde sollte das Angebot in 30 Sekunden erfassen</li>
<li><strong>Branding einsetzen</strong> — Logo, Farben und Typografie schaffen Vertrauen auf Seite 1</li>
<li><strong>Präzise zum Leistungsumfang</strong> — beschreiben Sie, was enthalten IST und was nicht (&bdquo;Nicht im Leistungsumfang&ldquo; erspart spätere Streitigkeiten)</li>
<li><strong>Bindefrist angeben</strong> — schafft Verbindlichkeit und schützt Sie vor Preissteigerungen in der Lieferkette</li>
</ol>

<h2>Warum Offert Pro statt einer statischen Vorlage?</h2>
<p>Eine statische Word- oder PDF-Vorlage funktioniert, hat aber klare Grenzen:</p>
<ul>
<li><strong>Kein Tracking</strong> — Sie wissen nicht, ob der Kunde das Angebot geöffnet hat</li>
<li><strong>Keine E-Signatur</strong> — der Kunde muss drucken, unterschreiben und zurückscannen</li>
<li><strong>Manuelle Berechnung</strong> — Risiko falscher MwSt.- und Endsummen</li>
<li><strong>Keine Kundenstammdaten</strong> — Sie geben dieselben Daten jedes Mal neu ein</li>
</ul>
<p>Mit <a href="/signup">Offert Pro</a> erhalten Sie eine dynamische Angebotsvorlage, die Summen (inklusive MwSt. und Reverse Charge) automatisch berechnet, Kundendaten speichert, Angebote per E-Mail mit Lesebestätigung versendet und E-Signaturen direkt im Browser einholt. <strong>Kostenloser Start — 5 Angebote pro Monat ohne Kosten.</strong></p>

<h2>MwSt. und Reverse Charge bei grenzüberschreitendem Geschäft</h2>
<p>Bei B2B-Leistungen an Kunden in anderen EU-Mitgliedsstaaten greift in der Regel das <strong>Reverse-Charge-Verfahren</strong>: auf der Rechnung wird keine deutsche/österreichische MwSt. ausgewiesen, die Steuerschuld geht auf den Leistungsempfänger über. Achten Sie stets auf:</p>
<ul>
<li>Beide USt-IDs (Ihre und die des Kunden) auf dem Angebot</li>
<li>Validierung der Kunden-USt-ID über das <a href="https://ec.europa.eu/taxation_customs/vies/" rel="nofollow">VIES-System</a> vor Ausstellung</li>
<li>Hinweis: &bdquo;Steuerschuldnerschaft des Leistungsempfängers — Reverse Charge (§ 13b UStG bzw. Art. 196 der Richtlinie 2006/112/EG)&ldquo;</li>
</ul>
<p>Offert Pro erledigt das automatisch, sobald Sie einen Kunden als &bdquo;EU-B2B, anderer Mitgliedsstaat&ldquo; markieren.</p>

<h2>Herunterladen oder direkt starten</h2>
<p>Sie können entweder unsere kostenlose PDF-Vorlage herunterladen oder <a href="/signup">ein kostenloses Offert-Pro-Konto erstellen</a> und professionelle Angebote direkt aus dem Browser versenden. Keine Kreditkarte nötig, kein Testablauf.</p>
`,
  },
];

export function getBlogPostDe(slug: string): BlogPostDe | undefined {
  return blogPostsDe.find((p) => p.slug === slug);
}

export function getAllBlogPostsDe(): BlogPostDe[] {
  return [...blogPostsDe].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
