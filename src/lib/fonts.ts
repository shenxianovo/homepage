import { Inter, Sora } from "next/font/google"

export const fontSans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

export const fontDisplay = Sora({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
})

export const fontVariables = `${fontSans.variable} ${fontDisplay.variable}`
