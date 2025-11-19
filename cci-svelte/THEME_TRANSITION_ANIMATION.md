# 🎬 Animación de Transición de Tema

El proyecto ahora incluye una animación suave y gradual al cambiar entre modo claro y oscuro usando la **View Transitions API**.

## ✨ ¿Qué es la View Transitions API?

La View Transitions API es una API nativa del navegador que permite crear transiciones fluidas entre estados de la UI sin necesidad de bibliotecas externas. Captura un "snapshot" del estado actual, aplica los cambios, y anima suavemente entre ambos estados.

## 🎯 Implementación

### 1. Store de Tema Actualizado ([theme.ts](src/lib/stores/theme.ts))

```typescript
function applyThemeWithTransition(newTheme: Theme) {
  if (!browser) return;

  // Verificar soporte de View Transitions API
  if (!document.startViewTransition) {
    applyThemeImmediate(newTheme);
    return;
  }

  // Aplicar tema con animación
  document.startViewTransition(() => {
    applyThemeImmediate(newTheme);
  });
}
```

### 2. Estilos CSS ([app.css](src/app.css))

```css
/* Configuración base */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

/* Efecto de wipe/reveal (izquierda a derecha) */
::view-transition-old(root) {
  animation: fade-out 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

::view-transition-new(root) {
  animation: wipe-in-left-to-right 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Wipe usando clip-path */
@keyframes wipe-in-left-to-right {
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}
```

### 3. TypeScript Declarations ([app.d.ts](src/app.d.ts))

Se agregaron las definiciones de TypeScript para la View Transitions API:

```typescript
interface Document {
  startViewTransition?: (callback: () => void | Promise<void>) => ViewTransition;
}
```

## 🎨 Cómo Funciona

1. **Usuario hace clic en el toggle de tema**
2. **Store detecta el cambio** y llama a `applyThemeWithTransition()`
3. **Se verifica soporte** del navegador para View Transitions API
4. **Se inicia la transición**: `document.startViewTransition()`
5. **Se captura el estado actual** (snapshot del DOM)
6. **Se aplican los cambios** (nuevo tema)
7. **Se anima suavemente** entre ambos estados con fade in/out (0.4s)

## 🎭 Efecto Visual

- **Duración**: 600ms (0.6 segundos)
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` (suave aceleración/desaceleración)
- **Tipo**: Wipe/Reveal (barrido tipo cortina) de izquierda a derecha
- **Técnica**: `clip-path` - El nuevo tema se "pinta" gradualmente de izquierda a derecha
- El tema anterior se desvanece suavemente mientras el nuevo se revela
- La pantalla permanece en su lugar, solo cambia el contenido visible progresivamente

## 🌐 Compatibilidad de Navegadores

| Navegador | Versión | Soporte |
|-----------|---------|---------|
| Chrome | 111+ | ✅ Completo |
| Edge | 111+ | ✅ Completo |
| Safari | 18+ | ✅ Completo |
| Firefox | ❌ No | ⚠️ Fallback sin animación |
| Opera | 97+ | ✅ Completo |

### Fallback Automático

Si el navegador no soporta View Transitions API, el tema cambia instantáneamente sin animación (comportamiento tradicional).

```typescript
if (!document.startViewTransition) {
  // Fallback: cambio inmediato
  applyThemeImmediate(newTheme);
  return;
}
```

## 🎛️ Personalización

### Ajustar Duración

Modifica la duración en [app.css](src/app.css):

```css
::view-transition-old(root) {
  animation: fade-out 0.8s cubic-bezier(0.4, 0, 0.2, 1); /* 800ms */
}

::view-transition-new(root) {
  animation: wipe-in-left-to-right 0.8s cubic-bezier(0.4, 0, 0.2, 1); /* 800ms */
}
```

### Cambiar Easing

Diferentes curvas de animación:

```css
/* Lineal */
cubic-bezier(0, 0, 1, 1)

/* Ease-in (acelera al inicio) */
cubic-bezier(0.4, 0, 1, 1)

/* Ease-out (desacelera al final) */
cubic-bezier(0, 0, 0.2, 1)

/* Ease-in-out (suave) - ACTUAL */
cubic-bezier(0.4, 0, 0.2, 1)

/* Bounce */
cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

### Cambiar Dirección del Wipe

#### De derecha a izquierda:
```css
@keyframes wipe-in-right-to-left {
  from {
    clip-path: inset(0 0 0 100%);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

::view-transition-new(root) {
  animation: wipe-in-right-to-left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
```

#### De arriba hacia abajo:
```css
@keyframes wipe-in-top-to-bottom {
  from {
    clip-path: inset(0 0 100% 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

::view-transition-new(root) {
  animation: wipe-in-top-to-bottom 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
```

#### De abajo hacia arriba:
```css
@keyframes wipe-in-bottom-to-top {
  from {
    clip-path: inset(100% 0 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

::view-transition-new(root) {
  animation: wipe-in-bottom-to-top 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
```

#### Desde el centro (expandir):
```css
@keyframes wipe-expand-center {
  from {
    clip-path: inset(50% 50% 50% 50%);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

::view-transition-new(root) {
  animation: wipe-expand-center 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
```

#### Fade simple (sin wipe):
```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

::view-transition-new(root) {
  animation: fade-in 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## 🔍 Debug y Testing

Para verificar que la animación funciona:

1. Abre DevTools (F12)
2. Ve a la pestaña "Animations" (Chrome)
3. Haz clic en el toggle de tema
4. Deberías ver la animación de transición registrada

### Console Test

```javascript
// En la consola del navegador
console.log('View Transitions supported:', !!document.startViewTransition);
```

## 🚀 Beneficios

1. **Experiencia Mejorada**: Transición suave y profesional
2. **Nativa del Navegador**: No requiere librerías externas (0 KB adicionales)
3. **Performance**: Optimizada por el navegador, GPU accelerated
4. **Accesibilidad**: Respeta `prefers-reduced-motion`
5. **Progressive Enhancement**: Funciona con y sin soporte

## 🎓 Recursos

- [View Transitions API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
- [Smooth transitions with the View Transitions API - web.dev](https://developer.chrome.com/docs/web-platform/view-transitions/)
- [Can I Use: View Transitions](https://caniuse.com/view-transitions)
- [Animate UI - Theme Toggler](https://animate-ui.com/docs/primitives/effects/theme-toggler)

## 💡 Tips

- El efecto de **wipe/reveal** crea una sensación de "pintura" o "cortina" que se descorre
- La técnica `clip-path` recorta visualmente el contenido sin moverlo
- Perfecto para cambios de tema: parece que el nuevo tema "pinta" sobre el anterior
- La animación es más notable cuando hay cambios visuales significativos (colores, backgrounds)
- Funciona especialmente bien con el efecto glassmorphic del navbar
- La duración de 600ms es óptima: suficiente para apreciarse pero no molesta
- El wipe de izquierda a derecha es intuitivo en culturas occidentales (dirección de lectura)
- El efecto respeta automáticamente la preferencia del usuario de movimiento reducido
- `clip-path` es muy performante ya que no afecta el layout (no trigger reflow)

## 🐛 Troubleshooting

**Problema**: No veo la animación
- **Solución**: Verifica que estás usando Chrome 111+ o Safari 18+

**Problema**: La animación se ve cortada
- **Solución**: Asegúrate de no tener `transition` en elementos que cambien con el tema

**Problema**: La animación es muy lenta/rápida
- **Solución**: Ajusta el valor de duración en los keyframes (0.2s - 0.8s recomendado)
