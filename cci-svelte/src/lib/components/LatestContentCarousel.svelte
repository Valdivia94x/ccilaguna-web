<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	interface ContentItem {
		_id: string;
		_type: 'post' | 'publication' | 'newsletter' | 'report';
		title: string;
		slug: string;
		date: string;
		image: string | null;
		excerpt: string | null;
		category?: string;
	}

	let { items, mission }: { items: ContentItem[]; mission: string } = $props();

	// Tomar los primeros 6 items
	let displayItems = $derived(items.slice(0, 6));

	// Estado del carrusel (0 = primera página, 1 = segunda página)
	let currentPage = $state(0);
	let isPaused = $state(false);
	let intervalId: number | undefined;

	// Calcular el número total de páginas (cada página muestra 3 items)
	let totalPages = $derived(Math.ceil(displayItems.length / 3));

	// Items visibles en la página actual
	let visibleItems = $derived(displayItems.slice(currentPage * 3, currentPage * 3 + 3));

	// Configuración de tipos de contenido
	const typeConfig = {
		post: {
			label: 'Blog',
			color: '#3b82f6',
			darkColor: '#60a5fa',
			route: '/blog'
		},
		publication: {
			label: 'Publicacion',
			color: '#10b981',
			darkColor: '#34d399',
			route: '/publicaciones'
		},
		newsletter: {
			label: 'Boletin',
			color: '#f59e0b',
			darkColor: '#fbbf24',
			route: '/boletines'
		},
		report: {
			label: 'Informe',
			color: '#8b5cf6',
			darkColor: '#a78bfa',
			route: '/informes'
		}
	};

	function getItemUrl(item: ContentItem): string {
		const config = typeConfig[item._type];
		if (item._type === 'report') {
			return config.route;
		}
		return `${config.route}/${item.slug}`;
	}

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('es-MX', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}

	function nextPage() {
		if (totalPages > 0) {
			currentPage = (currentPage + 1) % totalPages;
		}
	}

	function prevPage() {
		if (totalPages > 0) {
			currentPage = (currentPage - 1 + totalPages) % totalPages;
		}
	}

	function goToPage(index: number) {
		currentPage = index;
	}

	function startAutoplay() {
		if (intervalId) return;
		intervalId = window.setInterval(() => {
			if (!isPaused) {
				nextPage();
			}
		}, 6000);
	}

	function stopAutoplay() {
		if (intervalId) {
			clearInterval(intervalId);
			intervalId = undefined;
		}
	}

	onMount(() => {
		startAutoplay();
	});

	onDestroy(() => {
		stopAutoplay();
	});

	function handleMouseEnter() {
		isPaused = true;
	}

	function handleMouseLeave() {
		isPaused = false;
	}

	function animarAlEntrar(node: HTMLElement, options?: { threshold?: number }) {
		const threshold = options?.threshold ?? 0.15;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						node.classList.add('visible');
					} else {
						node.classList.remove('visible');
					}
				});
			},
			{
				threshold,
				rootMargin: '0px'
			}
		);

		observer.observe(node);

		return {
			destroy() {
				observer.disconnect();
			}
		};
	}
</script>

<section id="publicaciones-recientes" class="content-section" aria-labelledby="content-heading">
	<!-- Titulo con banda -->
	<div class="title-section" use:animarAlEntrar>
		<div class="content-icon">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<!-- Documento/Publicacion -->
				<rect x="20" y="10" width="50" height="65" rx="3" />
				<rect x="30" y="25" width="60" height="65" rx="3" fill="var(--bg-primary, white)" />

				<!-- Lineas de texto -->
				<line x1="38" y1="40" x2="78" y2="40" stroke-width="2.5" />
				<line x1="38" y1="52" x2="72" y2="52" opacity="0.7" />
				<line x1="38" y1="62" x2="75" y2="62" opacity="0.7" />
				<line x1="38" y1="72" x2="65" y2="72" opacity="0.7" />

				<!-- Indicador de "nuevo" -->
				<circle cx="78" cy="30" r="8" fill="currentColor" stroke="none" />
			</svg>
		</div>
		<h2 id="content-heading" class="content-title">Publicaciones mas recientes</h2>
	</div>

	<!-- Carrusel de contenido -->
	<div
		class="carousel-wrapper"
		use:animarAlEntrar={{ threshold: 0.2 }}
		role="region"
		aria-label="Carrusel de publicaciones recientes"
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
	>
		{#if displayItems.length === 0}
			<div class="empty-state">
				<p>No hay publicaciones recientes disponibles.</p>
			</div>
		{:else}
			<!-- Botón anterior -->
			{#if totalPages > 1}
				<button class="carousel-btn prev" onclick={prevPage} aria-label="Página anterior">
					&#10094;
				</button>
			{/if}

			<div class="cards-container">
				{#key currentPage}
					<div class="cards-grid">
						{#each visibleItems as item, index (item._id)}
							{@const config = typeConfig[item._type]}
							<div class="content-card" style="--delay: {index * 0.1}s">
								<a href={getItemUrl(item)} class="card-link">
									<div class="card-image-container">
										{#if item.image}
											<img src={item.image} alt={item.title} class="card-image" />
										{:else}
											<div class="card-image-placeholder" style="background-color: {config.color}20">
												<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={config.color} stroke-width="1.5">
													<rect x="3" y="3" width="18" height="18" rx="2" />
													<line x1="7" y1="10" x2="17" y2="10" />
													<line x1="7" y1="14" x2="14" y2="14" />
												</svg>
											</div>
										{/if}
										<span
											class="type-badge"
											style="--badge-color: {config.color}; --badge-color-dark: {config.darkColor}"
										>
											{config.label}
										</span>
									</div>
									<div class="card-content">
										<span class="card-date">{formatDate(item.date)}</span>
										<h3 class="card-title">{item.title}</h3>
										{#if item.excerpt}
											<p class="card-excerpt">{item.excerpt}</p>
										{/if}
										<span class="card-cta">Ver mas &rarr;</span>
									</div>
								</a>
							</div>
						{/each}
					</div>
				{/key}
			</div>

			<!-- Botón siguiente -->
			{#if totalPages > 1}
				<button class="carousel-btn next" onclick={nextPage} aria-label="Página siguiente">
					&#10095;
				</button>
			{/if}
		{/if}
	</div>

	<!-- Indicadores de página -->
	{#if totalPages > 1}
		<div class="carousel-indicators" role="tablist" aria-label="Navegación de páginas">
			{#each Array(totalPages) as _, index}
				<button
					class="indicator"
					class:active={index === currentPage}
					onclick={() => goToPage(index)}
					aria-label={`Ir a página ${index + 1}`}
					aria-selected={index === currentPage}
					role="tab"
				></button>
			{/each}
		</div>
	{/if}

	<!-- Mision (debajo del carrusel) -->
	<div class="mission-wrapper">
		<div class="mission-card" use:animarAlEntrar>
			<span class="quote-watermark">"</span>
			<span class="mission-label">NUESTRA MISION</span>
			<p class="mission-text">{mission}</p>
		</div>
	</div>
</section>

<style>
	.content-section {
		padding: 30px 50px 30px 50px;
		padding-top: 100px;
		background: var(--bg-objectives);
		transition: background 0.3s ease;
		overflow: visible;
	}

	/* Mision (debajo del carrusel) */
	.mission-wrapper {
		background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
		padding: 60px 50px;
		margin: 60px -50px -30px -50px;
		transition: background 0.3s ease;
	}

	:global([data-theme='dark']) .mission-wrapper {
		background: #1e293b;
	}

	.mission-card {
		opacity: 0;
		transform: scale(0.9) translateY(30px);
		transition:
			opacity 0.8s ease-out,
			transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
		will-change: opacity, transform;
		transition-delay: 0.2s;
		max-width: 900px;
		margin: 0 auto;
		text-align: center;
		position: relative;
		overflow: hidden;
		background: linear-gradient(135deg, #d4e9f7 0%, #e8f4f8 100%);
		padding: 50px 60px;
		border-radius: 16px;
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
	}

	:global([data-theme='dark']) .mission-card {
		background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
	}

	.mission-card:global(.visible) {
		opacity: 1;
		transform: scale(1) translateY(0);
	}

	.mission-card::before {
		content: '';
		position: absolute;
		top: 85px;
		left: 800px;
		right: 0;
		bottom: 0;
		background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23000000' stroke-width='0.5'%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='50' cy='10' r='2'/%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='50' r='2'/%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3Cline x1='10' y1='10' x2='30' y2='30'/%3E%3Cline x1='50' y1='10' x2='30' y2='30'/%3E%3Cline x1='10' y1='50' x2='30' y2='30'/%3E%3Cline x1='50' y1='50' x2='30' y2='30'/%3E%3Cline x1='10' y1='10' x2='50' y2='10'/%3E%3Cline x1='10' y1='50' x2='50' y2='50'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
		background-size: 600px 600px;
		opacity: 0.1;
		pointer-events: none;
		border-radius: 16px;
	}

	:global([data-theme='dark']) .mission-card::before {
		background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23ffffff' stroke-width='0.5'%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='50' cy='10' r='2'/%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='50' r='2'/%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3Cline x1='10' y1='10' x2='30' y2='30'/%3E%3Cline x1='50' y1='10' x2='30' y2='30'/%3E%3Cline x1='10' y1='50' x2='30' y2='30'/%3E%3Cline x1='50' y1='50' x2='30' y2='30'/%3E%3Cline x1='10' y1='10' x2='50' y2='10'/%3E%3Cline x1='10' y1='50' x2='50' y2='50'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
		opacity: 0.08;
	}

	.quote-watermark {
		position: absolute;
		top: -20px;
		left: 20px;
		font-size: 180px;
		font-family: Georgia, serif;
		color: rgba(0, 0, 0, 0.02);
		line-height: 1;
		pointer-events: none;
		user-select: none;
	}

	:global([data-theme='dark']) .quote-watermark {
		color: rgba(255, 255, 255, 0.05);
	}

	.mission-label {
		font-size: 18px;
		font-weight: 600;
		letter-spacing: 3px;
		text-transform: uppercase;
		color: rgba(0, 0, 0);
		margin-bottom: 20px;
		display: block;
		position: relative;
		z-index: 1;
	}

	:global([data-theme='dark']) .mission-label {
		color: rgba(255, 255, 255, 0.7);
	}

	.mission-text {
		font-size: 26px;
		font-weight: 500;
		color: #000000;
		line-height: 1.7;
		padding: 0;
		margin: 0;
		position: relative;
		z-index: 1;
	}

	:global([data-theme='dark']) .mission-text {
		color: #e2e8f0;
	}

	/* Banda horizontal del titulo */
	.title-section {
		background: linear-gradient(135deg, #e8f4f8 0%, #d4e9f7 50%, #c5dff0 100%);
		height: 80px;
		padding: 5px 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 24px;
		position: relative;
		margin: -100px -50px 40px -50px;
		transition:
			background 0.3s ease,
			opacity 1s cubic-bezier(0.22, 1, 0.36, 1),
			transform 1s cubic-bezier(0.22, 1, 0.36, 1);
		overflow: visible;
		box-shadow: 0 4px 12px rgba(74, 123, 167, 0.15);
		opacity: 0;
		transform: translateY(60px) scale(0.95);
	}

	.title-section::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(90deg, transparent 0%, rgba(74, 123, 167, 0.3) 50%, transparent 100%);
	}

	.title-section:global(.visible) {
		opacity: 1;
		transform: translateY(0) scale(1);
	}

	:global([data-theme='dark']) .title-section {
		background: linear-gradient(135deg, #374151 0%, #414a5e 50%, #4b5563 100%);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	}

	:global([data-theme='dark']) .title-section::after {
		background: linear-gradient(90deg, transparent 0%, rgba(255, 161, 0, 0.4) 50%, transparent 100%);
	}

	.content-icon {
		width: 70px;
		height: 70px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #4a7ba7;
		transition: color 0.3s ease, transform 0.3s ease;
	}

	.content-icon svg {
		width: 100%;
		height: 100%;
	}

	.title-section:hover .content-icon {
		transform: scale(1.05);
	}

	:global([data-theme='dark']) .content-icon {
		color: #ffa100;
	}

	.content-title {
		color: #1a365d;
		font-size: 42px;
		font-weight: 700;
		letter-spacing: 3px;
		text-transform: uppercase;
		margin: 0;
		text-align: center;
		transition: color 0.3s ease;
	}

	:global([data-theme='dark']) .content-title {
		color: #ffa100;
	}

	/* Wrapper del carrusel */
	.carousel-wrapper {
		position: relative;
		max-width: 1300px;
		margin: 0 auto;
		padding: 20px 70px;
		opacity: 0;
		transform: translateY(60px);
		transition:
			opacity 1s ease-out,
			transform 1s ease-out;
	}

	.carousel-wrapper:global(.visible) {
		opacity: 1;
		transform: translateY(0);
	}

	.carousel-wrapper:global(.visible) .content-card {
		opacity: 1;
		transform: translateY(0);
	}

	/* Contenedor de tarjetas */
	.cards-container {
		overflow: hidden;
	}

	.cards-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 30px;
		animation: fadeIn 0.5s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateX(30px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.empty-state {
		text-align: center;
		color: var(--text-secondary);
		font-size: 18px;
		padding: 60px 20px;
		grid-column: 1 / -1;
	}

	/* Botones de navegación */
	.carousel-btn {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(74, 123, 167, 0.9);
		color: white;
		border: none;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		font-size: 24px;
		cursor: pointer;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
	}

	.carousel-btn:hover {
		background: rgba(74, 123, 167, 1);
		transform: translateY(-50%) scale(1.1);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
	}

	.carousel-btn.prev {
		left: 10px;
	}

	.carousel-btn.next {
		right: 10px;
	}

	:global([data-theme='dark']) .carousel-btn {
		background: rgba(255, 161, 0, 0.9);
	}

	:global([data-theme='dark']) .carousel-btn:hover {
		background: rgba(255, 161, 0, 1);
	}

	/* Indicadores */
	.carousel-indicators {
		display: flex;
		justify-content: center;
		gap: 15px;
		margin-top: 30px;
	}

	.indicator {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		border: 2px solid #4a7ba7;
		background: transparent;
		cursor: pointer;
		transition: all 0.3s ease;
		padding: 0;
	}

	.indicator:hover {
		transform: scale(1.2);
	}

	.indicator.active {
		background: #4a7ba7;
		transform: scale(1.3);
	}

	:global([data-theme='dark']) .indicator {
		border-color: #ffa100;
	}

	:global([data-theme='dark']) .indicator.active {
		background: #ffa100;
	}

	/* Tarjeta de contenido */
	.content-card {
		opacity: 0;
		transform: translateY(30px);
		transition:
			opacity 0.6s ease-out,
			transform 0.6s ease-out;
		transition-delay: var(--delay, 0s);
	}

	.card-link {
		display: block;
		text-decoration: none;
		color: inherit;
		background: var(--card-bg);
		border-radius: 16px;
		overflow: hidden;
		box-shadow: 0 10px 30px var(--card-shadow);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.card-link:hover {
		transform: translateY(-5px);
		box-shadow: 0 15px 40px var(--card-shadow);
	}

	.card-image-container {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9;
		overflow: hidden;
		background: #f3f4f6;
	}

	:global([data-theme='dark']) .card-image-container {
		background: #374151;
	}

	.card-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.card-link:hover .card-image {
		transform: scale(1.05);
	}

	.card-image-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.card-image-placeholder svg {
		width: 64px;
		height: 64px;
		opacity: 0.5;
	}

	.type-badge {
		position: absolute;
		top: 12px;
		left: 12px;
		background: var(--badge-color);
		color: white;
		font-size: 12px;
		font-weight: 600;
		padding: 6px 12px;
		border-radius: 20px;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	}

	:global([data-theme='dark']) .type-badge {
		background: var(--badge-color-dark);
	}

	.card-content {
		padding: 24px;
	}

	.card-date {
		display: block;
		font-size: 14px;
		color: var(--text-secondary);
		margin-bottom: 8px;
	}

	.card-title {
		font-size: 22px;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 12px 0;
		line-height: 1.3;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.card-excerpt {
		font-size: 15px;
		color: var(--text-secondary);
		line-height: 1.6;
		margin: 0 0 16px 0;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.card-cta {
		display: inline-block;
		font-size: 14px;
		font-weight: 600;
		color: #4a7ba7;
		transition: color 0.3s ease;
	}

	:global([data-theme='dark']) .card-cta {
		color: #60a5fa;
	}

	.card-link:hover .card-cta {
		color: #2c5f8d;
	}

	:global([data-theme='dark']) .card-link:hover .card-cta {
		color: #93c5fd;
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.carousel-wrapper {
			padding: 20px 60px;
		}

		.cards-grid {
			grid-template-columns: repeat(3, 1fr);
			gap: 20px;
		}

		.card-title {
			font-size: 18px;
		}

		.card-excerpt {
			font-size: 14px;
			-webkit-line-clamp: 2;
		}

		.carousel-btn {
			width: 45px;
			height: 45px;
			font-size: 20px;
		}
	}

	@media (max-width: 768px) {
		.content-section {
			padding: 40px 20px 20px 20px;
			padding-top: 90px;
		}

		.carousel-wrapper {
			padding: 20px 50px;
		}

		.cards-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 20px;
		}

		/* Ocultar la tercera tarjeta en tablet */
		.content-card:nth-child(3) {
			display: none;
		}

		.carousel-btn {
			width: 40px;
			height: 40px;
			font-size: 18px;
		}

		.carousel-btn.prev {
			left: 5px;
		}

		.carousel-btn.next {
			right: 5px;
		}

		.mission-wrapper {
			padding: 40px 20px;
			margin: 40px -20px -20px -20px;
		}

		.mission-card {
			padding: 40px 30px;
		}

		.quote-watermark {
			font-size: 120px;
			top: -10px;
			left: 10px;
		}

		.mission-text {
			font-size: 18px;
		}

		.title-section {
			padding: 5px 20px;
			margin: -20px -20px 40px -20px;
			gap: 15px;
		}

		.content-icon {
			width: 55px;
			height: 55px;
		}

		.content-title {
			font-size: 32px;
			letter-spacing: 2px;
		}

		.card-content {
			padding: 20px;
		}

		.card-title {
			font-size: 18px;
		}

		.card-excerpt {
			font-size: 14px;
		}

		.carousel-indicators {
			margin-top: 20px;
		}

		.indicator {
			width: 10px;
			height: 10px;
		}
	}

	@media (max-width: 480px) {
		.content-section {
			padding-top: 80px;
			padding-bottom: 10px;
		}

		.carousel-wrapper {
			padding: 15px 45px;
		}

		.cards-grid {
			grid-template-columns: 1fr;
			gap: 20px;
		}

		/* Mostrar solo 1 tarjeta en movil */
		.content-card:nth-child(2),
		.content-card:nth-child(3) {
			display: none;
		}

		.carousel-btn {
			width: 35px;
			height: 35px;
			font-size: 16px;
		}

		.carousel-btn.prev {
			left: 5px;
		}

		.carousel-btn.next {
			right: 5px;
		}

		.title-section {
			padding: 5px 15px;
			margin: -80px -20px 10px -20px;
			gap: 10px;
		}

		.content-icon {
			width: 45px;
			height: 45px;
		}

		.content-title {
			font-size: 22px;
			letter-spacing: 1.5px;
		}

		.card-image-container {
			aspect-ratio: 16 / 10;
		}

		.card-content {
			padding: 16px;
		}

		.card-title {
			font-size: 18px;
		}

		.card-excerpt {
			font-size: 13px;
			-webkit-line-clamp: 2;
		}

		.carousel-indicators {
			margin-top: 15px;
			gap: 12px;
		}

		.indicator {
			width: 8px;
			height: 8px;
		}

		.mission-wrapper {
			padding: 30px 20px;
			margin: 30px -20px -10px -20px;
		}

		.mission-card {
			padding: 35px 25px;
		}

		.quote-watermark {
			font-size: 100px;
			top: -5px;
			left: 5px;
		}

		.mission-text {
			font-size: 16px;
		}
	}
</style>
