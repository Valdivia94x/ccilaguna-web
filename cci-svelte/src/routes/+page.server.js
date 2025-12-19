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

    // Query combinada para los últimos contenidos de cada tipo
    const latestContentQuery = `{
      "posts": *[_type == "post"] | order(publishedAt desc)[0...4] {
        _id,
        _type,
        title,
        "slug": slug.current,
        "date": publishedAt,
        category,
        "image": mainImage.asset->url,
        "excerpt": pt::text(body)[0...150]
      },
      "publications": *[_type == "publication"] | order(publishedAt desc)[0...4] {
        _id,
        _type,
        title,
        "slug": slug.current,
        "date": publishedAt,
        category,
        "excerpt": description,
        "image": coverImage.asset->url
      },
      "newsletters": *[_type == "newsletter"] | order(publishedAt desc)[0...4] {
        _id,
        _type,
        title,
        "slug": slug.current,
        "date": publishedAt,
        category,
        "excerpt": description,
        "image": coverImage.asset->url
      },
      "reports": *[_type == "report"] | order(year desc)[0...4] {
        _id,
        _type,
        title,
        "slug": slug.current,
        "date": year + "-01-01",
        category,
        "excerpt": description,
        "image": coverImage.asset->url
      }
    }`;

    const [allies, carouselData, latestContentData] = await Promise.all([
      client.fetch(alliesQuery),
      client.fetch(carouselQuery),
      client.fetch(latestContentQuery)
    ]);

    // Combinar todos los contenidos, ordenar por fecha y tomar los 4 más recientes
    const allContent = [
      ...(latestContentData.posts || []),
      ...(latestContentData.publications || []),
      ...(latestContentData.newsletters || []),
      ...(latestContentData.reports || [])
    ]
      .filter(item => item && item.date)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4);

    return {
      allies: allies || [],
      carouselSlides: carouselData?.images || [],
      latestContent: allContent
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      allies: [],
      carouselSlides: [],
      latestContent: []
    };
  }
}