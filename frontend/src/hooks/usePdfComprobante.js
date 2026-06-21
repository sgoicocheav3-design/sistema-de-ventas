import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

/**
 * Hook para generar PDF de comprobante de venta
 * @param {Object} venta - Objeto venta con detalles
 * @returns {Function} Función para descargar el PDF
 */
export const usePdfComprobante = () => {
  const descargarComprobante = (venta) => {
    const hoy = new Date(venta.creadoEn);
    const hora = hoy.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const fecha = hoy.toLocaleDateString('es-PE');

    const documentDefinition = {
      pageSize: { width: 210, height: 297 }, // A4
      pageMargins: [15, 15, 15, 15],
      content: [
        // Header
        {
          alignment: 'center',
          marginBottom: 10,
          stack: [
            { text: '🛒 MINIMARKET SYSTEM', fontSize: 14, bold: true, color: '#1e40af' },
            { text: 'RUC: 20123456789', fontSize: 9, color: '#666' },
            { text: 'Jr. Ejemplo 123, Lima', fontSize: 8, color: '#999' },
          ],
        },
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 180, y2: 0, lineWidth: 0.5, lineColor: '#ddd' }], marginBottom: 8 },

        // Número de comprobante
        {
          columns: [
            { text: `Comprobante: ${venta.numero}`, fontSize: 10, bold: true },
            { text: `Fecha: ${fecha}`, fontSize: 9, alignment: 'right' },
          ],
          marginBottom: 2,
        },
        {
          text: `Hora: ${hora}`,
          fontSize: 9,
          alignment: 'right',
          marginBottom: 8,
        },

        // Tabla de detalles
        {
          table: {
            headerRows: 1,
            widths: [80, 30, 30, 35],
            body: [
              [
                { text: 'PRODUCTO', style: 'tableHeader', alignment: 'left' },
                { text: 'CANT.', style: 'tableHeader', alignment: 'center' },
                { text: 'P.UNIT', style: 'tableHeader', alignment: 'right' },
                { text: 'SUBTOTAL', style: 'tableHeader', alignment: 'right' },
              ],
              ...venta.detalles.map((d) => [
                { text: `${d.producto.nombre}`, fontSize: 9, alignment: 'left' },
                { text: d.cantidad.toString(), fontSize: 9, alignment: 'center' },
                { text: `S/ ${parseFloat(d.precioUnitario).toFixed(2)}`, fontSize: 9, alignment: 'right' },
                { text: `S/ ${(parseFloat(d.precioUnitario) * d.cantidad).toFixed(2)}`, fontSize: 9, alignment: 'right', bold: true },
              ]),
            ],
          },
          layout: {
            hLineWidth: () => 0.5,
            vLineWidth: () => 0,
            hLineColor: '#ddd',
            paddingLeft: () => 5,
            paddingRight: () => 5,
            paddingTop: () => 4,
            paddingBottom: () => 4,
          },
          marginBottom: 8,
        },

        // Totales
        {
          alignment: 'right',
          stack: [
            {
              columns: [
                { text: 'Subtotal:', width: 100, alignment: 'left', fontSize: 10 },
                { text: `S/ ${parseFloat(venta.subtotal).toFixed(2)}`, alignment: 'right', fontSize: 10, bold: true },
              ],
            },
            {
              columns: [
                { text: 'IGV (18%):', width: 100, alignment: 'left', fontSize: 10 },
                { text: `S/ ${parseFloat(venta.igv).toFixed(2)}`, alignment: 'right', fontSize: 10, bold: true },
              ],
              marginTop: 2,
            },
            {
              columns: [
                { text: 'TOTAL:', width: 100, alignment: 'left', fontSize: 11, bold: true, color: '#1e40af' },
                { text: `S/ ${parseFloat(venta.total).toFixed(2)}`, alignment: 'right', fontSize: 11, bold: true, color: '#1e40af' },
              ],
              marginTop: 4,
              marginBottom: 8,
            },
          ],
        },

        // Método de pago y vuelto
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 180, y2: 0, lineWidth: 0.5, lineColor: '#ddd' }], marginBottom: 8 },
        {
          text: `Método de pago: ${venta.metodoPago}`,
          fontSize: 9,
          marginBottom: 2,
        },
        venta.metodoPago === 'EFECTIVO' && venta.vuelto > 0
          ? {
              text: `Monto recibido: S/ ${parseFloat(venta.montoRecibido).toFixed(2)} | Vuelto: S/ ${parseFloat(venta.vuelto).toFixed(2)}`,
              fontSize: 9,
              color: '#059669',
              bold: true,
              marginBottom: 10,
            }
          : { text: '', marginBottom: 10 },

        // Footer
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 180, y2: 0, lineWidth: 0.5, lineColor: '#ddd' }], marginBottom: 8 },
        {
          alignment: 'center',
          fontSize: 8,
          color: '#999',
          text: '¡Gracias por su compra!\nVuelva pronto',
        },
      ],
      styles: {
        tableHeader: {
          backgroundColor: '#f3f4f6',
          bold: true,
          fontSize: 9,
          color: '#374151',
        },
      },
    };

    pdfMake.createPdf(documentDefinition).download(`comprobante-${venta.numero}.pdf`);
  };

  return { descargarComprobante };
};
