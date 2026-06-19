import { useState } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';
import Header from '../../components/Header';
import ClienteFormModal from '../../modals/ClienteFormModal';
import type { ClienteForm } from '../../modals/ClienteFormModal';
import type { Cliente } from '../../services/clientesService';
import ClientesTable from './components/ClientesTable';
import { useClientes } from './hooks/useClientes';
import './Clientes.css';

type ClientesProps = {
  onLogout: () => void;
};

function Clientes({ onLogout }: ClientesProps) {
  const [clienteEditar, setClienteEditar] = useState<Cliente | null>(null);
  const [dialogVisivel, setDialogVisivel] = useState(false);
  const { clientes, salvando, toast, salvar, alterarAtivo, confirmarDelete } = useClientes();

  const handleSalvar = async (form: ClienteForm) => {
    const ok = await salvar(form, clienteEditar?.codigo);
    if (ok) setDialogVisivel(false);
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Toast ref={toast} position="bottom-center" />
      <ConfirmDialog />
      <Header onLogout={onLogout} />
      <main style={{ flex: 1, padding: '2rem', overflow: 'auto' }}>
        <ClientesTable
          clientes={clientes}
          onAlterarAtivo={alterarAtivo}
          onEditar={(cliente) => {
            setClienteEditar(cliente);
            setDialogVisivel(true);
          }}
          onRemover={confirmarDelete}
        />

        <Button
          icon="pi pi-plus"
          rounded
          onClick={() => {
            setClienteEditar(null);
            setDialogVisivel(true);
          }}
          style={{
            position: 'fixed',
            right: '2rem',
            bottom: '2rem',
            width: '4rem',
            height: '4rem',
          }}
        />

        <ClienteFormModal
          visivel={dialogVisivel}
          salvando={salvando}
          onFechar={() => setDialogVisivel(false)}
          onSalvar={handleSalvar}
          clienteEditar={clienteEditar}
        />
      </main>
    </div>
  );
}

export default Clientes;
