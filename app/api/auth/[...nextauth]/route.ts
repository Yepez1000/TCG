import NextAuth from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string; // Add `id` here
        } & DefaultSession["user"];
    }
}




export const authOptions: NextAuthOptions = {
    // session: {
    //     strategy: "jwt", // Use JWT for sessions
    // },
    secret: process.env.NEXTAUTH_SECRET,
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
    callbacks: {
        async session({ session, user, token}) {

            const email = session.user?.email || "";
            const name = session.user?.name || "";
            const image = session.user?.image || "";



       
            if (email) {
                let user = await prisma.user.findUnique({
                    where: { email }
                });
               

                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            email,
                            name: name || null,
                            image: image || null,
                            cart: {
                                create: {} // Creates an empty Cart for the user
                            },
                            ShippingAddresses: {
                                create: [] // Initializes with no addresses
                            }
                        }
                    });
                }
                session.user.id = user.id;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
