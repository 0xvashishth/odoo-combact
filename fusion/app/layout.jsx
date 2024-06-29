import "@/styles/globals.css"
import { Inter as FontSans } from "next/font/google"
import { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils"


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning  data-theme="light">
      <body
        className={cn(
          "flex flex-col h-screen font-sans antialiased",
          fontSans.variable
        )}
        >
          <Toaster />
        <main>{children}</main>
      </body>
    </html>
  )
}
