// src/routes/blog/+page.server.js
import { client } from '$lib/sanity';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	try {
		// Consulta GROQ para obtener todos los posts del blog
		const posts = await client.fetch(`
			*[_type == "post"] | order(publishedAt desc) {
				_id,
				title,
				slug,
				publishedAt,
				category,
				mainImage {
					asset->{
						_id,
						url
					},
					alt
				}
			}
		`);

		return {
			posts: posts || []
		};
	} catch (error) {
		console.error('Error fetching posts:', error);
		return {
			posts: []
		};
	}
}
