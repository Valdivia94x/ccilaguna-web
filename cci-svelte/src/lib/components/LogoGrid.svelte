<script lang="ts">
	interface Logo {
		src: string;
		alt: string;
	}

	let { title, logos }: { title: string; logos: Logo[] } = $props();

	function animarAlEntrar(node: HTMLElement) {
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
				threshold: 0.1,
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

<section class="socios">
	<div class="title-section" use:animarAlEntrar>
		<h2>{title}</h2>
		<div class="network-icon">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<!-- Persona central -->
				<circle cx="50" cy="30" r="8" />
				<path d="M50 38 L50 55 M35 70 L50 55 L65 70 M38 48 L50 48 L62 48" />

				<!-- Persona izquierda -->
				<circle cx="20" cy="50" r="6" />
				<path d="M20 56 L20 68" />

				<!-- Persona derecha -->
				<circle cx="80" cy="50" r="6" />
				<path d="M80 56 L80 68" />

				<!-- Líneas de conexión -->
				<path d="M26 50 L44 35" stroke-dasharray="3,2" opacity="0.6" />
				<path d="M74 50 L56 35" stroke-dasharray="3,2" opacity="0.6" />
				<path d="M26 55 L38 55" stroke-dasharray="3,2" opacity="0.6" />
				<path d="M74 55 L62 55" stroke-dasharray="3,2" opacity="0.6" />

				<!-- Nodos de conexión pequeños -->
				<circle cx="35" cy="42" r="2" fill="currentColor" opacity="0.4" />
				<circle cx="65" cy="42" r="2" fill="currentColor" opacity="0.4" />
			</svg>
		</div>
	</div>

	<p class="socios-description" use:animarAlEntrar>
		Nuestros Socios Estratégicos forman parte fundamental para maximizar el resultado de nuestro
		esfuerzo e impulsar juntos la mejora de las condiciones de vida en la Comarca Lagunera. <a
			href="/socios"
			class="more-link">Más…</a
		>
	</p>

	<div class="logo-grid" use:animarAlEntrar>
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
		background: linear-gradient(135deg, #e8f4f8 0%, #d4e9f7 50%, #c5dff0 100%);
		height: 80px;
		padding: 5px 50px 5px 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 24px;
		position: relative;
		margin: -70px -50px 65px -50px;
		transition:
			background 0.3s ease,
			opacity 0.8s ease-out,
			transform 0.8s ease-out;
		overflow: visible;
		box-shadow: 0 4px 12px rgba(74, 123, 167, 0.15);

		/* Estado inicial para animación */
		opacity: 0;
		transform: translateY(30px);
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
		transform: translateY(0);
	}

	:global([data-theme='dark']) .title-section {
		background: linear-gradient(135deg, #374151 0%, #414a5e 50%, #4b5563 100%);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	}

	:global([data-theme='dark']) .title-section::after {
		background: linear-gradient(90deg, transparent 0%, rgba(255, 161, 0, 0.4) 50%, transparent 100%);
	}

	.socios h2 {
		color: #1a365d;
		font-size: 42px;
		font-weight: 700;
		letter-spacing: 3px;
		text-transform: uppercase;
		margin: 0;
		transition: color 0.3s ease;
	}

	:global([data-theme='dark']) .socios h2 {
		color: #ffa100;
	}

	.network-icon {
		width: 70px;
		height: 70px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #4a7ba7;
		transition: color 0.3s ease, transform 0.3s ease;
	}

	.network-icon svg {
		width: 100%;
		height: 100%;
	}

	.title-section:hover .network-icon {
		transform: scale(1.05);
	}

	:global([data-theme='dark']) .network-icon {
		color: #ffa100;
	}

	.socios-description {
		max-width: 900px;
		margin: 0 auto 20px;
		font-size: 18px;
		line-height: 1.6;
		color: var(--text-primary);
		text-align: center;

		/* Estado inicial para animación */
		opacity: 0;
		transform: translateY(30px);
		transition:
			opacity 0.8s ease-out,
			transform 0.8s ease-out;
	}

	.socios-description:global(.visible) {
		opacity: 1;
		transform: translateY(0);
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

		/* Estado inicial para animación */
		opacity: 0;
		transform: translateY(50px);
		transition:
			opacity 0.8s ease-out,
			transform 0.8s ease-out;
	}

	.logo-grid:global(.visible) {
		opacity: 1;
		transform: translateY(0);
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

	:global([data-theme='dark']) .logo-item img {
		background-color: #f4f6f8;
		border-radius: 10px;
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
			letter-spacing: 2px;
		}

		.network-icon {
			width: 55px;
			height: 55px;
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
			font-size: 22px;
			letter-spacing: 1.5px;
		}

		.network-icon {
			width: 45px;
			height: 45px;
		}
	}
</style>
