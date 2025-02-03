const fs = require("fs");
const { parse } = require("csv-parse");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

type pokemon = {
    name: string,
    number: number | null; 
    gameName: string,
    rarity: string,
    expansionName: string,
    imageUrl: string,
    skus: string,
    variants: string,
    url: string,

}


async function main() {
  let cards: pokemon[] = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream("public/pokemon_catalog.csv")
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", function (row: string[]) {
        // Assuming CSV columns: name, number, gameName, rarity, expansionName, imageUrl, skus, variants, url
        cards.push({
          name: row[0],
          number: row[1] ? parseInt(row[1]) : null,
          gameName: row[2],
          rarity: row[3],
          expansionName: row[4],
          imageUrl: row[5],
          skus: row[6],
          variants: row[7],
          url: row[8],
        });
      })
      .on("end", resolve)
      .on("error", reject);
  });

  console.log(`Parsed ${cards.length} Pokémon cards!`);

  // Insert into database
  for (let card of cards) {
    await prisma.pokemon.create({
      data: card,
    });
  }

  console.log("All Pokémon cards inserted into the database!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
