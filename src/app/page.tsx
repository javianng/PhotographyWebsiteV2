import Image from "next/image";
import Link from "next/link";
import { generateStructuredData } from "~/lib/constants";

interface Photoset {
  id: string;
  server: string;
  primary: string;
  secret: string;
  title: {
    _content: string;
  };
}

export default async function Home() {
  let photosets: Photoset[] = [];

  try {
    // Fetch the photosets (albums) server-side with Next.js fetch caching
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
    photosets = data.photosets.photoset;
  } catch (error) {
    console.error("Error fetching photosets:", error);
  }

  // Add structured data for SEO
  const structuredData = generateStructuredData("photography");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="just container flex flex-col items-center py-10">
        <section className="flex w-2/3 flex-col items-center gap-3 py-6">
          <h1 className="text-xl">Street Landscape Photographer</h1>
          <p className="text-justify text-sm font-thin">
            Wandering through the streets and capturing moments that often go
            unnoticed. Every corner holds a story, and every horizon whispers of
            distant lands waiting to be explored.
          </p>
        </section>

        <hr className="mb-10 h-px w-full bg-neutral-200" />

        <section className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {photosets.map((set) => (
            <Link
              key={set.id}
              href={`/photoset/${set.id}`}
              className="group overflow-clip rounded-sm shadow-sm"
            >
              <div className="relative">
                <Image
                  src={`https://live.staticflickr.com/${set.server}/${set.primary}_${set.secret}_c.jpg`}
                  alt={`${set.title._content} - Photography collection by Javian Ng`}
                  width={500}
                  height={500}
                  className="aspect-square object-cover object-center"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black opacity-0 transition-opacity duration-200 group-hover:opacity-70">
                  <h2 className="pt-4 font-thin text-white">
                    {set.title._content}
                  </h2>
                  <small className="font-thin text-white">view album</small>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}
