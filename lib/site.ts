import type { Metadata } from "next";

// Replace NEXT_PUBLIC_SITE_URL in .env.local (and your deployment env) with
// the real production domain before going live — everything else (canonical
// URLs, Open Graph tags, sitemap entries, JSON-LD) derives from this.
export const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const siteName = "Javian Ng | javian.captures";

export const siteTitle = "Javian Ng | javian.captures";

export const siteDescription =
    "Photography portfolio by Javian Ng — landscape, people, and automotive photography.";

export const socialLinks = {
    instagram: "https://www.instagram.com/javian.captures/",
    flickr: "https://www.flickr.com/photos/shotbyjav",
    linkedin: "https://www.linkedin.com/in/javianngzh/",
    website: "https://www.javianng.com",
};

// Next.js doesn't deep-merge `openGraph`/`twitter` objects across segments —
// a page that sets either replaces it wholesale, silently dropping fields
// like type/siteName/card that were only set on the root layout. This helper
// re-declares those shared fields on every page so nothing gets lost.
export function pageMetadata({
    title,
    description,
    path = "/",
}: {
    title?: string;
    description: string;
    path?: string;
}): Metadata {
    const url = `${siteUrl}${path === "/" ? "" : path}`;
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

    return {
        ...(title ? { title } : {}),
        description,
        alternates: { canonical: url },
        openGraph: {
            type: "website",
            url,
            siteName,
            title: fullTitle,
            description,
            images: ["/opengraph-image"],
        },
        twitter: {
            card: "summary_large_image",
            title: fullTitle,
            description,
            images: ["/twitter-image"],
        },
    };
}
