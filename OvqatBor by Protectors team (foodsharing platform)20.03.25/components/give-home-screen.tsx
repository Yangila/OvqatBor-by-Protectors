"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { BottomNavigation } from "./bottom-navigation"
import { Plus } from "lucide-react"
import { useStore } from "@/lib/store"
import { useEffect, useState } from "react"
import type { Product } from "@/lib/store"

export default function GiveHomeScreen() {
  const router = useRouter()
  const getProducts = useStore((state) => state.getProducts)
  const [products, setProducts] = useState<Product[]>([])
  const [activeTab, setActiveTab] = useState("new")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Get all products and filter by the current shop (in a real app)
    // For now, we'll just show all products
    setProducts(getProducts())
  }, [getProducts])

  const handleAddBox = () => {
    router.push("/product/add")
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
            <p className="text-sm text-gray-500">Sofia Cake&Bakery</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
            <Image src="/placeholder.svg?height=32&width=32" alt="Profile" width={32} height={32} />
          </div>
        </div>
        <Tabs defaultValue="new" className="mt-4" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="w-full">
            <TabsTrigger
              value="new"
              className="flex-1 bg-red-500 text-white data-[state=active]:bg-red-500 data-[state=active]:text-white"
            >
              New
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="flex-1 bg-gray-200 text-gray-700 data-[state=active]:bg-red-500 data-[state=active]:text-white"
            >
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="mt-0 h-full overflow-y-auto pb-20">
            <div className="flex-1 overflow-y-auto">
              {products.length === 0 ? (
                <div className="text-center text-gray-500 py-8">No announcements yet</div>
              ) : (
                <div className="grid grid-cols-1 gap-4 mt-4">
                  {products.map((box) => (
                    <div key={box.id} className="bg-white rounded-lg overflow-hidden shadow border">
                      <div className="flex">
                        <div className="w-24 h-24 bg-gray-200 relative">
                          <Image
                            src={box.imageUrl || "/placeholder.svg"}
                            alt={box.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-3 flex-1">
                          <h3 className="font-medium">{box.name}</h3>
                          <p className="text-xs text-gray-500 line-clamp-2">{box.description}</p>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-sm text-red-500">{box.price} sums</p>
                            <p className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              {box.quantity} available
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-0 h-full overflow-y-auto pb-20">
            <div className="text-center text-gray-500 py-8">No history yet</div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex-1 overflow-y-auto pb-20">
        {activeTab === "new" && products.length === 0 && (
          <div className="text-center text-gray-500 py-8">No announcements yet. Add your first mystery box!</div>
        )}
      </div>

      <div className="relative">
        <button
          onClick={handleAddBox}
          className="absolute bottom-20 right-4 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
        >
          <Plus className="text-white" />
        </button>
      </div>

      <BottomNavigation active="home" />
    </div>
  )
}

