<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Navbar from '$lib/components/Navbar.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import PublicacionCard from '$lib/components/PublicacionCard.svelte';
	import { urlFor } from '$lib/sanity';

	// Recibimos los datos del servidor (+page.server.js)
	let { data } = $props();

	// Tipos para Documentos Unificados
	interface Documento {
		id: string;
		slug?: string;
		title: string;
		date: string;
		year?: number;
		image: string;
		excerpt: string;
		category: string;
		documentType: 'publicacion' | 'informe' | 'encuesta';
		pdfUrl: string;
		size: string;
		pages?: number | string;
	}

	// Función para formatear bytes
	function formatBytes(bytes: number, decimals = 1) {
		if (!bytes) return 'PDF';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
	}

	// Mapeo de categorías (value -> display)
	const categoryLabels: Record<string, string> = {
		estudios: 'Estudios',
		investigaciones: 'Investigaciones',
		reportes: 'Reportes',
		documentos: 'Documentos',
		analisis: 'Análisis'
	};

	// Estado para el tipo de documento activo
	let activeDocumentType = $state<'publicacion' | 'informe' | 'encuesta'>('publicacion');

	// Estado para la categoría activa
	let activeCategory = $state<string>('all');

	// Estado para la búsqueda
	let searchQuery = $state('');

	// Estado para los filtros de fecha
	let filterStartDate = $state('');
	let filterEndDate = $state('');

	// Inicializar desde URL params
	$effect(() => {
		const tipo = $page.url.searchParams.get('tipo');
		if (tipo === 'informes') {
			activeDocumentType = 'informe';
		} else if (tipo === 'encuestas') {
			activeDocumentType = 'encuesta';
		} else {
			activeDocumentType = 'publicacion';
		}
	});

	// Transformar publicaciones de Sanity
	let publicaciones = $derived<Documento[]>(
		data.publications
			? data.publications.map((p: any) => ({
					id: p._id,
					slug: p.slug?.current,
					title: p.title,
					date: p.publishedAt,
					image: p.coverImage ? urlFor(p.coverImage).width(800).height(450).url() : '',
					excerpt: p.description || 'Publicación disponible para consulta.',
					category: p.category || 'documentos',
					documentType: 'publicacion' as const,
					pdfUrl: p.pdfUrl,
					size: formatBytes(p.size)
				}))
			: []
	);

	// Transformar informes de Sanity
	let informes = $derived<Documento[]>(
		data.reports
			? data.reports.map((r: any) => ({
					id: r._id,
					title: r.title,
					date: `${r.year}-01-01`,
					year: r.year,
					image: r.coverImage ? urlFor(r.coverImage).width(800).height(450).url() : '',
					excerpt: r.description || 'Informe disponible para descarga.',
					category: 'informe',
					documentType: 'informe' as const,
					pdfUrl: r.pdfUrl,
					size: formatBytes(r.size),
					pages: r.pages || 'N/A'
				}))
			: []
	);

	// Transformar encuestas de Sanity
	let encuestas = $derived<Documento[]>(
		data.surveys
			? data.surveys.map((s: any) => ({
					id: s._id,
					title: s.title,
					date: s.publishedAt,
					image: s.coverImage ? urlFor(s.coverImage).width(800).height(450).url() : '',
					excerpt: s.description || 'Encuesta disponible para consulta.',
					category: 'encuesta',
					documentType: 'encuesta' as const,
					pdfUrl: s.pdfUrl,
					size: formatBytes(s.size)
				}))
			: []
	);

	// Combinar todos los documentos
	let todosLosDocumentos = $derived<Documento[]>([...publicaciones, ...informes, ...encuestas]);

	// Categorías disponibles desde Sanity
	let categories = $derived<string[]>(data.categories || []);

	// Filtrar documentos
	let documentosFiltrados = $derived(() => {
		// Filtrar por tipo de documento
		let filtered = todosLosDocumentos.filter((d: Documento) => d.documentType === activeDocumentType);

		// Filtrar por categoría si no es "all" (solo aplica a publicaciones)
		if (activeCategory !== 'all') {
			filtered = filtered.filter((d: Documento) => d.category === activeCategory);
		}

		// Aplicar filtro de búsqueda por título
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase().trim();
			filtered = filtered.filter((d: Documento) => d.title.toLowerCase().includes(query));
		}

		// Aplicar filtro de fechas
		if (filterStartDate) {
			filtered = filtered.filter((d: Documento) => d.date >= filterStartDate);
		}
		if (filterEndDate) {
			filtered = filtered.filter((d: Documento) => d.date <= filterEndDate);
		}

		// Ordenar por fecha descendente
		return filtered.sort(
			(a: Documento, b: Documento) => new Date(b.date).getTime() - new Date(a.date).getTime()
		);
	});

	function clearFilters() {
		searchQuery = '';
		filterStartDate = '';
		filterEndDate = '';
	}

	function setCategory(category: string) {
		activeCategory = category;
		clearFilters();
	}

	function setDocumentType(type: 'publicacion' | 'informe' | 'encuesta') {
		activeDocumentType = type;
		activeCategory = 'all';
		clearFilters();

		// Actualizar URL
		const url = new URL($page.url);
		if (type === 'informe') {
			url.searchParams.set('tipo', 'informes');
		} else if (type === 'encuesta') {
			url.searchParams.set('tipo', 'encuestas');
		} else {
			url.searchParams.delete('tipo');
		}
		goto(url.toString(), { replaceState: true, noScroll: true });
	}
</script>

<svelte:head>
	<title>Publicaciones | Consejo Cívico de Laguna</title>
	<meta
		name="description"
		content="Publicaciones y documentos del Consejo Cívico de la Comarca Lagunera"
	/>
	<meta name="keywords" content="publicaciones, documentos, CCI, laguna, informes, estudios" />

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

<main class="publicaciones-page">
	<!-- Hero Section -->
	<section class="hero-section">
		<div class="hero-content">
			<h1>Publicaciones</h1>
			<p class="hero-description">
				Accede a nuestros documentos, estudios y publicaciones sobre el desarrollo de la Comarca
				Lagunera
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

	<!-- Tabs de Tipo de Documento -->
	<section class="document-type-section">
		<div class="document-type-container">
			<div class="document-type-tabs">
				<button
					class="type-tab"
					class:active={activeDocumentType === 'publicacion'}
					onclick={() => setDocumentType('publicacion')}
				>
					<span class="tab-text">Publicaciones</span>
				</button>
				<button
					class="type-tab"
					class:active={activeDocumentType === 'informe'}
					onclick={() => setDocumentType('informe')}
				>
					<span class="tab-text">Informes</span>
				</button>
				<button
					class="type-tab"
					class:active={activeDocumentType === 'encuesta'}
					onclick={() => setDocumentType('encuesta')}
				>
					<span class="tab-text">Encuestas</span>
				</button>
			</div>
		</div>
	</section>

	<!-- Tabs de Categorías (solo visible para publicaciones) -->
	{#if activeDocumentType === 'publicacion'}
		<section class="themes-section">
			<div class="themes-container">
				<div class="theme-tabs">
					<button
						class="theme-tab"
						class:active={activeCategory === 'all'}
						onclick={() => setCategory('all')}
					>
						<span class="tab-text">Todas</span>
					</button>
					{#each categories as category}
						<button
							class="theme-tab"
							class:active={activeCategory === category}
							onclick={() => setCategory(category)}
						>
							<span class="tab-text">{categoryLabels[category] || category}</span>
						</button>
					{/each}
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
	{/if}

	<!-- Grid de Documentos -->
	<section class="publicaciones-section">
		<div class="publicaciones-container">
			{#if documentosFiltrados().length > 0}
				<div class="publicaciones-grid">
					{#each documentosFiltrados() as documento (documento.id)}
						<PublicacionCard publicacion={documento} />
					{/each}
				</div>
			{:else}
				<div class="no-results">
					<div class="no-results-icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
						>
							<path
								d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
					</div>
					<p>No se encontraron documentos.</p>
					<span class="no-results-hint">
						{#if activeDocumentType === 'informe'}
							Los informes estarán disponibles próximamente.
						{:else if activeDocumentType === 'publicacion'}
							Las publicaciones estarán disponibles próximamente.
						{:else if activeDocumentType === 'encuesta'}
							Las encuestas estarán disponibles próximamente.
						{:else}
							Los documentos estarán disponibles próximamente cuando se configure el contenido.
						{/if}
					</span>
				</div>
			{/if}
		</div>
	</section>
</main>

<Footer />

<style>
	.publicaciones-page {
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

	/* Document Type Section */
	.document-type-section {
		background: var(--bg-primary);
		padding: 30px 50px 0;
		transition: background 0.3s ease;
		position: relative;
		z-index: 10;
	}

	.document-type-container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.document-type-tabs {
		display: flex;
		gap: 10px;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	.type-tab {
		padding: 14px 32px;
		font-size: 16px;
		font-weight: 700;
		background: var(--card-bg);
		color: var(--text-primary);
		border: 2px solid transparent;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 2px 8px var(--card-shadow);
	}

	.type-tab:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px var(--card-shadow);
		border-color: rgba(74, 123, 167, 0.3);
	}

	:global([data-theme='dark']) .type-tab:hover {
		border-color: rgba(0, 212, 255, 0.3);
	}

	.type-tab.active {
		background: linear-gradient(135deg, #2b4a69, #1e3b59);
		color: white;
		border-color: #2b4a69;
	}

	:global([data-theme='dark']) .type-tab.active {
		background: linear-gradient(135deg, #00d4ff, #0099cc);
		border-color: #00d4ff;
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
		gap: 15px;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	.theme-tab {
		padding: 12px 28px;
		font-size: 16px;
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
		border-color: rgba(74, 123, 167, 0.3);
	}

	:global([data-theme='dark']) .theme-tab:hover {
		border-color: rgba(0, 212, 255, 0.3);
	}

	.theme-tab.active {
		background: linear-gradient(135deg, #4a7ba7, #2c5f8d);
		color: white;
		border-color: #4a7ba7;
	}

	:global([data-theme='dark']) .theme-tab.active {
		background: linear-gradient(135deg, #00d4ff, #0099cc);
		border-color: #00d4ff;
	}

	.tab-text {
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	/* Date Filters - diseño compacto en línea */
	.date-filters {
		display: flex;
		gap: 16px;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		padding: 16px 24px;
		border-radius: 50px;
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

	/* Publicaciones Section */
	.publicaciones-section {
		background: var(--bg-primary);
		padding: 60px 50px;
		transition: background 0.3s ease;
		position: relative;
		z-index: 10;
	}

	.publicaciones-container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.publicaciones-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 30px;
	}

	.no-results {
		text-align: center;
		padding: 80px 20px;
	}

	.no-results-icon {
		width: 80px;
		height: 80px;
		margin: 0 auto 24px;
		color: var(--text-primary);
		opacity: 0.3;
	}

	.no-results-icon svg {
		width: 100%;
		height: 100%;
	}

	.no-results p {
		font-size: 20px;
		color: var(--text-primary);
		opacity: 0.7;
		margin-bottom: 12px;
	}

	.no-results-hint {
		font-size: 14px;
		color: var(--text-primary);
		opacity: 0.5;
		display: block;
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

		.document-type-section {
			padding: 20px 20px 0;
		}

		.type-tab {
			padding: 10px 20px;
			font-size: 14px;
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
			gap: 10px;
		}

		.theme-tab {
			padding: 10px 20px;
			font-size: 14px;
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

		.publicaciones-section {
			padding: 40px 20px;
		}

		.publicaciones-grid {
			grid-template-columns: 1fr;
			gap: 25px;
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

		.type-tab {
			padding: 8px 16px;
			font-size: 13px;
		}

		.theme-tab {
			padding: 8px 16px;
			font-size: 13px;
		}
	}
</style>
