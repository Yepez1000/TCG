"use client"

import { useState } from "react"
import { Button } from "@/components/filterbar/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/filterbar/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/filterbar/ui/collapsible"
import { ChevronDownIcon, Cross2Icon } from "@radix-ui/react-icons"

interface FilterOption {
  label: string
  value: string
}

const filterCategories = {
  productType: ["Single Cards", "Sealed Products", "Accessories"],
  cardType: ["Pokémon", "Trainer", "Energy"],
  condition: ["Mint", "Near Mint", "Lightly Played", "Moderately Played"],
  printing: ["1st Edition", "Unlimited", "Reverse Holo"],
  rarity: ["Common", "Uncommon", "Rare", "Ultra Rare", "Secret Rare"],
}

export function FiltersBar() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const clearFilters = () => {
    setActiveFilters([])
  }

  return (
    <div className="w-full space-y-4 bg-background">
      {/* Main filters row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="gap-2">
                All Filters
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform duration-200 ${isFiltersOpen ? "rotate-180" : ""}`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4">
              <div className="grid gap-4 rounded-lg border p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {Object.entries(filterCategories).map(([category, options]) => (
                  <div key={category} className="space-y-2">
                    <h3 className="font-medium capitalize">{category.replace(/([A-Z])/g, " $1")}</h3>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {options.map((option) => (
                          <SelectItem key={option} value={option.toLowerCase()}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* <div className="flex items-center gap-2">
            <span className="text-sm font-medium">2</span>
          </div>

          <div className="flex items-center">
            <span className="mx-2 text-muted-foreground">/</span>
            <span className="font-medium">Pokemon</span>
          </div>

          <div className="flex items-center">
            <span className="mx-2 text-muted-foreground">/</span>
            <span className="font-medium">SV07: Stellar Crown</span>
          </div> */}
        </div>

        <Button variant="ghost" className="h-8 px-2 text-sm text-muted-foreground" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>

      {/* Results and sort row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">**Add Number** results in Pokemon</div>

        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Sort & View</span>
          <Select defaultValue="best-match">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="best-match">Best Match</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Button
              key={filter}
              variant="secondary"
              size="sm"
              className="gap-1"
              onClick={() => {
                setActiveFilters(activeFilters.filter((f) => f !== filter))
              }}
            >
              {filter}
              <Cross2Icon className="h-3 w-3" />
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

