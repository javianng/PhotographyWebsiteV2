"use client";

import { cloudinaryUrl, type Photo } from "@/lib/photos";
import { useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type LightboxWrapperProps = {
    photos: Photo[];
    index: number | null;
    onClose: () => void;
};

export function LightboxWrapper({
    photos,
    index,
    onClose,
}: LightboxWrapperProps) {
    const open = index !== null;

    useEffect(() => {
        if (!open) return;

        const handleContextMenu = (e: MouseEvent) => {
            if (
                e.target instanceof Element &&
                e.target.closest(".yarl__slide")
            ) {
                e.preventDefault();
            }
        };

        document.addEventListener("contextmenu", handleContextMenu);
        return () =>
            document.removeEventListener("contextmenu", handleContextMenu);
    }, [open]);

    const slides = photos.map((photo) => ({
        src: cloudinaryUrl(photo.publicId, 2400),
        width: photo.width,
        height: photo.height,
    }));

    return (
        <Lightbox
            open={open}
            close={onClose}
            index={index ?? 0}
            slides={slides}
        />
    );
}
