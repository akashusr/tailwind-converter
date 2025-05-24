"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="w-9 h-9">
        <div className="h-4 w-4" />
      </Button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-9 h-9 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
    >
      {isDark ? (
        <Sun className="h-4 w-4 transition-all duration-200" />
      ) : (
        <Moon className="h-4 w-4 transition-all duration-200" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
