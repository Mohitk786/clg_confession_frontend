import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      userId?: string;
      name?: string;
      college?: string;
      profileCompleted?: boolean;
      gender?: string;
    } & DefaultSession['user'];
  }

  interface User {
    _id?: string;
    name?: string;
    college?: string;
    profileCompleted?: boolean;
    gender?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId?: string;
    name?: string;
    college?: string;
    profileCompleted?: boolean;
    gender?: string;
  }
}
  