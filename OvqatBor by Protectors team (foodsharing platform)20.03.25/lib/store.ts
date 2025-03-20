import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  shop: string
  rating: number
  time: number
  quantity: number
  createdAt: string
}

interface StoreState {
  products: Product[]
  addProduct: (product: Omit<Product, "id" | "createdAt">) => void
  getProducts: () => Product[]
  getProduct: (id: string) => Product | undefined
}

// Initial mock data
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Sofia Surprise Box",
    description: "Hey, we have 10 Surprise boxes which are available at 17:00 pm today",
    price: 30000,
    imageUrl: "/placeholder.svg?height=256&width=384",
    shop: "Sofia",
    rating: 4.9,
    time: 76,
    quantity: 10,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Kristina Surprise Box",
    description: "Fresh pastries and cakes available for pickup today",
    price: 30000,
    imageUrl: "/placeholder.svg?height=256&width=384",
    shop: "Kristina",
    rating: 4.7,
    time: 45,
    quantity: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Sofia Surprise Box",
    description: "Special assortment of our best-selling items",
    price: 30000,
    imageUrl: "/placeholder.svg?height=256&width=384",
    shop: "Sofia",
    rating: 4.8,
    time: 60,
    quantity: 8,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Kristina Surprise Box",
    description: "Variety of breads and pastries at a special price",
    price: 30000,
    imageUrl: "/placeholder.svg?height=256&width=384",
    shop: "Kristina",
    rating: 4.6,
    time: 50,
    quantity: 7,
    createdAt: new Date().toISOString(),
  },
]

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      addProduct: (product) => {
        const newProduct = {
          ...product,
          id: Math.random().toString(36).substring(2, 9),
          createdAt: new Date().toISOString(),
        }
        set((state) => ({
          products: [...state.products, newProduct],
        }))
      },
      getProducts: () => get().products,
      getProduct: (id) => get().products.find((product) => product.id === id),
    }),
    {
      name: "ovqatbor-storage",
    },
  ),
)

