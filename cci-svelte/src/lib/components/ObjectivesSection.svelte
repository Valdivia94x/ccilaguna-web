<script lang="ts">
	let { title }: { title: string } = $props();
</script>

<section id="objetivos" class="objectives-section" aria-labelledby="objectives-heading">
	<h2 id="objectives-heading">{title}</h2>
	<div class="objectives-content">
		<slot />
	</div>
</section>

<style>
	.objectives-section {
		padding: 60px 50px;
		background: var(--bg-objectives);
		text-align: center;
		transition: background 0.3s ease;
	}

	.objectives-section h2 {
		color: #ffa500;
		font-size: 48px;
		font-weight: 400;
		text-transform: uppercase;
		margin-bottom: 40px;
	}

	@media (max-width: 768px) {
		.objectives-section h2 {
			font-size: 36px;
		}
	}
</style>
