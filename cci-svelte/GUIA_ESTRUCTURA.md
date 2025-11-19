# Guía de Estructura del Proyecto - CCI Laguna

Este documento explica la nueva estructura del proyecto después de la refactorización a SvelteKit.

## 📁 Estructura del Proyecto

```
cci-svelte/
├── src/
│   ├── lib/
│   │   ├── components/          # Componentes reutilizables
│   │   │   ├── Navbar.svelte
│   │   │   ├── ThemeToggle.svelte
│   │   │   ├── Carousel.svelte
│   │   │   ├── AboutSection.svelte
│   │   │   ├── LogoGrid.svelte
│   │   │   ├── ObjectivesSection.svelte
│   │   │   └── Footer.svelte
│   │   └── stores/              # Stores de Svelte (gestión de estado)
│   │       └── theme.ts         # Store para el tema claro/oscuro
│   ├── routes/                  # Rutas de la aplicación
│   │   ├── +layout.svelte       # Layout principal
│   │   └── +page.svelte         # Página principal
│   ├── app.css                  # Estilos globales
│   └── app.html                 # Template HTML base
├── static/                      # Archivos estáticos (imágenes, etc.)
│   └── images/                  # IMPORTANTE: Coloca aquí tus imágenes
│       ├── logo.png
│       ├── logoOscuro.png
│       ├── imagenCarrusel1.png
│       ├── imagenCarrusel2.png
│       ├── proyectos.png
│       ├── logos/               # Logos de adherentes
│       │   ├── logo1.png
│       │   ├── logo2.png
│       │   └── ...
│       └── icons/               # Iconos sociales
│           ├── whatsapp.svg
│           ├── whatsappOscuro.svg
│           ├── instagram.svg
│           ├── instagramOscuro.svg
│           ├── facebook.svg
│           ├── facebookOscuro.svg
│           ├── X.svg
│           └── XOscuro.svg
└── package.json
```

## 🎯 Componentes Principales

### 1. **Navbar.svelte**
Barra de navegación con:
- Logo dinámico que cambia según el tema
- Menú de navegación responsive
- Menú hamburguesa para móviles
- Iconos de redes sociales
- Botón de donación

### 2. **ThemeToggle.svelte**
Toggle para cambiar entre modo claro y oscuro:
- Guarda la preferencia en localStorage
- Detecta la preferencia del sistema
- Animaciones suaves

### 3. **Carousel.svelte**
Carrusel de imágenes con:
- Auto-avance cada 5 segundos
- Pausa al pasar el mouse
- Botones de navegación
- Dots indicadores

### 4. **AboutSection.svelte**
Sección "Quiénes somos" con:
- Imagen ilustrativa
- Contenido de texto
- Responsive

### 5. **LogoGrid.svelte**
Grid de logos de adherentes:
- Grid responsive (4 columnas en desktop, 2 en móvil)
- Efectos hover
- Aspecto ratio automático

### 6. **Footer.svelte**
Pie de página con año actual automático

### 7. **ObjectivesSection.svelte**
Sección de objetivos (lista para personalizar)

## 🎨 Sistema de Temas

El proyecto usa CSS variables para los temas:

### Modo Claro (por defecto)
- Fondos claros con gradientes azules
- Texto oscuro
- Navbar con gradiente claro

### Modo Oscuro
- Fondos oscuros (#0f1419)
- Texto claro
- Navbar con gradiente oscuro
- Colores de acento en cyan (#00d4ff)

## 🔧 Store de Tema (theme.ts)

El store maneja:
- Inicialización del tema guardado
- Toggle entre claro/oscuro
- Detección de preferencia del sistema
- Sincronización con localStorage
- Actualización del atributo `data-theme` en el HTML

## 📝 Cómo Usar

### Agregar Imágenes
1. Coloca todas tus imágenes en la carpeta `static/images/`
2. Referéncialas en el código como `/images/nombre-archivo.png`

### Modificar el Carrusel
En `+page.svelte`, edita el array `carouselSlides`:
```typescript
const carouselSlides = [
  { image: '/images/tu-imagen.png', alt: 'Descripción' },
  // Agrega más slides aquí
];
```

### Modificar Logos de Adherentes
En `+page.svelte`, edita el array `adherentesData.logos`:
```typescript
logos: [
  { src: '/images/logos/logo1.png', alt: 'Nombre Adherente' },
  // Agrega más logos aquí
]
```

### Cambiar Contenido
Toda la data está centralizada en `+page.svelte` en objetos como:
- `carouselSlides`
- `aboutData`
- `adherentesData`

## 🚀 Comandos

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Format código
npm run format

# Check TypeScript
npm run check
```

## ✨ Ventajas de la Nueva Estructura

1. **Componentes Reutilizables**: Cada componente puede usarse en diferentes páginas
2. **Reactivo**: Usa el sistema reactivo de Svelte 5 ($state, $derived, $effect)
3. **TypeScript**: Type safety en todo el proyecto
4. **Mejor Performance**: Código optimizado y bundle más pequeño
5. **Mantenible**: Código organizado y fácil de entender
6. **Accesibilidad**: Atributos ARIA y roles semánticos
7. **Responsive**: Funciona perfectamente en móviles y desktop

## 🔄 Migraciones Necesarias

Para que el proyecto funcione completamente, necesitas:

1. **Mover las imágenes** de tu proyecto Flask a `static/images/`
2. **Asegurarte de tener** los iconos en versión clara y oscura (con sufijo "Oscuro")
3. **Verificar las rutas** de las imágenes en los datos de `+page.svelte`

## 📱 Responsive

El proyecto es completamente responsive:
- **Desktop**: Layout completo con todos los elementos
- **Tablet**: Grid de logos en 3 columnas
- **Móvil**: Menú hamburguesa, grid de logos en 2 columnas, altura reducida del carrusel

## 🎨 Personalización

Para cambiar colores, edita las CSS variables en `app.css`:
```css
:root {
  --nav-text-hover: #ffd700;  /* Color hover del menú */
  --text-secondary: #1e3a5f;  /* Color del texto secundario */
  /* etc... */
}
```

## 🐛 Troubleshooting

Si las imágenes no cargan:
1. Verifica que estén en `static/images/`
2. Revisa que los nombres coincidan exactamente (incluyendo mayúsculas/minúsculas)
3. Asegúrate de usar rutas absolutas desde `/images/...`
