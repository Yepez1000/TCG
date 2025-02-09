"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ChevronDownIcon } from "@radix-ui/react-icons"

interface MenuItem {
  label: string
  href: string
  image?: string
  items: {
    label: string
    href: string
    description?: string
  }[]
}

const menuItems: MenuItem[] = [
  {
    label: "New Releases",
    href: "/new-releases",
    image: "/rtwglqotasdb1.jpg",
    items: [
      {
        label: "Latest Arrivals",
        href: "/new-releases/latest",
        description: "Check out our newest items",
      },
      {
        label: "Coming Soon",
        href: "/new-releases/coming-soon",
        description: "See what's dropping next",
      },
      {
        label: "Trending",
        href: "/new-releases/trending",
        description: "Popular items this week",
      },
      {
        label: "Pre-orders",
        href: "/new-releases/pre-orders",
      },
      {
        label: "Best Sellers",
        href: "/new-releases/best-sellers",
      },
      {
        label: "Staff Picks",
        href: "/new-releases/staff-picks",
      },
    ],
  },
  {
    label: "Pokemon",
    href: "/pokemon",
    image: "/rtwglqotasdb1.jpg",
    items: [
      {
        label: "Trading Cards",
        href: "/pokemon/cards",
      },
      {
        label: "Video Games",
        href: "/pokemon/games",
      },
      {
        label: "Merchandise",
        href: "/pokemon/merch",
      },
      {
        label: "Collectibles",
        href: "/pokemon/collectibles",
      },
      {
        label: "Plush Toys",
        href: "/pokemon/plush",
      },
      {
        label: "Accessories",
        href: "/pokemon/accessories",
      },
      {
        label: "Books & Manga",
        href: "/pokemon/books",
      },
      {
        label: "Limited Editions",
        href: "/pokemon/limited",
      },
    ],
  },
  {
    label: "One Piece",
    href: "/one-piece",
    image: "/rtwglqotasdb1.jpg",
    items: [
      {
        label: "Manga Volumes",
        href: "/one-piece/manga",
      },
      {
        label: "Anime Series",
        href: "/one-piece/anime",
      },
      {
        label: "Action Figures",
        href: "/one-piece/figures",
      },
      {
        label: "Clothing",
        href: "/one-piece/clothing",
      },
      {
        label: "Accessories",
        href: "/one-piece/accessories",
      },
      {
        label: "Wall Art",
        href: "/one-piece/art",
      },
      {
        label: "Collectibles",
        href: "/one-piece/collectibles",
      },
      {
        label: "Limited Editions",
        href: "/one-piece/limited",
      },
    ],
  },
]

export function AnimatedDropdown() {
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null)
  const [previousMenu, setPreviousMenu] = React.useState<string | null>(null)

  

  // Get the dimensions for each menu
  const getMenuDimensions = (label: string) => {
    const menu = menuItems.find((item) => item.label === label)
    if (!menu) return { width: 500, height: 0 }

    const rows = Math.ceil(menu.items.length / 2)
    return {
      width: 600,
      height: rows * 40 + 32, // 40px per row + padding
    }
  }

  // Handle menu changes with animation
  const handleMenuEnter = (label: string) => {
    setPreviousMenu(activeMenu)
    setActiveMenu(label)
  }

  const handleMenuLeave = () => {
    setPreviousMenu(activeMenu)
    setActiveMenu(null)
  }

  // Get animation properties based on menu transition
  const getAnimationProps = (label: string) => {
    const current = getMenuDimensions(label)
    const previous = previousMenu ? getMenuDimensions(previousMenu) : current

    return {
      initial: {
        opacity: 0,
        height: previous.height,
        width: previous.width,
        scale: 0.96,
      },
      animate: {
        opacity: 1,
        height: current.height,
        width: current.width,
        scale: 1,
      },
      exit: {
        opacity: 0,
        height: current.height,
        width: current.width,
        scale: 0.96,
        transition: { duration: 0.2 },
      },
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
        mass: 0.5,
      },
    }
  }

  return (
    <nav className="relative flex justify-center">
      <ul className="flex items-center gap-8">
        {menuItems.map((item) => (
          <li
            key={item.label}
            onMouseEnter={() => handleMenuEnter(item.label)}
            onMouseLeave={handleMenuLeave}
            className="relative py-4"
          > 
            <Link
              href={item.href}
              className="flex items-center gap-1 text-sm font-medium text-gray-100 hover:text-white transition-colors no-underline"
            >
              {item.label}
              <motion.span animate={{ rotate: activeMenu === item.label ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDownIcon className="h-4 w-4" />
              </motion.span>
            </Link>
            <AnimatePresence mode="wait">
              {activeMenu === item.label && (
                <motion.div
                  {...getAnimationProps(item.label)}
                  className="absolute top-full z-50 mt-2"

                  style={{
                    transformOrigin: "top center",
                   
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-lg border bg-white shadow-lg overflow-hidden"
                  >
                    <div className="flex p-4">
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2 flex-1">
                        {item.items.map((subItem, index) => (
                          <motion.div
                            key={subItem.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.03 }}
                          >
                            <Link
                              href={subItem.href}
                              className="text-sm text-gray-500 hover:text-gray-900 transition-colors no-underline"
                            >
                              {subItem.label}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                      {item.image && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 }}
                          className="ml-8 flex-shrink-0"
                        >
                          <Image
                            src={item.image || "/rtwglqotasdb1.jpg"}
                            alt={`${item.label} featured image`}
                            width={120}
                            height={120}
                            className="rounded-lg object-cover"
                          />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </nav>
  )
}

