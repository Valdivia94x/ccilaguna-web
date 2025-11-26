<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>MIDLag | Consejo Cívico de Laguna</title>
	<meta name="description" content="MIDLag - Municipio Inteligente Digital Laguna" />
</svelte:head>

<Navbar />
<ThemeToggle />

<section class="page-content">
	<div class="container">
		<div class="hero">
			<h1>MIDLag</h1>
			<p class="subtitle">Municipio Inteligente Digital Laguna</p>
		</div>

		<div class="content-section">
			<div class="content-wrapper">
				<div class="text-content">
					<h2>¿Qué es MIDLag?</h2>
					<p>
						Es un producto que tiene como finalidad medir de manera sistemática y rigurosa la
						manifestación delictiva en la Zona Metropolitana de La Laguna (ZML) a fin de informar
						objetivamente a la ciudadanía sobre la situación en materia de seguridad, buscando incidir
						en mejores políticas públicas.
					</p>
				</div>
				<div class="image-section">
					<img src="/images/midlag.png" alt="MIDLag - Municipio Inteligente Digital Laguna" />
				</div>
			</div>
		</div>
	</div>
</section>

<Footer />

<style>
	.page-content {
		background: var(--bg-about);
		min-height: calc(100vh - 200px);
		padding: 80px 20px 60px;
		transition: background 0.3s ease;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.hero {
		text-align: center;
		margin-bottom: 60px;
	}

	.hero h1 {
		color: var(--text-primary);
		font-size: 48px;
		font-weight: 600;
		margin-bottom: 16px;
	}

	.subtitle {
		color: var(--text-primary);
		font-size: 24px;
		opacity: 0.8;
	}

	.content-section {
		background: var(--card-bg);
		padding: 40px;
		border-radius: 16px;
		box-shadow: 0 4px 12px var(--card-shadow);
	}

	.content-wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 40px;
		align-items: center;
	}

	.text-content h2 {
		color: var(--text-primary);
		font-size: 28px;
		margin-bottom: 20px;
	}

	.text-content p {
		color: var(--text-primary);
		font-size: 18px;
		line-height: 1.8;
	}

	.image-section {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.image-section img {
		max-width: 100%;
		height: auto;
		border-radius: 12px;
	}

	@media (max-width: 768px) {
		.hero h1 {
			font-size: 36px;
		}

		.subtitle {
			font-size: 20px;
		}

		.content-section {
			padding: 30px 20px;
		}

		.content-wrapper {
			grid-template-columns: 1fr;
			gap: 30px;
		}

		.text-content {
			order: 1;
		}

		.image-section {
			order: 2;
		}
	}
</style>
