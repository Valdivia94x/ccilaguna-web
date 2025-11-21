<script lang="ts">
	interface Logo {
		src: string;
		alt: string;
	}

	let { title, logos }: { title: string; logos: Logo[] } = $props();
</script>

<section class="socios">
	<div class="title-section">
		<h2>{title}</h2>
		<img src="/images/stickers/adherentesSticker.png" alt="Adherentes Sticker" class="sticker" />
	</div>

	<p class="socios-description">
		Nuestros Socios Estratégicos forman parte fundamental para maximizar el resultado de nuestro
		esfuerzo e impulsar juntos la mejora de las condiciones de vida en la Comarca Lagunera. <a
			href="/socios"
			class="more-link">Más…</a
		>
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
		padding: 40px 50px;
		padding-top: 70px;
		background: var(--bg-about);
		text-align: center;
		transition: background 0.3s ease;
		overflow: visible;
	}

	.title-section {
		background: #caddff;
		height: 80px;
		padding: 5px 50px 5px 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 20px;
		position: relative;
		margin: -70px -50px 65px -50px;
		transition: background 0.3s ease;
		overflow: visible;
	}

	:global([data-theme='dark']) .title-section {
		background: #414a5e;
	}

	.socios h2 {
		color: #000000;
		font-size: 42px;
		font-weight: 600;
		margin: 0;
		transition: color 0.3s ease;
	}

	:global([data-theme='dark']) .socios h2 {
		color: #ffa100;
	}

	.sticker {
		height: 180px;
		width: auto;
		object-fit: contain;
		position: relative;
		top: -35px;
		margin-bottom: -60px;
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
			padding-top: 60px;
		}

		.title-section {
			padding: 30px 20px;
			margin: -60px -20px 40px -20px;
			gap: 15px;
		}

		.socios h2 {
			font-size: 32px;
		}

		.sticker {
			height: 140px;
			top: -30px;
			margin-bottom: -50px;
		}

		.logo-grid {
			grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
			padding: 0 20px;
		}

		.logo-item {
			padding: 15px;
		}
	}

	@media (max-width: 480px) {
		.socios {
			padding-top: 50px;
		}

		.title-section {
			padding: 20px 15px;
			margin: -50px -20px 30px -20px;
			gap: 10px;
		}

		.socios h2 {
			font-size: 24px;
		}

		.sticker {
			height: 110px;
			top: -40px;
			margin-bottom: -40px;
		}
	}
</style>
