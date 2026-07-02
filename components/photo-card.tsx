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
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/0 to-black/0 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                {photo.tags.length > 0 ? (
                    <span className="text-xs uppercase tracking-wide text-neutral-300">
                        {photo.tags.join(", ")}
                    </span>
                ) : null}
                {photo.caption ? <span className="text-sm text-white">{photo.caption}</span> : null}
            </div>
        </button>
    );
}
