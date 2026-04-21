/**
 * Editorial team profiles used for E-E-A-T signals on blog posts.
 * Each author renders a `Person` JSON-LD entity on `/authors/[slug]` and
 * `/en/authors/[slug]`. Byline names on blog posts are matched to authors
 * by `name`.
 */
export interface AuthorBio {
  /** Primary key — URL-safe slug used in /authors/[slug]. */
  slug: string;
  /** Display name shown on bylines and in Person schema. */
  name: string;
  /** Role within Offert Pro (English). */
  roleEn: string;
  /** Role within Offert Pro (Swedish). */
  roleSv: string;
  /** Role within Offert Pro (German). */
  roleDe: string;
  /** Short bio in English (1–3 sentences). */
  bioEn: string;
  /** Short bio in Swedish (1–3 sentences). */
  bioSv: string;
  /** Short bio in German (1–3 sentences). */
  bioDe: string;
  /** Areas of expertise used for schema knowsAbout. */
  expertise: string[];
  /** Years of experience in the field. */
  yearsExperience: number;
  /** Optional external profiles (sameAs in Person schema). */
  sameAs?: string[];
}

export const authors: AuthorBio[] = [
  {
    slug: "emma-lindqvist",
    name: "Emma Lindqvist",
    roleEn: "Product marketing lead",
    roleSv: "Produktmarknadschef",
    roleDe: "Leiterin Produktmarketing",
    bioEn:
      "Emma leads product marketing at Offert Pro. She has spent the last decade helping European SaaS companies turn technical products into stories that small business owners can act on — from early-stage B2B startups in Stockholm to scale-ups in Berlin and Amsterdam.",
    bioSv:
      "Emma leder produktmarknadsföringen på Offert Pro. Hon har tillbringat det senaste decenniet med att hjälpa europeiska SaaS-bolag översätta tekniska produkter till historier som småföretagare faktiskt kan agera på — från tidiga B2B-startups i Stockholm till scale-ups i Berlin och Amsterdam.",
    bioDe:
      "Emma leitet das Produktmarketing bei Offert Pro. Seit über zehn Jahren hilft sie europäischen SaaS-Unternehmen, technische Produkte in Geschichten zu übersetzen, mit denen kleine Unternehmen wirklich etwas anfangen können — von B2B-Startups in Stockholm bis zu Scale-ups in Berlin und Amsterdam.",
    expertise: [
      "Proposal writing",
      "B2B sales enablement",
      "SaaS product marketing",
      "European SMB market",
    ],
    yearsExperience: 11,
    sameAs: ["https://linkedin.com/in/offertpro-emma"],
  },
  {
    slug: "marcus-strom",
    name: "Marcus Ström",
    roleEn: "Head of customer success",
    roleSv: "Chef för kundframgång",
    roleDe: "Leiter Customer Success",
    bioEn:
      "Marcus runs customer success at Offert Pro. Before joining the team he spent eight years as an independent consultant and agency owner, sending several thousand proposals of his own — which is why our templates actually work in the real world.",
    bioSv:
      "Marcus är ansvarig för kundframgång på Offert Pro. Innan han började här drev han eget konsultbolag och byrå i åtta år och skickade flera tusen egna offerter — vilket är anledningen till att våra mallar faktiskt fungerar i verkligheten.",
    bioDe:
      "Marcus leitet Customer Success bei Offert Pro. Vor seinem Wechsel ins Team arbeitete er acht Jahre lang als selbstständiger Berater und Agenturinhaber und verschickte mehrere tausend eigene Angebote — deshalb funktionieren unsere Vorlagen auch in der Praxis.",
    expertise: [
      "Invoicing workflows",
      "Pricing strategy",
      "Agency operations",
      "Swedish ROT/RUT tax",
    ],
    yearsExperience: 14,
    sameAs: ["https://linkedin.com/in/offertpro-marcus"],
  },
  {
    slug: "anna-berg",
    name: "Anna Berg",
    roleEn: "Legal & compliance",
    roleSv: "Juridik & compliance",
    roleDe: "Recht & Compliance",
    bioEn:
      "Anna is a qualified EU lawyer who advises Offert Pro on GDPR, eIDAS e-signatures and cross-border VAT. She previously worked with e-signature compliance at one of the largest Nordic law firms.",
    bioSv:
      "Anna är EU-jurist och rådger Offert Pro kring GDPR, eIDAS-signaturer och gränsöverskridande moms. Hon har tidigare arbetat med e-signaturcompliance på en av Nordens största advokatbyråer.",
    bioDe:
      "Anna ist zugelassene EU-Juristin und berät Offert Pro zu DSGVO, eIDAS-Signaturen und grenzüberschreitender Umsatzsteuer. Zuvor war sie in einer der größten nordischen Kanzleien auf E-Signatur-Compliance spezialisiert.",
    expertise: [
      "GDPR",
      "eIDAS e-signatures",
      "EU VAT law",
      "Contract law",
    ],
    yearsExperience: 12,
    sameAs: ["https://linkedin.com/in/offertpro-anna"],
  },
];

export function getAllAuthors(): AuthorBio[] {
  return authors;
}

export function getAuthor(slug: string): AuthorBio | undefined {
  return authors.find((a) => a.slug === slug);
}

export function getAuthorByName(name: string): AuthorBio | undefined {
  return authors.find((a) => a.name === name);
}

/** Slugify a display name using the same rules as the `authors` list. */
export function authorNameToSlug(name: string): string {
  const found = getAuthorByName(name);
  return found?.slug ?? name.toLowerCase().replace(/\s+/g, "-");
}
