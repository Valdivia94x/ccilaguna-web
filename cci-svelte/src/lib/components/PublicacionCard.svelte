<script lang="ts">
	interface Publicacion {
		id: string;
		slug?: string;
		title: string;
		date: string;
		image: string;
		excerpt: string;
		category: string;
		pdfUrl?: string;
		size?: string;
	}

	let { publicacion }: { publicacion: Publicacion } = $props();

	// Mapeo de categorías (value -> display)
	const categoryLabels: Record<string, string> = {
		estudios: 'Estudios',
		investigaciones: 'Investigaciones',
		reportes: 'Reportes',
		documentos: 'Documentos',
		analisis: 'Análisis'
	};

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

<article class="publicacion-card">
	<a
		href={publicacion.pdfUrl || `/publicaciones/${publicacion.slug || publicacion.id}`}
		class="card-link"
		target={publicacion.pdfUrl ? '_blank' : undefined}
		rel={publicacion.pdfUrl ? 'noopener noreferrer' : undefined}
	>
		<div class="card-image">
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
			<div class="card-category">
				{categoryLabels[publicacion.category] || publicacion.category}
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
			<time class="card-date" datetime={publicacion.date}>
				{formatDate(publicacion.date)}
			</time>
			<h3 class="card-title">{publicacion.title}</h3>
			<p class="card-excerpt">{publicacion.excerpt}</p>
			<span class="read-more">
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
