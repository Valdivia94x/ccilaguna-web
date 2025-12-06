<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Mesa de Seguridad y Justicia | Consejo Cívico de Laguna</title>
	<meta
		name="description"
		content="Mesa de Seguridad y Justicia - Espacio de encuentro entre ciudadanos y autoridades"
	/>
</svelte:head>

<Navbar />
<ThemeToggle />

<div class="hero">
	<div class="hero-overlay"></div>
	<div class="hero-content">
		<h1>Mesa de Seguridad y Justicia</h1>
		<p class="subtitle">Diálogo ciudadano con autoridades</p>
	</div>
</div>

<div class="spacer"></div>

<section class="page-content">
	<div class="container">
		<div class="content-section">
			<div class="content-wrapper">
				<div class="text-content">
					<p>
						Es un espacio de encuentro entre ciudadanos y autoridades de los tres niveles de
						gobierno con el propósito de diseñar una agenda común que atienda las principales
						problemáticas de seguridad y justicia.
					</p>
				</div>
				<div class="image-section">
					<img src="/images/mesaSeguridad.png" alt="Mesa de Seguridad y Justicia" />
				</div>
			</div>
		</div>

		<div class="info-section">
			<div class="info-images">
				<img src="/images/mesa01.jpg" alt="Mesa de Seguridad - Imagen 1" />
				<img src="/images/mesa02.jpg" alt="Mesa de Seguridad - Imagen 2" />
			</div>
			<div class="info-text">
				<img src="/images/mexicosos.png" alt="Mesxico SOS" />
				<p>
					La disposición a colaborar de las autoridades, la reputación y el compromiso del
					componente ciudadano convierten a este modelo una opción real para la construcción de
					confianza y soluciones específicas locales y regionales en materia de seguridad y
					justicia.
				</p>
				<h3>Comisiones:</h3>
				<ul>
					<li>Indicadores de Seguridad</li>
					<li>Fortalecimiento Institucional</li>
					<li>Prevención del delito</li>
					<li>Certificación de Penales</li>
					<li>Violencia de género</li>
				</ul>
			</div>
		</div>

		<div class="document-section">
			<div class="document-cover">
				<img
					src="/images/documentoMesaIMG.png"
					alt="Guía del Modelo de Mesas de Seguridad y Justicia"
				/>
			</div>
			<div class="document-info">
				<p>
					Prevención Social de la Violencia<br />Sistematización y Guía del Modelo de Mesas de
					Seguridad y Justicia
				</p>
				<a
					href="/docs/guia-mesas-seguridad.pdf"
					class="download-btn"
					target="_blank"
					rel="noopener noreferrer"
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
						<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
						<polyline points="7 10 12 15 17 10"></polyline>
						<line x1="12" y1="15" x2="12" y2="3"></line>
					</svg>
					Descargar documento PDF
				</a>
			</div>
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
		max-width: 1200px;
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
		padding: 20px 20px 20px 80px;
		border-radius: 16px;
		box-shadow: 0 4px 12px var(--card-shadow);
	}

	.content-wrapper {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 10px;
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

	/* Info Section */
	.info-section {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 40px;
		margin-top: 40px;
		padding: 40px;
		align-items: center;
	}

	.info-images {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.info-images img {
		width: 100%;
		height: auto;
		border-radius: 12px;
		box-shadow: 0 4px 8px var(--card-shadow);
	}

	.info-text p {
		color: var(--text-primary);
		font-size: 18px;
		line-height: 1.8;
		margin-bottom: 20px;
	}

	.info-text img {
		width: 200px;
		height: auto;
		margin-bottom: 20px;
	}

	:global([data-theme='dark']) .info-text img {
		background: #ffffff;
		border-radius: 20px;
	}

	.info-text h3 {
		color: var(--text-primary);
		font-size: 22px;
		font-weight: 600;
		margin-bottom: 15px;
	}

	.info-text ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.info-text ul li {
		color: var(--text-primary);
		font-size: 16px;
		line-height: 1.8;
		padding-left: 20px;
		position: relative;
	}

	.info-text ul li::before {
		content: '•';
		position: absolute;
		left: 0;
		color: #3b82f6;
		font-weight: bold;
	}

	/* Document Section */
	.document-section {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 40px;
		margin-top: 40px;
		background: var(--card-bg);
		padding: 40px;
		border-radius: 16px;
		box-shadow: 0 4px 12px var(--card-shadow);
		align-items: center;
	}

	.document-cover img {
		width: 200px;
		height: auto;
		border-radius: 8px;
		box-shadow: 0 4px 12px var(--card-shadow);
	}

	.document-info h3 {
		color: var(--text-primary);
		font-size: 22px;
		font-weight: 600;
		margin-bottom: 10px;
	}

	.document-info p {
		color: var(--text-primary);
		font-size: 18px;
		line-height: 1.6;
		margin-bottom: 20px;
		font-style: italic;
	}

	.download-btn {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		padding: 12px 24px;
		background: #3b82f6;
		color: white;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 600;
		transition: all 0.3s ease;
	}

	.download-btn:hover {
		background: #2563eb;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
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

		.info-section {
			grid-template-columns: 1fr;
			gap: 30px;
			padding: 30px 20px;
		}

		.info-images {
			order: 2;
		}

		.info-text {
			order: 1;
		}

		.document-section {
			grid-template-columns: 1fr;
			gap: 25px;
			padding: 30px 20px;
			text-align: center;
		}

		.document-cover {
			display: flex;
			justify-content: center;
		}

		.document-cover img {
			width: 180px;
		}

		.download-btn {
			width: 100%;
			justify-content: center;
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
	}
</style>
