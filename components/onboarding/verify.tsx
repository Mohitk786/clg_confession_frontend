"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { verifyToken } from "@/services/auth";

export default function VerifyPageContent() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  useEffect(() => {
    const verifyEmail = async (token: string) => {
      try {
        const data = await verifyToken(token);
        if (data.success) {
          setStatus("success");
          setMessage("💖 Welcome to your campus family! Redirecting you...");
          router.push(`/login`);
        } else {
          setStatus("error");
          setMessage(data.message || "Verification failed. Please try again.");
        }
      } catch {
        setStatus("error");
        setMessage("Something went wrong. Please try again later.");
      }
    };

    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link. Please check your email and try again.");
      return;
    }

    verifyEmail(token);
  }, [token, router]);

  const getStatusIcon = () => {
    switch (status) {
      case "loading":
        return <div className="w-16 h-16 border-4 border-[#DD6E92] border-t-transparent rounded-full animate-spin"></div>;
      case "success":
        return (
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case "error":
        return (
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
    }
  };

  const getStatusTitle = () => {
    switch (status) {
      case "loading":
        return "Verifying Your Email...";
      case "success":
        return "Email Verified!";
      case "error":
        return "Verification Failed";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#F9E8E8] to-[#F0E8FF] flex items-center justify-center p-4">
      <div className="relative max-w-md w-full">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-32 h-32 bg-[#F9C5D5] rounded-full blur-xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#B6E2D3] rounded-full blur-xl"></div>
        </div>

        {/* Main card */}
        <div className="relative bg-white/80 backdrop-blur-sm border border-[#D8A7B1]/30 rounded-2xl p-8 shadow-xl">
          <div className="text-center space-y-6">
            <div className="flex justify-center">{getStatusIcon()}</div>
            <h1 className="text-2xl font-bold text-[#5E548E]">{getStatusTitle()}</h1>
            <p className="text-[#7D5BA6] leading-relaxed">{message}</p>

            {status === "error" && (
              <div className="space-y-3 pt-4">
                <button
                  onClick={() => alert("A new verification email has been sent to your inbox.")}
                  className="block w-full bg-[#DD6E92] text-white py-3 px-6 rounded-xl font-medium hover:bg-[#BE4A73] transition-colors duration-200"
                >
                  Resend Verification Email
                </button>
                <Link
                  href="/register"
                  className="block w-full border border-[#D8A7B1] text-[#5E548E] py-3 px-6 rounded-xl font-medium hover:border-[#DD6E92] hover:text-[#DD6E92] transition-colors duration-200"
                >
                  Back to Registration
                </Link>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-[#D8A7B1]/20 text-center">
            <p className="text-xs text-[#7D5BA6] italic">Having trouble? Contact our support team for assistance.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
