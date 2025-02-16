"use client"

import * as React from "react"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "../ui/command"
import { Input } from "../ui/input"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"

const pokemonCards = [
  {
    id: 1,
    name: "Charizard",
    expansion: "Base Set",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Pikachu",
    expansion: "Jungle",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Mewtwo",
    expansion: "Gym Heroes",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Lugia",
    expansion: "Neo Genesis",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Rayquaza",
    expansion: "EX Deoxys",
    image: "/placeholder.svg?height=40&width=40",
  },
]

export function PokemonSearch() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <div className="relative w-full max-w-sm">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
        <Input
          placeholder="Search Pokemon cards..."
          className="pl-9"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setOpen(true)
          }}
        />
      </div>
      {open && (
        <div className="absolute top-full z-50 mt-2 w-full rounded-md border bg-popover shadow-md">
          <Command>
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {pokemonCards.map((card) => (
                  <CommandItem
                    key={card.id}
                    className="flex cursor-pointer items-center gap-3 px-4 py-2"
                    onSelect={() => {
                      setValue(card.name)
                      setOpen(false)
                    }}
                  >
                    <img
                      src={card.image || "/placeholder.svg"}
                      alt={card.name}
                      className="h-10 w-10 rounded-sm object-cover"
                    />
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium">{card.name}</span>
                      <span className="text-xs text-muted-foreground">{card.expansion}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  )
}

