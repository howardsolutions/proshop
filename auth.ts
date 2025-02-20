import NextAuth, { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";

export const config = {
    pages: {
        signIn: '/sign-in',
        signOut: '/sign-out',
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            credentials: {
                email: { type: 'email' },
                password: { type: 'password' },
            },
            async authorize(credentials) {
                if (credentials == null) return null;

                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email as string
                    }
                });

                if (user && user.password) {
                    const isPasswordMatch = compareSync(user.password, credentials.password as string);
                    if (isPasswordMatch) {
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: user.role
                        };
                    }
                }

                // if password doesnt match, or user not exist
                return null;
            }
        })
    ],
    callbacks: {
        async session({ session, user, trigger, token }: any) {
            // set the user ID from the token
            session.user.id = token.sub;

            // if there is an update, update the user name in the session
            if (trigger === 'updater') {
                session.user.name = user.name;
            }

            return session;
        }
    },
} satisfies NextAuthConfig;

const { handlers, auth, signIn, signOut } = NextAuth(config);
