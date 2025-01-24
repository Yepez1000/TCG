"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"

interface CartProps {
  itemCount?: number
  size?: number
  color?: string
  hoverColor?: string
  className?: string
}

export default function Cart({
  itemCount = 0,
  size = 24,
  color = "black",
  hoverColor = "#EAB308", // yellow-500
  className = "",
}: CartProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`inline-block cursor-pointer relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {itemCount > 0 && (
        <div className="absolute -top-2 -left-2 bg-yellow-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount > 99 ? "99+" : itemCount}
        </div>
      )}
      <div className="transition-transform duration-200 hover:scale-110">
        <ShoppingCart
          size={size}
          className="transition-colors duration-200"
          color={isHovered ? hoverColor : color}
          aria-label={`Shopping cart with ${itemCount} items`}
        />
      </div>
    </div>
  )
}

