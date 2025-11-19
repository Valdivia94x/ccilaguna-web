<script lang="ts">
	interface Logo {
		src: string;
		alt: string;
	}

	let { title, logos }: { title: string; logos: Logo[] } = $props();
</script>

<section class="socios">
	<h2>{title}</h2>

	<div class="logo-grid">
		{#each logos as logo}
			<div class="logo-item">
				<img src={logo.src} alt={logo.alt} />
			</div>
		{/each}
	</div>
</section>

<style>
	.socios {
		padding: 60px 50px;
		background: var(--bg-about);
		text-align: center;
		transition: background 0.3s ease;
	}

	.socios h2 {
		color: var(--text-color);
		font-size: 42px;
		font-weight: 400;
		margin-bottom: 50px;
		transition: color 0.3s ease;
	}

	.logo-grid {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 10px;
		max-width: 700px;
		margin: 0 auto;
	}

	.logo-item {
		background: var(--card-bg);
		padding: 20px;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
		box-shadow: 0 4px 10px rgba(17, 23, 39);
		aspect-ratio: 1;
	}

	.logo-item:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
	}

	.logo-item img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		filter: grayscale(0%);
		transition: filter 0.3s ease;
	}

	.logo-item:hover img {
		filter: grayscale(0%) brightness(1.1);
	}

	@media (max-width: 1024px) {
		.logo-grid {
			grid-template-columns: repeat(3, 1fr);
			gap: 10px;
		}
	}

	@media (max-width: 768px) {
		.socios {
			padding: 40px 20px;
		}

		.socios h2 {
			font-size: 32px;
		}

		.logo-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 10px;
		}
	}
</style>
