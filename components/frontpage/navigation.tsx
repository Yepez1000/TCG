"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/frontpage/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/frontpage/navigation-menu"
import { MagnifyingGlassIcon, PersonIcon } from "@radix-ui/react-icons"

export function Navigation() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-2xl">
            TCG Store
          </Link>
          <div className="hidden lg:flex relative w-96">
            <input type="search" placeholder="Search for cards..." className="w-full px-4 py-2 border rounded-lg" />
            <MagnifyingGlassIcon className="absolute right-3 top-2.5 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost">
            <PersonIcon className="h-5 w-5" />
            <span className="ml-2 hidden sm:inline">Sign In</span>
          </Button>
          <Button variant="ghost">
            <ShoppingCart className="h-5 w-5" />
            <span className="ml-2 hidden sm:inline">Cart</span>
          </Button>
        </div>
      </div>
      <NavigationMenu className="container mx-auto px-4">
        <NavigationMenuList className="flex-wrap">
          <NavigationMenuItem>
            <NavigationMenuTrigger>Pokémon</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-6 w-[400px]">
                <NavigationMenuLink asChild>
                  <Link href="#" className="group grid gap-1">
                    <div className="text-sm font-medium">Latest Sets</div>
                    <div className="text-sm text-muted-foreground">Browse the newest Pokémon card releases</div>
                  </Link>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>One Piece</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-6 w-[400px]">
                <NavigationMenuLink asChild>
                  <Link href="#" className="group grid gap-1">
                    <div className="text-sm font-medium">Card Sets</div>
                    <div className="text-sm text-muted-foreground">Explore One Piece trading cards</div>
                  </Link>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Dragon Ball</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-6 w-[400px]">
                <NavigationMenuLink asChild>
                  <Link href="#" className="group grid gap-1">
                    <div className="text-sm font-medium">All Cards</div>
                    <div className="text-sm text-muted-foreground">View Dragon Ball card collection</div>
                  </Link>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}

