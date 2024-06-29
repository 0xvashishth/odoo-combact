import { NavigationMenu, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@radix-ui/react-navigation-menu"
import Link from "next/link"

export default function Home() {
  return (
    <>
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

        <div className="container h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Welcome to Furn On Rent</h1>
            <p className="text-lg">Rent furniture for your home.</p>
          </div>
        </div>

      </header></>

  );
}
