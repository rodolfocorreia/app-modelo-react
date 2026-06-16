import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import SidebarComponent from './Sidebar';
import './Header.css';

type HeaderProps = {
  onLogout: () => void;
};

export default function Header({ onLogout }: HeaderProps) {
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(
    () => localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('theme');
    onLogout();
  }

  return (
    <header>
      <Button
        icon="pi pi-bars"
        onClick={() => setSidebarVisible(true)}
        size="small"
        rounded
        text
        aria-label="Abrir menu"
      />

      <div className="header-actions">
        <Button
          icon={isDark ? 'pi pi-sun' : 'pi pi-moon'}
          onClick={() => setIsDark((v) => !v)}
          size="small"
          rounded
          text
          aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
        />

        <Button
          label="Sair"
          icon="pi pi-sign-out"
          className="p-button-logout"
          onClick={handleLogout}
          size="small"
          outlined
        />
      </div>

      <SidebarComponent
        visible={sidebarVisible}
        onHide={() => setSidebarVisible(false)}
      />
    </header>
  );
}
