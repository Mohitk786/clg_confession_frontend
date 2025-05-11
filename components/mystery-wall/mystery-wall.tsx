"use client";

import Image from "next/image";
import { ArrowRight, Heart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { PostImage } from "@/components/modals/PostImageModal";
// import BlurredImageGrid from "@/components/BlurredImageGrid";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function MysteryWall() {

  const [photoModalOpen, setPhotoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1f1c] to-[#0f2e29] text-[#e8d9b5]">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="font-serif text-2xl text-[#c9b27c] mb-6">
          Mystery Wall
        </h2>

        {/* Blurred Image Grid */}
        {/* <BlurredImageGrid /> */}

        {/* Trending Section */}
        <div className="mb-12">
          <h2 className="font-serif text-2xl text-[#c9b27c] mb-6 italic">
            Trending Now
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((id) => (
              <Card
                key={id}
                className="overflow-hidden border border-[#c9b27c]/30 bg-[#0c2420]"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=400&width=600&text=Trending+${id}`}
                    alt={`Trending ${id}`}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-[#c9b27c] text-[#0a1f1c] hover:bg-[#b39c64]">
                      Most Unblurred
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-serif text-lg text-[#e8d9b5]">
                      Campus Celebrity
                    </p>
                    <div className="flex items-center gap-1 text-[#c9b27c]">
                      <Heart size={16} fill="#c9b27c" />
                      <span className="text-sm">{120 + id * 45}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge
                      variant="outline"
                      className="text-[#c9b27c] border-[#c9b27c]/30"
                    >
                      #CrushConfession
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-[#c9b27c] border-[#c9b27c]/30"
                    >
                      #MostUnblurred
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Confessions */}
        <div className="mb-14">
          <h2 className="font-serif text-2xl text-[#c9b27c] mb-6">
            Featured Confessions
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {[
              "Who's the girl in Red? I can't stop thinking about her since the party last weekend...",
              "To the guy studying in the library every Tuesday night - I've noticed you and I'm too shy to say hi.",
              "I've been secretly dating someone from a rival college. My friends would kill me if they knew.",
            ].map((confession, index) => (
              <Card
                key={index}
                className="border border-[#c9b27c]/30 bg-[#0c2420] p-5"
              >
                <p className="font-serif text-[#e8d9b5] italic mb-3">
                  "{confession}"
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#c9b27c]/70">
                    Anonymous • {3 - index} hours ago
                  </p>
                  <div className="flex items-center gap-4">
                    <button className="text-[#c9b27c] hover:text-[#e8d9b5] transition-colors flex items-center gap-1">
                      <Heart size={18} />
                      <span className="text-sm">{42 - index * 7}</span>
                    </button>
                    <button className="text-[#c9b27c] hover:text-[#e8d9b5] transition-colors flex items-center gap-1">
                      <MessageSquare size={18} />
                      <span className="text-sm">{12 - index * 4}</span>
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <Link
            className="mt-2 group flex items-center justify-end text-sm"
            href={"/confessions"}
          >
            <span className="opacity-85  hover:opacity-95">view All</span>{" "}
            <ArrowRight className="h-4 w-6 group-hover:scale-120" />
          </Link>
        </div>
      </main>

      {/* Footer with Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setPhotoModalOpen(true)}
          className="rounded-full w-14 h-14 bg-gradient-to-br from-[#c9b27c] to-[#b39c64] hover:from-[#b39c64] hover:to-[#a38c54] text-[#0a1f1c] text-2xl shadow-lg"
        >
          +
        </Button>
      </div>
      <div className="fixed bottom-6 left-6 z-40">
        <Button className="rounded-full w-14 h-14 bg-gradient-to-br from-[#0c2420] to-[#0f2e29] hover:from-[#0f2e29] hover:to-[#0c2420] border border-[#c9b27c]/30 text-[#c9b27c] shadow-lg">
          <MessageSquare size={24} />
        </Button>
      </div>

      <PostImage open={photoModalOpen} onOpenChange={setPhotoModalOpen} />
    </div>
  );
}
