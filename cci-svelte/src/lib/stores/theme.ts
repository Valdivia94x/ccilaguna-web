import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

// Función para aplicar el tema con animación View Transitions API
function applyThemeWithTransition(newTheme: Theme) {
	if (!browser) return;

	// Verificar si el navegador soporta View Transitions API
	if (!document.startViewTransition) {
		// Fallback: aplicar tema sin animación
		applyThemeImmediate(newTheme);
		return;
	}

	// Usar View Transitions API para animación suave
	document.startViewTransition(() => {
		applyThemeImmediate(newTheme);
	});
}

// Función para aplicar el tema inmediatamente
function applyThemeImmediate(theme: Theme) {
	if (!browser) return;

	localStorage.setItem('theme', theme);

	if (theme === 'dark') {
		document.documentElement.setAttribute('data-theme', 'dark');
	} else {
		document.documentElement.removeAttribute('data-theme');
	}
}

function createThemeStore() {
	// Inicializar con el tema guardado o 'dark' por defecto
	const getInitialTheme = (): Theme => {
		if (!browser) return 'dark';

		// Primero verificar si el tema ya está aplicado en el DOM
		if (document.documentElement.hasAttribute('data-theme')) {
			return 'dark';
		}

		const saved = localStorage.getItem('theme') as Theme | null;
		if (saved) return saved;

		// Detectar preferencia del sistema
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			return 'dark';
		}

		return 'dark';
	};

	const { subscribe, set, update } = writable<Theme>(getInitialTheme());

	return {
		subscribe,
		toggle: () => {
			update(current => {
				const newTheme: Theme = current === 'dark' ? 'light' : 'dark';
				applyThemeWithTransition(newTheme);
				return newTheme;
			});
		},
		set: (theme: Theme) => {
			if (browser) {
				applyThemeImmediate(theme);
			}
			set(theme);
		}
	};
}

export const theme = createThemeStore();
