// src/components/Layout.jsx
import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';
import api, { withAuth } from '../lib/axios';
import {
  LayoutDashboard, Users, Package, Truck, Tag,
  ShoppingCart, BarChart2, ArrowDownToLine, ClipboardList,
  LogOut, ChevronRight, Menu, X, User, ArrowUpFromLine,
  RefreshCw, Inbox, History, FileText, Shield, Settings, Database,
} from 'lucide-react';

// ─── Navegación por rol ─────────────────────────────────────────────────────
const NAV_BY_ROLE = {
  ADMIN: [
    { icon: LayoutDashboard, label: 'Dashboard',       to: '/admin' },
    { icon: Users,           label: 'Usuarios',        to: '/admin/usuarios' },
    { icon: Truck,           label: 'Proveedores',     to: '/admin/proveedores' },
    { icon: Package,         label: 'Productos',       to: '/almacen/productos' },
    { icon: Tag,             label: 'Categorías',      to: '/admin/categorias' },
    { icon: FileText,        label: 'Reporte Ventas',  to: '/admin/reportes/ventas' },
    { icon: Settings,        label: 'Configuración',   to: '/admin/configuracion' },
  ],
  GERENTE: [
    { icon: LayoutDashboard, label: 'Dashboard',       to: '/gerente' },
    { icon: BarChart2,       label: 'Dashboard KPIs',  to: '/gerente/dashboard' },
    { icon: ClipboardList,   label: 'Solicitudes',     to: '/gerencia/solicitudes' },
    { icon: Database,        label: 'Cierre de Caja',  to: '/gerente/cierre-caja' },
    { icon: Shield,          label: 'Auditoría',       to: '/gerente/auditoria' },
  ],
  VENDEDOR: [
    { icon: ShoppingCart,    label: 'Punto de Venta', to: '/pos' },
    { icon: Database,        label: 'Cierre de Caja', to: '/gerente/cierre-caja' },
  ],
  ALMACENERO: [
    { icon: LayoutDashboard,  label: 'Dashboard',           to: '/almacen' },
    { icon: Package,          label: 'Productos',           to: '/almacen/productos' },
    { icon: RefreshCw,        label: 'Reposición',          to: '/almacen/reposicion' },
    { icon: Inbox,            label: 'Recepciones',         to: '/almacen/recepciones', badgeKey: 'recepciones' },
    { icon: ArrowDownToLine,  label: 'Historial Entradas',  to: '/almacen/entradas' },
    { icon: ArrowUpFromLine,  label: 'Historial Bajas',     to: '/almacen/bajas' },
    { icon: History,          label: 'Mis Solicitudes',     to: '/almacen/historial-solicitudes' },
  ],
};

const ROL_LABEL = {
  ADMIN:      'Administrador',
  GERENTE:    'Gerente',
  VENDEDOR:   'Vendedor',
  ALMACENERO: 'Almacenero',
};

// ─── Colores de fondo del sidebar ───────────────────────────────────────────
const SIDEBAR_BG   = '#1e2a38';
const SIDEBAR_DARK = '#192230';

export default function Layout() {
  const { usuario, token, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [badges, setBadges] = useState({});

  const navItems = NAV_BY_ROLE[usuario?.rol] || [];

  // Fetch badge counts
  useEffect(() => {
    if (!token) return;
    const fetchBadges = async () => {
      try {
        if (['ALMACENERO', 'ADMIN'].includes(usuario?.rol)) {
          const { data } = await api.get('/almacen/recepciones/pendientes/count', withAuth(token));
          setBadges((prev) => ({ ...prev, recepciones: data.count }));
        }
      } catch {}
    };
    fetchBadges();
    const interval = setInterval(fetchBadges, 60000); // refresh every 60s
    return () => clearInterval(interval);
  }, [token, usuario?.rol]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // ─── Sidebar content ──────────────────────────────────────────────────────
  const SidebarContent = () => (
    <div className="flex flex-col h-full" style={{ background: SIDEBAR_BG }}>
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center flex-shrink-0">
            <ShoppingCart size={16} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">MiniMarket</p>
            <p className="text-sky-400 text-[10px] mt-0.5 leading-none tracking-wide">SISTEMA ERP</p>
          </div>
        </div>
      </div>

      {/* User info */}
      <div className="px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
            <User size={14} className="text-white/70" />
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-semibold truncate">{usuario?.nombre}</p>
            <p className="text-sky-400 text-[10px] tracking-wider mt-0.5">
              {ROL_LABEL[usuario?.rol] || usuario?.rol}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 overflow-y-auto">
        <p className="px-5 text-[9px] text-white/30 uppercase tracking-widest mb-2 font-semibold">
          Menú principal
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to.split('/').length <= 2}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-2.5 text-[13px] transition-all border-l-2 ${
                  isActive
                    ? 'border-sky-400 bg-white/10 text-white font-medium'
                    : 'border-transparent text-white/50 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={16} className={isActive ? 'text-sky-400' : 'text-white/40'} />
                  <span className="flex-1">{item.label}</span>
                  {item.badgeKey && badges[item.badgeKey] > 0 && (
                    <span className="bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {badges[item.badgeKey]}
                    </span>
                  )}
                  <ChevronRight
                    size={12}
                    className={isActive ? 'text-sky-400' : 'text-white/20'}
                  />
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/10" style={{ background: SIDEBAR_DARK }}>
        <button
          id="btn-logout"
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 text-[13px] transition-all"
        >
          <LogOut size={15} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* ─── Sidebar desktop ────────────────────────────────────────────────── */}
      <aside
        className="hidden lg:flex flex-col flex-shrink-0"
        style={{ width: 220, background: SIDEBAR_BG }}
      >
        <SidebarContent />
      </aside>

      {/* ─── Sidebar mobile overlay ─────────────────────────────────────────── */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Drawer */}
          <aside
            className="relative flex flex-col z-10"
            style={{ width: 220, background: SIDEBAR_BG }}
          >
            <button
              className="absolute top-3 right-3 text-white/50 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={18} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* ─── Main area ──────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 h-12 flex items-center justify-between px-4 flex-shrink-0">
          <button
            id="btn-hamburger"
            className="text-gray-500 hover:text-gray-800 transition-colors lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          <span className="hidden lg:block text-gray-400 text-xs">
            {new Date().toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>

          {/* User pill */}
          <div className="flex items-center gap-2.5 text-sm">
            <div className="w-7 h-7 rounded-full bg-sky-100 flex items-center justify-center">
              <User size={13} className="text-sky-600" />
            </div>
            <span className="text-gray-700 font-medium hidden sm:block">{usuario?.nombre}</span>
            <span className="text-[10px] text-white bg-sky-500 rounded-full px-2 py-0.5 font-medium tracking-wide hidden sm:block">
              {usuario?.rol}
            </span>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
