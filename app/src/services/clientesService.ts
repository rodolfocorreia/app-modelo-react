import api from './api';

export type Cliente = {
  codigo: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cpf_cnpj: string;
  cidade: string;
  estado: string;
  cep: string;
  ativo: boolean;
};

export type NovoCliente = Omit<Cliente, 'codigo' | 'ativo'>;

export const ClientesService = {
  listarClientes: async (): Promise<Cliente[]> => {
    const { data } = await api.get<Cliente[]>('/clientes');
    return data;
  },
  criarCliente: async (cliente: NovoCliente): Promise<Cliente> => {
    const { data } = await api.post<Cliente>('/clientes', cliente);
    return data;
  },
  atualizarCliente: async (codigo: number, cliente: NovoCliente): Promise<Cliente> => {
    const { data } = await api.put<Cliente>(`/clientes/${codigo}`, cliente);
    return data;
  },
  deletarCliente: async (codigo: number): Promise<void> => {
    await api.delete(`/clientes/${codigo}`);
  },
  alterarAtivoCliente: async (codigo: number, ativo: boolean): Promise<Cliente> => {
    const { data } = await api.put<Cliente>(`/clientes/${codigo}/ativo`, { ativo });
    return data;
  }
};
