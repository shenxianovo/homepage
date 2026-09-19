import { PageHeading } from "@/components/layout/page-heading"
import { getResume } from "@/lib/resume"
import { ResumeContent } from "./_components/resume-content"

const resume = getResume()

export const metadata = {
  title: resume.title,
  description: resume.description,
}

export default function ResumePage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10">
      <header>
        <PageHeading eyebrow={resume.eyebrow} title={resume.title} />
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          {resume.description}
        </p>
      </header>
      <ResumeContent code={resume.content} />
    </div>
  )
}
