"use client"

import { useRouter } from "next/navigation"
import { Home, ShoppingBag, User } from "lucide-react"
import { useState, useEffect } from "react"

interface BottomNavigationProps {
  active: "home" | "orders" | "profile"
}

export function BottomNavigation({ active }: BottomNavigationProps) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navigateToHome = () => {
    // Check if we're in give or get mode and navigate accordingly
    if (window.location.pathname.includes("/give")) {
      router.push("/home/give")
    } else {
      router.push("/home/get")
    }
  }

  const navigateToOrders = () => {
    if (window.location.pathname.includes("/give")) {
      router.push("/orders?mode=give")
    } else {
      router.push("/orders?mode=get")
    }
  }

  const navigateToProfile = () => {
    if (window.location.pathname.includes("/give")) {
      router.push("/profile?mode=give")
    } else {
      router.push("/profile?mode=get")
    }
  }

  if (!mounted) {
    return (
      <div className="h-16 bg-red-500 flex items-center justify-around fixed bottom-0 left-0 right-0 z-10">
        <div className="w-6 h-6"></div>
        <div className="w-6 h-6"></div>
        <div className="w-6 h-6"></div>
      </div>
    )
  }

  return (
    <div className="h-16 bg-red-500 flex items-center justify-around fixed bottom-0 left-0 right-0 z-10">
      <button
        className={`flex flex-col items-center justify-center ${active === "home" ? "text-white" : "text-red-200"}`}
        onClick={navigateToHome}
      >
        <Home size={24} />
      </button>
      <button
        className={`flex flex-col items-center justify-center ${active === "orders" ? "text-white" : "text-red-200"}`}
        onClick={navigateToOrders}
      >
        <ShoppingBag size={24} />
      </button>
      <button
        className={`flex flex-col items-center justify-center ${active === "profile" ? "text-white" : "text-red-200"}`}
        onClick={navigateToProfile}
      >
        <User size={24} />
      </button>
    </div>
  )
}

