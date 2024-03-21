import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { PrismaClient, Prisma, User } from "@prisma/client";

const prisma = new PrismaClient();

async function getUser(email: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUser(email);

          if (!user) return null;

          // const passwordsMatch = await bcrypt.compare(password, user.password);

          const passwordsMatch = password === user.password;

          // Necesito convertir el id de number a string debido a la configuración de Next auth

          if (passwordsMatch)
            return {
              ...user,
              id: user.id.toString(),
            };
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
