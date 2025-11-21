<script lang="ts">
	interface ContactData {
		address: {
			street: string;
			colony: string;
			city: string;
		};
		phone: string;
		email: string;
		description: string;
		socialMedia: {
			facebook?: string;
			twitter?: string;
			youtube?: string;
		};
	}

	let { contactData }: { contactData: ContactData } = $props();
</script>

<section id="contacto" class="contact-section" aria-labelledby="contact-heading">
	<!-- Título Contacto con banda -->
	<div class="title-section">
		<h2 id="contact-heading" class="contact-title">Contacto</h2>
	</div>

	<p class="contact-description">{contactData.description}</p>

	<div class="contact-info">
		<!-- Dirección -->
		<div class="contact-item">
			<div class="contact-icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor">
					<path
						d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
					/>
				</svg>
			</div>
			<div class="contact-details">
				<h3>Dirección</h3>
				<p>{contactData.address.street}</p>
				<p>{contactData.address.colony}</p>
				<p>{contactData.address.city}</p>
			</div>
		</div>

		<!-- Teléfono -->
		<div class="contact-item">
			<div class="contact-icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor">
					<path
						d="M16 64C16 28.7 44.7 0 80 0H304c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H80c-35.3 0-64-28.7-64-64V64zM144 448c0 8.8 7.2 16 16 16h64c8.8 0 16-7.2 16-16s-7.2-16-16-16H160c-8.8 0-16 7.2-16 16zM304 64H80V384H304V64z"
					/>
				</svg>
			</div>
			<div class="contact-details">
				<h3>Teléfono</h3>
				<p>
					<a href="tel:{contactData.phone.replace('-', '')}">{contactData.phone}</a>
				</p>
			</div>
		</div>

		<!-- E-mail -->
		<div class="contact-item">
			<div class="contact-icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
					<path
						d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
					/>
				</svg>
			</div>
			<div class="contact-details">
				<h3>E-mail</h3>
				<p>
					<a href="mailto:{contactData.email}">{contactData.email}</a>
				</p>
			</div>
		</div>
	</div>

	<!-- Redes sociales -->
	<div class="social-media">
		{#if contactData.socialMedia.facebook}
			<a
				href="https://facebook.com/CCILagunaAc/"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Facebook"
				class="social-link"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="currentColor">
					<path
						d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"
					/>
				</svg>
			</a>
		{/if}
		{#if contactData.socialMedia.twitter}
			<a
				href="https://x.com/CCILagunaAC"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Twitter/X"
				class="social-link"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
					<path
						d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
					/>
				</svg>
			</a>
		{/if}
		{#if contactData.socialMedia.youtube}
			<a
				href="https://www.youtube.com/channel/UC8VbnvNX1Vt1wXxmEI5JCPQ"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="YouTube"
				class="social-link"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
					<path
						d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"
					/>
				</svg>
			</a>
		{/if}
	</div>
</section>

<style>
	.contact-section {
		padding: 40px 50px 100px 50px;
		padding-top: 70px;
		background: var(--bg-about);
		text-align: center;
		transition: background 0.3s ease;
		overflow: visible;
	}

	/* Banda horizontal del título */
	.title-section {
		background: linear-gradient(135deg, #e8f4f8 0%, #d4e9f7 100%);
		height: 80px;
		padding: 5px 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		margin: -70px -50px 40px -50px;
		transition: background 0.3s ease;
		overflow: visible;
	}

	:global([data-theme='dark']) .title-section {
		background: #414a5e;
	}

	.contact-title {
		color: #000000;
		font-size: 42px;
		font-weight: 600;
		text-transform: uppercase;
		margin: 0;
		text-align: center;
		transition: color 0.3s ease;
	}

	:global([data-theme='dark']) .contact-title {
		color: #ffa100;
	}

	.contact-description {
		font-size: 18px;
		color: var(--text-primary);
		max-width: 800px;
		margin: 0 auto 60px;
		line-height: 1.6;
	}

	.contact-info {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 40px;
		max-width: 1200px;
		margin: 0 auto 60px;
	}

	.contact-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		padding: 30px;
		background: var(--card-bg);
		border-radius: 15px;
		box-shadow: 0 5px 20px var(--card-shadow);
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.contact-item:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 30px var(--card-shadow);
	}

	.contact-icon {
		width: 60px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #c9a961, #b89651);
		border-radius: 50%;
		color: white;
	}

	.contact-icon svg {
		width: 30px;
		height: 30px;
	}

	.contact-details {
		text-align: center;
	}

	.contact-details h3 {
		font-size: 22px;
		font-weight: 400;
		color: var(--text-secondary);
		margin-bottom: 10px;
		text-transform: uppercase;
	}

	.contact-details p {
		font-size: 16px;
		color: var(--text-primary);
		margin: 5px 0;
		line-height: 1.6;
	}

	.contact-details a {
		color: var(--text-primary);
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.contact-details a:hover {
		color: #c9a961;
	}

	/* Redes sociales */
	.social-media {
		display: flex;
		justify-content: center;
		gap: 20px;
		margin-top: 40px;
	}

	.social-link {
		width: 50px;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(201, 169, 97, 0.1);
		border-radius: 50%;
		color: var(--text-primary);
		transition: all 0.3s ease;
		text-decoration: none;
	}

	.social-link:hover {
		background: #c9a961;
		color: white;
		transform: translateY(-3px);
		box-shadow: 0 5px 15px rgba(201, 169, 97, 0.3);
	}

	.social-link svg {
		width: 24px;
		height: 24px;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.contact-section {
			padding: 40px 20px;
			padding-top: 60px;
		}

		.title-section {
			padding: 5px 20px;
			margin: -60px -20px 40px -20px;
		}

		.contact-title {
			font-size: 36px;
		}

		.contact-description {
			font-size: 16px;
			margin-bottom: 40px;
		}

		.contact-info {
			grid-template-columns: 1fr;
			gap: 30px;
			margin-bottom: 40px;
		}

		.contact-item {
			padding: 25px;
		}

		.contact-icon {
			width: 50px;
			height: 50px;
		}

		.contact-icon svg {
			width: 25px;
			height: 25px;
		}

		.contact-details h3 {
			font-size: 20px;
		}

		.contact-details p {
			font-size: 15px;
		}

		.social-link {
			width: 45px;
			height: 45px;
		}

		.social-link svg {
			width: 22px;
			height: 22px;
		}
	}

	@media (max-width: 480px) {
		.contact-section {
			padding: 40px 20px;
			padding-top: 50px;
		}

		.title-section {
			padding: 5px 15px;
			margin: -50px -20px 30px -20px;
		}

		.contact-title {
			font-size: 28px;
		}

		.contact-description {
			font-size: 15px;
		}

		.contact-item {
			padding: 20px;
		}

		.social-media {
			gap: 15px;
		}
	}
</style>
