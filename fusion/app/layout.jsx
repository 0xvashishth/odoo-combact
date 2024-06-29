import "@/styles/globals.css"
import { Inter as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "flex flex-col h-screen font-sans antialiased",
          fontSans.variable
        )}
        >
        <main className="grow">{children}</main>
      </body>
    </html>
  )
}
