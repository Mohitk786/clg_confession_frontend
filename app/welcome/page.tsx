import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, GraduationCap, Users, Heart } from "lucide-react"
import Link from "next/link"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-200/20 rounded-full blur-xl"></div>
      </div>

      <Card className="w-full max-w-lg border-0 shadow-2xl bg-white/90 backdrop-blur-sm relative z-10">
        <CardContent className="p-8 lg:p-12 text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-gray-900">Welcome to Your Campus!</h1>
            <p className="text-gray-600 text-lg">
              Your profile has been created successfully. You're now part of your college's social network!
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 py-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-xs text-gray-600">Connect with peers</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <p className="text-xs text-gray-600">Share experiences</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mx-auto">
                <GraduationCap className="w-6 h-6 text-rose-600" />
              </div>
              <p className="text-xs text-gray-600">Campus events</p>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <Button
              asChild
              className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold"
            >
              <Link href="/">Explore Your Campus</Link>
            </Button>

            {/* <Button asChild variant="outline" className="w-full h-12 border-gray-200 hover:bg-gray-50 bg-transparent">
              <Link href="/profile">Complete Your Profile</Link>
            </Button> */}
          </div>

          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Ready to discover your campus community and make meaningful connections!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
