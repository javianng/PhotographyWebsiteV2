"use client";

import { cloudinaryUrl, type Photo } from "@/lib/photos";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/styles.css";

type LightboxWrapperProps = {
    photos: Photo[];
    index: number | null;
    onClose: () => void;
};

export function LightboxWrapper({ photos, index, onClose }: LightboxWrapperProps) {
    const slides = photos.map((photo) => ({
        src: cloudinaryUrl(photo.publicId, 2400),
        width: photo.width,
        height: photo.height,
        title: photo.caption,
        description: photo.tags.join(" • "),
    }));

    return (
        <Lightbox
            open={index !== null}
            close={onClose}
            index={index ?? 0}
            slides={slides}
            plugins={[Captions]}
        />
    );
}
