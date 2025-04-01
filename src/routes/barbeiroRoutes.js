import express from 'express';
import { prisma } from '../utils/database.js';

const router = express.Router();

// Rota corrigida ↓
router.get('/barbeiros', async (req, res) => {
  try {
    const barbeiros = await prisma.barbeiros.findMany({
      include: {
        usuarios: {
          select: {
            nome: true
          }
        }
      }
    });

    const formatado = barbeiros.map(b => ({
      id: b.id.toString(),
      nome: b.usuarios.nome,
      especialidades: b.especialidades,
      atende_domicilio: b.atende_domicilio,
      servicos_oferecidos: b.servicos_oferecidos,
      localizacao: b.localizacao,
      foto_perfil: b.foto_perfil || 'assets/default-barber.jpg'
    }));

    res.status(200).json(formatado);

  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ 
      message: 'Erro interno',
      error: error.message 
    });
  }
});

export default router;