import { PhotoGallery } from "@/components/photo-gallery";
import { photos } from "@/lib/photos";
import { pageMetadata } from "@/lib/site";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = pageMetadata({
    description:
        "Browse the full photography portfolio of Javian Ng — landscape, people, and automotive photography.",
    path: "/",
});

export default function HomePage() {
    return (
        <Suspense>
            <h1 className="sr-only">Javian Ng — Photography Portfolio</h1>
            <PhotoGallery photos={photos} />
        </Suspense>
    );
}
