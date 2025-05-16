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

const WhyJoin = () => (
  <section className="py-16 bg-[#E5DEFF]">
    <div className="max-w-2xl mx-auto text-center mb-10">
      <h2 className="font-playfair text-3xl md:text-4xl text-[#1A2A40] mb-2">Why Join Clg Confessions?</h2>
      <p className="text-md md:text-lg text-[#393856]">Be part of your college story—anonymously, safely, and boldly.</p>
    </div>
    <ul className="flex flex-wrap justify-center gap-8 max-w-3xl mx-auto">
      {reasons.map((r) => (
        <li key={r.text} className="flex flex-col items-center gap-3 bg-white px-8 py-6 rounded-lg shadow w-64 hover:scale-105 transition-transform">
          <r.icon size={36} className="text-[#7E69AB]" />
          <span className="font-semibold text-[#1A2A40] text-lg">{r.text}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default WhyJoin;