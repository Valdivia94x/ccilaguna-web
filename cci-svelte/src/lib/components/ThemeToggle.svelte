<script lang="ts">
	import { theme } from '$lib/stores/theme';

	function handleToggle() {
		theme.toggle();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleToggle();
		}
	}
</script>

<div class="theme-toggle-container">
	<div
		class="theme-toggle"
		role="switch"
		aria-label="Cambiar tema"
		aria-checked={$theme === 'dark'}
		tabindex="0"
		onclick={handleToggle}
		onkeydown={handleKeydown}
	>
		<span class="theme-label">MODO CLARO</span>
		<div class="toggle-switch">
			<span class="toggle-slider" aria-hidden="true"></span>
		</div>
		<span class="theme-label">MODO OSCURO</span>
	</div>
</div>

<style>
	.theme-toggle-container {
		/* Posicionamiento flotante */
		position: fixed;
		top: 75px;
		right: 20px;
		z-index: 1001;

		/* Glassmorphic effect - matching navbar */
		background: var(--navbar-glass-bg);
		backdrop-filter: blur(12px) saturate(180%);
		-webkit-backdrop-filter: blur(12px) saturate(180%);

		/* Layout */
		padding: 10px 20px;
		display: flex;
		justify-content: center;
		align-items: center;

		/* Border redondeado */
		border-radius: 50px;
		border: 1px solid var(--navbar-border);

		/* Shadow sutil */
		box-shadow: 0 4px 16px var(--navbar-shadow);

		/* Smooth transition */
		transition: all 0.3s ease;
	}

	.theme-toggle-container:hover {
		box-shadow: 0 6px 20px var(--navbar-shadow);
	}

	/* Soporte para Firefox (sin backdrop-blur) */
	@supports not (backdrop-filter: blur(12px)) {
		.theme-toggle-container {
			background: var(--navbar-fallback-bg);
		}
	}

	.theme-toggle {
		display: flex;
		align-items: center;
		gap: 10px;
		color: var(--nav-text);
		font-size: 11px;
		cursor: pointer;
		user-select: none;
	}

	.theme-label {
		font-weight: 500;
		opacity: 0.8;
		transition: opacity 0.3s;
	}

	.theme-toggle:hover .theme-label {
		opacity: 1;
	}

	.toggle-switch {
		width: 50px;
		height: 24px;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 12px;
		position: relative;
		cursor: pointer;
		transition: background 0.3s ease;
	}

	.toggle-slider {
		position: absolute;
		width: 20px;
		height: 20px;
		background: white;
		border-radius: 50%;
		top: 2px;
		left: 2px;
		transition:
			left 0.3s ease,
			box-shadow 0.3s ease;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	}

	.toggle-switch:hover .toggle-slider {
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
	}

	:global([data-theme='dark']) .toggle-switch {
		background: rgba(255, 255, 255, 0.5);
	}

	:global([data-theme='dark']) .toggle-slider {
		left: 28px;
	}

	@media (max-width: 768px) {
		.theme-toggle-container {
			top: 55px;
			right: 15px;
			padding: 8px 15px;
		}

		.theme-toggle {
			font-size: 10px;
			gap: 8px;
		}

		.toggle-switch {
			width: 45px;
			height: 22px;
		}

		.toggle-slider {
			width: 18px;
			height: 18px;
		}

		:global([data-theme='dark']) .toggle-slider {
			left: 25px;
		}
	}

	@media (max-width: 480px) {
		.theme-toggle-container {
			top: 50px;
			right: 10px;
			padding: 6px 12px;
		}

		.theme-label {
			display: none;
		}

		.toggle-switch {
			width: 40px;
			height: 20px;
		}

		.toggle-slider {
			width: 16px;
			height: 16px;
		}

		:global([data-theme='dark']) .toggle-slider {
			left: 22px;
		}
	}
</style>
