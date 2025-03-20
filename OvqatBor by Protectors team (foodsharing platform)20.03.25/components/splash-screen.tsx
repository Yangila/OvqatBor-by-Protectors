"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function SplashScreen() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleGive = () => {
    router.push("/home/give")
  }

  const handleGet = () => {
    router.push("/home/get")
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-red-400 to-red-500 p-6">
      <div className="text-white text-4xl font-bold mb-8">OvqatBor</div>

      <div className="relative w-full mb-8">
        <div className="w-full max-w-[250px] mx-auto">
          <Image src="/images/food-box.png" alt="Food Box" width={250} height={200} className="rounded-lg" priority />
        </div>
      </div>

      <div className="flex flex-col w-full gap-4">
        <Button onClick={handleGive} className="bg-white text-red-500 hover:bg-gray-100 font-bold py-3 rounded-full">
          GIVE
        </Button>
        <Button onClick={handleGet} className="bg-white text-red-500 hover:bg-gray-100 font-bold py-3 rounded-full">
          GET
        </Button>
      </div>
    </div>
  )
}

