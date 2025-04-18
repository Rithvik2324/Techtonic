// app/dashboard/page.tsx (or pages/dashboard.js if not using App Router)
"use client"

import { useAuth } from "@/lib/use-auth"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) return <div className="text-white">Loading...</div>

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl md:text-3xl font-pixel mb-8 text-center neon-text">Dashboard</h1>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="pixel-card border-2 border-white bg-black/60">
            <CardHeader>
              <CardTitle className="font-pixel text-xl text-secondary">Welcome, {user.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Your ticket ID: <span className="font-pixel text-accent">{user.ticketId}</span>
              </p>
              <Link href="/profile">
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="pixel-card border-2 border-white bg-black/60">
            <CardHeader>
              <CardTitle className="font-pixel text-xl text-secondary">Registered Events</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">You haven't registered for any events yet.</p>
              <Link href="/events">
                <Button className="w-full">Browse Events</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card className="pixel-card border-2 border-white bg-black/60">
          <CardHeader>
            <CardTitle className="font-pixel text-xl text-secondary">Event Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b border-white/20 pb-4">
                <h3 className="font-pixel text-accent">April 30, 2025</h3>
                <p className="text-sm mt-2">9:00 AM - Registration Opens</p>
                <p className="text-sm">10:00 AM - Opening Ceremony</p>
                <p className="text-sm">11:00 AM - Events Begin</p>
              </div>

              <p className="text-sm text-muted-foreground">
                A detailed schedule will be provided closer to the event date. Make sure to check back for updates!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

  )
}
