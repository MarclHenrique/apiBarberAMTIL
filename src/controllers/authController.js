import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserByEmail } from '../models/userModel.js';

export const login = async (req, res) => {
  const { email, senha } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(400).json({ message: 'Usuário não encontrado' });
  }

  const isMatch = await bcrypt.compare(senha, user.senha);

  if (!isMatch) {
    return res.status(400).json({ message: 'Senha incorreta' });
  }

  const token = jwt.sign({ id: user.toString() }, process.env.JWT_SECRET);

  res.status(200).json({ token });
};
