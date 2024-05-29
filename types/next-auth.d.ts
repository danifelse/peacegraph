import NextAuth, { DefaultSession } from "next-auth/next";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
      user: {
        id: string | undefined | null
        email: string | undefined | null
        name: string | undefined | null
        imageUrl: string | undefined | null
        role: string | undefined | null
      } & DefaultSession["user"]
    }
  }