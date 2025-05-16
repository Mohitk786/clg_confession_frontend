import { Button } from "@/components/ui/button";

const HeroSection = () => (
  <section
    className="relative flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-tr from-[#9b87f5] via-[#E5DEFF] to-[#FFDEE2] px-4 py-16 text-center"
  >
    <div className="animate-fade-in max-w-2xl mx-auto z-10">
      <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-[#1A2A40]">
        Welcome to Clg Confessions — <span className="text-[#7E69AB]">Your Anonymous Campus Voice</span>
      </h1>
      <p className="text-lg md:text-xl text-[#393856] mb-8">
        Join your college pool, share confessions, thoughts, and news — all anonymously.
      </p>
      <Button size="lg" className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold rounded shadow-lg">
        Sign Up Now
      </Button>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#fff] to-transparent pointer-events-none" />
  </section>
);

export default HeroSection;