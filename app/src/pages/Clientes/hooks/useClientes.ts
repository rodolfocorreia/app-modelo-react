import { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { confirmDialog } from 'primereact/confirmdialog';
import { ClientesService, type Cliente } from '../../../services/clientesService';
import type { ClienteForm } from '../../../modals/ClienteFormModal';

export function useClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [salvando, setSalvando] = useState(false);
  const toast = useRef<Toast>(null);

  const notificar = (sucesso: boolean, detail: string) =>
    toast.current?.show({
      severity: sucesso ? 'success' : 'error',
      summary: sucesso ? 'Sucesso' : 'Erro',
      detail,
      life: 1000,
    });

  const carregar = () =>
    ClientesService.listarClientes().then(setClientes);

  useEffect(() => {
    carregar();
  }, []);

  const salvar = async (cliente: ClienteForm, codigo?: number): Promise<boolean> => {
    setSalvando(true);
    try {
      if (codigo) {
        await ClientesService.atualizarCliente(codigo, cliente);
        notificar(true, 'Cliente atualizado com sucesso.');
      } else {
        await ClientesService.criarCliente(cliente);
        notificar(true, 'Cliente cadastrado com sucesso.');
      }
      await carregar();
      return true;
    } catch {
      notificar(false, 'Não foi possível salvar o cliente.');
      return false;
    } finally {
      setSalvando(false);
    }
  };

  const alterarAtivo = async (cliente: Cliente, ativo: boolean) => {
    try {
      await ClientesService.alterarAtivoCliente(cliente.codigo, ativo);
      notificar(true, 'Cliente atualizado com sucesso.');
      carregar();
    } catch {
      notificar(false, 'Não foi possível atualizar o cliente.');
    }
  };

  const deletar = async (cliente: Cliente) => {
    try {
      await ClientesService.deletarCliente(cliente.codigo);
      notificar(true, 'Cliente deletado com sucesso.');
      carregar();
    } catch {
      notificar(false, 'Não foi possível deletar o cliente.');
    }
  };

  const confirmarDelete = (cliente: Cliente) =>
    confirmDialog({
      message: `Deseja realmente excluir o cliente "${cliente.nome}"?`,
      header: 'Confirmação de exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptClassName: 'p-button-danger',
      accept: () => deletar(cliente),
    });

  return { clientes, salvando, toast, salvar, alterarAtivo, confirmarDelete };
}
