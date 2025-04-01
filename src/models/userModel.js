import { prisma } from "../utils/database.js";

export const createUser = async (data) => {
  return await prisma.usuarios.create({
    data: {
      nome: data.nome,
      email: data.email,
      senha: data.senha, // Garanta que está usando o nome do campo do banco
      tipo: data.tipo
    }
  });
};

export const getUserByEmail = async (email) => {
  return await prisma.usuarios.findUnique({
    where: { email },
    select: {
      id: true,
      nome: true,
      email: true,
      senha: true, // Campo correto do banco
      tipo: true
    }
  });
};