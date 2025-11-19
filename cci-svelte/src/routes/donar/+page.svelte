<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Footer from '$lib/components/Footer.svelte';

	// Datos de donación (ejemplo - puedes actualizarlos después)
	const donationData = {
		bankInfo: {
			bank: 'Banco Ejemplo',
			accountName: 'Consejo Cívico de las Instituciones, A.C.',
			accountNumber: '1234 5678 9012 3456',
			clabe: '012345678901234567',
			swift: 'BANCMXMM',
			concept: 'Donativo CCI Laguna'
		},
		invoicing: {
			email: 'facturacion@ccilaguna.org.mx',
			rfc: 'CCI-120210-LK7'
		},
		deductible: true
	};
</script>

<svelte:head>
	<title>Donar | Consejo Cívico de Laguna</title>
	<meta
		name="description"
		content="Apoya al CCI Laguna con tu donativo. Tu contribución es deducible de impuestos."
	/>
	<meta name="keywords" content="donar, donativo, apoyo, CCI Laguna" />

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

<main class="donar-page">
	<!-- Hero Section -->
	<section class="hero-section">
		<div class="hero-content">
			<h1>Apoya Nuestra Causa</h1>
			<p class="hero-description">
				Tu donativo nos ayuda a continuar promoviendo la participación ciudadana y desarrollar
				mejores gobiernos en la Comarca Lagunera. Cada aportación cuenta y es deducible de
				impuestos.
			</p>
			{#if donationData.deductible}
				<div class="deductible-badge">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
						<path
							d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
						/>
					</svg>
					<span>Donativo Deducible de Impuestos</span>
				</div>
			{/if}
		</div>
	</section>

	<!-- Información Bancaria -->
	<section class="bank-info-section">
		<h2>Información Bancaria</h2>
		<div class="info-container">
			<div class="info-card">
				<div class="info-icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
						<path
							d="M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160v8c0 13.3 10.7 24 24 24H456c13.3 0 24-10.7 24-24v-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224H64V420.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512H480c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1V224H384V416H344V224H280V416H232V224H168V416H128V224zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
						/>
					</svg>
				</div>
				<h3>Banco</h3>
				<p class="info-value">{donationData.bankInfo.bank}</p>
			</div>

			<div class="info-card">
				<div class="info-icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
						<path
							d="M64 32C28.7 32 0 60.7 0 96v32H576V96c0-35.3-28.7-64-64-64H64zM576 224H0V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V224zM112 352h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16H368c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16z"
						/>
					</svg>
				</div>
				<h3>Número de Cuenta</h3>
				<p class="info-value">{donationData.bankInfo.accountNumber}</p>
			</div>

			<div class="info-card">
				<div class="info-icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
						<path
							d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm64 192c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V256c0-17.7 14.3-32 32-32zm64-64c0-17.7 14.3-32 32-32s32 14.3 32 32V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V160zM320 288c17.7 0 32 14.3 32 32v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V320c0-17.7 14.3-32 32-32z"
						/>
					</svg>
				</div>
				<h3>CLABE Interbancaria</h3>
				<p class="info-value">{donationData.bankInfo.clabe}</p>
			</div>

			<div class="info-card">
				<div class="info-icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor">
						<path
							d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z"
						/>
					</svg>
				</div>
				<h3>Beneficiario</h3>
				<p class="info-value">{donationData.bankInfo.accountName}</p>
			</div>

			<div class="info-card">
				<div class="info-icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor">
						<path
							d="M0 128C0 92.7 28.7 64 64 64H256h48 16H576c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H320 304 256 64c-35.3 0-64-28.7-64-64V128zm320 0V384H576V128H320zM178.3 175.9c-3.2-7.2-10.4-11.9-18.3-11.9s-15.1 4.7-18.3 11.9l-64 144c-4.5 10.1 .1 21.9 10.2 26.4s21.9-.1 26.4-10.2l8.9-20.1h73.6l8.9 20.1c4.5 10.1 16.3 14.6 26.4 10.2s14.6-16.3 10.2-26.4l-64-144zM160 233.2L179 276H141l19-42.8zM448 164c11 0 20 9 20 20v4h44 16c11 0 20 9 20 20s-9 20-20 20h-2l-1.6 4.5c-8.9 24.4-22.4 46.6-39.6 65.4c.9 .6 1.8 1.1 2.7 1.6l18.9 11.3c9.5 5.7 12.5 18 6.9 27.4s-18 12.5-27.4 6.9l-18.9-11.3c-4.5-2.7-8.8-5.5-13.1-8.5c-10.6 7.5-21.9 14-34 19.4l-3.6 1.6c-10.1 4.5-21.9-.1-26.4-10.2s.1-21.9 10.2-26.4l3.6-1.6c6.4-2.9 12.6-6.1 18.5-9.8l-12.2-12.2c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l14.6 14.6 .5 .5c12.4-13.1 22.5-28.3 29.8-45H448 376c-11 0-20-9-20-20s9-20 20-20h52v-4c0-11 9-20 20-20z"
						/>
					</svg>
				</div>
				<h3>SWIFT (Transferencias Internacionales)</h3>
				<p class="info-value">{donationData.bankInfo.swift}</p>
			</div>

			<div class="info-card concept-card">
				<div class="info-icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
						<path
							d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
						/>
					</svg>
				</div>
				<h3>Concepto de Pago</h3>
				<p class="info-value">{donationData.bankInfo.concept}</p>
			</div>
		</div>
	</section>

	<!-- Información de Facturación -->
	<section class="invoicing-section">
		<h2>Facturación</h2>
		<div class="invoicing-container">
			<div class="invoicing-card">
				<div class="invoicing-icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
						<path
							d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"
						/>
					</svg>
				</div>
				<div class="invoicing-content">
					<h3>Correo de Facturación</h3>
					<p class="invoicing-value">
						<a href="mailto:{donationData.invoicing.email}">{donationData.invoicing.email}</a>
					</p>
					<p class="invoicing-note">
						Envía tu comprobante de pago y tus datos fiscales a este correo para recibir tu
						factura.
					</p>
				</div>
			</div>

			<div class="invoicing-card">
				<div class="invoicing-icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor">
						<path
							d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM80 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm54.2 253.8c-6.1 20.3-24.8 34.2-46 34.2H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h8.2c7.1 0 13.3-4.6 15.3-11.4l14.9-49.5c3.4-11.3 13.8-19.1 25.6-19.1s22.2 7.7 25.6 19.1l11.6 38.6c7.4-6.2 16.8-9.7 26.8-9.7c15.9 0 30.4 9 37.5 23.2l4.4 8.8H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-6.1 0-11.6-3.4-14.3-8.8l-8.8-17.7c-1.7-3.4-5.1-5.5-8.8-5.5s-7.2 2.1-8.8 5.5l-8.8 17.7c-2.9 5.9-9.2 9.4-15.7 8.8s-12.1-5.1-13.9-11.3L144 349l-9.8 32.8z"
						/>
					</svg>
				</div>
				<div class="invoicing-content">
					<h3>RFC</h3>
					<p class="invoicing-value">{donationData.invoicing.rfc}</p>
					<p class="invoicing-note">Razón Social: {donationData.bankInfo.accountName}</p>
				</div>
			</div>
		</div>

		<div class="note-box">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
				<path
					d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
				/>
			</svg>
			<div>
				<h4>Importante</h4>
				<p>
					Para obtener tu recibo deducible de impuestos, por favor envía el comprobante de pago junto
					con tus datos fiscales completos (RFC, razón social, código postal, régimen fiscal y uso de
					CFDI) al correo de facturación.
				</p>
			</div>
		</div>
	</section>
</main>

<Footer />

<style>
	.donar-page {
		min-height: calc(100vh - 200px);
	}

	/* Hero Section */
	.hero-section {
		background: linear-gradient(135deg, #e8f4f8 0%, #d4e9f7 100%);
		padding: 80px 50px;
		text-align: center;
		transition: background 0.3s ease;
	}

	:global([data-theme='dark']) .hero-section {
		background: linear-gradient(135deg, #1a2332 0%, #151e2b 100%);
	}

	.hero-content {
		max-width: 900px;
		margin: 0 auto;
	}

	h1 {
		font-size: 56px;
		font-weight: 400;
		color: var(--text-secondary);
		margin-bottom: 30px;
		text-transform: uppercase;
		letter-spacing: 2px;
	}

	.hero-description {
		font-size: 20px;
		line-height: 1.8;
		color: var(--text-primary);
		margin-bottom: 30px;
	}

	.deductible-badge {
		display: inline-flex;
		align-items: center;
		gap: 12px;
		background: linear-gradient(135deg, #4caf50, #45a049);
		color: white;
		padding: 15px 30px;
		border-radius: 50px;
		font-weight: 600;
		font-size: 18px;
		box-shadow: 0 5px 20px rgba(76, 175, 80, 0.3);
	}

	.deductible-badge svg {
		width: 24px;
		height: 24px;
	}

	/* Bank Info Section */
	.bank-info-section {
		padding: 80px 50px;
		background: var(--bg-primary);
		transition: background 0.3s ease;
	}

	.bank-info-section h2 {
		font-size: 42px;
		font-weight: 400;
		color: #4a7ba7;
		text-align: center;
		margin-bottom: 60px;
		text-transform: uppercase;
		letter-spacing: 1.5px;
	}

	:global([data-theme='dark']) .bank-info-section h2 {
		color: #00d4ff;
	}

	.info-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 30px;
		max-width: 1200px;
		margin: 0 auto;
	}

	.info-card {
		background: var(--card-bg);
		padding: 30px;
		border-radius: 15px;
		box-shadow: 0 5px 20px var(--card-shadow);
		transition: all 0.3s ease;
		text-align: center;
	}

	.info-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 30px var(--card-shadow);
	}

	.concept-card {
		grid-column: 1 / -1;
	}

	.info-icon {
		width: 60px;
		height: 60px;
		margin: 0 auto 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #4a7ba7, #2c5f8d);
		border-radius: 50%;
		color: white;
	}

	:global([data-theme='dark']) .info-icon {
		background: linear-gradient(135deg, #00d4ff, #0099cc);
	}

	.info-icon svg {
		width: 30px;
		height: 30px;
	}

	.info-card h3 {
		font-size: 18px;
		font-weight: 600;
		color: var(--text-secondary);
		margin-bottom: 15px;
		text-transform: uppercase;
	}

	.info-value {
		font-size: 20px;
		font-weight: 400;
		color: var(--text-primary);
		font-family: 'Courier New', monospace;
		background: rgba(74, 123, 167, 0.1);
		padding: 10px 15px;
		border-radius: 8px;
		word-break: break-all;
	}

	:global([data-theme='dark']) .info-value {
		background: rgba(0, 212, 255, 0.1);
	}

	/* Invoicing Section */
	.invoicing-section {
		padding: 80px 50px;
		background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
		transition: background 0.3s ease;
	}

	:global([data-theme='dark']) .invoicing-section {
		background: linear-gradient(135deg, #0f1a2a 0%, #1a2838 100%);
	}

	.invoicing-section h2 {
		font-size: 42px;
		font-weight: 400;
		color: #ffa500;
		text-align: center;
		margin-bottom: 60px;
		text-transform: uppercase;
		letter-spacing: 1.5px;
	}

	.invoicing-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 30px;
		max-width: 1000px;
		margin: 0 auto 40px;
	}

	.invoicing-card {
		background: var(--card-bg);
		padding: 35px;
		border-radius: 15px;
		box-shadow: 0 5px 20px var(--card-shadow);
		display: flex;
		gap: 25px;
		align-items: flex-start;
		transition: all 0.3s ease;
	}

	.invoicing-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 30px var(--card-shadow);
	}

	.invoicing-icon {
		width: 60px;
		height: 60px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #ffa500, #ff8c00);
		border-radius: 50%;
		color: white;
	}

	.invoicing-icon svg {
		width: 30px;
		height: 30px;
	}

	.invoicing-content {
		flex: 1;
	}

	.invoicing-content h3 {
		font-size: 20px;
		font-weight: 600;
		color: var(--text-secondary);
		margin-bottom: 12px;
		text-transform: uppercase;
	}

	.invoicing-value {
		font-size: 18px;
		font-weight: 400;
		color: var(--text-primary);
		margin-bottom: 10px;
	}

	.invoicing-value a {
		color: #4a7ba7;
		text-decoration: none;
		transition: color 0.3s ease;
	}

	:global([data-theme='dark']) .invoicing-value a {
		color: #00d4ff;
	}

	.invoicing-value a:hover {
		text-decoration: underline;
	}

	.invoicing-note {
		font-size: 14px;
		color: var(--text-primary);
		opacity: 0.8;
		line-height: 1.5;
	}

	/* Note Box */
	.note-box {
		max-width: 900px;
		margin: 0 auto;
		background: rgba(255, 165, 0, 0.1);
		border-left: 5px solid #ffa500;
		padding: 25px;
		border-radius: 10px;
		display: flex;
		gap: 20px;
		align-items: flex-start;
	}

	.note-box svg {
		width: 30px;
		height: 30px;
		color: #ffa500;
		flex-shrink: 0;
		margin-top: 5px;
	}

	.note-box h4 {
		font-size: 18px;
		font-weight: 400;
		color: var(--text-secondary);
		margin-bottom: 10px;
		text-transform: uppercase;
	}

	.note-box p {
		font-size: 15px;
		color: var(--text-primary);
		line-height: 1.6;
		margin: 0;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.hero-section,
		.bank-info-section,
		.invoicing-section {
			padding: 60px 30px;
		}

		h1 {
			font-size: 40px;
		}

		.hero-description {
			font-size: 18px;
		}

		.deductible-badge {
			font-size: 16px;
			padding: 12px 24px;
		}

		.bank-info-section h2,
		.invoicing-section h2 {
			font-size: 32px;
			margin-bottom: 40px;
		}

		.info-container,
		.invoicing-container {
			grid-template-columns: 1fr;
		}

		.invoicing-card {
			flex-direction: column;
			align-items: center;
			text-align: center;
		}
	}

	@media (max-width: 480px) {
		.hero-section,
		.bank-info-section,
		.invoicing-section {
			padding: 40px 20px;
		}

		h1 {
			font-size: 32px;
		}

		.hero-description {
			font-size: 16px;
		}

		.deductible-badge {
			font-size: 14px;
			padding: 10px 20px;
		}

		.bank-info-section h2,
		.invoicing-section h2 {
			font-size: 28px;
		}

		.info-card,
		.invoicing-card {
			padding: 25px;
		}

		.info-value {
			font-size: 16px;
		}

		.note-box {
			flex-direction: column;
		}
	}
</style>
