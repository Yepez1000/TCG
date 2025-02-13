import Image from "next/image"
import { Button } from "@/components/frontpage/button"
import Link from "next/link"

export function HeroBanner() {
  return (
    <div className="py-2">
      <div className="container mx-auto px-20">
        <div className="relative h-[300px] rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-[#111827]">
            <div className="relative h-full z-10 flex items-center px-8">
              <div className="max-w-md">
                <h1 className="text-3xl font-bold mb-3 text-white">
                  Open a Pack, Get Real Cards!
                </h1>
                <p className="text-lg mb-4 text-white/90">
                  Purchase and open TCG packs online, and receive real cards delivered to your door!
                </p>
                <Link href = "packopening">
                   <Button size="lg" variant="secondary">
                      Open a Pack Now
                   </Button>
                </Link>
               
                
              </div>
            </div>
            <Image
              src="/pokemonpacksTCGPocket.jpg" 
              alt="TCG Pack Opening"
              width={600}
              height={300}
              className="absolute right-0 top-0 h-full w-1/2 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

