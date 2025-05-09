"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { ChevronRight, Lock } from "lucide-react"
import { useSendOtp, useVerifyOtp } from "@/hooks/auth"
import { useRouter } from "next/navigation"

interface NotVerfiedFormProps {
  setVerified: React.Dispatch<React.SetStateAction<boolean>>
}


const NotVerfiedForm = ({setVerified}:NotVerfiedFormProps) => {
      const [mobileNumber, setMobileNumber] = useState("")
      const [otpSent, setOtpSent] = useState(false)
      const [otp, setOtp] = useState(["", "", "", "", "", ""])
      const [timer, setTimer] = useState(30)
      const [timerActive, setTimerActive] = useState(false)
      const router = useRouter()
      const { mutate: sendOtp, isPending: sendOtpLoading } = useSendOtp()
      const { mutate: verifyOtp, isPending: verifyOtpLoading } = useVerifyOtp()
    
  
   
    
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
    
      const handleSendOTP = () => {
        if (mobileNumber.length === 10) {
          const phone = "+91" + mobileNumber
          sendOtp(
            { phone },
            {
              onSuccess: () => {
                setOtpSent(true)
                setTimerActive(true)
              },
              onError: (error) => {
                console.error("Error sending OTP", error)
              },
            }
          )
        }
      }
    
      const handleOtpChange = (index: number, value: string) => {
        if (value.length <= 1 && /^[0-9]*$/.test(value)) {
          const newOtp = [...otp]
          newOtp[index] = value
          setOtp(newOtp)
    
          if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`)
            if (nextInput) nextInput.focus()
          }
    
          if (newOtp.every((digit) => digit !== "") && index === 5) {
            verifyOtp(
              { phone: "+91" + mobileNumber, otp: newOtp.join("") },
              {
                onSuccess: (data:any) => {
                    if(data?.redirect){
                        router.push(data.redirect)
                    }else{
                        setVerified(true)
                    }
                },
                onError: (error) => {
                  console.error("OTP verification failed", error)
                },
              }
            )
          }
        }
      }
    
      const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
          const prevInput = document.getElementById(`otp-${index - 1}`)
          if (prevInput) prevInput.focus()
        }
      }
    
      const handleResendOTP = () => {
        if (mobileNumber.length === 10) {
          handleSendOTP()
          setTimer(30)
          setTimerActive(true)
        }
      }

  return (
    <>
      <div
        className="space-y-6 sm:space-y-8"
      >
        <div className="text-center space-y-1 sm:space-y-2">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#D4AF37]">
            The Mystery Vault
          </h1>
          <p className="text-[#EAEAEA]/80 italic text-sm sm:text-base">
            Everything begins with a number. Want in?
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-1 sm:space-y-2">
            <label
              htmlFor="mobile"
              className="text-xs sm:text-sm text-[#EAEAEA]/70"
            >
              Enter your Mobile Number
            </label>
            <Input
              id="mobile"
              type="tel"
              maxLength={10}
              value={mobileNumber}
              onChange={(e) =>
                setMobileNumber(e.target.value.replace(/\D/g, ""))
              }
              className="bg-[#1A1A1A] border-[#333333] focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 text-[#EAEAEA] h-9 sm:h-10"
              placeholder="10-digit mobile number"
              disabled={otpSent}
            />
          </div>

          {otpSent && (
            <div
              className="space-y-3 sm:space-y-4"
            >
              <div className="space-y-1 sm:space-y-2">
                <label className="text-xs sm:text-sm text-[#EAEAEA]/70">
                  Enter OTP
                </label>
                <div className="flex justify-between gap-1 sm:gap-2">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="bg-[#1A1A1A] border-[#333333] focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 text-[#EAEAEA] text-center w-10 sm:w-14 h-10 sm:h-14 text-base sm:text-xl"
                      autoFocus={index === 0}
                    />
                  ))}
                </div>
                <p className="text-[10px] sm:text-xs text-[#EAEAEA]/50 text-center">
                  {timerActive ? (
                    <span>Resend OTP in {timer}s</span>
                  ) : (
                    <button
                      onClick={handleResendOTP}
                      className="text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors"
                    >
                      Resend OTP
                    </button>
                  )}
                </p>
              </div>
            </div>
          )}

          <Button
            onClick={!otpSent ? handleSendOTP : undefined}
            disabled={mobileNumber.length !== 10 || sendOtpLoading || otpSent}
            className="w-full bg-[#D4AF37] hover:bg-[#C09C2C] text-[#0B0B0B] font-medium h-9 sm:h-10 text-sm sm:text-base"
          >
            {sendOtpLoading
              ? "Sending..."
              : otpSent
              ? verifyOtpLoading
                ? "Verifying..."
                : "OTP Sent"
              : "Send OTP"}
            <ChevronRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>

        <div className="space-y-2 sm:space-y-3 pt-2 sm:pt-4">
          <p className="text-xs sm:text-sm text-[#EAEAEA]/70 text-center italic">
            "Someone from your college might have confessed about you."
          </p>
          <p className="text-xs sm:text-sm text-[#EAEAEA]/70 text-center italic">
            "You've been seen. Want to know by whom?"
          </p>
        </div>

        <div className="flex items-center justify-center text-[10px] sm:text-xs text-[#EAEAEA]/50 gap-1">
          <Lock size={10} className="sm:hidden" />
          <Lock size={12} className="hidden sm:block" />
          <span>Your number is secure with us</span>
        </div>
      </div>
    </>
  );
};

export default NotVerfiedForm;
