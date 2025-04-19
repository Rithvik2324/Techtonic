"use client"

import type React from "react"
import { createContext, useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import type { User } from "@/lib/types"

type AuthContextType = {
  user: User | null
  login: () => void
  logout: () => void
  openAuthModal: () => void
  isLoading: boolean
  register: (userData: Omit<User, "id" | "ticketId">) => Promise<void>
  loginWithCredentials: (email: string, rollNumber: string) => Promise<User>
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  openAuthModal: () => {},
  isLoading: false,
  register: async () => {},
  loginWithCredentials: async () => {
    throw new Error("loginWithCredentials not implemented")
  },
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    rollNumber: "",
    collegeName: "", // This will hold the selected college name
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("techtonic_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("techtonic_user")
      }
    }
  }, [])

  const openAuthModal = () => {
    setIsAuthModalOpen(true)
  }

  const login = () => {
    setIsRegistering(false)
    openAuthModal()
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("techtonic_user")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/")
  }

  const register = async (userData: Omit<User, "id" | "ticketId">) => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message || "Registration failed")

      const newUser = data.user
      setUser(newUser)
      localStorage.setItem("techtonic_user", JSON.stringify(newUser))

      await fetch("/api/send-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newUser.email,
          name: newUser.name,
          ticketId: newUser.ticketId,
        }),
      })

      toast({
        title: "Registration successful",
        description: `Welcome, ${newUser.name}! Your e-ticket has been sent to your email.`,
      })
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Registration failed",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithCredentials = async (email: string, rollNumber: string): Promise<User> => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, rollNumber }),
      })

      if (!res.ok) {
        const { message } = await res.json()
        throw new Error(message || "Login failed")
      }

      const data = await res.json()
      const loggedInUser: User = data.user
      setUser(loggedInUser)
      localStorage.setItem("techtonic_user", JSON.stringify(loggedInUser))

      toast({
        title: "Login successful",
        description: `Welcome back, ${loggedInUser.name}!`,
      })

      return loggedInUser
    } catch (error) {
      console.error("Login error:", error)

      toast({
        title: "Login failed",
        description:
          error instanceof Error
            ? error.message || "Invalid email or Roll No. Please try again."
            : "An unknown error occurred.",
        variant: "destructive",
      })

      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isRegistering) {
      if (
        !formData.name ||
        !formData.email ||
        !formData.phoneNumber ||
        !formData.rollNumber ||
        !formData.collegeName
      ) {
        toast({
          title: "Error",
          description: "Please fill in all fields.",
          variant: "destructive",
        })
        return
      }

      try {
        await register({
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          rollNumber: formData.rollNumber,
          collegeName: formData.collegeName,
        })

        setIsAuthModalOpen(false)
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          rollNumber: "",
          collegeName: "",
        })
      } catch (error) {
        console.error("Registration error:", error)
      }
    } else {
      if (!formData.email || !formData.rollNumber) {
        toast({
          title: "Error",
          description: "Please enter both email and Roll Number.",
          variant: "destructive",
        })
        return
      }

      try {
        await loginWithCredentials(formData.email, formData.rollNumber)
        setIsAuthModalOpen(false)
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          rollNumber: "",
          collegeName: "",
        })
      } catch (error) {
        console.error("Login error:", error)
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        openAuthModal,
        isLoading,
        register,
        loginWithCredentials,
      }}
    >
      {children}

      <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
        <DialogContent className="dialog-box sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-pixel text-lg text-secondary">
              {isRegistering ? "Register for TECHTONIC'25" : "Login to TECHTONIC'25"}
            </DialogTitle>
            <DialogDescription>
              {isRegistering
                ? "Create an account to register for events and get your e-ticket."
                : "Login to access event registrations and your e-ticket."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {isRegistering && (
              <div className="space-y-2">
                <Label htmlFor="name" className="font-pixel text-xs">
                  Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-black border-white"
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="font-pixel text-xs">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-black border-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rollNumber" className="font-pixel text-xs">
                Roll Number
              </Label>
              <Input
                id="rollNumber"
                value={formData.rollNumber}
                onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                className="bg-black border-white"
                required
              />
            </div>

            {isRegistering && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="font-pixel text-xs">
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="bg-black border-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="collegeName" className="font-pixel text-xs">
                    College Name
                  </Label>
                  <select
                    id="collegeName"
                    value={formData.collegeName}
                    onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                    className="bg-black text-white border-white px-4 py-2 rounded"
                    required
                  >
                    <option value="">Select College</option>
                    <option value="KMIT">KMIT</option>
                    <option value="KMEC">KMEC</option>
                    <option value="NGIT">NGIT</option>
                    <option value="KMCE">KMCE</option>
                  </select>
                </div>
              </>
            )}

            <div className="flex flex-col gap-4 pt-4">
              <Button type="submit" className="pixel-button w-full" disabled={isLoading}>
                {isLoading ? "Processing..." : isRegistering ? "Register" : "Login"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="text-xs"
                onClick={() => setIsRegistering(!isRegistering)}
                disabled={isLoading}
              >
                {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AuthContext.Provider>
  )
}
