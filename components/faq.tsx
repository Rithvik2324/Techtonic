"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqItems = [
  {
    question: "How do I register for TECHTONIC'25?",
    answer:
      "You need to create an account on our website first. Once logged in, you can register for individual events through the 'Register' buttons on each event card.",
  },
  {
    question: "Is there an entry fee?",
    answer:
      "Registration for TECHTONIC'25 is free! However, some specific competitions may have a nominal entry fee, which will be mentioned in their respective event details.",
  },
  {
    question: "Can I participate in multiple events?",
    answer:
      "Yes! You can register and participate in as many events as you want, as long as there are no schedule conflicts.",
  },
  {
    question: "Do I need to bring my own laptop/equipment?",
    answer:
      "For most coding and design events, you should bring your own laptop. For hardware events like Robo Cars, specific requirements will be mentioned in the event details.",
  },
  {
    question: "Will accommodation be provided?",
    answer:
      "Limited accommodation facilities are available for outstation participants. Please contact us at techtonic25@example.com for accommodation requests at least 2 weeks before the event.",
  },
  {
    question: "How can I get my participation certificate?",
    answer:
      "All registered participants who attend the events will receive digital participation certificates via email within 2 weeks after the fest.",
  },
  {
    question: "I'm having trouble with registration. Who can I contact?",
    answer:
      "Please email us at support@techtonic25.example.com or message us on our social media channels for prompt assistance.",
  },
]

export default function Faq() {
  return (
    <section id="faq" className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-pixel mb-12 text-center neon-text">FAQ</h2>

        <div className="max-w-3xl mx-auto">
          <div className="dialog-box p-6 md:p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-white/20 last:border-b-0">
                  <AccordionTrigger className="font-pixel text-sm md:text-base text-secondary py-4 hover:text-primary">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm md:text-base pb-4">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-12 text-center">
            <h3 className="font-pixel text-lg mb-4 text-secondary">Still have questions?</h3>
            <p className="mb-6">Contact us at techtonic25@example.com</p>
            <div className="flex justify-center gap-4">
              <a
                href="https://twitter.com/techtonic25"
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-button px-4 py-2 text-xs"
              >
                Twitter
              </a>
              <a
                href="https://instagram.com/techtonic25"
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-button px-4 py-2 text-xs"
              >
                Instagram
              </a>
              <a
                href="https://discord.gg/techtonic25"
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-button px-4 py-2 text-xs"
              >
                Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
