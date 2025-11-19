<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { urlFor } from '$lib/sanity'; // Importamos Sanity

	// Recibimos los datos del servidor
	let { data } = $props();

	// Transformamos los datos de Sanity para que encajen en tu diseño existente
	// Usamos $derived para que sea reactivo
	let informes = $derived(
		data.reports
			? data.reports.map((report: any) => ({
					id: report._id,
					title: report.title,
					description: report.description || 'Sin descripción disponible.',
					year: report.year,
					// Generamos la URL de la imagen ajustada al contenedor (350x280 ratio)
					thumbnail: report.coverImage
						? urlFor(report.coverImage).width(350).height(280).fit('fill').url()
						: '',
					pdfUrl: report.pdfUrl,
					// Usamos los campos manuales o valores por defecto
					fileSize: report.size ? formatBytes(report.size) : 'PDF',
					pages: report.pages || 'N/A'
				}))
			: []
	);

	// Función para convertir bytes a KB o MB
	function formatBytes(bytes: number, decimals = 1) {
		if (!bytes) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		// Matemáticas para encontrar la unidad correcta
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
	}
</script>

<svelte:head>
	<title>Informes | Consejo Cívico de Laguna</title>
	<meta
		name="description"
		content="Descarga nuestros informes sobre transparencia, participación ciudadana y desarrollo social en la Comarca Lagunera"
	/>
	<meta name="keywords" content="informes, transparencia, desarrollo social, estudios" />

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />

	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Navbar />
<ThemeToggle />

<main class="informes-page">
	<section class="hero-section">
		<div class="hero-content">
			<h1>Informes y Publicaciones</h1>
			<p class="hero-description">
				Descarga nuestros informes, estudios y análisis sobre participación ciudadana, transparencia
				gubernamental y desarrollo social en la Comarca Lagunera
			</p>
		</div>
	</section>

	<section class="informes-section">
		{#if informes.length > 0}
			<div class="informes-grid">
				{#each informes as informe (informe.id)}
					<article class="informe-card">
						<div class="informe-thumbnail">
							{#if informe.thumbnail}
								<img src={informe.thumbnail} alt={informe.title} />
							{:else}
								<div
									style="width:100%; height:100%; background:#eee; display:flex; align-items:center; justify-content:center; color:#999;"
								>
									Sin Portada
								</div>
							{/if}
							<div class="year-badge">{informe.year}</div>
							<div class="pdf-overlay">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
									<path
										d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V304H176c-35.3 0-64 28.7-64 64V512H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zM176 352h32c30.9 0 56 25.1 56 56s-25.1 56-56 56H192v32c0 8.8-7.2 16-16 16s-16-7.2-16-16V448 368c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24H192v48h16zm96-80h32c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H304c-8.8 0-16-7.2-16-16V368c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H320v96h16zm80-112c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16s-7.2 16-16 16H448v32h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H448v48c0 8.8-7.2 16-16 16s-16-7.2-16-16V432 368z"
									/>
								</svg>
								<span>PDF</span>
							</div>
						</div>
						<div class="informe-content">
							<h2 class="informe-title">{informe.title}</h2>
							<p class="informe-description">{informe.description}</p>
							<div class="informe-meta">
								<span class="meta-item">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor">
										<path
											d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM112 256H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
										/>
									</svg>
									{informe.pages} páginas
								</span>
								<span class="meta-item">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
										<path
											d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"
										/>
									</svg>
									{informe.fileSize}
								</span>
							</div>
							<a href={informe.pdfUrl} target="_blank" download class="download-btn">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
									<path
										d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"
									/>
								</svg>
								Descargar PDF
							</a>
						</div>
					</article>
				{/each}
			</div>
		{:else}
			<div class="py-20 text-center text-gray-500">
				<p>Cargando informes o no hay documentos disponibles...</p>
			</div>
		{/if}
	</section>
</main>

<Footer />

<style>
	.informes-page {
		min-height: calc(100vh - 200px);
	}

	/* Hero Section */
	.hero-section {
		background: linear-gradient(135deg, #e8f4f8 0%, #d4e9f7 100%);
		padding: 80px 50px;
		text-align: center;
		transition: background 0.3s ease;
	}

	:global([data-theme='dark']) .hero-section {
		background: linear-gradient(135deg, #0f1419 0%, #0f1419 100%);
	}

	.hero-content {
		max-width: 900px;
		margin: 0 auto;
	}

	h1 {
		font-size: 56px;
		font-weight: 400;
		color: var(--text-secondary);
		margin-bottom: 20px;
		text-transform: uppercase;
		letter-spacing: 2px;
	}

	.hero-description {
		font-size: 20px;
		line-height: 1.6;
		color: var(--text-primary);
	}

	/* Informes Section */
	.informes-section {
		padding: 80px 50px;
		background: var(--bg-primary);
		transition: background 0.3s ease;
	}

	.informes-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 40px;
		max-width: 1400px;
		margin: 0 auto;
	}

	.informe-card {
		background: var(--card-bg);
		border-radius: 15px;
		overflow: hidden;
		box-shadow: 0 5px 20px var(--card-shadow);
		transition: all 0.3s ease;
		display: flex;
		flex-direction: column;
	}

	.informe-card:hover {
		transform: translateY(-10px);
		box-shadow: 0 15px 40px var(--card-shadow);
	}

	.informe-thumbnail {
		position: relative;
		width: 100%;
		height: 280px;
		overflow: hidden;
		background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%);
	}

	:global([data-theme='dark']) .informe-thumbnail {
		background: linear-gradient(135deg, #1a1f2e 0%, #12161d 100%);
	}

	.informe-thumbnail img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.informe-card:hover .informe-thumbnail img {
		transform: scale(1.1);
	}

	.year-badge {
		position: absolute;
		top: 15px;
		right: 15px;
		background: rgba(74, 123, 167, 0.9);
		color: white;
		padding: 8px 16px;
		border-radius: 20px;
		font-size: 14px;
		font-weight: 600;
		backdrop-filter: blur(10px);
	}

	:global([data-theme='dark']) .year-badge {
		background: rgba(0, 212, 255, 0.9);
	}

	.pdf-overlay {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		color: rgba(255, 255, 255, 0.9);
		opacity: 0;
		transition: opacity 0.3s ease;
		pointer-events: none;
	}

	.informe-card:hover .pdf-overlay {
		opacity: 1;
	}

	.pdf-overlay svg {
		width: 60px;
		height: 60px;
		filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3));
	}

	.pdf-overlay span {
		font-size: 18px;
		font-weight: 400;
		text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
	}

	.informe-content {
		padding: 25px;
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.informe-title {
		font-size: 22px;
		font-weight: 400;
		color: var(--text-secondary);
		margin-bottom: 15px;
		line-height: 1.3;
	}

	.informe-description {
		font-size: 15px;
		line-height: 1.6;
		color: var(--text-primary);
		margin-bottom: 20px;
		flex: 1;
	}

	.informe-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		margin-bottom: 20px;
		padding-bottom: 20px;
		border-bottom: 1px solid rgba(74, 123, 167, 0.2);
		font-size: 14px;
		color: var(--text-primary);
		opacity: 0.8;
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.meta-item svg {
		width: 14px;
		height: 14px;
		opacity: 0.7;
	}

	.download-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		background: linear-gradient(135deg, #4a7ba7, #2c5f8d);
		color: white;
		padding: 15px 25px;
		border-radius: 30px;
		text-decoration: none;
		font-weight: 600;
		font-size: 15px;
		transition: all 0.3s ease;
		box-shadow: 0 4px 15px rgba(74, 123, 167, 0.3);
	}

	:global([data-theme='dark']) .download-btn {
		background: linear-gradient(135deg, #00d4ff, #0099cc);
		box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
	}

	.download-btn:hover {
		transform: translateY(-3px);
		box-shadow: 0 8px 25px rgba(74, 123, 167, 0.4);
	}

	:global([data-theme='dark']) .download-btn:hover {
		box-shadow: 0 8px 25px rgba(0, 212, 255, 0.4);
	}

	.download-btn svg {
		width: 18px;
		height: 18px;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.hero-section,
		.informes-section {
			padding: 60px 30px;
		}

		h1 {
			font-size: 40px;
		}

		.hero-description {
			font-size: 18px;
		}

		.informes-grid {
			grid-template-columns: 1fr;
			gap: 30px;
		}

		.informe-thumbnail {
			height: 250px;
		}
	}

	@media (max-width: 480px) {
		.hero-section,
		.informes-section {
			padding: 40px 20px;
		}

		h1 {
			font-size: 32px;
		}

		.hero-description {
			font-size: 16px;
		}

		.informe-content {
			padding: 20px;
		}

		.informe-title {
			font-size: 20px;
		}

		.informe-thumbnail {
			height: 220px;
		}

		.informe-meta {
			flex-direction: column;
			gap: 10px;
		}
	}
</style>
