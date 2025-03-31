import { prisma } from "../utils/database.js";;

export const createBarbeiro = async ({ usuario_id, especialidades, atende_domicilio, avaliacao, servicos_oferecidos, localizacao }) => {
  return prisma.barbeiros.create({
    data: {
      usuario_id,
      especialidades,
      atende_domicilio,
      avaliacao,
      servicos_oferecidos,
      localizacao
    }
  });
};
