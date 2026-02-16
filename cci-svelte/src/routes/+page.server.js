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

    // Query combinada para los últimos contenidos de cada tipo (ordenados por fecha de creación en Sanity)
    const latestContentQuery = `{
      "posts": *[_type == "post" && !(_id in path("drafts.**"))] | order(_createdAt desc)[0...4] {
        _id,
        _type,
        _createdAt,
        title,
        "slug": slug.current,
        "date": publishedAt,
        category,
        "image": mainImage.asset->url,
        "excerpt": pt::text(body)[0...150]
      },
      "publications": *[_type == "publication" && !(_id in path("drafts.**"))] | order(_createdAt desc)[0...4] {
        _id,
        _type,
        _createdAt,
        title,
        "slug": slug.current,
        "date": publishedAt,
        category,
        "excerpt": description,
        "image": coverImage.asset->url
      },
      "newsletters": *[_type == "newsletter" && !(_id in path("drafts.**"))] | order(_createdAt desc)[0...4] {
        _id,
        _type,
        _createdAt,
        title,
        "slug": slug.current,
        "date": publishedAt,
        category,
        "excerpt": description,
        "image": coverImage.asset->url,
        "pdfUrl": pdfFile.asset->url
      },
      "reports": *[_type == "report" && !(_id in path("drafts.**"))] | order(_createdAt desc)[0...4] {
        _id,
        _type,
        _createdAt,
        title,
        "slug": slug.current,
        "date": year + "-01-01",
        category,
        "excerpt": description,
        "image": coverImage.asset->url
      },
      "regidorReports": *[_type == "regidorReport" && !(_id in path("drafts.**"))] | order(_createdAt desc)[0...4] {
        _id,
        _type,
        _createdAt,
        "title": city + " - " + select(
          periodType == "semester" => select(
            semester == "primer-semestre" => "1er Semestre",
            semester == "segundo-semestre" => "2do Semestre",
            semester
          ) + " " + string(semesterYear),
          periodStartMonth + " - " + periodEndMonth + " " + string(periodEndYear)
        ),
        "slug": _id,
        "date": select(
          periodType == "semester" => string(semesterYear) + "-" + select(semester == "primer-semestre" => "06", "12") + "-01",
          string(periodEndYear) + "-" + select(
            periodEndMonth == "enero" => "01",
            periodEndMonth == "febrero" => "02",
            periodEndMonth == "marzo" => "03",
            periodEndMonth == "abril" => "04",
            periodEndMonth == "mayo" => "05",
            periodEndMonth == "junio" => "06",
            periodEndMonth == "julio" => "07",
            periodEndMonth == "agosto" => "08",
            periodEndMonth == "septiembre" => "09",
            periodEndMonth == "octubre" => "10",
            periodEndMonth == "noviembre" => "11",
            periodEndMonth == "diciembre" => "12",
            "12"
          ) + "-01"
        ),
        "excerpt": pt::text(description)[0...150],
        "image": coverImage.asset->url
      },
      "agendaDocuments": *[_type == "agendaDocument" && !(_id in path("drafts.**"))] | order(_createdAt desc)[0...4] {
        _id,
        _type,
        _createdAt,
        title,
        "slug": _id,
        "date": publishedAt,
        "excerpt": select(type == "informe" => "Informe de Agenda", "Comunicado de Agenda"),
        "image": coverImage.asset->url
      },
      "surveys": *[_type == "survey" && !(_id in path("drafts.**"))] | order(_createdAt desc)[0...4] {
        _id,
        _type,
        _createdAt,
        title,
        "slug": _id,
        "date": publishedAt,
        "excerpt": description,
        "image": coverImage.asset->url
      }
    }`;

    const [allies, carouselData, latestContentData] = await Promise.all([
      client.fetch(alliesQuery),
      client.fetch(carouselQuery),
      client.fetch(latestContentQuery)
    ]);

    // Combinar todos los contenidos, ordenar por fecha de creación en Sanity y tomar los 6 más recientes
    const allContent = [
      ...(latestContentData.posts || []),
      ...(latestContentData.publications || []),
      ...(latestContentData.newsletters || []),
      ...(latestContentData.reports || []),
      ...(latestContentData.regidorReports || []),
      ...(latestContentData.agendaDocuments || []),
      ...(latestContentData.surveys || [])
    ]
      .filter(item => item && item._createdAt)
      .sort((a, b) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime())
      .slice(0, 6);

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