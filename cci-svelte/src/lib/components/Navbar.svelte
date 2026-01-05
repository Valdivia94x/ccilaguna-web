<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import { browser } from '$app/environment';

	let isMenuOpen = $state(false);
	let isProjectsDropdownOpen = $state(false);

	// Lista de proyectos (mismos que InteractiveProyectos)
	const proyectos = [
		{ title: 'Observatorio de la Laguna', href: 'https://observatoriodelalaguna.org.mx/', external: true },
		{ title: 'MIDLAG', href: '/midlag', external: false },
		{ title: 'Regidor MX Laguna', href: '/regidor-mx', external: false },
		{ title: 'Mesa de Seguridad y Justicia', href: '/mesa-seguridad', external: false },
		{
			title: 'Karewa Laguna',
			href: 'https://www.karewalaguna.org/select-organization?redirectTo=%2F',
			external: true
		},
		{ title: 'Agenda Anticorrupción', href: '/agenda-anticorrupcion', external: false }
	];

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
		isProjectsDropdownOpen = false;
	}

	function toggleProjectsDropdown() {
		isProjectsDropdownOpen = !isProjectsDropdownOpen;
	}

	function openProjectsDropdown() {
		isProjectsDropdownOpen = true;
	}

	function closeProjectsDropdown() {
		isProjectsDropdownOpen = false;
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
			<li
				class="nav-dropdown"
				role="none"
				onmouseenter={openProjectsDropdown}
				onmouseleave={closeProjectsDropdown}
			>
				<button
					class="nav-dropdown-trigger"
					role="menuitem"
					aria-haspopup="true"
					aria-expanded={isProjectsDropdownOpen}
					onclick={toggleProjectsDropdown}
				>
					PROYECTOS
					<svg class="dropdown-arrow" class:open={isProjectsDropdownOpen} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<polyline points="6 9 12 15 18 9"></polyline>
					</svg>
				</button>
				<ul class="dropdown-menu" class:open={isProjectsDropdownOpen} role="menu">
					{#each proyectos as proyecto}
						<li role="none">
							{#if proyecto.external}
								<a
									href={proyecto.href}
									target="_blank"
									rel="noopener noreferrer"
									role="menuitem"
									onclick={closeMenu}
								>
									{proyecto.title}
									<svg class="external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
										<polyline points="15 3 21 3 21 9"></polyline>
										<line x1="10" y1="14" x2="21" y2="3"></line>
									</svg>
								</a>
							{:else}
								<a href={proyecto.href} role="menuitem" onclick={closeMenu}>
									{proyecto.title}
								</a>
							{/if}
						</li>
					{/each}
				</ul>
			</li>
			<li class="nav-separator" aria-hidden="true">|</li>
			<li role="none"><a href="/blog" role="menuitem" onclick={closeMenu}>BLOG</a></li>
			<li class="nav-separator" aria-hidden="true">|</li>
			<li role="none"><a href="/boletines" role="menuitem" onclick={closeMenu}>BOLETINES</a></li>
			<li class="nav-separator" aria-hidden="true">|</li>
			<li role="none"><a href="/publicaciones" role="menuitem" onclick={closeMenu}>PUBLICACIONES</a></li>
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

	/* Dropdown styles */
	.nav-dropdown {
		position: relative;
	}

	.nav-dropdown-trigger {
		color: var(--nav-text);
		background: none;
		border: none;
		font-size: 14px;
		font-weight: 600;
		letter-spacing: 0.025em;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 8px 12px;
		border-radius: 6px;
		transition: color 0.3s ease;
		font-family: inherit;
	}

	.nav-dropdown-trigger:hover {
		color: var(--nav-text-hover);
	}

	.dropdown-arrow {
		width: 14px;
		height: 14px;
		transition: transform 0.3s ease;
	}

	.dropdown-arrow.open {
		transform: rotate(180deg);
	}

	.dropdown-menu {
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		background: var(--card-bg);
		border: 1px solid var(--navbar-border);
		border-radius: 12px;
		padding: 8px 0;
		min-width: 240px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
		opacity: 0;
		visibility: hidden;
		transition: all 0.3s ease;
		z-index: 100;
		list-style: none;
		margin: 0;
	}

	.dropdown-menu.open {
		opacity: 1;
		visibility: visible;
	}

	.dropdown-menu li {
		margin: 0;
		padding: 0;
	}

	.dropdown-menu a {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 20px;
		color: var(--text-primary);
		text-decoration: none;
		font-size: 14px;
		font-weight: 500;
		transition: all 0.2s ease;
		border-radius: 0;
	}

	.dropdown-menu a:hover {
		background: var(--navbar-border);
		color: var(--nav-text-hover);
	}

	.external-icon {
		width: 14px;
		height: 14px;
		opacity: 0.5;
		flex-shrink: 0;
	}

	.dropdown-menu a:hover .external-icon {
		opacity: 0.8;
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

	/* Extra large screens (1280px+) */
	@media (min-width: 1280px) {
		.navbar {
			padding: 16px 48px;
		}

		.nav-menu a {
			font-size: 16px;
			padding: 8px 12px;
		}

		.nav-dropdown-trigger {
			font-size: 16px;
			padding: 8px 12px;
		}

		.btn-donar {
			font-size: 14px;
			padding: 10px 24px;
		}

		.navbar-logo img {
			height: 64px;
		}
	}

	/* Large screens (1024px - 1279px) */
	@media (min-width: 1024px) and (max-width: 1279px) {
		.navbar {
			padding: 14px 24px;
		}

		.navbar-logo img {
			height: 52px;
		}

		.navbar-right-content {
			gap: 1rem;
		}

		.nav-menu {
			gap: 2px;
		}

		.nav-menu a {
			font-size: 12px;
			padding: 6px 6px;
		}

		.nav-dropdown-trigger {
			font-size: 12px;
			padding: 6px 6px;
		}

		.nav-separator {
			font-size: 12px;
			padding: 0 2px;
		}

		.social-icons {
			gap: 6px;
		}

		.social-icons a {
			width: 30px;
			height: 30px;
		}

		.social-icon {
			width: 20px;
			height: 20px;
		}

		.btn-donar {
			font-size: 11px;
			padding: 8px 16px;
		}

		.dropdown-arrow {
			width: 12px;
			height: 12px;
		}
	}

	/* Medium screens (900px - 1023px) */
	@media (min-width: 900px) and (max-width: 1023px) {
		.navbar {
			padding: 12px 16px;
		}

		.navbar-logo img {
			height: 44px;
		}

		.navbar-right-content {
			gap: 0.75rem;
		}

		.nav-menu {
			gap: 1px;
		}

		.nav-menu a {
			font-size: 10px;
			padding: 5px 4px;
		}

		.nav-dropdown-trigger {
			font-size: 10px;
			padding: 5px 4px;
			gap: 2px;
		}

		.nav-separator {
			font-size: 10px;
			padding: 0 1px;
		}

		.social-icons {
			gap: 4px;
		}

		.social-icons a {
			width: 26px;
			height: 26px;
		}

		.social-icon {
			width: 18px;
			height: 18px;
		}

		.btn-donar {
			font-size: 10px;
			padding: 6px 12px;
		}

		.dropdown-arrow {
			width: 10px;
			height: 10px;
		}

		.dropdown-menu {
			min-width: 200px;
		}

		.dropdown-menu a {
			padding: 10px 16px;
			font-size: 12px;
		}
	}

	/* Small-medium screens (769px - 899px) */
	@media (min-width: 769px) and (max-width: 899px) {
		.navbar {
			padding: 10px 12px;
		}

		.navbar-logo img {
			height: 40px;
		}

		.navbar-right-content {
			gap: 0.5rem;
		}

		.nav-menu {
			gap: 0;
		}

		.nav-menu a {
			font-size: 9px;
			padding: 4px 3px;
		}

		.nav-dropdown-trigger {
			font-size: 9px;
			padding: 4px 3px;
			gap: 1px;
		}

		.nav-separator {
			font-size: 9px;
			padding: 0;
		}

		.social-icons {
			gap: 2px;
		}

		.social-icons a {
			width: 24px;
			height: 24px;
		}

		.social-icon {
			width: 16px;
			height: 16px;
		}

		.btn-donar {
			font-size: 9px;
			padding: 5px 10px;
		}

		.dropdown-arrow {
			width: 9px;
			height: 9px;
		}

		.dropdown-menu {
			min-width: 180px;
		}

		.dropdown-menu a {
			padding: 8px 12px;
			font-size: 11px;
		}
	}

	/* Mobile - Menú hamburger activo */
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

		/* Dropdown en móvil */
		.nav-dropdown {
			width: 100%;
		}

		.nav-dropdown-trigger {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 16px 0;
			font-size: 18px;
			border-bottom: 1px solid var(--navbar-border);
			border-radius: 0;
		}

		.dropdown-menu {
			position: static;
			transform: none;
			width: 100%;
			border: none;
			border-radius: 0;
			box-shadow: none;
			padding: 0;
			background: transparent;
			max-height: 0;
			overflow: hidden;
			opacity: 1;
			visibility: visible;
			transition: max-height 0.3s ease;
		}

		.dropdown-menu.open {
			max-height: 500px;
		}

		.dropdown-menu a {
			padding: 14px 20px;
			font-size: 16px;
			border-bottom: 1px solid var(--navbar-border);
			background: var(--navbar-border);
		}

		.dropdown-menu a:hover {
			background: var(--nav-text-hover);
			color: white;
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
