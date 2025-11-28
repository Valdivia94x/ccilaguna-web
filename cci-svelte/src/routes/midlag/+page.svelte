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

<div class="hero">
	<div class="hero-overlay"></div>
	<div class="hero-content">
		<h1>MIDLag</h1>
		<p class="subtitle">Monitoreo de Incidencia Delictiva en La Laguna</p>
	</div>
</div>

<div class="spacer"></div>

<section class="page-content">
	<div class="container">
		<div class="content-section">
			<div class="content-wrapper">
				<div class="text-content">
					<h2>¿Qué es MIDLag?</h2>
					<p>
						Es un producto que tiene como finalidad medir de manera sistemática y rigurosa la
						manifestación delictiva en la Zona Metropolitana de La Laguna (ZML) a fin de informar
						objetivamente a la ciudadanía sobre la situación en materia de seguridad, buscando
						incidir en mejores políticas públicas.
					</p>
				</div>
				<div class="image-section">
					<img src="/images/midlag.png" alt="MIDLag - Municipio Inteligente Digital Laguna" />
				</div>
			</div>
		</div>

		<div class="partners-row">
			<img src="/images/midlag/observatorio.png" alt="Observatorio" />
			<img src="/images/midlag/mexico_Evalua.png" alt="México Evalúa" />
			<img src="/images/midlag/red_Observatorios.png" alt="Red de Observatorios" />
		</div>

		<div class="text-content">
			<p>
				El CCI Laguna forma parte de la Red Nacional de Observatorios, Seguridad, Justicia y
				Legalidad, es considerado el primer Observatorio certificado del país, cumpliendo bajo los
				criterios del proceso de certificación desarrollado por México Evalúa y el Observatorio
				Nacional Ciudadano”
			</p>
		</div>
	</div>
</section>

<Footer />

<style>
	.page-content {
		background: var(--bg-about);
		min-height: calc(100vh - 200px);
		padding: 50px 20px 60px;
		transition: background 0.3s ease;
		position: relative;
		z-index: 10;
	}

	.spacer {
		height: 300px;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.hero {
		position: fixed;
		text-align: center;
		background-image: url('/images/midlagBanner.png');
		background-size: cover;
		background-position: center;
		overflow: hidden;
		min-height: 300px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hero-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
	}

	.hero-content {
		position: relative;
		z-index: 1;
		padding: 40px;
	}

	.hero h1 {
		color: #ffffff;
		font-size: 48px;
		font-weight: 600;
		margin-bottom: 16px;
	}

	.subtitle {
		color: #ffffff;
		font-size: 24px;
		opacity: 0.9;
	}

	.content-section {
		background: var(--card-bg);
		padding: 40px;
		border-radius: 16px;
		box-shadow: 0 4px 12px var(--card-shadow);
	}

	.content-wrapper {
		display: grid;
		grid-template-columns: 2fr 1fr;
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

	.partners-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 20px;
		margin-top: 30px;
		margin-bottom: 30px;
		padding: 10px 100px;
	}

	.partners-row img {
		flex: 1;
		max-width: 10%;
		height: auto;
		object-fit: contain;
	}

	:global([data-theme='dark']) .partners-row img {
		border-radius: 12px;
		background-color: #f4f6f8;
		padding: 15px;
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

		.partners-row {
			flex-direction: column;
			gap: 30px;
			padding: 10px 20px;
		}

		.partners-row img {
			flex: none;
			max-width: 200px;
			width: auto;
			height: auto;
		}
	}
</style>
