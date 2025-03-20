"use client"

import { BottomNavigation } from "@/components/bottom-navigation"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

export default function OrdersPage() {
  const searchParams = useSearchParams()
  const [mode, setMode] = useState<"give" | "get">("get")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const modeParam = searchParams.get("mode")
    if (modeParam === "give") {
      setMode("give")
    } else {
      setMode("get")
    }
  }, [searchParams])

  if (!mounted) {
    return <div className="h-full"></div>
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-sm text-gray-500">{mode === "give" ? "Your published boxes" : "Your ordered boxes"}</p>
      </div>

      <div className="flex-1 p-4 overflow-y-auto pb-20">
        <div className="text-center text-gray-500 py-8">No orders yet</div>
      </div>

      <BottomNavigation active="orders" />
    </div>
  )
}

