import { createUser } from '../models/userModel.js';
import { getUserByEmail } from '../services/userServices.js';
import { createBarbeiro } from '../models/barbeiroModel.js';
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, userType, barberInfo } = req.body;

    // Validação dos campos obrigatórios
    if (!name || !email || !password || !userType) {
      return res.status(400).json({ message: 'Campos obrigatórios faltando' });
    }

    // Verifica se o usuário já existe
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Email já cadastrado' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criação do usuário
    const user = await createUser({
      nome: name,
      email,
      senha: hashedPassword,
      tipo: userType === 'barber' ? 'barbeiro' : 'cliente'
    });

    // Se for barbeiro, cria o registro relacionado
    let barbeiroData = null;
    if (userType === 'barber') {
      if (!barberInfo) {
        return res.status(400).json({ message: 'Dados do barbeiro são obrigatórios' });
      }

      // Formata os dados do barbeiro
      const barbeiroData = await createBarbeiro({
        usuario_id: user.id,
        especialidades: Array.isArray(barberInfo.specialties) 
          ? barberInfo.specialties 
          : [],
        atende_domicilio: barberInfo.providesHomeService === 'true',
        servicos_oferecidos: Array.isArray(barberInfo.servicesOffered) 
          ? barberInfo.servicesOffered 
          : [],
        localizacao: barberInfo.location || ''
      });
    }

    // Formata a resposta
    const response = {
      user: {
        id: user.id.toString(),
        name: user.nome,
        email: user.email,
        type: user.tipo
      }
    };

    if (barbeiroData) {
      response.barber = {
        id: barbeiroData.id.toString(),
        user_id: barbeiroData.usuario_id.toString(),
        specialties: barbeiroData.especialidades,
        provides_home_service: barbeiroData.atende_domicilio,
        services_offered: barbeiroData.servicos_oferecidos,
        location: barbeiroData.localizacao
      };
    }

    res.status(201).json(response);

  } catch (error) {
    console.error("Erro no registro:", error);
    res.status(500).json({ 
      message: "Erro interno no servidor",
      error: error.message 
    });
  }
};