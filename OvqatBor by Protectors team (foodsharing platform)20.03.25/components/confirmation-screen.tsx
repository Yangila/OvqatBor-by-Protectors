"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { BottomNavigation } from "./bottom-navigation"
import { ArrowLeft, Minus, Plus, Star } from "lucide-react"
import { useState, useEffect } from "react"
import { useStore } from "@/lib/store"
import type { Product } from "@/lib/store"

interface ConfirmationScreenProps {
  id: string
}

export default function ConfirmationScreen({ id }: ConfirmationScreenProps) {
  const router = useRouter()
  const getProduct = useStore((state) => state.getProduct)
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const bookingNumber = Math.floor(200000 + Math.random() * 799999).toString()

  useEffect(() => {
    setMounted(true)
    const productData = getProduct(id)
    if (productData) {
      setProduct(productData)
    }
    setLoading(false)
  }, [getProduct, id])

  const handleBack = () => {
    router.back()
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  if (!mounted) {
    return <div className="h-full"></div>
  }

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <h1 className="text-xl font-bold mb-2">Product Not Found</h1>
        <p className="text-gray-500 mb-4">The product you're looking for doesn't exist.</p>
        <Button onClick={() => router.push("/home/get")}>Go Back to Home</Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center">
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-16">
        <div className="h-64 bg-gray-200 relative">
          <Image src={product.imageUrl || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        </div>

        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-xl font-bold">{product.name}</h1>
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">RESERVE NOW</span>
          </div>

          <div className="flex items-center mb-4">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm ml-1">{product.rating}</span>
            <span className="text-sm text-gray-500 ml-2">{product.time} mins</span>
          </div>

          <p className="text-sm text-gray-600 mb-4">{product.description}</p>

          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm">Price:</p>
              <p className="text-lg font-bold text-red-500">{product.price} sums</p>
            </div>

            <div className="flex items-center">
              <p className="mr-2">How many?</p>
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  className="w-8 h-8 rounded-full border flex items-center justify-center"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="mx-3">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="w-8 h-8 rounded-full border flex items-center justify-center"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg mb-6 border border-green-200">
            <h3 className="text-green-800 font-medium mb-1">Booking Confirmed!</h3>
            <p className="text-sm text-green-700">
              Your mystery box has been reserved. Show this booking number when you pick up your order.
            </p>
          </div>

          <Button className="w-full bg-[#2D2424] hover:bg-[#1D1818] text-white py-6">
            BOOK NUMBER: {bookingNumber}
          </Button>
        </div>
      </div>

      <BottomNavigation active="home" />
    </div>
  )
}

