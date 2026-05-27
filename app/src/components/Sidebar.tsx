import { Sidebar } from 'primereact/sidebar';
import { Menu } from 'primereact/menu';
import type { MenuItem } from 'primereact/menuitem';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

type SidebarComponentProps = {
    visible: boolean;
    onHide: () => void;
};

type UsuarioSalvo = {
    nome?: string;
    email?: string;
};

export default function SidebarComponent({ visible, onHide }: SidebarComponentProps) {
    const navigate = useNavigate();
    const usuarioJson = localStorage.getItem('usuario');
    const usuario: UsuarioSalvo = usuarioJson ? JSON.parse(usuarioJson) : {};

    const go = (path: string) => () => {
        onHide();
        navigate(path);
    };

    const sections: MenuItem[] = [
        {
            label: 'Navegação',
            items: [
                { label: 'Início', icon: 'pi pi-home', command: go('/') },
                { label: 'Dashboard', icon: 'pi pi-chart-line', command: onHide },
            ],
        },
        {
            label: 'Cadastros',
            items: [
                { label: 'Clientes', icon: 'pi pi-users', command: go('/clientes') },
                { label: 'Produtos', icon: 'pi pi-box', command: onHide },
            ],
        },
        {
            label: 'Sistema',
            items: [
                { label: 'Configurações', icon: 'pi pi-cog', command: onHide },
                { label: 'Ajuda', icon: 'pi pi-question-circle', command: onHide },
            ],
        },
    ];

    const nomeExibicao = usuario.nome || usuario.email || 'Usuário';
    const inicial = (nomeExibicao[0] || 'U').toUpperCase();

    return (
        <Sidebar
            visible={visible}
            onHide={onHide}
            className="app-sidebar"
            content={() => (
                <div className="sidebar-content">
                    <div className="sidebar-header">
                        <h3>Menu</h3>
                    </div>

                    <div className="sidebar-body">
                        <Menu model={sections} className="sidebar-menu" />
                    </div>

                    <div className="sidebar-footer">
                        <Avatar label={inicial} shape="circle" className="sidebar-avatar" />
                        <div className="sidebar-footer-info">
                            <span className="sidebar-footer-name">{nomeExibicao}</span>
                            {usuario.email && usuario.nome && (
                                <span className="sidebar-footer-email">{usuario.email}</span>
                            )}
                        </div>
                    </div>
                </div>
            )}
        />
    );
}
