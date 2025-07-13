import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "~/lib/constants";

interface Photoset {
    id: string;
    server: string;
    primary: string;
    secret: string;
    title: {
        _content: string;
    };
}

interface FlickrResponse {
    photosets: {
        photoset: Photoset[];
    };
}

async function getPhotosets(): Promise<Photoset[]> {
    try {
        const response = await fetch(
            "https://www.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=521e8b255af8876e8e360b43bc80f910&user_id=185878362@N05&format=json&nojsoncallback=1",
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );
        const data = (await response.json()) as FlickrResponse;
        return data.photosets?.photoset ?? [];
    } catch (error) {
        console.error("Error fetching photosets for sitemap:", error);
        return [];
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const photosets = await getPhotosets();

    const baseUrl = SITE_CONFIG.url;
    const currentDate = new Date().toISOString();

    // Static pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: "weekly" as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/about-me`,
            lastModified: currentDate,
            changeFrequency: "monthly" as const,
            priority: 0.8,
        },
    ];

    // Dynamic photoset pages
    const photosetPages = photosets.map((photoset: Photoset) => ({
        url: `${baseUrl}/photoset/${photoset.id}`,
        lastModified: currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    return [...staticPages, ...photosetPages];
} 