import { prisma } from "../utils/database.js";

export const createUser = async (data) => {
  return await prisma.usuarios.create({
    data
  });
};

export const getUserByEmail = async (email) => {
  return await prisma.usuarios.findUnique({
    where: { email }
  });
};
