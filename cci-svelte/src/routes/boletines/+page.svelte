<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import BoletinCard from '$lib/components/BoletinCard.svelte';
	import { urlFor } from '$lib/sanity'; // <--- Importamos Sanity

	// Recibimos los datos del servidor (+page.server.js)
	let { data } = $props();

	// Tipos (Actualizados para incluir PDF y tamaño)
	interface Boletin {
		id: string;
		title: string;
		date: string;
		image: string;
		excerpt: string;
		category: 'seguridad' | 'empleo';
		pdfUrl: string; // Nuevo
		size: string; // Nuevo
	}

	// Función para formatear bytes (la misma que en Informes)
	function formatBytes(bytes: number, decimals = 1) {
		if (!bytes) return 'PDF';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
	}

	// Estado para el tema activo
	let activeTheme = $state<'seguridad' | 'empleo'>('seguridad');

	// Estado para la búsqueda
	let searchQuery = $state('');

	// Estado para los filtros de fecha
	let filterStartDate = $state('');
	let filterEndDate = $state('');

	// Estado para paginación
	const ITEMS_PER_PAGE = 6;
	let currentPage = $state(1);

	// --- TRANSFORMACIÓN DE DATOS ---
	// Convertimos los datos crudos de Sanity al formato que tu UI ya conoce
	let boletines = $derived(
		data.newsletters
			? data.newsletters.map((n: any) => ({
					id: n._id,
					title: n.title,
					slug: n.slug.current,
					date: n.publishedAt,
					// Generamos la URL de la imagen (cuadrada para que se vea bien en cards)
					image: n.coverImage ? urlFor(n.coverImage).width(600).height(340).url() : '',
					// Como no pusimos "excerpt" en el schema del boletín, usamos el tamaño como info útil
					excerpt: n.description || `Boletín disponible en PDF (${formatBytes(n.size)})`,
					// Convertimos "Seguridad" (Sanity) a "seguridad" (Tu UI)
					category: (n.category ? n.category.toLowerCase() : 'seguridad') as 'seguridad' | 'empleo',
					pdfUrl: n.pdfUrl,
					size: formatBytes(n.size)
				}))
			: []
	);

	// Filtrar boletines (Lógica original pero usando la variable reactiva 'boletines')
	let boletinesFiltrados = $derived(() => {
		// Usamos la lista procesada de Sanity
		let filtered = boletines.filter((b: Boletin) => b.category === activeTheme);

		// Aplicar filtro de búsqueda por título
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase().trim();
			filtered = filtered.filter((b: Boletin) => b.title.toLowerCase().includes(query));
		}

		// Aplicar filtro de fechas
		if (filterStartDate) {
			filtered = filtered.filter((b: Boletin) => b.date >= filterStartDate);
		}
		if (filterEndDate) {
			filtered = filtered.filter((b: Boletin) => b.date <= filterEndDate);
		}

		// Ordenar por fecha descendente
		return filtered.sort(
			(a: Boletin, b: Boletin) => new Date(b.date).getTime() - new Date(a.date).getTime()
		);
	});

	// Calcular total de páginas
	let totalPages = $derived(Math.ceil(boletinesFiltrados().length / ITEMS_PER_PAGE));

	// Boletines paginados
	let boletinesPaginados = $derived(() => {
		const start = (currentPage - 1) * ITEMS_PER_PAGE;
		const end = start + ITEMS_PER_PAGE;
		return boletinesFiltrados().slice(start, end);
	});

	function clearFilters() {
		searchQuery = '';
		filterStartDate = '';
		filterEndDate = '';
		currentPage = 1;
	}

	function goToPage(page: number) {
		if (page >= 1 && page <= totalPages) {
			currentPage = page;
			// Scroll suave hacia arriba de la sección de boletines
			document.querySelector('.boletines-section')?.scrollIntoView({ behavior: 'smooth' });
		}
	}

	// Resetear página cuando cambian los filtros
	$effect(() => {
		// Cuando cambia el tema, búsqueda o fechas, volver a página 1
		activeTheme;
		searchQuery;
		filterStartDate;
		filterEndDate;
		currentPage = 1;
	});
</script>

<svelte:head>
	<title>Boletines | Consejo Cívico de Laguna</title>
	<meta
		name="description"
		content="Boletines informativos sobre seguridad y empleo en la Comarca Lagunera"
	/>
	<meta name="keywords" content="boletines, seguridad, empleo, laguna, informes" />

	<!-- Preconnect for performance -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />

	<!-- Google Fonts -->
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Navbar />
<ThemeToggle />

<main class="boletines-page">
	<!-- Hero Section -->
	<section class="hero-section">
		<div class="hero-content">
			<h1>Boletines Informativos</h1>
			<p class="hero-description">
				Accede a nuestros informes y análisis sobre seguridad y empleo en la Comarca Lagunera
			</p>
		</div>
	</section>

	<div class="spacer"></div>

	<!-- Buscador -->
	<section class="search-section">
		<div class="search-container">
			<svg
				class="search-icon"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 512 512"
				fill="currentColor"
			>
				<path
					d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
				/>
			</svg>
			<input
				type="text"
				class="search-input"
				placeholder="Buscar por título..."
				bind:value={searchQuery}
			/>
		</div>
	</section>

	<!-- Tabs de Temas -->
	<section class="themes-section">
		<div class="themes-container">
			<div class="theme-tabs">
				<button
					class="theme-tab theme-tab-seguridad"
					class:active={activeTheme === 'seguridad'}
					onclick={() => {
						activeTheme = 'seguridad';
						clearFilters();
					}}
				>
					<span class="tab-text">Seguridad</span>
				</button>
				<button
					class="theme-tab theme-tab-empleo"
					class:active={activeTheme === 'empleo'}
					onclick={() => {
						activeTheme = 'empleo';
						clearFilters();
					}}
				>
					<span class="tab-text">Empleo</span>
				</button>
			</div>

			<!-- Filtros de Fecha -->
			<div class="date-filters">
				<div class="filter-group">
					<label for="start-date">Desde:</label>
					<input type="date" id="start-date" bind:value={filterStartDate} />
				</div>
				<div class="filter-group">
					<label for="end-date">Hasta:</label>
					<input type="date" id="end-date" bind:value={filterEndDate} />
				</div>
				<button class="clear-filters-btn" onclick={clearFilters}>Limpiar Filtros</button>
			</div>
		</div>
	</section>

	<!-- Grid de Boletines -->
	<section class="boletines-section">
		<div class="boletines-container">
			{#if boletinesFiltrados().length > 0}
				<div class="boletines-grid">
					{#each boletinesPaginados() as boletin (boletin.id)}
						<BoletinCard {boletin} />
					{/each}
				</div>

				<!-- Paginación -->
				{#if totalPages > 1}
					<nav class="pagination" aria-label="Paginación de boletines">
						<button
							class="pagination-btn pagination-prev"
							onclick={() => goToPage(currentPage - 1)}
							disabled={currentPage === 1}
							aria-label="Página anterior"
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polyline points="15 18 9 12 15 6"></polyline>
							</svg>
						</button>

						<div class="pagination-numbers">
							{#each Array(totalPages) as _, i}
								{@const page = i + 1}
								{#if page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)}
									<button
										class="pagination-number"
										class:active={currentPage === page}
										onclick={() => goToPage(page)}
										aria-label="Ir a página {page}"
										aria-current={currentPage === page ? 'page' : undefined}
									>
										{page}
									</button>
								{:else if page === currentPage - 2 || page === currentPage + 2}
									<span class="pagination-ellipsis">...</span>
								{/if}
							{/each}
						</div>

						<button
							class="pagination-btn pagination-next"
							onclick={() => goToPage(currentPage + 1)}
							disabled={currentPage === totalPages}
							aria-label="Página siguiente"
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polyline points="9 18 15 12 9 6"></polyline>
							</svg>
						</button>
					</nav>

					<p class="pagination-info">
						Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, boletinesFiltrados().length)} de {boletinesFiltrados().length} boletines
					</p>
				{/if}
			{:else}
				<div class="no-results">
					<p>No se encontraron boletines para los criterios seleccionados.</p>
				</div>
			{/if}
		</div>
	</section>
</main>

<Footer />

<style>
	.boletines-page {
		min-height: calc(100vh - 200px);
	}

	/* Hero Section con efecto parallax fijo */
	.hero-section {
		position: fixed;
		background:
			linear-gradient(135deg, rgba(43, 74, 105, 0.8) 0%, rgba(30, 59, 89, 0.8) 100%),
			url('/images/backgroundTorreon.png') center/cover no-repeat;
		background-attachment: fixed;
		min-height: 400px;
		width: 100%;
		padding: 80px 50px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		z-index: 1;
		transition: background 0.3s ease;
	}

	:global([data-theme='dark']) .hero-section {
		background:
			linear-gradient(135deg, rgba(15, 20, 25, 0.9) 0%, rgba(15, 20, 25, 0.9) 100%),
			url('/images/backgroundTorreon.png') center/cover no-repeat;
		background-attachment: fixed;
	}

	.spacer {
		height: 40vh;
	}

	.hero-content {
		max-width: 900px;
		margin: 0 auto;
	}

	.hero-section h1 {
		font-size: 56px;
		font-weight: 400;
		color: #ffffff;
		margin-bottom: 20px;
		text-transform: uppercase;
		letter-spacing: 2px;
		text-shadow: #000000 0px 4px 6px;
	}

	.hero-description {
		font-size: 20px;
		line-height: 1.6;
		color: #ffffff;
		text-shadow: #000000 0px 4px 6px;
	}

	/* Search Section */
	.search-section {
		background: var(--bg-primary);
		padding: 40px 50px 20px;
		transition: background 0.3s ease;
		position: relative;
		z-index: 10;
	}

	.search-container {
		position: relative;
		max-width: 500px;
		margin: 0 auto;
	}

	.search-icon {
		position: absolute;
		left: 18px;
		top: 50%;
		transform: translateY(-50%) scale(1);
		width: 18px;
		height: 18px;
		color: var(--text-primary);
		opacity: 0.5;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		pointer-events: none;
	}

	/* Animación del icono al focus */
	.search-container:focus-within .search-icon {
		opacity: 1;
		transform: translateY(-50%) scale(1.1);
		color: #4a7ba7;
	}

	:global([data-theme='dark']) .search-container:focus-within .search-icon {
		color: #00d4ff;
	}

	.search-input {
		width: 100%;
		padding: 14px 20px 14px 50px;
		border: 2px solid rgba(74, 123, 167, 0.3);
		border-radius: 30px;
		font-size: 16px;
		background: var(--card-bg);
		color: var(--text-primary);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.search-input::placeholder {
		color: var(--text-primary);
		opacity: 0.5;
		transition: opacity 0.3s ease;
	}

	.search-input:focus::placeholder {
		opacity: 0.3;
	}

	.search-input:focus {
		outline: none;
		border-color: #4a7ba7;
		box-shadow:
			0 0 0 4px rgba(74, 123, 167, 0.15),
			0 4px 20px rgba(74, 123, 167, 0.2);
	}

	:global([data-theme='dark']) .search-input {
		border-color: rgba(0, 212, 255, 0.3);
	}

	:global([data-theme='dark']) .search-input:focus {
		border-color: #00d4ff;
		box-shadow:
			0 0 0 4px rgba(0, 212, 255, 0.15),
			0 4px 20px rgba(0, 212, 255, 0.25);
	}

	/* Themes Section */
	.themes-section {
		background: var(--bg-primary);
		padding: 40px 50px;
		transition: background 0.3s ease;
		border-bottom: 1px solid var(--navbar-border);
		position: relative;
		z-index: 10;
	}

	.themes-container {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 30px;
	}

	.theme-tabs {
		display: flex;
		gap: 30px;
		justify-content: center;
		align-items: center;
	}

	.theme-tab {
		padding: 15px 40px;
		font-size: 18px;
		font-weight: 600;
		background: var(--card-bg);
		color: var(--text-primary);
		border: 2px solid transparent;
		border-radius: 30px;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 2px 8px var(--card-shadow);
	}

	.theme-tab:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px var(--card-shadow);
	}

	.theme-tab.active {
		background: linear-gradient(135deg, #3b82f6, #2563eb);
		color: white;
		border-color: #3b82f6;
	}

	/* Estilos base compartidos para tarjetas de categoría */
	.theme-tab-seguridad,
	.theme-tab-empleo {
		position: relative;
		width: 380px;
		aspect-ratio: 16 / 9;
		padding: 0;
		border-radius: 20px;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		overflow: hidden;
		transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
		border: none;
		box-shadow:
			0 4px 20px rgba(0, 0, 0, 0.15),
			0 8px 40px rgba(0, 0, 0, 0.1);
	}

	/* Forzar imagen de fondo en tarjetas - sobrescribir .theme-tab.active */
	.theme-tab-seguridad,
	.theme-tab-seguridad.active {
		background: url('/images/boletines/seguridad.png') center/cover no-repeat !important;
	}

	.theme-tab-empleo,
	.theme-tab-empleo.active {
		background: url('/images/boletines/empleo.jpg') center/cover no-repeat !important;
	}

	/* Hover compartido */
	.theme-tab-seguridad:hover,
	.theme-tab-empleo:hover {
		transform: translateY(-6px) scale(1.02);
		box-shadow:
			0 12px 40px rgba(0, 0, 0, 0.25),
			0 20px 60px rgba(0, 0, 0, 0.15);
	}

	/* Estado activo compartido */
	.theme-tab-seguridad.active,
	.theme-tab-empleo.active {
		transform: translateY(-4px);
		box-shadow:
			0 8px 30px rgba(0, 0, 0, 0.2),
			0 4px 20px rgba(59, 130, 246, 0.15);
	}

	/* Gradient overlay desde abajo - permanente */
	.theme-tab-seguridad::before,
	.theme-tab-empleo::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to top,
			rgba(0, 0, 0, 0.75) 0%,
			rgba(0, 0, 0, 0.35) 50%,
			rgba(0, 0, 0, 0.1) 100%
		);
		transition: all 0.5s ease;
		z-index: 1;
	}

	/* Overlay más intenso en hover */
	.theme-tab-seguridad:hover::before,
	.theme-tab-empleo:hover::before {
		background: linear-gradient(
			to top,
			rgba(0, 0, 0, 0.85) 0%,
			rgba(0, 0, 0, 0.45) 50%,
			rgba(0, 0, 0, 0.15) 100%
		);
	}

	/* Overlay activo - más transparente para ver la imagen */
	.theme-tab-seguridad.active::before,
	.theme-tab-empleo.active::before {
		background: linear-gradient(
			to top,
			rgba(0, 0, 0, 0.7) 0%,
			rgba(0, 0, 0, 0.25) 50%,
			rgba(0, 0, 0, 0.05) 100%
		);
	}

	/* Texto elegante centrado en la parte inferior */
	.theme-tab-seguridad .tab-text,
	.theme-tab-empleo .tab-text {
		position: absolute;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 2;
		color: white;
		font-size: 20px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 3px;
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		white-space: nowrap;
	}

	.theme-tab-seguridad:hover .tab-text,
	.theme-tab-empleo:hover .tab-text {
		letter-spacing: 4px;
		text-shadow: 0 2px 15px rgba(0, 0, 0, 0.8);
	}

	.theme-tab-seguridad.active .tab-text,
	.theme-tab-empleo.active .tab-text {
		letter-spacing: 4px;
		color: #ffffff;
		text-shadow:
			0 2px 10px rgba(59, 130, 246, 0.4),
			0 4px 20px rgba(0, 0, 0, 0.5);
	}

	/* Efecto de luz debajo del texto en estado activo */
	.theme-tab-seguridad.active .tab-text::after,
	.theme-tab-empleo.active .tab-text::after {
		content: '';
		position: absolute;
		bottom: -12px;
		left: 50%;
		transform: translateX(-50%);
		width: 140%;
		height: 25px;
		background: radial-gradient(ellipse at center, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0.3) 40%, transparent 70%);
		filter: blur(10px);
		pointer-events: none;
	}

	/* Indicador de selección sutil (borde luminoso) */
	.theme-tab-seguridad.active,
	.theme-tab-empleo.active {
		box-shadow:
			0 8px 30px rgba(0, 0, 0, 0.2),
			0 4px 20px rgba(59, 130, 246, 0.2),
			inset 0 0 0 2px rgba(59, 130, 246, 0.4);
	}

	/* Date Filters - diseño compacto en línea */
	.date-filters {
		display: flex;
		gap: 16px;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		/*background: var(--card-bg);*/
		padding: 16px 24px;
		border-radius: 50px;
		/*box-shadow: 0 2px 12px var(--card-shadow);*/
		max-width: 600px;
		margin: 0 auto;
	}

	.filter-group {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.filter-group label {
		font-size: 14px;
		font-weight: 500;
		color: var(--text-primary);
		opacity: 0.7;
		white-space: nowrap;
	}

	.filter-group input[type='date'] {
		padding: 10px 14px;
		font-size: 14px;
		border: 2px solid rgba(74, 123, 167, 0.3);
		border-radius: 20px;
		background: var(--bg-primary);
		color: var(--text-primary);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		cursor: pointer;
	}

	.filter-group input[type='date']:hover {
		border-color: rgba(74, 123, 167, 0.5);
	}

	.filter-group input[type='date']:focus {
		outline: none;
		border-color: #4a7ba7;
		box-shadow:
			0 0 0 3px rgba(74, 123, 167, 0.15),
			0 2px 8px rgba(74, 123, 167, 0.1);
	}

	:global([data-theme='dark']) .filter-group input[type='date'] {
		border-color: rgba(0, 212, 255, 0.3);
	}

	:global([data-theme='dark']) .filter-group input[type='date']:hover {
		border-color: rgba(0, 212, 255, 0.5);
	}

	:global([data-theme='dark']) .filter-group input[type='date']:focus {
		border-color: #00d4ff;
		box-shadow:
			0 0 0 3px rgba(0, 212, 255, 0.15),
			0 2px 8px rgba(0, 212, 255, 0.1);
	}

	/* Botón Limpiar Filtros - estilo ghost/outline */
	.clear-filters-btn {
		padding: 10px 20px;
		font-size: 14px;
		font-weight: 600;
		background: transparent;
		color: #ef4444;
		border: 2px solid rgba(239, 68, 68, 0.5);
		border-radius: 20px;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
		overflow: hidden;
	}

	.clear-filters-btn::before {
		content: '';
		position: absolute;
		inset: 0;
		background: #ef4444;
		transform: scaleX(0);
		transform-origin: right;
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		z-index: -1;
	}

	.clear-filters-btn:hover {
		color: white;
		border-color: #ef4444;
		box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
	}

	.clear-filters-btn:hover::before {
		transform: scaleX(1);
		transform-origin: left;
	}

	.clear-filters-btn:active {
		transform: scale(0.97);
	}

	/* Boletines Section */
	.boletines-section {
		background: var(--bg-primary);
		padding: 60px 50px;
		transition: background 0.3s ease;
		position: relative;
		z-index: 10;
	}

	.boletines-container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.boletines-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 30px;
	}

	.no-results {
		text-align: center;
		padding: 60px 20px;
	}

	.no-results p {
		font-size: 18px;
		color: var(--text-primary);
		opacity: 0.7;
	}

	/* Paginación */
	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;
		margin-top: 50px;
	}

	.pagination-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		border: 2px solid rgba(74, 123, 167, 0.3);
		border-radius: 12px;
		background: var(--card-bg);
		color: var(--text-primary);
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.pagination-btn svg {
		width: 20px;
		height: 20px;
	}

	.pagination-btn:hover:not(:disabled) {
		border-color: #4a7ba7;
		background: rgba(74, 123, 167, 0.1);
		transform: translateY(-2px);
	}

	.pagination-btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	:global([data-theme='dark']) .pagination-btn {
		border-color: rgba(0, 212, 255, 0.3);
	}

	:global([data-theme='dark']) .pagination-btn:hover:not(:disabled) {
		border-color: #00d4ff;
		background: rgba(0, 212, 255, 0.1);
	}

	.pagination-numbers {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.pagination-number {
		min-width: 44px;
		height: 44px;
		padding: 0 12px;
		border: 2px solid transparent;
		border-radius: 12px;
		background: var(--card-bg);
		color: var(--text-primary);
		font-size: 16px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.pagination-number:hover {
		border-color: rgba(74, 123, 167, 0.3);
		transform: translateY(-2px);
	}

	.pagination-number.active {
		background: linear-gradient(135deg, #4a7ba7, #2c5f8d);
		color: white;
		border-color: #4a7ba7;
	}

	:global([data-theme='dark']) .pagination-number.active {
		background: linear-gradient(135deg, #00d4ff, #0099cc);
		border-color: #00d4ff;
	}

	.pagination-ellipsis {
		padding: 0 8px;
		color: var(--text-primary);
		opacity: 0.5;
		font-size: 16px;
	}

	.pagination-info {
		text-align: center;
		margin-top: 20px;
		font-size: 14px;
		color: var(--text-primary);
		opacity: 0.6;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.hero-section {
			padding: 60px 30px;
			min-height: 40vh;
		}

		.spacer {
			height: 40vh;
		}

		.hero-section h1 {
			font-size: 40px;
		}

		.hero-description {
			font-size: 18px;
		}

		.search-section {
			padding: 30px 30px 15px;
		}

		.search-input {
			padding: 12px 18px 12px 45px;
			font-size: 15px;
		}

		.themes-section {
			padding: 30px 20px;
		}

		.theme-tabs {
			flex-direction: column;
			gap: 15px;
			align-items: center;
		}

		.theme-tab {
			width: 100%;
			padding: 12px 30px;
		}

		.theme-tab-seguridad,
		.theme-tab-empleo {
			width: 280px;
		}

		.theme-tab-seguridad .tab-text,
		.theme-tab-empleo .tab-text {
			font-size: 16px;
			letter-spacing: 2px;
			bottom: 16px;
		}

		.date-filters {
			flex-direction: column;
			align-items: center;
			padding: 20px;
			border-radius: 20px;
			gap: 12px;
		}

		.filter-group {
			width: 100%;
			justify-content: center;
		}

		.boletines-section {
			padding: 40px 20px;
		}

		.boletines-grid {
			grid-template-columns: 1fr;
			gap: 25px;
		}

		.pagination {
			gap: 6px;
			margin-top: 40px;
		}

		.pagination-btn,
		.pagination-number {
			width: 40px;
			height: 40px;
			min-width: 40px;
		}

		.pagination-number {
			font-size: 14px;
		}
	}

	@media (max-width: 480px) {
		.hero-section {
			padding: 40px 20px;
			min-height: 35vh;
		}

		.spacer {
			height: 35vh;
		}

		.hero-section h1 {
			font-size: 32px;
		}

		.hero-description {
			font-size: 16px;
		}

		.search-section {
			padding: 20px 20px 10px;
		}

		.search-input {
			padding: 10px 15px 10px 42px;
			font-size: 14px;
		}

		.search-icon {
			width: 16px;
			height: 16px;
			left: 15px;
		}

		.theme-tab-seguridad,
		.theme-tab-empleo {
			width: 260px;
		}

		.theme-tab-seguridad .tab-text,
		.theme-tab-empleo .tab-text {
			font-size: 14px;
			letter-spacing: 2px;
			bottom: 14px;
		}

		.pagination {
			gap: 4px;
			margin-top: 30px;
		}

		.pagination-btn,
		.pagination-number {
			width: 36px;
			height: 36px;
			min-width: 36px;
			border-radius: 10px;
		}

		.pagination-btn svg {
			width: 16px;
			height: 16px;
		}

		.pagination-number {
			font-size: 13px;
			padding: 0 8px;
		}

		.pagination-info {
			font-size: 12px;
		}
	}
</style>
