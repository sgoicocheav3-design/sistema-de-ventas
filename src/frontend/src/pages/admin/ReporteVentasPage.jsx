// src/pages/admin/ReporteVentasPage.jsx
import { useState, useEffect } from 'react';
import {
  FileDown, FileSpreadsheet, Filter, Search,
  ChevronLeft, ChevronRight, Calendar,
} from 'lucide-react';
import { useAuth } from '../../store/AuthContext';
import api, { withAuth } from '../../lib/axios';

const fmt = (n) => `S/ ${parseFloat(n || 0).toFixed(2)}`;

const METODOS = ['', 'EFECTIVO', 'YAPE', 'PLIN'];

export default function ReporteVentasPage() {
  const { token } = useAuth();

  const [desde, setDesde]           = useState('');
  const [hasta, setHasta]           = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [ventas, setVentas]         = useState([]);
  const [totalMonto, setTotalMonto] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading]       = useState(false);
  const [page, setPage]             = useState(1);
  const perPage = 20;

  // ─── Fetch data ───────────────────────────────────────────────────────
  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (desde)      params.set('desde', desde);
      if (hasta)      params.set('hasta', hasta);
      if (metodoPago) params.set('metodoPago', metodoPago);

      const { data } = await api.get(`/admin/reportes/ventas?${params}`, withAuth(token));
      setVentas(data.ventas || []);
      setTotalMonto(data.monto || 0);
      setTotalCount(data.total || 0);
      setPage(1);
    } catch {
      setVentas([]);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, [token]);

  // ─── Export CSV ───────────────────────────────────────────────────────
  const exportCSV = () => {
    const params = new URLSearchParams();
    if (desde)      params.set('desde', desde);
    if (hasta)      params.set('hasta', hasta);
    if (metodoPago) params.set('metodoPago', metodoPago);
    params.set('formato', 'csv');

    // Direct download via link
    const url = `${api.defaults.baseURL}/admin/reportes/ventas?${params}`;
    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', '');
    // We need auth header so use fetch instead
    fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `reporte_ventas_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        URL.revokeObjectURL(blobUrl);
      });
  };

  // ─── Export PDF (client-side) ─────────────────────────────────────────
  const exportPDF = async () => {
    try {
      const pdfMakeLib = await import('pdfmake/build/pdfmake');
      const pdfFonts   = await import('pdfmake/build/vfs_fonts');
      const pdfMake = pdfMakeLib.default;
      pdfMake.vfs = pdfFonts.default?.pdfMake?.vfs || pdfFonts.pdfMake?.vfs || pdfFonts.default?.vfs;

      const docDef = {
        pageSize: 'A4',
        pageOrientation: 'landscape',
        pageMargins: [25, 30, 25, 30],
        content: [
          { text: 'Reporte de Ventas — MiniMarket System', fontSize: 14, bold: true, margin: [0, 0, 0, 4] },
          { text: `Generado: ${new Date().toLocaleString('es-PE')}${desde ? ` | Desde: ${desde}` : ''}${hasta ? ` | Hasta: ${hasta}` : ''}${metodoPago ? ` | Método: ${metodoPago}` : ''}`, fontSize: 8, color: '#64748b', margin: [0, 0, 0, 8] },
          {
            table: {
              headerRows: 1,
              widths: [28, 75, 85, 95, 85, 50, 52, 40, 52],
              body: [
                ['ID', 'Número', 'Fecha', 'Vendedor', 'Cliente', 'Pago', 'Subtotal', 'IGV', 'Total']
                  .map((t) => ({ text: t, bold: true, fontSize: 7, fillColor: '#e2e8f0' })),
                ...ventas.map((v) => [
                  { text: String(v.id), fontSize: 7 },
                  { text: v.numero, fontSize: 7 },
                  { text: new Date(v.creadoEn).toLocaleString('es-PE'), fontSize: 6 },
                  { text: v.usuario?.nombre || '-', fontSize: 7 },
                  { text: v.cliente?.nombre || 'Sin cliente', fontSize: 7 },
                  { text: v.metodoPago, fontSize: 7 },
                  { text: fmt(v.subtotal), fontSize: 7, alignment: 'right' },
                  { text: fmt(v.igv), fontSize: 7, alignment: 'right' },
                  { text: fmt(v.total), fontSize: 7, alignment: 'right' },
                ]),
              ],
            },
            layout: {
              hLineWidth: () => 0.4,
              vLineWidth: () => 0.4,
              hLineColor: () => '#cbd5e1',
              vLineColor: () => '#cbd5e1',
            },
          },
          { text: ' ', margin: [0, 6] },
          {
            columns: [
              { text: `Total ventas: ${ventas.length}`, fontSize: 9, bold: true },
              { text: `Monto total: ${fmt(totalMonto)}`, fontSize: 9, bold: true, alignment: 'right' },
            ],
          },
        ],
        defaultStyle: { font: 'Roboto' },
      };

      pdfMake.createPdf(docDef).download(`reporte_ventas_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (e) {
      console.error('PDF error:', e);
      alert('Error al generar el PDF.');
    }
  };

  // Pagination
  const totalPages = Math.ceil(ventas.length / perPage);
  const ventasPag = ventas.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="p-5 space-y-4">
      {/* ─── Header ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <FileSpreadsheet size={20} className="text-sky-600" />
          Reporte de Ventas
        </h1>
        <div className="flex gap-2">
          <button
            id="btn-export-csv"
            onClick={exportCSV}
            disabled={ventas.length === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 disabled:opacity-50 transition-all"
          >
            <FileDown size={13} /> CSV
          </button>
          <button
            id="btn-export-pdf"
            onClick={exportPDF}
            disabled={ventas.length === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 disabled:opacity-50 transition-all"
          >
            <FileDown size={13} /> PDF
          </button>
        </div>
      </div>

      {/* ─── Filters ────────────────────────────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Desde</label>
            <input
              id="filter-desde"
              type="date"
              value={desde}
              onChange={(e) => setDesde(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Hasta</label>
            <input
              id="filter-hasta"
              type="date"
              value={hasta}
              onChange={(e) => setHasta(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Método de pago</label>
            <select
              id="filter-metodo"
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="">Todos</option>
              {METODOS.filter(Boolean).map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <button
            id="btn-filter"
            onClick={fetchData}
            className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition-all"
          >
            <Filter size={14} /> Filtrar
          </button>
        </div>
      </div>

      {/* ─── Summary ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white border border-gray-200 rounded-xl px-4 py-3">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Total ventas</p>
          <p className="text-xl font-bold text-gray-900">{totalCount}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl px-4 py-3">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Monto total</p>
          <p className="text-xl font-bold text-sky-600">{fmt(totalMonto)}</p>
        </div>
      </div>

      {/* ─── Table ──────────────────────────────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase">ID</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase">Número</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase">Fecha</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase">Vendedor</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase">Cliente</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase">Pago</th>
                <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">Cargando...</td></tr>
              ) : ventasPag.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">Sin ventas para los filtros seleccionados</td></tr>
              ) : (
                ventasPag.map((v) => (
                  <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2.5 text-gray-500 text-xs">{v.id}</td>
                    <td className="px-4 py-2.5 font-medium text-gray-900">{v.numero}</td>
                    <td className="px-4 py-2.5 text-gray-600 text-xs">{new Date(v.creadoEn).toLocaleString('es-PE')}</td>
                    <td className="px-4 py-2.5 text-gray-700">{v.usuario?.nombre || '-'}</td>
                    <td className="px-4 py-2.5 text-gray-600">{v.cliente?.nombre || <span className="text-gray-400 italic">Sin cliente</span>}</td>
                    <td className="px-4 py-2.5">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        v.metodoPago === 'EFECTIVO' ? 'bg-emerald-50 text-emerald-700' :
                        v.metodoPago === 'YAPE'     ? 'bg-purple-50 text-purple-700' :
                                                      'bg-sky-50 text-sky-700'
                      }`}>{v.metodoPago}</span>
                    </td>
                    <td className="px-4 py-2.5 text-right font-semibold text-gray-900">{fmt(v.total)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Mostrando {(page - 1) * perPage + 1}–{Math.min(page * perPage, ventas.length)} de {ventas.length}
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
