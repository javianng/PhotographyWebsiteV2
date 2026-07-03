"use client";

import { LightboxWrapper } from "@/components/lightbox-wrapper";
import { PhotoCard } from "@/components/photo-card";
import { type Photo } from "@/lib/photos";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import Masonry from "react-masonry-css";

type PhotoGalleryProps = {
    photos: Photo[];
};

const breakpointCols = { default: 4, 1024: 3, 768: 2, 640: 1 };

export function PhotoGallery({ photos }: PhotoGalleryProps) {
    const activeTag = useSearchParams().get("tag");
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const filteredPhotos = useMemo(
        () =>
            activeTag === null
                ? photos
                : photos.filter((photo) => photo.tags.includes(activeTag)),
        [photos, activeTag],
    );

    return (
        <>
            <Masonry
                breakpointCols={breakpointCols}
                className="-mb-2 -ml-1 flex w-auto gap-1"
                columnClassName="pl-1 bg-clip-padding"
            >
                {filteredPhotos.map((photo, index) => (
                    <div key={photo.id} className="mb-2">
                        <PhotoCard
                            photo={photo}
                            onClick={() => setLightboxIndex(index)}
                        />
                    </div>
                ))}
            </Masonry>
            <LightboxWrapper
                photos={filteredPhotos}
                index={lightboxIndex}
                onClose={() => setLightboxIndex(null)}
            />
        </>
    );
}
