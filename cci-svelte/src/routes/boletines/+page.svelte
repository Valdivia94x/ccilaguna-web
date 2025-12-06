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
					image: n.coverImage ? urlFor(n.coverImage).width(500).height(500).url() : '',
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

	function clearFilters() {
		searchQuery = '';
		filterStartDate = '';
		filterEndDate = '';
	}
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
					{#each boletinesFiltrados() as boletin (boletin.id)}
						<BoletinCard {boletin} />
					{/each}
				</div>
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
		height: 50vh;
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
		transform: translateY(-50%);
		width: 18px;
		height: 18px;
		color: var(--text-primary);
		opacity: 0.5;
	}

	.search-input {
		width: 100%;
		padding: 14px 20px 14px 50px;
		border: 2px solid #4a7ba7;
		border-radius: 30px;
		font-size: 16px;
		background: var(--card-bg);
		color: var(--text-primary);
		transition: all 0.3s ease;
	}

	.search-input::placeholder {
		color: var(--text-primary);
		opacity: 0.5;
	}

	.search-input:focus {
		outline: none;
		border-color: #2c5f8d;
		box-shadow: 0 4px 12px rgba(74, 123, 167, 0.2);
	}

	:global([data-theme='dark']) .search-input {
		border-color: #00d4ff;
	}

	:global([data-theme='dark']) .search-input:focus {
		border-color: #00d4ff;
		box-shadow: 0 4px 12px rgba(0, 212, 255, 0.2);
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
		gap: 20px;
		justify-content: center;
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

	/* Seguridad button - square card with background image */
	.theme-tab-seguridad {
		position: relative;
		width: 450px;
		height: 300px;
		padding: 0;
		border-radius: 16px;
		background-image: url('/images/boletines/seguridad.png');
		background-size: 162%;
		background-position: center;
		background-repeat: no-repeat;
		overflow: hidden;
		transition: background-size 0.3s ease;
		border: 3px solid transparent;
	}

	/* Hover state for seguridad button */
	.theme-tab-seguridad:hover {
		background-size: 177%;
		background-position: center;
	}

	/* Override active state for seguridad button to keep background image */
	.theme-tab-seguridad.active {
		background-image: url('/images/boletines/seguridad.png');
		background-size: 177%;
		background-position: center;
		background-repeat: no-repeat;
		border: none;
		position: relative;
	}

	.theme-tab-seguridad.active::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 16px;
		padding: 2px;
		background: linear-gradient(to bottom right, #06b6d4, #3b82f6);
		-webkit-mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		pointer-events: none;
		z-index: 4;
	}

	/* Dark overlay */
	.theme-tab-seguridad::before {
		content: '';
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.6);
		transition: all 0.3s ease;
		z-index: 1;
	}

	.theme-tab-seguridad:hover::before {
		background: rgba(0, 0, 0, 0.5);
	}

	.theme-tab-seguridad.active::before {
		background: rgba(0, 0, 0, 0.45);
	}

	/* Text positioned in lower right corner */
	.theme-tab-seguridad .tab-text {
		position: absolute;
		bottom: 20px;
		right: 20px;
		z-index: 2;
		color: white;
		font-size: 24px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 1px;
		transition: all 0.3s ease;
	}

	.theme-tab-seguridad:hover .tab-text {
		font-size: 32px;
	}

	.theme-tab-seguridad.active .tab-text {
		font-size: 32px;
	}

	/* Empleo button - square card with background image */
	.theme-tab-empleo {
		position: relative;
		width: 450px;
		height: 300px;
		padding: 0;
		border-radius: 16px;
		background-image: url('/images/boletines/empleo.jpg');
		background-size: 150%;
		background-position: center;
		background-repeat: no-repeat;
		overflow: hidden;
		transition: background-size 0.3s ease;
		border: 3px solid transparent;
	}

	/* Hover state for empleo button */
	.theme-tab-empleo:hover {
		background-size: 165%;
	}

	/* Override active state for empleo button to keep background image */
	.theme-tab-empleo.active {
		background-image: url('/images/boletines/empleo.jpg');
		background-size: 165%;
		background-position: center;
		background-repeat: no-repeat;
		border: none;
		position: relative;
	}

	.theme-tab-empleo.active::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 16px;
		padding: 2px;
		background: linear-gradient(to bottom right, #06b6d4, #3b82f6);
		-webkit-mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		pointer-events: none;
		z-index: 4;
	}

	/* Dark overlay for empleo */
	.theme-tab-empleo::before {
		content: '';
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.6);
		transition: all 0.3s ease;
		z-index: 1;
	}

	.theme-tab-empleo:hover::before {
		background: rgba(0, 0, 0, 0.5);
	}

	.theme-tab-empleo.active::before {
		background: rgba(0, 0, 0, 0.45);
	}

	/* Text positioned in lower left corner for empleo */
	.theme-tab-empleo .tab-text {
		position: absolute;
		bottom: 20px;
		left: 20px;
		z-index: 2;
		color: white;
		font-size: 24px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 1px;
		transition: all 0.3s ease;
	}

	.theme-tab-empleo:hover .tab-text {
		font-size: 32px;
	}

	.theme-tab-empleo.active .tab-text {
		font-size: 32px;
	}

	/* Date Filters */
	.date-filters {
		display: flex;
		gap: 20px;
		justify-content: center;
		align-items: flex-end;
		flex-wrap: wrap;
	}

	.filter-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.filter-group label {
		font-size: 14px;
		font-weight: 600;
		color: var(--text-primary);
	}

	.filter-group input[type='date'] {
		padding: 10px 15px;
		font-size: 14px;
		border: 2px solid var(--navbar-border);
		border-radius: 8px;
		background: var(--card-bg);
		color: var(--text-primary);
		transition: all 0.3s ease;
	}

	.filter-group input[type='date']:focus {
		outline: none;
		border-color: #3b82f6;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
	}

	.clear-filters-btn {
		padding: 10px 25px;
		font-size: 14px;
		font-weight: 600;
		background: var(--card-bg);
		color: var(--text-primary);
		border: 2px solid var(--navbar-border);
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.clear-filters-btn:hover {
		background: #ef4444;
		color: white;
		border-color: #ef4444;
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

		.theme-tab-seguridad {
			width: 200px;
			height: 200px;
		}

		.theme-tab-seguridad .tab-text {
			font-size: 20px;
			bottom: 15px;
			right: 15px;
		}

		.theme-tab-empleo {
			width: 200px;
			height: 200px;
		}

		.theme-tab-empleo .tab-text {
			font-size: 20px;
			bottom: 15px;
			left: 15px;
		}

		.date-filters {
			flex-direction: column;
			align-items: stretch;
		}

		.boletines-section {
			padding: 40px 20px;
		}

		.boletines-grid {
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

		.theme-tab-seguridad {
			width: 180px;
			height: 180px;
		}

		.theme-tab-seguridad .tab-text {
			font-size: 18px;
			bottom: 12px;
			right: 12px;
		}

		.theme-tab-empleo {
			width: 180px;
			height: 180px;
		}

		.theme-tab-empleo .tab-text {
			font-size: 18px;
			bottom: 12px;
			left: 12px;
		}
	}
</style>
