import type { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end()

  const { email, name, qrCodeUrl } = req.body

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // or your provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your TECHTONIC’25 E-Ticket",
      html: `
        <h2>Hello ${name}!</h2>
      `,
    })

    res.status(200).json({ message: "Email sent successfully." })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to send email." })
  }
}
