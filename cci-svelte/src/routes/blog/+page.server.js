// src/routes/blog/+page.server.js
import { client } from '$lib/sanity';

const ITEMS_PER_PAGE = 9;

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	try {
		const page = parseInt(url.searchParams.get('page') || '1');
		const category = url.searchParams.get('category') || '';
		const search = url.searchParams.get('search') || '';
		const offset = (page - 1) * ITEMS_PER_PAGE;

		// Construir filtros dinámicamente
		let filters = '_type == "post"';
		if (category) {
			filters += ` && category == "${category}"`;
		}
		if (search) {
			filters += ` && title match "*${search}*"`;
		}

		// Consulta GROQ para obtener posts con paginación y filtros
		const query = `{
			"posts": *[${filters}] | order(publishedAt desc) [$offset...$limit] {
				_id,
				title,
				slug,
				author,
				publishedAt,
				category,
				body,
				mainImage {
					asset->{
						_id,
						url
					},
					alt
				}
			},
			"total": count(*[${filters}]),
			"categories": array::unique(*[_type == "post"].category)
		}`;

		const { posts, total, categories } = await client.fetch(query, {
			offset,
			limit: offset + ITEMS_PER_PAGE
		});

		// Filtrar categorías nulas y ordenar
		const validCategories = (categories || []).filter((c) => c != null).sort();

		const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

		return {
			posts: posts || [],
			pagination: {
				currentPage: page,
				totalPages,
				totalItems: total,
				hasNextPage: page < totalPages,
				hasPrevPage: page > 1
			},
			selectedCategory: category,
			selectedSearch: search,
			categories: validCategories
		};
	} catch (error) {
		console.error('Error fetching posts:', error);
		return {
			posts: [],
			pagination: {
				currentPage: 1,
				totalPages: 1,
				totalItems: 0,
				hasNextPage: false,
				hasPrevPage: false
			},
			selectedCategory: '',
			selectedSearch: '',
			categories: []
		};
	}
}
