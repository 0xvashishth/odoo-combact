import "@/styles/globals.css"
import { Inter as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"
import { NavigationMenu, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@radix-ui/react-navigation-menu"
import Link from "next/link"

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

        <header className="py-4 container flex items-center">
          <Link href="/">
            <div className="mr-6 text-xl font-bold">Furn On Rent</div>
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/catalog">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Catalog
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

        </header>
        <main className="grow">{children}</main>
      </body>
    </html>
  )
}
