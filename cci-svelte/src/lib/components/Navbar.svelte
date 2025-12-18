<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import { browser } from '$app/environment';

	let isMenuOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}

	$effect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		// Cleanup cuando el componente se destruye
		return () => {
			document.body.style.overflow = '';
		};
	});

	// Determinar el tema inicial desde el DOM inmediatamente
	const initialTheme: 'light' | 'dark' =
		browser && document.documentElement.hasAttribute('data-theme') ? 'dark' : 'dark';

	// Inicializar con el tema del DOM
	let currentTheme = $state<'light' | 'dark'>(initialTheme);

	// Actualizar cuando el store de tema cambie
	$effect(() => {
		currentTheme = $theme;
	});

	// Determinar logo basado en el tema actual
	let logoSrc = $derived(currentTheme === 'dark' ? '/images/logoOscuro.png' : '/images/logo.png');

	// Determinar iconos sociales basados en el tema actual
	let socialIcons = $derived(
		currentTheme === 'dark'
			? {
					whatsapp: '/images/icons/whatsappOscuro.svg',
					instagram: '/images/icons/instagramOscuro.svg',
					facebook: '/images/icons/facebookOscuro.svg',
					x: '/images/icons/XOscuro.svg'
				}
			: {
					whatsapp: '/images/icons/whatsapp.svg',
					instagram: '/images/icons/instagram.svg',
					facebook: '/images/icons/facebook.svg',
					x: '/images/icons/X.svg'
				}
	);
</script>

<nav class="navbar" aria-label="Navegación principal">
	<a href="/" class="navbar-logo" aria-label="Ir a página principal">
		<img id="logo" src={logoSrc} alt="Logo Consejo Cívico de Laguna" />
	</a>

	<button
		class="hamburger-menu"
		class:active={isMenuOpen}
		aria-label="Abrir menú"
		aria-expanded={isMenuOpen}
		onclick={toggleMenu}
	>
		<span class="hamburger-line"></span>
		<span class="hamburger-line"></span>
		<span class="hamburger-line"></span>
	</button>

	<div class="navbar-right-content" class:active={isMenuOpen}>
		<ul class="nav-menu" role="menubar">
			<li role="none"><a href="/" role="menuitem" onclick={closeMenu}>INICIO</a></li>
			<li class="nav-separator" aria-hidden="true">|</li>
			<li role="none"><a href="/nosotros" role="menuitem" onclick={closeMenu}>NOSOTROS</a></li>
			<li class="nav-separator" aria-hidden="true">|</li>
			<li role="none"><a href="/blog" role="menuitem" onclick={closeMenu}>BLOG</a></li>
			<li class="nav-separator" aria-hidden="true">|</li>
			<li role="none"><a href="/boletines" role="menuitem" onclick={closeMenu}>BOLETINES</a></li>
			<li class="nav-separator" aria-hidden="true">|</li>
			<li role="none"><a href="/informes" role="menuitem" onclick={closeMenu}>INFORMES</a></li>
		</ul>

		<div class="social-icons" aria-label="Redes sociales">
			<a
				href="https://wa.me/"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="WhatsApp"
				title="WhatsApp"
			>
				<img src={socialIcons.whatsapp} class="social-icon" alt="" />
			</a>

			<a
				href="https://instagram.com/cci_laguna_ac/"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Instagram"
				title="Instagram"
			>
				<img src={socialIcons.instagram} class="social-icon" alt="" />
			</a>

			<a
				href="https://facebook.com/CCILagunaAc/"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Facebook"
				title="Facebook"
			>
				<img src={socialIcons.facebook} class="social-icon" alt="" />
			</a>

			<a
				href="https://x.com/CCILagunaAC"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="X"
				title="X"
			>
				<img src={socialIcons.x} class="social-icon" alt="" />
			</a>
		</div>

		<a href="/donar" class="btn-donar" role="button" onclick={closeMenu}>DONAR</a>
	</div>
</nav>

<style>
	.navbar {
		/* Glassmorphic effect */
		background: var(--navbar-glass-bg);
		backdrop-filter: blur(24px) saturate(180%);
		-webkit-backdrop-filter: blur(24px) saturate(180%);

		/* Layout */
		padding: 16px 16px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		/* Border para definición */
		border-bottom: 1px solid var(--navbar-border);

		/* Position */
		position: sticky;
		top: 0;
		z-index: 50;

		/* Smooth transitions */
		transition:
			background-color 0.3s ease,
			border-color 0.3s ease;
	}

	/* Soporte para Firefox (sin backdrop-blur) */
	@supports not (backdrop-filter: blur(24px)) {
		.navbar {
			background: var(--navbar-fallback-bg);
		}
	}

	.navbar-logo {
		display: flex;
		align-items: center;
		text-decoration: none;
		cursor: pointer;
	}

	.navbar-logo img {
		height: 64px;
		width: auto;
		object-fit: contain;
		transition: transform 0.3s ease;
	}

	.navbar-logo:hover img {
		transform: scale(1.02);
	}

	.navbar-right-content {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.nav-menu {
		display: flex;
		gap: 8px;
		align-items: center;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.nav-menu li {
		margin: 0;
		padding: 0;
	}

	.nav-separator {
		color: var(--nav-separator);
		user-select: none;
		font-size: 14px;
		padding: 0 4px;
	}

	.nav-menu a {
		color: var(--nav-text);
		text-decoration: none;
		font-size: 14px;
		font-weight: 600;
		letter-spacing: 0.025em;
		transition: color 0.3s ease;
		display: inline-block;
		padding: 8px 12px;
		border-radius: 6px;
	}

	.nav-menu a:hover {
		color: var(--nav-text-hover);
	}

	.social-icons {
		display: flex;
		gap: 12px;
		align-items: center;
	}

	.social-icons a {
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		background: transparent;
		transition: all 0.3s ease;
	}

	.social-icons a:hover {
		background: var(--navbar-border);
		transform: translateY(-2px);
	}

	.social-icon {
		width: 25px;
		height: 25px;
		opacity: 0.8;
		transition: opacity 0.3s ease;
	}

	.social-icons a:hover .social-icon {
		opacity: 1;
	}

	.btn-donar {
		background: linear-gradient(135deg, #fb923c, #f59e0b);
		color: white;
		padding: 5px 24px;
		border-radius: 25px;
		text-decoration: none;
		font-weight: 700;
		font-size: 12px;
		letter-spacing: 0.025em;
		transition: all 0.3s ease;
		box-shadow: 0 2px 8px rgba(251, 146, 60, 0.3);
	}

	.btn-donar:hover {
		background: linear-gradient(135deg, #f97316, #d97706);
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(251, 146, 60, 0.4);
	}

	.hamburger-menu {
		display: none;
		flex-direction: column;
		background: none;
		border: none;
		cursor: pointer;
		padding: 8px;
		z-index: 1001;
		border-radius: 8px;
		transition: background-color 0.3s ease;
	}

	.hamburger-menu:hover {
		background: var(--navbar-border);
	}

	.hamburger-line {
		width: 24px;
		height: 2px;
		background-color: var(--nav-text);
		margin: 3px 0;
		transition: all 0.3s ease;
		border-radius: 2px;
	}

	.hamburger-menu.active .hamburger-line:nth-child(1) {
		transform: rotate(45deg) translate(6px, 6px);
	}

	.hamburger-menu.active .hamburger-line:nth-child(2) {
		opacity: 0;
	}

	.hamburger-menu.active .hamburger-line:nth-child(3) {
		transform: rotate(-45deg) translate(6px, -6px);
	}

	/* Large screens */
	@media (min-width: 1024px) {
		.navbar {
			padding: 16px 32px;
		}
	}

	/* Extra large screens */
	@media (min-width: 1280px) {
		.navbar {
			padding: 16px 48px;
		}

		.nav-menu a {
			font-size: 16px;
		}

		.btn-donar {
			font-size: 16px;
			padding: 12px 28px;
		}
	}

	/* Tablet y pantallas medianas */
	@media (max-width: 1024px) {
		.navbar-logo img {
			height: 56px;
		}

		.nav-menu {
			gap: 4px;
		}

		.nav-menu a {
			padding: 6px 8px;
			font-size: 13px;
		}
	}

	/* Mobile */
	@media (max-width: 768px) {
		.navbar {
			padding: 16px 16px;
		}

		.navbar-logo img {
			height: 48px;
			min-height: 48px;
		}

		.hamburger-menu {
			display: flex !important;
		}

		.navbar-right-content {
			position: fixed;
			top: 0;
			right: -100%;
			height: 100vh;
			width: 85%;
			max-width: 400px;

			/* Glassmorphic effect para menú móvil */
			background: var(--mobile-menu-bg);
			backdrop-filter: blur(24px) saturate(180%);
			-webkit-backdrop-filter: blur(24px) saturate(180%);

			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;
			padding: 100px 24px 32px;
			gap: 2rem;
			transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
			box-shadow: -8px 0 24px rgba(0, 0, 0, 0.15);
			overflow-y: auto;
			z-index: 999;
			border-left: 1px solid var(--navbar-border);
		}

		/* Fallback para navegadores sin soporte de backdrop-filter */
		@supports not (backdrop-filter: blur(24px)) {
			.navbar-right-content {
				background: var(--mobile-menu-fallback-bg);
			}
		}

		.navbar-right-content.active {
			right: 0;
		}

		.nav-menu {
			flex-direction: column;
			align-items: flex-start;
			gap: 0;
			width: 100%;
		}

		.nav-menu li {
			width: 100%;
		}

		.nav-menu a {
			display: block;
			padding: 16px 0;
			font-size: 18px;
			border-bottom: 1px solid var(--navbar-border);
			border-radius: 0;
			width: 100%;
		}

		.nav-separator {
			display: none;
		}

		.social-icons {
			flex-direction: row;
			width: 100%;
			justify-content: flex-start;
			padding-top: 8px;
		}

		.social-icons a {
			width: 44px;
			height: 44px;
		}

		.btn-donar {
			width: 100%;
			text-align: center;
			padding: 16px 32px;
			font-size: 16px;
			margin-top: 8px;
		}
	}

	/* Pantallas muy pequeñas */
	@media (max-width: 480px) {
		.navbar {
			padding: 12px 16px;
		}

		.navbar-logo img {
			height: 44px;
			min-height: 44px;
		}
	}

	/* Pantallas extra pequeñas */
	@media (max-width: 360px) {
		.navbar {
			padding: 10px 12px;
		}

		.navbar-logo img {
			height: 40px;
			min-height: 40px;
		}
	}
</style>
