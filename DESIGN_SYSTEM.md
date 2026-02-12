# Sistema de Diseño - Joyería Moderna

Este documento detalla los principios de diseño, componentes y guías de estilo implementados en la modernización de la interfaz de usuario de la Joyería.

## 1. Principios de Diseño

- **Minimalismo de Lujo**: Uso de espacios en blanco (negative space), tipografía elegante y una paleta de colores sofisticada para evocar exclusividad.
- **Glassmorphism**: Efectos de transparencia y desenfoque (`backdrop-blur`) para crear profundidad y jerarquía visual moderna, especialmente en tarjetas, modales y barras de navegación.
- **Diseño Responsivo**: Adaptabilidad total a dispositivos móviles, tablets y escritorio mediante un sistema de grillas flexible.
- **Animaciones Fluidas**: Micro-interacciones y transiciones suaves utilizando Framer Motion para mejorar la experiencia de usuario (UX) sin abrumar.
- **Accesibilidad (WCAG 2.1)**: Contraste suficiente, tipografía legible y estados de foco claros.

## 2. Paleta de Colores

Se utiliza una paleta definida en `tailwind.config.js` que combina tonos neutros con acentos dorados.

### Colores Principales

- **Primary (Gold)**: Tonos dorados para acciones principales y destacados.
  - `primary-50` a `primary-900` (Base: `#D4AF37`)
- **Neutros (Dark/Light)**:
  - Fondo Claro: `bg-gray-50`
  - Fondo Oscuro: `bg-black` o `bg-gray-900`
  - Texto Principal: `text-gray-900` (Modo claro), `text-white` (Modo oscuro)
  - Texto Secundario: `text-gray-500` / `text-gray-400`

### Gradientes

- **Gold Gradient**: `from-gold-400 to-gold-600` (para textos destacados y botones primarios).

## 3. Tipografía

- **Títulos y Encabezados**: `Bodoni Moda` (Serif). Evoca elegancia y tradición.
  - Clase Tailwind: `font-bodoni`
- **Cuerpo de Texto**: `Roboto` o `Inter` (Sans-serif). Maximiza la legibilidad en interfaces.
  - Clase Tailwind: `font-sans`

## 4. Componentes UI Reutilizables

Ubicación: `src/components/ui/`

### Button (`Button.jsx`)

Botón polimórfico con soporte para variantes y animaciones de pulsación.

- **Variantes**:
  - `primary`: Fondo sólido (negro/blanco invertido en modo oscuro) o gradiente dorado.
  - `secondary`: Bordeado, fondo transparente.
  - `ghost`: Sin fondo, solo texto/icono.
  - `glass`: Fondo translúcido con desenfoque.
- **Uso**:
  ```jsx
  <Button variant="primary" onClick={handleClick}>
    Comprar
  </Button>
  ```

### Card (`Card.jsx`)

Contenedor principal con efecto glassmorphism.

- **Características**: Borde sutil blanco/20%, fondo translúcido, sombra suave, `backdrop-blur`.
- **Uso**:
  ```jsx
  <Card className="p-4">Contenido</Card>
  ```

### Input (`Input.jsx`)

Campo de entrada de texto con estados de foco animados y validación de errores.

- **Características**: Fondo translúcido, borde animado al enfocar.

### Checkbox (`Checkbox.jsx`)

Selección múltiple con animación personalizada del check (SVG animado).

## 5. Animaciones (Framer Motion)

Se utiliza `framer-motion` para todas las interacciones.

- **Entrada de Página**: `opacity: 0` -> `opacity: 1`, `y: 20` -> `y: 0`.
- **Listas**: `staggerChildren` para aparición escalonada de elementos.
- **Micro-interacciones**: `whileHover` (escala ligera), `whileTap` (reducción de escala).

## 6. Estructura de Archivos Clave

- `src/components/ui/`: Componentes atómicos (Button, Card, Input, Checkbox).
- `src/layout/`: Estructura global (Navbar, Footer).
- `src/pages/`: Vistas principales refactorizadas.
  - `Home/`: Landing page con secciones Hero, Selección, etc.
  - `Products/`: Catálogo general.
  - `Detalle/`: Vista de producto individual.
  - `Carrito/`: Flujo de compra (Carrito, Formulario, Checkout).

## 7. Guía de Implementación

Para agregar nuevas páginas o secciones:

1.  Importar componentes base de `src/components/ui`.
2.  Utilizar clases de utilidad de Tailwind para espaciado y layout.
3.  Envolver elementos interactivos con `motion` si requieren animación.
4.  Mantener consistencia en el uso de la fuente `font-bodoni` para títulos.

## 8. Accesibilidad

- Todos los inputs tienen etiquetas asociadas (`label` o `aria-label`).
- Los colores de texto cumplen con los ratios de contraste mínimos.
- La navegación es compatible con teclado.
