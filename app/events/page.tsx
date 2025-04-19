"use client"

import { useState } from "react"
import { categoryNames, getEventsByCategory } from "@/lib/data"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/use-auth"
import { useToast } from "@/hooks/use-toast"
import type { Event } from "@/lib/types"
import EventDetailsModal from "@/components/EventDetailsModal"

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState("cat1")
  const { user, openAuthModal } = useAuth()
  const { toast } = useToast()
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const filteredEvents = getEventsByCategory(activeCategory)

  const handleAddToCart = (event: Event) => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to add events to your cart",
        variant: "destructive",
      })
      openAuthModal()
      return
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-pixel mb-8 text-center neon-text">EVENTS</h1>

      <div className="max-w-4xl mx-auto mb-8">
        <p className="text-center mb-6">
          Explore our exciting lineup of events for TECHTONIC&apos;25. From coding challenges to creative competitions,
          there&apos;s something for everyone!
        </p>

        <div className="flex justify-center mb-8">
        <a
  href="/brochure/TechTonic_Brochure.pdf"
  download
  className="pixel-button text-sm inline-block text-center px-4 py-2"
>
  Download Brochure
</a>

        </div>
      </div>

      <Tabs defaultValue="cat1" className="w-full" onValueChange={setActiveCategory}>
        <TabsList className="grid grid-cols-3 bg-[#1a1a1a] border border-white text-white font-pixel mb-8">
          <TabsTrigger value="cat1" className="text-xs data-[state=active]:bg-white data-[state=active]:text-black">
            STREAM 1
          </TabsTrigger>
          <TabsTrigger value="cat2" className="text-xs data-[state=active]:bg-white data-[state=active]:text-black">
            STREAM 2
          </TabsTrigger>
          <TabsTrigger value="cat3" className="text-xs data-[state=active]:bg-white data-[state=active]:text-black">
            STREAM 3
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeCategory} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card
                key={event.id}
                className="border border-white bg-black/70 backdrop-blur-md p-4 font-pixel text-white neon-border"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-secondary">{event.title}</CardTitle>
                  <CardDescription className="text-sm mt-2 text-white/80">{event.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex flex-col gap-2">
                  {(activeCategory === "cat1" || activeCategory === "cat2") ? (
                    <>
                      <Button
                        className="pixel-button bg-black border border-white text-white hover:bg-white hover:text-black w-full text-xs"
                        onClick={() => {
                          setSelectedEvent(event)
                          setModalOpen(true)
                        }}
                      >
                        View Details
                      </Button>

                      {event.registrationType === "onspot" ? (
                        <p className="text-yellow-500 font-semibold text-center">On-spot registration only!!</p>
                      ) : (
                        <a
                          href={event.formUrl}
                          className="pixel-button bg-purple-600 text-white hover:bg-purple-400 w-full text-xs text-center inline-block px-4 py-2 rounded"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Register
                        </a>
                      )}
                    </>
                  ) : (
                    <p className="text-yellow-500 font-semibold text-center">On-spot registration only!!</p>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedEvent && (
        <EventDetailsModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          event={selectedEvent}
        />
      )}
    </div>
  )
}
