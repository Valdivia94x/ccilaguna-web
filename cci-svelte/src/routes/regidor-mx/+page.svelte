<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { urlFor } from '$lib/sanity';
	import { goto } from '$app/navigation';

	let { data } = $props();

	// Manejar cambio de filtros con navegación
	function handleCityChange(event: Event) {
		const select = event.target as HTMLSelectElement;
		const city = select.value;
		const params = new URLSearchParams();
		if (city) params.set('city', city);
		if (data.selectedYear) params.set('year', data.selectedYear);
		const queryString = params.toString();
		goto(queryString ? `/regidor-mx?${queryString}` : '/regidor-mx', { noScroll: true });
	}

	function handleYearChange(event: Event) {
		const select = event.target as HTMLSelectElement;
		const year = select.value;
		const params = new URLSearchParams();
		if (data.selectedCity) params.set('city', data.selectedCity);
		if (year) params.set('year', year);
		const queryString = params.toString();
		goto(queryString ? `/regidor-mx?${queryString}` : '/regidor-mx', { noScroll: true });
	}

	// Generar título del informe
	function getReportTitle(report: any): string {
		let period: string;
		if (report.periodType === 'semester') {
			period = `${report.semester} ${report.semesterYear}`;
		} else if (report.periodStartYear === report.periodEndYear) {
			period = `${report.periodStartMonth}-${report.periodEndMonth} ${report.periodEndYear}`;
		} else {
			period = `${report.periodStartMonth} ${report.periodStartYear} - ${report.periodEndMonth} ${report.periodEndYear}`;
		}
		return `Regidor MX Laguna | ${report.city} | Período ${period}`;
	}
</script>

<svelte:head>
	<title>Regidor MX Laguna | Consejo Cívico de Laguna</title>
	<meta name="description" content="Informes de seguimiento a regidores en la Comarca Lagunera" />
	<meta name="keywords" content="regidor, informes, laguna, seguimiento, transparencia" />

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Navbar />
<ThemeToggle />

<div class="hero">
	<div class="hero-overlay"></div>
	<div class="hero-content">
		<h1>Regidor MX Laguna</h1>
		<p class="subtitle">Red Nacional de Contraloría Social</p>
	</div>
</div>

<div class="spacer"></div>

<section class="page-content">
	<div class="container">
		<div class="content-section">
			<div class="content-wrapper">
				<div class="text-content">
					<p>
						RegidorMX es una red nacional de contraloría social que tiene como objetivo vigilar las
						acciones de gobierno a través del monitoreo y la exigencia a la autoridad Municipal para
						el cumplimiento de las funciones que marca la ley.
					</p>
				</div>
				<div class="image-section">
					<img src="/images/regidormx.png" alt="Regidor MX Laguna" />
				</div>
			</div>
		</div>

		<!-- Filtros -->
		<div class="filters-container">
			<div class="filter-group">
				<label for="city-filter" class="filter-label">Ciudad:</label>
				<select
					id="city-filter"
					class="filter-select"
					onchange={handleCityChange}
					value={data.selectedCity}
				>
					<option value="">Todas</option>
					{#each data.cities as city}
						<option value={city}>{city}</option>
					{/each}
				</select>
			</div>

			<div class="filter-group">
				<label for="year-filter" class="filter-label">Año:</label>
				<select
					id="year-filter"
					class="filter-select"
					onchange={handleYearChange}
					value={data.selectedYear}
				>
					<option value="">Todos</option>
					{#each data.years as year}
						<option value={String(year)}>{year}</option>
					{/each}
				</select>
			</div>
		</div>

		<!-- Grid de Informes -->
		<div class="reports-section">
			{#if data.reports && data.reports.length > 0}
				<div class="reports-grid">
					{#each data.reports as report (report._id)}
						<a href="/regidor-mx/{report._id}" class="report-card">
							<div class="report-cover">
								{#if report.coverImage}
									<img
										src={urlFor(report.coverImage).width(400).height(566).url()}
										alt={getReportTitle(report)}
									/>
								{:else}
									<div class="no-cover">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="48"
											height="48"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="1.5"
										>
											<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
											<polyline points="14 2 14 8 20 8"></polyline>
											<line x1="16" y1="13" x2="8" y2="13"></line>
											<line x1="16" y1="17" x2="8" y2="17"></line>
											<polyline points="10 9 9 9 8 9"></polyline>
										</svg>
									</div>
								{/if}
							</div>
							<div class="report-info">
								<h3 class="report-title">{getReportTitle(report)}</h3>
							</div>
						</a>
					{/each}
				</div>

				<!-- Paginación -->
				{#if data.pagination.totalPages > 1}
					{@const filterParams =
						(data.selectedCity ? `&city=${encodeURIComponent(data.selectedCity)}` : '') +
						(data.selectedYear ? `&year=${encodeURIComponent(data.selectedYear)}` : '')}
					<nav class="pagination" aria-label="Paginación de informes">
						{#if data.pagination.hasPrevPage}
							<a
								href="/regidor-mx?page={data.pagination.currentPage - 1}{filterParams}"
								class="pagination-btn prev"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<polyline points="15 18 9 12 15 6"></polyline>
								</svg>
								Anterior
							</a>
						{/if}

						<div class="pagination-numbers">
							{#each Array(data.pagination.totalPages) as _, i}
								<a
									href="/regidor-mx?page={i + 1}{filterParams}"
									class="pagination-number"
									class:active={data.pagination.currentPage === i + 1}
								>
									{i + 1}
								</a>
							{/each}
						</div>

						{#if data.pagination.hasNextPage}
							<a
								href="/regidor-mx?page={data.pagination.currentPage + 1}{filterParams}"
								class="pagination-btn next"
							>
								Siguiente
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<polyline points="9 18 15 12 9 6"></polyline>
								</svg>
							</a>
						{/if}
					</nav>
				{/if}
			{:else}
				<div class="no-results">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="64"
						height="64"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
					>
						<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
						<polyline points="14 2 14 8 20 8"></polyline>
					</svg>
					<p>No hay informes disponibles por el momento.</p>
				</div>
			{/if}
		</div>
	</div>
</section>

<Footer />

<style>
	.page-content {
		background: var(--bg-about);
		min-height: calc(100vh - 200px);
		padding: 50px 20px 60px;
		transition: background 0.3s ease;
		position: relative;
		z-index: 10;
	}

	.spacer {
		height: 300px;
	}

	.container {
		max-width: 1400px;
		margin: 0 auto;
	}

	.hero {
		position: fixed;
		text-align: center;
		background-image: url('/images/proyectosBanner.png');
		background-size: cover;
		background-position: center;
		overflow: hidden;
		min-height: 300px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hero-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: var(--bannerPages);
	}

	.hero-content {
		position: relative;
		z-index: 1;
		padding: 40px;
	}

	.hero h1 {
		color: var(--titlePages);
		font-size: 48px;
		font-weight: 600;
		margin-bottom: 16px;
	}

	.subtitle {
		color: var(--subtitlePages);
		font-size: 24px;
		opacity: 0.9;
	}

	.content-section {
		background: var(--card-bg);
		padding: 20px 40px 20px 80px;
		border-radius: 16px;
		box-shadow: 0 4px 12px var(--card-shadow);
		margin-bottom: 40px;
	}

	.content-wrapper {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 40px;
		align-items: center;
	}

	.text-content p {
		color: var(--text-primary);
		font-size: 18px;
		line-height: 1.8;
	}

	.image-section {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.image-section img {
		max-width: 100%;
		height: auto;
		border-radius: 12px;
	}

	/* Filters Container */
	.filters-container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 40px;
		margin-bottom: 30px;
		flex-wrap: wrap;
	}

	.filter-group {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.filter-label {
		color: var(--text-primary);
		font-weight: 600;
		font-size: 16px;
	}

	.filter-select {
		padding: 10px 36px 10px 16px;
		background: var(--card-bg);
		color: var(--text-primary);
		border: 2px solid var(--navbar-border);
		border-radius: 8px;
		font-weight: 500;
		font-size: 15px;
		cursor: pointer;
		transition: all 0.3s ease;
		appearance: none;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 12px center;
		min-width: 160px;
	}

	.filter-select:hover {
		border-color: #3b82f6;
	}

	.filter-select:focus {
		outline: none;
		border-color: #3b82f6;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
	}

	/* Reports Section */
	.reports-section {
		margin-top: 20px;
	}

	.reports-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 30px;
	}

	/* Report Card - Formato vertical A4 */
	.report-card {
		background: var(--card-bg);
		border-radius: 12px;
		overflow: hidden;
		text-decoration: none;
		box-shadow: 0 4px 12px var(--card-shadow);
		transition: all 0.3s ease;
		display: flex;
		flex-direction: column;
	}

	.report-card:hover {
		transform: translateY(-8px);
		box-shadow: 0 12px 30px var(--card-shadow);
	}

	.report-cover {
		position: relative;
		width: 100%;
		/* Proporción A4: 1:1.414 */
		aspect-ratio: 1 / 1.414;
		overflow: hidden;
		background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
	}

	:global([data-theme='dark']) .report-cover {
		background: linear-gradient(135deg, #1a1f2e 0%, #12161d 100%);
	}

	.report-cover img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.report-card:hover .report-cover img {
		transform: scale(1.05);
	}

	.no-cover {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-primary);
		opacity: 0.3;
	}

	.report-info {
		padding: 20px;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.report-title {
		font-size: 16px;
		font-weight: 600;
		color: var(--text-primary);
		line-height: 1.4;
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* Paginación */
	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 15px;
		margin-top: 60px;
		flex-wrap: wrap;
	}

	.pagination-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 24px;
		background: var(--card-bg);
		color: var(--text-primary);
		border: 2px solid var(--navbar-border);
		border-radius: 8px;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.pagination-btn:hover {
		background: #3b82f6;
		color: white;
		border-color: #3b82f6;
	}

	.pagination-numbers {
		display: flex;
		gap: 8px;
	}

	.pagination-number {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--card-bg);
		color: var(--text-primary);
		border: 2px solid var(--navbar-border);
		border-radius: 8px;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.pagination-number:hover {
		background: #3b82f6;
		color: white;
		border-color: #3b82f6;
	}

	.pagination-number.active {
		background: #3b82f6;
		color: white;
		border-color: #3b82f6;
	}

	/* No Results */
	.no-results {
		text-align: center;
		padding: 80px 20px;
		color: var(--text-primary);
		opacity: 0.6;
	}

	.no-results svg {
		margin-bottom: 20px;
	}

	.no-results p {
		font-size: 18px;
	}

	/* Responsive */
	@media (max-width: 1200px) {
		.reports-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 900px) {
		.reports-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 768px) {
		.hero h1 {
			font-size: 36px;
		}

		.subtitle {
			font-size: 20px;
		}

		.content-section {
			padding: 30px 20px;
		}

		.content-wrapper {
			grid-template-columns: 1fr;
			gap: 30px;
		}

		.text-content {
			order: 1;
		}

		.image-section {
			order: 2;
		}

		.filters-container {
			gap: 20px;
		}

		.filter-select {
			min-width: 140px;
			font-size: 14px;
		}

		.reports-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 20px;
		}

		.report-info {
			padding: 15px;
		}

		.report-title {
			font-size: 14px;
		}

		.pagination {
			gap: 10px;
		}

		.pagination-btn {
			padding: 10px 18px;
			font-size: 14px;
		}

		.pagination-number {
			width: 36px;
			height: 36px;
			font-size: 14px;
		}
	}

	@media (max-width: 480px) {
		.hero h1 {
			font-size: 28px;
		}

		.subtitle {
			font-size: 16px;
		}

		.spacer {
			height: 250px;
		}

		.page-content {
			padding: 40px 15px 50px;
		}

		.reports-grid {
			grid-template-columns: 1fr;
			max-width: 300px;
			margin: 0 auto;
		}

		.report-title {
			font-size: 15px;
		}
	}
</style>
