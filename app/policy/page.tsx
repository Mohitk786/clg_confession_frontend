import Link from "next/link";


const PostingPolicy = () => {
  return (
    <div className=" flex flex-col items-center gap-4 justify-center min-h-screen bg-[#0B0B0B] text-[#EAEAEA]">

      <div className="bg-[#111] w-[90%] text-[#EAEAEA] border border-[#333] p-4 sm:p-6 rounded-xl space-y-4 text-sm sm:text-base max-w-2xl mx-auto">
        <h2 className="text-lg sm:text-xl font-semibold text-[#D4AF37]">
          🚫 Community Guidelines & Posting Policy
        </h2>

        <ul className="list-disc pl-5 space-y-2 text-[#EAEAEA]/90">
          <li>No hate speech, harassment, or threats toward others.</li>
          <li>No abusive, offensive, or sexually explicit content.</li>
          <li>No defamatory or misleading statements.</li>
          <li>Do not share anyone's personal information without consent.</li>
          <li>
            No discriminatory content based on race, gender, religion, etc.
          </li>
        </ul>

        <p className="text-[#EAEAEA]/70 italic">
          ⚠️ You are fully responsible for the content you post. If your content
          is flagged or reported, it may be removed. In case of any legal
          implications, you (the poster) will be held accountable.
        </p>

        <p className="text-[#EAEAEA]/70 italic">
          By using this platform, you agree to these guidelines. Failure to
          comply may result in content removal or account suspension.
        </p>

      <Link href='/onboarding'>I understand, Take me to Login</Link>

      </div>
    </div>
  );
};

export default PostingPolicy;
