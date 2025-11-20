import { client } from '$lib/sanity';

export async function load() {
	try {
		// Query para los LOGOS (Aliados)
		const alliesQuery = `*[_type == "ally"] | order(orderRank asc) {
      _id,
      name,
      logo {
        asset->{
          _id,
          url
        },
        alt
      },
      url
    }`;

		const allies = await client.fetch(alliesQuery);

		return {
			allies: allies || []
		};
	} catch (error) {
		console.error('Error fetching allies:', error);
		return {
			allies: []
		};
	}
}
