import { cloudinaryUrl, type Photo } from "@/lib/photos";
import Image from "next/image";

type PhotoCardProps = {
    photo: Photo;
    onClick: () => void;
};

export function PhotoCard({ photo, onClick }: PhotoCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="group relative block w-full overflow-hidden"
            style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
        >
            <Image
                src={cloudinaryUrl(photo.publicId, 1200)}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
            />
        </button>
    );
}
