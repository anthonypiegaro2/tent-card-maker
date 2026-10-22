import { Tent } from "lucide-react"
import { ModeToggle } from "@/components/dark-mode/mode-toggle"

export function Header() {
  return (
    <header className="w-full py-3 px-4 flex justify-between items-end border-b-2">
      <div className="flex gap-x-2 text-xl">
        <Tent className="size-6" />
        Tent Card Maker
      </div>

      <ModeToggle />
    </header>
  )
}