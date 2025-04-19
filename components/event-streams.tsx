"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAuth } from "@/lib/use-auth"
import {
  Cpu,
  Lightbulb,
  PaintbrushIcon as PaintBrush,
  MessageSquare,
  Code,
  Clock,
  Puzzle,
  Keyboard,
} from "lucide-react"

export default function EventStreams() {
  const { user, openAuthModal } = useAuth()
  const [activeTab, setActiveTab] = useState("stream1")

  const handleRegister = (eventName: string, formUrl: string) => {
    if (!user) {
      openAuthModal()
      return
    }

    // If user is logged in, open the Google Form with prefilled data
    const prefilledUrl = `${formUrl}?usp=pp_url&entry.1234=${encodeURIComponent(user.name || "")}&entry.5678=${encodeURIComponent(user.email || "")}`
    window.open(prefilledUrl, "_blank")
  }

  return (
    <section id="events" className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-pixel mb-12 text-center neon-text">EVENT STREAMS</h2>

        <Tabs defaultValue="stream1" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="stream1" className="font-pixel text-xs md:text-sm">
              STREAM 1
            </TabsTrigger>
            <TabsTrigger value="stream2" className="font-pixel text-xs md:text-sm">
              STREAM 2
            </TabsTrigger>
            <TabsTrigger value="stream3" className="font-pixel text-xs md:text-sm">
              STREAM 3
            </TabsTrigger>
          </TabsList>

          {/* Stream 1: Hackathon & Robo Cars */}
          <TabsContent value="stream1" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EventCard
                title="Hackathon"
                description="24-hour coding challenge to build innovative solutions. Form teams of 3-4 members."
                icon={<Code className="h-8 w-8 text-primary" />}
                formUrl="https://forms.google.com/hackathon"
                onRegister={handleRegister}
              >
                <div className="space-y-4">
                  <h4 className="font-pixel text-sm text-secondary">Rules:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Teams of 3-4 members</li>
                    <li>24-hour continuous coding</li>
                    <li>Theme will be revealed at the start</li>
                    <li>Preliminary round followed by finals</li>
                    <li>Judging based on innovation, execution, and presentation</li>
                  </ul>
                  <h4 className="font-pixel text-sm text-secondary mt-4">Prizes:</h4>
                  <p className="text-sm">₹20,000 for winning team, ₹10,000 for runners-up</p>
                </div>
              </EventCard>

              <EventCard
                title="Robo Cars"
                description="Design and race robotic cars through an obstacle course. Test your engineering skills!"
                icon={<Cpu className="h-8 w-8 text-primary" />}
                formUrl="https://forms.google.com/robocars"
                onRegister={handleRegister}
              >
                <div className="space-y-4">
                  <h4 className="font-pixel text-sm text-secondary">Rules:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Teams of 2-3 members</li>
                    <li>Bring your own robot car or assemble on-site</li>
                    <li>Three rounds: Time trial, Obstacle course, Battle royale</li>
                    <li>Cars must be autonomous or remote-controlled</li>
                    <li>Maximum dimensions: 30cm x 20cm x 15cm</li>
                  </ul>
                  <h4 className="font-pixel text-sm text-secondary mt-4">Prizes:</h4>
                  <p className="text-sm">₹15,000 for winning team, ₹7,500 for runners-up</p>
                </div>
              </EventCard>
            </div>
          </TabsContent>

          {/* Stream 2: Various Tech Events */}
          <TabsContent value="stream2" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <EventCard
                title="Cicada"
                description="Cryptic puzzle-solving challenge that tests your logical thinking and coding skills."
                icon={<Puzzle className="h-8 w-8 text-primary" />}
                formUrl="https://forms.google.com/cicada"
                onRegister={handleRegister}
              >
                <div className="space-y-4">
                  <h4 className="font-pixel text-sm text-secondary">Rules:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Individual participation</li>
                    <li>Multiple rounds of increasing difficulty</li>
                    <li>Cryptography, steganography, and coding challenges</li>
                    <li>Time-based scoring system</li>
                    <li>Hints available with time penalties</li>
                  </ul>
                </div>
              </EventCard>

              <EventCard
                title="AI Art Battle"
                description="Create stunning artwork using AI tools in this creative showdown."
                icon={<PaintBrush className="h-8 w-8 text-primary" />}
                formUrl="https://forms.google.com/aiart"
                onRegister={handleRegister}
              >
                <div className="space-y-4">
                  <h4 className="font-pixel text-sm text-secondary">Rules:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Individual or pairs</li>
                    <li>Use any AI art generation tool</li>
                    <li>Theme will be provided on-spot</li>
                    <li>90 minutes to create and submit</li>
                    <li>Judging based on creativity, technical skill, and theme interpretation</li>
                  </ul>
                </div>
              </EventCard>

              <EventCard
                title="Tech Debate"
                description="Argue your stance on controversial tech topics in this heated debate competition."
                icon={<MessageSquare className="h-8 w-8 text-primary" />}
                formUrl="https://forms.google.com/techdebate"
                onRegister={handleRegister}
              >
                <div className="space-y-4">
                  <h4 className="font-pixel text-sm text-secondary">Rules:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Teams of 2 members</li>
                    <li>Topics related to technology ethics and future</li>
                    <li>Preliminary written round followed by live debates</li>
                    <li>Oxford-style debate format</li>
                    <li>Judging based on argument quality, research, and presentation</li>
                  </ul>
                </div>
              </EventCard>

              <EventCard
                title="Ideathon"
                description="Brainstorm innovative solutions to real-world problems in this idea marathon."
                icon={<Lightbulb className="h-8 w-8 text-primary" />}
                formUrl="https://forms.google.com/ideathon"
                onRegister={handleRegister}
              >
                <div className="space-y-4">
                  <h4 className="font-pixel text-sm text-secondary">Rules:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Teams of 3-4 members</li>
                    <li>8-hour ideation challenge</li>
                    <li>Problem statements from industry partners</li>
                    <li>Create business model, prototype, and pitch</li>
                    <li>Judging based on innovation, feasibility, and impact</li>
                  </ul>
                </div>
              </EventCard>

              <EventCard
                title="Quick Query"
                description="Test your SQL and database knowledge in this fast-paced query challenge."
                icon={<Code className="h-8 w-8 text-primary" />}
                formUrl="https://forms.google.com/quickquery"
                onRegister={handleRegister}
              >
                <div className="space-y-4">
                  <h4 className="font-pixel text-sm text-secondary">Rules:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Individual participation</li>
                    <li>Three rounds of increasing complexity</li>
                    <li>SQL queries, database design, and optimization</li>
                    <li>Time-based scoring system</li>
                    <li>Multiple database systems (MySQL, PostgreSQL, MongoDB)</li>
                  </ul>
                </div>
              </EventCard>
            </div>
          </TabsContent>

          {/* Stream 3: More Tech Events */}
          <TabsContent value="stream3" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <EventCard
                title="Blank Coding"
                description="Code without seeing the output until submission. Test your debugging skills!"
                icon={<Code className="h-8 w-8 text-primary" />}
                formUrl="https://forms.google.com/blankcoding"
                onRegister={handleRegister}
              >
                <div className="space-y-4">
                  <h4 className="font-pixel text-sm text-secondary">Rules:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Individual participation</li>
                    <li>No output checking until final submission</li>
                    <li>Multiple programming challenges</li>
                    <li>Time-based scoring with penalties for errors</li>
                    <li>Choice of programming language</li>
                  </ul>
                </div>
              </EventCard>

              <EventCard
                title="Tech Whisper"
                description="Communicate technical concepts without using technical terms in this fun challenge."
                icon={<MessageSquare className="h-8 w-8 text-primary" />}
                formUrl="https://forms.google.com/techwhisper"
                onRegister={handleRegister}
              >
                <div className="space-y-4">
                  <h4 className="font-pixel text-sm text-secondary">Rules:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Teams of 2 members</li>
                    <li>Explain technical concepts without using technical terms</li>
                    <li>Time limit for each explanation</li>
                    <li>Points awarded for successful communication</li>
                    <li>Multiple rounds with increasing difficulty</li>
                  </ul>
                </div>
              </EventCard>

              <EventCard
                title="Tech Pictionary"
                description="Draw and guess technical concepts in this visual challenge."
                icon={<PaintBrush className="h-8 w-8 text-primary" />}
                formUrl="https://forms.google.com/techpictionary"
                onRegister={handleRegister}
              >
                <div className="space-y-4">
                  <h4 className="font-pixel text-sm text-secondary">Rules:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Teams of 3-4 members</li>
                    <li>Draw technical concepts for teammates to guess</li>
                    <li>No words or symbols allowed in drawings</li>
                    <li>Time limit for each round</li>
                    <li>Points based on speed and accuracy</li>
                  </ul>
                </div>
              </EventCard>

              <EventCard
                title="Tech Time's Up"
                description="Describe technical terms against the clock in this fast-paced word game."
                icon={<Clock className="h-8 w-8 text-primary" />}
                formUrl="https://forms.google.com/techtimesup"
                onRegister={handleRegister}
              >
                <div className="space-y-4">
                  <h4 className="font-pixel text-sm text-secondary">Rules:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Teams of 3 members</li>
                    <li>Three rounds: describe, one word, charades</li>
                    <li>30 seconds per term</li>
                    <li>Technical vocabulary from various domains</li>
                    <li>Points for each correctly guessed term</li>
                  </ul>
                </div>
              </EventCard>

              <EventCard
                title="Turbo Typing"
                description="Test your typing speed and accuracy in this keyboard challenge."
                icon={<Keyboard className="h-8 w-8 text-primary" />}
                formUrl="https://forms.google.com/turbotyping"
                onRegister={handleRegister}
              >
                <div className="space-y-4">
                  <h4 className="font-pixel text-sm text-secondary">Rules:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Individual participation</li>
                    <li>Multiple rounds with different text types</li>
                    <li>Code snippets, technical documentation, and prose</li>
                    <li>Scoring based on WPM and accuracy</li>
                    <li>Special characters and formatting count</li>
                  </ul>
                </div>
              </EventCard>

              <EventCard
                title="Puzzle Relay"
                description="Solve a series of technical puzzles in this team relay challenge."
                icon={<Puzzle className="h-8 w-8 text-primary" />}
                formUrl="https://forms.google.com/puzzlerelay"
                onRegister={handleRegister}
              >
                <div className="space-y-4">
                  <h4 className="font-pixel text-sm text-secondary">Rules:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Teams of 4 members</li>
                    <li>Relay format with different puzzle types</li>
                    <li>Logic, coding, hardware, and cryptography challenges</li>
                    <li>Each team member tackles specific puzzle types</li>
                    <li>Time-based scoring with penalties for hints</li>
                  </ul>
                </div>
              </EventCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

interface EventCardProps {
  title: string
  description: string
  icon: React.ReactNode
  formUrl: string
  children: React.ReactNode
  onRegister: (eventName: string, formUrl: string) => void
}

function EventCard({ title, description, icon, formUrl, children, onRegister }: EventCardProps) {
  return (
    <Card className="pixel-card overflow-hidden border-2 border-white bg-black/60 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="mr-4">{icon}</div>
          <CardTitle className="font-pixel text-base md:text-lg text-secondary">{title}</CardTitle>
        </div>
        <CardDescription className="text-sm mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full text-xs">
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent className="dialog-box sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-pixel text-lg text-secondary">{title}</DialogTitle>
              <DialogDescription className="text-sm mt-2">{description}</DialogDescription>
            </DialogHeader>
            <div className="mt-4">{children}</div>
            <div className="mt-6">
              <Button className="pixel-button w-full text-sm" onClick={() => onRegister(title, formUrl)}>
                Register Now
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter>
        <Button className="pixel-button w-full text-xs" onClick={() => onRegister(title, formUrl)}>
          Register
        </Button>
      </CardFooter>
    </Card>
  )
}
