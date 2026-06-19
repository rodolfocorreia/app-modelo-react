import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputSwitch } from 'primereact/inputswitch';
import { Button } from 'primereact/button';
import type { Cliente } from '../../../services/clientesService';

type Props = {
  clientes: Cliente[];
  onAlterarAtivo: (cliente: Cliente, ativo: boolean) => void;
  onEditar: (cliente: Cliente) => void;
  onRemover: (cliente: Cliente) => void;
};

export default function ClientesTable({ clientes, onAlterarAtivo, onEditar, onRemover }: Props) {
  return (
    <DataTable
      value={clientes}
      tableStyle={{ minWidth: '50rem' }}
      showGridlines
      paginator
      rows={5}
      rowsPerPageOptions={[5, 10, 25, 50]}
      emptyMessage="Nenhum cliente encontrado."
    >
      <Column field="nome" header="Nome" style={{ width: '30%' }} align="center" alignHeader="center" />
      <Column field="telefone" header="Telefone" style={{ width: '15%' }} align="center" alignHeader="center" />
      <Column field="cidade" header="Cidade" style={{ width: '20%' }} align="center" alignHeader="center" />
      <Column field="estado" header="Estado" style={{ width: '10%' }} align="center" alignHeader="center" />
      <Column
        header="Ativo"
        exportable={false}
        style={{ width: '5rem' }}
        align="center"
        alignHeader="center"
        body={(cliente: Cliente) => (
          <InputSwitch checked={cliente.ativo} onChange={(e) => onAlterarAtivo(cliente, e.value)} />
        )}
      />
      <Column
        header="Editar"
        exportable={false}
        style={{ width: '5rem' }}
        align="center"
        alignHeader="center"
        body={(cliente: Cliente) => (
          <Button icon="pi pi-pencil" rounded outlined onClick={() => onEditar(cliente)} />
        )}
      />
      <Column
        header="Remover"
        exportable={false}
        style={{ width: '5rem' }}
        align="center"
        alignHeader="center"
        body={(cliente: Cliente) => (
          <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => onRemover(cliente)} />
        )}
      />
    </DataTable>
  );
}
