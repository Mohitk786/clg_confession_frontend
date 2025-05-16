
import { Button } from "@/components/ui/button";

const FinalCTA = () => (
  <section className="py-16 bg-gradient-to-b from-[#9b87f5]/20 to-white">
    <div className="max-w-xl mx-auto text-center">
      <h2 className="font-playfair text-3xl md:text-4xl text-[#1A2A40] mb-2">Ready to Join the Confession Craze?</h2>
      <p className="text-md md:text-lg text-[#393856] mb-8">
        Sign up and be a part of your college’s most open, honest, and fun community — 100% anonymously!
      </p>
      <Button size="lg" className="bg-[#F97316] hover:bg-[#1EAEDB] text-white font-bold shadow-xl transition-all duration-200">
        Get Started
      </Button>
    </div>
  </section>
);

export default FinalCTA;