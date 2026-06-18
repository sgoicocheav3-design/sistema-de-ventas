# Healthy Desserts

Prototipo web mobile-first para estudiantes, construido con HTML, CSS y JavaScript sin dependencias externas.

## Funcionalidades

- Autenticación simulada para alumno y admin.
- Cambio obligatorio de contraseña en el primer acceso del alumno.
- Flujo interactivo de personalización del postre.
- Menú inteligente con filtros y recomendaciones.
- Catálogo ampliado con postres peruanos y opciones saludables personalizables.
- Carrito con validación de aula/salón completo y confirmación simbólica del pedido.
- Panel admin para seguimiento de pedidos y catálogo.
- Persistencia local con `localStorage`.

## Credenciales de prueba

### Alumno
- Usuario: `000255928`
- Contraseña inicial: `000255928`

### Admin
- Usuario: `Admin`
- Contraseña: `Admin`

## Estructura

- `index.html`: interfaz principal.
- `styles.css`: sistema visual mobile-first.
- `app.js`: lógica de autenticación, recomendaciones, carrito y admin.

## Uso

1. Abre `index.html` en el navegador.
2. Inicia sesión con una de las cuentas de prueba.
3. Si entras como alumno por primera vez, cambia la contraseña.
4. Personaliza tu postre, agrega al carrito y confirma el pedido.

## Validación

El campo de aula/salón acepta formatos como `G503`, `C201` y `K607`. El pago es presencial al recoger el pedido; no existe pasarela de pago.
