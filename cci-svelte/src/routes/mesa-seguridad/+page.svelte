<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Mesa de Seguridad y Justicia de Torreón | Consejo Cívico de Laguna</title>
	<meta
		name="description"
		content="Mesa de Seguridad y Justicia de Torreón"
	/>
</svelte:head>

<Navbar />
<ThemeToggle />

<section class="page-content">
	<div class="container">
		<div class="hero">
			<h1>Mesa de Seguridad y Justicia de Torreón</h1>
		</div>

		<div class="content-section">
			<p>
				Contenido de Mesa de Seguridad y Justicia de Torreón pendiente de agregar.
			</p>
		</div>
	</div>
</section>

<Footer />

<style>
	.page-content {
		background: var(--bg-about);
		min-height: calc(100vh - 200px);
		padding: 80px 20px 60px;
		transition: background 0.3s ease;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.hero {
		text-align: center;
		margin-bottom: 60px;
	}

	.hero h1 {
		color: var(--text-primary);
		font-size: 48px;
		font-weight: 600;
		margin-bottom: 16px;
	}

	.content-section {
		background: var(--card-bg);
		padding: 40px;
		border-radius: 16px;
		box-shadow: 0 4px 12px var(--card-shadow);
	}

	.content-section p {
		color: var(--text-primary);
		font-size: 18px;
		line-height: 1.8;
	}

	@media (max-width: 768px) {
		.hero h1 {
			font-size: 32px;
		}

		.content-section {
			padding: 30px 20px;
		}
	}
</style>
