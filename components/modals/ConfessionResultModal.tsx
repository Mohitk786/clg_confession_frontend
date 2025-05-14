"use client";

import { FC } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, HeartCrack, PartyPopper, Currency } from "lucide-react";
import { axiosInstance } from "@/lib/axiosInstance";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isForYou: boolean;
  message: string;
  confessionId: string;
}

const ConfessionResultModal: FC<Props> = ({
  isOpen,
  onClose,
  isForYou,
  confessionId,

  message,
}) => {

    const verifyPremiumUser = async (response:any) => {


      const res = await axiosInstance.post("/payment/verify", {
        ...response
      });
      
    };

  const revealIdenetityHandler = async () => {
    try {
      if (!confessionId) {
        throw new Error("Confession ID is not provided");
      }

      const order:any = await axiosInstance.post("/payment/create", {
        confessionId,
      });


      const options = {
        ...order?.data?.data,
        name: "Campus Whisper",
        description: "Just let you crush about you",
        theme: {
          color: "#F37254",
        },
        handler: verifyPremiumUser
      }
      console.log("options",options)

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err:any) {
      console.log("errr", err?.message)
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" bg-[#fdfaf2] min-h-[300px] md:min-h-[350px] text-center border-[#c9b27c] rounded-2xl shadow-xl flex flex-col justify-between py-6  w-[90%] max-w-md mx-auto my-8">
        <DialogHeader className="flex flex-col items-center gap-2">
          {isForYou ? (
            <>
              <PartyPopper className="text-green-600 w-10 h-10" />
              <DialogTitle className="text-2xl font-bold text-green-700">
                Yay! 🎉
              </DialogTitle>
            </>
          ) : (
            <>
              <HeartCrack className="text-red-500 w-10 h-10" />
              <DialogTitle className="text-2xl font-bold text-red-700">
                Oops!
              </DialogTitle>
            </>
          )}
        </DialogHeader>

        <div className="px-6">
          <p className="text-md text-gray-700">{message}</p>
        </div>

        {isForYou && (
          <DialogFooter className="mt-4">
            <Button
              onClick={revealIdenetityHandler}
              className="bg-[#c9b27c] hover:bg-[#b39c64] text-[#2a2a2a] font-semibold mx-auto"
            >
              Reveal Identity for ₹29
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ConfessionResultModal;
