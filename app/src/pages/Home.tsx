import Header from '../components/Header';

type HomeProps = {
  onLogout: () => void;
};

function Home({ onLogout }: HomeProps) {
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
      </main>
    </div>
  );
}

export default Home;
