<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { urlFor } from '$lib/sanity';
	import { goto } from '$app/navigation';

	// Tipos
	interface Article {
		id: string;
		slug: string;
		title: string;
		excerpt: string;
		author: string;
		date: string;
		image: any;
		category: string;
	}

	// Recibimos los datos del servidor (+page.server.js)
	let { data } = $props();

	// Estado local para el input de búsqueda
	let searchInput = $state<string>(data.selectedSearch || '');
	let searchInputRef: HTMLInputElement;

	// Debounce timer para búsqueda en tiempo real
	let searchTimeout: ReturnType<typeof setTimeout>;

	// Función para construir URL con filtros
	function buildFilterUrl(category?: string, search?: string): string {
		const params = new URLSearchParams();
		if (category) params.set('category', category);
		if (search) params.set('search', search);
		const queryString = params.toString();
		return queryString ? `/blog?${queryString}` : '/blog';
	}

	// Manejar cambio de categoría desde dropdown
	function handleCategoryChange(event: Event) {
		const select = event.target as HTMLSelectElement;
		const cat = select.value;
		goto(buildFilterUrl(cat, searchInput.trim()), { noScroll: true });
	}

	// Manejar búsqueda en tiempo real con debounce
	async function handleSearchInput() {
		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(async () => {
			await goto(buildFilterUrl(data.selectedCategory, searchInput.trim()), { noScroll: true });
			// Restaurar foco después de la navegación
			setTimeout(() => {
				if (searchInputRef) {
					searchInputRef.focus();
					const len = searchInputRef.value.length;
					searchInputRef.setSelectionRange(len, len);
				}
			}, 0);
		}, 300);
	}

	// Función para extraer el primer párrafo del body de Sanity
	function extractFirstParagraph(body: any): string {
		if (!body || !Array.isArray(body)) {
			return 'Haz clic para leer el artículo completo y conocer los detalles de esta noticia del Consejo Cívico.';
		}

		const firstParagraph = body.find(
			(block: any) => block._type === 'block' && block.style === 'normal'
		);

		if (firstParagraph && firstParagraph.children) {
			const text = firstParagraph.children
				.map((child: any) => child.text || '')
				.join('')
				.trim();

			if (text.length > 200) {
				return text.substring(0, 200) + '...';
			}
			return text;
		}

		return 'Haz clic para leer el artículo completo y conocer los detalles de esta noticia del Consejo Cívico.';
	}

	// Transformamos los datos crudos de Sanity para que coincidan con tu diseño
	let articles = $derived<Article[]>(
		data.posts
			? data.posts.map((post: any) => ({
					id: post.slug.current,
					slug: post.slug.current,
					title: post.title,
					excerpt: extractFirstParagraph(post.body),
					author: post.author || 'Equipo CCI',
					date: post.publishedAt,
					image: post.mainImage,
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

	<div class="spacer"></div>

	<section class="filter-section">
		<div class="filter-container">
			<div class="filters-row">
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
						bind:this={searchInputRef}
						type="text"
						class="search-input"
						placeholder="Buscar por título..."
						bind:value={searchInput}
						oninput={handleSearchInput}
					/>
				</div>

				<div class="filter-group">
					<label for="category-filter" class="filter-label">Tema:</label>
					<select
						id="category-filter"
						class="filter-select"
						onchange={handleCategoryChange}
						value={data.selectedCategory}
					>
						<option value="">Todos</option>
						{#each data.categories as category}
							<option value={category}>{category}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>
	</section>

	<section class="articles-section">
		<div class="articles-grid">
			{#if articles.length > 0}
				{#each articles as article (article.id)}
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

		<!-- Paginación -->
		{#if data.pagination.totalPages > 1}
			{@const filterParams =
				(data.selectedCategory ? `&category=${encodeURIComponent(data.selectedCategory)}` : '') +
				(data.selectedSearch ? `&search=${encodeURIComponent(data.selectedSearch)}` : '')}
			<nav class="pagination" aria-label="Paginación del blog">
				{#if data.pagination.hasPrevPage}
					<a
						href="/blog?page={data.pagination.currentPage - 1}{filterParams}"
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
							href="/blog?page={i + 1}{filterParams}"
							class="pagination-number"
							class:active={data.pagination.currentPage === i + 1}
						>
							{i + 1}
						</a>
					{/each}
				</div>

				{#if data.pagination.hasNextPage}
					<a
						href="/blog?page={data.pagination.currentPage + 1}{filterParams}"
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
	</section>
</main>

<Footer />

<style>
	.blog-page {
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

	h1 {
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

	.filter-section {
		background: var(--bg-primary);
		padding: 40px 50px 20px;
		transition: background 0.3s ease;
		position: relative;
		z-index: 10;
	}
	.filter-container {
		max-width: 1400px;
		margin: 0 auto;
	}
	.filters-row {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 30px;
		flex-wrap: wrap;
	}
	.search-container {
		position: relative;
		flex: 1;
		max-width: 400px;
		min-width: 250px;
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
		padding: 14px 40px 14px 20px;
		background: var(--card-bg);
		color: var(--text-primary);
		border: 2px solid #4a7ba7;
		border-radius: 30px;
		font-weight: 500;
		font-size: 15px;
		cursor: pointer;
		transition: all 0.3s ease;
		appearance: none;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%234a7ba7' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 16px center;
		min-width: 180px;
	}
	.filter-select:hover {
		border-color: #2c5f8d;
	}
	.filter-select:focus {
		outline: none;
		border-color: #2c5f8d;
		box-shadow: 0 4px 12px rgba(74, 123, 167, 0.2);
	}
	:global([data-theme='dark']) .filter-select {
		border-color: #00d4ff;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2300d4ff' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
	}
	:global([data-theme='dark']) .filter-select:hover,
	:global([data-theme='dark']) .filter-select:focus {
		border-color: #00d4ff;
		box-shadow: 0 4px 12px rgba(0, 212, 255, 0.2);
	}
	.articles-section {
		padding: 80px 50px;
		background: var(--bg-primary);
		transition: background 0.3s ease;
		position: relative;
		z-index: 10;
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
		line-clamp: 3;
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
		.hero-section {
			padding: 60px 30px;
			min-height: 40vh;
		}
		.spacer {
			height: 40vh;
		}
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
		.filters-row {
			gap: 20px;
		}
		.search-container {
			min-width: 100%;
		}
		.search-input {
			padding: 12px 18px 12px 45px;
			font-size: 15px;
		}
		.filter-select {
			min-width: 150px;
			padding: 12px 36px 12px 16px;
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
		.hero-section {
			padding: 40px 20px;
			min-height: 35vh;
		}
		.spacer {
			height: 35vh;
		}
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
		.search-input {
			padding: 10px 15px 10px 42px;
			font-size: 14px;
		}
		.search-icon {
			width: 16px;
			height: 16px;
			left: 15px;
		}
		.filter-select {
			min-width: 130px;
			font-size: 13px;
		}
		.filter-label {
			font-size: 14px;
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
		border: 2px solid #4a7ba7;
		border-radius: 8px;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.pagination-btn:hover {
		background: linear-gradient(135deg, #4a7ba7, #2c5f8d);
		color: white;
		border-color: #4a7ba7;
	}

	:global([data-theme='dark']) .pagination-btn {
		border-color: #00d4ff;
	}

	:global([data-theme='dark']) .pagination-btn:hover {
		background: linear-gradient(135deg, #00d4ff, #0099cc);
		border-color: #00d4ff;
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
		border: 2px solid #4a7ba7;
		border-radius: 8px;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.pagination-number:hover {
		background: linear-gradient(135deg, #4a7ba7, #2c5f8d);
		color: white;
		border-color: #4a7ba7;
	}

	.pagination-number.active {
		background: linear-gradient(135deg, #4a7ba7, #2c5f8d);
		color: white;
		border-color: #4a7ba7;
	}

	:global([data-theme='dark']) .pagination-number {
		border-color: #00d4ff;
	}

	:global([data-theme='dark']) .pagination-number:hover,
	:global([data-theme='dark']) .pagination-number.active {
		background: linear-gradient(135deg, #00d4ff, #0099cc);
		border-color: #00d4ff;
	}

	@media (max-width: 768px) {
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
</style>
