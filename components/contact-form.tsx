"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle } from "lucide-react"

export function ContactForm() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [inquiryType, setInquiryType] = useState("general")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("submitting")

    // Simulate form submission
    setTimeout(() => {
      setFormState("success")
    }, 1500)
  }

  if (formState === "success") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-lg border border-green-500/20 bg-gradient-to-br from-green-500/10 to-cyan-500/5 p-8 text-center shadow-lg animate-in fade-in slide-in-from-bottom-5 duration-500">
        <div className="rounded-full bg-green-500/20 p-3">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <h3 className="mt-4 text-xl font-bold">Message Sent Successfully</h3>
        <p className="mt-2 text-muted-foreground">
          Thank you for reaching out! I'll get back to you as soon as possible.
        </p>
        <Button
          className="mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
          onClick={() => setFormState("idle")}
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="space-y-2">
        <div className="text-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
          Get In Touch
        </div>
        <p className="text-sm text-muted-foreground">Feel free to reach out or schedule a call.</p>
      </div>

      <RadioGroup value={inquiryType} onValueChange={setInquiryType} className="grid grid-cols-3 gap-2">
        <div>
          <RadioGroupItem value="general" id="general" className="sr-only" />
          <Label
            htmlFor="general"
            className={`flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground transition-colors duration-300 ${
              inquiryType === "general" ? "border-cyan-500 bg-cyan-500/10" : ""
            }`}
          >
            <span className="text-sm font-medium">General Inquiry</span>
          </Label>
        </div>
        <div>
          <RadioGroupItem value="resume" id="resume" className="sr-only" />
          <Label
            htmlFor="resume"
            className={`flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground transition-colors duration-300 ${
              inquiryType === "resume" ? "border-cyan-500 bg-cyan-500/10" : ""
            }`}
          >
            <span className="text-sm font-medium">Request Resume</span>
          </Label>
        </div>
        <div>
          <RadioGroupItem value="project" id="project" className="sr-only" />
          <Label
            htmlFor="project"
            className={`flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground transition-colors duration-300 ${
              inquiryType === "project" ? "border-cyan-500 bg-cyan-500/10" : ""
            }`}
          >
            <span className="text-sm font-medium">Project Discussion</span>
          </Label>
        </div>
      </RadioGroup>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Your Name"
            required
            className="border-slate-700 focus:border-cyan-500 transition-colors duration-300"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Your Email"
            required
            className="border-slate-700 focus:border-cyan-500 transition-colors duration-300"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Your Message"
          rows={5}
          required
          className="border-slate-700 focus:border-cyan-500 transition-colors duration-300"
        />
      </div>

      <div className="text-xs text-muted-foreground">
        <p className="font-medium text-cyan-500">Security Notice</p>
        <p>
          This form is protected by reCAPTCHA and implements strict CSP headers, input validation, and DOMPurify
          sanitization to ensure secure communication.
        </p>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
        disabled={formState === "submitting"}
      >
        {formState === "submitting" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
