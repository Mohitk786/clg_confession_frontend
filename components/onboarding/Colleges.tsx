import React from "react";

const Colleges = async() => {
    const colleges = await getColleges();
    

  return (
    <div className="space-y-1 sm:space-y-2">
      <label htmlFor="college" className="text-xs sm:text-sm text-[#EAEAEA]/70">
        Select Your College
      </label>
      <select
        id="college"
        value={formData.college}
        onChange={(e) => handleChange("college", e.target.value)}
        className="w-full bg-[#1A1A1A] border-[#333333] focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 text-[#EAEAEA] rounded-md px-2 sm:px-3 py-1.5 sm:py-2 text-sm h-9 sm:h-10"
      >
        <option value="" disabled>
          Select your college
        </option>
        {colleges.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <p className="text-[10px] sm:text-xs text-[#EAEAEA]/50 italic">
        Your college is locked forever. Your stories stay in your college.
      </p>
    </div>
  );
};

export default Colleges;
