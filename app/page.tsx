import HeroBanner from "@/components/hero-banner"
import EventHighlights from "@/components/event-highlights"
import Gallery from "@/components/gallery"
import Faq from "@/components/faq"
import { ClientWrapper } from "@/components/client-wrapper"

export default function Home() {
  return (
    <ClientWrapper>
      <HeroBanner />
      <EventHighlights />
    </ClientWrapper>
  )
}
