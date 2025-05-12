import React from "react";
import ProfileForm from "@/components/profile/ProfileForm";

const Profile = () => {
  return (
      <div className="flex flex-col items-center text-center min-h-screen  p-2 md:p-0">
        <h1 className="mt-10 text-3xl md:text-4xl font-playfair font-bold text-campus-navy mb-6">
          Your Profile
        </h1>
        <p className="text-campus-navy/70 mb-8">
          Set up your academic profile to help your classmates identify you when
          they write confessions.
        </p>
        <ProfileForm />
      </div>
  );
};

export default Profile;
