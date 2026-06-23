'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { Printer, Download, ArrowLeft } from 'lucide-react'
import { numeroALetras, fmtCurrency } from '@/lib/utils'
import type { VentaData } from './types'

const METODO_PAGO_LABEL: Record<string, string> = {
  EFECTIVO: 'Efectivo', YAPE: 'Yape', PLIN: 'Plin',
  TARJETA: 'Tarjeta', CHEQUE: 'Cheque', TRANSFERENCIA: 'Transferencia',
}

function formatFecha(fecha: string) {
  const d = new Date(fecha)
  return d.toLocaleDateString('es-PE', {
    year: 'numeric', month: '2-digit', day: '2-digit',
  }) + ' ' + d.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })
}

function getLabel(item: VentaData): string {
  const marca = (item as any).producto?.marca || (item as any).marca || ''
  const nombre = (item as any).producto?.nombre || (item as any).nombre || ''
  return marca ? `${nombre} - ${marca}` : nombre
}

interface ComprobantePagoProps {
  venta: VentaData
  empresa: Record<string, string>
  onVolver: () => void
  onNuevaVenta: () => void
}

export default function ComprobantePago({ venta, empresa, onVolver, onNuevaVenta }: ComprobantePagoProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [generating, setGenerating] = useState(false)
  const [thermalMode, setThermalMode] = useState(false)

  useEffect(() => {
    if (thermalMode) {
      const style = document.createElement('style')
      style.id = 'thermal-print-style'
      style.textContent = `
        @page { size: 80mm auto; margin: 0; }
        body { width: 80mm; font-size: 10px; font-family: monospace; }
        #receipt-print-area { width: 72mm; margin: 0 auto; padding: 4mm; }
        .no-print { display: none !important; }
        table { font-size: 9px; }
      `
      document.head.appendChild(style)
    } else {
      const existing = document.getElementById('thermal-print-style')
      if (existing) existing.remove()
    }
    return () => {
      const existing = document.getElementById('thermal-print-style')
      if (existing) existing.remove()
    }
  }, [thermalMode])

  const nombreComercial = empresa.nombre_comercial || 'MINIMARKET'
  const razonSocial = empresa.razon_social || 'MINIMARKET AGILE S.A.C.'
  const ruc = empresa.ruc || '20123456789'
  const direccionFiscal = empresa.direccion_fiscal || 'Av. América Norte N.° 1234, Trujillo, La Libertad'
  const direccionEst = empresa.direccion_establecimiento || direccionFiscal
  const telefono = empresa.telefono || ''
  const correo = empresa.correo || ''

  const totalNum = Number(venta.total)

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  const handleDownloadPDF = useCallback(async () => {
    if (!ref.current) return
    setGenerating(true)
    try {
      const html2canvas = (await import('html2canvas')).default
      const jsPDF = (await import('jspdf')).default
      const canvas = await html2canvas(ref.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgWidth = 210
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
      pdf.save(`CONSTANCIA-${venta.numero.replace(/\//g, '-')}.pdf`)
    } catch (err) {
      console.error('Error generando PDF:', err)
    } finally {
      setGenerating(false)
    }
  }, [venta.numero])

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-[210mm] mx-auto p-4">
        <div className="flex justify-end gap-2 mb-4 no-print">
          <button onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition cursor-pointer text-sm">
            <Printer size={16} /> Imprimir
          </button>
          <button onClick={handleDownloadPDF} disabled={generating}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition cursor-pointer text-sm disabled:bg-green-400">
            <Download size={16} /> {generating ? 'Generando...' : 'Descargar PDF'}
          </button>
          <button onClick={() => setThermalMode(!thermalMode)}
            className={`flex items-center gap-2 border px-4 py-2 rounded-lg transition cursor-pointer text-sm ${
              thermalMode ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}>
            {thermalMode ? '📄 Vista Normal' : '🧾 Térmica 80mm'}
          </button>
          <button onClick={onVolver}
            className="flex items-center gap-2 border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition cursor-pointer text-sm">
            <ArrowLeft size={16} /> Volver
          </button>
        </div>

        <div id="receipt-print-area" ref={ref} className="bg-white p-6 sm:p-8 text-xs leading-tight print:shadow-none" style={{ fontFamily: 'monospace, "Courier New", Courier' }}>
          <div className="text-center mb-3 pb-3 border-b-2 border-gray-800">
            <p className="text-base font-bold tracking-wide">{nombreComercial}</p>
            {razonSocial && <p className="text-[10px] text-gray-600">{razonSocial}</p>}
            {ruc && <p className="text-[10px] text-gray-600">RUC: {ruc}</p>}
            {direccionFiscal && <p className="text-[10px] text-gray-600">{direccionFiscal}</p>}
            {(telefono || correo) && (
              <p className="text-[10px] text-gray-600">
                {telefono ? `Tel: ${telefono}` : ''}{telefono && correo ? ' | ' : ''}{correo ? correo : ''}
              </p>
            )}
          </div>

          <div className="text-center mb-3">
            <p className="text-sm font-bold">CONSTANCIA DE COMPRA</p>
            <p className="text-xs font-semibold mt-1">{venta.numero}</p>
          </div>

          <div className="border-t border-b border-gray-400 py-1.5 mb-3 grid grid-cols-2 gap-x-4 gap-y-0.5 text-[10px]">
            <p><span className="font-semibold">Fecha:</span> {formatFecha(venta.creadoEn)}</p>
            <p className="text-right"><span className="font-semibold">Moneda:</span> PEN - Soles</p>
            {venta.usuario?.nombre && (
              <p><span className="font-semibold">Cajero:</span> {venta.usuario.nombre}</p>
            )}
            <p className="text-right"><span className="font-semibold">Estado:</span> {venta.estado === 'COMPLETADA' ? 'PAGADO' : venta.estado}</p>
            {venta.cliente ? (
              <p className="col-span-2">
                <span className="font-semibold">Cliente:</span> {venta.cliente.nombre}
                {venta.cliente.dni ? ` (DNI: ${venta.cliente.dni})` : ''}
              </p>
            ) : (
              <p className="col-span-2 text-gray-500"><span className="font-semibold">Cliente:</span> Cliente general</p>
            )}
          </div>

          <div className="border-t border-b border-gray-400 py-1.5 mb-3 text-[10px]">
            <p className="font-semibold mb-0.5">Forma de pago:</p>
            <p>{METODO_PAGO_LABEL[venta.metodoPago] || venta.metodoPago} {venta.pagoId ? `(Op. ****${venta.pagoId.slice(-4)})` : ''}</p>
          </div>

          <table className="w-full text-[10px] mb-3 border-collapse">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-1 pr-1 font-bold w-[10%]">Cant.</th>
                <th className="text-left py-1 px-1 font-bold">Descripción</th>
                <th className="text-right py-1 px-1 font-bold w-[22%]">P. Unit.</th>
                <th className="text-right py-1 pl-1 font-bold w-[22%]">Importe</th>
              </tr>
            </thead>
            <tbody>
              {(venta.detalles || []).map((d: any, idx: number) => (
                <tr key={d.id || idx} className="border-b border-gray-300">
                  <td className="py-1 pr-1 align-top text-center">{d.cantidad}</td>
                  <td className="py-1 px-1 align-top">{getLabel(d)}</td>
                  <td className="py-1 px-1 align-top text-right">{fmtCurrency(d.precioUnitario)}</td>
                  <td className="py-1 pl-1 align-top text-right">{fmtCurrency(d.subtotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mb-3">
            <div className="w-64 space-y-0.5 text-[10px]">
              <div className="flex justify-between">
                <span>Op. gravadas:</span>
                <span>{fmtCurrency(venta.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>IGV incluido 18%:</span>
                <span>{fmtCurrency(venta.igv)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold border-t border-gray-800 pt-0.5">
                <span>IMPORTE TOTAL:</span>
                <span>{fmtCurrency(venta.total)}</span>
              </div>
              {venta.metodoPago === 'EFECTIVO' && venta.montoRecibido > 0 && (
                <>
                  <div className="flex justify-between text-gray-600">
                    <span>Recibido:</span>
                    <span>{fmtCurrency(venta.montoRecibido)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Vuelto:</span>
                    <span>{fmtCurrency(venta.vuelto)}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="text-[10px] font-semibold text-center border-t border-gray-400 pt-2 mb-3">
            <p>SON: {numeroALetras(totalNum)}</p>
          </div>

          <div className="text-center text-[9px] text-gray-500 border-t border-gray-400 pt-2">
            <p>Documento interno generado por el sistema.</p>
            <p className="mt-1">Gracias por su compra. Conserve este documento.</p>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-4 no-print">
          <button onClick={onNuevaVenta}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition cursor-pointer text-sm">
            Nueva Venta
          </button>
        </div>
      </div>
    </div>
  )
}
