import { site, socials } from "@/data/site"

/**
 * Injects schema.org JSON-LD for the site owner (Person) and the site itself
 * (WebSite). This is the GEO layer — it tells search engines and AI engines
 * who shenxianovo is and which profiles belong to the same person, enabling
 * rich results and accurate attribution. Rendered once in the root layout.
 *
 * `sameAs` lists external profiles only; the mailto entry is filtered out
 * because schema.org expects URLs there, not contact protocols.
 */
export function JsonLd() {
  const sameAs = socials
    .map((s) => s.href)
    .filter((href) => /^https?:\/\//.test(href))

  const graph = [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      url: site.url,
      image: `${site.url}${site.hero.image}`,
      description: site.description,
      jobTitle: "Developer",
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Wuhan University",
      },
      knowsAbout: ["Software Development", "Artificial Intelligence", "Web Development"],
      sameAs,
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en",
      author: { "@id": `${site.url}/#person` },
    },
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
  }

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be inlined as a script tag; content is static and not user-derived
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
