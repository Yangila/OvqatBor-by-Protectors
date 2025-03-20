"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"

interface PhotoPickerProps {
  onImageSelected: (imageUrl: string) => void
  defaultImage?: string
}

export default function PhotoPicker({ onImageSelected, defaultImage }: PhotoPickerProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMounted(true)
    if (defaultImage) {
      setPreviewUrl(defaultImage)
    }
  }, [defaultImage])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file")
      return
    }

    // Create a preview URL
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    onImageSelected(url)
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  if (!mounted) {
    return <div className="w-full h-64 bg-gray-200 rounded-lg"></div>
  }

  return (
    <div className="w-full">
      <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />

      {previewUrl ? (
        <div className="relative h-64 w-full bg-gray-200 rounded-lg overflow-hidden">
          <Image src={previewUrl || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
          <Button
            onClick={handleButtonClick}
            className="absolute bottom-4 right-4 bg-white text-gray-800 hover:bg-gray-100"
            size="sm"
          >
            Change Photo
          </Button>
        </div>
      ) : (
        <button
          onClick={handleButtonClick}
          className="h-64 w-full bg-gray-200 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300"
        >
          <Camera size={48} className="text-gray-400 mb-2" />
          <p className="text-gray-500">Click to add a photo</p>
        </button>
      )}
    </div>
  )
}

