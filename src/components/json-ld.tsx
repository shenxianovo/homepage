import { site, socials } from "@/data/site"

/**
 * Injects schema.org JSON-LD for the site owner (Person) and the site itself
 * (WebSite). This is the GEO layer — it tells search engines and AI engines
 * who shenxianovo is and which profiles belong to the same person, enabling
 * rich results and accurate attribution. Rendered once in the root layout.
 *
 * `sameAs` lists external profiles and the blog (same person, helping entity
 * disambiguation). Private app subdomains (auth, heartbeat) are deliberately
 * excluded — they should not be associated with public search results.
 */
export function JsonLd() {
  const sameAs = [
    ...socials.map((s) => s.href).filter((href) => /^https?:\/\//.test(href)),
    site.blogUrl,
  ]

  const blog = {
    "@type": "Blog",
    "@id": `${site.blogUrl}/#blog`,
    url: site.blogUrl,
    name: `${site.name}'s Blog`,
    author: { "@id": `${site.url}/#person` },
  }

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
      hasPart: { "@id": `${site.blogUrl}/#blog` },
    },
    blog,
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
