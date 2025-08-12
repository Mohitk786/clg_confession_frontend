export const dynamic = "force-dynamic"
import { getUnlockedConfessions } from "@/actions/getUnlockedConfessions"
import Link from "next/link"

const Page = async () => {
  const data = await getUnlockedConfessions()
  const unlockedConfessions = data?.data || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 py-10 px-4 flex flex-col">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          Unlocked Confessions
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        <p className="text-gray-600 mt-4 text-lg">Your exclusive access to revealed stories</p>
      </div>

      {unlockedConfessions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-[80%] mx-auto gap-6  ">
          {unlockedConfessions.map((confession: any) => (
            <div
              key={confession._id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:bg-white/90 animate-fade-in"
            >
              <p className="text-lg text-gray-800 font-medium whitespace-pre-wrap mb-4 leading-relaxed">
                {confession.content}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {confession.tags?.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm px-3 py-1 rounded-full font-medium border border-purple-200/50"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="text-sm text-gray-600 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <span className="text-red-500">❤️</span>
                    <span className="font-medium">{confession.likesCount}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-blue-500">💬</span>
                    <span className="font-medium">{confession.commentsCount}</span>
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-purple-700">{confession.createdBy?.name}</div>
                  <div className="text-xs text-gray-500">
                    {confession.createdBy?.gender} • {confession.createdBy?.college?.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center mt-8 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 max-w-md">
            <div className="text-6xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Unlocked Confessions Yet</h3>
            <p className="text-gray-600 mb-6">
              Start engaging with confessions to unlock exclusive content and see who's behind the stories.
            </p>
            <Link href={'/confessions'} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl">
              Explore Confessions
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
