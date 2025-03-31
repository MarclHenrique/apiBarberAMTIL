import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import userRoutes from "./src/routes/userRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";


dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
