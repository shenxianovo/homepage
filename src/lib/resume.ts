import { resumes } from "#site/content"

/** The site has exactly one long-form resume document. */
export function getResume() {
  const resume = resumes[0]
  if (!resume) throw new Error("Missing content/resume.mdx")
  return resume
}
