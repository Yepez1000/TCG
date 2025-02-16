import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"



interface PricingInfo {
  lastupdated: string;
  lowPrice: number;
  lowestShipping: number;
  lowestListingPrice: number;
  marketPrice: number;
  directLowPrice: number;
}

interface Sku {
  skuId: number;
  productId: number;
  languageId: number;
  printingId: number;
  conditionId: number;
  condAbbr: string;
  condName: string;
  conditionAbbreviation: string;
  printingCode: string;
  printingName: string;
  languageName: string;
  langAbbr: string;
  languageAbbreviation: string;
  binderSku: string;
  directLowPrice: number;
  lastupdated: string;
  lowPrice: number;
  lowestListingPrice: number;
  lowestShipping: number;
  marketPrice: number;
  pricingInfo: PricingInfo;
}

interface card {
  id: string;
  name: string;
  number: number;
  expansionName: string;
  gameName: string;
  rarity: string;
  imageUrl: string;
  url: string;
  variants: string;
  skus: Sku[]; // Array of SKU objects
}

interface SearchResultsProps {
  results: card[]
  onSelect: (card: card) => void
}

export function SearchResults({ results, onSelect }: SearchResultsProps) {


  if (results.length === 0) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground">No matching cards found. You can proceed with creating a new listing.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {results.map((card) => (
        <Card key={card.id} className="overflow-hidden transition-colors hover:bg-accent">
          <div className="flex">
            <div className="relative h-32 w-24 flex-shrink-0">
              <img src={card.imageUrl || "/placeholder.svg"} alt={card.name} className="h-full w-full object-cover" />
            </div>
            <CardContent className="flex flex-1 items-center p-4">
              <div className="flex-1">
                <h4 className="text-lg font-medium">{card.name}</h4>
                <p className="text-sm text-muted-foreground">{card.expansionName}</p>
                {/* {card.condition && <p className="mt-1 text-sm text-muted-foreground">Condition: {card.condition}</p>} */}
              </div>
              <Button className="ml-4" variant="outline" onClick={() => onSelect(card)}>
                Select
              </Button>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  )
}

