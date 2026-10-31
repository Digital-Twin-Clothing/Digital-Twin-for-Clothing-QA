import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { compare } from "bcryptjs";

// TODO: Replace this with actual database
// This is a temporary in-memory store for demonstration
// In production, use Prisma, MongoDB, or another database
const users: Array<{
  id: string;
  email: string;
  password: string;
  name: string;
}> = [];

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // TODO: Replace with database query
        // Example: const user = await prisma.user.findUnique({ where: { email: credentials.email } })
        const user = users.find((u) => u.email === credentials.email);

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isPasswordValid = await compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
    // Uncomment these when you have OAuth credentials
    // Google({
    //   clientId: process.env.AUTH_GOOGLE_ID!,
    //   clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    // }),
    // GitHub({
    //   clientId: process.env.AUTH_GITHUB_ID!,
    //   clientSecret: process.env.AUTH_GITHUB_SECRET!,
    // }),
  ],
  pages: {
    signIn: "/login",
    // signOut: "/",
    // error: "/error",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

// TODO: Replace this with actual database mutation
// This is a helper function for signup - move to API route
export async function createUser(email: string, password: string, name: string) {
  const bcrypt = require("bcryptjs");
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    id: Math.random().toString(36).substr(2, 9),
    email,
    password: hashedPassword,
    name,
  };

  users.push(user);
  return { id: user.id, email: user.email, name: user.name };
}

// Helper to check if user exists
export async function getUserByEmail(email: string) {
  return users.find((u) => u.email === email);
}
