import { type Metadata } from "next";
import { PhotosetPageClient } from "~/app/photoset/[id]/PhotosetPageClient";
import { generatePhotosetMetadata } from "~/lib/constants";

interface Photo {
  id: string;
  server: string;
  secret: string;
  title: string;
}

interface PhotosetInfo {
  title: {
    _content: string;
  };
}

interface Photoset {
  id: string;
  server: string;
  primary: string;
  secret: string;
  title: {
    _content: string;
  };
}

interface PhotosetPageProps {
  params: Promise<{ id: string }>;
}

// Generate static paths for all photosets at build time
export async function generateStaticParams() {
  try {
    const response = await fetch(
      "https://www.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=521e8b255af8876e8e360b43bc80f910&user_id=185878362@N05&format=json&nojsoncallback=1",
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as {
      photosets: { photoset: Photoset[] };
    };

    return data.photosets.photoset.map((photoset) => ({
      id: photoset.id,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Generate metadata for the photoset page
export async function generateMetadata({
  params,
}: PhotosetPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const responseInfo = await fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photosets.getInfo&api_key=521e8b255af8876e8e360b43bc80f910&user_id=185878362@N05&photoset_id=${id}&format=json&nojsoncallback=1`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );

    const responsePhotos = await fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=521e8b255af8876e8e360b43bc80f910&user_id=185878362@N05&photoset_id=${id}&format=json&nojsoncallback=1`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );

    if (!responseInfo.ok || !responsePhotos.ok) {
      throw new Error("HTTP error while fetching metadata");
    }

    const infoData = (await responseInfo.json()) as {
      photoset: PhotosetInfo;
    };
    const photosData = (await responsePhotos.json()) as {
      photoset: { photo: Photo[] };
    };

    const title = infoData.photoset.title._content;
    const photoCount = photosData.photoset.photo.length;

    return generatePhotosetMetadata(title, photoCount);
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Photography Collection",
      description:
        "Explore stunning street and landscape photography by Javian Ng.",
    };
  }
}

export default async function PhotosetPage({ params }: PhotosetPageProps) {
  const { id } = await params;

  try {
    const responseInfo = await fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photosets.getInfo&api_key=521e8b255af8876e8e360b43bc80f910&user_id=185878362@N05&photoset_id=${id}&format=json&nojsoncallback=1`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );

    const responsePhotos = await fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=521e8b255af8876e8e360b43bc80f910&user_id=185878362@N05&photoset_id=${id}&format=json&nojsoncallback=1`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );

    if (!responseInfo.ok || !responsePhotos.ok) {
      throw new Error("HTTP error while fetching photoset data");
    }

    const infoData = (await responseInfo.json()) as {
      photoset: PhotosetInfo;
    };
    const photosData = (await responsePhotos.json()) as {
      photoset: { photo: Photo[] };
    };

    const photosetTitle = infoData.photoset.title._content;
    const photos = photosData.photoset.photo;

    return <PhotosetPageClient photos={photos} photosetTitle={photosetTitle} />;
  } catch (error) {
    console.error("Error fetching photoset data:", error);
    return (
      <div className="container py-10">
        <p>Error loading photoset. Please try again later.</p>
      </div>
    );
  }
}
