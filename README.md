# Frontend Joyería - Tienda Online

## Descripción

Aplicación web de comercio electrónico desarrollada con React y Vite para la venta de joyería. Proporciona una experiencia de compra moderna, intuitiva y completamente responsiva para los clientes finales.

## Tecnologías Utilizadas

- **React 18.3.1** - Biblioteca de JavaScript para interfaces de usuario
- **Vite** - Herramienta de construcción y desarrollo rápido
- **Tailwind CSS** - Framework de CSS utilitario
- **Framer Motion** - Biblioteca de animaciones avanzadas
- **React Router DOM** - Enrutamiento del lado del cliente
- **Axios** - Cliente HTTP para comunicación con API
- **React Use Measure** - Hook para mediciones de elementos
- **Sonner** - Sistema de notificaciones toast elegantes
- **React Icons** - Biblioteca completa de iconos

## Características Principales

### 🛍️ Experiencia de Compra
- **Catálogo de Productos**: Navegación intuitiva por categorías de joyería
- **Búsqueda Avanzada**: Filtros por precio, material, talla y género
- **Galería de Imágenes**: Visualización detallada de productos con zoom
- **Carrito de Compras**: Gestión completa del carrito con persistencia
- **Proceso de Checkout**: Flujo de compra simplificado y seguro

### 🎨 Diseño y UX
- **Diseño Responsivo**: Optimizado para todos los dispositivos
- **Tema Elegante**: Paleta de colores premium para joyería
- **Animaciones Fluidas**: Transiciones suaves con Framer Motion
- **Tipografías Premium**: Roboto y Libre Bodoni para elegancia
- **Interfaz Intuitiva**: Navegación clara y accesible

### 📱 Características Técnicas
- **SPA (Single Page Application)**: Navegación sin recargas
- **Lazy Loading**: Carga optimizada de imágenes y componentes
- **PWA Ready**: Preparado para Progressive Web App
- **SEO Optimizado**: Estructura optimizada para motores de búsqueda
- **Performance**: Optimizado para velocidad de carga

## Instalación y Configuración

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Pasos de Instalación

1. **Navegar al directorio de joyería**
   ```bash
   cd Frontend/joyeria
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crear archivo `.env` en la raíz del proyecto:
   ```env
   VITE_API_URL=http://localhost:8000/api
   VITE_MEDIA_URL=http://localhost:8000/media
   VITE_SITE_NAME=Joyería Premium
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

5. **Acceder a la aplicación**
   Abrir [http://localhost:5173](http://localhost:5173)

## Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Construcción para producción
npm run preview      # Vista previa de construcción
npm run lint         # Linting con ESLint
```

## Estructura del Proyecto

```
Frontend/joyeria/
├── public/              # Archivos públicos
├── src/
│   ├── components/      # Componentes reutilizables
│   ├── pages/          # Páginas de la aplicación
│   ├── hooks/          # Custom hooks
│   ├── services/       # Servicios API
│   ├── context/        # Context providers
│   ├── utils/          # Utilidades
│   └── assets/         # Recursos estáticos
├── package.json        # Dependencias
├── vite.config.js      # Configuración Vite
└── tailwind.config.js  # Configuración Tailwind
```

## Integración con Backend

La aplicación se conecta con el backend Django a través de:
- **API REST**: Endpoints para productos, órdenes y usuarios
- **Autenticación**: Sistema de tokens JWT
- **Media Files**: Imágenes de productos desde el backend

## Despliegue

1. **Construcción**
   ```bash
   npm run build
   ```

2. **Variables de producción**
   ```env
   VITE_API_URL=https://api.joyeria.com/api
   VITE_MEDIA_URL=https://api.joyeria.com/media
   ```

## Contribución

1. Fork del repositorio
2. Crear rama feature
3. Commit cambios
4. Push y crear Pull Request

## Licencia

MIT License
