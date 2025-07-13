import { type Metadata } from "next";

export const SITE_CONFIG = {
  name: "shotbyj.av",
  description: "Street landscape photographer capturing moments that often go unnoticed. Every corner holds a story, and every horizon whispers of distant lands waiting to be explored.",
  author: "Javian Ng",
  url: "https://shotbyj.av", // Update this with your actual domain
  navLinks: [
    { href: "/", label: "work" },
    { href: "/about-me", label: "about me" },
  ],
  keywords: ["street photography", "landscape photography", "photography", "Javian Ng", "shotbyj.av"] as string[],
  social: {
    twitter: "@javianng",
    instagram: "@shotbyj.av",
  },
} as const;

export const METADATA: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: SITE_CONFIG.author }],
  creator: SITE_CONFIG.author,
  publisher: SITE_CONFIG.author,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/myself.jpg",
        width: 300,
        height: 300,
        alt: "Javian Ng - Street Landscape Photographer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: ["/myself.jpg"],
    creator: SITE_CONFIG.social.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
};

export const generatePhotosetMetadata = (title: string, photoCount: number): Metadata => ({
  title: title,
  description: `Explore ${photoCount} stunning photographs in "${title}" - A collection of street and landscape photography by Javian Ng.`,
  openGraph: {
    title: title,
    description: `Explore ${photoCount} stunning photographs in "${title}" - A collection of street and landscape photography by Javian Ng.`,
    type: "article",
    images: [
      {
        url: "/myself.jpg",
        width: 300,
        height: 300,
        alt: `${title} - Photography Collection`,
      },
    ],
  },
  twitter: {
    title: title,
    description: `Explore ${photoCount} stunning photographs in "${title}" - A collection of street and landscape photography by Javian Ng.`,
  },
});

export const generateStructuredData = (type: "website" | "person" | "photography") => {
  const baseData = {
    "@context": "https://schema.org",
    "@type": type === "person" ? "Person" : type === "photography" ? "CreativeWork" : "WebSite",
    "name": SITE_CONFIG.name,
    "description": SITE_CONFIG.description,
    "url": SITE_CONFIG.url,
    "author": {
      "@type": "Person",
      "name": SITE_CONFIG.author,
    },
  };

  if (type === "person") {
    return {
      ...baseData,
      "@type": "Person",
      "name": SITE_CONFIG.author,
      "jobTitle": "Street Landscape Photographer",
      "knowsAbout": ["Street Photography", "Landscape Photography", "Photography"],
      "sameAs": [
        `https://twitter.com/${SITE_CONFIG.social.twitter.replace("@", "")}`,
        `https://instagram.com/${SITE_CONFIG.social.instagram.replace("@", "")}`,
        "https://www.javianng.com",
      ],
    };
  }

  if (type === "photography") {
    return {
      ...baseData,
      "@type": "CreativeWork",
      "genre": "Photography",
      "creator": {
        "@type": "Person",
        "name": SITE_CONFIG.author,
      },
    };
  }

  return baseData;
};
