"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Mail, Sparkles, Users, Heart } from "lucide-react";
import { createProfile } from "@/actions/create-profile";

export default function EmailSignupPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    await createProfile({ email });
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">
                You're In! 🎉
              </h2>
              <p className="text-gray-600">
                Welcome to the community! Check your inbox for a special welcome
                message.
              </p>
            </div>
            <div className="pt-4">
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail("");
                }}
                variant="outline"
                className="w-full"
              >
                Sign Up Another Email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-rose-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-200/20 rounded-full blur-lg"></div>
      </div>

      <Card className="w-full max-w-lg border-0 shadow-2xl bg-white/80 backdrop-blur-sm relative z-10">
        <CardContent className="p-8 lg:p-12">
          {/* Header */}
          <div className="text-center space-y-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Join Our Community
              </h1>
              <p className="text-gray-600 text-lg">
                Be the first to know about exclusive updates, early access, and
                special offers.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mx-auto">
                <Mail className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  Weekly Updates
                </h3>
                <p className="text-xs text-gray-600">Fresh content delivered</p>
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  Exclusive Access
                </h3>
                <p className="text-xs text-gray-600">Members-only perks</p>
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  Community Love
                </h3>
                <p className="text-xs text-gray-600">Connect with others</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="h-12 text-base border-gray-200 focus:border-rose-500 focus:ring-rose-500"
              />
            </div>

            <Button
              type="submit"
              disabled={!email || isLoading}
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Joining...
                </div>
              ) : (
                "Join the Community"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center space-y-4">
            <p className="text-xs text-gray-500">
              By signing up, you agree to receive occasional emails from us.
              <br />
              You can unsubscribe at any time.
            </p>
            <div className="flex items-center justify-center gap-1 text-xs text-gray-400">
              <span>Trusted by</span>
              <span className="font-semibold text-gray-600">10,000+</span>
              <span>happy members</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
