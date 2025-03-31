import { createUser } from '../models/userModel.js';
import { getUserByEmail } from '../services/UserServices.js';
import { createBarbeiro } from '../models/barbeiroModel.js';  
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
  const { nome, email, senha, tipo, especialidades, atende_domicilio, avaliacao, servicos_oferecidos, localizacao } = req.body;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return res.status(400).json({ message: 'Email já cadastrado' });
  }

  const hashedPassword = await bcrypt.hash(senha, 10);

  // Criação do usuário
  const user = await createUser({
    nome,
    email,
    senha: hashedPassword,
    tipo
  });

  if (tipo === 'barbeiro') {
    const barbeiro = await createBarbeiro({
      usuario_id: user.id.toString(),
      especialidades,
      atende_domicilio,
      avaliacao,
      servicos_oferecidos,
      localizacao
    });

    return res.status(201).json({
      user: {
        id: user.id.toString(),
        nome: user.nome,
        email: user.email,
        tipo: user.tipo
      },
      barbeiro: {
        id: barbeiro.id.toString(),
        usuario_id: barbeiro.usuario_id.toString(),
        especialidades: barbeiro.especialidades,
        atende_domicilio: barbeiro.atende_domicilio,
        avaliacao: barbeiro.avaliacao,
        servicos_oferecidos: barbeiro.servicos_oferecidos,
        localizacao: barbeiro.localizacao
      }
    });
  }

  // Se for tipo "cliente", apenas retornamos o usuário
  res.status(201).json({
    id: user.id.toString(),
    nome: user.nome,
    email: user.email,
    tipo: user.tipo
  });
};
