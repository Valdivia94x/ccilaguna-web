<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme';
	import { browser } from '$app/environment';

	let { children } = $props();

	// Inicializar el tema cuando el componente se monte
	onMount(() => {
		if (browser) {
			const savedTheme = localStorage.getItem('theme');
			if (savedTheme === 'dark') {
				document.documentElement.setAttribute('data-theme', 'dark');
				theme.set('dark');
			} else if (savedTheme === 'light') {
				document.documentElement.removeAttribute('data-theme');
				theme.set('light');
			} else {
				// Detectar preferencia del sistema o usar dark por defecto
				if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
					document.documentElement.setAttribute('data-theme', 'dark');
					theme.set('dark');
				} else {
					// Usar dark mode como predeterminado
					document.documentElement.setAttribute('data-theme', 'dark');
					theme.set('dark');
				}
			}

			// Escuchar cambios en la preferencia del sistema
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			const handleChange = (e: MediaQueryListEvent) => {
				if (!localStorage.getItem('theme')) {
					if (e.matches) {
						document.documentElement.setAttribute('data-theme', 'dark');
						theme.set('dark');
					} else {
						document.documentElement.removeAttribute('data-theme');
						theme.set('light');
					}
				}
			};

			mediaQuery.addEventListener('change', handleChange);

			return () => {
				mediaQuery.removeEventListener('change', handleChange);
			};
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<script>
		// Script de bloqueo para evitar flash de tema incorrecto
		(function() {
			const savedTheme = localStorage.getItem('theme');
			if (savedTheme === 'dark' || !savedTheme) {
				// Si el tema guardado es dark o no hay tema guardado, aplicar dark
				document.documentElement.setAttribute('data-theme', 'dark');
			} else if (savedTheme === 'light') {
				// Si el tema guardado es light, no aplicar data-theme
				document.documentElement.removeAttribute('data-theme');
			}
		})();
	</script>
</svelte:head>

{@render children()}
