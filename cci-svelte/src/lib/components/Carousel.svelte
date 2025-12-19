<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	interface Slide {
		imageUrl: string;
		descripcion: string;
		hotspot?: {
			x: number;
			y: number;
		} | null;
	}

	let { slides }: { slides: Slide[] } = $props();

	let currentSlide = $state(0);
	let previousSlide = $state(0);
	let carouselInterval: ReturnType<typeof setInterval> | undefined;
	let progressInterval: ReturnType<typeof setInterval> | undefined;
	let isPaused = $state(false);
	let isTransitioning = $state(false);
	let progress = $state(0);

	const SLIDE_DURATION = 5000;
	const PROGRESS_UPDATE_INTERVAL = 50;

	function showSlide(n: number) {
		if (isTransitioning) return;
		previousSlide = currentSlide;
		isTransitioning = true;
		currentSlide = (n + slides.length) % slides.length;
		progress = 0;

		setTimeout(() => {
			isTransitioning = false;
		}, 600);
	}

	function nextSlide() {
		showSlide(currentSlide + 1);
	}

	function prevSlide() {
		showSlide(currentSlide - 1);
	}

	function startProgress() {
		progress = 0;
		if (progressInterval) clearInterval(progressInterval);
		progressInterval = setInterval(() => {
			if (!isPaused) {
				progress += (PROGRESS_UPDATE_INTERVAL / SLIDE_DURATION) * 100;
				if (progress >= 100) {
					progress = 100;
				}
			}
		}, PROGRESS_UPDATE_INTERVAL);
	}

	function startAutoplay() {
		if (carouselInterval) clearInterval(carouselInterval);
		startProgress();
		carouselInterval = setInterval(() => {
			if (!isPaused) {
				nextSlide();
				startProgress();
			}
		}, SLIDE_DURATION);
	}

	function stopAutoplay() {
		if (carouselInterval) {
			clearInterval(carouselInterval);
		}
		if (progressInterval) {
			clearInterval(progressInterval);
		}
	}

	function handleMouseEnter() {
		isPaused = true;
	}

	function handleMouseLeave() {
		isPaused = false;
	}

	function handlePrev() {
		stopAutoplay();
		prevSlide();
		startAutoplay();
	}

	function handleNext() {
		stopAutoplay();
		nextSlide();
		startAutoplay();
	}

	function handleIndicatorClick(index: number) {
		stopAutoplay();
		showSlide(index);
		startAutoplay();
	}

	onMount(() => {
		startAutoplay();
	});

	onDestroy(() => {
		stopAutoplay();
	});
</script>

<section
	class="hero-carousel"
	aria-label="Carrusel de imágenes destacadas"
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
>
	<div class="carousel-container">
		{#each slides as slide, index}
			<div
				class="carousel-slide"
				class:active={index === currentSlide}
				class:previous={index === previousSlide && isTransitioning}
				role="group"
				aria-label="Slide {index + 1} de {slides.length}"
				aria-roledescription="slide"
				aria-hidden={index !== currentSlide}
			>
				<img
					src={slide.imageUrl}
					alt={slide.descripcion}
					style={slide.hotspot ? `object-position: ${slide.hotspot.x * 100}% ${slide.hotspot.y * 100}%` : ''}
				/>
			</div>
		{/each}

		<!-- Text Overlay with gradient -->
		<div class="carousel-overlay">
			<div class="overlay-content">
				<h1 class="overlay-title">
					CCI CONSEJO CÍVICO DE LAS<br />
					INSTITUCIONES LAGUNA
				</h1>
				{#if slides[currentSlide]?.descripcion}
					<p class="overlay-description">{slides[currentSlide].descripcion}</p>
				{/if}
			</div>
		</div>
	</div>

	<button class="carousel-nav prev" aria-label="Imagen anterior" onclick={handlePrev}>
		<i class="fas fa-chevron-left"></i>
	</button>
	<button class="carousel-nav next" aria-label="Siguiente imagen" onclick={handleNext}>
		<i class="fas fa-chevron-right"></i>
	</button>

	<!-- Progress bar indicators -->
	<div class="carousel-indicators" role="tablist" aria-label="Navegación del carrusel">
		{#each slides as _, index}
			<button
				class="indicator"
				class:active={index === currentSlide}
				role="tab"
				aria-label="Ir a slide {index + 1}"
				aria-selected={index === currentSlide}
				onclick={() => handleIndicatorClick(index)}
			>
				<span class="indicator-progress" style={index === currentSlide ? `width: ${progress}%` : ''}
				></span>
			</button>
		{/each}
	</div>
</section>

<style>
	.hero-carousel {
		position: fixed;
		top: 96px;
		left: 0;
		width: 100%;
		height: calc(100vh - 96px);
		overflow: hidden;
		z-index: 1;
	}

	/* Tablet */
	@media (max-width: 1023px) {
		.hero-carousel {
			top: 88px;
			height: calc(100vh - 88px);
		}
	}

	.carousel-container {
		position: relative;
		width: 100%;
		height: 100%;
	}

	/* Slide transitions - fade effect */
	.carousel-slide {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		visibility: hidden;
		transition:
			opacity 0.6s ease-in-out,
			visibility 0.6s ease-in-out;
		z-index: 1;
	}

	.carousel-slide.active {
		opacity: 1;
		visibility: visible;
		z-index: 2;
	}

	.carousel-slide.previous {
		opacity: 0;
		visibility: visible;
		z-index: 1;
	}

	.carousel-slide img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/* Text Overlay with enhanced gradient */
	.carousel-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: left;
		padding: 0 80px;
		background: linear-gradient(
			to right,
			rgba(0, 0, 0, 0.65) 0%,
			rgba(0, 0, 0, 0.45) 35%,
			rgba(0, 0, 0, 0.2) 60%,
			transparent 100%
		);
		z-index: 5;
		pointer-events: none;
	}

	.overlay-content {
		max-width: 600px;
		color: white;
		text-align: center;
		margin-left: 80px;
	}

	.overlay-title {
		font-size: 36px;
		font-weight: 700;
		line-height: 1.2;
		margin-bottom: 15px;
		text-transform: uppercase;
		letter-spacing: 1.5px;
		text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
		text-align: left;
	}

	.overlay-description {
		font-size: 18px;
		font-weight: 400;
		line-height: 1.4;
		color: rgba(255, 255, 255, 0.9);
		text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.8);
		text-align: left;
		margin: 0;
	}

	/* Navigation arrows with semi-transparent background */
	.carousel-nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		border: 1px solid rgba(255, 255, 255, 0.15);
		width: 52px;
		height: 52px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		font-size: 18px;
		z-index: 10;
		color: white;
		transition: all 0.3s ease;
	}

	.carousel-nav:hover {
		background: rgba(0, 0, 0, 0.5);
		border-color: rgba(255, 255, 255, 0.3);
		transform: translateY(-50%) scale(1.08);
	}

	.carousel-nav:active {
		transform: translateY(-50%) scale(0.95);
	}

	.carousel-nav.prev {
		left: 30px;
	}

	.carousel-nav.next {
		right: 30px;
	}

	/* Progress bar indicators */
	.carousel-indicators {
		position: absolute;
		bottom: 30px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 12px;
		z-index: 10;
	}

	.indicator {
		width: 60px;
		height: 4px;
		border-radius: 2px;
		background: rgba(255, 255, 255, 0.35);
		cursor: pointer;
		border: none;
		padding: 0;
		position: relative;
		overflow: hidden;
		transition: all 0.3s ease;
	}

	.indicator:hover {
		background: rgba(255, 255, 255, 0.5);
		transform: scaleY(1.5);
	}

	.indicator.active {
		background: rgba(255, 255, 255, 0.35);
	}

	.indicator-progress {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 0;
		background: white;
		border-radius: 2px;
		transition: width 0.05s linear;
	}

	.indicator.active .indicator-progress {
		box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
	}

	@media (max-width: 768px) {
		.hero-carousel {
			top: 80px;
			height: calc(100vh - 80px);
		}

		.carousel-overlay {
			padding: 0 40px;
			background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.35) 100%);
			justify-content: center;
			align-items: center;
		}

		.overlay-content {
			max-width: 100%;
			text-align: center;
			margin-left: 0;
		}

		.overlay-title {
			font-size: 24px;
			margin-bottom: 12px;
			letter-spacing: 1px;
			text-align: center;
		}

		.overlay-description {
			font-size: 15px;
			text-align: center;
		}

		.carousel-nav {
			width: 44px;
			height: 44px;
			font-size: 16px;
		}

		.carousel-nav.prev {
			left: 15px;
		}

		.carousel-nav.next {
			right: 15px;
		}

		.carousel-indicators {
			bottom: 25px;
			gap: 10px;
		}

		.indicator {
			width: 50px;
			height: 3px;
		}
	}

	@media (max-width: 480px) {
		.hero-carousel {
			top: 68px;
			height: calc(100vh - 68px);
		}
	}

	@media (max-width: 360px) {
		.hero-carousel {
			top: 60px;
			height: calc(100vh - 60px);
		}

		.carousel-overlay {
			padding: 0 25px;
		}

		.overlay-title {
			font-size: 18px;
			margin-bottom: 10px;
		}

		.overlay-description {
			font-size: 13px;
		}

		.carousel-nav {
			width: 38px;
			height: 38px;
			font-size: 14px;
		}

		.carousel-nav.prev {
			left: 10px;
		}

		.carousel-nav.next {
			right: 10px;
		}

		.carousel-indicators {
			bottom: 20px;
			gap: 8px;
		}

		.indicator {
			width: 40px;
			height: 3px;
		}
	}
</style>
