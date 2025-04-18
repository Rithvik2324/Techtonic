"use client"

import type React from "react"

import { useState } from "react"
import { useCart } from "@/lib/cart-provider"
import { useAuth } from "@/lib/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { generateBillingId } from "@/lib/utils"

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const { user, openAuthModal } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const [paymentStep, setPaymentStep] = useState<"details" | "payment" | "confirmation">("details")
  const [billingInfo, setBillingInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    address: "",
  })
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [billingId, setBillingId] = useState("")

  if (!user) {
    router.push("/cart")
    return null
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBillingInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentScreenshot(e.target.files[0])
    }
  }

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!billingInfo.name || !billingInfo.email || !billingInfo.phoneNumber || !billingInfo.address) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setPaymentStep("payment")
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    if (!paymentScreenshot) {
      toast({
        title: "Payment proof required",
        description: "Please upload a screenshot of your payment",
        variant: "destructive",
      })
      return
    }
  
    setIsSubmitting(true)
  
    try {
      const newBillingId = generateBillingId()
      setBillingId(newBillingId)
  
      const formData = new FormData()
      formData.append("name", billingInfo.name)
      formData.append("email", billingInfo.email)
      formData.append("phoneNumber", billingInfo.phoneNumber)
      formData.append("address", billingInfo.address)
      formData.append("billingId", newBillingId)
      formData.append("items", JSON.stringify(items))
      formData.append("totalPrice", totalPrice.toString())
      formData.append("paymentScreenshot", paymentScreenshot)
      console.log("Screenshot file appended:", paymentScreenshot);

  
      const res = await fetch("/api/checkout", {
        method: "POST",
        body: formData,
      })
  
      if (!res.ok) {
        throw new Error("Failed to complete checkout")
      }
  
      setPaymentStep("confirmation")
      clearCart()
  
      toast({
        title: "Order placed successfully",
        description: `Your billing ID is ${newBillingId}. A confirmation email has been sent.`,
      })
    } catch (error) {
      console.error("Checkout error:", error)
      toast({
        title: "Checkout failed",
        description: "An error occurred during checkout. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }  


  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-pixel mb-8 text-center neon-text">CHECKOUT</h1>

      <div className="max-w-3xl mx-auto">
        {paymentStep === "details" && (
          <Card className="pixel-card border-2 border-white bg-black/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-pixel text-lg text-secondary">Billing Details</CardTitle>
              <CardDescription>Please provide your billing information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDetailsSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={billingInfo.name}
                    onChange={handleInputChange}
                    className="bg-black border-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={billingInfo.email}
                    onChange={handleInputChange}
                    className="bg-black border-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={billingInfo.phoneNumber}
                    onChange={handleInputChange}
                    className="bg-black border-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={billingInfo.address}
                    onChange={handleInputChange}
                    className="bg-black border-white min-h-[100px]"
                    required
                  />
                </div>

                <div className="pt-4">
                  <Button type="submit" className="pixel-button w-full">
                    Continue to Payment
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {paymentStep === "payment" && (
          <Card className="pixel-card border-2 border-white bg-black/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-pixel text-lg text-secondary">Payment</CardTitle>
              <CardDescription>Complete your payment using UPI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-black/40 p-4 rounded-lg">
                  <h3 className="font-pixel text-sm mb-4 text-secondary">Order Summary</h3>

                  <div className="space-y-2 mb-4">
                    {items.map((item) => (
                      <div key={item.event.id} className="flex justify-between text-sm">
                        <span>
                          {item.event.title} x {item.quantity}
                        </span>
                        <span>₹{item.event.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/20 pt-2 flex justify-between font-pixel">
                    <span>Total</span>
                    <span className="text-accent">₹{totalPrice}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-pixel text-sm text-secondary">UPI Payment Instructions</h3>

                  <div className="bg-black/40 p-4 rounded-lg space-y-4">
                    <div className="flex justify-center">
                      <div className="bg-white p-4 rounded-lg">
                        <Image
                          src="/placeholder.svg?height=200&width=200&text=UPI+QR+Code"
                          alt="UPI QR Code"
                          width={200}
                          height={200}
                        />
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-sm mb-2">Scan the QR code or use the UPI ID below:</p>
                      <p className="font-pixel text-accent">techtonic25@upi</p>
                    </div>

                    <ol className="list-decimal list-inside text-sm space-y-2">
                      <li>Open your UPI app (Google Pay, PhonePe, Paytm, etc.)</li>
                      <li>Scan the QR code or enter the UPI ID</li>
                      <li>Enter the exact amount: ₹{totalPrice}</li>
                      <li>Complete the payment</li>
                      <li>Take a screenshot of the payment confirmation</li>
                    </ol>
                  </div>

                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="paymentScreenshot">Upload Payment Screenshot</Label>
                      <Input
                        id="paymentScreenshot"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="bg-black border-white"
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Please upload a screenshot of your payment confirmation
                      </p>
                    </div>

                    <div className="pt-4 flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setPaymentStep("details")}
                        disabled={isSubmitting}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="pixel-button flex-1"
                        disabled={isSubmitting || !paymentScreenshot}
                      >
                        {isSubmitting ? "Processing..." : "Confirm Payment"}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {paymentStep === "confirmation" && (
          <Card className="pixel-card border-2 border-white bg-black/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-pixel text-lg text-secondary">Order Confirmed!</CardTitle>
              <CardDescription>Your order has been successfully placed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-black/40 p-6 rounded-lg text-center">
                <h3 className="font-pixel text-xl mb-2 text-accent">Thank You!</h3>
                <p className="mb-4">Your order has been confirmed and is being processed.</p>

                <div className="mb-6">
                  <h4 className="font-pixel text-sm mb-2">Your Billing ID</h4>
                  <div className="font-pixel text-2xl text-secondary">{billingId}</div>
                </div>

                <p className="text-sm">
                  A confirmation email has been sent to <span className="font-pixel">{billingInfo.email}</span> with all
                  the details.
                </p>
              </div>

              <div className="text-center">
                <Button className="pixel-button" onClick={() => router.push("/events")}>
                  Continue Shopping
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
