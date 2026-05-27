import Header from '../components/Header';

type ClientesProps = {
  onLogout: () => void;
};

function Clientes({ onLogout }: ClientesProps) {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Header onLogout={onLogout} />
      <main style={{ flex: 1, padding: '2rem', overflow: 'auto' }}>
        <p>teste</p>
      </main>
    </div>
  );
}

export default Clientes;
