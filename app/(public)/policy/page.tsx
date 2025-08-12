import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle, Users, CheckCircle } from "lucide-react"

const PostingPolicy = () => {
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
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">Community Guidelines</h1>
              <p className="text-gray-600 text-lg">Creating a safe and respectful space for everyone</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Respectful Community</h3>
                <p className="text-xs text-gray-600">Treat everyone with kindness</p>
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Safe Space</h3>
                <p className="text-xs text-gray-600">Protected environment for all</p>
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Clear Guidelines</h3>
                <p className="text-xs text-gray-600">Easy to follow rules</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-purple-600" />
                Posting Guidelines
              </h2>

              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>No hate speech, harassment, or threats toward others.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>No abusive, offensive, or sexually explicit content.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>No defamatory or misleading statements.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Do not share anyone's personal information without consent.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>No discriminatory content based on race, gender, religion, etc.</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-rose-50 to-orange-50 rounded-xl p-6 border border-rose-100">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-3 text-gray-700">
                  <p className="font-medium text-gray-900">Important Notice</p>
                  <p>
                    You are fully responsible for the content you post. If your content is flagged or reported, it may
                    be removed. In case of any legal implications, you (the poster) will be held accountable.
                  </p>
                  <p>
                    By using this platform, you agree to these guidelines. Failure to comply may result in content
                    removal or account suspension.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                asChild
                className="w-full h-12 text-base font-semibold rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Link href="/login">I Understand, Take Me to Login</Link>
              </Button>
            </div>

            <div className="text-center space-y-2 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500 italic">"Building a community starts with respect"</p>
              <p className="text-xs text-gray-400">Join thousands of students in our safe campus network</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PostingPolicy
