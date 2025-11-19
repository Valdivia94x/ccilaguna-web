<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Nosotros | Consejo Cívico de Laguna</title>
	<meta
		name="description"
		content="Conoce más sobre el CCI Laguna, nuestros objetivos y visión para la Comarca Lagunera"
	/>
	<meta name="keywords" content="consejo cívico, laguna, nosotros, objetivos, visión" />

	<!-- Preconnect for performance -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />

	<!-- Google Fonts -->
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Navbar />
<ThemeToggle />

<main class="nosotros-page">
	<!-- Sección Hero -->
	<section class="hero-section">
		<h1>Nosotros</h1>
		<div class="hero-content">
			<div class="hero-text">
				<p class="hero-description">
					El CCI Laguna es una organización de la sociedad civil, apartidista, sin fines de lucro e
					independiente, que busca promover y organizar la participación ciudadana para desarrollar
					buenos gobiernos y mejores ciudadanos en la Comarca Lagunera.
				</p>
			</div>
			<div class="hero-image">
				<img src="/images/logoNosotros.png" alt="Logo CCI Laguna" />
			</div>
		</div>
	</section>

	<!-- Sección Línea del Tiempo -->
	<section class="timeline-section">
		<h2>Línea del Tiempo</h2>
		<div class="timeline-container">
			<img
				src="/images/linea_del_tiempo.png"
				alt="Línea del tiempo del Consejo Cívico de Laguna"
				class="timeline-image"
			/>
		</div>
	</section>

	<!-- Sección Objetivos -->
	<section class="objectives-section">
		<h2>Nuestros Objetivos</h2>
		<div class="objectives-content">
			<p>
				A través de la generación y análisis de indicadores técnicos y de percepción ciudadana,
				buscamos generar evidencia y dialogar con los tomadores de decisión para atender y mejorar
				las áreas de oportunidad, además de aportar información de utilidad para el monitoreo y
				seguimiento permanente a las políticas públicas estatales y municipales.
			</p>
			<p>
				Buscamos incidir en políticas públicas eficientes y contribuir a transformar, desde la
				sociedad civil organizada, el bienestar y la calidad de vida de nuestra comunidad.
			</p>
		</div>
	</section>

	<!-- Sección Visión -->
	<section class="vision-section">
		<h2>Nuestra Visión</h2>
		<div class="vision-content">
			<p>
				Consolidarnos como el referente ciudadano que representa a los diferentes sectores de la
				sociedad, que articula esfuerzos orientados a generar conocimiento y métricas de evaluación
				que logren mejorar el diseño de políticas públicas en la región.
			</p>
		</div>
	</section>

	<!-- Sección Equipo de Trabajo -->
	<section class="team-section">
		<h2>Equipo de Trabajo</h2>
		<div class="team-grid">
			<div class="team-member">
				<div class="member-photo">
					<img src="/images/team/placeholder.png" alt="Marco Antonio Zamarripa González" />
				</div>
				<h3 class="member-name">Marco Antonio Zamarripa González</h3>
				<p class="member-role">Director General</p>
			</div>

			<div class="team-member">
				<div class="member-photo">
					<img src="/images/team/placeholder.png" alt="Luis Alfredo Medina López" />
				</div>
				<h3 class="member-name">Luis Alfredo Medina López</h3>
				<p class="member-role">Coordinador de Investigación</p>
			</div>

			<div class="team-member">
				<div class="member-photo">
					<img src="/images/team/placeholder.png" alt="David Ruelas Sarmiento" />
				</div>
				<h3 class="member-name">David Ruelas Sarmiento</h3>
				<p class="member-role">Investigador</p>
			</div>

			<div class="team-member">
				<div class="member-photo">
					<img src="/images/team/placeholder1.png" alt="Dely Ramírez Sánchez" />
				</div>
				<h3 class="member-name">Dely Ramírez Sánchez</h3>
				<p class="member-role">Vinculación</p>
			</div>

			<div class="team-member">
				<div class="member-photo">
					<img src="/images/team/placeholder.png" alt="Wolfang Arturo García Méndez" />
				</div>
				<h3 class="member-name">Wolfang Arturo García Méndez</h3>
				<p class="member-role">Sistemas</p>
			</div>

			<div class="team-member">
				<div class="member-photo">
					<img src="/images/team/placeholder1.png" alt="Gabriela Zamora Álvarez" />
				</div>
				<h3 class="member-name">Gabriela Zamora Álvarez</h3>
				<p class="member-role">Diseñadora Gráfica</p>
			</div>

			<div class="team-member">
				<div class="member-photo">
					<img src="/images/team/placeholder.png" alt="Enrique Lara García" />
				</div>
				<h3 class="member-name">Enrique Lara García</h3>
				<p class="member-role">Investigador</p>
			</div>

			<div class="team-member">
				<div class="member-photo">
					<img src="/images/team/placeholder1.png" alt="Nayeli García González" />
				</div>
				<h3 class="member-name">Nayeli García González</h3>
				<p class="member-role">Community Manager</p>
			</div>
		</div>
	</section>
</main>

<Footer />

<style>
	.nosotros-page {
		min-height: calc(100vh - 200px);
	}

	/* Hero Section */
	.hero-section {
		background: linear-gradient(135deg, #e8f4f8 0%, #d4e9f7 100%);
		padding: 80px 50px;
		transition: background 0.3s ease;
	}

	:global([data-theme='dark']) .hero-section {
		background: linear-gradient(135deg, #0F1419 0%, #0F1419 100%);
	}

	.hero-section h1 {
		font-size: 56px;
		font-weight: 400;
		color: var(--text-primary);
		margin-bottom: 40px;
		text-transform: uppercase;
		letter-spacing: 2px;
		text-align: center;
	}

	.hero-content {
		max-width: 1200px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 3fr 1fr;
		gap: 40px;
		align-items: center;
	}

	.hero-text {
		text-align: left;
	}

	.hero-description {
		font-size: 20px;
		line-height: 1.8;
		color: var(--text-primary);
		font-weight: 400;
		margin: 0;
	}

	.hero-image {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.hero-image img {
		width: 100%;
		max-width: 200px;
		height: auto;
		object-fit: contain;
	}

	/* Timeline Section */
	.timeline-section {
		padding: 80px 50px;
		background: var(--bg-primary);
		transition: background 0.3s ease;
	}

	.timeline-section h2 {
		font-size: 42px;
		font-weight: 400;
		color: var(--text-primary);
		text-align: center;
		margin-bottom: 50px;
		text-transform: uppercase;
		letter-spacing: 1.5px;
	}

	.timeline-container {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px;
		background: var(--card-bg);
		border-radius: 15px;
		box-shadow: 0 10px 30px var(--card-shadow);
		transition: all 0.3s ease;
	}

	.timeline-image {
		width: 100%;
		height: auto;
		display: block;
		border-radius: 10px;
	}

	/* Objectives Section */
	.objectives-section {
		padding: 80px 50px;
		background: var(--bg-primary);
		transition: background 0.3s ease;
	}

	.objectives-section h2 {
		font-size: 42px;
		font-weight: 400;
		color: var(--text-primary);
		text-align: center;
		margin-bottom: 40px;
		text-transform: uppercase;
		letter-spacing: 1.5px;
	}

	.objectives-content {
		max-width: 900px;
		margin: 0 auto;
	}

	.objectives-content p {
		font-size: 18px;
		line-height: 1.8;
		color: var(--text-primary);
		margin-bottom: 25px;
		text-align: justify;
	}

	/* Vision Section */
	.vision-section {
		padding: 80px 50px;
		background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
		transition: background 0.3s ease;
	}

	:global([data-theme='dark']) .vision-section {
		background: #0f1419;
	}

	.vision-section h2 {
		font-size: 42px;
		font-weight: 400;
		color: var(--text-primary);
		text-align: center;
		margin-bottom: 40px;
		text-transform: uppercase;
		letter-spacing: 1.5px;
	}

	.vision-content {
		max-width: 900px;
		margin: 0 auto;
	}

	.vision-content p {
		font-size: 20px;
		line-height: 1.8;
		color: var(--text-primary);
		text-align: center;
		font-weight: 500;
	}

	/* Team Section */
	.team-section {
		padding: 80px 50px;
		background: var(--bg-primary);
		transition: background 0.3s ease;
	}

	.team-section h2 {
		font-size: 42px;
		font-weight: 400;
		color: var(--text-primary);
		text-align: center;
		margin-bottom: 60px;
		text-transform: uppercase;
		letter-spacing: 1.5px;
	}

	.team-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 40px;
		max-width: 1200px;
		margin: 0 auto;
	}

	.team-member {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		transition: transform 0.3s ease;
	}

	.team-member:hover {
		transform: translateY(-10px);
	}

	.member-photo {
		width: 150px;
		height: 150px;
		border-radius: 50%;
		overflow: hidden;
		margin-bottom: 20px;
		box-shadow: 0 5px 20px var(--card-shadow);
		transition: all 0.3s ease;
		background: var(--card-bg);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.team-member:hover .member-photo {
		box-shadow: 0 10px 30px var(--card-shadow);
		transform: scale(1.05);
	}

	.member-photo img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.member-name {
		font-size: 18px;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 8px;
		line-height: 1.4;
	}

	.member-role {
		font-size: 15px;
		color: var(--text-primary);
		font-weight: 400;
		font-style: italic;
		opacity: 0.85;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.hero-section {
			padding: 60px 30px;
		}

		.hero-section h1 {
			font-size: 40px;
			margin-bottom: 30px;
		}

		.hero-content {
			grid-template-columns: 1fr;
			gap: 30px;
		}

		.hero-text {
			text-align: justify;
		}

		.hero-description {
			font-size: 18px;
		}

		.hero-image img {
			max-width: 200px;
		}

		.timeline-section {
			padding: 60px 30px;
		}

		.timeline-section h2 {
			font-size: 32px;
			margin-bottom: 30px;
		}

		.timeline-container {
			padding: 15px;
		}

		.objectives-section,
		.vision-section {
			padding: 60px 30px;
		}

		.objectives-section h2,
		.vision-section h2 {
			font-size: 32px;
			margin-bottom: 30px;
		}

		.objectives-content p {
			font-size: 16px;
			text-align: left;
		}

		.vision-content p {
			font-size: 18px;
			text-align: justify;
		}

		.team-section {
			padding: 60px 30px;
		}

		.team-section h2 {
			font-size: 32px;
			margin-bottom: 40px;
		}

		.team-grid {
			grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
			gap: 30px;
		}

		.member-photo {
			width: 130px;
			height: 130px;
		}

		.member-name {
			font-size: 16px;
		}

		.member-role {
			font-size: 14px;
		}
	}

	@media (max-width: 480px) {
		.hero-section {
			padding: 40px 20px;
		}

		.hero-section h1 {
			font-size: 32px;
			margin-bottom: 25px;
		}

		.hero-content {
			gap: 25px;
		}

		.hero-description {
			font-size: 16px;
		}

		.hero-image img {
			max-width: 150px;
		}

		.timeline-section {
			padding: 40px 20px;
		}

		.timeline-section h2 {
			font-size: 28px;
		}

		.timeline-container {
			padding: 10px;
		}

		.objectives-section,
		.vision-section {
			padding: 40px 20px;
		}

		.objectives-section h2,
		.vision-section h2 {
			font-size: 28px;
		}

		.objectives-content p,
		.vision-content p {
			font-size: 15px;
		}

		.team-section {
			padding: 40px 20px;
		}

		.team-section h2 {
			font-size: 28px;
			margin-bottom: 30px;
		}

		.team-grid {
			grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
			gap: 25px;
		}

		.member-photo {
			width: 110px;
			height: 110px;
		}

		.member-name {
			font-size: 15px;
		}

		.member-role {
			font-size: 13px;
		}
	}
</style>
