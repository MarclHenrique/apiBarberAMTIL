import { prisma } from '../utils/database.js';

export const criarAgendamento = async (req, res) => {
  const { barbeiro_id, dataHora, servicos } = req.body;

  if (!barbeiro_id || !dataHora || !servicos) {
    return res.status(400).json({ message: 'Campos obrigatórios faltando' });
  }

  try {
    const [data, hora] = dataHora.split('T');
    const cliente_id = req.user.id;

    // Criar o agendamento
    const novoAgendamento = await prisma.agendamentos.create({
      data: {
        usuarios: { connect: { id: cliente_id } },
        barbeiros: { connect: { id: barbeiro_id } },
        horario: new Date(`${data}T${hora}`),
        servicos: servicos.split(',').map(servico => servico.trim()),
      }
    });

    // Converter campos BigInt para String
    const agendamentoFormatado = {
      ...novoAgendamento,
      id: novoAgendamento.id.toString(),
      cliente_id: novoAgendamento.cliente_id.toString(),
      barbeiro_id: novoAgendamento.barbeiro_id.toString(),
    };

    res.status(201).json({ 
      message: 'Agendamento criado com sucesso!', 
      agendamento: agendamentoFormatado 
    });

  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    res.status(500).json({ message: "Erro ao criar agendamento", error });
  }
};