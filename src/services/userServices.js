import { createUser } from '../models/userModel.js';
import { prisma } from '../utils/database.js';
import bcrypt from 'bcryptjs';

export const register = async (data) => {
  const { senha } = data;
  const hashedPassword = await bcrypt.hash(senha, 10);
  return await createUser({ ...data, senha: hashedPassword });
};

export const getUserByEmail = async (email) => {
  return await prisma.usuarios.findUnique({
    where: { email },
  });
};
