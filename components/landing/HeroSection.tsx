import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] px-4 py-16 text-center overflow-hidden bg-[#E8F1F2] vintage-texture">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-[#F9C5D5]"></div>
        <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-[#B6E2D3]"></div>
        <div className="absolute bottom-10 left-20 w-36 h-36 rounded-full bg-[#FAE8E0]"></div>
      </div>
      {/* Vintage border */}
      <div className="absolute inset-4 border-4 border-dashed border-[#D8A7B1] rounded-lg pointer-events-none"></div>
      <div className="relative z-10 max-w-2xl mx-auto vintage-animation">
        <div className="mb-6">
          <Image
            src="/placeholder.svg?height=80&width=80"
            width={80}
            height={80}
            alt="Vintage stamp"
            className="mx-auto"
          />
        </div>

        <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-4 text-[#7D5BA6] vintage-text-shadow">
          <span className="font-['Sacramento'] text-5xl md:text-6xl block mb-2">
            College Confessions
          </span>
          <span className="text-[#DD6E92] text-2xl md:text-3xl">
            Your Anonymous Campus Voice
          </span>
        </h1>

        <div className="vintage-paper p-6 mb-8 mx-auto max-w-xl">
          <p className="text-lg md:text-xl text-[#5E548E] font-['VT323'] leading-relaxed">
            Join your college pool, share confessions, thoughts, and news — all
            anonymously. Like passing notes in class, but way cooler!
          </p>
        </div>

        <Link
          href="/login"
          className="bg-[#DD6E92] hover:bg-[#BE4A73] text-white font-['VT323'] text-xl px-8 py-6 rounded-xl shadow-[4px_4px_0px_#5E548E] hover:shadow-[2px_2px_0px_#5E548E] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
        >
          Sign Up Now
        </Link>
      </div>
      //{" "}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-[url('/placeholder.svg?height=64&width=1200')] bg-repeat-x pointer-events-none"></div>
    </section>
  );
}