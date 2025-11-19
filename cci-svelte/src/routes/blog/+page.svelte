<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { urlFor } from '$lib/sanity'; // <--- IMPORTANTE

	// Recibimos los datos del servidor (+page.server.js)
	let { data } = $props();

	// Estado para el filtro activo
	let activeCategory = $state<string>('Todos');

	// --- AQUÍ ESTÁ LA MAGIA ---
	// Transformamos los datos crudos de Sanity para que coincidan con tu diseño
	let articles = $derived(
		data.posts
			? data.posts.map((post: any) => ({
					id: post.slug.current,
					slug: post.slug.current,
					title: post.title,
					// Como aún no tenemos 'excerpt' en Sanity, usamos un texto genérico o cortamos el body si quisieras
					excerpt:
						'Haz clic para leer el artículo completo y conocer los detalles de esta noticia del Consejo Cívico.',
					// Como aún no tenemos 'author' en Sanity
					author: 'Equipo CCI',
					date: post.publishedAt,
					// Pasamos la imagen cruda de Sanity
					image: post.mainImage,
					// Como aún no tenemos 'category' en Sanity, asignamos una por defecto
					category: post.category || 'General'
				}))
			: []
	);

	// Función para formatear fecha
	function formatDate(dateString: string): string {
		if (!dateString) return '';
		const date = new Date(dateString);
		return date.toLocaleDateString('es-MX', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	// Obtener categorías únicas dinámicamente de los artículos existentes
	let categories = $derived.by(() => {
		const uniqueCategories = new Set(articles.map((article) => article.category));
		return ['Todos', ...Array.from(uniqueCategories).sort()];
	});

	// Filtrar artículos por categoría
	let filteredArticles = $derived(
		activeCategory === 'Todos'
			? articles
			: articles.filter((article) => article.category === activeCategory)
	);
</script>

<svelte:head>
	<title>Blog | Consejo Cívico de Laguna</title>
	<meta
		name="description"
		content="Lee los últimos artículos sobre participación ciudadana, transparencia y desarrollo social en la Comarca Lagunera"
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

<main class="blog-page">
	<section class="hero-section">
		<div class="hero-content">
			<h1>Blog</h1>
			<p class="hero-description">
				Artículos, análisis y reflexiones sobre participación ciudadana, transparencia y desarrollo
				social en la Comarca Lagunera
			</p>
		</div>
	</section>

	<section class="filter-section">
		<div class="filter-container">
			<h2 class="filter-title">Filtrar por tema:</h2>
			<div class="category-filters">
				{#each categories as category}
					<button
						class="category-btn"
						class:active={activeCategory === category}
						onclick={() => (activeCategory = category)}
					>
						{category}
					</button>
				{/each}
			</div>
		</div>
	</section>

	<section class="articles-section">
		<div class="articles-grid">
			{#if filteredArticles.length > 0}
				{#each filteredArticles as article (article.id)}
					<article class="article-card">
						<a href="/blog/{article.slug}" class="article-link">
							<div class="article-image">
								{#if article.image}
									<img
										src={urlFor(article.image).width(600).height(400).url()}
										alt={article.title}
									/>
								{:else}
									<div
										style="width:100%; height:100%; background:#eee; display:flex; align-items:center; justify-content:center;"
									>
										<span style="color:#999">Sin imagen</span>
									</div>
								{/if}
								<div class="article-category">{article.category}</div>
							</div>
							<div class="article-content">
								<h2 class="article-title">{article.title}</h2>
								<div class="article-meta">
									<span class="article-author">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 448 512"
											fill="currentColor"
										>
											<path
												d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
											/>
										</svg>
										{article.author}
									</span>
									<span class="article-date">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 448 512"
											fill="currentColor"
										>
											<path
												d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"
											/>
										</svg>
										{formatDate(article.date)}
									</span>
								</div>
								<p class="article-excerpt">{article.excerpt}</p>
								<div class="read-more">
									Leer más
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
										<path
											d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
										/>
									</svg>
								</div>
							</div>
						</a>
					</article>
				{/each}
			{:else}
				<div style="text-align: center; grid-column: 1/-1; padding: 50px;">
					<p style="font-size: 1.2rem; color: #666;">
						No se encontraron artículos en esta categoría.
					</p>
				</div>
			{/if}
		</div>
	</section>
</main>

<Footer />

<style>
	/* ... TUS ESTILOS EXISTENTES (Pégalos aquí abajo, no cambian) ... */
	.blog-page {
		min-height: calc(100vh - 200px);
	}
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
	.filter-section {
		background: var(--bg-primary);
		padding: 40px 50px 20px;
		transition: background 0.3s ease;
	}
	.filter-container {
		max-width: 1400px;
		margin: 0 auto;
	}
	.filter-title {
		font-size: 18px;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 20px;
		text-align: center;
	}
	.category-filters {
		display: flex;
		flex-wrap: wrap;
		gap: 15px;
		justify-content: center;
		align-items: center;
	}
	.category-btn {
		padding: 12px 24px;
		border: 2px solid #4a7ba7;
		background: transparent;
		color: var(--text-primary);
		border-radius: 25px;
		font-size: 15px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
		text-transform: capitalize;
	}
	.category-btn:hover {
		background: rgba(74, 123, 167, 0.1);
		transform: translateY(-2px);
	}
	.category-btn.active {
		background: linear-gradient(135deg, #4a7ba7, #2c5f8d);
		color: white;
		border-color: #4a7ba7;
		box-shadow: 0 4px 12px rgba(74, 123, 167, 0.3);
	}
	:global([data-theme='dark']) .category-btn {
		border-color: #00d4ff;
	}
	:global([data-theme='dark']) .category-btn:hover {
		background: rgba(0, 212, 255, 0.1);
	}
	:global([data-theme='dark']) .category-btn.active {
		background: linear-gradient(135deg, #00d4ff, #0099cc);
		border-color: #00d4ff;
		box-shadow: 0 4px 12px rgba(0, 212, 255, 0.3);
	}
	.articles-section {
		padding: 80px 50px;
		background: var(--bg-primary);
		transition: background 0.3s ease;
	}
	.articles-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 40px;
		max-width: 1400px;
		margin: 0 auto;
	}
	.article-card {
		background: var(--card-bg);
		border-radius: 15px;
		overflow: hidden;
		box-shadow: 0 5px 20px var(--card-shadow);
		transition: all 0.3s ease;
	}
	.article-card:hover {
		transform: translateY(-10px);
		box-shadow: 0 15px 40px var(--card-shadow);
	}
	.article-link {
		text-decoration: none;
		color: inherit;
		display: block;
	}
	.article-image {
		position: relative;
		width: 100%;
		height: 250px;
		overflow: hidden;
		background: var(--card-bg);
	}
	.article-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}
	.article-card:hover .article-image img {
		transform: scale(1.1);
	}
	.article-category {
		position: absolute;
		top: 15px;
		right: 15px;
		background: rgba(74, 123, 167, 0.9);
		color: white;
		padding: 8px 16px;
		border-radius: 20px;
		font-size: 13px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}
	:global([data-theme='dark']) .article-category {
		background: rgba(0, 212, 255, 0.9);
	}
	.article-content {
		padding: 25px;
	}
	.article-title {
		font-size: 22px;
		font-weight: 400;
		color: var(--text-secondary);
		margin-bottom: 15px;
		line-height: 1.4;
		transition: color 0.3s ease;
	}
	.article-card:hover .article-title {
		color: #4a7ba7;
	}
	:global([data-theme='dark']) .article-card:hover .article-title {
		color: #00d4ff;
	}
	.article-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		margin-bottom: 15px;
		font-size: 14px;
		color: var(--text-primary);
		opacity: 0.8;
	}
	.article-author,
	.article-date {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.article-author svg,
	.article-date svg {
		width: 14px;
		height: 14px;
		opacity: 0.7;
	}
	.article-excerpt {
		font-size: 15px;
		line-height: 1.6;
		color: var(--text-primary);
		margin-bottom: 20px;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.read-more {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		color: #4a7ba7;
		font-weight: 600;
		font-size: 15px;
		transition: gap 0.3s ease;
	}
	:global([data-theme='dark']) .read-more {
		color: #00d4ff;
	}
	.article-card:hover .read-more {
		gap: 12px;
	}
	.read-more svg {
		width: 16px;
		height: 16px;
	}
	@media (max-width: 768px) {
		.hero-section,
		.articles-section {
			padding: 60px 30px;
		}
		.filter-section {
			padding: 30px 30px 15px;
		}
		h1 {
			font-size: 40px;
		}
		.hero-description {
			font-size: 18px;
		}
		.filter-title {
			font-size: 16px;
		}
		.category-btn {
			padding: 10px 20px;
			font-size: 14px;
		}
		.articles-grid {
			grid-template-columns: 1fr;
			gap: 30px;
		}
		.article-image {
			height: 220px;
		}
	}
	@media (max-width: 480px) {
		.hero-section,
		.articles-section {
			padding: 40px 20px;
		}
		.filter-section {
			padding: 20px 20px 10px;
		}
		h1 {
			font-size: 32px;
		}
		.hero-description {
			font-size: 16px;
		}
		.filter-title {
			font-size: 15px;
			margin-bottom: 15px;
		}
		.category-filters {
			gap: 10px;
		}
		.category-btn {
			padding: 8px 16px;
			font-size: 13px;
		}
		.article-content {
			padding: 20px;
		}
		.article-title {
			font-size: 20px;
		}
		.article-image {
			height: 200px;
		}
	}
</style>
