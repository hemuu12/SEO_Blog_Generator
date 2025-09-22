import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
const SALT_ROUNDS = 10;
export const createUser = async (name, email, password) => {
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    return prisma.user.create({ data: { name, email, password: hashed } });
};
export const validateUser = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
        return null;
    const valid = await bcrypt.compare(password, user.password);
    return valid ? user : null;
};
export const findUserById = async (id) => {
    return prisma.user.findUnique({ where: { id } });
};
