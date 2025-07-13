"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { Skeleton } from "~/components/ui/skeleton";
import { generateStructuredData } from "~/lib/constants";

interface Photo {
    id: string;
    server: string;
    secret: string;
    title: string;
}

interface PhotosetInfo {
    title: {
        _content: string;
    };
}

interface PhotosetPageClientProps {
    id: string;
}

export function PhotosetPageClient({ id }: PhotosetPageClientProps) {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [photosetTitle, setPhotosetTitle] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchPhotosetInfo = async () => {
            try {
                const responseInfo = await axios.get<{
                    photoset: PhotosetInfo;
                }>(
                    `https://www.flickr.com/services/rest/?method=flickr.photosets.getInfo&api_key=521e8b255af8876e8e360b43bc80f910&user_id=185878362@N05&photoset_id=${id}&format=json&nojsoncallback=1`,
                );
                setPhotosetTitle(responseInfo.data.photoset.title._content);

                const responsePhotos = await axios.get<{
                    photoset: { photo: Photo[] };
                }>(
                    `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=521e8b255af8876e8e360b43bc80f910&user_id=185878362@N05&photoset_id=${id}&format=json&nojsoncallback=1`,
                );
                setPhotos(responsePhotos.data.photoset.photo);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching photoset info or photos:", error);
            }
        };

        void fetchPhotosetInfo();
    }, [id]);

    const openModal = (imageSrc: string) => {
        setSelectedImage(imageSrc);
        setIsModalOpen(true);
    };

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
                    {loading
                        ? Array.from({ length: 8 }).map((_, index) => (
                            <div
                                key={index}
                                className="aspect-square animate-pulse space-y-2"
                            >
                                <Skeleton className="h-[calc(100%_-_3rem)] w-full bg-gray-300" />
                                <Skeleton className="h-4 w-2/3 bg-gray-300" />
                                <Skeleton className="h-4 w-2/3 bg-gray-300" />
                            </div>
                        ))
                        : photos.map((photo) => (
                            <div
                                key={photo.id}
                                className="relative cursor-pointer"
                                onClick={() =>
                                    openModal(
                                        `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_c.jpg`,
                                    )
                                }
                            >
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

                {selectedImage && (
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogContent className="h-[90vh] max-w-[90vw] border-none bg-transparent shadow-none">
                            <Image
                                src={selectedImage}
                                alt="Selected photograph from photography collection"
                                fill
                                className="object-contain"
                            />
                        </DialogContent>
                    </Dialog>
                )}
            </main>
        </>
    );
} 