'use client'

import Link from 'next/link'
import { Input } from "@/components/footer/input"
import { Button } from "@/components/footer/button"
import { Facebook, Twitter, Instagram, Youtube, CreditCard, ShieldCheck, Truck } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 w-full">
      <div className="w-full px-0 py-12 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold text-white mb-4">CardMaster</h2>
            <p className="mb-4">Your one-stop shop for collectible cards, trading cards, and more!</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Youtube className="h-6 w-6" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/new-arrivals" className="hover:text-white transition-colors duration-300">New Arrivals</Link></li>
              <li><Link href="/best-sellers" className="hover:text-white transition-colors duration-300">Best Sellers</Link></li>
              <li><Link href="/card-sets" className="hover:text-white transition-colors duration-300">Card Sets</Link></li>
              <li><Link href="/accessories" className="hover:text-white transition-colors duration-300">Accessories</Link></li>
              <li><Link href="/sell-your-cards" className="hover:text-white transition-colors duration-300">Sell Your Cards</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="hover:text-white transition-colors duration-300">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors duration-300">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors duration-300">Shipping Information</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors duration-300">Returns & Exchanges</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form onSubmit={(e) => { e.preventDefault(); console.log('Newsletter form submitted'); }} className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                required
                className="bg-gray-800 text-white border-gray-700"
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} CardMaster. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <div className="flex items-center">
              <CreditCard className="h-6 w-6 mr-2" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center">
              <ShieldCheck className="h-6 w-6 mr-2" />
              <span>Buyer Protection</span>
            </div>
            <div className="flex items-center">
              <Truck className="h-6 w-6 mr-2" />
              <span>Fast Shipping</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}