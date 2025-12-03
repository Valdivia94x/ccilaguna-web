<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { urlFor } from '$lib/sanity';

	let { data } = $props();
	let activeTab = $state('informes');
</script>

<svelte:head>
	<title>Agenda Local Anticorrupción | Consejo Cívico de Laguna</title>
	<meta
		name="description"
		content="Implementación de la Agenda Local Anticorrupción Coahuila 2019-2022"
	/>
</svelte:head>

<Navbar />
<ThemeToggle />

<div class="hero">
	<div class="hero-overlay"></div>
	<div class="hero-content">
		<h1>Agenda Local Anticorrupción</h1>
		<p class="subtitle">Implementación de la Agenda Local Anticorrupción Coahuila 2019-2022</p>
	</div>
</div>

<div class="spacer"></div>

<section class="page-content">
	<div class="container">
		<div class="content-section">
			<div class="content-wrapper">
				<div class="text-content">
					<p>
						La Agenda Local Anticorrupción es un esfuerzo ciudadano para implementar acciones
						concretas que fortalezcan la transparencia, la rendición de cuentas y el combate a la
						corrupción en el estado. A través de informes y comunicados, impulsa recomendaciones
						para que el Sistema Estatal Anticorrupción funcione de manera más cercana a la
						ciudadanía.
					</p>
				</div>
				<div class="image-section">
					<img src="/images/agenda.png" alt="Agenda Local Anticorrupción" />
				</div>
			</div>
		</div>

		<!-- Tabs Section -->
		<div class="tabs-section">
			<div class="tabs">
				<button
					class="tab-btn"
					class:active={activeTab === 'informes'}
					onclick={() => (activeTab = 'informes')}
				>
					Informes
				</button>
				<button
					class="tab-btn"
					class:active={activeTab === 'comunicados'}
					onclick={() => (activeTab = 'comunicados')}
				>
					Comunicados
				</button>
			</div>

			<div class="documents-grid">
				{#if activeTab === 'informes'}
					{#if data.informes.length === 0}
						<p class="no-documents">No hay informes disponibles.</p>
					{:else}
						{#each data.informes as doc}
							<a href={doc.pdfUrl} target="_blank" rel="noopener noreferrer" class="document-card">
								<div class="document-cover">
									{#if doc.coverImage}
										<img
											src={urlFor(doc.coverImage).width(400).height(566).url()}
											alt={doc.title}
										/>
									{:else}
										<div class="placeholder-cover">
											<span>PDF</span>
										</div>
									{/if}
								</div>
								<h3>{doc.title}</h3>
							</a>
						{/each}
					{/if}
				{:else if data.comunicados.length === 0}
					<p class="no-documents">No hay comunicados disponibles.</p>
				{:else}
					{#each data.comunicados as doc}
						<a href={doc.pdfUrl} target="_blank" rel="noopener noreferrer" class="document-card">
							<div class="document-cover">
								{#if doc.coverImage}
									<img src={urlFor(doc.coverImage).width(400).height(566).url()} alt={doc.title} />
								{:else}
									<div class="placeholder-cover">
										<span>PDF</span>
									</div>
								{/if}
							</div>
							<h3>{doc.title}</h3>
						</a>
					{/each}
				{/if}
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
		background: rgba(0, 0, 0, 0.5);
	}

	.hero-content {
		position: relative;
		z-index: 1;
		padding: 40px;
	}

	.hero h1 {
		color: #ffffff;
		font-size: 48px;
		font-weight: 600;
		margin-bottom: 16px;
	}

	.subtitle {
		color: #ffffff;
		font-size: 24px;
		opacity: 0.9;
	}

	.content-section {
		background: var(--card-bg);
		padding: 40px 10px 40px 70px;
		border-radius: 16px;
		box-shadow: 0 4px 12px var(--card-shadow);
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

	/* Tabs Section */
	.tabs-section {
		margin-top: 40px;
	}

	.tabs {
		display: flex;
		justify-content: center;
		gap: 20px;
		margin-bottom: 30px;
	}

	.tab-btn {
		padding: 12px 32px;
		font-size: 16px;
		font-weight: 600;
		border: 2px solid #3b82f6;
		border-radius: 8px;
		background: transparent;
		color: #3b82f6;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.tab-btn:hover {
		background: rgba(59, 130, 246, 0.1);
	}

	.tab-btn.active {
		background: #3b82f6;
		color: white;
	}

	/* Documents Grid */
	.documents-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 30px;
	}

	.no-documents {
		grid-column: 1 / -1;
		text-align: center;
		color: var(--text-secondary);
		font-size: 18px;
		padding: 40px;
	}

	.document-card {
		display: flex;
		flex-direction: column;
		text-decoration: none;
		transition: transform 0.3s ease;
	}

	.document-card:hover {
		transform: translateY(-8px);
	}

	.document-cover {
		aspect-ratio: 1 / 1.414;
		overflow: hidden;
		border-radius: 8px;
		box-shadow: 0 4px 12px var(--card-shadow);
		margin-bottom: 12px;
	}

	.document-cover img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.document-card:hover .document-cover img {
		transform: scale(1.05);
	}

	.placeholder-cover {
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.placeholder-cover span {
		color: white;
		font-size: 24px;
		font-weight: 700;
	}

	.document-card h3 {
		color: var(--text-primary);
		font-size: 14px;
		font-weight: 500;
		line-height: 1.4;
		text-align: center;
	}

	@media (max-width: 1024px) {
		.documents-grid {
			grid-template-columns: repeat(3, 1fr);
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

		.tabs {
			gap: 10px;
		}

		.tab-btn {
			padding: 10px 20px;
			font-size: 14px;
		}

		.documents-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 20px;
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

		.documents-grid {
			grid-template-columns: 1fr;
			gap: 25px;
		}

		.document-card h3 {
			font-size: 13px;
		}
	}
</style>
