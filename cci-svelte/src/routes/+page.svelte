<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import AboutSection from '$lib/components/AboutSection.svelte';
	import LogoGrid from '$lib/components/LogoGrid.svelte';
	import ObjectivesCarousel from '$lib/components/ObjectivesCarousel.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { urlFor } from '$lib/sanity';

	let aboutSectionRef: HTMLDivElement;
	let aboutVisible = $state(false);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						aboutVisible = true;
					} else {
						aboutVisible = false;
					}
				});
			},
			{ threshold: 0.15 }
		);

		if (aboutSectionRef) {
			observer.observe(aboutSectionRef);
		}

		return () => observer.disconnect();
	});

	let { data } = $props();

	// Datos del carrusel desde Sanity
	let carouselSlides = $derived(data.carouselSlides || []);

	// Datos de la sección "Quiénes somos"
	const aboutData = {
		title: '¿Quiénes somos?',
		content: `<strong>CCI Laguna</strong> es una organización de la sociedad civil,
			apartidista, sin fines de lucro e independiente, que busca
			promover y organizar la participación ciudadana para
			desarrollar buenos gobiernos y mejores ciudadanos en la
			Comarca Lagunera.`,
		image: '/images/proyectos.png'
	};

	// --- TRANSFORMAR LOGOS DE SANITY ---
	// Convertimos los datos de Sanity al formato que tu componente LogoGrid espera ({src, alt})
	let logosReales = $derived(
		data.allies
			? data.allies.map((ally: any) => ({
					// Generamos la URL del logo. Forzamos un ancho para optimizar.
					src: ally.logo ? urlFor(ally.logo).width(200).url() : '',
					alt: ally.name
					// Si tu componente LogoGrid soporta links, podrías pasarle ally.url también
				}))
			: []
	);

	// Datos de la red de adherentes
	const adherentesData = $derived({
		title: 'RED DE ADHERENTES',
		logos: logosReales
	});

	// Datos de objetivos
	const objectivesData = {
		mission:
			'Promover y organizar la participación para desarrollar buenos gobiernos y mejores ciudadanos en la Comarca Lagunera.',
		objectives: [
			{
				number: 1,
				title: 'Constituirse como referente',
				description:
					'en materia de seguridad, ejercicio ciudadano, transparencia y rendición de cuentas.'
			},
			{
				number: 2,
				title: 'Generar una relación cercana',
				description: 'Consejo Cívico de las instituciones Laguna. - Comunidad Lagunera'
			},
			{
				number: 3,
				title: 'Crear mecanismo de transparencia y rendición',
				description: 'de cuentas para el combate a la corrupción y a la impunidad.'
			},
			{
				number: 4,
				title: 'Establecer procesos de comunicación',
				description:
					'y colaboración que faciliten la participación ciudadana en las políticas y asuntos públicos.'
			}
		]
	};

	// Datos de contacto
	const contactData = {
		description: 'Cualquier duda o comentario llámanos o envíanos un correo correo electrónico.',
		address: {
			street: 'C. Río Amazonas #740',
			colony: 'Colonia Estrella, 27010',
			city: 'Torreón, Coah.'
		},
		phone: '718-98-25',
		email: 'contacto@ccilaguna.org.mx',
		socialMedia: {
			facebook: '#',
			twitter: '#',
			youtube: '#'
		}
	};
</script>

<svelte:head>
	<title>Consejo Cívico de Laguna | Consejo Cívico de las Instituciones Laguna</title>
	<meta
		name="description"
		content="Consejo Cívico de Laguna - Organización de la sociedad civil que promueve la participación ciudadana en la Comarca Lagunera"
	/>
	<meta
		name="keywords"
		content="consejo cívico, laguna, participación ciudadana, organización civil"
	/>

	<!-- Preconnect for performance -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />

	<!-- Google Fonts -->
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap"
		rel="stylesheet"
	/>

	<!-- Font Awesome for icons -->
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
		integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	/>
</svelte:head>

<Navbar />
<ThemeToggle />
<Carousel slides={carouselSlides} />
<div class="carousel-spacer"></div>
<div class="content-wrapper">
	<div bind:this={aboutSectionRef} class="fade-up" class:visible={aboutVisible}>
		<AboutSection title={aboutData.title} content={aboutData.content} image={aboutData.image} />
	</div>
	<LogoGrid title={adherentesData.title} logos={adherentesData.logos} />
	<ObjectivesCarousel mission={objectivesData.mission} objectives={objectivesData.objectives} />
	<ContactSection {contactData} />
	<Footer />
</div>

<style>
	.carousel-spacer {
		height: calc(100vh - 96px);
	}

	@media (max-width: 1023px) {
		.carousel-spacer {
			height: calc(100vh - 88px);
		}
	}

	.content-wrapper {
		position: relative;
		z-index: 10;
		background: var(--bg-primary);
	}

	.fade-up {
		opacity: 0;
		transform: translateY(40px);
		transition:
			opacity 0.8s ease-out,
			transform 0.8s ease-out;
	}

	.fade-up.visible {
		opacity: 1;
		transform: translateY(0);
	}

	@media (max-width: 768px) {
		.carousel-spacer {
			height: calc(100vh - 80px);
		}
	}

	@media (max-width: 480px) {
		.carousel-spacer {
			height: calc(100vh - 68px);
		}
	}

	@media (max-width: 360px) {
		.carousel-spacer {
			height: calc(100vh - 60px);
		}
	}
</style>
