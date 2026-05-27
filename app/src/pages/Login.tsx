import { useEffect, useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { AxiosError } from 'axios';
import api from '../services/api';

type LoginProps = {
  onLoginSuccess: () => void;
};

function Login({ onLoginSuccess }: LoginProps) {
  const toast = useRef<Toast>(null);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (erro) {
      toast.current?.show({
        severity: 'error',
        summary: 'Erro',
        detail: erro,
      });
    }
  }, [erro]);

  async function handleSubmit(event: any) {
    event.preventDefault();
    setErro(null);
    setCarregando(true);

    try {
      const { data } = await api.post<{ token: string; user: unknown }>(
        '/auth/login',
        { email, senha }
      );

      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.user));

      onLoginSuccess();
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        setErro('Email ou senha inválidos');
      } else {
        setErro('Não foi possível conectar ao servidor');
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="div-card-login">
      <Card title="Login" className="p-card-login">
        <form onSubmit={handleSubmit} className="p-form">
          <span className="p-float-label">
            <InputText
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%' }}
            />
            <label htmlFor="email">Email</label>
          </span>

          <span className="p-float-label">
            <Password
              inputId="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              feedback={false}
              toggleMask
              required
              inputStyle={{ width: '100%' }}
              style={{ width: '100%' }}
            />
            <label htmlFor="senha">Senha</label>
          </span>

          <Button
            type="submit"
            label="Entrar"
            icon="pi pi-sign-in"
            loading={carregando}
          />
        </form>
      </Card>

      <Toast ref={toast} />
    </div>
  );
}

export default Login;