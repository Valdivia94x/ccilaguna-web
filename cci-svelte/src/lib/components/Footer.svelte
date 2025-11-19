<script lang="ts">
	import { onMount } from 'svelte';

	let currentYear = $state(new Date().getFullYear());

	onMount(() => {
		currentYear = new Date().getFullYear();
	});

	// Siempre usar la variante oscura del logo
	const logoSrc = '/images/logoOscuro.png';

	// Siempre usar las variantes oscuras de los iconos sociales
	const socialIcons = {
		whatsapp: '/images/icons/whatsappOscuro.svg',
		instagram: '/images/icons/instagramOscuro.svg',
		facebook: '/images/icons/facebookOscuro.svg',
		x: '/images/icons/XOscuro.svg'
	};
</script>

<footer class="footer">
	<div class="footer-container">
		<div class="footer-left">
			<a href="/" class="footer-logo" aria-label="Ir a página principal">
				<img src={logoSrc} alt="Logo CCI Laguna" />
			</a>
			<p class="footer-description">
				El CCI Laguna es una organización de la sociedad civil, apartidista, sin fines de lucro e
				independiente, que busca promover y organizar la participación ciudadana para desarrollar
				buenos gobiernos y mejores ciudadanos en la Comarca Lagunera.
			</p>
			<p class="footer-copyright">&copy; Copyright {currentYear} CCI Laguna</p>
		</div>

		<div class="footer-right">
			<h3 class="footer-title">CONTACTO</h3>
			<div class="footer-info">
				<p class="footer-address">
					C. Río Amazonas 740, Estrella, 27010<br />
					Torreón, Coah.
				</p>
				<p class="footer-phone">
					Teléfono: <a href="tel:+5287871718982">(87) 1718 9825</a>
				</p>
				<p class="footer-email">
					Correo electrónico: <a href="mailto:contacto@ccilaguna.org.mx"
						>contacto@ccilaguna.org.mx</a
					>
				</p>
			</div>

			<div class="footer-social">
				<a
					href="https://wa.me/"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="WhatsApp"
					title="WhatsApp"
				>
					<img src={socialIcons.whatsapp} alt="" />
				</a>
				<a
					href="https://instagram.com/cci_laguna_ac/"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Instagram"
					title="Instagram"
				>
					<img src={socialIcons.instagram} alt="" />
				</a>
				<a
					href="https://facebook.com/CCILagunaAc/"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Facebook"
					title="Facebook"
				>
					<img src={socialIcons.facebook} alt="" />
				</a>
				<a
					href="https://x.com/CCILagunaAC"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="X (Twitter)"
					title="X (Twitter)"
				>
					<img src={socialIcons.x} alt="" />
				</a>
			</div>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: var(--footer-bg, #1a2332);
		color: var(--footer-text, #f8fafc);
		padding: 60px 50px 40px;
		margin-top: 60px;
		transition: all 0.3s ease;
	}

	:global([data-theme='dark']) .footer {
		background: var(--footer-bg-dark, #0f1419);
	}

	.footer-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 60px;
		max-width: 1400px;
		margin: 0 auto;
	}

	.footer-left {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.footer-logo {
		display: inline-block;
		width: fit-content;
	}

	.footer-logo img {
		height: 80px;
		width: auto;
		object-fit: contain;
		transition: transform 0.3s ease;
	}

	.footer-logo:hover img {
		transform: scale(1.05);
	}

	.footer-description {
		font-size: 14px;
		line-height: 1.6;
		color: var(--footer-text-secondary, rgba(248, 250, 252, 0.85));
		margin: 0;
	}

	:global([data-theme='dark']) .footer-description {
		color: var(--footer-text-secondary-dark, rgba(248, 250, 252, 0.7));
	}

	.footer-copyright {
		font-size: 13px;
		color: var(--footer-text-muted, rgba(248, 250, 252, 0.6));
		margin: 0;
		padding-top: 10px;
	}

	:global([data-theme='dark']) .footer-copyright {
		color: var(--footer-text-muted-dark, rgba(248, 250, 252, 0.5));
	}

	.footer-right {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.footer-title {
		font-size: 18px;
		font-weight: 700;
		color: var(--footer-title, #ffffff);
		margin: 0 0 15px 0;
		letter-spacing: 0.5px;
	}

	.footer-info {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.footer-info p {
		font-size: 14px;
		line-height: 1.6;
		color: var(--footer-text-secondary, rgba(248, 250, 252, 0.85));
		margin: 0;
	}

	:global([data-theme='dark']) .footer-info p {
		color: var(--footer-text-secondary-dark, rgba(248, 250, 252, 0.7));
	}

	.footer-info a {
		color: var(--footer-link, #60a5fa);
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.footer-info a:hover {
		color: var(--footer-link-hover, #93c5fd);
		text-decoration: underline;
	}

	:global([data-theme='dark']) .footer-info a {
		color: var(--footer-link-dark, #93c5fd);
	}

	:global([data-theme='dark']) .footer-info a:hover {
		color: var(--footer-link-hover-dark, #bfdbfe);
	}

	.footer-social {
		display: flex;
		gap: 15px;
		margin-top: 15px;
	}

	.footer-social a {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.1);
		transition: all 0.3s ease;
	}

	.footer-social a:hover {
		background: rgba(255, 255, 255, 0.2);
		transform: translateY(-3px);
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
	}

	.footer-social img {
		width: 22px;
		height: 22px;
		object-fit: contain;
	}

	/* Responsive Design */
	@media (max-width: 1024px) {
		.footer {
			padding: 50px 40px 30px;
		}

		.footer-container {
			gap: 50px;
		}
	}

	@media (max-width: 768px) {
		.footer {
			padding: 40px 20px 30px;
		}

		.footer-container {
			grid-template-columns: 1fr;
			gap: 40px;
		}

		.footer-logo img {
			height: 70px;
		}

		.footer-title {
			font-size: 16px;
		}

		.footer-description,
		.footer-info p {
			font-size: 13px;
		}
	}

	@media (max-width: 480px) {
		.footer {
			padding: 30px 15px 25px;
		}

		.footer-container {
			gap: 30px;
		}

		.footer-logo img {
			height: 60px;
		}

		.footer-social {
			gap: 12px;
		}

		.footer-social a {
			width: 36px;
			height: 36px;
		}

		.footer-social img {
			width: 20px;
			height: 20px;
		}
	}
</style>
