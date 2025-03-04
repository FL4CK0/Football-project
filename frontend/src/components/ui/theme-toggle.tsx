
import * as React from "react"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const [theme, setThemeState] = React.useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "light"
  )

  // Update the theme
  React.useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  // Toggle the theme
  const setTheme = (theme: "light" | "dark") => {
    setThemeState(theme)
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(theme)
  }

  return (
    <button 
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-md w-9 h-9 flex items-center justify-center hover:bg-accent"
      title={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}