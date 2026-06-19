import { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import type { NovoCliente } from '../services/clientesService';

export type ClienteForm = NovoCliente;

const clienteVazio: ClienteForm = {
  nome: '',
  email: '',
  telefone: '',
  endereco: '',
  cpf_cnpj: '',
  cidade: '',
  estado: '',
  cep: '',
};

type ClienteFormModalProps = {
  visivel: boolean;
  salvando?: boolean;
  clienteEditar?: ClienteForm | null;
  onFechar: () => void;
  onSalvar: (cliente: ClienteForm) => void;
};

function ClienteFormModal({ visivel, salvando = false, clienteEditar, onFechar, onSalvar }: ClienteFormModalProps) {
  const [cliente, setCliente] = useState<ClienteForm>(clienteVazio);

  useEffect(() => {
    if (!visivel) return;
    if (!clienteEditar) {
      setCliente(clienteVazio);
      return;
    }
    setCliente({
      nome: clienteEditar.nome,
      email: clienteEditar.email,
      telefone: clienteEditar.telefone,
      endereco: clienteEditar.endereco,
      cpf_cnpj: clienteEditar.cpf_cnpj,
      cidade: clienteEditar.cidade,
      estado: clienteEditar.estado,
      cep: clienteEditar.cep,
    });
  }, [visivel, clienteEditar]);

  const atualizarCampo = <K extends keyof ClienteForm>(campo: K, valor: ClienteForm[K]) => {
    setCliente(prev => ({ ...prev, [campo]: valor }));
  };

  const rodape = (
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
      <Button label="Cancelar" icon="pi pi-times" outlined onClick={onFechar} disabled={salvando} />
      <Button
        label="Salvar"
        icon="pi pi-check"
        loading={salvando}
        onClick={() => onSalvar(cliente)}
      />
    </div>
  );

  return (
    <Dialog
      header="Cadastro de Cliente"
      visible={visivel}
      onHide={onFechar}
      style={{ width: '40rem' }}
      modal
      footer={rodape}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', paddingTop: '0.5rem' }}>
        <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label htmlFor="nome">Nome</label>
          <InputText
            id="nome"
            value={cliente.nome}
            onChange={e => atualizarCampo('nome', e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label htmlFor="email">E-mail</label>
          <InputText
            id="email"
            value={cliente.email}
            onChange={e => atualizarCampo('email', e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label htmlFor="telefone">Telefone</label>
          <InputText
            id="telefone"
            value={cliente.telefone}
            onChange={e => atualizarCampo('telefone', e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label htmlFor="cpf_cnpj">CPF/CNPJ</label>
          <InputText
            id="cpf_cnpj"
            value={cliente.cpf_cnpj}
            onChange={e => atualizarCampo('cpf_cnpj', e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label htmlFor="cep">CEP</label>
          <InputText
            id="cep"
            value={cliente.cep}
            onChange={e => atualizarCampo('cep', e.target.value)}
          />
        </div>
        <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label htmlFor="endereco">Endereço</label>
          <InputText
            id="endereco"
            value={cliente.endereco}
            onChange={e => atualizarCampo('endereco', e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label htmlFor="cidade">Cidade</label>
          <InputText
            id="cidade"
            value={cliente.cidade}
            onChange={e => atualizarCampo('cidade', e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label htmlFor="estado">Estado (UF)</label>
          <InputText
            id="estado"
            value={cliente.estado}
            maxLength={2}
            onChange={e => atualizarCampo('estado', e.target.value.toUpperCase())}
          />
        </div>
      </div>
    </Dialog>
  );
}

export default ClienteFormModal;
