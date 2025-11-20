<script lang="ts">
	interface Logo {
		src: string;
		alt: string;
	}

	let { title, logos }: { title: string; logos: Logo[] } = $props();
</script>

<section class="socios">
	<h2>{title}</h2>

	<p class="socios-description">
		Nuestros Socios Estratégicos forman parte fundamental para maximizar el resultado de nuestro esfuerzo e impulsar juntos la mejora de las condiciones de vida en la Comarca Lagunera. <a href="/socios" class="more-link">Más…</a>
	</p>

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
		margin-bottom: 20px;
		transition: color 0.3s ease;
	}

	.socios-description {
		max-width: 900px;
		margin: 0 auto 50px;
		font-size: 18px;
		line-height: 1.6;
		color: var(--text-primary);
		text-align: center;
	}

	.more-link {
		color: #4a7ba7;
		font-weight: 600;
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.more-link:hover {
		color: #2c5f8d;
		text-decoration: underline;
	}

	:global([data-theme='dark']) .more-link {
		color: #00d4ff;
	}

	:global([data-theme='dark']) .more-link:hover {
		color: #0099cc;
	}

	.logo-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		gap: 0;
		max-width: 100%;
		margin: 0 auto;
		padding: 0 50px;
	}

	.logo-item {
		padding: 20px;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
		box-shadow: 0 4px 10px rgba(17, 23, 39, 0.05);
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
			grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
			padding: 0 30px;
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
			grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
			padding: 0 20px;
		}

		.logo-item {
			padding: 15px;
		}
	}
</style>
