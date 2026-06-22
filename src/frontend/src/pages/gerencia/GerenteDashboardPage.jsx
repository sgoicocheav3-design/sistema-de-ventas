// src/pages/gerencia/GerenteDashboardPage.jsx
import { useState, useEffect } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import {
  DollarSign, AlertTriangle, Users, ClipboardList,
  Receipt, Package, TrendingUp, BarChart2,
} from 'lucide-react';
import { useAuth } from '../../store/AuthContext';
import api, { withAuth } from '../../lib/axios';

// ─── KPI cards definition ─────────────────────────────────────────────────────
const KPI_CARDS = [
  { key: 'ingresosHoy',          label: 'Ingresos Hoy',          icon: DollarSign,    color: '#0ea5e9', format: 'currency' },
  { key: 'alertasStock',         label: 'Alertas Stock',         icon: AlertTriangle, color: '#f59e0b', format: 'number'   },
  { key: 'totalClientes',        label: 'Total Clientes',        icon: Users,         color: '#10b981', format: 'number'   },
  { key: 'solicitudesPendientes',label: 'Solicitudes Pend.',     icon: ClipboardList, color: '#8b5cf6', format: 'number'   },
  { key: 'ticketPromedio',       label: 'Ticket Promedio',       icon: Receipt,       color: '#ef4444', format: 'currency' },
  { key: 'valorInventario',      label: 'Valor Inventario',      icon: Package,       color: '#06b6d4', format: 'currency' },
];

const fmt = (value, format) => {
  if (format === 'currency') return `S/ ${parseFloat(value || 0).toFixed(2)}`;
  return String(value || 0);
};

const PIE_COLORS = ['#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];

const CHART_TYPES = [
  { value: 'barras',  label: 'Barras',  emoji: '📊' },
  { value: 'lineas',  label: 'Líneas',  emoji: '📈' },
  { value: 'pastel',  label: 'Pastel',  emoji: '🥧' },
];

const PERIODS = [
  { value: 'semana', label: 'Última semana' },
  { value: 'mes',    label: 'Último mes' },
];

// ─── Custom tooltip ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm shadow-lg">
      <p className="font-semibold text-gray-700 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {typeof p.value === 'number' && p.name !== 'Cantidad'
            ? `S/ ${p.value.toFixed(2)}`
            : p.value}
        </p>
      ))}
    </div>
  );
};

export default function GerenteDashboardPage() {
  const { token } = useAuth();

  const [kpis, setKpis]           = useState({});
  const [loadKpis, setLoadKpis]   = useState(true);
  const [chartType, setChartType] = useState('barras');
  const [periodo, setPeriodo]     = useState('semana');
  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData]     = useState(null);
  const [loadChart, setLoadChart] = useState(true);

  // ─── Fetch KPIs ─────────────────────────────────────────────────────────
  useEffect(() => {
    api.get('/gerencia/dashboard/kpis', withAuth(token))
      .then(({ data }) => setKpis(data))
      .catch(() => {})
      .finally(() => setLoadKpis(false));
  }, [token]);

  // ─── Fetch chart data ───────────────────────────────────────────────────
  useEffect(() => {
    setLoadChart(true);
    api.get(`/gerencia/dashboard/graficos?tipo=${chartType}&periodo=${periodo}`, withAuth(token))
      .then(({ data }) => {
        setChartData(data.datos || []);
        setPieData(data.datosPastel || null);
      })
      .catch(() => { setChartData([]); setPieData(null); })
      .finally(() => setLoadChart(false));
  }, [token, chartType, periodo]);

  // ─── Render chart ───────────────────────────────────────────────────────
  const renderChart = () => {
    if (loadChart) {
      return (
        <div className="flex items-center justify-center h-72 text-gray-400 text-sm">
          Cargando gráfico...
        </div>
      );
    }

    if (chartType === 'pastel' && pieData) {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="total"
              nameKey="metodo"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ metodo, total }) => `${metodo}: S/${total.toFixed(0)}`}
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(v) => `S/ ${parseFloat(v).toFixed(2)}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === 'lineas') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="etiqueta" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={(v) => `S/${v}`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="square" iconSize={10} wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="total" name="Ventas (S/)" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            <Line type="monotone" dataKey="cantidad" name="Cantidad" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    // Default: barras
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }} barSize={20}>
          <CartesianGrid vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="etiqueta" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={(v) => `S/${v}`} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
          <Legend iconType="square" iconSize={10} wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="total" name="Ventas (S/)" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
          <Bar dataKey="cantidad" name="Cantidad" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="p-5 space-y-5">
      {/* ─── 6 KPI Cards ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3" id="kpi-cards">
        {KPI_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.key}
              id={`kpi-${card.key}`}
              className="rounded-xl px-4 py-4 relative overflow-hidden"
              style={{ backgroundColor: card.color }}
            >
              <div className="z-10 relative">
                <p className="text-white text-xl font-bold leading-none">
                  {loadKpis ? '—' : fmt(kpis[card.key], card.format)}
                </p>
                <p className="text-white/80 text-[10px] font-medium mt-1.5 uppercase tracking-wide">
                  {card.label}
                </p>
              </div>
              <Icon
                size={52}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-white opacity-15"
                strokeWidth={1.5}
              />
            </div>
          );
        })}
      </div>

      {/* ─── Chart Panel ─────────────────────────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {/* Header with selectors */}
        <div className="px-5 py-3 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-sky-600" />
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Ventas por período
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {/* Period selector */}
            <select
              id="select-periodo"
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              className="px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {PERIODS.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>

            {/* Chart type selector */}
            <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
              {CHART_TYPES.map((ct) => (
                <button
                  key={ct.value}
                  id={`btn-chart-${ct.value}`}
                  onClick={() => setChartType(ct.value)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                    chartType === ct.value
                      ? 'bg-white text-sky-700 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {ct.emoji} {ct.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chart body */}
        <div className="p-4">
          {renderChart()}
          {!loadChart && chartData.length > 0 && chartData.every((d) => d.total === 0) && (
            <p className="text-center text-gray-400 text-xs mt-2">
              Sin datos de ventas en este período.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
