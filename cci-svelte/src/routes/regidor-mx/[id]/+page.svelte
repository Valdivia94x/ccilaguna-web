<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { urlFor } from '$lib/sanity';
	import { PortableText } from '@portabletext/svelte';

	let { data } = $props();

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
		return `Regidor MX Laguna | ${report.city} | ${period}`;
	}

	// Función para formatear bytes
	function formatBytes(bytes: number, decimals = 1) {
		if (!bytes) return 'PDF';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
	}
</script>

<svelte:head>
	<title>{data.report ? getReportTitle(data.report) : 'Informe'} | Regidor MX Laguna</title>
	<meta
		name="description"
		content={data.report
			? data.report.description || getReportTitle(data.report)
			: 'Informe Regidor MX'}
	/>

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Navbar />
<ThemeToggle />

<main class="report-detail-page">
	{#if data.report}
		<!-- Breadcrumb -->
		<nav class="breadcrumb">
			<a href="/">Inicio</a>
			<span class="separator">/</span>
			<a href="/regidor-mx">Regidor MX</a>
			<span class="separator">/</span>
			<span class="current">Informe</span>
		</nav>

		<!-- Contenido Principal -->
		<article class="report-content">
			<div class="report-layout">
				<!-- Columna Izquierda: Imagen de portada -->
				<div class="cover-column">
					{#if data.report.coverImage}
						<img
							src={urlFor(data.report.coverImage).width(600).height(849).url()}
							alt={getReportTitle(data.report)}
							class="cover-image"
						/>
					{:else}
						<div class="no-cover">
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
						</div>
					{/if}
				</div>

				<!-- Columna Derecha: Información -->
				<div class="info-column">
					<h1 class="report-title">{getReportTitle(data.report)}</h1>

					{#if data.report.description}
						<div class="report-description">
							<div class="description-content">
								<PortableText value={data.report.description} />
							</div>
						</div>
					{/if}

					<!-- Botón de Descarga -->
					{#if data.report.pdfUrl}
						<div class="download-section">
							<a
								href={data.report.pdfUrl}
								class="download-btn"
								target="_blank"
								rel="noopener noreferrer"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
									<polyline points="7 10 12 15 17 10"></polyline>
									<line x1="12" y1="15" x2="12" y2="3"></line>
								</svg>
								Descargar Informe
								{#if data.report.pdfSize}
									<span class="file-size">({formatBytes(data.report.pdfSize)})</span>
								{/if}
							</a>
						</div>
					{/if}

					<!-- Botón Volver -->
					<div class="back-section">
						<a href="/regidor-mx" class="back-btn">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<line x1="19" y1="12" x2="5" y2="12"></line>
								<polyline points="12 19 5 12 12 5"></polyline>
							</svg>
							Volver a Informes
						</a>
					</div>
				</div>
			</div>
		</article>
	{:else}
		<div class="not-found">
			<h1>Informe no encontrado</h1>
			<p>El informe que buscas no existe o ha sido eliminado.</p>
			<a href="/regidor-mx" class="back-btn">Volver a Informes</a>
		</div>
	{/if}
</main>

<Footer />

<style>
	.report-detail-page {
		min-height: calc(100vh - 200px);
		background: var(--bg-primary);
		transition: background 0.3s ease;
	}

	/* Breadcrumb */
	.breadcrumb {
		padding: 20px 50px;
		background: var(--bg-primary);
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 14px;
	}

	.breadcrumb a {
		color: #3b82f6;
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.breadcrumb a:hover {
		color: #2563eb;
		text-decoration: underline;
	}

	.breadcrumb .separator {
		color: var(--text-primary);
		opacity: 0.4;
	}

	.breadcrumb .current {
		color: var(--text-primary);
		opacity: 0.7;
	}

	/* Report Content */
	.report-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: 40px 50px 80px;
	}

	.report-layout {
		display: grid;
		grid-template-columns: 1fr 1.5fr;
		gap: 60px;
		align-items: start;
	}

	/* Cover Column */
	.cover-column {
		position: sticky;
		top: 100px;
	}

	.cover-image {
		width: 100%;
		height: auto;
		border-radius: 12px;
		box-shadow: 0 8px 30px var(--card-shadow);
	}

	.no-cover {
		width: 100%;
		aspect-ratio: 1 / 1.414;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
		border-radius: 12px;
		color: var(--text-primary);
		opacity: 0.3;
	}

	:global([data-theme='dark']) .no-cover {
		background: linear-gradient(135deg, #1a1f2e 0%, #12161d 100%);
	}

	/* Info Column */
	.info-column {
		display: flex;
		flex-direction: column;
		gap: 25px;
	}

	.report-period {
		display: inline-block;
		font-size: 14px;
		color: var(--text-primary);
		opacity: 0.6;
		font-weight: 500;
		text-transform: capitalize;
	}

	.report-title {
		font-size: 36px;
		font-weight: 700;
		color: var(--text-primary);
		line-height: 1.3;
		margin: 0;
	}

	.report-description h2 {
		font-size: 20px;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 15px;
	}

	.description-content {
		font-size: 17px;
		line-height: 1.8;
		color: var(--text-primary);
		opacity: 0.85;
	}

	.description-content :global(p) {
		margin-bottom: 16px;
	}

	.description-content :global(p:last-child) {
		margin-bottom: 0;
	}

	.description-content :global(h3) {
		font-size: 18px;
		font-weight: 600;
		color: var(--text-primary);
		margin-top: 24px;
		margin-bottom: 12px;
	}

	.description-content :global(h4) {
		font-size: 16px;
		font-weight: 600;
		color: var(--text-primary);
		margin-top: 20px;
		margin-bottom: 10px;
	}

	.description-content :global(strong) {
		font-weight: 600;
	}

	.description-content :global(em) {
		font-style: italic;
	}

	.description-content :global(ul),
	.description-content :global(ol) {
		margin-bottom: 16px;
		padding-left: 24px;
	}

	.description-content :global(li) {
		margin-bottom: 8px;
	}

	/* Download Section */
	.download-section {
		margin-top: 20px;
	}

	.download-btn {
		display: inline-flex;
		align-items: center;
		gap: 12px;
		padding: 16px 32px;
		background: linear-gradient(135deg, #3b82f6, #2563eb);
		color: white;
		border-radius: 12px;
		font-size: 16px;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s ease;
		box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
	}

	.download-btn:hover {
		transform: translateY(-3px);
		box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
	}

	.file-size {
		font-weight: 400;
		opacity: 0.9;
	}

	/* Back Section */
	.back-section {
		margin-top: 30px;
	}

	.back-btn {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		padding: 12px 24px;
		background: var(--card-bg);
		color: var(--text-primary);
		border: 2px solid var(--navbar-border);
		border-radius: 8px;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.back-btn:hover {
		background: #3b82f6;
		color: white;
		border-color: #3b82f6;
		transform: translateX(-5px);
	}

	/* Not Found */
	.not-found {
		max-width: 600px;
		margin: 100px auto;
		text-align: center;
		padding: 50px;
	}

	.not-found h1 {
		font-size: 36px;
		color: var(--text-primary);
		margin-bottom: 20px;
	}

	.not-found p {
		font-size: 18px;
		color: var(--text-primary);
		opacity: 0.7;
		margin-bottom: 30px;
	}

	/* Responsive */
	@media (max-width: 900px) {
		.report-layout {
			grid-template-columns: 1fr;
			gap: 40px;
		}

		.cover-column {
			position: static;
			max-width: 400px;
			margin: 0 auto;
		}
	}

	@media (max-width: 768px) {
		.breadcrumb {
			padding: 15px 20px;
		}

		.report-content {
			padding: 30px 20px 60px;
		}

		.report-title {
			font-size: 28px;
		}

		.report-description h2 {
			font-size: 18px;
		}

		.report-description p {
			font-size: 16px;
		}

		.download-btn {
			width: 100%;
			justify-content: center;
			padding: 14px 24px;
		}

		.back-btn {
			width: 100%;
			justify-content: center;
		}
	}

	@media (max-width: 480px) {
		.report-title {
			font-size: 24px;
		}

		.cover-column {
			max-width: 280px;
		}

		.not-found {
			padding: 30px 20px;
		}

		.not-found h1 {
			font-size: 28px;
		}
	}
</style>
