import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';
import Login from './pages/Login';
import Home from './pages/Home';
import api from './services/api';
import Clientes from './pages/Clientes';

type AuthStatus = 'verificando' | 'autenticado' | 'naoAutenticado';

function App() {
  const [status, setStatus] = useState<AuthStatus>(() => {
    if (localStorage.getItem('token')) return 'verificando';
    localStorage.removeItem('usuario');
    return 'naoAutenticado';
  });

  useEffect(() => {
    if (status !== 'verificando') return;

    let cancelado = false;
    (async () => {
      try {
        const { data } = await api.get('/auth/me');
        if (cancelado) return;
        localStorage.setItem('usuario', JSON.stringify(data));
        setStatus('autenticado');
      } catch {
        if (cancelado) return;
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        setStatus('naoAutenticado');
      }
    })();

    return () => {
      cancelado = true;
    };
  }, [status]);

  if (status === 'verificando') {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ProgressSpinner />
      </div>
    );
  }

  const autenticado = status === 'autenticado';

  return (
    <Routes>
      <Route
        path="/login"
        element={
          autenticado ? (
            <Navigate to="/" replace />
          ) : (
            <LoginRoute onLoginSuccess={() => setStatus('autenticado')} />
          )
        }
      />
      <Route path="/clientes" element={<Clientes onLogout={() => setStatus('naoAutenticado')} />} />
      <Route
        path="/"
        element={
          autenticado ? (
            <HomeRoute
              onLogout={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('usuario');
                setStatus('naoAutenticado');
              }}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function LoginRoute({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const navigate = useNavigate();
  return (
    <Login
      onLoginSuccess={() => {
        onLoginSuccess();
        navigate('/', { replace: true });
      }}
    />
  );
}

function HomeRoute({ onLogout }: { onLogout: () => void }) {
  const navigate = useNavigate();
  return (
    <Home
      onLogout={() => {
        onLogout();
        navigate('/login', { replace: true });
      }}
    />
  );
}

export default App;
