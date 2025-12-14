import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { generateStructuredData } from "~/lib/constants";

interface Photo {
  id: string;
  server: string;
  secret: string;
  title: string;
}

interface PhotosetPageClientProps {
  photos: Photo[];
  photosetTitle: string;
}

export function PhotosetPageClient({
  photos,
  photosetTitle,
}: PhotosetPageClientProps) {
  // Add structured data for SEO
  const structuredData = generateStructuredData("photography");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container flex w-full flex-col items-center py-10">
        <section className="flex w-full flex-col gap-10 py-6">
          <Button className="w-fit font-thin" variant="link" size="none">
            <Link href={"/"}>
              <small>Back to Home</small>
            </Link>
          </Button>
          <h1 className="text-xl font-thin">{photosetTitle}</h1>
        </section>

        <hr className="mb-10 h-[1px] w-full bg-neutral-200" />

        <section className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {photos.map((photo) => (
            <div key={photo.id} className="relative">
              <Image
                src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_c.jpg`}
                alt={`${photo.title || "Photograph"} - ${photosetTitle} collection by Javian Ng`}
                width={300}
                height={300}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
