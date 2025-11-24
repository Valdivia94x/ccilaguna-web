<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { urlFor } from '$lib/sanity'; // <--- Importamos Sanity
	import { PortableText } from '@portabletext/svelte'; // <--- Importamos el renderizador de texto

	// Recibimos los datos reales desde +page.server.js
	let { data } = $props();

	// Transformamos los datos de Sanity para que encajen en tu diseño
	// Si data.post existe, creamos el objeto 'article', si no, es null.
	let article = $derived(
		data.post
			? {
					title: data.post.title,
					// Como aún no tenemos autor en Sanity, ponemos uno por defecto
					author: data.post.author || 'Equipo CCI',
					date: data.post.publishedAt,
					// Generamos la URL de la imagen
					image: data.post.mainImage
						? urlFor(data.post.mainImage).width(1200).height(675).url()
						: null,
					// Como aún no tenemos categoría en Sanity, ponemos una por defecto
					category: data.post.category || 'Noticias',
					// El contenido crudo (JSON) para PortableText
					content: data.post.body
				}
			: null
	);

	// Función para extraer el primer párrafo del body de Sanity
	function extractFirstParagraph(body: any): string {
		if (!body || !Array.isArray(body)) {
			return 'Haz clic para leer el artículo completo.';
		}

		const firstParagraph = body.find(
			(block: any) => block._type === 'block' && block.style === 'normal'
		);

		if (firstParagraph && firstParagraph.children) {
			const text = firstParagraph.children
				.map((child: any) => child.text || '')
				.join('')
				.trim();

			if (text.length > 150) {
				return text.substring(0, 150) + '...';
			}
			return text;
		}

		return 'Haz clic para leer el artículo completo.';
	}

	// Transformar artículos relacionados
	let relatedArticles = $derived(
		data.relatedPosts
			? data.relatedPosts.map((post: any) => ({
					id: post._id,
					slug: post.slug.current,
					title: post.title,
					excerpt: extractFirstParagraph(post.body),
					image: post.mainImage,
					category: post.category || 'General',
					date: post.publishedAt
				}))
			: []
	);

	// Función para formatear fecha (La conservamos igual)
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
	{#if article}
		<title>{article.title} | Blog CCI Laguna</title>
		<meta name="description" content={article.title} />
	{:else}
		<title>Artículo no encontrado | Blog CCI Laguna</title>
	{/if}

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap"
		rel="stylesheet"
	/>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
	/>
</svelte:head>

<Navbar />
<ThemeToggle />

<main class="article-page">
	{#if article}
		<article class="article-container">
			<header class="article-header">
				<div class="breadcrumb">
					<a href="/blog">← Volver al Blog</a>
				</div>
				<div class="article-category-badge">{article.category}</div>
				<h1 class="article-title">{article.title}</h1>
				<div class="article-meta">
					<div class="meta-item author">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
							<path
								d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
							/>
						</svg>
						<span>{article.author}</span>
					</div>
					<div class="meta-item date">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
							<path
								d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"
							/>
						</svg>
						<span>{formatDate(article.date)}</span>
					</div>
				</div>
			</header>

			{#if article.image}
				<div class="featured-image">
					<img src={article.image} alt={article.title} />
				</div>
			{/if}

			<div class="article-body">
				<PortableText value={article.content} />
			</div>

			<footer class="article-footer">
				<a href="/blog" class="back-to-blog">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
						<path
							d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
						/>
					</svg>
					Volver al Blog
				</a>
			</footer>
		</article>

		<!-- Sección de Artículos Relacionados -->
		{#if relatedArticles.length > 0}
			<section class="related-articles">
				<h2 class="related-title">Artículos Relacionados</h2>
				<div class="related-grid">
					{#each relatedArticles as related (related.id)}
						<article class="related-card">
							<a href="/blog/{related.slug}" class="related-link">
								<div class="related-image">
									{#if related.image}
										<img
											src={urlFor(related.image).width(400).height(250).url()}
											alt={related.title}
										/>
									{:else}
										<div class="related-image-placeholder">
											<span>Sin imagen</span>
										</div>
									{/if}
									<div class="related-category">{related.category}</div>
								</div>
								<div class="related-content">
									<h3 class="related-card-title">{related.title}</h3>
									<p class="related-excerpt">{related.excerpt}</p>
									<span class="related-read-more">
										Leer más
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
											<path
												d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
											/>
										</svg>
									</span>
								</div>
							</a>
						</article>
					{/each}
				</div>
			</section>
		{/if}
	{:else}
		<section class="not-found">
			<div class="not-found-content">
				<h1>404</h1>
				<h2>Artículo no encontrado</h2>
				<p>Lo sentimos, el artículo que buscas no existe.</p>
				<a href="/blog" class="btn-back">Volver al Blog</a>
			</div>
		</section>
	{/if}
</main>

<Footer />

<style>
	/* ... MANTÉN TUS ESTILOS EXACTAMENTE IGUAL ... */
	/* Copia aquí abajo todo el bloque <style> que tenías en tu archivo original. */
	/* No es necesario cambiar nada del CSS porque PortableText genera etiquetas <p>, <h2>, etc. */
	/* que tus estilos ya saben como estilizar. */

	.article-page {
		min-height: calc(100vh - 200px);
		background: var(--bg-primary);
		padding: 80px 50px;
		transition: background 0.3s ease;
	}

	.article-container {
		max-width: 900px;
		margin: 0 auto;
	}

	/* Header */
	.article-header {
		margin-bottom: 40px;
	}

	.breadcrumb {
		margin-bottom: 20px;
	}

	.breadcrumb a {
		color: #4a7ba7;
		text-decoration: none;
		font-size: 15px;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		transition: color 0.3s ease;
	}

	:global([data-theme='dark']) .breadcrumb a {
		color: #00d4ff;
	}

	.breadcrumb a:hover {
		text-decoration: underline;
	}

	.article-category-badge {
		display: inline-block;
		background: rgba(74, 123, 167, 0.1);
		color: #4a7ba7;
		padding: 8px 16px;
		border-radius: 20px;
		font-size: 13px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin-bottom: 20px;
	}

	:global([data-theme='dark']) .article-category-badge {
		background: rgba(0, 212, 255, 0.1);
		color: #00d4ff;
	}

	.article-title {
		font-size: 42px;
		font-weight: 400;
		color: var(--text-secondary);
		line-height: 1.3;
		margin-bottom: 20px;
	}

	.article-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 25px;
		color: var(--text-primary);
		opacity: 0.8;
		font-size: 15px;
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.meta-item svg {
		width: 16px;
		height: 16px;
		opacity: 0.7;
	}

	/* Featured Image */
	.featured-image {
		width: 100%;
		max-height: 500px;
		overflow: hidden;
		border-radius: 15px;
		margin-bottom: 50px;
		box-shadow: 0 10px 30px var(--card-shadow);
	}

	.featured-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/* Article Body */
	.article-body {
		color: var(--text-primary);
		font-size: 18px;
		line-height: 1.8;
		margin-bottom: 50px;
	}

	.article-body :global(h2) {
		font-size: 32px;
		font-weight: 400;
		color: var(--text-secondary);
		margin-top: 40px;
		margin-bottom: 20px;
		line-height: 1.3;
	}

	.article-body :global(h3) {
		font-size: 24px;
		font-weight: 600;
		color: var(--text-secondary);
		margin-top: 30px;
		margin-bottom: 15px;
	}

	.article-body :global(p) {
		margin-bottom: 20px;
	}

	.article-body :global(ul),
	.article-body :global(ol) {
		margin-bottom: 20px;
		padding-left: 30px;
	}

	.article-body :global(li) {
		margin-bottom: 10px;
	}

	.article-body :global(a) {
		color: #4a7ba7;
		text-decoration: underline;
	}

	:global([data-theme='dark']) .article-body :global(a) {
		color: #00d4ff;
	}

	/* Article Footer */
	.article-footer {
		border-top: 2px solid rgba(74, 123, 167, 0.2);
		padding-top: 30px;
	}

	.back-to-blog {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		color: #4a7ba7;
		text-decoration: none;
		font-weight: 600;
		font-size: 16px;
		transition: gap 0.3s ease;
	}

	:global([data-theme='dark']) .back-to-blog {
		color: #00d4ff;
	}

	.back-to-blog:hover {
		gap: 15px;
	}

	.back-to-blog svg {
		width: 18px;
		height: 18px;
	}

	/* 404 Not Found */
	.not-found {
		min-height: 60vh;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.not-found-content h1 {
		font-size: 120px;
		font-weight: 400;
		color: #4a7ba7;
		margin-bottom: 20px;
	}

	:global([data-theme='dark']) .not-found-content h1 {
		color: #00d4ff;
	}

	.not-found-content h2 {
		font-size: 36px;
		color: var(--text-secondary);
		margin-bottom: 15px;
	}

	.not-found-content p {
		font-size: 18px;
		color: var(--text-primary);
		margin-bottom: 30px;
	}

	.btn-back {
		display: inline-block;
		background: linear-gradient(135deg, #4a7ba7, #2c5f8d);
		color: white;
		padding: 15px 30px;
		border-radius: 30px;
		text-decoration: none;
		font-weight: 600;
		transition: transform 0.3s ease;
	}

	.btn-back:hover {
		transform: translateY(-3px);
		box-shadow: 0 5px 15px rgba(74, 123, 167, 0.3);
	}

	/* Related Articles Section */
	.related-articles {
		max-width: 1200px;
		margin: 60px auto 0;
		padding-top: 60px;
		border-top: 2px solid rgba(74, 123, 167, 0.2);
	}

	.related-title {
		font-size: 32px;
		font-weight: 600;
		color: var(--text-secondary);
		text-align: center;
		margin-bottom: 40px;
	}

	.related-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 30px;
	}

	.related-card {
		background: var(--card-bg);
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 4px 15px var(--card-shadow);
		transition: all 0.3s ease;
	}

	.related-card:hover {
		transform: translateY(-8px);
		box-shadow: 0 12px 30px var(--card-shadow);
	}

	.related-link {
		text-decoration: none;
		color: inherit;
		display: block;
	}

	.related-image {
		position: relative;
		width: 100%;
		height: 200px;
		overflow: hidden;
		background: var(--card-bg);
	}

	.related-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.related-card:hover .related-image img {
		transform: scale(1.1);
	}

	.related-image-placeholder {
		width: 100%;
		height: 100%;
		background: #eee;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	:global([data-theme='dark']) .related-image-placeholder {
		background: #333;
	}

	.related-image-placeholder span {
		color: #999;
		font-size: 14px;
	}

	.related-category {
		position: absolute;
		top: 12px;
		right: 12px;
		background: rgba(74, 123, 167, 0.9);
		color: white;
		padding: 6px 12px;
		border-radius: 15px;
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	:global([data-theme='dark']) .related-category {
		background: rgba(0, 212, 255, 0.9);
	}

	.related-content {
		padding: 20px;
	}

	.related-card-title {
		font-size: 18px;
		font-weight: 600;
		color: var(--text-secondary);
		margin-bottom: 12px;
		line-height: 1.4;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		transition: color 0.3s ease;
	}

	.related-card:hover .related-card-title {
		color: #4a7ba7;
	}

	:global([data-theme='dark']) .related-card:hover .related-card-title {
		color: #00d4ff;
	}

	.related-excerpt {
		font-size: 14px;
		line-height: 1.6;
		color: var(--text-primary);
		margin-bottom: 15px;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.related-read-more {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		color: #4a7ba7;
		font-weight: 600;
		font-size: 14px;
		transition: gap 0.3s ease;
	}

	:global([data-theme='dark']) .related-read-more {
		color: #00d4ff;
	}

	.related-card:hover .related-read-more {
		gap: 10px;
	}

	.related-read-more svg {
		width: 14px;
		height: 14px;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.article-page {
			padding: 60px 30px;
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

		.featured-image {
			max-height: 350px;
		}

		.related-articles {
			margin-top: 40px;
			padding-top: 40px;
		}

		.related-title {
			font-size: 26px;
			margin-bottom: 30px;
		}

		.related-grid {
			grid-template-columns: 1fr;
			gap: 25px;
		}

		.related-image {
			height: 180px;
		}
	}

	@media (max-width: 480px) {
		.article-page {
			padding: 40px 20px;
		}

		.article-title {
			font-size: 26px;
		}

		.article-meta {
			flex-direction: column;
			gap: 10px;
		}

		.not-found-content h1 {
			font-size: 80px;
		}

		.not-found-content h2 {
			font-size: 28px;
		}

		.related-articles {
			margin-top: 30px;
			padding-top: 30px;
		}

		.related-title {
			font-size: 22px;
			margin-bottom: 25px;
		}

		.related-grid {
			gap: 20px;
		}

		.related-image {
			height: 160px;
		}

		.related-content {
			padding: 15px;
		}

		.related-card-title {
			font-size: 16px;
		}

		.related-excerpt {
			font-size: 13px;
		}
	}
</style>
