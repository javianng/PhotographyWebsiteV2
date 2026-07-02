"use client";

import { FilterBar } from "@/components/filter-bar";
import { LightboxWrapper } from "@/components/lightbox-wrapper";
import { PhotoCard } from "@/components/photo-card";
import { ALL_TAGS, type Photo } from "@/lib/photos";
import { useMemo, useState } from "react";
import Masonry from "react-masonry-css";

type PhotoGalleryProps = {
    photos: Photo[];
};

const breakpointCols = { default: 4, 1024: 3, 768: 2, 640: 1 };

export function PhotoGallery({ photos }: PhotoGalleryProps) {
    const [activeTag, setActiveTag] = useState<string | null>(null);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const filteredPhotos = useMemo(
        () => (activeTag === null ? photos : photos.filter((photo) => photo.tags.includes(activeTag))),
        [photos, activeTag],
    );

    return (
        <div>
            <FilterBar tags={ALL_TAGS} activeTag={activeTag} onTagChange={setActiveTag} />
            <Masonry
                breakpointCols={breakpointCols}
                className="flex w-auto -ml-1 gap-1"
                columnClassName="pl-1 bg-clip-padding"
            >
                {filteredPhotos.map((photo, index) => (
                    <div key={photo.id} className="mb-1">
                        <PhotoCard photo={photo} onClick={() => setLightboxIndex(index)} />
                    </div>
                ))}
            </Masonry>
            <LightboxWrapper
                photos={filteredPhotos}
                index={lightboxIndex}
                onClose={() => setLightboxIndex(null)}
            />
        </div>
    );
}
