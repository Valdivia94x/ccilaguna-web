<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import AboutSection from '$lib/components/AboutSection.svelte';
	import LogoGrid from '$lib/components/LogoGrid.svelte';
	import ObjectivesCarousel from '$lib/components/ObjectivesCarousel.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Footer from '$lib/components/Footer.svelte';

	// Datos del carrusel
	const carouselSlides = [
		{
			image: '/images/imagenCarrusel1.png',
			alt: 'Asamblea General de Socios Activos del Consejo Cívico de Laguna'
		},
		{
			image: '/images/imagenCarrusel2.png',
			alt: 'Ciudad de Torreón'
		}
	];

	// Datos de la sección "Quiénes somos"
	const aboutData = {
		title: '¿Quiénes somos?',
		content: `<strong>CCI Laguna</strong> es una organización de la sociedad civil,
			apartidista, sin fines de lucro e independiente, que busca
			promover y organizar la participación ciudadana para
			desarrollar buenos gobiernos y mejores ciudadanos en la
			Comarca Lagunera.`,
		image: '/images/proyectosGroup.svg'
	};

	// Datos de la red de adherentes
	const adherentesData = {
		title: 'Red de Adherentes',
		logos: [
			{ src: '/images/logos/logo1.png', alt: 'Logo Adherente 1' },
			{ src: '/images/logos/logo2.png', alt: 'Logo Adherente 2' },
			{ src: '/images/logos/logo3.png', alt: 'Logo Adherente 3' },
			{ src: '/images/logos/logo4.png', alt: 'Logo Adherente 4' },
			{ src: '/images/logos/logo5.png', alt: 'Logo Adherente 5' },
			{ src: '/images/logos/logo6.png', alt: 'Logo Adherente 6' },
			{ src: '/images/logos/logo7.png', alt: 'Logo Adherente 7' },
			{ src: '/images/logos/logo8.png', alt: 'Logo Adherente 8' },
			{ src: '/images/logos/logo9.png', alt: 'Logo Adherente 9' },
			{ src: '/images/logos/logo10.png', alt: 'Logo Adherente 10' },
			{ src: '/images/logos/logo11.png', alt: 'Logo Adherente 11' },
			{ src: '/images/logos/logo12.png', alt: 'Logo Adherente 12' }
		]
	};

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
			},
			{
				number: 5,
				title: 'Alentar y promover acciones',
				description: 'para la recomposición del tejido social'
			}
		]
	};

	// Datos de contacto
	const contactData = {
		description:
			'Cualquier duda o comentario llena nuestro formulario, llámanos o envíanos un correo correo electrónico.',
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
<AboutSection title={aboutData.title} content={aboutData.content} image={aboutData.image} />
<LogoGrid title={adherentesData.title} logos={adherentesData.logos} />
<ObjectivesCarousel mission={objectivesData.mission} objectives={objectivesData.objectives} />
<ContactSection {contactData} />
<Footer />
