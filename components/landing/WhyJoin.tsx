import { Users, Bell, Book, Check } from "lucide-react";

const reasons = [
  {
    icon: Users,
    text: "Stay connected anonymously",
  },
  {
    icon: Book,
    text: "Get real campus news & gossip",
  },
  {
    icon: Bell,
    text: "Express yourself without fear",
  },
  {
    icon: Check,
    text: "Protect your privacy but choose when to reveal",
  },
];

export default function WhyJoin() {
  return (
    <section className="py-16 vintage-texture bg-[#B6E2D3]">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <div className="inline-block mb-6">
          <div className="relative">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#5E548E] mb-2 relative z-10">
              Why Join Clg Confessions?
            </h2>
            <div className="absolute -bottom-2 left-0 right-0 h-4 bg-[#F9C5D5] -z-10 transform -rotate-1"></div>
          </div>
        </div>
        <p className="text-md md:text-lg text-[#5E548E] font-['VT323'] text-xl">
          Be part of your college story—anonymously, safely, and boldly.
        </p>
      </div>

      <ul className="flex flex-wrap justify-center gap-8 max-w-3xl mx-auto px-4">
        {reasons.map((r: any) => {
          const Icon = r.icon;
          return (
            <li
              key={r.text}
              className="vintage-sticker w-64 hover:scale-105 transition-transform"
            >
              <Icon size={36} className="text-[#5E548E]" />
              <span className="font-['VT323'] text-[#5E548E] text-xl">
                {r.text}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
