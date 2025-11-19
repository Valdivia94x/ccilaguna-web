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
	const initialTheme: 'light' | 'dark' = browser && document.documentElement.hasAttribute('data-theme') ? 'dark' : 'dark';

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
		backdrop-filter: blur(12px) saturate(180%);
		-webkit-backdrop-filter: blur(12px) saturate(180%);

		/* Layout */
		padding: 2px 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		/* Border para definición */
		border-bottom: 1px solid var(--navbar-border);

		/* Shadow sutil */
		box-shadow: 0 4px 20px var(--navbar-shadow);

		/* Position */
		position: sticky;
		top: 0;
		z-index: 1000;

		/* Smooth transitions */
		transition: all 0.3s ease;
	}

	/* Soporte para Firefox (sin backdrop-blur) */
	@supports not (backdrop-filter: blur(12px)) {
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
		height: 70px;
		width: auto;
		object-fit: contain;
		transition: transform 0.3s ease;
	}

	.navbar-logo:hover img {
		transform: scale(1.05);
	}

	.navbar-right-content {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.nav-menu {
		display: flex;
		gap: 30px;
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
		color: var(--nav-text);
		opacity: 0.5;
		user-select: none;
	}

	.nav-menu a {
		color: var(--nav-text);
		text-decoration: none;
		font-size: 14px;
		font-weight: 500;
		transition:
			color 0.3s,
			transform 0.2s;
		display: inline-block;
		position: relative;
	}

	.nav-menu a::after {
		content: '';
		position: absolute;
		bottom: -5px;
		left: 50%;
		transform: translateX(-50%) scaleX(0);
		width: 100%;
		height: 2px;
		background: var(--nav-text-hover);
		transition: transform 0.3s ease;
	}

	.nav-menu a:hover {
		color: var(--nav-text-hover);
	}

	.nav-menu a:hover::after {
		transform: translateX(-50%) scaleX(1);
	}

	.social-icons {
		display: flex;
		gap: 15px;
		align-items: center;
	}

	.social-icons a {
		color: white;
		font-size: 18px;
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.1);
		transition: all 0.3s ease;
	}

	.social-icons a:hover {
		background: rgba(255, 255, 255, 0.2);
		transform: translateY(-3px);
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
	}

	.social-icon {
		width: 20px;
		height: 20px;
	}

	.btn-donar {
		background: linear-gradient(135deg, #ffa500, #ff8c00);
		color: white;
		padding: 10px 30px;
		border-radius: 25px;
		text-decoration: none;
		font-weight: 600;
		box-shadow: 0 4px 15px rgba(255, 165, 0, 0.4);
		transition: transform 0.3s;
	}

	.btn-donar:hover {
		transform: translateY(-2px);
	}

	.hamburger-menu {
		display: none;
		flex-direction: column;
		background: none;
		border: none;
		cursor: pointer;
		padding: 5px;
		z-index: 1001;
	}

	.hamburger-line {
		width: 25px;
		height: 3px;
		background-color: var(--nav-text);
		margin: 3px 0;
		transition: all 0.3s ease;
		border-radius: 3px;
	}

	.hamburger-menu.active .hamburger-line:nth-child(1) {
		transform: rotate(45deg) translate(8px, 8px);
	}

	.hamburger-menu.active .hamburger-line:nth-child(2) {
		opacity: 0;
	}

	.hamburger-menu.active .hamburger-line:nth-child(3) {
		transform: rotate(-45deg) translate(7px, -7px);
	}

	/* Tablet y pantallas medianas */
	@media (max-width: 1024px) {
		.navbar-logo img {
			height: 60px;
		}
	}

	/* Mobile */
	@media (max-width: 768px) {
		.navbar {
			padding: 15px 20px;
		}

		.navbar-logo img {
			height: 50px;
			min-height: 50px;
		}

		.hamburger-menu {
			display: flex !important;
		}

		.navbar-right-content {
			position: fixed;
			top: 0;
			right: -100%;
			height: 100vh;
			width: 80%;
			max-width: 400px;

			/* Glassmorphic effect para menú móvil */
			background: var(--mobile-menu-bg);
			backdrop-filter: blur(20px) saturate(180%);
			-webkit-backdrop-filter: blur(20px) saturate(180%);

			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;
			padding: 80px 30px 30px;
			gap: 2rem;
			transition: right 0.3s ease;
			box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
			overflow-y: auto;
			z-index: 999;
		}

		/* Fallback para navegadores sin soporte de backdrop-filter */
		@supports not (backdrop-filter: blur(20px)) {
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
			gap: 1.5rem;
			width: 100%;
		}

		.nav-menu li {
			width: 100%;
		}

		.nav-menu a {
			display: block;
			padding: 10px 0;
			font-size: 18px;
			border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		}

		.nav-separator {
			display: none;
		}

		.social-icons {
			flex-direction: row;
			width: 100%;
			justify-content: flex-start;
		}

		.btn-donar {
			width: 100%;
			text-align: center;
			padding: 15px 30px;
		}
	}

	/* Pantallas muy pequeñas */
	@media (max-width: 480px) {
		.navbar {
			padding: 10px 15px;
		}

		.navbar-logo img {
			height: 45px;
			min-height: 45px;
		}
	}

	/* Pantallas extra pequeñas */
	@media (max-width: 360px) {
		.navbar {
			padding: 8px 12px;
		}

		.navbar-logo img {
			height: 40px;
			min-height: 40px;
		}
	}
</style>
