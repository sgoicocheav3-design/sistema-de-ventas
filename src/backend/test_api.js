const http = require('http');

const BASE = 'http://localhost:4000';
let token = null;
let failures = 0;

function req(method, path, body = null, tok = null) {
  return new Promise((resolve) => {
    const opts = { method, hostname: 'localhost', port: 4000, path, headers: { 'Content-Type': 'application/json' } };
    if (tok) opts.headers['Authorization'] = `Bearer ${tok}`;
    const r = http.request(opts, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, body: data }); }
      });
    });
    r.on('error', e => resolve({ status: 0, body: e.message }));
    if (body) r.write(JSON.stringify(body));
    r.end();
  });
}

function test(name, fn) {
  return fn().then(({ status, body }) => {
    const ok = status >= 200 && status < 400;
    if (!ok) failures++;
    console.log(`${ok ? '✅' : '❌'} ${name} → ${status}${!ok ? ' (' + (body?.message || JSON.stringify(body).slice(0,80)) + ')' : ''}`);
  });
}

async function main() {
  console.log('\n🧪 INICIANDO PRUEBAS DEL BACKEND\n');

  // 1. Health check
  await test('GET /health', () => req('GET', '/health'));

  // 2. Login correcto
  const loginRes = await req('POST', '/api/auth/login', { email: 'admin@minimarket.com', password: 'Admin1234!' });
  if (loginRes.status === 200) {
    token = loginRes.body.token;
    console.log(`✅ POST /api/auth/login → 200 (token recibido)`);
  } else {
    failures++;
    console.log(`❌ POST /api/auth/login → ${loginRes.status}: ${loginRes.body?.message}`);
  }

  if (!token) {
    console.log('\n⚠️  No se pudo obtener token. Pruebas de auth omitidas.\n');
    process.exit(failures);
  }

  // 3. Login incorrecto
  await test('POST /api/auth/login (credenciales malas)', () =>
    req('POST', '/api/auth/login', { email: 'admin@minimarket.com', password: 'wrong' }));

  // 4. Categorías (público)
  await test('GET /api/categorias', () => req('GET', '/api/categorias'));

  // 5. Dashboard stats
  await test('GET /api/dashboard/stats', () => req('GET', '/api/dashboard/stats', null, token));

  // 6. Dashboard chart
  await test('GET /api/dashboard/chart', () => req('GET', '/api/dashboard/chart', null, token));

  // 7. Productos listar
  await test('GET /api/almacen/productos', () => req('GET', '/api/almacen/productos', null, token));

  // 8. Productos inactivos
  await test('GET /api/almacen/productos/inactivos', () => req('GET', '/api/almacen/productos/inactivos', null, token));

  // 9. Productos vencimiento próximo
  await test('GET /api/almacen/productos/vencimiento-proximo', () => req('GET', '/api/almacen/productos/vencimiento-proximo?dias=30', null, token));

  // 10. Proveedores listar
  await test('GET /api/admin/proveedores', () => req('GET', '/api/admin/proveedores', null, token));

  // 11. Usuarios listar
  await test('GET /api/admin/usuarios', () => req('GET', '/api/admin/usuarios', null, token));

  // 12. POS buscar productos sin query (debe dar vacío)
  await test('GET /api/ventas/productos/buscar', () => req('GET', '/api/ventas/productos/buscar', null, token));

  // 13. POS buscar productos con query
  await test('GET /api/ventas/productos/buscar?q=coca', () => req('GET', '/api/ventas/productos/buscar?q=coca', null, token));

  // 14. Crear producto
  await test('POST /api/almacen/productos', () =>
    req('POST', '/api/almacen/productos', { nombre: 'Test Producto', marca: 'Test', categoriaId: 1, precio: 10 }, token));

  // 15. Crear venta
  await test('POST /api/ventas', () =>
    req('POST', '/api/ventas', { items: [{ productoId: 1, cantidad: 2 }], metodoPago: 'EFECTIVO', montoRecibido: 50 }, token));

  // 16. Obtener comprobante de venta (venta id 1)
  await test('GET /api/ventas/1/comprobante', () => req('GET', '/api/ventas/1/comprobante', null, token));

  // 17. Productos stock bajo
  await test('GET /api/almacen/productos?stockBajo=true', () => req('GET', '/api/almacen/productos?stockBajo=true', null, token));

  // 18. Entradas listar
  await test('GET /api/almacen/entradas', () => req('GET', '/api/almacen/entradas', null, token));

  // 19. Crear entrada (con precioUnitario)
  await test('POST /api/almacen/entradas', () =>
    req('POST', '/api/almacen/entradas', { productoId: 1, proveedorId: 1, cantidad: 10, precioUnitario: 5.50 }, token));

  // 20. Bajas listar
  await test('GET /api/almacen/bajas', () => req('GET', '/api/almacen/bajas', null, token));

  // 21. Token inválido
  await test('GET /api/almacen/productos (token inválido)', () => req('GET', '/api/almacen/productos', null, 'token-falso'));

  // 22. Sin token
  await test('GET /api/almacen/productos (sin token)', () => req('GET', '/api/almacen/productos'));

  // 23. Dashboard con token VENDEDOR (debe funcionar)
  const loginVen = await req('POST', '/api/auth/login', { email: 'vendedor@minimarket.com', password: 'Vendedor1234!' });
  if (loginVen.status === 200) {
    console.log(`✅ POST /api/auth/login (vendedor) → 200`);
    await test('GET /api/dashboard/stats (vendedor)', () => req('GET', '/api/dashboard/stats', null, loginVen.body.token));
    await test('GET /api/ventas/productos/buscar?q=coca (vendedor)', () => req('GET', '/api/ventas/productos/buscar?q=coca', null, loginVen.body.token));
    // VENDEDOR no puede acceder a /api/admin/usuarios
    await test('GET /api/admin/usuarios (vendedor → 403)', () => req('GET', '/api/admin/usuarios', null, loginVen.body.token));
  } else {
    failures++;
    console.log(`❌ POST /api/auth/login (vendedor) → ${loginVen.status}`);
  }

  console.log(`\n${'='.repeat(50)}`);
  if (failures === 0) {
    console.log('🎉 TODAS LAS PRUEBAS PASARON');
  } else {
    console.log(`⚠️  ${failures} prueba(s) FALLARON`);
  }
  console.log('='.repeat(50) + '\n');
}

main().catch(console.error);
