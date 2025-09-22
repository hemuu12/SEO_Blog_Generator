import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

export const createUser = async (name: string, email: string, password: string) => {
  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  return prisma.user.create({ data: { name, email, password: hashed } });
};

export const validateUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.password);
  return valid ? user : null;
};

export const findUserById = async (id: number) => {
  return prisma.user.findUnique({ where: { id } });
};
