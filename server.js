import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import userRoutes from "./src/routes/userRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import agendamentoRoutes from './src/routes/agendamentosRoutes.js';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Configuração do CORS
app.use(cors({
  origin: [
    'https://landing-page-barber-gray.vercel.app',
    'http://127.0.0.1:5500' // Mantenha para desenvolvimento local
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/agendamentos', agendamentoRoutes);

// Rota de saúde do servidor
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'online' });
});

// Tratamento de erros global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});