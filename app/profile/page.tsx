"use client"

import { useAuth } from "@/lib/use-auth"

export default function ProfilePage() {
  const { user } = useAuth()

  if (!user) return <div className="text-white">Loading...</div>

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center px-4 font-pixel">
      <div className="bg-black border border-white rounded-lg p-10 max-w-2xl w-full grid gap-6">
        <h2 className="text-3xl text-center text-purple-300 mb-2">Your Profile</h2>
        <hr className="border-purple-700" />
        <div className="space-y-1">
          <p><span className="text-green-400">Name:</span> {user.name}</p>
          <p><span className="text-green-400">Email:</span> {user.email}</p>
          <p><span className="text-green-400">Roll Number:</span> {user.rollNumber || "N/A"}</p>
          <p><span className="text-green-400">College:</span> {user.collegeName || "N/A"}</p>
        </div>
        <div className="mt-4 p-4 border-2 border-red-600 bg-[#1a1a1a] rounded-md">
          <p className="text-red-500 font-bold text-lg">TECH-TICKET</p>
          <p className="text-orange-400 text-xl font-mono tracking-widest mt-1">
            {user.ticketId || "TECH-LNE8G1QW"}
          </p>
          <p className="text-sm mt-2 text-gray-300">
            Present this ticket ID at the registration desk on event day
          </p>
        </div>
        <div className="w-full h-2 bg-green-500 mt-4 rounded-sm shadow-[0_0_5px_#0f0]" />
      </div>
    </div>
  )
}
