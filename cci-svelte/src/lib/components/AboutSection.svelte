<script lang="ts">
	import InteractiveProyectos from './InteractiveProyectos.svelte';

	let { title, content, image }: { title: string; content: string; image: string } = $props();
</script>

<section id="nosotros" class="about-section" aria-labelledby="about-heading">
	<div class="about-image">
		<InteractiveProyectos />
	</div>
	<div class="about-content">
		<h2 id="about-heading">{title}</h2>
		<p>{@html content}</p>
	</div>
</section>

<style>
	.about-section {
		background: var(--bg-about);
		padding: 10px 50px 90px 50px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 60px;
		align-items: center;
		transition: background 0.3s ease;
	}

	.about-image {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.about-content {
		color: var(--text-primary);
	}

	.about-content h2 {
		color: var(--text-sub);
		font-size: 42px;
		margin-bottom: 20px;
		font-weight: 500;
		text-align: center;
		max-width: 700px;
	}

	.about-content p {
		font-size: 18px;
		line-height: 1.8;
		color: var(--text-primary);
		transition: color 0.3s ease;
		text-align: center;
		max-width: 700px;
	}

	@media (max-width: 1024px) {
		.about-section {
			padding: 50px 40px 80px 40px;
			gap: 40px;
		}

		.about-content h2 {
			font-size: 36px;
		}
	}

	@media (max-width: 768px) {
		.about-section {
			padding: 40px 20px 80px 20px;
			grid-template-columns: 1fr;
			gap: 30px;
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
			padding: 30px 15px;
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
