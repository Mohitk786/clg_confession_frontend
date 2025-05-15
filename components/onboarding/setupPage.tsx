"use client";
import { createProfile } from "@/actions/create-profile";
import { useState } from "react";
import Link from "next/link";

export default function UserInfoForm({
  colleges,
  phone,
}: {
  colleges: any;
  phone: string;
}) {
  const [gender, setGender] = useState("");
  const [relationshipStatus, setRelationshipStatus] = useState("");
  const [policyAccepted, setPolicyAccepted] = useState(false);

  return (
    <div className="space-y-6 sm:space-y-8 backdrop-blur-md bg-[#0B0B0B]/80 p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl border border-[#333333] shadow-lg min-w-4xl  w-full mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-1 sm:space-y-2">
        <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl text-[#D4AF37]">
          ✨ Build Your College Aura
        </h1>
        <p className="text-[#EAEAEA]/80 italic text-xs sm:text-sm md:text-base">
          Find your vibe, your tribe, and maybe your ride-or-die.
        </p>
      </div>

      <form
        action={createProfile}
        className="space-y-6 sm:space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm text-[#EAEAEA]/70">
              Your Name
            </label>
            <input
              name="name"
              required
              id="name"
              className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#D4AF37] text-[#EAEAEA] rounded-md px-3 py-2 text-sm"
              placeholder="How should we call you?"
            />
          </div>

          {/* College */}
          <div className="space-y-2">
            <label htmlFor="college" className="text-sm text-[#EAEAEA]/70">
              Select Your College
            </label>
            <select
              name="college"
              required
              id="college"
              className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#D4AF37] text-[#EAEAEA] rounded-md px-3 py-2 text-sm"
            >
              <option value="">Select your college</option>
              {colleges.map((college: any) => (
                <option key={college._id} value={college._id}>
                  {college.name}
                </option>
              ))}
            </select>
            <p className="text-[10px] text-[#EAEAEA]/50 italic">
              Locked to your college. Where love stories begin. 💫
            </p>
          </div>

          {/* Gender */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm text-[#EAEAEA]/70">Select Gender</label>
            <div className="grid grid-cols-3 gap-3">
              {["Male", "Female", "Other"].map((g) => (
                <label
                  key={g}
                  className={`px-4 py-2 rounded-md border cursor-pointer text-center text-sm transition-all duration-200
                    ${
                      gender === g.toUpperCase()
                        ? "bg-[#D4AF37] text-[#0B0B0B] border-[#D4AF37]"
                        : "bg-[#1A1A1A] text-[#EAEAEA]/70 border-[#333333] hover:border-[#D4AF37]/50"
                    }`}
                >
                  <input
                    type="radio"
                    name="gender"
                    value={g.toUpperCase()}
                    className="hidden"
                    onChange={() => setGender(g.toUpperCase())}
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>

          {/* Relationship Status */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm text-[#EAEAEA]/70">Relationship Status</label>
            <div className="grid grid-cols-3 gap-3 items-center">
              {["Single", "Committed", "It’s Complicated"].map((status) => (
                <label
                  key={status}
                  className={`px-4 py-2 rounded-md border cursor-pointer text-center text-sm transition-all duration-200
                    ${
                      relationshipStatus === status
                        ? "bg-[#D4AF37] text-[#0B0B0B] border-[#D4AF37]"
                        : "bg-[#1A1A1A] text-[#EAEAEA]/70 border-[#333333] hover:border-[#D4AF37]/50"
                    }`}
                >
                  <input
                    type="radio"
                    name="relationshipStatus"
                    value={status}
                    className="hidden"
                    onChange={() => setRelationshipStatus(status)}
                  />
                  {status}
                </label>
              ))}
            </div>
          </div>

          {/* Hookup Interest */}
          <div className="space-y-2 col-span-1 md:col-span-2">
            <label htmlFor="hookup" className="flex items-center gap-2 text-sm text-[#EAEAEA]/70">
              <input type="checkbox" name="hookupInterest" id="hookup" />
              Interested in Casual Sparks? <span className="text-[#EAEAEA]/50 italic">(optional)</span>
            </label>
            <p className="text-[10px] text-[#EAEAEA]/50 italic">
              For thrill-seekers only. 🌪️ Discreet and destiny-bound.
            </p>
          </div>

          {/* Refer Code */}
          <div className="space-y-2 col-span-1 md:col-span-2">
            <label htmlFor="referCode" className="text-sm text-[#EAEAEA]/70">
              Refer Code <span className="italic text-[#EAEAEA]/50">(optional)</span>
            </label>
            <input
              name="referCode"
              id="referCode"
              className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#D4AF37] text-[#EAEAEA] rounded-md px-3 py-2 text-sm"
              placeholder="Got a friend's code?"
            />
          </div>
        </div>

        <input type="hidden" name="phone" value={phone} />

        <div>
          <label className="flex items-center gap-2 text-sm text-[#EAEAEA]/70">
            <input
              name="policyAccepted"
              type="checkbox"
              className="mt-1 accent-[#D4AF37] w-4 h-4"
              checked={policyAccepted}
              onChange={() => setPolicyAccepted(!policyAccepted)}
            />
            I have read and agree to the <Link href={'/policy'} className='text-blue-600'>Community Guidelines & Posting Policy</Link>.
          </label>
          {policyAccepted && (
            <div className="flex items-center text-green-500 text-sm gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.293-11.293a1 1 0 00-1.414 0L9 10.586l-1.879-1.879a1 1 0 00-1.414 1.414l2.293 2.293a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              You’re good to go!
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            onClick={() => {
              if (!policyAccepted) {
                alert("Please accept the Community Guidelines & Posting Policy.");
                return;
              }
            }}
            // disabled={!policyAccepted}
            type="submit"
            title={`${!policyAccepted ? "Please accept the Community Guidelines & Posting Policy." : "Enter pool"}`}
            className={`${!policyAccepted ? "cursor-not-allowed":"" } w-full bg-[#D4AF37] hover:bg-[#C09C2C] text-[#0B0B0B] font-semibold h-12 text-base rounded-md transition-all duration-200`}
          >
            Complete Setup 🚀
          </button>
        </div>
      </form>

      {/* Footer */}
      <div className="space-y-2 pt-4">
        <p className="text-xs sm:text-sm text-[#EAEAEA]/70 text-center italic">
          "Verified lovers get verified attention."
        </p>
        <p className="text-xs sm:text-sm text-[#EAEAEA]/70 text-center italic">
          "Some secrets unlock only after you belong."
        </p>
      </div>
    </div>
  );
}
