import { createAgendamento, getAgendamentosByCliente, getAgendamentoById } from '../services/agendamentosServices.js';

export const criarAgendamento = async (req, res) => {
  const { cliente_id, barbeiro_id, data, hora, servicos, status } = req.body;

  if (!cliente_id || !barbeiro_id || !data || !hora || !servicos) {
    return res.status(400).json({ message: "Campos obrigatórios faltando" });
  }

  try {
    const novoAgendamento = await createAgendamento({ cliente_id, barbeiro_id, data, hora, servicos, status });
    res.status(201).json(novoAgendamento);
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    res.status(500).json({ message: "Erro ao criar agendamento", error });
  }
};

export const listarAgendamentosCliente = async (req, res) => {
  const { clienteId } = req.params;

  try {
    const agendamentos = await getAgendamentosByCliente(clienteId);
    res.status(200).json(agendamentos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar agendamentos", error });
  }
};

export const buscarAgendamento = async (req, res) => {
  const { id } = req.params;

  try {
    const agendamento = await getAgendamentoById(id);
    if (!agendamento) {
      return res.status(404).json({ message: "Agendamento não encontrado" });
    }
    res.status(200).json(agendamento);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar agendamento", error });
  }
};
