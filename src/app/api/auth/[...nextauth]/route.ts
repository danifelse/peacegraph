import { login } from "@/lib/firebase/services"
import { compare } from "bcrypt"
import {NextAuthOptions} from "next-auth"
import NextAuth from "next-auth"
import  CredentialsProvider  from "next-auth/providers/credentials"

const authOptions : NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email"}, 
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {
                const {email, password} = credentials as {email: string, password: string}
                const user: any = await login(email)
                if (user) {
                    const passwordConfirm = await compare(password, user.password)
                    if(passwordConfirm) {
                        return user
                    }
                    return null
                } else {
                    return null
                }
            },
        })
    ], 
    callbacks: {
        jwt: async ({token, account, user}:any) => {
            if (account?.provider === "credentials") {
                token.email = user?.email;
                token.name = user?.name;
                token.role = user?.role;
                 
            }
            return token
        },
        async session({session, token}:any) {
            if ("email" in token) {
                session.user.email = token.email
            }
            if ("name" in token) {
                session.user.name = token.name
            }
            if ("role" in token) {
                session.user.role = token.role
            }
            return session
        },
     
    },
    pages : {
        signIn: "/auth/login"
    }
}

// export default NextAuth(authOptions)

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };