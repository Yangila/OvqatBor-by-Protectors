"use client"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { BottomNavigation } from "./bottom-navigation"
import { useStore } from "@/lib/store"
import { useEffect, useState } from "react"
import type { Product } from "@/lib/store"

export default function GetHomeScreen() {
  const router = useRouter()
  const getProducts = useStore((state) => state.getProducts)
  const [products, setProducts] = useState<Product[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setProducts(getProducts())
  }, [getProducts])

  const handleBoxClick = (id: string) => {
    router.push(`/product/${id}`)
  }

  if (!mounted) {
    return <div className="h-full"></div>
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">OvqatBor</h1>
            <p className="text-sm text-gray-500">Box lists</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
            <Image src="/placeholder.svg?height=32&width=32" alt="Profile" width={32} height={32} />
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto pb-20">
        {products.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No mystery boxes available</div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {products.map((box) => (
              <div
                key={box.id}
                className="bg-white rounded-lg overflow-hidden shadow cursor-pointer"
                onClick={() => handleBoxClick(box.id)}
              >
                <div className="h-24 bg-gray-200 relative">
                  <Image src={box.imageUrl || "/placeholder.svg"} alt={box.name} fill className="object-cover" />
                </div>
                <div className="p-2">
                  <p className="text-xs">{box.shop}</p>
                  <p className="text-sm font-medium">{box.name}</p>
                  <p className="text-xs text-red-500">{box.price} sums</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNavigation active="home" />
    </div>
  )
}

