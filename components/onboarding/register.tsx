"use client";

import { register } from "@/actions/auth";
import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GraduationCap, CheckCircle, Loader2 } from "lucide-react";
import FormField from "@/components/custom-ui/form-field";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { registerSchema } from "@/lib/validations/auth";


export default function RegisterForm({ colleges = [] }: { colleges?: any }) {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    college: "",
    gender: "",
    relationshipStatus: "",
    referCode: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [isLoading, setIsLoading] = useState(false);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError("");

    const parsed = registerSchema.safeParse(formData);

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    try {
      setIsLoading(true);

      const result = await register({
        ...parsed.data,
        gender: parsed.data.gender.toUpperCase() as "MALE" | "FEMALE" | "OTHER",
        relationshipStatus: parsed.data.relationshipStatus.toUpperCase() as
          | "SINGLE"
          | "IN A RELATIONSHIP"
          | "COMPLICATED",
      });

      if (result?.success) {
        setIsSubmitted(true);
        toast({
          title: "Success",
          description:
            "Profile created successfully. Please verify your email.",
          variant: "success",
        });
      } else {
        setGeneralError(result?.message || "Something went wrong");
      }
    } catch {
      setGeneralError("Server error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">You're In! 🎉</h2>
            <p className="text-gray-600">
              Welcome to the community! Check your inbox for a special welcome
              message.
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ ...formData, email: "" });
              }}
              variant="outline"
              className="w-full"
            >
              Sign Up Another Email
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 lg:p-12">
          {/* Header */}
          <div className="text-center space-y-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Join Your Campus Network</h1>
            <p className="text-gray-600">
              Connect with your college community and discover your tribe
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Your Name"
                name="name"
                required
                placeholder="Enter your full name"
                value={formData.name}
                error={errors.name}
                onChange={(e: any) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              {/* College Select */}
              <div className="space-y-1">
                <Label htmlFor="college">
                  Select Your College <span className="text-red-500">*</span>
                </Label>
                <select
                  id="college"
                  name="college"
                  value={formData.college}
                  onChange={(e) =>
                    setFormData({ ...formData, college: e.target.value })
                  }
                  className={`w-full h-12 border ${
                    errors.college ? "border-red-500" : "border-gray-200"
                  } rounded px-3`}
                >
                  <option value="">Choose your college...</option>
                  {colleges.map((c: any) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors.college && (
                  <p className="text-red-500 text-xs">{errors.college}</p>
                )}
              </div>
            </div>

            <div>
              <Label>
                Gender <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-3 gap-3 mt-2">
                {["Male", "Female", "Other"].map((g) => (
                  <label
                    key={g}
                    className={`h-12 flex items-center justify-center rounded border cursor-pointer ${
                      formData.gender === g
                        ? "bg-purple-500 text-white border-purple-500"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      className="hidden"
                      onChange={() => setFormData({ ...formData, gender: g })}
                    />
                    {g}
                  </label>
                ))}
              </div>
              {errors.gender && (
                <p className="text-red-500 text-xs">{errors.gender}</p>
              )}
            </div>

            <div>
              <Label>
                Relationship Status <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-3 gap-3 mt-2">
                {["Single", "In a Relationship", "Complicated"].map(
                  (status) => (
                    <label
                      key={status}
                      className={`h-12 flex items-center justify-center rounded border cursor-pointer ${
                        formData.relationshipStatus === status
                          ? "bg-purple-500 text-white border-purple-500"
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="relationshipStatus"
                        value={status}
                        className="hidden"
                        onChange={() =>
                          setFormData({
                            ...formData,
                            relationshipStatus: status,
                          })
                        }
                      />
                      {status}
                    </label>
                  )
                )}
              </div>
              {errors.relationshipStatus && (
                <p className="text-red-500 text-xs">
                  {errors.relationshipStatus}
                </p>
              )}
            </div>

            {/* Referral Code */}
            <FormField
              label="Referral Code"
              name="referCode"
              placeholder="Enter referral code (optional)"
              optionalText="optional"
              value={formData.referCode}
              onChange={(e: any) =>
                setFormData({ ...formData, referCode: e.target.value })
              }
            />

            {/* Phone */}
            <FormField
              label="Mobile Number"
              name="phone"
              type="tel"
              placeholder="Enter your mobile number"
              optionalText="optional"
              value={formData.phone}
              onChange={(e: any) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />

            {/* Email */}
            <FormField
              label="Email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              value={formData.email}
              error={errors.email}
              onChange={(e: any) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            {/* Password */}
            <FormField
              label="Password"
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              value={formData.password}
              error={errors.password}
              onChange={(e: any) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            {/* Confirm Password */}
            <FormField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              required
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              error={errors.confirmPassword}
              onChange={(e: any) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
              }
            />

            {/* Policy Checkbox */}
            <div className="pt-2">
              <label className="flex gap-3 text-sm">
                <input
                  type="checkbox"
                  className="mt-0.5 w-4 h-4 text-purple-600 border-gray-300 rounded"
                  checked={policyAccepted}
                  onChange={() => setPolicyAccepted(!policyAccepted)}
                  required
                />
                <span>
                  I agree to the{" "}
                  <Link href="/policy" className="text-purple-600 underline">
                    Community Guidelines
                  </Link>
                </span>
              </label>
            </div>

            <Button
              type="submit"
              disabled={!policyAccepted}
              className={`w-full h-12 font-semibold ${
                policyAccepted
                  ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                " Join Your Campus Network"
              )}
            </Button>
          </form>
          {generalError && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded mb-4 text-sm">
              {generalError}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
