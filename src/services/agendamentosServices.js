import { prisma } from '../utils/database.js';

export const createAgendamento = async (dados) => {
    const { cliente_id, barbeiro_id, data, hora, servicos, status } = dados;
  
    // Verificação de dados obrigatórios
    if (!cliente_id || !barbeiro_id || !data || !hora || !servicos || !status) {
      throw new Error('Campos obrigatórios faltando');
    }
  
    // Converte 'data' para Date
    const parsedData = new Date(data);  
  
    // Extrai a hora e os minutos da string
    const [horaParte, minutos] = hora.split(":");
  
    // Verificar se a hora está no intervalo permitido
    if (horaParte < 0 || horaParte > 23 || minutos < 0 || minutos > 59) {
      throw new Error('Hora fora do intervalo permitido');
    }
  
    // Configura a hora na data
    parsedData.setHours(horaParte, minutos, 0, 0);  // Define a hora e minuto na data (DateTime)
  
    // Verifica se a data e hora são válidas
    if (isNaN(parsedData.getTime())) {
      throw new Error('Data ou hora inválida');
    }
    
    // Converte hora para o formato Time (HH:mm:ss)
    const parsedHora = `${horaParte}:${minutos}:00`; // Exemplo: "14:00:00"
  
    // Criação do agendamento com os dados ajustados
    return await prisma.agendamentos.create({
      data: {
        cliente_id: cliente_id,
        barbeiro_id: barbeiro_id,
        data: parsedData,  // A data agora é um DateTime completo
        hora: parsedHora,  // A hora agora é uma string com formato HH:mm:ss
        servicos: servicos,
        status: status
      }
    });
  };


export const getAgendamentosByCliente = async (clienteId) => {
  return await prisma.agendamentos.findMany({
    where: { cliente_id: clienteId },
    include: { barbeiro: true } // Incluindo informações do barbeiro
  });
};

export const getAgendamentoById = async (id) => {
  return await prisma.agendamentos.findUnique({
    where: { id: BigInt(id) },
    include: { cliente: true, barbeiro: true }
  });
};
