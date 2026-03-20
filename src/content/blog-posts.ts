export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  tags: string[];
  content: string; // HTML content
}

export const blogPosts: BlogPost[] = [
  {
    slug: "sa-skriver-du-en-offert-som-vinner",
    title: "Så skriver du en offert som vinner – 7 beprövade tips",
    description:
      "Lär dig skriva offerter som konverterar. Från rätt struktur och prissättning till uppföljningsstrategier som ökar din acceptansgrad med upp till 40%.",
    date: "2026-03-15",
    author: "Emma Lindqvist",
    readTime: "8 min",
    category: "Guide",
    tags: ["offert", "tips", "säljstrategi", "småföretag"],
    content: `
<p>Att skriva en offert som faktiskt leder till affär handlar om mer än bara rätt pris. Det handlar om att kommunicera värde, bygga förtroende och göra det enkelt för kunden att säga ja.</p>

<h2>1. Börja med kundens problem, inte din lösning</h2>
<p>Den vanligaste misstaget i offerter är att börja med en lång beskrivning av ditt företag. Kunden vet redan vem du är – de vill veta att du förstår <em>deras</em> situation.</p>
<p>Börja offerten med en kort sammanfattning av kundens utmaning. Visa att du har lyssnat och förstår vad de behöver. Det skapar omedelbart förtroende.</p>

<h2>2. Strukturera offerten tydligt</h2>
<p>En professionell offert ska vara lätt att skanna. Använd tydliga rubriker, punktlistor och en visuell hierarki. De viktigaste delarna är:</p>
<ul>
<li><strong>Sammanfattning</strong> – vad du erbjuder och varför</li>
<li><strong>Omfattning</strong> – exakt vad som ingår (och vad som inte ingår)</li>
<li><strong>Tidplan</strong> – när leverans sker</li>
<li><strong>Prissättning</strong> – tydlig uppdelning av kostnader</li>
<li><strong>Villkor</strong> – betalningsvillkor och giltighet</li>
</ul>

<h2>3. Visa värdet, inte bara priset</h2>
<p>Istället för att bara lista timpriser, förklara vilken avkastning kunden kan förvänta sig. Om du exempelvis erbjuder en ny hemsida, skriv inte bara "Webbutveckling: 50 000 kr" – skriv "Ny hemsida som beräknas öka era leads med 30%, baserat på liknande projekt".</p>

<h2>4. Erbjud alternativ</h2>
<p>Ge kunden 2-3 alternativ: ett grundpaket, ett rekommenderat paket och ett premiumpaket. Forskning visar att kunder ofta väljer mittenalternativet, vilket ger dig möjlighet att styra mot den lösning som passar bäst.</p>

<h2>5. Använd socialt bevis</h2>
<p>Inkludera korta kundcitat, fallstudier eller omnämn relevanta tidigare projekt. "Vi hjälpte Byggmax AB att minska offerttiden med 60%" är kraftfullare än att lista dina kompetenser.</p>

<h2>6. Gör det enkelt att acceptera</h2>
<p>Ju fler steg kunden behöver ta för att acceptera, desto fler faller bort. Använd <strong>e-signaturer</strong> så kunden kan godkänna direkt i webbläsaren. Med Offert Pro kan kunden signera med ett klick – ingen utskrift eller skanning behövs.</p>

<h2>7. Följ upp strategiskt</h2>
<p>Skicka inte bara offerten och hoppas på det bästa. Planera uppföljning:</p>
<ul>
<li><strong>Dag 1</strong> – Bekräfta att offerten mottagits</li>
<li><strong>Dag 3</strong> – Kolla om det finns frågor</li>
<li><strong>Dag 7</strong> – Påminn om giltighetsdatumet</li>
</ul>
<p>Med Offert Pro ser du i realtid om kunden har öppnat offerten, så du vet exakt när det är dags att följa upp.</p>

<h2>Sammanfattning</h2>
<p>En vinnande offert handlar om att visa förståelse, kommunicera värde och göra det enkelt för kunden. Med rätt verktyg och strategi kan du öka din acceptansgrad avsevärt.</p>
<p><strong>Tips:</strong> <a href="/signup">Testa Offert Pro gratis</a> och skapa din första professionella offert på under 5 minuter.</p>
`,
  },
  {
    slug: "offert-vs-anbud-skillnaden",
    title: "Offert vs anbud – Vad är skillnaden? (2026 Guide)",
    description:
      "Många blandar ihop offert och anbud. Lär dig den juridiska skillnaden, när du ska använda vilken, och hur du skyddar dig som företagare.",
    date: "2026-03-10",
    author: "Marcus Ström",
    readTime: "6 min",
    category: "Kunskap",
    tags: ["offert", "anbud", "juridik", "guide"],
    content: `
<p>Orden "offert" och "anbud" används ofta synonymt i vardagsspråk, men det finns en viktig juridisk skillnad som alla företagare bör känna till.</p>

<h2>Vad är en offert?</h2>
<p>En <strong>offert</strong> är ett erbjudande från ett företag till en potentiell kund. Den beskriver vad som erbjuds, till vilket pris och under vilka villkor. En offert är i regel bindande under den giltighetstid som anges.</p>
<p>Typiska egenskaper för en offert:</p>
<ul>
<li>Initieras av säljaren</li>
<li>Beskriver produkter/tjänster och priser</li>
<li>Har en angiven giltighetstid</li>
<li>Blir bindande när kunden accepterar</li>
</ul>

<h2>Vad är ett anbud?</h2>
<p>Ett <strong>anbud</strong> (eller anbudsgivning) är ett mer formellt förfarande, ofta inom bygg och offentlig upphandling. Det innebär att beställaren skickar ut en anbudsförfrågan, och leverantörer svarar med sina anbud.</p>
<p>Typiska egenskaper för ett anbud:</p>
<ul>
<li>Initieras av köparen (anbudsförfrågan)</li>
<li>Följer ofta strikta format och kravspecifikationer</li>
<li>Kan vara juridiskt bindande enligt avtalslagen</li>
<li>Vanligt inom offentlig sektor och byggindustrin</li>
</ul>

<h2>Den juridiska skillnaden</h2>
<p>Enligt <strong>avtalslagen (1915:218)</strong> är både offert och anbud bindande löften. Den viktigaste skillnaden i praktiken:</p>
<ul>
<li><strong>Offert</strong> – säljaren tar initiativet och sätter villkoren</li>
<li><strong>Anbud</strong> – köparen definierar kravspecifikationen, leverantören svarar</li>
</ul>
<p>I båda fallen gäller: när motparten accepterar, uppstår ett bindande avtal.</p>

<h2>När ska du använda offert?</h2>
<p>Använd offert när du proaktivt vill erbjuda dina tjänster till en kund. Det är det vanligaste sättet för småföretag att sälja B2B. En offert ger dig flexibilitet att designa erbjudandet som du vill.</p>

<h2>När ska du svara med anbud?</h2>
<p>Svara med anbud när en kund eller organisation har skickat ut en formell anbudsförfrågan. Följ alltid kravspecifikationen noggrant – anbud som avviker brukar förkastas, särskilt inom offentlig upphandling.</p>

<h2>Skydda dig som företagare</h2>
<p>Oavsett om du skickar en offert eller ett anbud, se till att:</p>
<ul>
<li>Ange tydlig giltighetstid</li>
<li>Specificera exakt vad som ingår och inte ingår</li>
<li>Skriv tydliga betalningsvillkor</li>
<li>Använd e-signaturer för juridisk spårbarhet</li>
</ul>

<h2>Sammanfattning</h2>
<table>
<thead><tr><th></th><th>Offert</th><th>Anbud</th></tr></thead>
<tbody>
<tr><td>Initiativ</td><td>Säljaren</td><td>Köparen</td></tr>
<tr><td>Format</td><td>Flexibelt</td><td>Ofta strikt</td></tr>
<tr><td>Vanligt inom</td><td>B2B-försäljning</td><td>Upphandling, bygg</td></tr>
<tr><td>Bindande?</td><td>Ja, vid accept</td><td>Ja, vid accept</td></tr>
</tbody>
</table>

<p><strong>Tips:</strong> Med <a href="/signup">Offert Pro</a> kan du skapa professionella offerter med korrekt juridisk struktur på minuter.</p>
`,
  },
  {
    slug: "5-tips-for-snabbare-betalning",
    title: "5 tips för snabbare betalning på dina fakturor",
    description:
      "Trött på sena betalningar? Här är 5 konkreta strategier som hjälper dig få betalt snabbare – utan att jaga kunder.",
    date: "2026-03-05",
    author: "Emma Lindqvist",
    readTime: "5 min",
    category: "Tips",
    tags: ["faktura", "betalning", "cashflow", "tips"],
    content: `
<p>Sena betalningar är en av de vanligaste utmaningarna för småföretag. Enligt en undersökning väntar svenska småföretag i genomsnitt 8 dagar längre än avtalat på betalning. Här är 5 beprövade strategier för att få betalt snabbare.</p>

<h2>1. Fakturera direkt</h2>
<p>Ju snabbare du skickar fakturan, desto snabbare får du betalt. Vänta inte till månadsslut – skicka fakturan samma dag som jobbet är klart. Med digitala verktyg tar det bara minuter.</p>

<h2>2. Erbjud kortare betalningsvillkor</h2>
<p>Standardvillkoret i Sverige är 30 dagar netto, men ingenting hindrar dig från att använda 10 eller 15 dagar. Kortare villkor minskar risken för att kunden glömmer bort fakturan.</p>

<h2>3. Gör det enkelt att betala</h2>
<p>Inkludera alla nödvändiga uppgifter tydligt:</p>
<ul>
<li>Bankgiro/Plusgiro</li>
<li>OCR-nummer</li>
<li>Swish-nummer (om tillämpligt)</li>
<li>Tydligt förfallodatum</li>
</ul>

<h2>4. Skicka automatiska påminnelser</h2>
<p>Manuella påminnelser är tidskrävande och obekväma. Sätt upp automatiska påminnelser som skickas 3 och 7 dagar efter förfallodatum. Det känns mindre personligt och mer professionellt.</p>

<h2>5. Erbjud tidig betalningsrabatt</h2>
<p>En rabatt på 2% vid betalning inom 10 dagar kan motivera snabbare betalning. Det kostar dig lite men förbättrar ditt cashflow avsevärt.</p>

<h2>Bonus: Använd rätt verktyg</h2>
<p>Med <a href="/signup">Offert Pro</a> kan du skicka fakturor med automatiska påminnelser, spåra betalningsstatus och se vilka fakturor som närmar sig förfallodatum – allt på ett ställe.</p>
`,
  },
  {
    slug: "digitala-signaturer-guide",
    title: "Digitala signaturer i Sverige – Komplett guide (2026)",
    description:
      "Allt du behöver veta om digitala signaturer i Sverige. Juridisk giltighet, eIDAS-förordningen, och hur du implementerar e-signaturer i din offertprocess.",
    date: "2026-02-28",
    author: "Marcus Ström",
    readTime: "7 min",
    category: "Guide",
    tags: ["e-signatur", "digital signatur", "juridik", "eIDAS"],
    content: `
<p>Digitala signaturer har revolutionerat hur svenska företag gör affärer. Men är de juridiskt giltiga? Och vilken typ behöver du? Här är allt du behöver veta.</p>

<h2>Är digitala signaturer juridiskt giltiga i Sverige?</h2>
<p><strong>Ja.</strong> Enligt EU:s eIDAS-förordning (Electronic IDentification, Authentication and trust Services) är elektroniska signaturer juridiskt giltiga inom hela EU, inklusive Sverige.</p>
<p>Det finns tre nivåer av elektroniska signaturer:</p>
<ul>
<li><strong>Enkel elektronisk signatur</strong> – t.ex. att skriva sitt namn i ett e-postmeddelande</li>
<li><strong>Avancerad elektronisk signatur</strong> – unikt kopplad till undertecknaren, t.ex. BankID</li>
<li><strong>Kvalificerad elektronisk signatur</strong> – baserad på kvalificerat certifikat, juridiskt jämställd med handskrift</li>
</ul>

<h2>Vilken nivå behöver du för offerter?</h2>
<p>För de allra flesta affärstransaktioner – inklusive offerter, avtal och fakturor – räcker en <strong>avancerad elektronisk signatur</strong>. Den ska vara:</p>
<ul>
<li>Unikt kopplad till undertecknaren</li>
<li>Möjlig att identifiera undertecknaren</li>
<li>Skapad med data som bara undertecknaren kontrollerar</li>
<li>Kopplad till dokumentet så att ändringar kan upptäckas</li>
</ul>

<h2>Fördelar med e-signaturer i offertprocessen</h2>
<ul>
<li><strong>Snabbare avslut</strong> – kunden kan signera direkt från mobilen</li>
<li><strong>Inget pappersarbete</strong> – ingen utskrift, signering, skanning</li>
<li><strong>Spårbarhet</strong> – tidsstämpel, IP-adress och identitet loggas</li>
<li><strong>Miljövänligt</strong> – inga pappersofferter</li>
<li><strong>Professionellt</strong> – signerar intrycket av en modern verksamhet</li>
</ul>

<h2>Så implementerar du e-signaturer</h2>
<p>Med <a href="/signup">Offert Pro</a> får du inbyggda e-signaturer som standard. Kunden klickar på en länk i offertmailet, granskar offerten och signerar direkt i webbläsaren. Du får en bekräftelse med tidsstämpel och signaturcertifikat.</p>

<h2>Undantag – när krävs handskrift?</h2>
<p>Vissa dokument kräver fortfarande fysisk signatur enligt svensk lag:</p>
<ul>
<li>Fastighetsöverlåtelser</li>
<li>Testamenten</li>
<li>Äktenskapsförord</li>
</ul>
<p>Men för offerter, avtal och fakturor fungerar e-signaturer utmärkt.</p>
`,
  },
  {
    slug: "offertmall-gratis-ladda-ner",
    title: "Gratis offertmall 2026 – Ladda ner & använd direkt",
    description:
      "Ladda ner vår gratis offertmall för svenska företag. Professionell design, rätt struktur och alla nödvändiga fält. Finns som PDF och i Offert Pro.",
    date: "2026-02-20",
    author: "Emma Lindqvist",
    readTime: "4 min",
    category: "Resurser",
    tags: ["offertmall", "gratis", "mall", "PDF", "ladda ner"],
    content: `
<p>Letar du efter en professionell offertmall? Vi har skapat en gratis mall som innehåller allt du behöver för att göra ett starkt intryck hos dina kunder.</p>

<h2>Vad ska en offert innehålla?</h2>
<p>En komplett svensk offert bör ha följande delar:</p>
<ul>
<li><strong>Ditt företagsnamn och logotyp</strong></li>
<li><strong>Offertnummer</strong> – för spårbarhet</li>
<li><strong>Datum och giltighetstid</strong></li>
<li><strong>Kundens uppgifter</strong> – namn, företag, org.nr</li>
<li><strong>Beskrivning av tjänster/produkter</strong></li>
<li><strong>Priser</strong> – uppdelat per rad med eventuella rabatter</li>
<li><strong>Totalsumma</strong> – exkl. och inkl. moms</li>
<li><strong>Betalningsvillkor</strong></li>
<li><strong>Leveransvillkor och tidplan</strong></li>
<li><strong>Plats för signatur</strong></li>
</ul>

<h2>Tips för en professionell offert</h2>
<ol>
<li><strong>Håll det kort och tydligt</strong> – kunden ska förstå erbjudandet inom 30 sekunder</li>
<li><strong>Använd ditt varumärke</strong> – logotyp, färger och typsnitt bygger förtroende</li>
<li><strong>Var specifik med scope</strong> – beskriv vad som ingår OCH vad som inte ingår</li>
<li><strong>Ange giltighetstid</strong> – skapar brådska och skyddar dig mot prisändringar</li>
</ol>

<h2>Varför använda Offert Pro istället?</h2>
<p>En statisk mall i Word eller PDF fungerar, men har begränsningar:</p>
<ul>
<li>Ingen spårning – du vet inte om kunden öppnat offerten</li>
<li>Ingen e-signatur – kunden måste skriva ut och skanna</li>
<li>Manuell beräkning – risk för felaktiga summor</li>
<li>Inget kundregister – du måste fylla i uppgifter varje gång</li>
</ul>
<p>Med <a href="/signup">Offert Pro</a> får du en dynamisk offertmall som automatiskt beräknar summor, sparar kunduppgifter, skickar offerter via e-post med spårning och samlar e-signaturer. <strong>Gratis att börja – 5 offerter per månad utan kostnad.</strong></p>

<h2>Ladda ner eller börja direkt</h2>
<p>Du kan antingen ladda ner vår gratis PDF-mall, eller <a href="/signup">registrera ett konto på Offert Pro</a> och börja skapa professionella offerter direkt i webbläsaren. Helt gratis, inget kreditkort krävs.</p>
`,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
