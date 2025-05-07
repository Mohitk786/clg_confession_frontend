"use client";

import { useState } from "react";
import {
  Bell,
  Heart,
  MessageSquare,
  MoreHorizontal,
  PenSquare,
  ThumbsDown,
  Unlock,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfessionModal } from "@/components/confession-modal";
import Navbar from "@/components/Navbar";

const Icons = [
  Heart,
  MessageSquare,
  ThumbsDown,
]

export default function ConfessionsPage() {
  const [confessionModalOpen, setConfessionModalOpen] = useState(false);
  const icons = [
    "💋",
    "😍",
    "🔥",
    "😢",
    "😈",
    "🥺",
    "🖤",
    "💔",
    "😱",
    "😏",
  ];

  return (
    <div className="min-h-screen bg-[#f5f2e8] bg-[url('/paper-texture.png')] bg-repeat text-[#2a2a2a]">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="font-serif text-3xl text-[#2a2a2a] mb-8 text-center italic">
          Secret Confessions
        </h1>

        {/* Confession Cards */}
        <div className="space-y-6 mb-20">
          {/* Card 1 */}
          <Card className="border border-[#d4c8a8] bg-[#f9f7f1] shadow-md overflow-hidden">
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-sm text-[#8a7e55] italic mb-1">
                    From: A Secret Admirer
                  </p>
                  <div className="flex gap-2 mb-3">
                    <Badge className="bg-[#c9b27c] hover:bg-[#b39c64] text-[#2a2a2a]">
                      #Lust
                    </Badge>
                    <span className="text-xl">😈</span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Report</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <p className="font-['Caveat'] text-lg leading-relaxed mb-4">
                "You wore that green saree on Farewell day. I couldn't take my
                eyes off your waist. If you knew what I was thinking…"
              </p>

             

              <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#d4c8a8]">
              <div className="flex items-center gap-4">
                  {
                    Icons.map((Icon, index) => (
                      <button
                        key={index}
                        className="text-[#8a7e55] hover:text-[#2a2a2a] transition-colors flex items-center gap-1"
                      >
                        <Icon size={18} />
                        <span className="text-sm">214</span>
                      </button>
                    ))
                  }
                </div>
              </div>


              <div className="mt-4 flex flex-wrap gap-2">
                {icons.map((icon, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="rounded-full bg-transparent border-[#d4c8a8] hover:bg-[#f5f2e8]"
                  >
                    {icon}
                  </Button>
                ))}
               
              </div>
            </div>
          </Card>
        

          {/* Special Midnight Confession */}
          <Card className="border border-[#d4c8a8] bg-[#f9f7f1] shadow-md overflow-hidden relative">
            <div className="absolute top-0 right-0 bg-[#2a2a2a] text-[#f5f2e8] text-xs px-3 py-1 font-medium">
              Midnight Confession
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-sm text-[#8a7e55] italic mb-1">
                    From: Your Wingmate from Last Night
                  </p>
                  <div className="flex gap-2 mb-3">
                    <Badge className="bg-[#c9b27c] hover:bg-[#b39c64] text-[#2a2a2a]">
                      #LookingForHookup
                    </Badge>
                    <span className="text-xl">💋</span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Report</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="relative">
                <div className="absolute inset-0 backdrop-blur-md flex items-center justify-center">
                  <Button className="bg-[#c9b27c] hover:bg-[#b39c64] text-[#2a2a2a]">
                    <Unlock className="mr-2 h-4 w-4" /> Unlock Midnight
                    Confession (25 SP)
                  </Button>
                </div>
                <p className="font-['Caveat'] text-lg leading-relaxed mb-4 opacity-20">
                  "Those jeans are illegal. That walk in the corridor... you
                  know what you did. I've been thinking about you since that
                  party and I want to..."
                </p>
              </div>

              <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#d4c8a8]">
                <div className="flex items-center gap-4">
                  <button className="text-[#8a7e55] hover:text-[#2a2a2a] transition-colors flex items-center gap-1">
                    <Heart size={18} />
                    <span className="text-sm">324</span>
                  </button>
                  <button className="text-[#8a7e55] hover:text-[#2a2a2a] transition-colors flex items-center gap-1">
                    <ThumbsDown size={18} />
                    <span className="text-sm">18</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-[#8a7e55] hover:text-[#2a2a2a] transition-colors flex items-center gap-1">
                    <MessageSquare size={18} />
                    <span className="text-sm">47</span>
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Secret Confession of the Day */}
          <Card className="border-2 border-[#c9b27c] bg-[#f9f7f1] shadow-md overflow-hidden">
            <div className="bg-[#c9b27c] text-[#2a2a2a] py-2 px-4 font-serif text-center font-medium">
              Secret Confession of the Day
            </div>
            <div className="p-5">
              <div className="relative">
                <div className="absolute inset-0 backdrop-blur-md flex items-center justify-center">
                  <Button className="bg-[#c9b27c] hover:bg-[#b39c64] text-[#2a2a2a]">
                    <Unlock className="mr-2 h-4 w-4" /> Unlock Secret (15 SP)
                  </Button>
                </div>
                <p className="font-['Caveat'] text-lg leading-relaxed mb-4 opacity-20">
                  "If you think you're the most desirable guy on campus...
                  you're right. Sadly, I'm into jerks. And you're too nice. But
                  I can't stop thinking about..."
                </p>
              </div>

              <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#d4c8a8]">
                <div className="flex items-center gap-4">
                  <button className="text-[#8a7e55] hover:text-[#2a2a2a] transition-colors flex items-center gap-1">
                    <Heart size={18} />
                    <span className="text-sm">???</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-[#8a7e55] hover:text-[#2a2a2a] transition-colors flex items-center gap-1">
                    <MessageSquare size={18} />
                    <span className="text-sm">???</span>
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>

      {/* Weekly Theme Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#2a2a2a] text-[#f5f2e8] py-2 text-center font-serif z-40">
        <p>
          This week: "Flirty Friday" — Confess to your crush before midnight! 🔥
        </p>
      </div>

      {/* Floating Confession Button */}
      <div className="fixed bottom-20 right-6 z-50">
        <Button
          className="rounded-full w-14 h-14 bg-[#c9b27c] hover:bg-[#b39c64] text-[#2a2a2a] shadow-lg"
          onClick={() => setConfessionModalOpen(true)}
        >
          <PenSquare size={24} />
        </Button>
      </div>

      {/* Confession Modal */}
      <ConfessionModal
        open={confessionModalOpen}
        onOpenChange={setConfessionModalOpen}
      />
    </div>
  );
}
