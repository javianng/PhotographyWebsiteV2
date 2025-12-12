import axios from "axios";
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

interface PhotosetPageProps {
  params: { id: string };
}

// Generate metadata for the photoset page
export async function generateMetadata({
  params,
}: PhotosetPageProps): Promise<Metadata> {
  try {
    const responseInfo = await axios.get<{
      photoset: PhotosetInfo;
    }>(
      `https://www.flickr.com/services/rest/?method=flickr.photosets.getInfo&api_key=521e8b255af8876e8e360b43bc80f910&user_id=185878362@N05&photoset_id=${params.id}&format=json&nojsoncallback=1`,
    );

    const responsePhotos = await axios.get<{
      photoset: { photo: Photo[] };
    }>(
      `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=521e8b255af8876e8e360b43bc80f910&user_id=185878362@N05&photoset_id=${params.id}&format=json&nojsoncallback=1`,
    );

    const title = responseInfo.data.photoset.title._content;
    const photoCount = responsePhotos.data.photoset.photo.length;

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

export default function PhotosetPage({ params }: PhotosetPageProps) {
  return <PhotosetPageClient id={params.id} />;
}
