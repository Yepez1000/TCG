"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/frontpage/button"

interface SetCard {
  title: string
  releaseDate: string
  imageUrl: string
}

const sets: SetCard[] = [
  {
    title: "TEMPORAL FORCES",
    releaseDate: "22 Mar 2024",
    imageUrl:
      "/ruler-of-the-black-flame-cover.png",
  },
  {
    title: "PALDEAN FATES",
    releaseDate: "26 Jan 2024",
    imageUrl:
      "/pikachuset.png",
  },
  {
    title: "PARADOX RIFT",
    releaseDate: "3 Nov 2023",
    imageUrl:
      "/Futureflash.png",
  },
  {
    title: "151",
    releaseDate: "22 Sep 2023",
    imageUrl:
      "/Futureflash.png",
  },
]

export function LatestSetsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  useEffect(() => {
    if (emblaApi) {
      setScrollSnaps(emblaApi.scrollSnapList())
      emblaApi.on("select", () => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
      })
    }
  }, [emblaApi])

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()
  const scrollTo = (index: number) => emblaApi?.scrollTo(index)

  return (
    <div className="py-2">
      <div className="container mx-auto px-20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Latest Sets Released</h2>
          <a href="#" className="text-blue-500 hover:underline">
            view all
          </a>
        </div>
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {sets.map((set, index) => (
                <div key={index} className="relative flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33%]">
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80" />
                    <Image src={set.imageUrl || "/placeholder.svg"} alt={set.title} fill className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-40" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-white text-2xl font-bold mb-2">{set.title}</h3>
                        <p className="text-white/90">Official release date:</p>
                        <p className="text-white">{set.releaseDate}</p>
                      </div>
                      <Button className="w-fit bg-blue-500 hover:bg-blue-600 text-white">Order Now</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-lg"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-lg"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === selectedIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
