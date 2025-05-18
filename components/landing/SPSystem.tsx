import { Book, ImageIcon, Check, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const earnSP = [
  {
    icon: Book,
    label: "Confession post",
    value: "+5 SP",
  },
  {
    icon: Book,
    label: "News post (no image)",
    value: "+5 SP",
  },
  {
    icon: ImageIcon,
    label: "News post (with image)",
    value: "+10 SP",
  },
];

const spendSP = [
  {
    icon: Check,
    label: "Check if a confession is about you",
    value: "-10 SP",
  },
  {
    icon: User,
    label: "Reveal identity (if allowed)",
    value: "-299 SP / ₹29",
  },
];

export default function SPSystem() {
  return (
    <section className="py-16 vintage-texture bg-[#E8F1F2]">
      <div className="max-w-2xl mx-auto mb-8 text-center">
        <div className="inline-block mb-6">
          <div className="relative">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#5E548E] mb-2 relative z-10">
              SP (Social Points) System
            </h2>
            <div className="absolute -bottom-2 left-0 right-0 h-4 bg-[#F9C5D5] -z-10 transform -rotate-1"></div>
          </div>
        </div>
        <p className="text-md md:text-lg text-[#5E548E] font-['VT323'] text-xl">
          Earn and spend SP to interact, unlock features or find out more!
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-10 max-w-4xl mx-auto justify-center px-4">
        <div className="vintage-card-purple flex-1">
          <div className="vintage-header">
            <h3 className="font-['VT323'] text-xl font-bold mb-0 text-white">
              Earn SP by Posting
            </h3>
          </div>
          <div className="p-6">
            <ul className="space-y-3">
              {earnSP.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.label}
                    className="flex items-center gap-3 vintage-list-item"
                  >
                    <Icon size={24} className="text-[#7D5BA6]" />
                    <span className="flex-1 font-['VT323'] text-lg">
                      {item.label}
                    </span>
                    <Badge className="bg-[#B6E2D3] text-[#5E548E] font-['VT323'] text-lg border-2 border-[#5E548E]">
                      {item.value}
                    </Badge>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="vintage-card-pink flex-1">
          <div className="vintage-header">
            <h3 className="font-['VT323'] text-xl font-bold mb-0 text-white">
              Spend SP to Interact
            </h3>
          </div>
          <div className="p-6">
            <ul className="space-y-3">
              {spendSP.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-3 vintage-list-item"
                >
                  <item.icon size={24} className="text-[#DD6E92]" />
                  <span className="flex-1 font-['VT323'] text-lg">
                    {item.label}
                  </span>
                  <Badge className="bg-[#FAE8E0] text-[#DD6E92] font-['VT323'] text-lg border-2 border-[#5E548E]">
                    {item.value}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
