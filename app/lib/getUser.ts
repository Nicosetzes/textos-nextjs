import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function prismaExample(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}
