<script lang="ts">
	import { onMount } from 'svelte';

	interface Logo {
		src: string;
		alt: string;
	}

	let { logos }: { logos: Logo[] } = $props();

	let currentIndex = $state(0);
	let intervalId: number;

	// Avanzar al siguiente conjunto de logos
	function nextSlide() {
		if (logos.length > 5) {
			currentIndex = (currentIndex + 1) % (logos.length - 4);
		}
	}

	// Retroceder al conjunto anterior de logos
	function prevSlide() {
		if (logos.length > 5) {
			currentIndex = currentIndex === 0 ? logos.length - 5 : currentIndex - 1;
		}
	}

	// Auto-avanzar cada 4 segundos
	onMount(() => {
		if (logos.length > 5) {
			intervalId = setInterval(nextSlide, 4000);
		}

		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	});

	// Obtener los 5 logos visibles actualmente
	let visibleLogos = $derived(() => {
		if (logos.length <= 5) {
			return logos;
		}
		return logos.slice(currentIndex, currentIndex + 5);
	});
</script>

<div class="carousel-container">
	<div class="carousel-wrapper">
		<!-- Botón anterior -->
		{#if logos.length > 5}
			<button class="carousel-btn prev-btn" onclick={prevSlide} aria-label="Anterior">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
					<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
				</svg>
			</button>
		{/if}

		<!-- Logos visibles -->
		<div class="carousel-content">
			{#each visibleLogos() as logo, index (logo.src + index)}
				<div class="carousel-logo-item">
					<img src={logo.src} alt={logo.alt} />
				</div>
			{/each}
		</div>

		<!-- Botón siguiente -->
		{#if logos.length > 5}
			<button class="carousel-btn next-btn" onclick={nextSlide} aria-label="Siguiente">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
					<path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
				</svg>
			</button>
		{/if}
	</div>

	<!-- Indicadores (puntos) -->
	{#if logos.length > 5}
		<div class="carousel-indicators">
			{#each Array(logos.length - 4) as _, index}
				<button
					class="indicator"
					class:active={currentIndex === index}
					onclick={() => (currentIndex = index)}
					aria-label={`Ir al slide ${index + 1}`}
				></button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.carousel-container {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 10px 20px;
	}

	.carousel-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		gap: 20px;
	}

	.carousel-content {
		display: flex;
		gap: 20px;
		flex: 1;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}

	.carousel-logo-item {
		flex: 0 0 calc(20% - 16px);
		aspect-ratio: 1;
		background: var(--card-bg);
		padding: 5px;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 10px rgba(17, 23, 39, 0.05);
		transition: all 0.3s ease;
	}

	.carousel-logo-item:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
	}

	.carousel-logo-item img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		filter: grayscale(0%);
		transition: filter 0.3s ease;
	}

	.carousel-logo-item:hover img {
		filter: grayscale(0%) brightness(1.1);
	}

	.carousel-btn {
		background: var(--card-bg);
		border: 2px solid var(--navbar-border);
		border-radius: 50%;
		width: 50px;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.3s ease;
		flex-shrink: 0;
		color: var(--text-primary);
	}

	.carousel-btn:hover {
		background: #4a7ba7;
		border-color: #4a7ba7;
		color: white;
		transform: scale(1.1);
	}

	:global([data-theme='dark']) .carousel-btn:hover {
		background: #00d4ff;
		border-color: #00d4ff;
	}

	.carousel-btn svg {
		width: 24px;
		height: 24px;
	}

	.carousel-indicators {
		display: flex;
		justify-content: center;
		gap: 10px;
		margin-top: 30px;
	}

	.indicator {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: var(--navbar-border);
		border: none;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.indicator:hover {
		transform: scale(1.2);
	}

	.indicator.active {
		background: #4a7ba7;
		transform: scale(1.3);
	}

	:global([data-theme='dark']) .indicator.active {
		background: #00d4ff;
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.carousel-content {
			gap: 15px;
		}

		.carousel-logo-item {
			flex: 0 0 calc(20% - 12px);
			padding: 15px;
		}

		.carousel-btn {
			width: 45px;
			height: 45px;
		}
	}

	@media (max-width: 768px) {
		.carousel-content {
			gap: 10px;
		}

		.carousel-logo-item {
			flex: 0 0 calc(33.333% - 10px);
			padding: 12px;
		}

		.carousel-btn {
			width: 40px;
			height: 40px;
		}

		.carousel-btn svg {
			width: 20px;
			height: 20px;
		}
	}

	@media (max-width: 480px) {
		.carousel-content {
			gap: 8px;
		}

		.carousel-logo-item {
			flex: 0 0 calc(50% - 8px);
			padding: 10px;
		}

		.carousel-btn {
			width: 35px;
			height: 35px;
		}
	}
</style>
