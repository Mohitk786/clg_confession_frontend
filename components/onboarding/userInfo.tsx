"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

function UserInfoForm() {
  const [formData, setFormData] = useState({
    name: "",
    college: "",
    gender: "",
    hookupInterest: false,
  })

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const colleges = [
    "Ivy League University",
    "Stanford University",
    "MIT",
    "Harvard University",
    "Princeton University",
    "Yale University",
    "Columbia University",
  ]


  const createProfileHandler = () => {
    localStorage.setItem("token", JSON.stringify(formData))
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="space-y-6 sm:space-y-8 backdrop-blur-sm bg-[#0B0B0B]/70 p-4 sm:p-6 rounded-xl border border-[#333333]"
    >
      <div className="text-center space-y-1 sm:space-y-2">
        <h1 className="font-serif text-2xl sm:text-3xl text-[#D4AF37]">Complete Your Profile</h1>
        <p className="text-[#EAEAEA]/80 italic text-xs sm:text-sm">Your identity will unlock attention.</p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Name */}
        <div className="space-y-1 sm:space-y-2">
          <label htmlFor="name" className="text-xs sm:text-sm text-[#EAEAEA]/70">Your Name</label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="bg-[#1A1A1A] border-[#333333] focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 text-[#EAEAEA] h-9 sm:h-10 text-sm"
            placeholder="How should we call you?"
          />
        </div>

        {/* College */}
        <div className="space-y-1 sm:space-y-2">
          <label htmlFor="college" className="text-xs sm:text-sm text-[#EAEAEA]/70">Select Your College</label>
          <select
            id="college"
            value={formData.college}
            onChange={(e) => handleChange("college", e.target.value)}
            className="w-full bg-[#1A1A1A] border-[#333333] focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 text-[#EAEAEA] rounded-md px-2 sm:px-3 py-1.5 sm:py-2 text-sm h-9 sm:h-10"
          >
            <option value="" disabled>Select your college</option>
            {colleges.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <p className="text-[10px] sm:text-xs text-[#EAEAEA]/50 italic">Your college is locked forever. Your stories stay in your college.</p>
        </div>

        {/* Gender */}
        <div className="space-y-1 sm:space-y-2">
          <label className="text-xs sm:text-sm text-[#EAEAEA]/70">Select Gender</label>
          <div className="grid grid-cols-3 gap-1 sm:gap-2">
            {["Male", "Female", "Other"].map((g) => (
              <button
                key={g}
                onClick={() => handleChange("gender", g)}
                className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-md border text-xs sm:text-sm ${
                  formData.gender === g
                    ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                    : "border-[#333333] bg-[#1A1A1A] text-[#EAEAEA]/70 hover:border-[#D4AF37]/50"
                } transition-colors`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Hookup Interest */}
        <div className="space-y-1 sm:space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="hookup" className="text-xs sm:text-sm text-[#EAEAEA]/70">Interested in Hookups</label>
            <button
              onClick={() => handleChange("hookupInterest", !formData.hookupInterest)}
              className={`w-10 sm:w-12 h-5 sm:h-6 rounded-full transition-colors relative ${
                formData.hookupInterest ? "bg-gradient-to-r from-pink-500 to-green-400" : "bg-[#333333]"
              }`}
            >
              <span
                className={`absolute top-1 w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-white transition-transform ${
                  formData.hookupInterest ? "left-6 sm:left-7" : "left-1"
                }`}
              ></span>
            </button>
          </div>
          <p className="text-[10px] sm:text-xs text-[#EAEAEA]/50 italic">Only for thrill-seekers. Not visible to anyone. Except fate.</p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2 sm:pt-4">
        <Button onClick={createProfileHandler} className="w-full bg-[#D4AF37] hover:bg-[#C09C2C] text-[#0B0B0B] font-medium h-9 sm:h-10 text-sm sm:text-base">
          Complete Setup <ChevronRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>

      <div className="space-y-2 sm:space-y-3 pt-1 sm:pt-2">
        <p className="text-xs sm:text-sm text-[#EAEAEA]/70 text-center italic">
          "Verified members get to see more than others."
        </p>
        <p className="text-xs sm:text-sm text-[#EAEAEA]/70 text-center italic">
          "Some uploads are only visible after joining."
        </p>
      </div>
    </motion.div>
  )
}

export default UserInfoForm
