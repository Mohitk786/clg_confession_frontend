import { User, Users, Book, Check, ImageIcon, Bell } from "lucide-react";

const steps = [
  {
    icon: User,
    title: "Student Signup",
    description: (
      <>
        Sign up by entering your details and choose your college. Once picked,
        your <span className="font-semibold">college pool is set</span> — this
        ensures relevance and keeps things secure.
      </>
    ),
  },
  {
    icon: Users,
    title: "Join Your College Pool",
    description: (
      <>
        Instantly join your college's confession pool and receive{" "}
        <span className="font-semibold">
          all confessions, thoughts, and news
        </span>
        .
      </>
    ),
  },
  {
    icon: Book,
    title: "Post Confessions Anonymously",
    description: (
      <>
        Post confessions <span className="font-semibold">anonymously</span> in
        your pool.
        <br />
        Mention others — they get notified, but your identity stays hidden.
      </>
    ),
  },
  {
    icon: Check,
    title: "Identity Disclosure",
    description: (
      <>
        Choose to disclose your identity{" "}
        <span className="font-semibold">only to the mentioned person</span> (if
        you want). Everyone else stays in the dark!
      </>
    ),
  },
  {
    icon: ImageIcon,
    title: "Campus Corner",
    description: (
      <>
        Anonymously post{" "}
        <span className="font-semibold">thoughts or images</span> in Campus
        Corner and show your campus life creatively!
      </>
    ),
  },
  {
    icon: Bell,
    title: "Notifications",
    description: (
      <>
        Get notified if someone{" "}
        <span className="font-semibold">mentions you</span> in a confession —
        but their identity remains private.
      </>
    ),
  },
];

function HowItWorks() {
  return (
    <section className="py-16 vintage-texture bg-[#FAE8E0]">
      <div className="max-w-3xl mx-auto mb-10 text-center">
        <div className="inline-block mb-6">
          <div className="relative">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#5E548E] mb-2 relative z-10">
              How It Works
            </h2>
            <div className="absolute -bottom-2 left-0 right-0 h-4 bg-[#B6E2D3] -z-10 transform -rotate-1"></div>
          </div>
        </div>
        <p className="text-md md:text-lg text-[#5E548E] font-['VT323'] text-xl">
          Simple steps to keep your campus buzz alive, safe and fun!
        </p>
      </div>

      <ol className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <li
              key={step.title}
              className="flex flex-col items-center vintage-card p-6 md:p-8 text-center group"
            >
              <div className="vintage-number mb-4">
                <span className="font-['VT323'] text-2xl">{i + 1}</span>
              </div>

              <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-[#E8F1F2] group-hover:bg-[#B6E2D3] transition-colors border-2 border-[#5E548E]">
                <Icon size={32} className="text-[#5E548E]" />
              </div>

              <h3 className="font-['Playfair_Display'] font-semibold text-lg md:text-xl mb-2 text-[#DD6E92]">
                {step.title}
              </h3>

              <div className="text-[#5E548E] md:text-base leading-snug font-['VT323'] text-lg">
                {step.description}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export default HowItWorks;