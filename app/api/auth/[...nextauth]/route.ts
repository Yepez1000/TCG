import NextAuth from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';




export const authOptions: NextAuthOptions = {
    // secret: process.env.NEXTAUTH_SECRET,
    // adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider ({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            // authorization: {
            //     params: {
            //         prompt: "consent",
            //         access_type: "offline",
            //         response_type: "code"
            //     }
            // }
        }),
    ],
    // callbacks: {
    //     async session({ session, user }) {
    //         if (user) {
    //             session.user.id = user.id;
    //             session.user.email = user.email;
    //         }
    //         return session;
    //     },
    // },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
