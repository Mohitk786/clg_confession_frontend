import Link from "next/link"

export default function FinalCTA() {
  return (
    <section className="py-16 vintage-texture bg-[#F9C5D5]">
      <div className="max-w-xl mx-auto text-center px-4">
        <div className="vintage-polaroid mb-8">
          <div className="p-4">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#5E548E] mb-2">
              Ready to Join the Confession Craze?
            </h2>
            <p className="text-md md:text-lg text-[#5E548E] font-['VT323'] text-xl mb-6">
              Sign up and be a part of your college's most open, honest, and fun community — 100% anonymously!
            </p>
          </div>
        </div>

        <Link
            href="/onboarding"
          className="bg-[#7D5BA6] hover:bg-[#5E548E] text-white font-['VT323'] text-xl px-8 py-6 rounded-xl shadow-[4px_4px_0px_#DD6E92] hover:shadow-[2px_2px_0px_#DD6E92] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
        >
          Get Started
        </Link>

        <div className="mt-8 flex justify-center">
          <div className="vintage-stamp">
            <span className="font-['VT323'] text-lg text-[#5E548E]">Est. 2024</span>
          </div>
        </div>
      </div>
    </section>
  )
}