<script lang="ts">
	interface Boletin {
		id: string;
		slug: string;
		title: string;
		date: string;
		image: string;
		excerpt: string;
		category: 'seguridad' | 'empleo';
		pdfUrl?: string;
		size?: string;
	}

	let { boletin }: { boletin: Boletin } = $props();

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

<article class="boletin-card">
	<a href={boletin.pdfUrl || `/boletines/${boletin.slug}`} class="card-link" target="_blank" rel="noopener noreferrer">
		<div class="card-image">
			<img src={boletin.image} alt={boletin.title} />
			<div class="card-category" class:seguridad={boletin.category === 'seguridad'} class:empleo={boletin.category === 'empleo'}>
				{boletin.category === 'seguridad' ? 'Seguridad' : 'Empleo'}
			</div>
		</div>
		<div class="card-content">
			<time class="card-date" datetime={boletin.date}>
				{formatDate(boletin.date)}
			</time>
			<h3 class="card-title">{boletin.title}</h3>
			<p class="card-excerpt">{boletin.excerpt}</p>
			<span class="read-more">
				Ver PDF {boletin.size ? `(${boletin.size})` : ''}
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
					<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
					<polyline points="15 3 21 3 21 9"></polyline>
					<line x1="10" y1="14" x2="21" y2="3"></line>
				</svg>
			</span>
		</div>
	</a>
</article>

<style>
	.boletin-card {
		background: var(--card-bg);
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 4px 12px var(--card-shadow);
		transition: all 0.3s ease;
	}

	.boletin-card:hover {
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
	}

	.card-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.boletin-card:hover .card-image img {
		transform: scale(1.05);
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
	}

	.card-category.seguridad {
		background: linear-gradient(135deg, #ef4444, #dc2626);
	}

	.card-category.empleo {
		background: linear-gradient(135deg, #10b981, #059669);
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
		color: #3b82f6;
		transition: gap 0.3s ease;
	}

	.boletin-card:hover .read-more {
		gap: 12px;
	}

	.read-more svg {
		transition: transform 0.3s ease;
	}

	.boletin-card:hover .read-more svg {
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
