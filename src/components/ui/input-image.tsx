"use client"

import React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "./input"

interface ImagePreviewInputProps {
  value?: string
  onChange: (url: string) => void
  label?: string
  placeholder?: string
}

export const InputImage: React.FC<ImagePreviewInputProps> = ({
  value,
  onChange,
  placeholder = "Sem imagem",
}) => {
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <div className=" rounded p-5 flex flex-col items-center w-full h-full">
        {value ? (
          <img
            src={value}
            alt="Preview"
            className="w-58 h-58 object-cover rounded-lg mb-2"
          />
        ) : (
          <div className="w-62 h-62 bg-gray-200 flex items-center justify-center rounded-lg mb-2 text-gray-500">
            {placeholder}
          </div>
        )}

        <Input
          type="text"
          placeholder="Cole a URL da imagem"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="border rounded p-3 w-full w-62"
        />
      </div>
    </div>
  )
}
