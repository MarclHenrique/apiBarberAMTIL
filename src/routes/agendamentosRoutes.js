import { Router } from 'express';
import { criarAgendamento, listarAgendamentosCliente, buscarAgendamento } from '../controllers/agendamentoscontroller.js';

const router = Router();

router.post('/', criarAgendamento); // Criar agendamento
router.get('/cliente/:clienteId', listarAgendamentosCliente); // Listar agendamentos por cliente
router.get('/:id', buscarAgendamento); // Buscar agendamento por ID

export default router;
