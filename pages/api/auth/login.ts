import { connectToDatabase } from "@/lib/mongodb"
import User from "@/models/User"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const { email, rollNumber } = req.body

  try {
    await connectToDatabase()

    // Check if email exists first
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: "Email not found" })
    }

    // If the email exists, check if rollNumber matches
    if (user.rollNumber !== rollNumber) {
      return res.status(401).json({ message: "Incorrect roll number" })
    }

    // If both email and rollNumber match, return the user
    res.status(200).json({ user })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Server error" })
  }
}
