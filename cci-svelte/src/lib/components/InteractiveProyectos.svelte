<script lang="ts">
	interface HotspotArea {
		id: string;
		href: string;
		x: number; // Posición X en porcentaje
		y: number; // Posición Y en porcentaje
		width: number; // Ancho en porcentaje
		height: number; // Alto en porcentaje
		title: string;
		external?: boolean;
		image?: string;
		clipPath?: string;
		description?: string;
	}

	// Definir las 10 áreas interactivas (ajustar coordenadas según la posición real en el SVG)
	const hotspots: HotspotArea[] = [
		{
			id: 'hotspot_home',
			href: '/',
			x: 34.2,
			y: 34.6,
			width: 32.3,
			height: 32.3,
			title: 'CCI Laguna',
			image: '/images/proyectos/CCI-central.png',
			clipPath: 'circle(50% at 50% 50%)',
			description: 'Organización ciudadana que promueve la participación cívica y transparencia'
		},
		{
			id: 'hotspot_midlag',
			href: '/midlag',
			x: 12.7,
			y: 3.5,
			width: 27.9,
			height: 27.9,
			title: 'MIDLag',
			image: '/images/proyectos/midlag-hotspot.png',
			clipPath:
				'polygon(2.03% 49.80%, 1.78% 52.64%, 4.22% 56.69%, 55.23% 96.59%, 60.83% 98.62%, 65.53% 97.16%, 76.72% 87.92%, 95.70% 75.67%, 97.57% 71.37%, 97.65% 68.13%, 76.80% 5.68%, 76.07% 4.14%, 73.97% 2.27%, 70.56% 0.73%, 66.75% 0.81%, 58.64% 4.46%, 33.66% 18.41%, 25.06% 24.98%, 9.73% 39.01%, 3.65% 45.66%, 2.03% 49.80%)',
			description: 'Municipio Inteligente Digital - Plataforma de datos abiertos'
		},
		{
			id: 'hotspot_observatorio',
			href: 'https://observatoriodelalaguna.org.mx/',
			x: 36.5,
			y: -1,
			width: 26.5,
			height: 26.5,
			title: 'Observatorio de la Laguna',
			external: true,
			image: '/images/proyectos/observatorio-hotspot.png',
			clipPath:
				'polygon(0.81% 18.57%, 1.46% 23.20%, 22.63% 89.54%, 26.60% 94.97%, 31.39% 96.43%, 47.61% 95.05%, 72.59% 95.62%, 77.86% 92.05%, 78.99% 90.02%, 99.11% 18.90%, 98.05% 14.44%, 95.38% 10.79%, 91.57% 9.08%, 73.64% 6.57%, 56.20% 5.11%, 43.96% 5.19%, 27.33% 7.14%, 8.52% 10.62%, 6.41% 11.52%, 2.11% 14.84%, 1.22% 16.14%, 0.81% 18.57%)',
			description: 'Análisis y seguimiento de indicadores de seguridad ciudadana'
		},
		{
			id: 'hotspot_mesa',
			href: '/mesa-seguridad',
			x: 59.6,
			y: 4.1,
			width: 27.5,
			height: 27.5,
			title: 'Mesa de Seguridad y Justicia',
			image: '/images/proyectos/mesa-hotspot.png',
			clipPath:
				'polygon(1.95% 67.96%, 2.03% 74.37%, 5.03% 78.18%, 17.92% 85.48%, 36.33% 99.03%, 42.34% 99.19%, 44.28% 98.30%, 96.84% 55.39%, 98.54% 51.34%, 98.46% 47.04%, 96.51% 43.71%, 86.05% 33.90%, 70.15% 20.68%, 63.58% 16.22%, 52.15% 9.89%, 36.98% 2.60%, 30.98% 0.65%, 26.12% 0.81%, 24.41% 1.38%, 21.49% 5.11%, 1.95% 67.96%)',
			description: 'Espacio de coordinación para mejorar la seguridad en Torreón'
		},
		{
			id: 'hotspot_karewa',
			href: 'https://www.karewalaguna.org/select-organization?redirectTo=%2F',
			x: 67.8,
			y: 60.4,
			width: 28,
			height: 28,
			title: 'Karewa Laguna',
			external: true,
			image: '/images/proyectos/karewa-hotspot.png',
			clipPath:
				'polygon(0.65% 36.01%, 0.97% 42.74%, 43.71% 96.67%, 47.77% 98.46%, 51.99% 98.46%, 55.31% 96.51%, 66.91% 84.43%, 77.53% 72.02%, 83.70% 63.42%, 92.30% 47.85%, 98.05% 35.93%, 99.27% 32.44%, 99.27% 26.36%, 97.16% 23.44%, 94.00% 21.65%, 32.44% 1.54%, 26.03% 1.54%, 21.82% 5.03%, 14.68% 17.27%, 0.65% 36.01%)',
			description: 'Liderazgo juvenil y empoderamiento ciudadano'
		},
		{
			id: 'hotspot_labor',
			href: '/labor-civica',
			x: 50.08,
			y: 71.8,
			width: 28,
			height: 28,
			title: 'Labor Cívica',
			image: '/images/proyectos/laborCivica-hotspot.png',
			clipPath:
				'polygon(7.30% 21.17%, 6.89% 22.55%, 11.92% 91.65%, 14.27% 95.13%, 16.87% 97.08%, 19.14% 97.81%, 21.57% 97.73%, 33.01% 95.46%, 51.50% 90.67%, 62.12% 87.02%, 78.10% 79.16%, 92.05% 71.13%, 94.97% 68.61%, 97.57% 64.56%, 97.57% 60.99%, 95.54% 57.02%, 56.12% 6.00%, 51.01% 2.51%, 45.90% 2.84%, 32.04% 9.33%, 10.71% 16.46%, 7.30% 21.17%)',
			description: 'Fortalecimiento de la cultura cívica y participación ciudadana'
		},
		{
			id: 'hotspot_regidor',
			href: '/regidor-mx',
			x: 24.8,
			y: 73.1,
			width: 27,
			height: 27,
			title: 'Regidor MX Laguna',
			image: '/images/proyectos/regidor-hotspot.png',
			clipPath:
				'polygon(2.84% 66.75%, 2.68% 70.64%, 3.24% 73.07%, 4.70% 75.99%, 6.41% 77.37%, 18.41% 82.81%, 40.15% 90.84%, 57.10% 94.73%, 78.75% 97.24%, 87.75% 97.49%, 93.51% 95.30%, 94.89% 94.00%, 96.35% 89.29%, 93.03% 19.22%, 90.75% 13.30%, 86.29% 10.54%, 70.72% 7.79%, 47.61% 1.05%, 41.61% 3.00%, 39.90% 4.62%, 2.84% 66.75%)',
			description: 'Seguimiento y evaluación del desempeño de regidores'
		},
		{
			id: 'hotspot_agenda',
			href: '/agenda-anticorrupcion',
			x: 73.4,
			y: 37.5,
			width: 27,
			height: 27,
			title: 'Agenda Anticorrupción',
			image: '/images/proyectos/agenda-hotspot.png',
			clipPath:
				'polygon(4.20% 29.80%, 4.60% 71.60%, 8.60% 78.00%, 80.60% 99.00%, 85.40% 98.00%, 89.40% 94.80%, 92.80% 77.20%, 94.80% 44.60%, 90.00% 11.00%, 85.40% 2.60%, 77.80% 1.60%, 10.80% 22.60%, 5.40% 26.40%, 4.20% 29.80%)',
			description: 'Estrategias locales contra la corrupción y la impunidad'
		},
		{
			id: 'hotspot_tableros',
			href: 'https://www.oics.ccilaguna.org.mx/',
			x: 6,
			y: 62,
			width: 28,
			height: 28,
			title: 'Tableros OICS',
			external: true,
			image: '/images/proyectos/tablero-hotspot.png',
			clipPath:
				'polygon(1.70% 32.68%, 2.03% 36.50%, 5.68% 43.47%, 21.90% 68.53%, 34.31% 81.91%, 47.28% 93.84%, 51.18% 96.35%, 55.56% 97.49%, 57.34% 97.40%, 61.15% 94.73%, 97.24% 41.93%, 98.95% 36.17%, 97.24% 31.55%, 87.35% 21.09%, 74.13% 3.24%, 68.78% 1.46%, 67.07% 1.54%, 5.43% 26.60%, 3.00% 29.28%, 1.70% 32.68%)',
			description: 'Indicadores de corrupción y sistema local anticorrupción'
		},
		{
			id: 'hotspot_monitor',
			href: 'https://monitorcpc.ccilaguna.org.mx/',
			x: 0.1,
			y: 40.2,
			width: 27,
			height: 27,
			title: 'Monitor CPC',
			external: true,
			image: '/images/proyectos/monitor-hotspot.png',
			clipPath:
				'polygon(6.20% 35.00%, 6.40% 55.00%, 9.20% 72.60%, 13.60% 91.00%, 19.00% 97.20%, 24.60% 97.20%, 90.00% 73.00%, 95.40% 68.20%, 96.20% 63.00%, 94.00% 46.00%, 93.60% 24.00%, 88.60% 18.20%, 16.60% 1.80%, 10.60% 4.80%, 8.80% 8.40%, 6.20% 35.00%)',
			description: 'Monitoreo ciudadano del Comité de Participación Ciudadana'
		}
	];
</script>

<section class="proyectos-interactive">
	<div class="svg-container">
		<img src="/images/proyectosGroup.svg" alt="Proyectos CCI Laguna" />

		<!-- Áreas interactivas superpuestas -->
		{#each hotspots as hotspot}
			{#if hotspot.external}
				<a
					href={hotspot.href}
					target="_blank"
					rel="noopener noreferrer"
					class="area-interactiva"
					style="left: {hotspot.x}%; top: {hotspot.y}%; width: {hotspot.width}%; height: {hotspot.height}%;"
					title={hotspot.title}
					aria-label={hotspot.title}
				>
					{#if hotspot.image}
						<img
							src={hotspot.image}
							alt={hotspot.title}
							class="hotspot-image"
							style={hotspot.clipPath ? `clip-path: ${hotspot.clipPath};` : ''}
						/>
						{#if hotspot.description}
							<div class="info-card">
								<h3 class="info-title">{hotspot.title}</h3>
								<p class="info-description">{hotspot.description}</p>
							</div>
						{/if}
					{:else}
						<span class="hotspot-overlay"></span>
					{/if}
				</a>
			{:else}
				<a
					href={hotspot.href}
					class="area-interactiva"
					style="left: {hotspot.x}%; top: {hotspot.y}%; width: {hotspot.width}%; height: {hotspot.height}%;"
					title={hotspot.title}
					aria-label={hotspot.title}
				>
					{#if hotspot.image}
						<img
							src={hotspot.image}
							alt={hotspot.title}
							class="hotspot-image"
							style={hotspot.clipPath ? `clip-path: ${hotspot.clipPath};` : ''}
						/>
						{#if hotspot.description}
							<div class="info-card">
								<h3 class="info-title">{hotspot.title}</h3>
								<p class="info-description">{hotspot.description}</p>
							</div>
						{/if}
					{:else}
						<span class="hotspot-overlay"></span>
					{/if}
				</a>
			{/if}
		{/each}
	</div>
</section>

<style>
	.proyectos-interactive {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
	}

	.svg-container {
		position: relative;
		width: 100%;
		max-width: 100%;
		aspect-ratio: 1 / 1;
	}

	.svg-container img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		display: block;
	}

	.area-interactiva {
		position: absolute;
		display: block;
		cursor: pointer;
		transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
		border-radius: 50%;
		overflow: visible;
	}

	.hotspot-image {
		width: 100%;
		height: 100%;
		object-fit: contain;
		transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
		filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
	}

	.hotspot-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 123, 255, 0);
		border: 2px solid transparent;
		border-radius: 50%;
		transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
		pointer-events: none;
	}

	.area-interactiva:hover .hotspot-image {
		transform: scale(1.3);
		filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2)) brightness(1.05);
	}

	.area-interactiva:hover .hotspot-overlay {
		background: rgba(0, 123, 255, 0.15);
		border-color: rgba(0, 123, 255, 0.5);
		box-shadow: 0 0 20px rgba(0, 123, 255, 0.3);
	}

	.area-interactiva:hover {
		z-index: 10;
	}

	.area-interactiva:focus {
		outline: 3px solid rgba(0, 123, 255, 0.6);
		outline-offset: 2px;
	}

	.info-card {
		position: absolute;
		left: calc(100% + 20px);
		top: 50%;
		transform: translateY(-50%) translateX(-10px);
		background: var(--card-bg);
		padding: 16px 20px;
		border-radius: 12px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
		min-width: 220px;
		max-width: 280px;
		opacity: 0;
		visibility: hidden;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		pointer-events: none;
		z-index: 100;
		border: 1px solid var(--border-color, rgba(0, 0, 0, 0.1));
	}

	.area-interactiva:hover .info-card {
		opacity: 1;
		visibility: visible;
		transform: translateY(-50%) translateX(0);
	}

	.info-title {
		color: var(--text-primary);
		font-size: 16px;
		font-weight: 600;
		margin: 0 0 8px 0;
		line-height: 1.3;
	}

	.info-description {
		color: var(--text-primary);
		opacity: 0.85;
		font-size: 13px;
		line-height: 1.5;
		margin: 0;
	}

	@media (max-width: 768px) {
		.proyectos-interactive {
			padding: 10px;
		}

		.area-interactiva:hover .hotspot-image {
			transform: scale(1.04);
		}

		.info-card {
			left: 50%;
			top: auto;
			bottom: calc(100% + 10px);
			transform: translateX(-50%) translateY(10px);
			min-width: 200px;
			max-width: 250px;
			padding: 12px 16px;
		}

		.area-interactiva:hover .info-card {
			transform: translateX(-50%) translateY(0);
		}

		.info-title {
			font-size: 14px;
			margin-bottom: 6px;
		}

		.info-description {
			font-size: 11px;
		}
	}
</style>
