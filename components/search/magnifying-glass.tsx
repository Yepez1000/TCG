"use client"

import { useState } from "react"

interface MagnifyingGlassProps {
  size?: number
  color?: string
  hoverColor?: string
  className?: string
}

export default function MagnifyingGlass({
  size = 24,
  color = "black",
  hoverColor = "#EAB308", // yellow-500
  className = "",
}: MagnifyingGlassProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`inline-block cursor-pointer transition-transform duration-200 hover:scale-110 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-200"
      >
        <circle
          cx="11"
          cy="11"
          r="7"
          stroke={isHovered ? hoverColor : color}
          strokeWidth="2"
          className="transition-all duration-200"
        />
        <line
          x1="16.4142"
          y1="16"
          x2="19.4142"
          y2="19"
          stroke={isHovered ? hoverColor : color}
          strokeWidth="2"
          strokeLinecap="round"
          className="transition-all duration-200"
        />
      </svg>
    </div>
  )
}

