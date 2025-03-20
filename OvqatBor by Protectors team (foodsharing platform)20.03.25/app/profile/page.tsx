"use client"

import { BottomNavigation } from "@/components/bottom-navigation"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

export default function ProfilePage() {
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
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-sm text-gray-500">{mode === "give" ? "Shop Owner Account" : "Customer Account"}</p>
      </div>

      <div className="flex-1 p-4 overflow-y-auto pb-20">
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mr-4">
            <Image src="/placeholder.svg?height=64&width=64" alt="Profile" width={64} height={64} />
          </div>
          <div>
            <h2 className="text-lg font-medium">User Name</h2>
            <p className="text-sm text-gray-500">user@example.com</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Account Settings</h3>
            <p className="text-sm text-gray-500">Manage your account preferences</p>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Payment Methods</h3>
            <p className="text-sm text-gray-500">Add or remove payment methods</p>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Notifications</h3>
            <p className="text-sm text-gray-500">Manage your notification preferences</p>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Help & Support</h3>
            <p className="text-sm text-gray-500">Get help with your account</p>
          </div>
        </div>
      </div>

      <BottomNavigation active="profile" />
    </div>
  )
}

