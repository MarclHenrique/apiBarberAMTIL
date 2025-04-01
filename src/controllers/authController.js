import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserByEmail } from '../models/userModel.js';

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body; // Mantenha o nome do campo do frontend

    if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    const user = await getUserByEmail(email);
    
    if (!user || !user.senha) { // Campo correto do banco
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const isMatch = await bcrypt.compare(senha, user.senha); // Compare com o campo do banco
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { 
        id: user.id.toString(),
        tipo: user.tipo 
      }, 
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.status(200).json({ 
      token,
      user: {
        id: user.id.toString(),
        nome: user.nome,
        email: user.email,
        type: user.tipo === 'barbeiro' ? 'barber' : 'client' // 👈 Conversão explícita
      }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};