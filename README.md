# Bombastic Candies — proyecto web escolar

## Qué incluye
- Página visual basada en los mockups del PDF entregado.
- Inicio con hero/slider.
- Productos con filtros, buscador, detalle y carrito.
- Checkout con selección de sucursal y horario.
- Formulario de tarjeta **solo para simulación local**.
- Animación de procesamiento.
- Animación de compra completada con confeti.
- Ticket digital imprimible / guardable como PDF.
- Diseño responsive para computadora, tablet y celular.
- Cuenta demo.
- Todo funciona con HTML + CSS + JavaScript, sin servidor ni base de datos.

## Importante sobre el pago
El checkout NO realiza cargos reales. Los datos de tarjeta se validan únicamente en el navegador y no se envían a ningún servidor. Para una tienda real habría que integrar un proveedor de pagos y un backend seguro.

## Cómo abrirlo en Visual Studio 2022
1. Descomprime `BombasticCandies.zip`.
2. Abre Visual Studio 2022.
3. Selecciona **Archivo > Abrir > Carpeta**.
4. Elige la carpeta `BombasticCandies`.
5. Abre `index.html`.
6. Para verlo rápidamente, haz clic derecho sobre `index.html` y elige **Abrir con > navegador**.
7. También puedes usar la extensión **Live Server** si trabajas con Visual Studio Code.

## Dónde colocar tus imágenes
Abre la carpeta:
`images/`

Reemplaza los archivos por tus imágenes manteniendo EXACTAMENTE estos nombres:

- `logo.png` → logotipo principal
- `hero-1.jpg` → imagen principal del inicio
- `hero-2.jpg` → segunda imagen del carrusel
- `hero-3.jpg` → tercera imagen del carrusel
- `about.jpg` → imagen de la sección “Una aventura con cada dulce”
- `contact-bg.jpg` → fondo de contacto
- `cherry-bombs.jpg`
- `hazelnut-hearts.jpg`
- `pastel-swirls.jpg`
- `gummy-galaxies.jpg`
- `rainbow-bubbles.jpg`
- `paleta-galactica.jpg`
- `bombon-nube.jpg`

Si una imagen tuya está en PNG, puedes usar PNG; solo cambia la extensión también en `js/app.js` y/o `index.html`.

## Colores y tipografías
La guía visual utiliza una estética pastel, con rosa, verde claro, blanco y café. La página reproduce esa combinación mediante variables CSS en `css/styles.css`.

La guía indica como tipografías: Chewy, Brasika y Candice. El proyecto usa Chewy para el logotipo/acentos y DM Serif Display como alternativa visual para títulos donde no se dispone de Brasika/Candice.

## Productos
Los precios de la guía se mantienen como referencia visual y se muestran en USD:
- Cherry Bombs — $2.99
- Hazelnut Hearts — $3.99
- Pastel Swirls — $3.99
- Gummy Galaxies — $3.99
- Rainbow Bubbles — $7.99
- Paleta Galáctica — $4.99
- Bombón Nube Flotante — $4.49

Puedes modificar nombres, precios y descripciones en `js/app.js`.

## Cómo demostrar la compra en clase
1. Entra a Productos.
2. Agrega varios dulces al carrito.
3. Abre Carrito.
4. Pulsa “Continuar al pago”.
5. Escribe datos ficticios.
6. Para la demo de tarjeta usa:
   - Número: `4242 4242 4242 4242`
   - Vencimiento: `12/30`
   - CVV: `123`
7. Pulsa “Confirmar compra”.
8. Verás la animación de procesamiento.
9. Aparecerá la animación de compra completada.
10. Abre “Ver ticket”.
11. Usa “Imprimir / Guardar PDF” para mostrar el comprobante.

## Archivos principales
- `index.html` → estructura de toda la página.
- `css/styles.css` → diseño, colores, responsive y animaciones.
- `js/app.js` → productos, carrito, checkout, ticket y comportamiento.
- `images/` → tus imágenes.
