import { Router } from 'express';
import { criarAgendamento } from '../controllers/agendamentoscontroller.js';
import {authenticateJWT} from '../middlewares/authMiddleware.js'

const router = Router();

// Rota protegida para criar agendamento (somente usuários logados)
router.post('/agendar', authenticateJWT, criarAgendamento);

export default router;
