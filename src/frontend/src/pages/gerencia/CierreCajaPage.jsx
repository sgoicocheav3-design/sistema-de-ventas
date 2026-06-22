// src/pages/gerencia/CierreCajaPage.jsx
import { useState, useEffect } from 'react';
import { Calendar, DollarSign, FileDown, Receipt, CreditCard } from 'lucide-react';
import { useAuth } from '../../store/AuthContext';
import api, { withAuth } from '../../lib/axios';

const fmt = (n) => `S/ ${parseFloat(n || 0).toFixed(2)}`;

const METODO_CONFIG = {
  EFECTIVO: { label: 'Efectivo',  emoji: '💵', color: '#10b981', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  YAPE:     { label: 'Yape',      emoji: '📱', color: '#8b5cf6', bg: 'bg-purple-50',  text: 'text-purple-700',  border: 'border-purple-200' },
  PLIN:     { label: 'Plin',      emoji: '📲', color: '#0ea5e9', bg: 'bg-sky-50',     text: 'text-sky-700',     border: 'border-sky-200' },
  TARJETA:  { label: 'Tarjeta',   emoji: '💳', color: '#f59e0b', bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200' },
};

export default function CierreCajaPage() {
  const { token } = useAuth();

  const [fecha, setFecha]       = useState(new Date().toISOString().split('T')[0]);
  const [data, setData]         = useState(null);
  const [loading, setLoading]   = useState(true);

  // ─── Fetch cierre data ──────────────────────────────────────────────
  const fetchCierre = async (f) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/gerencia/reportes/cierre-caja?fecha=${f}`, withAuth(token));
      setData(data);
    } catch {
      setData(null);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchCierre(fecha); }, [token, fecha]);

  // ─── Export PDF (client-side) ─────────────────────────────────────────
  const exportPDF = async () => {
    if (!data) return;
    try {
      const pdfMakeLib = await import('pdfmake/build/pdfmake');
      const pdfFonts   = await import('pdfmake/build/vfs_fonts');
      const pdfMake = pdfMakeLib.default;
      pdfMake.vfs = pdfFonts.default?.pdfMake?.vfs || pdfFonts.pdfMake?.vfs || pdfFonts.default?.vfs;

      const desgloseRows = Object.entries(data.desglose || {}).map(([metodo, info]) => [
        { text: METODO_CONFIG[metodo]?.label || metodo, fontSize: 10 },
        { text: String(info.cantidad), fontSize: 10, alignment: 'center' },
        { text: fmt(info.total), fontSize: 10, alignment: 'right', bold: true },
      ]);

      const docDef = {
        pageSize: 'A4',
        pageMargins: [40, 40, 40, 40],
        content: [
          { text: 'Cierre de Caja — MiniMarket System', fontSize: 16, bold: true, margin: [0, 0, 0, 4] },
          { text: `Fecha: ${data.fecha} | Generado: ${new Date().toLocaleString('es-PE')}`, fontSize: 9, color: '#64748b', margin: [0, 0, 0, 16] },

          { text: 'Desglose por Método de Pago', fontSize: 12, bold: true, margin: [0, 0, 0, 8] },
          {
            table: {
              headerRows: 1,
              widths: ['*', 80, 100],
              body: [
                [
                  { text: 'Método', bold: true, fontSize: 9, fillColor: '#e2e8f0' },
                  { text: 'Cantidad', bold: true, fontSize: 9, fillColor: '#e2e8f0', alignment: 'center' },
                  { text: 'Total', bold: true, fontSize: 9, fillColor: '#e2e8f0', alignment: 'right' },
                ],
                ...desgloseRows,
              ],
            },
            layout: {
              hLineWidth: () => 0.5,
              vLineWidth: () => 0.5,
              hLineColor: () => '#cbd5e1',
              vLineColor: () => '#cbd5e1',
            },
          },

          { text: ' ', margin: [0, 12] },
          { text: 'Resumen', fontSize: 12, bold: true, margin: [0, 0, 0, 8] },
          {
            table: {
              widths: ['*', 120],
              body: [
                [{ text: 'Total General', fontSize: 11, bold: true }, { text: fmt(data.totalGeneral), fontSize: 11, bold: true, alignment: 'right' }],
                [{ text: 'Cantidad de Ventas', fontSize: 10 }, { text: String(data.cantidadVentas), fontSize: 10, alignment: 'right' }],
                [{ text: 'Ticket Promedio', fontSize: 10 }, { text: fmt(data.ticketPromedio), fontSize: 10, alignment: 'right' }],
              ],
            },
            layout: 'lightHorizontalLines',
          },
        ],
        defaultStyle: { font: 'Roboto' },
      };

      pdfMake.createPdf(docDef).download(`cierre_caja_${data.fecha}.pdf`);
    } catch (e) {
      console.error('PDF error:', e);
      alert('Error al generar el PDF.');
    }
  };

  return (
    <div className="p-5 space-y-5">
      {/* ─── Header ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Receipt size={20} className="text-sky-600" />
          Cierre de Caja
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-gray-400" />
            <input
              id="cierre-fecha"
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <button
            id="btn-export-cierre-pdf"
            onClick={exportPDF}
            disabled={!data || data.cantidadVentas === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 disabled:opacity-50 transition-all"
          >
            <FileDown size={13} /> Exportar PDF
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48 text-gray-400 text-sm">Cargando...</div>
      ) : !data ? (
        <div className="flex items-center justify-center h-48 text-gray-400 text-sm">Error al cargar datos</div>
      ) : (
        <>
          {/* ─── Summary cards ────────────────────────────────────────────── */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white border border-gray-200 rounded-xl px-5 py-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total General</p>
              <p className="text-2xl font-bold text-gray-900">{fmt(data.totalGeneral)}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl px-5 py-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Ventas Realizadas</p>
              <p className="text-2xl font-bold text-sky-600">{data.cantidadVentas}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl px-5 py-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Ticket Promedio</p>
              <p className="text-2xl font-bold text-violet-600">{fmt(data.ticketPromedio)}</p>
            </div>
          </div>

          {/* ─── Payment breakdown ────────────────────────────────────────── */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-200">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-2">
                <CreditCard size={15} className="text-sky-600" />
                Desglose por Método de Pago
              </h2>
            </div>

            {Object.keys(data.desglose || {}).length === 0 ? (
              <div className="px-5 py-8 text-center text-gray-400 text-sm">
                No hay ventas registradas para esta fecha
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {Object.entries(data.desglose).map(([metodo, info]) => {
                  const cfg = METODO_CONFIG[metodo] || { label: metodo, emoji: '💰', bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', color: '#6b7280' };
                  const pct = data.totalGeneral > 0 ? ((info.total / data.totalGeneral) * 100).toFixed(1) : 0;

                  return (
                    <div key={metodo} className="px-5 py-4 flex items-center gap-4">
                      {/* Emoji + name */}
                      <div className={`flex items-center gap-2 w-32`}>
                        <span className="text-xl">{cfg.emoji}</span>
                        <span className={`font-semibold text-sm ${cfg.text}`}>{cfg.label}</span>
                      </div>

                      {/* Progress bar */}
                      <div className="flex-1">
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${pct}%`, backgroundColor: cfg.color }}
                          />
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="text-right w-40 flex items-center gap-4 justify-end">
                        <span className="text-xs text-gray-500">{info.cantidad} venta{info.cantidad !== 1 ? 's' : ''}</span>
                        <span className="text-xs text-gray-400">{pct}%</span>
                        <span className="font-bold text-gray-900 text-sm w-24 text-right">{fmt(info.total)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
