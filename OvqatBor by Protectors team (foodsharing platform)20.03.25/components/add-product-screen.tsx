"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { BottomNavigation } from "./bottom-navigation"
import { ArrowLeft, Minus, Plus } from "lucide-react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import PhotoPicker from "./photo-picker"
import { useStore } from "@/lib/store"
import { toast } from "@/hooks/use-toast"

export default function AddProductScreen() {
  const router = useRouter()
  const addProduct = useStore((state) => state.addProduct)
  const [mounted, setMounted] = useState(false)

  const [formData, setFormData] = useState({
    name: "A mystery Box",
    description: "Hey, we have 10 Surprise boxes which are available at 17:00 pm today",
    price: 34000,
    imageUrl: "/placeholder.svg?height=256&width=384",
    shop: "Sofia Cake&Bakery",
    rating: 4.9,
    time: 76,
    quantity: 10,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleBack = () => {
    router.back()
  }

  const handlePublish = () => {
    // Save the product to the store
    addProduct(formData)

    // Show success toast
    toast({
      title: "Product Published",
      description: "Your mystery box has been published successfully!",
    })

    // Navigate back to home
    router.push("/home/give")
  }

  const incrementPrice = () => {
    setFormData((prev) => ({
      ...prev,
      price: prev.price + 1000,
    }))
  }

  const decrementPrice = () => {
    if (formData.price > 1000) {
      setFormData((prev) => ({
        ...prev,
        price: prev.price - 1000,
      }))
    }
  }

  const handleImageSelected = (imageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      imageUrl,
    }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  if (!mounted) {
    return <div className="h-full"></div>
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center">
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft />
        </button>
        <h1 className="text-lg font-medium">Add New Mystery Box</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-20">
        <PhotoPicker onImageSelected={handleImageSelected} defaultImage={formData.imageUrl} />

        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Box Name
            </label>
            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full" />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full min-h-[100px]"
            />
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium mb-1">
              Quantity Available
            </label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          <div>
            <p className="text-sm font-medium mb-1">Price:</p>
            <div className="flex items-center">
              <button
                onClick={decrementPrice}
                className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="mx-3">{formData.price} sums</span>
              <button
                onClick={incrementPrice}
                className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <Button onClick={handlePublish} className="w-full bg-[#2D2424] hover:bg-[#1D1818] text-white py-6 mt-6">
          PUBLISH
        </Button>
      </div>

      <BottomNavigation active="home" />
    </div>
  )
}

