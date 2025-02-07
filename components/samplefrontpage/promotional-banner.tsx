import { Button } from "@/components/samplefrontpage/button"

export function PromotionalBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 text-center my-8">
      <div className="container mx-auto px-40">
        <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
        <p className="text-xl mb-6">Get exclusive deals and updates on new releases!</p>
        <Button variant="secondary" size="lg">
          Sign Up Now
        </Button>
      </div>
    </div>
  )
}

