// src/pages/DashboardPage.jsx
import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts';
import {
  ShoppingCart, TrendingUp, Package, DollarSign,
  Receipt, Banknote, Smartphone, AlertTriangle,
  Box, Truck, UserCheck, Users,
} from 'lucide-react';
import { useAuth } from '../store/AuthContext';
import api, { withAuth } from '../lib/axios';

// ─── Definición de las 12 tarjetas métricas ────────────────────────────────
const CARDS = [
  { key: 'ventasHoy',         label: 'VENTAS DEL DÍA',      icon: ShoppingCart,  color: '#0ea5e9', format: 'currency' },
  { key: 'ventasMes',         label: 'VENTAS DEL MES',      icon: TrendingUp,    color: '#ef4444', format: 'currency' },
  { key: 'comprasMes',        label: 'COMPRAS DEL MES',     icon: Package,       color: '#10b981', format: 'number'   },
  { key: 'utilidadMes',       label: 'UTILIDAD DEL MES',    icon: DollarSign,    color: '#8b5cf6', format: 'currency' },
  { key: 'igvMes',            label: 'IGV DEL MES',         icon: Receipt,       color: '#f97316', format: 'currency' },
  { key: 'efectivoCaja',      label: 'PEN EN CAJA',         icon: Banknote,      color: '#14b8a6', format: 'currency' },
  { key: 'yapePlin',          label: 'YAPE / PLIN',         icon: Smartphone,    color: '#f43f5e', format: 'currency' },
  { key: 'productosStockBajo',label: 'STOCK BAJO',          icon: AlertTriangle, color: '#f59e0b', format: 'number'   },
  { key: 'totalProductos',    label: 'PRODUCTOS ACTIVOS',   icon: Box,           color: '#6366f1', format: 'number'   },
  { key: 'totalProveedores',  label: 'PROVEEDORES',         icon: Truck,         color: '#84cc16', format: 'number'   },
  { key: 'totalUsuarios',     label: 'USUARIOS ACTIVOS',    icon: Users,         color: '#06b6d4', format: 'number'   },
];

const ZERO_STATS = Object.fromEntries(CARDS.map((c) => [c.key, 0]));

const fmt = (value, format) => {
  if (format === 'currency') return `S/ ${parseFloat(value || 0).toFixed(2)}`;
  return String(value || 0);
};

// ─── Tooltip personalizado del gráfico ─────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm shadow-none">
      <p className="font-semibold text-gray-700 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: S/ {parseFloat(p.value).toFixed(2)}
        </p>
      ))}
    </div>
  );
};

export default function DashboardPage() {
  const { token } = useAuth();
  const [stats,      setStats]      = useState(ZERO_STATS);
  const [chartData,  setChartData]  = useState([]);
  const [chartAnio,  setChartAnio]  = useState(new Date().getFullYear());
  const [loadStats,  setLoadStats]  = useState(true);
  const [loadChart,  setLoadChart]  = useState(true);

  useEffect(() => {
    // Stats
    api.get('/dashboard/stats', withAuth(token))
      .then(({ data }) => setStats(data))
      .catch(() => {})
      .finally(() => setLoadStats(false));

    // Chart
    api.get('/dashboard/chart', withAuth(token))
      .then(({ data }) => { setChartData(data.meses); setChartAnio(data.anio); })
      .catch(() => {})
      .finally(() => setLoadChart(false));
  }, [token]);

  return (
    <div className="p-5 space-y-5">
      {/* ─── 12 Metric Cards — 4 cols × 3 rows ─────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" id="metric-cards">
        {CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.key}
              id={`card-${card.key}`}
              className="rounded-[10px] px-4 py-4 flex items-center justify-between relative overflow-hidden"
              style={{ backgroundColor: card.color }}
            >
              {/* Left: value + label */}
              <div className="z-10">
                <p className="text-white text-2xl font-bold leading-none">
                  {loadStats ? '—' : fmt(stats[card.key], card.format)}
                </p>
                <p className="text-white/80 text-[11px] font-medium mt-1.5 uppercase tracking-wide">
                  {card.label}
                </p>
              </div>

              {/* Right: decorative icon */}
              <Icon
                size={64}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white opacity-20"
                strokeWidth={1.5}
              />
            </div>
          );
        })}
      </div>

      {/* ─── Chart panel ─────────────────────────────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-[10px] overflow-hidden">
        {/* Panel header */}
        <div className="px-5 py-3 border-b border-gray-200">
          <p className="text-[13px] font-semibold text-gray-600 uppercase tracking-wide">
            COMPARATIVA VENTAS DEL AÑO {chartAnio}
          </p>
        </div>

        {/* Chart */}
        <div className="p-4">
          {loadChart ? (
            <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
              Cargando gráfico...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                barSize={18}
                barGap={4}
              >
                <CartesianGrid vertical={false} stroke="#f0f0f0" />
                <XAxis
                  dataKey="mes"
                  tick={{ fontSize: 11, fill: '#9ca3af' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#9ca3af' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `S/${v}`}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
                <Legend
                  iconType="square"
                  iconSize={10}
                  wrapperStyle={{ fontSize: 12, color: '#6b7280' }}
                />
                <Bar dataKey="ventas"  name="Ventas"  fill="#0ea5e9" radius={[3, 3, 0, 0]} />
                <Bar dataKey="compras" name="Compras" fill="#10b981" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {!loadChart && chartData.every((d) => d.ventas === 0) && (
            <p className="text-center text-gray-400 text-xs -mt-2 pb-2">
              Sin datos de ventas aún. El gráfico se actualizará con las primeras ventas registradas.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
