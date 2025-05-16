import { Badge } from "@/components/ui/badge";
import { Book, Image, Check, User } from "lucide-react";

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
    icon: Image,
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

const SPSystem = () => (
  <section className="py-16 bg-white">
    <div className="max-w-2xl mx-auto mb-8 text-center">
      <h2 className="font-playfair text-3xl md:text-4xl text-[#1A2A40] mb-2">SP (Social Points) System</h2>
      <p className="text-md md:text-lg text-[#393856]">Earn and spend SP to interact, unlock features or find out more!</p>
    </div>
    <div className="flex flex-col md:flex-row gap-10 max-w-4xl mx-auto justify-center">
      <div className="bg-[#E5DEFF] rounded-xl shadow p-6 flex-1">
        <h3 className="font-bold text-lg mb-4 text-[#7E69AB]">Earn SP by Posting</h3>
        <ul className="space-y-3">
          {earnSP.map((item) => (
            <li key={item.label} className="flex items-center gap-3">
              <item.icon size={24} className="text-[#9b87f5]" />
              <span className="flex-1">{item.label}</span>
              <Badge variant="secondary">{item.value}</Badge>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-[#FFDEE2] rounded-xl shadow p-6 flex-1">
        <h3 className="font-bold text-lg mb-4 text-[#F97316]">Spend SP to Interact</h3>
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <Check size={24} className="text-[#F97316]" />
            <span className="flex-1">Check if a confession is about you</span>
            <Badge variant="destructive">-10 SP</Badge>
          </li>
          <li className="flex items-center gap-3">
            <Book size={24} className="text-[#F97316]" />
            <span className="flex-1">Reveal identity (if allowed)</span>
            <Badge variant="outline">-299 SP / ₹29</Badge>
          </li>
        </ul>
      </div>
    </div>
  </section>
);

export default SPSystem;
