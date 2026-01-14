<script lang="ts">
	interface Documento {
		id: string;
		slug?: string;
		title: string;
		date: string;
		year?: number;
		image: string;
		excerpt: string;
		category: string;
		documentType?: 'publicacion' | 'informe' | 'encuesta';
		pdfUrl?: string;
		size?: string;
		pages?: number | string;
	}

	let { publicacion }: { publicacion: Documento } = $props();

	// Mapeo de categorías (value -> display)
	const categoryLabels: Record<string, string> = {
		estudios: 'Estudios',
		investigaciones: 'Investigaciones',
		reportes: 'Reportes',
		documentos: 'Documentos',
		analisis: 'Análisis',
		informe: 'Informe'
	};

	// Determinar si es un informe
	let isInforme = $derived(publicacion.documentType === 'informe');

	// Formatear fecha
	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleDateString('es-MX', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<article class="publicacion-card" class:informe-card={isInforme}>
	<a
		href={publicacion.pdfUrl || `/publicaciones/${publicacion.slug || publicacion.id}`}
		class="card-link"
		target={publicacion.pdfUrl ? '_blank' : undefined}
		rel={publicacion.pdfUrl ? 'noopener noreferrer' : undefined}
	>
		<div class="card-image" class:informe-image={isInforme}>
			{#if publicacion.image}
				<img src={publicacion.image} alt={publicacion.title} />
			{:else}
				<div class="placeholder-image">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
					>
						<path
							d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/>
					</svg>
				</div>
			{/if}
			<!-- Badge: Año para informes, Categoría para publicaciones -->
			<div class="card-category" class:year-badge={isInforme}>
				{#if isInforme && publicacion.year}
					{publicacion.year}
				{:else}
					{categoryLabels[publicacion.category] || publicacion.category}
				{/if}
			</div>
			{#if publicacion.size}
				<div class="card-size">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
						<polyline points="14 2 14 8 20 8" />
					</svg>
					{publicacion.size}
				</div>
			{/if}
		</div>
		<div class="card-content">
			<!-- Fecha para publicaciones, Páginas para informes -->
			{#if isInforme}
				{#if publicacion.pages && publicacion.pages !== 'N/A'}
					<span class="card-meta">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
							<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
						</svg>
						{publicacion.pages} páginas
					</span>
				{/if}
			{:else}
				<time class="card-date" datetime={publicacion.date}>
					{formatDate(publicacion.date)}
				</time>
			{/if}
			<h3 class="card-title">{publicacion.title}</h3>
			<p class="card-excerpt">{publicacion.excerpt}</p>
			<span class="read-more">
				{#if isInforme}
					Descargar PDF
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
						<polyline points="7 10 12 15 17 10"></polyline>
						<line x1="12" y1="15" x2="12" y2="3"></line>
					</svg>
				{:else}
					{publicacion.pdfUrl ? 'Ver documento' : 'Leer más'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<line x1="5" y1="12" x2="19" y2="12"></line>
						<polyline points="12 5 19 12 12 19"></polyline>
					</svg>
				{/if}
			</span>
		</div>
	</a>
</article>

<style>
	.publicacion-card {
		background: var(--card-bg);
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 4px 12px var(--card-shadow);
		transition: all 0.3s ease;
	}

	.publicacion-card:hover {
		transform: translateY(-8px);
		box-shadow: 0 8px 24px var(--card-shadow);
	}

	.card-link {
		text-decoration: none;
		color: inherit;
		display: block;
	}

	.card-image {
		position: relative;
		width: 100%;
		height: 220px;
		overflow: hidden;
		background: var(--bg-primary);
	}

	.card-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.publicacion-card:hover .card-image img {
		transform: scale(1.05);
	}

	.placeholder-image {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, rgba(74, 123, 167, 0.1) 0%, rgba(74, 123, 167, 0.05) 100%);
	}

	.placeholder-image svg {
		width: 64px;
		height: 64px;
		color: var(--text-primary);
		opacity: 0.3;
	}

	:global([data-theme='dark']) .placeholder-image {
		background: linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(0, 212, 255, 0.05) 100%);
	}

	.card-category {
		position: absolute;
		top: 15px;
		right: 15px;
		padding: 6px 15px;
		border-radius: 20px;
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: white;
		background: linear-gradient(135deg, #4a7ba7, #2c5f8d);
	}

	:global([data-theme='dark']) .card-category {
		background: linear-gradient(135deg, #00d4ff, #0099cc);
	}

	/* Year badge para informes */
	.card-category.year-badge {
		background: linear-gradient(135deg, #f59e0b, #d97706);
		font-size: 16px;
		font-weight: 700;
		padding: 8px 18px;
	}

	:global([data-theme='dark']) .card-category.year-badge {
		background: linear-gradient(135deg, #fbbf24, #f59e0b);
	}

	.card-size {
		position: absolute;
		bottom: 15px;
		left: 15px;
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 6px 12px;
		border-radius: 20px;
		font-size: 11px;
		font-weight: 600;
		color: white;
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(4px);
	}

	.card-size svg {
		width: 14px;
		height: 14px;
	}

	.card-content {
		padding: 25px;
	}

	.card-date {
		display: block;
		font-size: 13px;
		color: var(--text-primary);
		opacity: 0.6;
		margin-bottom: 12px;
		font-weight: 500;
	}

	/* Meta info para informes (páginas) */
	.card-meta {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 13px;
		color: var(--text-primary);
		opacity: 0.6;
		margin-bottom: 12px;
		font-weight: 500;
	}

	.card-meta svg {
		width: 16px;
		height: 16px;
	}

	/* Estilos específicos para informes */
	.informe-card {
		border: 2px solid transparent;
		transition: all 0.3s ease, border-color 0.3s ease;
	}

	.informe-card:hover {
		border-color: rgba(245, 158, 11, 0.3);
	}

	:global([data-theme='dark']) .informe-card:hover {
		border-color: rgba(251, 191, 36, 0.3);
	}

	.informe-image {
		height: 280px;
	}

	.card-title {
		font-size: 20px;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 12px;
		line-height: 1.4;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.card-excerpt {
		font-size: 15px;
		line-height: 1.6;
		color: var(--text-primary);
		opacity: 0.75;
		margin-bottom: 20px;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.read-more {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 14px;
		font-weight: 600;
		color: #4a7ba7;
		transition: gap 0.3s ease;
	}

	:global([data-theme='dark']) .read-more {
		color: #00d4ff;
	}

	.publicacion-card:hover .read-more {
		gap: 12px;
	}

	.read-more svg {
		transition: transform 0.3s ease;
	}

	.publicacion-card:hover .read-more svg {
		transform: translateX(4px);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.card-image {
			height: 200px;
		}

		.card-content {
			padding: 20px;
		}

		.card-title {
			font-size: 18px;
		}

		.card-excerpt {
			font-size: 14px;
		}
	}
</style>
