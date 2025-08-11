import { Suspense } from "react";
import VerifyPageContent from "@/components/onboarding/verify";

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF8F0] via-[#F9E8E8] to-[#F0E8FF]">
          <div className="w-16 h-16 border-4 border-[#DD6E92] border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <VerifyPageContent />
    </Suspense>
  );
}
