<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import LogoCarousel from '$lib/components/LogoCarousel.svelte';
	import { urlFor } from '$lib/sanity';

	let { data } = $props();

	// Transformar logos de Sanity
	let logosReales = $derived(
		data.allies
			? data.allies.map((ally: any) => ({
					src: ally.logo ? urlFor(ally.logo).width(200).url() : '',
					alt: ally.name
				}))
			: []
	);
</script>

<svelte:head>
	<title>Socios | Consejo Cívico de Laguna</title>
	<meta
		name="description"
		content="Nuestros Socios Estratégicos forman parte fundamental para maximizar el resultado de nuestro esfuerzo"
	/>

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Navbar />
<ThemeToggle />

<main class="socios-page">
	<!-- Hero Section -->
	<section class="hero-section">
		<div class="hero-content">
			<h1>Socios</h1>
		</div>
	</section>

	<!-- Content Section -->
	<section class="content-section">
		<div class="content-container">
			<p class="intro-text">
				Nuestros Socios Estratégicos forman parte fundamental para maximizar el resultado de nuestro
				esfuerzo e impulsar juntos la mejora de las condiciones de vida en la Comarca Lagunera.
				Gracias al compromiso de todos por hacer de esta tierra un mejor lugar para vivir.
			</p>
		</div>
	</section>

	<!-- Carousel Section -->
	<section class="carousel-section">
		<LogoCarousel logos={logosReales} />
	</section>

	<!-- Alliance Section -->
	<section class="alliance-section-wrapper">
		<div class="content-container">
			<div class="alliance-section">
				<h2>ALIANZAS</h2>
				<p>
					Todo el trabajo realizado en los proyectos emprendidos por el Consejo Cívico de las
					Instituciones, A.C., ha sido posible gracias a la colaboración de diversos organismos de
					la sociedad civil, quienes asisten los proyectos e integran una sólida red de expertos y
					potenciado capacidades.
				</p>
			</div>
		</div>
	</section>

	<!-- Logos Section -->
	<section class="logos-section">
		<div class="logo-grid">
			{#each logosReales as logo}
				<div class="logo-item">
					<img src={logo.src} alt={logo.alt} />
				</div>
			{/each}
		</div>
	</section>
</main>

<Footer />

<style>
	.socios-page {
		min-height: calc(100vh - 200px);
	}

	/* Hero Section */
	.hero-section {
		background: linear-gradient(135deg, #e8f4f8 0%, #d4e9f7 100%);
		padding: 30px 50px;
		text-align: center;
		transition: background 0.3s ease;
	}

	:global([data-theme='dark']) .hero-section {
		background: linear-gradient(135deg, #0f1419 0%, #0f1419 100%);
	}

	.hero-content {
		max-width: 900px;
		margin: 0 auto;
	}

	h1 {
		font-size: 56px;
		font-weight: 400;
		color: var(--text-secondary);
		margin-bottom: 0;
		text-transform: uppercase;
		letter-spacing: 2px;
	}

	/* Content Section */
	.content-section {
		padding: 10px 50px;
		background: var(--bg-primary);
		transition: background 0.3s ease;
	}

	.content-container {
		max-width: 900px;
		margin: 0 auto;
	}

	.intro-text {
		font-size: 20px;
		line-height: 1.8;
		color: var(--text-primary);
		margin-bottom: 0;
		text-align: center;
	}

	/* Carousel Section */
	.carousel-section {
		padding: 10px 50px;
		background: var(--bg-primary);
		transition: background 0.3s ease;
	}

	/* Alliance Section */
	.alliance-section-wrapper {
		padding: 10px 50px;
		background: var(--bg-primary);
		transition: background 0.3s ease;
	}

	.alliance-section h2 {
		font-size: 32px;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 20px;
		text-align: center;
	}

	.alliance-section p {
		font-size: 18px;
		line-height: 1.8;
		color: var(--text-primary);
		text-align: center;
	}

	/* Logos Section */
	.logos-section {
		padding: 60px 50px 80px;
		background: var(--bg-about);
		transition: background 0.3s ease;
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

	/* Responsive */
	@media (max-width: 768px) {
		.hero-section,
		.content-section,
		.carousel-section,
		.alliance-section-wrapper,
		.logos-section {
			padding: 60px 30px;
		}

		h1 {
			font-size: 40px;
		}

		.intro-text {
			font-size: 18px;
		}

		.carousel-section {
			padding: 30px 20px;
		}

		.alliance-section-wrapper {
			padding: 20px 30px;
		}

		.alliance-section h2 {
			font-size: 26px;
		}

		.alliance-section p {
			font-size: 16px;
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
		.hero-section,
		.content-section,
		.carousel-section,
		.alliance-section-wrapper,
		.logos-section {
			padding: 40px 20px;
		}

		h1 {
			font-size: 32px;
		}

		.intro-text {
			font-size: 16px;
		}

		.carousel-section {
			padding: 20px 10px;
		}

		.alliance-section-wrapper {
			padding: 15px 20px;
		}

		.alliance-section h2 {
			font-size: 22px;
		}
	}
</style>
