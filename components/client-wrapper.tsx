"use client"

import type { ReactNode } from "react"
import { useState, useEffect } from "react"

interface ClientWrapperProps {
  children: ReactNode
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="relative">
      {isMounted && children}
    </div>
  )
}
