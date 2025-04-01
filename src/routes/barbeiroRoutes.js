import express from 'express';
import { prisma } from '../utils/database.js';

const router = express.Router();

// Rota para obter todos os barbeiros
router.get('/barbeiros', async (req, res) => {
  try {
    const barbeiros = await prisma.barbeiros.findMany({
      include: {
        usuarios: {
          select: {
            nome: true,
            email: true
          }
        }
      }
    });

    const barbeirosFormatados = barbeiros.map(barbeiro => ({
      id: barbeiro.id.toString(),
      nome: barbeiro.usuarios.nome,
      especialidades: barbeiro.especialidades.join(', '),
      atendeDomicilio: barbeiro.atende_domicilio ? 'Sim' : 'Não',
      servicos: barbeiro.servicos_oferecidos.join(', '),
      localizacao: barbeiro.localizacao,
      foto: barbeiro.foto_perfil || 'assets/default-barber.jpg'
    }));

    res.status(200).json(barbeirosFormatados);

  } catch (error) {
    console.error('Erro ao buscar barbeiros:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
});

export default router;