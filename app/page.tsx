import { PhotoGallery } from "@/components/photo-gallery";
import { photos } from "@/lib/photos";

export default function HomePage() {
    return (
        <section>
            <PhotoGallery photos={photos} />
        </section>
    );
}
