"use client"

import type { FC } from "react"

declare global {
  interface Window {
    Razorpay: any
  }
}

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { HeartCrack, PartyPopper, Coins } from "lucide-react"
import { axiosInstance } from "@/lib/axiosInstance"
import { useUser } from "@/hooks/auth"

interface Props {
  isOpen: boolean
  onClose: () => void
  isForYou: boolean
  message: string
  confessionId: string
  hasTargetUser: undefined | boolean
  isAnonymous: boolean
}

const ConfessionResultModal: FC<Props> = ({
  isOpen,
  onClose,
  isForYou,
  confessionId,
  hasTargetUser,
  message,
  isAnonymous,
}) => {
  const {
    data,
    isLoading,
  }: {
    data: any
    isLoading: boolean
  } = useUser()
  const user = data?.data

  const verifyPremiumUser = async (response: any) => {
    const res: any = await axiosInstance.post("/payment/verify", {
      ...response,
    })

    if (!res?.data?.success) {
      alert(res?.data?.message)
      return
    }
  }

  const revealIdenetityHandler = async () => {
    try {
      if (!confessionId) {
        throw new Error("Confession ID is not provided")
      }

      const order: any = await axiosInstance.post("/payment/create", {
        confessionId,
      })

      const options = {
        ...order?.data?.data,
        name: "Campus Whisper",
        description: "Just let you crush about you",
        theme: {
          color: "#F37254",
        },
        handler: verifyPremiumUser,
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err: any) {
      console.log("errr", err?.message)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/95 backdrop-blur-xl min-h-[300px] md:min-h-[350px] text-center border border-purple-200/50 rounded-2xl shadow-2xl flex flex-col justify-between py-8 w-[90%] max-w-md mx-auto">
        <DialogHeader className="flex flex-col items-center gap-4">
          {isForYou ? (
            <>
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <PartyPopper className="text-white w-10 h-10" />
              </div>
              <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Yay! 🎉
              </DialogTitle>
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <HeartCrack className="text-white w-10 h-10" />
              </div>
              <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Oops!
              </DialogTitle>
            </>
          )}
        </DialogHeader>

        <div className="px-6 py-4">
          <p className="text-lg text-gray-700 leading-relaxed">{message}</p>
        </div>

        {!isAnonymous ? (
          isForYou &&
          hasTargetUser && (
            <DialogFooter className="mt-6">
              <div className="flex flex-col items-center gap-4 w-full max-w-sm mx-auto px-4">
                <Button
                  onClick={revealIdenetityHandler}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-base py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Reveal Identity for ₹29
                </Button>

                {!isLoading && user?.sp !== undefined && user.sp >= 299 && (
                  <>
                    <div className="flex items-center w-full gap-2">
                      <hr className="flex-grow border-t border-purple-200" />
                      <span className="text-sm text-gray-500 font-medium bg-white px-3 py-1 rounded-full">OR</span>
                      <hr className="flex-grow border-t border-purple-200" />
                    </div>
                    <Button className="w-full text-sm text-gray-700 bg-gradient-to-r from-yellow-100 to-amber-100 hover:from-yellow-200 hover:to-amber-200 border border-yellow-300 py-3 rounded-xl transition-all duration-200">
                      <Coins className="inline-block mr-2 text-yellow-600" size={16} />
                      Use 299 SP
                    </Button>
                  </>
                )}
              </div>
            </DialogFooter>
          )
        ) : (
          <div className="px-6 py-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl mx-6">
            <p className="text-gray-600 text-sm">Poster does not allow to reveal the identity</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ConfessionResultModal
