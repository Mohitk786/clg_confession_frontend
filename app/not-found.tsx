"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Search, ArrowLeft, GraduationCap } from "lucide-react"
import ClientButton from "@/components/custom-ui/clientButton"
import { redirect } from "next/navigation"

export default function NotFound() {
  return (
    <div className="min-h-screen   flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-200/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-rose-200/15 rounded-full blur-lg"></div>
      </div>

      <div className="w-full max-w-2xl border-0  backdrop-blur-sm relative z-10">
        <div className="p-8 lg:p-12 text-center">
          {/* Icon and 404 */}
          <div className="space-y-6 mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>

            <div className="space-y-4">
              <h1 className="text-8xl lg:text-9xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
                404
              </h1>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Oops! Page Not Found</h2>
              <p className="text-gray-600 text-lg max-w-md mx-auto">
                Looks like you've wandered off campus! The page you're looking for doesn't exist in our network.
              </p>
            </div>
          </div>

          {/* Suggestions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="text-center space-y-2 p-4 bg-purple-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto">
                <Search className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Check the URL</h3>
                <p className="text-xs text-gray-600">Make sure the web address is correct</p>
              </div>
            </div>

            <div className="text-center space-y-2 p-4 bg-pink-50 rounded-xl">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mx-auto">
                <Home className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Go Home</h3>
                <p className="text-xs text-gray-600">Return to your campus dashboard</p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                className="h-12 px-6 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Campus
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-12 px-6 border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 bg-transparent"
              >
                <Link href="/confessions">
                  <Search className="w-4 h-4 mr-2" />
                  Browse Confessions
                </Link>
              </Button>
            </div>

            <ClientButton text="Go Back" clickHandler={() => redirect('/')} />
          </div>

          {/* Footer message */}
          <div className="text-center space-y-2 pt-8 border-t border-gray-100 mt-8">
            <p className="text-sm text-gray-500 italic">"Not all who wander are lost, but this page definitely is!"</p>
            <p className="text-xs text-gray-400">Need help? Contact your campus community support</p>
          </div>
        </div>
      </div>
    </div>
  )
}
