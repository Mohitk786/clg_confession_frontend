"use client"

import { register } from "@/actions/create-profile"
import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GraduationCap, Heart, Users, Sparkles } from "lucide-react"



export default function RegisterForm({
  colleges = [],
  email = "",
}: {
  colleges?: any
  email?: string
}) {
  const [gender, setGender] = useState("")
  const [relationshipStatus, setRelationshipStatus] = useState("")
  const [policyAccepted, setPolicyAccepted] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-200/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-rose-200/15 rounded-full blur-lg"></div>
      </div>

      <Card className="w-full max-w-2xl border-0 shadow-2xl bg-white/90 backdrop-blur-sm relative z-10">
        <CardContent className="p-8 lg:p-12">
          <div className="text-center space-y-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">Join Your Campus Network</h1>
              <p className="text-gray-600 text-lg">Connect with your college community and discover your tribe</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Find Your Tribe</h3>
                <p className="text-xs text-gray-600">Connect with like-minded peers</p>
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Campus Vibes</h3>
                <p className="text-xs text-gray-600">Share your college experience</p>
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Exclusive Events</h3>
                <p className="text-xs text-gray-600">Access campus activities</p>
              </div>
            </div>
          </div>

          <form action={register} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Your Name
                </Label>
                <Input
                  name="name"
                  required
                  id="name"
                  className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="college" className="text-sm font-medium text-gray-700">
                  Select Your College
                </Label>
                <select
                  name="college"
                  required
                  id="college"
                  className="w-full h-12 border border-gray-200 bg-white focus:border-purple-500 focus:ring-purple-500 px-3 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  <option value="">Choose your college...</option>
                  {/* Added safety check for colleges array */}
                  {colleges && colleges.length > 0 ? (
                    colleges.map((college: any) => (
                      <option key={college._id} value={college._id}>
                        {college.name}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No colleges available
                    </option>
                  )}
                </select>
                <p className="text-xs text-gray-500">Where your story begins</p>
              </div>

              <div className="md:col-span-2 space-y-3">
                <Label className="text-sm font-medium text-gray-700">Gender</Label>
                <div className="grid grid-cols-3 gap-3">
                  {["Male", "Female", "Other"].map((g) => (
                    <label
                      key={g}
                      className={`h-12 rounded-lg border text-center text-sm cursor-pointer transition-all duration-200 flex items-center justify-center font-medium ${
                        gender === g
                          ? "bg-purple-500 text-white border-purple-500 shadow-md"
                          : "border-gray-200 text-gray-700 hover:border-purple-300 hover:bg-purple-50"
                      }`}
                    >
                      <input type="radio" name="gender" value={g} className="hidden" onChange={() => setGender(g)} />
                      {g}
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 space-y-3">
                <Label className="text-sm font-medium text-gray-700">Relationship Status</Label>
                <div className="grid grid-cols-3 gap-3">
                  {["SINGLE", "IN_A_RELATIONSHIP", "COMPLICATED"].map((status) => (
                    <label
                      key={status}
                      className={`h-12 rounded-lg border text-center text-sm cursor-pointer transition-all duration-200 flex items-center justify-center font-medium ${
                        relationshipStatus === status
                          ? "bg-purple-500 text-white border-purple-500 shadow-md"
                          : "border-gray-200 text-gray-700 hover:border-purple-300 hover:bg-purple-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="relationshipStatus"
                        value={status}
                        className="hidden"
                        onChange={() => setRelationshipStatus(status)}
                      />
                      {status.replace(/_/g, " ").toLowerCase()}
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="referCode" className="text-sm font-medium text-gray-700">
                  Referral Code <span className="text-gray-500 font-normal">(optional)</span>
                </Label>
                <Input
                  name="referCode"
                  id="referCode"
                  className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Enter referral code if you have one"
                />
              </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                 Mobile Number
                </Label>
                <Input
                  name="phone"
                  required
                  id="phone"
                  className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Enter your mobile number"
                />
              </div>

              <Input type="hidden" name="email" value={email} />

            <div className="pt-2">
              <label className="flex items-start gap-3 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  name="policyAccepted"
                  className="mt-0.5 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  checked={policyAccepted}
                  onChange={() => setPolicyAccepted(!policyAccepted)}
                />
                <span className="text-gray-600">
                  I agree to the{" "}
                  <Link href="/policy" className="text-purple-600 hover:text-purple-700 underline font-medium">
                    Community Guidelines
                  </Link>{" "}
                  and understand the platform rules
                </span>
              </label>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={!policyAccepted}
                className={`w-full h-12 text-base font-semibold rounded-lg transition-all duration-200 ${
                  policyAccepted
                    ? "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Join Your Campus Network
              </Button>
            </div>

            <div className="text-center space-y-2 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500 italic">"Every connection starts with a single step"</p>
              <p className="text-xs text-gray-400">Join thousands of students already connecting on campus</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
