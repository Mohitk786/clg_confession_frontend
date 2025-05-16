
import { User, Users, Book, Bell, Check, Image } from "lucide-react";

const steps = [
  {
    icon: User,
    title: "Student Signup",
    description: (
      <>
        Sign up by entering your details and choose your college. Once picked, your <span className="font-semibold">college pool is set</span> — this ensures relevance and keeps things secure.
      </>
    ),
  },
  {
    icon: Users,
    title: "Join Your College Pool",
    description: (
      <>
        Instantly join your college’s confession pool and receive <span className="font-semibold">all confessions, thoughts, and news</span>.
      </>
    ),
  },
  {
    icon: Book,
    title: "Post Confessions Anonymously",
    description: (
      <>
        Post confessions <span className="font-semibold">anonymously</span> in your pool.
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
        Choose to disclose your identity <span className="font-semibold">only to the mentioned person</span> (if you want). Everyone else stays in the dark!
      </>
    ),
  },
  {
    icon: Image,
    title: "Campus Corner",
    description: (
      <>
        Anonymously post <span className="font-semibold">thoughts or images</span> in Campus Corner and show your campus life creatively!
      </>
    ),
  },
  {
    icon: Bell,
    title: "Notifications",
    description: (
      <>
        Get notified if someone <span className="font-semibold">mentions you</span> in a confession — but their identity remains private.
      </>
    ),
  },
];

const HowItWorks = () => (
  <section className="py-16 bg-canvas bg-[#F8F5F0]">
    <div className="max-w-3xl mx-auto mb-10 text-center">
      <h2 className="font-playfair text-3xl md:text-4xl text-[#1A2A40] mb-2">How It Works</h2>
      <p className="text-md md:text-lg text-[#393856]">Simple steps to keep your campus buzz alive, safe and fun!</p>
    </div>
    <ol className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {steps.map((step, i) => (
        <li key={step.title} className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 md:p-8 text-center hover:scale-105 transition-transform duration-200 group">
          <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-[#E5DEFF] group-hover:bg-[#9b87f5] transition-colors">
            <step.icon size={32} className="text-[#7E69AB]" />
          </div>
          <h3 className="font-semibold text-lg md:text-xl mb-2 text-[#1A2A40]">{`Step ${i + 1}: ${step.title}`}</h3>
          <div className="text-[#393856] text-sm md:text-base leading-snug">{step.description}</div>
        </li>
      ))}
    </ol>
  </section>
);

export default HowItWorks;