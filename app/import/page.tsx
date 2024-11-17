'use client'

import { useState } from 'react'
import { Button } from "@/components/import/button"
import { Input } from "@/components/import/input"
import { Label } from "@/components/import/label"
import { Textarea } from "@/components/import/textarea"
import { Card, CardContent } from "@/components/import/card"
import { Badge } from "@/components/import/badge"
import { Upload, DollarSign, Package, Tag } from 'lucide-react'
import { link } from 'fs'



export default function Page() {
    interface Product {
      name: string;
      description: string;
      image: File | null;
      price: string;
      stock: string;
      category: string;
      link: string;
      priceId: string;
    }
    
    const [product, setProduct] = useState<Product>({
      name: '',
      description: '',
      image: null,
      price: '',
      stock: '',
      category: '',
      link: '',
      priceId: '',
    });
    const [previewImage, setPreviewImage] = useState('')

    const handleInputChange = (e:any) => {
        const { name, value } = e.target
        setProduct(prev => ({ ...prev, [name]: value }))
    }

    const handleImageChange = (e: any) => {
        const file = e.target.files[0]
        console.log("this is the file", file)
        console.log("this is the file type", file.type)
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
            const response = await fetch('/api/createStripe', {
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

            const response2 = await fetch('/api/prismaadd', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: product.name, description: product.description, image: product.link, price: product.price, stock: product.stock, category: product.category, link: updatedProductWithPriceId.link, priceId: updatedProductWithPriceId.priceId }),
            });

            const session2 = await response2.json();
            console.log(session2)

            // Step 5: Reset form state
            setProduct({
                name: '',
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
        <div className="container mx-auto p-4 max-w-6xl">
            <h1 className="text-3xl font-bold mb-8 text-center">Import New Product</h1>
            <div className="flex flex-col lg:flex-row gap-8">
                <form onSubmit={handleSubmit} className="flex-1 space-y-6">
                    <div>
                        <Label htmlFor="name" className="text-lg">Product Name</Label>
                        <Input id="name" name="name" value={product.name} onChange={handleInputChange} required className="mt-1" />
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
                    <Button type="submit" className="w-full">Import Product</Button>
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
                            {product.category && <Badge className="mt-2">{product.category}</Badge>}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}