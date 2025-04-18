// app/api/auth/register/route.ts
import { connectToDatabase } from "@/lib/mongodb"
import User from "@/models/User"
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  const data = await req.json()
  const { name, email, password, phoneNumber, rollNumber, collegeName } = data

  try {
    await connectToDatabase()

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 })
    }

    const ticketId = `TECH-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
    const newUser = new User({
      name,
      email,
      password, // hash this in production!
      phoneNumber,
      rollNumber,
      collegeName,
      ticketId,
    })

    await newUser.save()

    // Send ticket email
    const qrCodeUrl = `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(ticketId)}`
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: `"TechFest 2025" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🎫 Your TechFest 2025 Ticket",
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for registering! Here is your ticket ID: <strong>${ticketId}</strong></p>
      `,  }

    await transporter.sendMail(mailOptions)

    // Remove password before responding
    const userObj = newUser.toObject()
    delete userObj.password

    return NextResponse.json({ user: userObj }, { status: 201 })
  } catch (err) {
    console.error("Register Error:", err)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}
