import { createProfile } from "@/actions/create-profile";

export default function UserInfoForm({ colleges, phone }: { colleges: any, phone: string }) {
  return (
    <div className="space-y-6 sm:space-y-8 backdrop-blur-sm bg-[#0B0B0B]/70 p-4 sm:p-6 rounded-xl border border-[#333333]">
      {/* Header */}
      <div className="text-center space-y-1 sm:space-y-2">
        <h1 className="font-serif text-2xl sm:text-3xl text-[#D4AF37]">
          Complete Your Profile
        </h1>
        <p className="text-[#EAEAEA]/80 italic text-xs sm:text-sm">
          Your identity will unlock attention.
        </p>
      </div>

      {/* Form */}
      <form
        action={createProfile}
        className="space-y-4 sm:space-y-6"
      >
        {/* Name */}
        <div className="space-y-1 sm:space-y-2">
          <label
            htmlFor="name"
            className="text-xs sm:text-sm text-[#EAEAEA]/70"
          >
            Your Name
          </label>
          <input
            name="name"
            required
            id="name"
            className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 text-[#EAEAEA] rounded-md px-3 py-2 text-sm"
            placeholder="How should we call you?"
          />
        </div>

        {/* College */}
        <div className="space-y-1 sm:space-y-2">
          <label
            htmlFor="college"
            className="text-xs sm:text-sm text-[#EAEAEA]/70"
          >
            Select Your College
          </label>
          <select
            name="college"
            required
            id="college"
            className="w-full bg-[#1A1A1A] border-[#333333] focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 text-[#EAEAEA] rounded-md px-3 py-2 text-sm"
          >
            <option value="">Select your college</option>
            {colleges.map((college: any) => (
              <option key={college._id} value={college._id}>
                {college.name}
              </option>
            ))}
          </select>
          <p className="text-[10px] sm:text-xs text-[#EAEAEA]/50 italic">
            Your college is locked forever. Your stories stay in your college.
          </p>
        </div>

        {/* Gender */}
        <div className="space-y-1 sm:space-y-2">
          <label className="text-xs sm:text-sm text-[#EAEAEA]/70">
            Select Gender
          </label>
          <div className="grid grid-cols-3 gap-1 sm:gap-2">
            {["Male", "Female", "Other"].map((g) => (
              <label
                key={g}
                className="px-2 sm:px-4 py-1.5 sm:py-2 rounded-md border border-[#333333] bg-[#1A1A1A] text-[#EAEAEA]/70 hover:border-[#D4AF37]/50 text-center text-xs sm:text-sm cursor-pointer"
              >
                <input
                  type="radio"
                  name="gender"
                  value={g.toUpperCase()}
                  className="hidden"
                />
                {g}
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-1 sm:space-y-2">
          <label
            htmlFor="hookup"
            className="flex items-center gap-2 text-xs sm:text-sm text-[#EAEAEA]/70"
          >
            <input type="checkbox" name="hookupInterest" id="hookup" />
            Interested in Hookups
          </label>
          <p className="text-[10px] sm:text-xs text-[#EAEAEA]/50 italic">
            Only for thrill-seekers. Not visible to anyone. Except fate.
          </p>
        </div>
        <input type="hidden" name="phone" value={phone} />

        {/* Submit */}
        <div className="pt-2 sm:pt-4">
          <button
            type="submit"
            className="w-full bg-[#D4AF37] hover:bg-[#C09C2C] text-[#0B0B0B] font-medium h-9 sm:h-10 text-sm sm:text-base rounded-md"
          >
            Complete Setup
          </button>
        </div>
      </form>

      {/* Footer */}
      <div className="space-y-2 sm:space-y-3 pt-1 sm:pt-2">
        <p className="text-xs sm:text-sm text-[#EAEAEA]/70 text-center italic">
          "Verified members get to see more than others."
        </p>
        <p className="text-xs sm:text-sm text-[#EAEAEA]/70 text-center italic">
          "Some uploads are only visible after joining."
        </p>
      </div>
    </div>
  );
}
