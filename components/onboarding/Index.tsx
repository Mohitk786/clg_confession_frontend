"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import UserInfoForm from "./userInfo"
import NotVerfiedForm from "./NotVerfiedForm"

function OnboardingPage() {
  const [timer, setTimer] = useState(30)
  const [timerActive, setTimerActive] = useState(false)
  const [verified, setVerified] = useState(false)
  const [currentBackground, setCurrentBackground] = useState(0)


  const backgrounds = [
    "/placeholder.svg?height=800&width=600&text=Party+Scene+1",
    "/placeholder.svg?height=800&width=600&text=Party+Scene+2",
    "/placeholder.svg?height=800&width=600&text=Party+Scene+3",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgrounds.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    } else if (timer === 0) {
      setTimerActive(false)
      setTimer(30)
    }
    return () => clearInterval(interval)
  }, [timerActive, timer])
 

 

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#EAEAEA] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {backgrounds.map((bg, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentBackground ? "opacity-30" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] to-transparent z-10"></div>
            <img src={bg || "/placeholder.svg"} alt="Background" className="w-full h-full object-cover blur-sm" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-4 sm:px-6 py-8 sm:py-12">
        {!verified ? (
          <NotVerfiedForm setVerified={setVerified} />
        ) : (
          <div>
            <UserInfoForm />
          </div>
        )}
      </div>
    </div>
  )
}

export default OnboardingPage
