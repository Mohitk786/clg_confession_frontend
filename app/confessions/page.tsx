"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { PostCard } from "@/components/PostFeed/PostCard";
import { ConfessionModal } from "@/components/modals/confession-modal";
import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";

export default function ConfessionsPage() {
  const [confessionModalOpen, setConfessionModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f2e8] bg-[url('/paper-texture.png')] bg-repeat text-[#2a2a2a]">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="font-serif text-3xl text-[#2a2a2a] mb-8 text-center italic">
          Secret Confessions
        </h1>

        <div className="space-y-6 mb-20">
          <PostCard
            type="confession"
            from="Anonymous"
            tags={["secret", "love"]}
            icon="💌"
            content="I still miss you..."
            isMidnight={false}
            unlockText="Locked Confession"
          />

          <PostCard
            type="confession"
            from="Your Wingmate from Last Night"
            tags={["LookingForHookup"]}
            icon="💋"
            content={`"Those jeans are illegal. That walk in the corridor... you know what you did. I've been thinking about you since that party and I want to..."`}
            isMidnight={true}
            unlockText="Midnight Confession"
          />
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-[#2a2a2a] text-[#f5f2e8] py-2 text-center font-serif z-40">
        This week: "Flirty Friday" — Confess to your crush before midnight! 🔥
      </div>

      <div className="fixed bottom-20 right-6 z-50">
        <Button
          className="rounded-full w-14 h-14 bg-[#c9b27c] hover:bg-[#b39c64] text-[#2a2a2a] shadow-lg"
          onClick={() => setConfessionModalOpen(true)}
        >
          <PenSquare size={24} />
        </Button>
      </div>

      <ConfessionModal
        open={confessionModalOpen}
        onOpenChange={setConfessionModalOpen}
      />
    </div>
  );
}
