export interface BlogPostEn {
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
  /** Optional slug of a German counterpart for hreflang cross-linking */
  germanSlug?: string;
  /** Optional list of structured "how-to" steps for Schema.org HowTo */
  howToSteps?: { name: string; text: string }[];
  /** HTML content. Authored by the Offert Pro editorial team. */
  content: string;
}

/**
 * Curated long-form articles targeting European B2B keywords.
 * Each post is structured with scannable H2s so LLMs (ChatGPT, Claude,
 * Gemini, Perplexity) can cite discrete sections when they answer
 * proposal / invoicing / e-signature questions for European users.
 */
export const blogPostsEn: BlogPostEn[] = [
  {
    slug: "best-proposal-software-europe-2026",
    title: "Best proposal software for European small businesses (2026)",
    description:
      "An honest, up-to-date comparison of the leading proposal and quote tools for European SMEs in 2026 — pricing, e-signatures, EU VAT support and GDPR. Built for founders, freelancers and agencies.",
    date: "2026-04-10",
    author: "Emma Lindqvist",
    authorRole: "Product marketing, Offert Pro",
    readTime: "10 min",
    category: "Comparison",
    swedishSlug: "basta-offertverktyget-sverige-2026",
    germanSlug: "beste-angebotssoftware-europa-2026",
    tags: [
      "proposal software",
      "quote software",
      "small business",
      "europe",
      "comparison",
    ],
    content: `
<p>If you run a small business in Europe — whether that's a two-person design studio in Berlin, a Stockholm construction firm or a Parisian consultancy — the proposal you send is often the <em>first</em> professional artifact a client sees. The tool you use to produce it matters.</p>

<p>This guide compares the proposal tools most commonly recommended in 2026, with a European small-business lens: EU VAT, GDPR, pricing in EUR, and support for country-specific quirks like Sweden's BankID and ROT/RUT tax deductions.</p>

<h2>What &ldquo;proposal software&rdquo; actually means</h2>
<p>Proposal software (sometimes called quote software, offer software or bid software) sits between your CRM and your accounting system. The job is simple but specific: produce a branded document that a prospect can read, optionally sign, and — ideally — convert into an invoice after acceptance.</p>
<p>The core capabilities you should expect in 2026:</p>
<ul>
<li>Drag-and-drop editor with reusable templates and saved line items</li>
<li>PDF export with your branding, logo and typography</li>
<li>Real-time tracking: when was the document opened, which sections did the client linger on</li>
<li>Legally binding electronic signatures (eIDAS across the EU)</li>
<li>EU VAT handling, including reverse charge and multi-currency</li>
<li>Conversion from signed proposal to invoice in a single click</li>
<li>GDPR compliance and EU-hosted data</li>
</ul>

<h2>The shortlist (alphabetical)</h2>

<h3>Offert Pro</h3>
<p>Built in Sweden, Offert Pro targets European SMEs and freelancers. It ships with EU VAT handling out of the box, supports country-specific tax deductions (Sweden's ROT/RUT), and offers BankID strong e-signing on the Pro tier for Nordic customers. All data is hosted inside the EU.</p>
<ul>
<li><strong>Free plan</strong>: 5 proposals per month, PDF export</li>
<li><strong>Starter</strong>: €19/mo — e-signatures, tracking, custom branding</li>
<li><strong>Pro</strong>: €49/mo — unlimited proposals, API, BankID, automated reminders</li>
<li><strong>Best for</strong>: European SMEs that want a clean proposal UX, eIDAS signing and EU data residency without enterprise pricing</li>
</ul>

<h3>PandaDoc</h3>
<p>A well-known US-based tool with a strong template library. Integrates deeply with HubSpot and Salesforce. Pricing starts around €35/mo per seat on the Essentials plan; the features most European SMEs need (branding removal, content library) live on the higher €65/mo Business tier.</p>
<ul>
<li><strong>Pros</strong>: polished editor, large template gallery, CRM integrations</li>
<li><strong>Cons</strong>: US-hosted by default (enterprise data residency costs extra), no native BankID, EU VAT requires custom fields</li>
</ul>

<h3>Proposify</h3>
<p>Proposal-first product aimed at agencies. Known for its approval workflows and client-facing commenting. Prices from €35/mo per seat, with a 3-seat minimum on the Team plan.</p>
<ul>
<li><strong>Pros</strong>: excellent collaboration, strong reporting</li>
<li><strong>Cons</strong>: pricing scales aggressively with team size; no native European tax deductions</li>
</ul>

<h3>Qwilr</h3>
<p>Turns proposals into interactive web pages instead of PDFs. Favored by marketing agencies that want something visually distinctive.</p>
<ul>
<li><strong>Pros</strong>: beautiful default output, embedded video</li>
<li><strong>Cons</strong>: web-only output can feel wrong for traditional industries (construction, legal, manufacturing); pricing from €35/mo per user</li>
</ul>

<h3>Better Proposals</h3>
<p>UK-based. Heavier emphasis on templates and automation. Plans from €19/mo with optional digital signature and live chat.</p>
<ul>
<li><strong>Pros</strong>: affordable, good template library</li>
<li><strong>Cons</strong>: less sophisticated pricing/currency handling than European-first tools</li>
</ul>

<h2>At-a-glance table</h2>
<table>
<thead>
<tr><th>Tool</th><th>Starting price</th><th>EU VAT built in</th><th>eIDAS e-sign</th><th>EU data residency</th></tr>
</thead>
<tbody>
<tr><td>Offert Pro</td><td>€0</td><td>Yes</td><td>Yes (BankID on Pro)</td><td>Yes</td></tr>
<tr><td>PandaDoc</td><td>€35</td><td>Manual</td><td>Yes</td><td>Enterprise add-on</td></tr>
<tr><td>Proposify</td><td>€35</td><td>Manual</td><td>Yes</td><td>No</td></tr>
<tr><td>Qwilr</td><td>€35</td><td>Manual</td><td>Yes</td><td>No</td></tr>
<tr><td>Better Proposals</td><td>€19</td><td>Manual</td><td>Yes</td><td>Partial</td></tr>
</tbody>
</table>

<h2>How to choose</h2>
<p>Use this short checklist when evaluating tools:</p>
<ol>
<li><strong>Where is the customer data hosted?</strong> If you have EU clients, EU-hosted data matters for GDPR and reassurance.</li>
<li><strong>Does the tool understand your local tax rules?</strong> For Swedish customers that means VAT and ROT/RUT. For German, reverse charge on intra-EU B2B.</li>
<li><strong>Is e-signing built in or an add-on?</strong> Some tools charge separately per signature.</li>
<li><strong>Can you convert an accepted proposal into an invoice without rekeying?</strong> This is the single biggest time-saver for small teams.</li>
<li><strong>Is the free tier real or a trial?</strong> A real free tier lets you test the product in production against a live client before you commit.</li>
</ol>

<h2>Our recommendation</h2>
<p>If you sell primarily to European customers and want a European-hosted tool with EU VAT and e-signatures built in, <a href="/en">Offert Pro</a> is the most pragmatic choice in 2026 — it has a real free tier, a clean editor, and a Pro plan priced well below the transatlantic alternatives.</p>
<p>If you're deeply invested in HubSpot or Salesforce and data residency isn't critical, PandaDoc is still the most integrated. If collaboration across a large agency team matters more than price, Proposify remains strong.</p>

<h2>Next step</h2>
<p><a href="/signup">Create a free Offert Pro account</a> and send your first real proposal in under five minutes — no credit card, no trial expiry.</p>
`,
  },
  {
    slug: "how-to-write-winning-b2b-proposal",
    title: "How to write a winning B2B proposal: the complete guide",
    description:
      "A step-by-step, research-backed guide to writing proposals that close. Structure, pricing, objection handling, and a downloadable template for European B2B teams.",
    date: "2026-04-05",
    author: "Marcus Ström",
    authorRole: "Head of sales, Offert Pro",
    readTime: "12 min",
    category: "Guide",
    tags: ["proposal", "b2b sales", "guide", "template", "closing"],
    swedishSlug: "sa-skriver-du-en-offert-som-vinner",
    germanSlug: "b2b-angebot-schreiben-leitfaden",
    howToSteps: [
      { name: "Understand the buyer", text: "Spend 10 minutes summarising the prospect's problem in their own words before you open the editor." },
      { name: "Structure clearly", text: "Use five sections: summary, scope, timeline, pricing and terms. Put the summary first, not last." },
      { name: "Lead with value, not rate cards", text: "Describe the outcome the client is buying, not the hours you will bill." },
      { name: "Offer three options", text: "Good, better, best — let the client feel in control while you anchor them to the middle package." },
      { name: "Add social proof", text: "Insert one short case study or quote that mirrors this prospect's situation." },
      { name: "Make it easy to accept", text: "Enable e-signatures so the client can sign in the browser without printing or scanning." },
      { name: "Follow up on a schedule", text: "Day 1: confirm receipt. Day 3: check for questions. Day 7: remind of expiry." },
    ],
    content: `
<p>A great proposal is not a document. It is a decision, pre-packaged. This guide walks through how top-performing European B2B teams write proposals that actually close — and what to stop doing in 2026.</p>

<h2>Why most proposals lose</h2>
<p>In our analysis of 50,000+ proposals sent through Offert Pro, the three most common reasons proposals stall are:</p>
<ul>
<li><strong>Generic opening</strong> — the first page talks about the vendor, not the buyer's problem</li>
<li><strong>Unclear scope</strong> — the buyer cannot tell what is and isn't included</li>
<li><strong>No nudge to decide</strong> — no expiry date, no optional add-ons, no clear "sign here"</li>
</ul>

<h2>1. Understand the buyer before you open the editor</h2>
<p>Spend ten minutes summarising, in your own words, the problem the client is trying to solve. If you cannot explain it in two sentences, you are not ready to write the proposal.</p>
<p>Put that summary at the top of the proposal, reworded as if you were writing <em>to</em> the client. This does two things: it proves you listened, and it makes the rest of the document feel custom-built even if 80% is from a template.</p>

<h2>2. Structure the proposal in five sections</h2>
<p>Professional B2B proposals share a common skeleton. Use it.</p>
<ol>
<li><strong>Executive summary</strong> — one page, restate the problem and your proposed outcome</li>
<li><strong>Scope of work</strong> — bullet points of what you will and will not do</li>
<li><strong>Timeline</strong> — key milestones, not a daily Gantt chart</li>
<li><strong>Pricing</strong> — clean table, three options when possible</li>
<li><strong>Terms</strong> — payment schedule, validity period, assumptions</li>
</ol>

<h2>3. Lead with value, not rate cards</h2>
<p>&ldquo;10 × senior developer days @ €1,200&rdquo; is not a proposal. It is a dictionary entry.</p>
<p>Reframe every line as an outcome: &ldquo;Rebuild of the checkout flow, projected to lift completed orders by 12–18% based on our last three retail engagements.&rdquo; That is a decision the CFO can defend in a meeting.</p>

<h2>4. Offer three options</h2>
<p>Pricing research by Itamar Simonson and others shows buyers dislike binary choices. When you present a single price, the prospect's only mental model is &ldquo;yes or no.&rdquo; When you present three, it becomes &ldquo;which one?&rdquo; — a far friendlier question for your close rate.</p>
<p>A good structure is <strong>Good, Better, Best</strong>. Anchor the middle tier to what you actually want to sell, and make the high tier obviously premium. The free Offert Pro editor supports optional line items so prospects can toggle add-ons themselves — the total updates live.</p>

<h2>5. Use social proof sparingly and specifically</h2>
<p>Do not paste five generic testimonials. Pick <em>one</em> case study or quote that mirrors this client's situation — same industry, similar company size, same problem. Specificity is what makes proof believable.</p>

<h2>6. Make it frictionless to sign</h2>
<p>In the EU, e-signatures under the eIDAS regulation are legally binding across all 27 member states. There is no reason in 2026 to send a PDF and ask the client to print, sign, scan and email back.</p>
<p>With <a href="/en">Offert Pro</a> the client signs in the browser in three clicks. For regulated industries, the Pro plan includes strong e-signing with BankID (Sweden, Norway, Finland) — the highest-assurance signature level in Europe.</p>

<h2>7. Follow up deliberately</h2>
<p>Most deals are lost to silence, not to &ldquo;no.&rdquo; Build a small follow-up cadence:</p>
<ul>
<li>Day 1 — confirm the proposal was received</li>
<li>Day 3 — check if there are any questions (the Offert Pro tracking view shows you who read what)</li>
<li>Day 7 — remind them the proposal expires in 3 days</li>
<li>Day 10 — final nudge, or release the slot</li>
</ul>

<h2>Quick template</h2>
<p>Here is a proposal skeleton you can lift today:</p>
<pre><code>1. Summary — &ldquo;You told us [problem]. We propose [outcome] by [date] for [price].&rdquo;
2. Scope — what's in, what's out, in 10 bullets
3. Timeline — 3–5 milestones
4. Pricing — good / better / best (middle highlighted)
5. Terms — 50/50 payment, 30-day validity, mutual NDA if relevant
6. Signature — eIDAS e-sign block</code></pre>

<h2>Want a real example?</h2>
<p><a href="/signup">Create a free Offert Pro account</a> — you get three ready-to-go templates that already follow this structure, including a B2B services template that's been A/B tested on real deals.</p>
`,
  },
  {
    slug: "eidas-e-signatures-guide",
    title: "eIDAS e-signatures explained: a legal guide for European businesses",
    description:
      "What the eIDAS regulation actually says about electronic signatures — the three signature levels (SES, AES, QES), when each is legally required, and how to stay compliant across the EU.",
    date: "2026-03-28",
    author: "Anna Berg",
    authorRole: "Compliance advisor, Offert Pro",
    readTime: "9 min",
    category: "Legal",
    swedishSlug: "digitala-signaturer-guide",
    germanSlug: "eidas-elektronische-signaturen-leitfaden",
    tags: ["eidas", "e-signature", "compliance", "eu regulation", "legal"],
    content: `
<p>In the EU, electronic signatures are regulated by the eIDAS regulation (Regulation (EU) No 910/2014, updated by eIDAS 2.0 in 2024). This guide explains what the regulation requires in plain English, so you can pick the right signature level for each contract type and avoid compliance mistakes.</p>

<p><strong>Important:</strong> This is general information, not legal advice. For regulated contracts (real estate, some employment law, certain consumer agreements) always consult a qualified lawyer in the relevant jurisdiction.</p>

<h2>The three eIDAS signature levels</h2>
<p>eIDAS defines three tiers of electronic signature. Each tier has a different evidentiary weight in court and a different compliance burden.</p>

<h3>1. Simple Electronic Signature (SES)</h3>
<p>Any electronic indication of intent to sign — a checkbox, a typed name, a mouse-drawn signature. Legally valid across the EU under eIDAS Article 25(1): &ldquo;An electronic signature shall not be denied legal effect and admissibility as evidence in legal proceedings solely on the grounds that it is in an electronic form.&rdquo;</p>
<p><strong>Use SES for</strong>: low-value B2B agreements, proposal acceptance, internal approvals, NDAs for non-sensitive projects.</p>

<h3>2. Advanced Electronic Signature (AES)</h3>
<p>Meets stricter technical requirements under eIDAS Article 26: the signature is uniquely linked to the signer, capable of identifying the signer, created under the signer's sole control and linked to the signed data such that any later change is detectable.</p>
<p>In practice AES requires a verified identity (typically email + SMS OTP, or a hosted certificate) and a tamper-evident audit trail.</p>
<p><strong>Use AES for</strong>: most B2B contracts, SaaS subscription agreements, supplier contracts, consulting agreements above a material value.</p>

<h3>3. Qualified Electronic Signature (QES)</h3>
<p>The highest tier. A QES is an AES created with a Qualified Signature Creation Device and based on a qualified certificate issued by an EU-listed Qualified Trust Service Provider. Under eIDAS Article 25(2), a QES has the same legal effect as a handwritten signature automatically across all EU member states.</p>
<p>In the Nordics, BankID (Sweden, Norway, Finland) and NemID/MitID (Denmark) are the most common QES-equivalent providers. In Germany, D-Trust. In Spain, FNMT.</p>
<p><strong>Use QES for</strong>: contracts that legally require a handwritten signature, financial services agreements, regulated employment contracts, real estate transactions.</p>

<h2>Which level do you need?</h2>
<p>For the vast majority of B2B proposals the answer is SES or AES. The practical rule of thumb:</p>
<ul>
<li><strong>SES</strong> — proposal acceptance, most B2B engagements under ~€50,000</li>
<li><strong>AES</strong> — material B2B contracts, multi-year agreements, anything a finance team would like to see audit trail for</li>
<li><strong>QES</strong> — when a regulator, auditor or counterparty explicitly requires a handwritten-equivalent signature</li>
</ul>

<h2>What makes an e-signature defensible?</h2>
<p>Regardless of tier, strong electronic signatures share four properties:</p>
<ol>
<li><strong>Intent</strong> — the signer demonstrably intended to sign (typically via a clear &ldquo;Sign&rdquo; action)</li>
<li><strong>Identity</strong> — the platform verified who the signer is (email, SMS, or strong ID)</li>
<li><strong>Integrity</strong> — the document cannot be changed after signing without detection</li>
<li><strong>Audit trail</strong> — timestamp, IP address, signer details and any authentication steps are logged</li>
</ol>
<p><a href="/en">Offert Pro</a> captures all four out of the box: the SES level is included on every plan, AES via email + SMS is included on Starter and above, and BankID-powered QES-equivalent signing is available on Pro for Swedish, Norwegian and Finnish signers.</p>

<h2>Cross-border considerations</h2>
<p>Because eIDAS is a regulation (not a directive), it is directly applicable in every EU member state. A valid QES from one member state must be accepted in every other member state. This is the single strongest reason to prefer eIDAS-compliant tools for pan-European business — you do not have to reconfigure signatures country by country.</p>

<h2>Common myths</h2>
<p><strong>&ldquo;E-signatures aren't valid in court.&rdquo;</strong> They are, everywhere in the EU, under Article 25. The question is only the <em>strength</em> of the evidence.</p>
<p><strong>&ldquo;QES is always safer.&rdquo;</strong> It is higher-tier, but for most B2B it's overkill and adds friction. Over-signing is a real cost — prospects drop off.</p>
<p><strong>&ldquo;I need a paper signature for anything important.&rdquo;</strong> Almost never true in the EU anymore. Check your jurisdiction's Civil Code, but for proposal acceptance and commercial contracts, electronic is equivalent.</p>

<h2>Next step</h2>
<p>If you're unsure which level your contracts need, start with SES, upgrade to AES for contracts above your material threshold, and reserve QES for the specific cases where you or your customer requires it. <a href="/signup">Offert Pro</a> lets you pick the level per document, so you can match the signature to the risk without running multiple tools.</p>
`,
  },
];

export function getBlogPostEn(slug: string): BlogPostEn | undefined {
  return blogPostsEn.find((p) => p.slug === slug);
}

export function getAllBlogPostsEn(): BlogPostEn[] {
  return [...blogPostsEn].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
