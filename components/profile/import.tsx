'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/import/button"
import { Input } from "@/components/import/input"
import { Label } from "@/components/import/label"
import { Textarea } from "@/components/import/textarea"
import { Card, CardContent } from "@/components/import/card"
import { Upload, DollarSign, Package, Tag } from 'lucide-react'
import { CardDescription, CardHeader, CardTitle } from "@/components/profile/ui/card"
import useSWR from 'swr'


 
interface Product {
    name: string;
    expansion: string;
    description: string;
    image: File | null;
    price: string;
    stock: string;
    category: string;
    link: string;
    priceId: string;
  }

const fetcher = async (url: string) => {

    const response = await fetch(url);
    if(!response.ok){throw new Error("Failed to fetch data")};
    return response.json();
}


export default function ImportPage() {


    const [product, setProduct] = useState<Product>({
      name: '',
      expansion: '',
      description: '',
      image: null,
      price: '',
      stock: '',
      category: '',
      link: '',
      priceId: '',
    });

    const [previewImage, setPreviewImage] = useState('')
    const [activeField, setActiveField] = useState<"name" | "expansion" | null>(null);


    const { data:pokemon, error, isLoading } = useSWR(
        product.name.length >= 2 ? `/api/products/matchpokemon?n=${product.name}&e=${product.expansion}` : null,
        fetcher
    );
    console.log('matching Pokemon', pokemon)
  




    const handleInputChange = (e:any) => {
        const { name, value } = e.target
        setProduct(prev => ({ ...prev, [name]: value }))
    }

    const handleImageChange = (e: any) => {
        const file = e.target.files[0]
     
        if (file) {
            setProduct(prev => ({ ...prev, image: file }))
            setPreviewImage(URL.createObjectURL(file))
        }

    }

    const UploadImgur = async (file: File) => {
        if (!file) {
            console.error("No file provided");
            return null;
        }
  

        const toBase64 = (file: File) =>
            new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = error => reject(error);
        });

        let base64Img = await toBase64(file)

     

        if (typeof base64Img == 'string') {
            base64Img = base64Img.replace(/^data:.+base64,/, '')
        }



      
        const result = await fetch('/api/imgur', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: base64Img }),
        })
        const response = await result.json()

        return response
    }
    const updateLink = (newLink: string) => {
        setProduct((prev) => ({ ...prev, link: newLink }));
    };
    


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Step 1: Upload image and get the link
            if (!product.image) {
                console.error('No image selected');
                return;
            }
        
            const link = await UploadImgur(product.image);
            const updatedProduct = { ...product, link, price: parseFloat(product.price)*100 }; // Updated with link

            // Step 2: Make the API call with updated product
            const response = await fetch('/api/products/createStripe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ card: updatedProduct }),
            });

            const session = await response.json();

            console.log("this is the session", session)
            console.log("this is the updated product price", session.product?.default_price)


            // Step 3: Add the priceId to the updatedProduct
            const updatedProductWithPriceId = { ...updatedProduct, priceId: session.product?.default_price };

            console.log("this is the updated product with price", updatedProductWithPriceId)

            // Optionally: Update state with the fully updated product
            console.log("this is the updated product", updatedProductWithPriceId)

            const response2 = await fetch('/api/products/createPrisma', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ updatedProductWithPriceId }),
            });

            if(!response2.ok) {
                throw new Error();
            }

            const session2 = await response2.json();
            console.log(session2)


            // Step 5: Reset form state
            setProduct({
                name: '',
                expansion: '',
                description: '',
                image: null,
                price: '',
                stock: '',
                category: '',
                link: '',
                priceId: '',
            });
            setPreviewImage('');
        } catch (error) {
            console.error("Error during submission:", error);
        }
    };


    return (
        <Card>
            <CardHeader>
                <CardTitle>Add New Product</CardTitle>
                <CardDescription>Enter product details to add a new item</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col lg:flex-row gap-8">
                    <form onSubmit={handleSubmit} className="flex-1 space-y-6">
                       
                        <div>
                            <Label htmlFor="name" className="text-lg">Product Name</Label>
                            <Input id="name" name="name" value={product.name} onChange={handleInputChange} required className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="expansion" className="text-lg">Expansion Name</Label>
                            <Input id="expansion" name="expansion" value={product.expansion} onChange={handleInputChange} required className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="description" className="text-lg">Description</Label>
                            <Textarea id="description" name="description" value={product.description} onChange={handleInputChange} required className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="image" className="text-lg">Product Image</Label>
                            <div className="mt-1 flex items-center space-x-2">
                                <Input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} required className="hidden" />
                                <Button type="button" onClick={() => document.getElementById('image')?.click()} variant="outline">
                                    <Upload className="mr-2 h-4 w-4" /> Upload Image
                                </Button>
                                {product.image && <span className="text-sm text-gray-500">{product.image?.name}</span>}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="price" className="text-lg">Price</Label>
                                <div className="mt-1 relative">
                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <Input id="price" name="price" type="number" min="0" step="0.01" value={product.price} onChange={handleInputChange} required className="pl-10" />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="stock" className="text-lg">Stock</Label>
                                <div className="mt-1 relative">
                                    <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <Input id="stock" name="stock" type="number" min="0" value={product.stock} onChange={handleInputChange} required className="pl-10" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="category" className="text-lg">Category</Label>
                            <div className="mt-1 relative">
                                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <Input id="category" name="category" value={product.category} onChange={handleInputChange} required className="pl-10" />
                            </div>
                        </div>
                        <Button type="submit" className="w-full">Add Product</Button>
                    </form>

                    <Card className="flex-1">
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-semibold mb-4">Product Preview</h2>
                            <div className="space-y-4">
                                {previewImage ? (
                                    <img src={previewImage} alt="Product preview" className="w-full h-64 object-cover rounded-lg" />
                                ) : (
                                    <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <span className="text-gray-400">No image uploaded</span>
                                    </div>
                                )}
                                <h3 className="text-xl font-semibold">{product.name || 'Product Name'}</h3>
                                <p className="text-gray-600">{product.description || 'Product description will appear here'}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold">${product.price || '0.00'}</span>
                                    <span className="text-gray-500">Stock: {product.stock || '0'}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    )
}


// import { useState } from "react";
// import useSWR from "swr";

// const fetcher = async (url: string) => {
//     const response = await fetch(url);
//     return response.json();
// };

// export default function ProductSearchForm() {
//     const [product, setProduct] = useState({ name: "", expansion: "" });
//     const [selectedPokemon, setSelectedPokemon] = useState<{ name: string; expansion?: string } | null>(null);
//     const [activeField, setActiveField] = useState<"name" | "expansion" | null>(null);

//     const { data: pokemon, error, isLoading } = useSWR(
//         activeField === "name" && product.name.length >= 2
//             ? `/api/getpokemon?q=${product.name}`
//             : activeField === "expansion" && product.expansion.length >= 2
//             ? `/api/getpokemon?expansion=${product.expansion}`
//             : null,
//         fetcher
//     );

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setProduct((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleFocus = (field: "name" | "expansion") => {
//         setActiveField(field);
//     };

//     const handleSelectPokemon = (name: string) => {
//         setProduct((prev) => ({ ...prev, name })); // Set name in input
//         setSelectedPokemon({ name });
//         setActiveField(null); // Hide recommendations after selecting
//     };

//     return (
//         <div className="relative w-full">
//             {/* Product Name Input */}
//             <div className="relative">
//                 <label htmlFor="name" className="text-lg">Product Name</label>
//                 <input
//                     id="name"
//                     name="name"
//                     value={product.name}
//                     onChange={handleInputChange}
//                     onFocus={() => handleFocus("name")}
//                     required
//                     className="mt-1 border rounded w-full p-2"
//                 />

//                 {isLoading && activeField === "name" && <p className="text-gray-500 text-sm">Searching...</p>}
//                 {error && <p className="text-red-500 text-sm">Error fetching data</p>}

//                 {pokemon?.length > 0 && activeField === "name" && (
//                     <ul className="absolute bg-white border w-full mt-1 rounded shadow-lg z-10">
//                         {pokemon.map((p: any) => (
//                             <li
//                                 key={p.id}
//                                 className="p-2 hover:bg-gray-200 cursor-pointer"
//                                 onClick={() => handleSelectPokemon(p.name)}
//                             >
//                                 {p.name}
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>

//             {/* Expansion Name Input */}
//             <div className="relative mt-4">
//                 <label htmlFor="expansion" className="text-lg">Expansion Name</label>
//                 <input
//                     id="expansion"
//                     name="expansion"
//                     value={product.expansion}
//                     onChange={handleInputChange}
//                     onFocus={() => handleFocus("expansion")}
//                     required
//                     className="mt-1 border rounded w-full p-2"
//                 />

//                 {isLoading && activeField === "expansion" && <p className="text-gray-500 text-sm">Searching...</p>}
//                 {error && <p className="text-red-500 text-sm">Error fetching data</p>}

//                 {pokemon?.length > 0 && activeField === "expansion" && (
//                     <ul className="absolute bg-white border w-full mt-1 rounded shadow-lg z-10">
//                         {pokemon.map((p: any) => (
//                             <li
//                                 key={p.id}
//                                 className="p-2 hover:bg-gray-200 cursor-pointer"
//                                 onClick={() => setProduct((prev) => ({ ...prev, expansion: p.expansionName }))}
//                             >
//                                 {p.expansionName}
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>

//             {/* Display Selected Pokémon */}
//             {selectedPokemon && (
//                 <div className="mt-4 p-2 border rounded bg-gray-100">
//                     <p className="text-lg font-semibold">Selected Pokémon: {selectedPokemon.name}</p>
//                 </div>
//             )}
//         </div>
//     );
// }
