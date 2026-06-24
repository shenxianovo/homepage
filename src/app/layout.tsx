import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"
import { ThemeProvider } from "@/components/theme-provider"
import { site } from "@/data/site"
import { fontVariables } from "@/lib/fonts"
import "./globals.css"

const ogImage = {
  url: site.hero.image,
  width: 1536,
  height: 1024,
  alt: site.hero.alt,
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.description}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.description}`,
    description: site.description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.description}`,
    description: site.description,
    images: [ogImage],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <JsonLd />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
