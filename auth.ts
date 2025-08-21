import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { dbConnect } from "@/lib/dbConnect"
import User from "@/models/User"
import bcrypt from "bcryptjs"
import '@/models/College'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        await dbConnect()
        const user = await User.findOne({ email: credentials.email }).populate("college")
        if (!user) throw new Error("User not found")

        if(!user.isVerified )throw new Error("Account not verified. Please check your email")

        const isValid = await bcrypt.compare(credentials.password as string, user.password)
        if (!isValid) return null

        

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          college: user.college?.name,
          profileCompleted: user.profileCompleted,
          gender: user.gender,
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id
        token.name = user.name
        token.college = user.college
        token.profileCompleted = user.profileCompleted
        token.gender = user.gender
      }
      return token
    },
    async session({ session, token }) {
      session.user = {
        userId: token.userId as string,
        name: token.name as string,
        college: token.college as string,
        profileCompleted: token.profileCompleted as boolean,
        gender: token.gender as string,
      }
      return session
    },
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  trustHost: true,
})