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

    // Query para el Carousel
    const carouselQuery = `*[_type == "carousel"][0]{
      images[]{
        descripcion,
        "imageUrl": imagen.asset->url,
        "hotspot": imagen.hotspot
      }
    }`;

    const [allies, carouselData] = await Promise.all([
      client.fetch(alliesQuery),
      client.fetch(carouselQuery)
    ]);

    return {
      allies: allies || [],
      carouselSlides: carouselData?.images || []
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      allies: [],
      carouselSlides: []
    };
  }
}