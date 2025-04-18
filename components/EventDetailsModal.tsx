import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Event } from "@/lib/types"

type Props = {
  event: Event
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function EventDetailsModal({ event, open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="font-pixel text-white bg-black border-white border neon-border">
        <DialogHeader>
          <DialogTitle className="text-green-400 text-xl">{event.title}</DialogTitle>
          <DialogDescription className="text-white/80 text-sm mt-2">
            {event.description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-2 text-white text-sm">
          <p className="text-secondary"><strong>Rules:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            {event.rules?.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>

          {event.category === "cat1" && event.prizes && event.prizes.length > 0 && (
  <div className="mt-4">
    <h3 className="text-lg font-semibold mb-2 text-white">Prizes</h3>
    <ul className="list-disc list-inside text-white/80">
      {event.prizes.map((prize, index) => (
        <li key={index}>{prize}</li>
      ))}
    </ul>
  </div>
)}

        </div>


      </DialogContent>
    </Dialog>
  )
}
0