"use client"

import { useState } from "react"
import { useAuth } from "@/lib/use-auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"

export default function UserMenu() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  if (!user) return null

  return (
    <div className="relative inline-block text-left z-50 font-pixel">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center px-3 py-2 border border-white text-white hover:bg-white hover:text-black rounded-md text-xs"
      >
        <User className="mr-2 h-4 w-4" />
        {user.name || "Account"}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-black border border-white rounded-md shadow-lg text-sm">
          <div className="block px-4 py-2">My Account</div>

          <Link
            href="/dashboard"
            className="block px-4 py-2 text-white hover:bg-red-700"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>

          <Link href="/profile">
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
              </Link>

          <button
            onClick={() => {
              logout()
              setOpen(false)
            }}
            className="w-full text-left px-4 py-2 hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      )}

      {/* Retro-styled Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4">
          <div className="relative bg-black border border-white rounded-lg shadow-lg p-10 text-white max-w-2xl w-full grid gap-6 font-pixel">


            {/* Close Button */}
            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-2 right-3 text-red-500 text-xl hover:text-red-300"
            >
              ×
            </button>

            {/* Header */}
            <h2 className="text-3xl text-center text-purple-300 mb-2">Your Profile</h2>

            <hr className="border-purple-700" />

            {/* User Info */}
            <div className="space-y-1">
              <p><span className="text-green-400">Name:</span> {user.name}</p>
              <p><span className="text-green-400">Email:</span> {user.email}</p>
              <p><span className="text-green-400">Roll Number:</span> {user.rollNumber || "N/A"}</p>
              <p><span className="text-green-400">College:</span> {user.collegeName || "N/A"}</p>
            </div>

            {/* Ticket Section */}
            <div className="mt-4 p-4 border-2 border-red-600 bg-[#1a1a1a] rounded-md">
              <p className="text-red-500 font-bold text-lg">TECH-TICKET</p>
              <p className="text-orange-400 text-xl font-mono tracking-widest mt-1">
                {user.ticketId || "TECH-LNE8G1QW"}
              </p>
              <p className="text-sm mt-2 text-gray-300">
                Present this ticket ID at the registration desk on event day
              </p>
            </div>

            {/* Footer Bar */}
            <div className="w-full h-2 bg-green-500 mt-4 rounded-sm shadow-[0_0_5px_#0f0]" />
          </div>
        </div>
      )}
    </div>
  )
}
