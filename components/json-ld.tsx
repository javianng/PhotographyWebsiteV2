import { siteUrl, socialLinks } from "@/lib/site";

export function JsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        mainEntity: {
            "@type": "Person",
            name: "Javian Ng",
            url: siteUrl,
            jobTitle: "Photographer",
            sameAs: [
                socialLinks.instagram,
                socialLinks.flickr,
                socialLinks.linkedin,
                socialLinks.website,
            ],
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
