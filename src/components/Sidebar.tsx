'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/AuthContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, ShoppingCart, Package, Users, Truck,
  ClipboardList, BarChart3, Shield, LogOut, Menu, X, Warehouse,
  FileSpreadsheet, FileText, ClipboardCheck, UserCheck, FileSearch, DollarSign, Bell,
} from 'lucide-react'
import NotificationBell from './NotificationBell'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'VENDEDOR', 'ALMACENERO', 'GERENTE'] },
  { href: '/pos', label: 'Punto de Venta', icon: ShoppingCart, roles: ['VENDEDOR', 'ADMIN'] },
  { href: '/ventas', label: 'Historial Ventas', icon: FileText, roles: ['VENDEDOR', 'ADMIN', 'GERENTE'] },
  { href: '/admin/usuarios', label: 'Usuarios', icon: Users, roles: ['ADMIN'] },
  { href: '/admin/proveedores', label: 'Proveedores', icon: Truck, roles: ['ADMIN'] },
  { href: '/almacen/productos', label: 'Productos', icon: Package, roles: ['ALMACENERO', 'ADMIN'] },
  { href: '/almacen/entradas', label: 'Entradas', icon: ClipboardList, roles: ['ALMACENERO', 'ADMIN'] },
  { href: '/almacen/bajas', label: 'Bajas', icon: FileText, roles: ['ALMACENERO', 'ADMIN'] },
  { href: '/almacen/solicitudes', label: 'Solicitudes', icon: ClipboardCheck, roles: ['ALMACENERO', 'ADMIN', 'GERENTE'] },
  { href: '/almacen/recepciones', label: 'Recepciones', icon: Warehouse, roles: ['ALMACENERO', 'ADMIN'] },
  { href: '/gerencia/dashboard', label: 'Gerencia', icon: BarChart3, roles: ['GERENTE', 'ADMIN'] },
  { href: '/gerencia/solicitudes', label: 'G. Solicitudes', icon: UserCheck, roles: ['GERENTE', 'ADMIN'] },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [pendientesCount, setPendientesCount] = useState(0)

  useEffect(() => {
    fetch('/api/almacen/solicitudes/count?estado=APROBADA')
      .then((r) => r.json())
      .then((d) => setPendientesCount(d.count || 0))
      .catch(() => {})
    const interval = setInterval(() => {
      fetch('/api/almacen/solicitudes/count?estado=APROBADA')
        .then((r) => r.json())
        .then((d) => setPendientesCount(d.count || 0))
        .catch(() => {})
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  if (!user) return null

  const items = navItems.filter((item) => item.roles.includes(user.rol))

  return (
    <>
      <input type="checkbox" id="sidebar-toggle" className="hidden peer" />
      <label htmlFor="sidebar-toggle" className="fixed inset-0 bg-black/50 z-30 hidden peer-checked:block lg:hidden">
        <span className="sr-only">Cerrar menú</span>
      </label>

      <aside className="fixed top-0 left-0 z-40 h-screen w-64 bg-gray-900 text-white transform -translate-x-full peer-checked:translate-x-0 transition-transform lg:translate-x-0 lg:static lg:z-auto flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div>
            <h2 className="font-bold text-lg">Sistema Ventas</h2>
            <p className="text-sm text-gray-400 capitalize">{user.rol.toLowerCase()}</p>
          </div>
          <div className="flex items-center gap-1">
            <div className="[&_button]:text-white [&_.text-gray-600]:text-gray-300"><NotificationBell /></div>
            <label htmlFor="sidebar-toggle" className="lg:hidden cursor-pointer p-1 hover:bg-gray-700 rounded">
              <X size={20} />
            </label>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {items.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                  active ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon size={18} />
                {label}
                {href === '/almacen/recepciones' && pendientesCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                    {pendientesCount > 99 ? '99+' : pendientesCount}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
              {user.nombre.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.nombre}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition cursor-pointer"
          >
            <LogOut size={16} /> Cerrar Sesión
          </button>
        </div>
      </aside>
    </>
  )
}

export function HeaderToggle() {
  return (
    <label htmlFor="sidebar-toggle" className="lg:hidden cursor-pointer p-2 hover:bg-gray-100 rounded-lg">
      <Menu size={24} />
    </label>
  )
}
