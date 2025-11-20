<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { urlFor } from '$lib/sanity';
	import { PortableText } from '@portabletext/svelte';

	// Recibimos los datos del servidor
	let { data } = $props();

	// Formatear fecha
	function formatDate(dateStr: string): string {
		if (!dateStr) return '';
		const date = new Date(dateStr);
		return date.toLocaleDateString('es-MX', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
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
	<title>{data.boletin ? data.boletin.title : 'Boletín'} | Consejo Cívico de Laguna</title>
	<meta name="description" content={data.boletin ? data.boletin.description || data.boletin.title : 'Boletín informativo'} />

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
	{#if data.boletin}
		<!-- Breadcrumb -->
		<nav class="breadcrumb">
			<a href="/">Inicio</a>
			<span class="separator">/</span>
			<a href="/boletines">Boletines</a>
			<span class="separator">/</span>
			<span class="current">{data.boletin.category === 'Seguridad' || data.boletin.category === 'seguridad' ? 'Seguridad' : 'Empleo'}</span>
		</nav>

		<!-- Hero Image -->
		<section class="hero-image">
			{#if data.boletin.coverImage}
				<img src={urlFor(data.boletin.coverImage).width(1200).height(500).url()} alt={data.boletin.title} />
			{:else}
				<div class="no-image">Sin imagen</div>
			{/if}
			<div
				class="category-badge"
				class:seguridad={data.boletin.category === 'Seguridad' || data.boletin.category === 'seguridad'}
				class:empleo={data.boletin.category === 'Empleo' || data.boletin.category === 'empleo'}
			>
				{data.boletin.category === 'Seguridad' || data.boletin.category === 'seguridad' ? 'Seguridad' : 'Empleo'}
			</div>
		</section>

		<!-- Article Content -->
		<article class="article-content">
			<div class="article-header">
				<time class="article-date" datetime={data.boletin.publishedAt}>
					{formatDate(data.boletin.publishedAt)}
				</time>
				<h1 class="article-title">{data.boletin.title}</h1>
				{#if data.boletin.description}
					<p class="article-description">{data.boletin.description}</p>
				{/if}
			</div>

			{#if data.boletin.body}
				<div class="article-body">
					<PortableText value={data.boletin.body} />
				</div>
			{/if}

			<!-- Download Section -->
			{#if data.boletin.pdfUrl}
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
							<p>Descarga el documento PDF con el informe completo{data.boletin.size ? ` (${formatBytes(data.boletin.size)})` : ''}</p>
						</div>
						<a href={data.boletin.pdfUrl} class="download-btn" target="_blank" rel="noopener noreferrer">
							Descargar PDF
						</a>
					</div>
				</div>
			{/if}

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

	.no-image {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%);
		color: #999;
		font-size: 18px;
	}

	:global([data-theme='dark']) .no-image {
		background: linear-gradient(135deg, #1a1f2e 0%, #12161d 100%);
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

	.article-description {
		font-size: 18px;
		line-height: 1.6;
		color: var(--text-primary);
		opacity: 0.8;
		margin-top: 20px;
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
