<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	interface Slide {
		image: string;
		alt: string;
	}

	let { slides }: { slides: Slide[] } = $props();

	let currentSlide = $state(0);
	let carouselInterval: ReturnType<typeof setInterval> | undefined;
	let isPaused = $state(false);

	function showSlide(n: number) {
		currentSlide = (n + slides.length) % slides.length;
	}

	function nextSlide() {
		showSlide(currentSlide + 1);
	}

	function prevSlide() {
		showSlide(currentSlide - 1);
	}

	function startAutoplay() {
		if (carouselInterval) clearInterval(carouselInterval);
		carouselInterval = setInterval(() => {
			if (!isPaused) {
				nextSlide();
			}
		}, 5000);
	}

	function stopAutoplay() {
		if (carouselInterval) {
			clearInterval(carouselInterval);
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

	function handleDotClick(index: number) {
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
				role="group"
				aria-label="Slide {index + 1} de {slides.length}"
				aria-roledescription="slide"
				aria-hidden={index !== currentSlide}
			>
				<img
					src={slide.image}
					alt={slide.alt}
					class="absolute inset-0 h-full w-full object-cover"
				/>
			</div>
		{/each}

		<!-- Text Overlay -->
		<div class="carousel-overlay">
			<div class="overlay-content">
				<h1 class="overlay-title">
					CCI CONSEJO CÍVICO DE LAS<br />
					INSTITUCIONES LAGUNA
				</h1>
			</div>
		</div>
	</div>

	<button class="carousel-nav prev" aria-label="Imagen anterior" onclick={handlePrev}>
		<i class="fas fa-chevron-left"></i>
	</button>
	<button class="carousel-nav next" aria-label="Siguiente imagen" onclick={handleNext}>
		<i class="fas fa-chevron-right"></i>
	</button>

	<div class="carousel-dots" role="tablist" aria-label="Navegación del carrusel">
		{#each slides as _, index}
			<button
				class="dot"
				class:active={index === currentSlide}
				role="tab"
				aria-label="Ir a slide {index + 1}"
				aria-selected={index === currentSlide}
				onclick={() => handleDotClick(index)}
			></button>
		{/each}
	</div>
</section>

<style>
	.hero-carousel {
		position: relative;
		width: 100%;
		height: 500px;
		overflow: hidden;
	}

	.carousel-container {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.carousel-slide {
		width: 100%;
		height: 100%;
		display: none;
	}

	.carousel-slide.active {
		display: block;
	}

	.carousel-slide img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/* Text Overlay */
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
			rgba(0, 0, 0, 0.5) 0%,
			rgba(0, 0, 0, 0.3) 50%,
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
		margin-bottom: 25px;
		text-transform: uppercase;
		letter-spacing: 1.5px;
		text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
		text-align: left;
	}

	.carousel-nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(255, 255, 255, 0.9);
		border: none;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		font-size: 20px;
		z-index: 10;
		color: #333;
		transition: all 0.3s ease;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
	}

	.carousel-nav:hover {
		background: white;
		transform: translateY(-50%) scale(1.1);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
	}

	.carousel-nav.prev {
		left: 30px;
	}

	.carousel-nav.next {
		right: 30px;
	}

	.carousel-dots {
		position: absolute;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 10px;
	}

	.dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.5);
		cursor: pointer;
		border: 2px solid transparent;
		transition: all 0.3s ease;
		padding: 0;
	}

	.dot:hover {
		background: rgba(255, 255, 255, 0.7);
		transform: scale(1.2);
	}

	.dot.active {
		background: white;
		border-color: rgba(255, 255, 255, 0.8);
		transform: scale(1.3);
	}

	@media (max-width: 768px) {
		.hero-carousel {
			height: 400px;
		}

		.carousel-overlay {
			padding: 0 40px;
			background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 100%);
			justify-content: center;
			align-items: flex-start;
			padding-top: 60px;
		}

		.overlay-content {
			max-width: 100%;
			text-align: center;
			margin-left: 0;
		}

		.overlay-title {
			font-size: 24px;
			margin-bottom: 20px;
			letter-spacing: 1px;
			text-align: center;
		}

		.carousel-nav {
			width: 40px;
			height: 40px;
			font-size: 16px;
		}

		.carousel-nav.prev {
			left: 15px;
		}

		.carousel-nav.next {
			right: 15px;
		}
	}

	@media (max-width: 480px) {
		.hero-carousel {
			height: 350px;
		}

		.carousel-overlay {
			padding: 0 25px;
			padding-top: 50px;
		}

		.overlay-title {
			font-size: 20px;
			margin-bottom: 15px;
		}

		.carousel-nav {
			width: 35px;
			height: 35px;
			font-size: 14px;
		}

		.carousel-nav.prev {
			left: 10px;
		}

		.carousel-nav.next {
			right: 10px;
		}
	}
</style>
