<script lang="ts">
	import { page } from '$app/stores';
	import Navbar from '$lib/components/Navbar.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Footer from '$lib/components/Footer.svelte';

	// Tipo de boletín completo
	interface BoletinDetalle {
		id: string;
		title: string;
		date: string;
		image: string;
		category: 'seguridad' | 'empleo';
		content: string;
		downloadUrl: string;
	}

	// Obtener ID del boletín desde la URL
	let boletinId = $derived($page.params.id);

	// Datos de ejemplo (en producción vendrían de una API o base de datos)
	const boletinesData: Record<string, BoletinDetalle> = {
		'seg-001': {
			id: 'seg-001',
			title: 'Informe de Seguridad Pública - Enero 2024',
			date: '2024-01-15',
			image: '/images/boletines/seguridad-1.jpg',
			category: 'seguridad',
			content: `
				<h2>Resumen Ejecutivo</h2>
				<p>El presente informe analiza la situación de seguridad pública en la Comarca Lagunera durante el mes de enero de 2024, con especial énfasis en los principales indicadores de incidencia delictiva.</p>

				<h2>Principales Hallazgos</h2>
				<p>Durante el período analizado se observó una reducción del 12% en los delitos de alto impacto en comparación con el mismo mes del año anterior. Los esfuerzos coordinados entre las autoridades municipales y estatales han contribuido significativamente a esta mejora.</p>

				<h3>Indicadores Clave</h3>
				<ul>
					<li>Reducción del 15% en robos a comercios</li>
					<li>Disminución del 8% en delitos contra vehículos</li>
					<li>Incremento del 20% en detenciones efectivas</li>
				</ul>

				<h2>Recomendaciones</h2>
				<p>Se recomienda fortalecer la coordinación interinstitucional y continuar con los programas de prevención del delito en zonas identificadas como prioritarias.</p>

				<h2>Conclusiones</h2>
				<p>Los resultados muestran una tendencia positiva que debe sostenerse mediante el fortalecimiento de las capacidades institucionales y la participación ciudadana activa.</p>
			`,
			downloadUrl: '/downloads/boletines/seg-001.pdf'
		},
		'seg-002': {
			id: 'seg-002',
			title: 'Reporte Trimestral de Incidencia Delictiva',
			date: '2024-02-10',
			image: '/images/boletines/seguridad-2.jpg',
			category: 'seguridad',
			content: `
				<h2>Introducción</h2>
				<p>Este reporte presenta un análisis detallado de la incidencia delictiva durante el primer trimestre de 2024 en la región de La Laguna.</p>

				<h2>Análisis de Datos</h2>
				<p>El análisis estadístico revela patrones importantes en la distribución temporal y geográfica de los delitos registrados.</p>
			`,
			downloadUrl: '/downloads/boletines/seg-002.pdf'
		},
		'emp-001': {
			id: 'emp-001',
			title: 'Panorama del Empleo en La Laguna - Q1 2024',
			date: '2024-01-20',
			image: '/images/boletines/empleo-1.jpg',
			category: 'empleo',
			content: `
				<h2>Situación Actual del Mercado Laboral</h2>
				<p>El mercado laboral de la Comarca Lagunera muestra señales de recuperación sostenida, con un crecimiento del 3.5% en la generación de empleos formales durante el primer trimestre de 2024.</p>

				<h2>Sectores Destacados</h2>
				<ul>
					<li><strong>Manufactura:</strong> Incremento del 5% en la plantilla laboral</li>
					<li><strong>Servicios:</strong> Crecimiento del 4.2% en empleos del sector terciario</li>
					<li><strong>Construcción:</strong> Recuperación gradual con un aumento del 2.8%</li>
				</ul>

				<h2>Perspectivas</h2>
				<p>Se proyecta un crecimiento sostenido para los próximos meses, impulsado por las inversiones en infraestructura y la llegada de nuevas empresas a la región.</p>
			`,
			downloadUrl: '/downloads/boletines/emp-001.pdf'
		},
		'emp-002': {
			id: 'emp-002',
			title: 'Indicadores de Desarrollo Económico Regional',
			date: '2024-02-25',
			image: '/images/boletines/empleo-2.jpg',
			category: 'empleo',
			content: `
				<h2>Evaluación Económica Regional</h2>
				<p>Análisis integral de los principales indicadores económicos que determinan el desarrollo de la Comarca Lagunera.</p>

				<h2>Indicadores Principales</h2>
				<p>El Producto Interno Bruto regional creció un 2.8% en términos reales, superando las expectativas iniciales.</p>
			`,
			downloadUrl: '/downloads/boletines/emp-002.pdf'
		}
	};

	// Obtener el boletín actual
	let boletin = $derived(boletinesData[boletinId]);

	// Formatear fecha
	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleDateString('es-MX', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{boletin ? boletin.title : 'Boletín'} | Consejo Cívico de Laguna</title>
	<meta name="description" content={boletin ? boletin.title : 'Boletín informativo'} />

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

<main class="boletin-detail-page">
	{#if boletin}
		<!-- Breadcrumb -->
		<nav class="breadcrumb">
			<a href="/">Inicio</a>
			<span class="separator">/</span>
			<a href="/boletines">Boletines</a>
			<span class="separator">/</span>
			<span class="current">{boletin.category === 'seguridad' ? 'Seguridad' : 'Empleo'}</span>
		</nav>

		<!-- Hero Image -->
		<section class="hero-image">
			<img src={boletin.image} alt={boletin.title} />
			<div
				class="category-badge"
				class:seguridad={boletin.category === 'seguridad'}
				class:empleo={boletin.category === 'empleo'}
			>
				{boletin.category === 'seguridad' ? 'Seguridad' : 'Empleo'}
			</div>
		</section>

		<!-- Article Content -->
		<article class="article-content">
			<div class="article-header">
				<time class="article-date" datetime={boletin.date}>
					{formatDate(boletin.date)}
				</time>
				<h1 class="article-title">{boletin.title}</h1>
			</div>

			<div class="article-body">
				{@html boletin.content}
			</div>

			<!-- Download Section -->
			<div class="download-section">
				<div class="download-card">
					<div class="download-icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
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
					</div>
					<div class="download-info">
						<h3>Descargar Boletín Completo</h3>
						<p>Descarga el documento PDF con el informe completo</p>
					</div>
					<a href={boletin.downloadUrl} class="download-btn" download>
						Descargar PDF
					</a>
				</div>
			</div>

			<!-- Back Button -->
			<div class="back-section">
				<a href="/boletines" class="back-btn">
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
					Volver a Boletines
				</a>
			</div>
		</article>
	{:else}
		<div class="not-found">
			<h1>Boletín no encontrado</h1>
			<p>El boletín que buscas no existe o ha sido eliminado.</p>
			<a href="/boletines" class="back-btn">Volver a Boletines</a>
		</div>
	{/if}
</main>

<Footer />

<style>
	.boletin-detail-page {
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

	/* Hero Image */
	.hero-image {
		position: relative;
		width: 100%;
		height: 500px;
		overflow: hidden;
	}

	.hero-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.category-badge {
		position: absolute;
		top: 30px;
		right: 30px;
		padding: 10px 25px;
		border-radius: 30px;
		font-size: 14px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 1px;
		color: white;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	.category-badge.seguridad {
		background: linear-gradient(135deg, #ef4444, #dc2626);
	}

	.category-badge.empleo {
		background: linear-gradient(135deg, #10b981, #059669);
	}

	/* Article Content */
	.article-content {
		max-width: 900px;
		margin: 0 auto;
		padding: 60px 50px;
	}

	.article-header {
		margin-bottom: 40px;
		padding-bottom: 30px;
		border-bottom: 2px solid var(--navbar-border);
	}

	.article-date {
		display: block;
		font-size: 14px;
		color: var(--text-primary);
		opacity: 0.6;
		margin-bottom: 15px;
		font-weight: 500;
	}

	.article-title {
		font-size: 42px;
		font-weight: 700;
		color: var(--text-primary);
		line-height: 1.3;
		margin: 0;
	}

	.article-body {
		color: var(--text-primary);
		line-height: 1.8;
		font-size: 17px;
	}

	.article-body :global(h2) {
		font-size: 32px;
		font-weight: 600;
		color: var(--text-primary);
		margin-top: 50px;
		margin-bottom: 20px;
	}

	.article-body :global(h3) {
		font-size: 24px;
		font-weight: 600;
		color: var(--text-primary);
		margin-top: 35px;
		margin-bottom: 15px;
	}

	.article-body :global(p) {
		margin-bottom: 20px;
	}

	.article-body :global(ul),
	.article-body :global(ol) {
		margin-bottom: 25px;
		padding-left: 30px;
	}

	.article-body :global(li) {
		margin-bottom: 10px;
	}

	.article-body :global(strong) {
		font-weight: 600;
		color: var(--text-primary);
	}

	/* Download Section */
	.download-section {
		margin-top: 60px;
		margin-bottom: 40px;
	}

	.download-card {
		background: linear-gradient(135deg, #3b82f6, #2563eb);
		color: white;
		border-radius: 16px;
		padding: 30px;
		display: flex;
		align-items: center;
		gap: 25px;
		box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
	}

	.download-icon {
		background: rgba(255, 255, 255, 0.2);
		padding: 15px;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.download-info {
		flex: 1;
	}

	.download-info h3 {
		font-size: 20px;
		font-weight: 600;
		margin-bottom: 5px;
	}

	.download-info p {
		font-size: 14px;
		opacity: 0.9;
		margin: 0;
	}

	.download-btn {
		padding: 12px 30px;
		background: white;
		color: #3b82f6;
		border-radius: 8px;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s ease;
		white-space: nowrap;
	}

	.download-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	/* Back Section */
	.back-section {
		margin-top: 50px;
		text-align: center;
	}

	.back-btn {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		padding: 12px 30px;
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
	@media (max-width: 768px) {
		.breadcrumb {
			padding: 15px 20px;
		}

		.hero-image {
			height: 300px;
		}

		.category-badge {
			top: 20px;
			right: 20px;
			padding: 8px 20px;
			font-size: 12px;
		}

		.article-content {
			padding: 40px 20px;
		}

		.article-title {
			font-size: 32px;
		}

		.article-body {
			font-size: 16px;
		}

		.article-body :global(h2) {
			font-size: 26px;
		}

		.article-body :global(h3) {
			font-size: 20px;
		}

		.download-card {
			flex-direction: column;
			text-align: center;
		}

		.download-btn {
			width: 100%;
		}
	}

	@media (max-width: 480px) {
		.hero-image {
			height: 250px;
		}

		.article-title {
			font-size: 28px;
		}

		.not-found {
			padding: 30px 20px;
		}

		.not-found h1 {
			font-size: 28px;
		}
	}
</style>
