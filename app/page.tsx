import { PhotoGallery } from "@/components/photo-gallery";
import { photos } from "@/lib/photos";
import { Suspense } from "react";

export default function HomePage() {
    return (
        <Suspense>
            <PhotoGallery photos={photos} />
        </Suspense>
    );
}
