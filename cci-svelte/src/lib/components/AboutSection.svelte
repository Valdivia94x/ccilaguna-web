<script lang="ts">
	import InteractiveProyectos from './InteractiveProyectos.svelte';

	let { title, content, image }: { title: string; content: string; image: string } = $props();

	function animarAlEntrar(node: HTMLElement, options?: { delay?: number }) {
		const delay = options?.delay ?? 0;
		node.style.transitionDelay = `${delay}ms`;

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
				threshold: 0.2,
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

<section id="nosotros" class="about-section" aria-labelledby="about-heading">
	<div class="about-image" use:animarAlEntrar={{ delay: 0 }}>
		<InteractiveProyectos />
	</div>
	<div class="about-content" use:animarAlEntrar={{ delay: 200 }}>
		<h2 id="about-heading">{title}</h2>
		<p>{@html content}</p>
	</div>
</section>

<style>
	.about-section {
		background: var(--bg-about);
		padding: 0 50px 80px 50px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
		align-items: center;
		transition: background 0.3s ease;
	}

	.about-image {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;

		/* Estado inicial para animación - entrada desde la izquierda */
		opacity: 0;
		transform: translateX(-80px) scale(0.95);
		transition:
			opacity 1s ease-out,
			transform 1s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.about-image:global(.visible) {
		opacity: 1;
		transform: translateX(0) scale(1);
	}

	.about-content {
		color: var(--text-primary);

		/* Estado inicial para animación - entrada desde la derecha */
		opacity: 0;
		transform: translateX(80px);
		transition:
			opacity 1s ease-out,
			transform 1s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.about-content:global(.visible) {
		opacity: 1;
		transform: translateX(0);
	}

	.about-content h2 {
		color: var(--text-sub);
		font-size: 40px;
		margin-bottom: 20px;
		font-weight: 500;
		text-align: center;
		max-width: 700px;
	}

	.about-content p {
		font-size: 25px;
		line-height: 1.8;
		color: var(--text-primary);
		transition: color 0.3s ease;
		text-align: center;
		max-width: 700px;
	}

	@media (max-width: 1024px) {
		.about-section {
			padding: 0 40px 70px 40px;
			gap: 20px;
		}

		.about-content h2 {
			font-size: 36px;
		}
	}

	@media (max-width: 768px) {
		.about-section {
			padding: 20px 20px 60px 20px;
			grid-template-columns: 1fr;
			gap: 20px;
		}

		.about-content h2 {
			font-size: 32px;
		}

		.about-content p {
			font-size: 16px;
		}
	}

	@media (max-width: 480px) {
		.about-section {
			padding: 10px 15px 50px 15px;
		}

		.about-content h2 {
			font-size: 28px;
			padding-right: 0px;
		}

		.about-content p {
			padding-right: 0px;
		}
	}
</style>
