<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	interface Objective {
		number: number;
		title: string;
		description: string;
	}

	let { objectives, mission }: { objectives: Objective[]; mission: string } = $props();

	let currentIndex = $state(0);
	let isPaused = $state(false);
	let intervalId: number | undefined;

	function animarAlEntrar(node: HTMLElement) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					// Si el elemento es visible (aunque sea un poquito)
					if (entry.isIntersecting) {
						node.classList.add('visible');
						// Dejamos de observar para ahorrar recursos
						observer.unobserve(node);
					}
				});
			},
			{
				threshold: 0.2, // Se activa cuando el 20% del elemento se ve
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

	function nextSlide() {
		currentIndex = (currentIndex + 1) % objectives.length;
	}

	function prevSlide() {
		currentIndex = (currentIndex - 1 + objectives.length) % objectives.length;
	}

	function goToSlide(index: number) {
		currentIndex = index;
	}

	function startAutoplay() {
		if (intervalId) return;
		intervalId = window.setInterval(() => {
			if (!isPaused) {
				nextSlide();
			}
		}, 5000);
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
</script>

<section id="objetivos" class="objectives-section" aria-labelledby="objectives-heading">
	<!-- Misión -->
	<div class="mission-container" use:animarAlEntrar>
		<div class="quote-icon" aria-hidden="true">"</div>
		<p class="mission-text">{mission}</p>
	</div>

	<!-- Título de Objetivos con banda -->
	<div class="title-section">
		<img src="/images/stickers/objetivosSticker.png" alt="Objetivos Sticker" class="sticker" />
		<h2 id="objectives-heading" class="objectives-title">Objetivos</h2>
	</div>

	<!-- Carrusel de Objetivos -->
	<div
		class="carousel-container"
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
		role="region"
		aria-label="Carrusel de objetivos"
	>
		<button class="carousel-btn prev" onclick={prevSlide} aria-label="Objetivo anterior">
			&#10094;
		</button>

		<div class="objectives-carousel">
			{#each objectives as objective, index (objective.number)}
				<div
					class="objective-card"
					class:active={index === currentIndex}
					aria-hidden={index !== currentIndex}
				>
					{#if index < 4}
						<div class="objective-image">
							<img
								src="/images/objetivos/{['constituirse', 'generar', 'crear', 'establecer'][
									index
								]}.svg"
								alt="Objetivo {objective.number}"
							/>
						</div>
					{:else}
						<div class="objective-number">
							<span>{objective.number}</span>
						</div>
					{/if}
					<h3 class="objective-title">{objective.title}</h3>
					<p class="objective-description">{objective.description}</p>
				</div>
			{/each}
		</div>

		<button class="carousel-btn next" onclick={nextSlide} aria-label="Objetivo siguiente">
			&#10095;
		</button>
	</div>

	<!-- Indicadores -->
	<div class="carousel-indicators" role="tablist" aria-label="Navegación de objetivos">
		{#each objectives as objective, index (objective.number)}
			<button
				class="indicator"
				class:active={index === currentIndex}
				onclick={() => goToSlide(index)}
				aria-label={`Ir al objetivo ${objective.number}`}
				aria-selected={index === currentIndex}
				role="tab"
			></button>
		{/each}
	</div>
</section>

<style>
	.objectives-section {
		padding: 30px 50px 100px 50px;
		padding-top: 70px;
		background: var(--bg-objectives);
		transition: background 0.3s ease;
		overflow: visible;
	}

	/* Misión */
	.mission-container {
		/* Estado Inicial: Invisible, pequeño y desplazado abajo */
		opacity: 0;
		transform: scale(0.9) translateY(30px);

		/* Suavidad de la animación */
		transition:
			opacity 1.5s ease-out,
			transform 1.5s cubic-bezier(0.22, 1, 0.36, 1); /* Efecto rebote suave */

		/* Aseguramos que no ocupe espacio raro mientras está invisible */
		will-change: opacity, transform;
		transition-delay: 0.4s;

		max-width: 900px; /* 1. Limita el ancho para que no se estire demasiado */
		margin: 0 auto; /* 2. Centra la caja horizontalmente */
		text-align: center;
	}

	.mission-container:global(.visible) {
		/* Estado Final: Visible, tamaño normal y en su lugar */
		opacity: 1;
		transform: scale(1) translateY(0);
	}

	.quote-icon {
		font-size: 120px;
		line-height: 1;
		color: #000000;
		font-family: Georgia, serif;
		margin-bottom: -70px;
		opacity: 0.8;
	}

	:global([data-theme='dark']) .quote-icon {
		color: #ffffff;
	}

	.mission-text {
		font-size: 25px;
		font-weight: 600;
		color: var(--text-primary);
		line-height: 1.6;
		padding: 0 20px;
		margin-bottom: 220px;
	}

	.mission-text::before {
		content: 'MISIÓN: ';
		font-weight: 600;
		color: var(--text-primary);
	}

	/* Banda horizontal del título */
	.title-section {
		background: linear-gradient(135deg, #e8f4f8 0%, #d4e9f7 100%);
		height: 80px;
		padding: 5px 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 20px;
		position: relative;
		margin: -70px -50px 40px -50px;
		transition: background 0.3s ease;
		overflow: visible;
	}

	:global([data-theme='dark']) .title-section {
		background: #414a5e;
	}

	.sticker {
		height: 160px;
		width: auto;
		object-fit: contain;
		position: relative;
		top: -35px;
		margin-bottom: -60px;
	}

	/* Título Objetivos */
	.objectives-title {
		color: #000000;
		font-size: 42px;
		font-weight: 600;
		text-transform: uppercase;
		margin: 0;
		text-align: center;
		transition: color 0.3s ease;
	}

	:global([data-theme='dark']) .objectives-title {
		color: #ffa100;
	}

	/* Carrusel */
	.carousel-container {
		position: relative;
		max-width: 800px;
		margin: 0 auto;
		padding: 20px 80px;
	}

	.objectives-carousel {
		position: relative;
		width: 100%;
		min-height: 400px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.objective-card {
		position: absolute;
		width: 100%;
		opacity: 0;
		transform: scale(0.8);
		transition:
			opacity 0.5s ease,
			transform 0.5s ease;
		pointer-events: none;
		text-align: center;
		padding: 40px 40px;
		background: var(--card-bg);
		border-radius: 20px;
		box-shadow: 0 10px 30px var(--card-shadow);
	}

	.objective-card.active {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
		z-index: 1;
	}

	.objective-image {
		width: 100px;
		height: 100px;
		margin: 0 auto 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.objective-image img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	:global([data-theme='dark']) .objective-image img {
		filter: invert(1) brightness(100%);
	}

	.objective-number {
		width: 100px;
		height: 100px;
		margin: 0 auto 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #4a7ba7, #2c5f8d);
		border-radius: 50%;
		position: relative;
	}

	.objective-number::before {
		content: '';
		position: absolute;
		width: 110px;
		height: 110px;
		border: 3px solid #ffa100;
		border-radius: 50%;
		opacity: 0.3;
	}

	.objective-number span {
		font-size: 48px;
		font-weight: 400;
		color: white;
	}

	.objective-title {
		font-size: 28px;
		font-weight: 400;
		color: var(--text-primary);
		margin-bottom: 20px;
		text-transform: uppercase;
	}

	.objective-description {
		font-size: 18px;
		color: var(--text-primary);
		line-height: 1.6;
		max-width: 600px;
		margin: 0 auto;
	}

	/* Botones de navegación */
	.carousel-btn {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(74, 123, 167, 0.8);
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
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
	}

	.carousel-btn:hover {
		background: rgba(74, 123, 167, 1);
		transform: translateY(-50%) scale(1.1);
	}

	.carousel-btn.prev {
		left: 0;
	}

	.carousel-btn.next {
		right: 0;
	}

	/* Indicadores */
	.carousel-indicators {
		display: flex;
		justify-content: center;
		gap: 15px;
		margin-top: 40px;
	}

	.indicator {
		width: 15px;
		height: 15px;
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

	/* Responsive */
	@media (max-width: 768px) {
		.objectives-section {
			padding: 40px 20px 80px 20px;
			padding-top: 60px;
		}

		.mission-text {
			font-size: 16px;
		}

		.quote-icon {
			font-size: 80px;
			margin-bottom: -30px;
		}

		.title-section {
			padding: 5px 20px;
			margin: -60px -20px 40px -20px;
			gap: 15px;
		}

		.sticker {
			height: 140px;
			top: -30px;
			margin-bottom: -50px;
		}

		.objectives-title {
			font-size: 36px;
		}

		.carousel-container {
			padding: 20px 60px;
		}

		.objectives-carousel {
			min-height: 450px;
		}

		.objective-card {
			padding: 30px 20px;
		}

		.objective-image {
			width: 80px;
			height: 80px;
			margin-bottom: 20px;
		}

		.objective-number {
			width: 80px;
			height: 80px;
			margin-bottom: 20px;
		}

		.objective-number::before {
			width: 90px;
			height: 90px;
		}

		.objective-number span {
			font-size: 36px;
		}

		.objective-title {
			font-size: 22px;
			margin-bottom: 15px;
		}

		.objective-description {
			font-size: 16px;
		}

		.carousel-btn {
			width: 40px;
			height: 40px;
			font-size: 20px;
		}
	}

	@media (max-width: 480px) {
		.objectives-section {
			padding-top: 50px;
		}

		.title-section {
			padding: 5px 15px;
			margin: -50px -20px 10px -20px;
			gap: 10px;
		}

		.sticker {
			height: 110px;
			top: -40px;
			margin-bottom: -40px;
		}

		.objectives-title {
			font-size: 28px;
		}

		.carousel-container {
			padding: 5px 50px;
		}

		.objectives-carousel {
			min-height: 325px;
		}

		.objective-card {
			padding: 10px 15px;
		}

		.carousel-btn {
			width: 35px;
			height: 35px;
			font-size: 18px;
		}

		.indicator {
			width: 12px;
			height: 12px;
		}

		.mission-text {
			margin-bottom: 140px;
		}
	}
</style>
