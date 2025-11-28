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

	<div class="spacer"></div>

	<!-- Sección Línea del Tiempo -->
	<section class="timeline-section">
		<h2>Línea del Tiempo</h2>
		<div class="timeline-container">
			<div class="timeline-line"></div>

			<div class="timeline-item">
				<div class="timeline-content">
					<div class="timeline-year">2013</div>
					<div class="timeline-text">Fundación del Consejo Cívico de Laguna</div>
				</div>
			</div>

			<div class="timeline-item">
				<div class="timeline-content">
					<div class="timeline-year">2014</div>
					<div class="timeline-text">Primera encuesta de percepción ciudadana</div>
				</div>
			</div>

			<div class="timeline-item">
				<div class="timeline-content">
					<div class="timeline-year">2015</div>
					<div class="timeline-text">Lanzamiento del observatorio ciudadano</div>
				</div>
			</div>

			<div class="timeline-item">
				<div class="timeline-content">
					<div class="timeline-year">2017</div>
					<div class="timeline-text">Creación de la Red de Adherentes</div>
				</div>
			</div>

			<div class="timeline-item">
				<div class="timeline-content">
					<div class="timeline-year">2019</div>
					<div class="timeline-text">Expansión de programas de transparencia</div>
				</div>
			</div>

			<div class="timeline-item">
				<div class="timeline-content">
					<div class="timeline-year">2021</div>
					<div class="timeline-text">Implementación de nuevas tecnologías digitales</div>
				</div>
			</div>

			<div class="timeline-item">
				<div class="timeline-content">
					<div class="timeline-year">2023</div>
					<div class="timeline-text">10 años promoviendo la participación ciudadana</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Sección Grid Objetivos y Visión -->
	<section class="objectives-vision-section">
		<div class="cards-grid">
			<!-- Tarjeta Nuestros Objetivos -->
			<div class="card card-objective">
				<h3 class="card-title">Nuestros Objetivos</h3>
				<div class="card-text">
					<p>
						A través de la generación y análisis de indicadores técnicos y de percepción ciudadana,
						buscamos generar evidencia y dialogar con los tomadores de decisión para atender y
						mejorar las áreas de oportunidad, además de aportar información de utilidad para el
						monitoreo y seguimiento permanente a las políticas públicas estatales y municipales.
					</p>
					<p>
						Buscamos incidir en políticas públicas eficientes y contribuir a transformar, desde la
						sociedad civil organizada, el bienestar y la calidad de vida de nuestra comunidad.
					</p>
				</div>
				<!-- Imagen decorativa -->
				<img
					src="/images/stickers/nuestrosObjetivosSticker.png"
					alt="Nuestros Objetivos"
					class="card-icon"
				/>
			</div>

			<!-- Tarjeta Nuestra Visión -->
			<div class="card card-vision">
				<h3 class="card-title">Nuestra Visión</h3>
				<div class="card-text">
					<p>
						Consolidarnos como el referente ciudadano que representa a los diferentes sectores de la
						sociedad, que articula esfuerzos orientados a generar conocimiento y métricas de
						evaluación que logren mejorar el diseño de políticas públicas en la región.
					</p>
				</div>
				<!-- Imagen decorativa -->
				<img
					src="/images/stickers/nuestraVisionSticker.png"
					alt="Nuestra Visión"
					class="card-icon"
				/>
			</div>
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

	/* Hero Section con efecto parallax fijo */
	.hero-section {
		position: fixed;
		background-image: url('/images/backgroundTorreon.png');
		background-size: cover;
		background-position: center center;
		background-repeat: no-repeat;
		background-attachment: fixed;
		padding: 20px 50px;
		min-height: 50vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 1;
	}

	.spacer {
		height: 50vh;
	}

	/* Overlay sobre la imagen de fondo */
	.hero-section::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(232, 244, 248, 0.85);
		z-index: 0;
		pointer-events: none;
	}

	:global([data-theme='dark']) .hero-section::before {
		background: rgba(15, 20, 25, 0.85);
	}

	/* Asegurar que el contenido esté por encima del overlay */
	.hero-section h1,
	.hero-section .hero-content {
		position: relative;
		z-index: 1;
	}

	.hero-section h1 {
		font-size: 42px;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 40px;
		text-transform: uppercase;
		letter-spacing: 2px;
		text-align: center;
	}

	:global([data-theme='dark']) .hero-section h1 {
		color: #ffa100;
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
		position: relative;
		z-index: 10;
	}

	.timeline-section h2 {
		font-size: 40px;
		font-weight: 500;
		color: var(--text-sub);
		text-align: center;
		margin-bottom: 60px;
		text-transform: uppercase;
		letter-spacing: 1.5px;
	}

	.timeline-container {
		max-width: 1000px;
		margin: 0 auto;
		position: relative;
		padding: 40px 0;
	}

	/* Línea vertical central */
	.timeline-line {
		position: absolute;
		left: 50%;
		top: 0;
		bottom: 0;
		width: 4px;
		background: linear-gradient(180deg, #4a7ba7, #c9a961);
		transform: translateX(-50%);
	}

	/* Items de la timeline */
	.timeline-item {
		position: relative;
		margin-bottom: 30px;
		display: flex;
		justify-content: flex-end;
		width: 100%;
	}

	/* Items impares (izquierda) */
	.timeline-item:nth-child(odd) {
		justify-content: flex-start;
	}

	.timeline-item:nth-child(odd) .timeline-content {
		margin-right: calc(50% + 20px);
	}

	/* Items pares (derecha) */
	.timeline-item:nth-child(even) .timeline-content {
		margin-left: calc(50% + 20px);
	}

	/* Contenido de cada evento */
	.timeline-content {
		background: var(--card-bg);
		border-radius: 12px;
		padding: 25px 30px;
		box-shadow: 0 4px 15px var(--card-shadow);
		max-width: 400px;
		position: relative;
		transition: all 0.3s ease;
	}

	.timeline-content:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 25px var(--card-shadow);
	}

	/* Círculo en la línea central */
	.timeline-content::before {
		content: '';
		position: absolute;
		width: 20px;
		height: 20px;
		background: #4a7ba7;
		border: 4px solid var(--bg-primary);
		border-radius: 50%;
		top: 30px;
	}

	.timeline-item:nth-child(odd) .timeline-content::before {
		right: -52px;
	}

	.timeline-item:nth-child(even) .timeline-content::before {
		left: -52px;
	}

	/* Año */
	.timeline-year {
		font-size: 28px;
		font-weight: 700;
		color: #4a7ba7;
		margin-bottom: 10px;
	}

	:global([data-theme='dark']) .timeline-year {
		color: #ffa100;
	}

	/* Texto del evento */
	.timeline-text {
		font-size: 16px;
		line-height: 1.6;
		color: var(--text-primary);
		font-weight: 400;
	}

	/* Objectives & Vision Grid Section */
	.objectives-vision-section {
		padding: 80px 50px;
		background: var(--bg-primary);
		transition: background 0.3s ease;
		position: relative;
		z-index: 10;
	}

	/* Grid de Tarjetas */
	.cards-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 40px;
		max-width: 1200px;
		margin: 0 auto;
	}

	/* Tarjetas base */
	.card {
		position: relative;
		border-radius: 16px;
		padding: 50px 40px;
		min-height: 550px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		transition: all 0.3s ease;
	}

	.card:hover {
		transform: translateY(-5px);
	}

	/* Tarjeta Nuestros Objetivos - Fondo oscuro azul institucional */
	.card-objective {
		background: linear-gradient(135deg, #2c5f8d 0%, #4a7ba7 100%);
		color: white;
		box-shadow: 0 8px 25px rgba(44, 95, 141, 0.3);
	}

	.card-objective:hover {
		box-shadow: 0 15px 40px rgba(44, 95, 141, 0.5);
	}

	.card-objective .card-title {
		color: #ffa100;
	}

	/* Tarjeta Nuestra Visión - Fondo blanco con borde y sombra */
	.card-vision {
		background: var(--card-bg);
		color: var(--text-primary);
		border: 2px solid #e0e0e0;
		box-shadow: 0 8px 25px var(--card-shadow);
	}

	:global([data-theme='dark']) .card-vision {
		border-color: #414a5e;
	}

	.card-vision:hover {
		box-shadow: 0 15px 40px rgba(44, 95, 141, 0.5);
	}

	.card-vision .card-title {
		color: #4a7ba7;
	}

	:global([data-theme='dark']) .card-vision .card-title {
		color: #ffa100;
	}

	/* Títulos de las tarjetas */
	.card-title {
		font-size: 32px;
		font-weight: 700;
		text-transform: uppercase;
		margin-bottom: 25px;
		letter-spacing: 1.5px;
	}

	/* Texto de las tarjetas */
	.card-text {
		flex-grow: 1;
	}

	.card-text p {
		font-size: 17px;
		line-height: 1.8;
		margin-bottom: 20px;
	}

	.card-text p:last-child {
		margin-bottom: 0;
	}

	.card-objective .card-text p {
		color: rgba(255, 255, 255, 0.95);
	}

	/* Imágenes decorativas (stickers) */
	.card-icon {
		position: absolute;
		bottom: 15px;
		right: 15px;
		width: 120px;
		height: auto;
		opacity: 0.2;
		pointer-events: none;
		object-fit: contain;
	}

	.card-objective .card-icon {
		opacity: 0.25;
		transition: opacity 0.3s ease;
	}

	.card-objective:hover .card-icon {
		opacity: 0.7;
	}

	.card-vision .card-icon {
		opacity: 0.2;
		transition: opacity 0.3s ease;
	}

	.card-vision:hover .card-icon {
		opacity: 0.9;
	}

	:global([data-theme='dark']) .card-vision .card-icon {
		opacity: 0.3;
	}

	:global([data-theme='dark']) .card-vision:hover .card-icon {
		opacity: 0.8;
	}

	/* Team Section */
	.team-section {
		padding: 80px 50px;
		background: var(--bg-primary);
		transition: background 0.3s ease;
		position: relative;
		z-index: 10;
	}

	.team-section h2 {
		font-size: 40px;
		font-weight: 500;
		color: var(--text-sub);
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
		overflow: visible;
		margin-bottom: 20px;
		background: var(--card-bg);
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		transition: transform 0.3s ease;
	}

	/* Anillo de acento (pseudo-elemento) */
	.member-photo::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: calc(100% + 12px);
		height: calc(100% + 12px);
		border: 3px solid #000;
		border-radius: 50%;
		transform: translate(-50%, -50%) rotate(0deg);
		transition: all 0.4s ease;
		z-index: -1;
	}

	/* Anillo en modo oscuro */
	:global([data-theme='dark']) .member-photo::after {
		border-color: #fff;
	}

	/* Hover en el miembro completo - Anillo y rotación */
	.team-member:hover .member-photo::after {
		border-color: #4a7ba7;
		transform: translate(-50%, -50%) rotate(45deg);
	}

	/* Hover en modo oscuro - Verde neón */
	:global([data-theme='dark']) .team-member:hover .member-photo::after {
		border-color: #00ff88;
	}

	/* Hover - Zoom en la foto */
	.team-member:hover .member-photo {
		transform: scale(1.05);
	}

	.member-photo img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 50%;
		position: relative;
		z-index: 1;
	}

	.member-name {
		font-size: 18px;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 8px;
		line-height: 1.4;
		transition: color 0.3s ease;
	}

	/* Hover - Nombre en azul institucional (modo claro) */
	.team-member:hover .member-name {
		color: #4a7ba7;
	}

	/* Hover - Nombre en verde neón (modo oscuro) */
	:global([data-theme='dark']) .team-member:hover .member-name {
		color: #00ff88;
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
			padding: 40px 30px;
			min-height: 40vh;
		}

		.spacer {
			height: 40vh;
		}

		.hero-section h1 {
			font-size: 30px;
			margin-bottom: 20px;
		}

		.hero-content {
			grid-template-columns: 1fr;
			gap: 20px;
		}

		.hero-text {
			text-align: justify;
		}

		.hero-description {
			font-size: 14px;
			line-height: 1.6;
		}

		.hero-image img {
			max-width: 120px;
		}

		.timeline-section {
			padding: 60px 30px;
		}

		.timeline-section h2 {
			font-size: 32px;
			margin-bottom: 40px;
		}

		.timeline-container {
			padding: 20px 0 20px 30px;
		}

		/* En móvil, la línea pasa por el costado izquierdo */
		.timeline-line {
			left: 15px;
		}

		/* Todos los items se alinean a la izquierda */
		.timeline-item,
		.timeline-item:nth-child(odd),
		.timeline-item:nth-child(even) {
			justify-content: flex-start;
		}

		.timeline-item:nth-child(odd) .timeline-content,
		.timeline-item:nth-child(even) .timeline-content {
			margin-left: 35px;
			margin-right: 0;
			max-width: 100%;
		}

		/* Círculos a la izquierda */
		.timeline-item:nth-child(odd) .timeline-content::before,
		.timeline-item:nth-child(even) .timeline-content::before {
			left: -46px;
			right: auto;
		}

		.timeline-content {
			padding: 20px 25px;
		}

		.timeline-year {
			font-size: 24px;
		}

		.timeline-text {
			font-size: 15px;
		}

		.objectives-vision-section {
			padding: 60px 20px;
		}

		/* Grid en tablet/móvil: 1 columna */
		.cards-grid {
			grid-template-columns: 1fr;
			gap: 30px;
		}

		.card {
			padding: 40px 30px;
			min-height: 410px;
		}

		.card-title {
			font-size: 28px;
		}

		.card-text p {
			font-size: 16px;
		}

		.card-icon {
			width: 100px;
			bottom: 12px;
			right: 12px;
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
			padding: 10px 20px;
			min-height: 35vh;
		}

		.spacer {
			height: 35vh;
		}

		.hero-section h1 {
			font-size: 26px;
			margin-bottom: 15px;
		}

		.hero-content {
			gap: 15px;
		}

		.hero-description {
			font-size: 14px;
			line-height: 1.5;
		}

		.hero-image img {
			max-width: 100px;
		}

		.timeline-section {
			padding: 40px 20px;
		}

		.timeline-section h2 {
			font-size: 28px;
			margin-bottom: 30px;
		}

		.timeline-container {
			padding: 20px 0 20px 25px;
		}

		.timeline-line {
			left: 12px;
		}

		.timeline-item:nth-child(odd) .timeline-content,
		.timeline-item:nth-child(even) .timeline-content {
			margin-left: 32px;
		}

		.timeline-item:nth-child(odd) .timeline-content::before,
		.timeline-item:nth-child(even) .timeline-content::before {
			left: -43px;
		}

		.timeline-content {
			padding: 18px 20px;
		}

		.timeline-year {
			font-size: 22px;
		}

		.timeline-text {
			font-size: 14px;
		}

		.objectives-vision-section {
			padding: 40px 20px;
		}

		.card {
			padding: 35px 25px;
			min-height: 470px;
		}

		.card-title {
			font-size: 26px;
		}

		.card-text p {
			font-size: 15px;
		}

		.card-icon {
			width: 80px;
			bottom: 10px;
			right: 10px;
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
