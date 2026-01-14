<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Footer from '$lib/components/Footer.svelte';

	// Datos de la línea de tiempo
	const timelineEvents = [
		{
			year: '2009-2012',
			title: 'Los años más oscuros de La Laguna',
			description:
				'A partir de 2009, la violencia comenzó a escalar de forma alarmante en la Comarca Lagunera. La presencia del crimen organizado transformó la vida cotidiana, marcó a miles de familias y debilitó la confianza en las instituciones. En 2012, el punto más crítico, Torreón fue catalogada entre las ciudades más violentas del mundo por organismos internacionales, reflejo de una crisis profunda que puso a prueba la resiliencia de toda la región.',
			images: ['notas 2012.png']
		},
		{
			year: '2012',
			title: 'Nace el Consejo Cívico de las Instituciones',
			description:
				'En medio de uno de los periodos más complejos de inseguridad que ha vivido La Laguna, la sociedad civil decidió organizarse. En 2012 nace el Consejo Cívico de las Instituciones, A.C., como una respuesta ciudadana ante la violencia, la incertidumbre y la necesidad urgente de reconstruir la confianza y el tejido social. Desde su origen, el CCI asumió el compromiso de incidir con datos, participación y corresponsabilidad para recuperar la paz, fortalecer las instituciones y defender el derecho de las y los laguneros a vivir con seguridad y dignidad.',
			images: ['Acta Constitutiva.png']
		},
		{
			year: '2013',
			title: 'Primer Observatorio Ciudadano Certificado y nacimiento de la Red Nacional',
			description:
				'El Consejo Cívico de las Instituciones obtuvo la Certificación como Observatorio Ciudadano por parte de México Evalúa y el Observatorio Nacional Ciudadano, convirtiéndose en el primer observatorio del país certificado en la medición de incidencia delictiva. Este reconocimiento sentó las bases para la creación de la Red Nacional de Observatorios de Seguridad, Justicia y Legalidad, fortaleciendo la vigilancia ciudadana, la transparencia y la evaluación independiente de las políticas públicas en materia de seguridad en México.',
			images: []
		},
		{
			year: '2013',
			title: 'Primer Informe de Monitoreo de Incidencia Delictiva en La Laguna',
			description:
				'En uno de los momentos más complejos en materia de seguridad para la región, el Consejo Cívico de las Instituciones presentó el Primer Informe de Monitoreo de Incidencia Delictiva en La Laguna. En un contexto de violencia generalizada y escasa información confiable, este ejercicio marcó un precedente al documentar y visibilizar, la magnitud real del fenómeno delictivo. Fue un acto de responsabilidad ciudadana para enfrentar la violencia con evidencia, romper el silencio y sentar las bases de una medición permanente que permitiera exigir políticas públicas más efectivas.',
			images: ['Rueda de Prensa Lanzamiento CCI.png']
		},
		{
			year: '2013',
			title: 'Incidencia nacional en la medición de la violencia',
			description:
				'El Consejo Cívico de las Instituciones logró incidir en una política pública de alcance nacional al impulsar que los delitos de homicidio y secuestro se registraran por número de víctimas y no solo por carpetas de investigación. Esta exigencia ciudadana quedó formalizada en el Acuerdo 05-XXXV-13, publicado en el Diario Oficial de la Federación, marcando un avance clave en la transparencia y precisión de las estadísticas de seguridad en México.',
			images: ['DOF - Acuerdo 05-XXXV-13 (Linea tiempo).png']
		},
		{
			year: '2014',
			title: 'Creación del Mando Especial de La Laguna (MEL)',
			description:
				'Se formaliza la creación del Mando Especial de La Laguna. Un acuerdo encabezado por la Secretaria de Gobernación, con la participación de los gobiernos de Coahuila y Durango, así como de las fuerzas federales. El MEL nació como un modelo de coordinación metropolitana para atender fenómenos delictivos que rebasaban las fronteras estatales, integrando esfuerzos de los tres órdenes de gobierno. Su objetivo: Recuperar el control territorial, reducir los delitos de alto impacto y restablecer la seguridad en una de las regiones más afectadas del país.',
			images: ['Mando Especial de la Laguna.png']
		},
		{
			year: '2015',
			title: 'Instalación de la Mesa de Seguridad y Justicia de La Laguna',
			description:
				'Se instala en Torreón la Mesa de Seguridad y Justicia, un espacio de coordinación interinstitucional impulsado por la sociedad civil y las autoridades locales junto con México SOS. Esta mesa conjunta reune a corporaciones públicas, académicos, organizaciones sociales y ciudadanía para analizar datos, proponer estrategias y dar seguimiento a acciones concretas de seguridad y justicia, marcando un paso importante hacia la colaboración institucional, además de integrarse a la Red Nacional de Mesas Ciudadanas de Seguridad y Justicia.',
			images: ['Nace Mesa de Seguridad Torreon.png']
		},
		{
			year: '2016',
			title: 'LABOR CÍVICA: Intervención comunitaria para la prevención de la violencia',
			description:
				'En 2016, el Consejo Cívico de las Instituciones impulsó LABOR CÍVICA, un modelo de intervención comunitaria implementado en el Ejido La Palma, en Torreón. Este proyecto tuvo como objetivo prevenir la violencia y el delito mediante el fortalecimiento del tejido social, el desarrollo comunitario y la mejora de las condiciones de vida en un polígono considerado vulnerable. Concluido exitosamente en 2017, LABOR CÍVICA demostró que la participación ciudadana organizada y la corresponsabilidad comunitaria son herramientas clave para construir entornos más seguros, resilientes y con mayor cohesión social.',
			images: ['Labor Civica.png']
		},
		{
			year: '2017',
			title: 'Lanzamiento del Observatorio de la Laguna',
			description:
				'En 2017, el Consejo Cívico de las Instituciones lanzó el Observatorio de la Laguna, un espacio público de consulta y análisis que consolidó datos relevantes sobre seguridad, economía, educación, migración y bienestar en la región. En un entorno donde la región demandaba información confiable para comprender y atender sus principales desafíos, el Observatorio se convirtió en una herramienta clave para la toma de decisiones, la evaluación de políticas públicas y la participación ciudadana basada en evidencia.',
			images: ['Nace Observatorio de la Laguna.png']
		},
		{
			year: '2017',
			title: 'Vigilancia del uso del ISN y obra pública en Torreón',
			description:
				'El Consejo Cívico de las Instituciones Laguna presentó un análisis independiente del uso de recursos del Impuesto Sobre Nómina (ISN), detectando posibles duplicidades en el registro de 28 de 39 obras públicas en Torreón, en las que los mismos proyectos aparecían reportados tanto con fondos del ISN como con recursos federales. El organismo exigió mayor claridad y transparencia en el destino de los recursos públicos y propuso mecanismos como un Registro Único de Obra Pública y un fideicomiso para el ISN, ante respuestas insuficientes de las autoridades.',
			images: ['Dulpicidad Obras ISN.png']
		},
		{
			year: '2017',
			title: 'Primera Encuesta de Percepción Ciudadana en La Laguna',
			description:
				'En 2017, el Consejo Cívico de las Instituciones llevó a cabo su primera Encuesta de Percepción Ciudadana, un ejercicio pionero en la región para medir cómo las y los habitantes de La Laguna percibían la seguridad, la confianza institucional y la calidad de vida. Frente a un contexto complejo de inseguridad y la necesidad de basar decisiones en evidencia social, esta encuesta proporcionó datos cuantitativos y cualitativos para orientar políticas públicas, fomentar el diálogo ciudadano y fortalecer la articulación entre sociedad civil y autoridades.',
			images: ['Encuesta de Percepcion.png']
		},
		{
			year: '2018',
			title: 'Primer Foro Coahuila',
			description:
				'Se promovió el Primer Foro Coahuila, un espacio de diálogo, análisis y propuestas que reunió a expertos, autoridades y sociedad civil para abordar de manera integral los desafíos en Finanzas Públicas, Seguridad y Justicia, Anticorrupción y Fiscalización Electoral en el estado. Este foro consolidó al CCI como un actor activo en la agenda ciudadana, impulsando el intercambio de experiencias, la construcción de soluciones colaborativas y la participación informada de la comunidad.',
			images: ['Foro Coahuila_2.png']
		},
		{
			year: '2018',
			title: 'Análisis de Finanzas Públicas Estatales y Municipales',
			description:
				'El Observatorio de La Laguna, impulsado por el Consejo Cívico de las Instituciones, integró por primera vez el análisis detallado de las finanzas públicas estatales y municipales, publicando datos sobre ingresos y egresos de Coahuila y Durango, así como de los municipios de la zona metropolitana. Este ejercicio innovador no solo abrió la fiscalización ciudadana sobre los recursos públicos, sino que también abarcó a las Universidades públicas de la región y a los Organismos Operadores de Agua.',
			images: ['Finanzas Publicas.png']
		},
		{
			year: '2018',
			title: 'Alianza Anticorrupción Coahuila',
			description:
				'En el marco de la implementación del Sistema Nacional Anticorrupción, el Consejo Cívico de las Instituciones formó parte de la Alianza Anticorrupción Coahuila, una iniciativa ciudadana integrada por organizaciones de la sociedad civil que surgió entre 2017 y 2018 para exigir la correcta aplicación del Sistema Estatal Anticorrupción. La Alianza se consolidó como un frente ciudadano para vigilar la actuación de las autoridades, promover la transparencia y combatir la impunidad.',
			images: ['Alianza Anticorrupcion Coahuila.png']
		},
		{
			year: '2019',
			title: 'Lanzamiento de Regidor MX Laguna',
			description:
				'El Consejo Cívico de las Instituciones dio un paso más en su compromiso por la transparencia y la participación ciudadana con el desarrollo de Regidor MX Laguna, una plataforma digital orientada a monitorear y hacer accesible la labor de los regidores (as) en los ayuntamientos de la Zona Metropolitana de La Laguna. El proyecto fue en alianza con el Plan Estratégico de Juárez, en alianza con otras organizaciones locales. Esta iniciativa busca que la ciudadanía conozca agenda, dictámenes, propuestas y decisiones de sus representantes locales.',
			images: ['Lanzamiento Regidor MX Laguna.png']
		},
		{
			year: '2019',
			title: 'Agenda Anticorrupción CCI – Ethos - USAID',
			description:
				'El Consejo Cívico de las Instituciones y Ethos Laboratorio de Políticas Públicas con financiamiento de la Agencia de Estados Unidos para el Desarrollo, firmaron un acuerdo de colaboración con el Sistema Anticorrupción del Estado de Coahuila para impulsar la Agenda Local Anticorrupción. Esta alianza fortaleció la participación ciudadana, promovió la transparencia municipal y la rendición de cuentas, buscando incidir en políticas públicas mediante el análisis de indicadores y la vigilancia social.',
			images: ['Agenda Anticorrupcion Ethos.png']
		},
		{
			year: '2019',
			title: 'Firma Convenio Colaboración Karewa',
			description:
				'Se firmó un Convenio de colaboración con la organización Karewa de Chihuahua, para replicar el Monitor Karewa Laguna, una plataforma digital diseñada para fomentar la participación ciudadana y la transparencia mediante el análisis colaborativo de información pública. La herramienta permite a jóvenes y ciudadanos explorar contratos, datos de gobierno y otros recursos, fortaleciendo la vigilancia ciudadana y la cultura de rendición de cuentas en la región.',
			images: ['Firma Convenio Karewa Laguna.png']
		},
		{
			year: '2020',
			title: 'Instalación de la Mesa de Salud en La Laguna',
			description:
				'Durante la emergencia por COVID-19, a iniciativa del Consejo Cívico de las Instituciones, se impulsó la instalación de la Mesa de Salud de La Laguna, un espacio de coordinación entre autoridades de salud, sociedad civil y organismos estratégicos para evaluar y atender de manera conjunta los retos sanitarios de la pandemia. La mesa se convirtió en un punto de encuentro para analizar datos, compartir información técnica y articular acciones que protegieran la salud de la población lagunera.',
			images: ['Mesa de Salud Instalacion.png']
		},
		{
			year: '2020',
			title: 'Campañas ciudadanas por la salud y la vida',
			description:
				'Desde la Mesa de Salud, el Consejo Cívico impulsó diversas campañas de concientización para promover el cumplimiento de las medidas sanitarias durante la pandemia. Destacó una campaña de alto impacto social basada en testimonios reales de personas que perdieron a familiares a causa del COVID-19, incluidos médicos y enfermeras. La iniciativa fue respaldada por el Gobierno del Estado y amplificada a través de espectaculares y plataformas digitales, logrando un fuerte impacto social cercano a las 8 millones de personas.',
			images: ['Campana COVID.png']
		},
		{
			year: '2020',
			title: 'Tablero de Evaluación para Órganos Internos de Control – Checchi – USAID',
			description:
				'El Consejo Cívico de las Instituciones, junto con Checchi Consulting, financiado por USAID presentaron el Tablero de Evaluación y Seguimiento de los Órganos Internos de Control, una herramienta digital diseñada para monitorear el desempeño de los mecanismos de control y fiscalización dentro de los municipios. Este tablero permite visualizar datos comparables y transparentes sobre los OIC municipales, promoviendo una mayor rendición de cuentas y participación ciudadana.',
			images: ['Evaluacion Organos Internos de Control.png']
		},
		{
			year: '2021',
			title: 'Fuerza Ciudadana Anticorrupción',
			description:
				'El Consejo Cívico de las Instituciones se integró a la Fuerza Ciudadana Anticorrupción, un esfuerzo colectivo de organizaciones civiles para fortalecer la lucha contra la corrupción y el fortalecimiento del Sistema Nacional Anticorrupción, así como defender la integridad de las instituciones públicas. A través de este frente ciudadano, el CCI contribuyó a elevar las voces de la sociedad civil, promover la transparencia y exigir la correcta implementación de políticas anticorrupción a nivel nacional.',
			images: ['Fuerza Ciudadana Anticorrupcion.png']
		},
		{
			year: '2021',
			title: 'Participación en el Colectivo "Perfiles Idóneos Ya"',
			description:
				'El Consejo Cívico de las Instituciones se sumó al colectivo nacional ¡Perfiles Idóneos Ya!, integrado por organizaciones de la sociedad civil de al menos 10 estados del país, con el objetivo de vigilar y exigir procesos transparentes y meritocráticos en la designación de cargos clave dentro de los Sistemas Nacional y Estatales Anticorrupción. Este esfuerzo ciudadano surgió ante la preocupación por nombramientos opacos y la falta de perfiles idóneos en órganos estratégicos.',
			images: ['Perfiles Idoneos Ya.png']
		},
		{
			year: '2021',
			title: 'Evaluación de justicia penal con México Evalúa y Red Justicia Coahuila',
			description:
				'Desde 2021, el Consejo Cívico de las Instituciones se integró a la colaboración con México Evalúa en el análisis del sistema de justicia penal en Coahuila, aportando datos, metodologías y perspectivas ciudadanas para evaluar su funcionamiento, desafíos y oportunidades de mejora. Esta alianza fortaleció la Red Justicia Coahuila, un espacio de cooperación entre sociedad civil y academia para monitorear, comparar y proponer políticas públicas efectivas en materia de justicia.',
			images: ['Evaluacion SJP Coahuila.png']
		},
		{
			year: '2022',
			title: 'Seminario Permanente de Fortalecimiento de Regidurías',
			description:
				'Se colaboró en la organización del Seminario Permanente de Fortalecimiento de Regidurías, un espacio de capacitación, análisis y diálogo dirigido a regidores y regidoras de la Zona Metropolitana de La Laguna. Este seminario nació con el propósito de fortalecer las capacidades técnicas y la comprensión del papel estratégico de las regidurías en la gobernanza local. Desde entonces, el CCI ha mantenido este ejercicio de manera constante en cada ciclo electoral.',
			images: ['Seminario de Regidurias.png']
		},
		{
			year: '2023',
			title: 'Participación en el Acuerdo por la Integridad Electoral en Coahuila',
			description:
				'En febrero de 2023, el Consejo Cívico de las Instituciones se sumó al Acuerdo por la Integridad Electoral en Coahuila, un esfuerzo conjunto entre autoridades estatales, organizaciones de la sociedad civil y actores políticos para garantizar procesos electorales transparentes, equitativos y libres de violencia o coacción. La participación del CCI reforzó el compromiso colectivo con la democracia, la rendición de cuentas y la participación ciudadana informada.',
			images: ['Firma Acuerdo Integridad.png']
		},
		{
			year: '2023',
			title: 'Firma de compromisos en la Agenda Ciudadana de Seguridad y Justicia',
			description:
				'En mayo de 2023, los candidatos a la Gubernatura de Coahuila suscribieron compromisos con organizaciones de la sociedad civil para consolidar una Agenda Ciudadana de Seguridad y Justicia para Coahuila. El Consejo Cívico de las Instituciones participó activamente en su elaboración, junto con la Mesa de Seguridad y Justicia, promoviendo propuestas ciudadanas para atender los desafíos de seguridad y fortalecer la justicia en el estado.',
			images: ['Firma Agenda Ciudada Seguridad.png']
		},
		{
			year: '2023',
			title: 'Rally Karewa Laguna — participación ciudadana y análisis cívico',
			description:
				'En 2023, el Consejo Cívico de las Instituciones, en colaboración con Jóvenes Líderes de la Asociación Cívica de la Laguna, llevó a cabo la edición regional del Rally Karewa Laguna, un ejercicio de contraloría social y análisis de información pública orientado a fortalecer la cultura cívica entre la juventud y la comunidad lagunera. A través de dinámicas participativas, los equipos integraron hallazgos, discutieron casos reales y se acercaron de manera activa al escrutinio de datos públicos.',
			images: ['Rally Karewa.png']
		},
		{
			year: '2024',
			title: 'Instalación del Consejo de Seguridad y Desarrollo Regional de La Laguna',
			description:
				'El 23 de enero de 2024 se instaló el Consejo de Seguridad y Desarrollo Regional de La Laguna (CONSEDE), un órgano de coordinación diseñado para articular acciones entre los tres órdenes de gobierno y la sociedad civil en la búsqueda de estrategias integrales de seguridad y desarrollo. El Consejo Cívico de las Instituciones obtuvo un asiento en este espacio, fortaleciendo la participación ciudadana en la construcción de políticas públicas regionales.',
			images: ['CONSEDE.png']
		},
		{
			year: '2024',
			title: 'Participación en el Fondo de Apoyo a la Observación Electoral (FAOE)',
			description:
				'En 2024, el Consejo Cívico de las Instituciones fue beneficiario del Fondo de Apoyo a la Observación Electoral (FAOE) del Instituto Interamericano de Derechos Humanos, participando con la iniciativa Embajadores de la Democracia, que fortalecen la observación ciudadana de los procesos electorales en México en jóvenes. Esta colaboración permitió ampliar la vigilancia independiente del ejercicio del voto y los comicios.',
			images: ['Fondo de Apoyo a la Observacion Electoral.png']
		},
		{
			year: '2025',
			title: 'Financiación de la Fundación del Empresariado Coahuilense',
			description:
				'En 2025, el Consejo Cívico de las Instituciones recibió apoyo financiero de la Fundación del Empresariado Coahuilense (FEC) para implementar y fortalecer estrategias de prevención del delito y empoderamiento comunitario en zonas vulnerables, como el modelo aplicado en Rincón La Merced. Este respaldo permitió ampliar el alcance de proyectos cívicos orientados a la cohesión social y la seguridad.',
			images: ['Financiacion Proyecto FEC 2025.png']
		},
		{
			year: '2025',
			title: 'Lanzamiento del Observatorio Social de Coahuila',
			description:
				'En 2025, se asumió la administración del primer Observatorio Social de Coahuila, una plataforma diseñada para visibilizar de manera clara, ordenada y accesible los desafíos sociales más urgentes del estado, desde salud, desarrollo social, educación hasta prevención del delito. Bajo la gestión del CCI, el observatorio se consolidó como una herramienta clave para la incidencia ciudadana y la evaluación de políticas públicas.',
			images: ['Lanzamiento Observatorio Social.png']
		},
		{
			year: '2025',
			title: 'Posicionamiento público contra la extorsión en la Laguna de Durango',
			description:
				'Ante el incremento de hechos de extorsión que afectaban a sectores productivos de la Comarca Lagunera, organizaciones empresariales, sociales y productivas —entre ellas el Consejo Cívico de las Instituciones— alzaron la voz de manera conjunta para denunciar públicamente esta problemática. A través de pronunciamientos y llamados abiertos a las autoridades, se exigió atención inmediata, investigación efectiva y garantías de seguridad para quienes generan empleo y desarrollo en la región.',
			images: ['Desplegado vs Extorsiones.png']
		}
	];

	function animarAlEntrar(node: HTMLElement, options?: { delay?: number }) {
		const delay = options?.delay ?? 0;
		node.style.transitionDelay = `${delay}ms`;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						// Entró al viewport - hacer visible
						node.classList.add('visible');
					} else {
						// Salió del viewport - hacer invisible (se animará al volver a entrar)
						node.classList.remove('visible');
					}
				});
			},
			{
				threshold: 0.15,
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
		<div class="hero-content">
			<h1>Nosotros</h1>
			<p class="hero-description">
				El CCI Laguna es una organización de la sociedad civil, apartidista, sin fines de lucro e
				independiente, que busca promover y organizar la participación ciudadana para desarrollar
				buenos gobiernos y mejores ciudadanos en la Comarca Lagunera.
			</p>
		</div>
	</section>

	<div class="spacer"></div>

	<!-- Sección Línea del Tiempo -->
	<section class="timeline-section">
		<h2 use:animarAlEntrar={{ delay: 0 }}>Línea del Tiempo</h2>
		<div class="timeline-container">
			<div class="timeline-line"></div>

			{#each timelineEvents as event, i}
				<div
					class="timeline-item"
					class:no-image={event.images.length === 0}
					use:animarAlEntrar={{ delay: 0 }}
				>
					<div class="timeline-content">
						{#if event.images.length > 0}
							<div class="timeline-images" class:dual={event.images.length > 1}>
								{#each event.images as image}
									<img
										src="/images/Fotos Linea del Tiempo/{image}"
										alt={event.title}
										loading="lazy"
									/>
								{/each}
							</div>
						{/if}
						<div class="timeline-info">
							<div class="timeline-year">{event.year}</div>
							<div class="timeline-title">{event.title}</div>
							<div class="timeline-text">{event.description}</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Sección Grid Objetivos y Visión -->
	<section class="objectives-vision-section">
		<div class="cards-grid">
			<!-- Tarjeta Nuestros Objetivos -->
			<div class="card card-objective" use:animarAlEntrar={{ delay: 0 }}>
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
			<div class="card card-vision" use:animarAlEntrar={{ delay: 150 }}>
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
		<h2 use:animarAlEntrar={{ delay: 0 }}>Equipo de Trabajo</h2>
		<div class="team-grid">
			<div class="team-member" use:animarAlEntrar={{ delay: 0 }}>
				<div class="member-photo">
					<img src="/images/team/placeholder.png" alt="Marco Antonio Zamarripa González" />
				</div>
				<h3 class="member-name">Marco Antonio Zamarripa González</h3>
				<p class="member-role">Director General</p>
			</div>

			<div class="team-member" use:animarAlEntrar={{ delay: 100 }}>
				<div class="member-photo">
					<img src="/images/team/placeholder.png" alt="Luis Alfredo Medina López" />
				</div>
				<h3 class="member-name">Luis Alfredo Medina López</h3>
				<p class="member-role">Coordinador de Investigación</p>
			</div>

			<div class="team-member" use:animarAlEntrar={{ delay: 200 }}>
				<div class="member-photo">
					<img src="/images/team/placeholder.png" alt="David Ruelas Sarmiento" />
				</div>
				<h3 class="member-name">David Ruelas Sarmiento</h3>
				<p class="member-role">Investigador</p>
			</div>

			<div class="team-member" use:animarAlEntrar={{ delay: 300 }}>
				<div class="member-photo">
					<img src="/images/team/placeholder1.png" alt="Dely Ramírez Sánchez" />
				</div>
				<h3 class="member-name">Dely Ramírez Sánchez</h3>
				<p class="member-role">Vinculación</p>
			</div>

			<div class="team-member" use:animarAlEntrar={{ delay: 400 }}>
				<div class="member-photo">
					<img src="/images/team/placeholder.png" alt="Wolfang Arturo García Méndez" />
				</div>
				<h3 class="member-name">Wolfang Arturo García Méndez</h3>
				<p class="member-role">Sistemas</p>
			</div>

			<div class="team-member" use:animarAlEntrar={{ delay: 500 }}>
				<div class="member-photo">
					<img src="/images/team/placeholder1.png" alt="Gabriela Zamora Álvarez" />
				</div>
				<h3 class="member-name">Gabriela Zamora Álvarez</h3>
				<p class="member-role">Diseñadora Gráfica</p>
			</div>

			<div class="team-member" use:animarAlEntrar={{ delay: 600 }}>
				<div class="member-photo">
					<img src="/images/team/placeholder.png" alt="Enrique Lara García" />
				</div>
				<h3 class="member-name">Enrique Lara García</h3>
				<p class="member-role">Investigador</p>
			</div>

			<div class="team-member" use:animarAlEntrar={{ delay: 700 }}>
				<div class="member-photo">
					<img src="/images/team/placeholder1.png" alt="Nayeli García González" />
				</div>
				<h3 class="member-name">Nayeli García González</h3>
				<p class="member-role">Community Manager</p>
			</div>
		</div>
	</section>

	<!-- Sección Consejo Directivo -->
	<section class="board-section">
		<h2 use:animarAlEntrar={{ delay: 0 }}>Consejo Directivo</h2>
		<div class="board-grid">
			<div class="board-member" use:animarAlEntrar={{ delay: 0 }}>
				<h3 class="board-name">Luis Dovalina Flores</h3>
				<p class="board-role">Presidente</p>
			</div>

			<div class="board-member" use:animarAlEntrar={{ delay: 50 }}>
				<h3 class="board-name">Alán Garza Tijerina Murra</h3>
				<p class="board-role">VicePresidente</p>
			</div>

			<div class="board-member" use:animarAlEntrar={{ delay: 100 }}>
				<h3 class="board-name">Luis Rey Delgado García</h3>
				<p class="board-role">Secretario</p>
			</div>

			<div class="board-member" use:animarAlEntrar={{ delay: 150 }}>
				<h3 class="board-name">Othón Zermeño Wigand</h3>
				<p class="board-role">Tesorero</p>
			</div>

			<div class="board-member" use:animarAlEntrar={{ delay: 200 }}>
				<h3 class="board-name">Diego Jiménez Berúmen</h3>
				<p class="board-role">Comisario</p>
			</div>

			<div class="board-member" use:animarAlEntrar={{ delay: 250 }}>
				<h3 class="board-name">Gerardo Martín Soberón</h3>
				<p class="board-role">Vocal</p>
			</div>

			<div class="board-member" use:animarAlEntrar={{ delay: 300 }}>
				<h3 class="board-name">Carlos Fernández Gómez</h3>
				<p class="board-role">Vocal</p>
			</div>

			<div class="board-member" use:animarAlEntrar={{ delay: 350 }}>
				<h3 class="board-name">Alberto Allegre del Cueto</h3>
				<p class="board-role">Vocal</p>
			</div>

			<div class="board-member" use:animarAlEntrar={{ delay: 400 }}>
				<h3 class="board-name">Federico Villarreal Gómez</h3>
				<p class="board-role">Vocal</p>
			</div>

			<div class="board-member" use:animarAlEntrar={{ delay: 450 }}>
				<h3 class="board-name">Eduardo Bartheneuf Viesca</h3>
				<p class="board-role">Vocal</p>
			</div>

			<div class="board-member" use:animarAlEntrar={{ delay: 500 }}>
				<h3 class="board-name">Arturo Madero Sordo</h3>
				<p class="board-role">Vocal</p>
			</div>

			<div class="board-member" use:animarAlEntrar={{ delay: 550 }}>
				<h3 class="board-name">Boyardo Salmón Abraham</h3>
				<p class="board-role">Vocal</p>
			</div>

			<div class="board-member" use:animarAlEntrar={{ delay: 600 }}>
				<h3 class="board-name">Pablo Treviño Sepúlveda</h3>
				<p class="board-role">Vocal</p>
			</div>
		</div>

		<h3 class="board-subtitle" use:animarAlEntrar={{ delay: 0 }}>Consejo ExPresidentes</h3>
		<div class="board-grid expresidents">
			<div class="board-member" use:animarAlEntrar={{ delay: 0 }}>
				<h3 class="board-name">Miguel Wong Sánchez Ibarra</h3>
				<p class="board-role">ExPresidente</p>
			</div>

			<div class="board-member" use:animarAlEntrar={{ delay: 50 }}>
				<h3 class="board-name">Fernando Pérez Garza</h3>
				<p class="board-role">ExPresidente</p>
			</div>
		</div>
	</section>
</main>

<Footer />

<style>
	.nosotros-page {
		min-height: calc(100vh - 200px);
	}

	/* Hero Section con efecto parallax fijo + estilo blog */
	.hero-section {
		position: fixed;
		background:
			linear-gradient(135deg, rgba(43, 74, 105, 0.8) 0%, rgba(30, 59, 89, 0.8) 100%),
			url('/images/backgroundTorreon.png') center/cover no-repeat;
		background-attachment: fixed;
		min-height: 400px;
		width: 100%;
		padding: 80px 50px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		z-index: 1;
		transition: background 0.3s ease;
	}

	:global([data-theme='dark']) .hero-section {
		background:
			linear-gradient(135deg, rgba(15, 20, 25, 0.9) 0%, rgba(15, 20, 25, 0.9) 100%),
			url('/images/backgroundTorreon.png') center/cover no-repeat;
		background-attachment: fixed;
	}

	.spacer {
		height: 40vh;
	}

	.hero-content {
		max-width: 900px;
		margin: 0 auto;
	}

	.hero-section h1 {
		font-size: 56px;
		font-weight: 400;
		color: #ffffff;
		margin-bottom: 20px;
		text-transform: uppercase;
		letter-spacing: 2px;
		text-shadow: #000000 0px 4px 6px;
	}

	.hero-description {
		font-size: 20px;
		line-height: 1.6;
		color: #ffffff;
		text-shadow: #000000 0px 4px 6px;
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

		/* Estado inicial para animación */
		opacity: 0;
		transform: translateY(30px);
		transition:
			opacity 0.8s ease-out,
			transform 0.8s ease-out;
	}

	.timeline-section h2:global(.visible) {
		opacity: 1;
		transform: translateY(0);
	}

	.timeline-container {
		max-width: 1100px;
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
		margin-bottom: 50px;
		display: flex;
		justify-content: flex-end;
		width: 100%;

		/* Estado inicial para animación */
		opacity: 0;
		transform: translateY(50px);
		transition:
			opacity 0.8s ease-out,
			transform 0.8s ease-out;
	}

	.timeline-item:global(.visible) {
		opacity: 1;
		transform: translateY(0);
	}

	/* Items impares (izquierda) */
	.timeline-item:nth-child(odd) {
		justify-content: flex-start;
	}

	.timeline-item:nth-child(odd) .timeline-content {
		margin-right: calc(50% + 30px);
	}

	/* Items pares (derecha) */
	.timeline-item:nth-child(even) .timeline-content {
		margin-left: calc(50% + 30px);
	}

	/* Contenido de cada evento */
	.timeline-content {
		background: var(--card-bg);
		border-radius: 16px;
		padding: 0;
		box-shadow: 0 4px 20px var(--card-shadow);
		max-width: 480px;
		position: relative;
		transition: all 0.3s ease;
		overflow: hidden;
	}

	.timeline-content:hover {
		transform: translateY(-5px);
		box-shadow: 0 12px 35px var(--card-shadow);
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
		z-index: 5;
	}

	.timeline-item:nth-child(odd) .timeline-content::before {
		right: -62px;
	}

	.timeline-item:nth-child(even) .timeline-content::before {
		left: -62px;
	}

	/* Contenedor de imágenes */
	.timeline-images {
		width: 100%;
		height: 200px;
		overflow: hidden;
		display: flex;
		background: var(--bg-secondary);
	}

	.timeline-images img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.4s ease;
		display: block;
	}

	/* Doble imagen */
	.timeline-images.dual {
		gap: 2px;
		display: flex;
		flex-direction: row;
	}

	.timeline-images.dual img {
		width: calc(50% - 1px) !important;
		height: 100%;
		object-fit: cover;
		flex: 0 0 calc(50% - 1px);
	}

	.timeline-content:hover .timeline-images img {
		transform: scale(1.05);
	}

	/* Info del evento */
	.timeline-info {
		padding: 20px 25px 25px;
	}

	/* Año */
	.timeline-year {
		font-size: 15px;
		font-weight: 600;
		color: #4a7ba7;
		margin-bottom: 8px;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	:global([data-theme='dark']) .timeline-year {
		color: #ffa100;
	}

	/* Título del evento */
	.timeline-title {
		font-size: 18px;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: 12px;
		line-height: 1.4;
	}

	/* Texto del evento */
	.timeline-text {
		font-size: 14px;
		line-height: 1.7;
		color: var(--text-primary);
		font-weight: 400;
		opacity: 0.85;
	}

	/* Eventos sin imagen */
	.timeline-item.no-image .timeline-info {
		padding-top: 25px;
	}

	/* Objectives & Vision Grid Section */
	.objectives-vision-section {
		padding: 20px 50px;
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
		border-radius: 20px;
		padding: 50px 40px;
		min-height: 550px;
		display: flex;
		flex-direction: column;
		overflow: hidden;

		/* Glassmorphism base */
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);

		/* Estado inicial para animación */
		opacity: 0;
		transform: translateY(50px);
		transition:
			opacity 0.8s ease-out,
			transform 0.8s ease-out,
			box-shadow 0.3s ease,
			border-color 0.3s ease;
	}

	.card:global(.visible) {
		opacity: 1;
		transform: translateY(0);
	}

	.card:global(.visible):hover {
		transform: translateY(-8px);
	}

	/* Tarjeta Nuestros Objetivos - Glassmorphism claro (mismo estilo que Visión) */
	.card-objective {
		background: rgba(255, 255, 255, 0.7);
		color: var(--text-primary);
		border: 1px solid rgba(74, 123, 167, 0.2);
		box-shadow:
			0 8px 32px var(--card-shadow),
			inset 0 1px 0 rgba(255, 255, 255, 0.5);
	}

	:global([data-theme='dark']) .card-objective {
		background: rgba(51, 65, 85, 0.7);
		border-color: rgba(255, 161, 0, 0.2);
		box-shadow:
			0 8px 32px rgba(0, 0, 0, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.05);
	}

	.card-objective:hover {
		box-shadow:
			0 20px 50px rgba(74, 123, 167, 0.4),
			inset 0 1px 0 rgba(255, 255, 255, 0.6);
		border-color: rgba(74, 123, 167, 0.4);
	}

	:global([data-theme='dark']) .card-objective:hover {
		box-shadow:
			0 20px 50px rgba(0, 0, 0, 0.5),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 161, 0, 0.4);
	}

	.card-objective .card-title {
		color: #4a7ba7;
	}

	:global([data-theme='dark']) .card-objective .card-title {
		color: #ffa100;
		text-shadow: 0 0 20px rgba(255, 161, 0, 0.3);
	}

	/* Tarjeta Nuestra Visión - Glassmorphism claro */
	.card-vision {
		background: rgba(255, 255, 255, 0.7);
		color: var(--text-primary);
		border: 1px solid rgba(74, 123, 167, 0.2);
		box-shadow:
			0 8px 32px var(--card-shadow),
			inset 0 1px 0 rgba(255, 255, 255, 0.5);
	}

	:global([data-theme='dark']) .card-vision {
		background: rgba(51, 65, 85, 0.7);
		border-color: rgba(255, 161, 0, 0.2);
		box-shadow:
			0 8px 32px rgba(0, 0, 0, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.05);
	}

	.card-vision:hover {
		box-shadow:
			0 20px 50px rgba(74, 123, 167, 0.4),
			inset 0 1px 0 rgba(255, 255, 255, 0.6);
		border-color: rgba(74, 123, 167, 0.4);
	}

	:global([data-theme='dark']) .card-vision:hover {
		box-shadow:
			0 20px 50px rgba(0, 0, 0, 0.5),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 161, 0, 0.4);
	}

	.card-vision .card-title {
		color: #4a7ba7;
	}

	:global([data-theme='dark']) .card-vision .card-title {
		color: #ffa100;
		text-shadow: 0 0 20px rgba(255, 161, 0, 0.3);
	}

	/* Títulos de las tarjetas */
	.card-title {
		font-size: 32px;
		font-weight: 700;
		text-transform: uppercase;
		margin-bottom: 15px;
		letter-spacing: 1.5px;
		position: relative;
		display: inline-block;
	}

	/* Línea decorativa debajo del título */
	.card-title::after {
		content: '';
		position: absolute;
		bottom: -8px;
		left: 0;
		width: 60px;
		height: 3px;
		background: linear-gradient(90deg, #ffa100 0%, rgba(255, 161, 0, 0.3) 100%);
		border-radius: 2px;
		transition: width 0.3s ease;
	}

	.card:hover .card-title::after {
		width: 100px;
	}

	.card-vision .card-title::after {
		background: linear-gradient(90deg, #4a7ba7 0%, rgba(74, 123, 167, 0.3) 100%);
	}

	:global([data-theme='dark']) .card-vision .card-title::after {
		background: linear-gradient(90deg, #ffa100 0%, rgba(255, 161, 0, 0.3) 100%);
	}

	/* Texto de las tarjetas */
	.card-text {
		flex-grow: 1;
		margin-top: 15px;
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
		color: var(--text-primary);
	}

	.card-objective .card-title::after {
		background: linear-gradient(90deg, #4a7ba7 0%, rgba(74, 123, 167, 0.3) 100%);
	}

	:global([data-theme='dark']) .card-objective .card-title::after {
		background: linear-gradient(90deg, #ffa100 0%, rgba(255, 161, 0, 0.3) 100%);
	}

	/* Imágenes decorativas (stickers) - Más grandes con glow */
	.card-icon {
		position: absolute;
		bottom: 20px;
		right: 20px;
		width: 120px;
		height: auto;
		opacity: 0.3;
		pointer-events: none;
		object-fit: contain;
		transition:
			opacity 0.4s ease,
			transform 0.4s ease,
			filter 0.4s ease;
	}

	.card-objective .card-icon {
		opacity: 0.25;
		filter: drop-shadow(0 0 10px rgba(74, 123, 167, 0.2));
	}

	.card-objective:hover .card-icon {
		opacity: 0.9;
		transform: scale(1.1) rotate(5deg);
		filter: drop-shadow(0 0 20px rgba(74, 123, 167, 0.4));
	}

	:global([data-theme='dark']) .card-objective .card-icon {
		opacity: 0.35;
		filter: drop-shadow(0 0 15px rgba(255, 161, 0, 0.2));
	}

	:global([data-theme='dark']) .card-objective:hover .card-icon {
		opacity: 0.85;
		filter: drop-shadow(0 0 25px rgba(255, 161, 0, 0.5));
	}

	.card-vision .card-icon {
		opacity: 0.25;
		filter: drop-shadow(0 0 10px rgba(74, 123, 167, 0.2));
	}

	.card-vision:hover .card-icon {
		opacity: 0.9;
		transform: scale(1.1) rotate(-5deg);
		filter: drop-shadow(0 0 20px rgba(74, 123, 167, 0.4));
	}

	:global([data-theme='dark']) .card-vision .card-icon {
		opacity: 0.35;
		filter: drop-shadow(0 0 15px rgba(255, 161, 0, 0.2));
	}

	:global([data-theme='dark']) .card-vision:hover .card-icon {
		opacity: 0.85;
		filter: drop-shadow(0 0 25px rgba(255, 161, 0, 0.5));
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

		/* Estado inicial para animación */
		opacity: 0;
		transform: translateY(30px);
		transition:
			opacity 0.8s ease-out,
			transform 0.8s ease-out;
	}

	.team-section h2:global(.visible) {
		opacity: 1;
		transform: translateY(0);
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

		/* Estado inicial para animación */
		opacity: 0;
		transform: translateY(50px);
		transition:
			opacity 0.8s ease-out,
			transform 0.8s ease-out;
	}

	.team-member:global(.visible) {
		opacity: 1;
		transform: translateY(0);
	}

	.team-member:global(.visible):hover {
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

	/* Board Section (Consejo Directivo) */
	.board-section {
		padding: 10px 50px 100px;
		background: var(--bg-primary);
		transition: background 0.3s ease;
		position: relative;
		z-index: 10;
	}

	.board-section h2 {
		font-size: 40px;
		font-weight: 500;
		color: var(--text-sub);
		text-align: center;
		margin-bottom: 60px;
		text-transform: uppercase;
		letter-spacing: 1.5px;

		/* Estado inicial para animación */
		opacity: 0;
		transform: translateY(30px);
		transition:
			opacity 0.8s ease-out,
			transform 0.8s ease-out;
	}

	.board-section h2:global(.visible) {
		opacity: 1;
		transform: translateY(0);
	}

	.board-subtitle {
		font-size: 32px;
		font-weight: 500;
		color: var(--text-sub);
		text-align: center;
		margin-top: 80px;
		margin-bottom: 20px;
		text-transform: uppercase;
		letter-spacing: 1.2px;

		/* Estado inicial para animación */
		opacity: 0;
		transform: translateY(30px);
		transition:
			opacity 0.8s ease-out,
			transform 0.8s ease-out;
	}

	.board-subtitle:global(.visible) {
		opacity: 1;
		transform: translateY(0);
	}

	.board-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 30px;
		max-width: 1200px;
		margin: 0 auto;
	}

	.board-grid.expresidents {
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		max-width: 800px;
	}

	.board-member {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 30px 20px;
		background: var(--card-bg);
		border-radius: 16px;
		box-shadow: 0 4px 20px var(--card-shadow);
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease,
			opacity 0.8s ease-out,
			transform 0.8s ease-out;

		/* Estado inicial para animación */
		opacity: 0;
		transform: translateY(30px);
	}

	.board-member:global(.visible) {
		opacity: 1;
		transform: translateY(0);
	}

	.board-member:hover {
		transform: translateY(-8px);
		box-shadow: 0 12px 35px var(--card-shadow);
	}

	.board-name {
		font-size: 18px;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 8px;
		line-height: 1.4;
		transition: color 0.3s ease;
	}

	.board-member:hover .board-name {
		color: #4a7ba7;
	}

	:global([data-theme='dark']) .board-member:hover .board-name {
		color: #ffa100;
	}

	.board-role {
		font-size: 14px;
		color: var(--text-primary);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		opacity: 0.75;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.hero-section {
			padding: 60px 30px;
			min-height: 40vh;
		}

		.spacer {
			height: 40vh;
		}

		.hero-section h1 {
			font-size: 40px;
		}

		.hero-description {
			font-size: 18px;
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
			margin-bottom: 40px;
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
			padding: 0;
		}

		.timeline-images {
			height: 180px;
		}

		.timeline-info {
			padding: 18px 20px 22px;
		}

		.timeline-year {
			font-size: 14px;
		}

		.timeline-title {
			font-size: 16px;
			margin-bottom: 10px;
		}

		.timeline-text {
			font-size: 13px;
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
			bottom: 15px;
			right: 15px;
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
			min-height: 35vh;
		}

		.spacer {
			height: 35vh;
		}

		.hero-section h1 {
			font-size: 32px;
		}

		.hero-description {
			font-size: 16px;
		}

		.timeline-section {
			padding: 40px 15px;
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

		.timeline-item,
		.timeline-item:nth-child(odd),
		.timeline-item:nth-child(even) {
			margin-bottom: 30px;
		}

		.timeline-item:nth-child(odd) .timeline-content,
		.timeline-item:nth-child(even) .timeline-content {
			margin-left: 30px;
		}

		.timeline-item:nth-child(odd) .timeline-content::before,
		.timeline-item:nth-child(even) .timeline-content::before {
			left: -40px;
			width: 16px;
			height: 16px;
		}

		.timeline-content {
			padding: 0;
			border-radius: 12px;
		}

		.timeline-images {
			height: 150px;
		}

		.timeline-info {
			padding: 15px 18px 20px;
		}

		.timeline-year {
			font-size: 13px;
		}

		.timeline-title {
			font-size: 15px;
			margin-bottom: 8px;
		}

		.timeline-text {
			font-size: 12px;
			line-height: 1.6;
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
			bottom: 12px;
			right: 12px;
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

		.board-section {
			padding: 40px 20px;
		}

		.board-section h2 {
			font-size: 28px;
			margin-bottom: 30px;
		}

		.board-subtitle {
			font-size: 24px;
			margin-top: 40px;
			margin-bottom: 30px;
		}

		.board-grid {
			grid-template-columns: 1fr;
			gap: 20px;
		}

		.board-grid.expresidents {
			grid-template-columns: 1fr;
		}

		.board-member {
			padding: 25px 15px;
		}

		.board-name {
			font-size: 16px;
		}

		.board-role {
			font-size: 13px;
		}
	}
</style>
