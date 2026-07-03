import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { ALL_TAGS } from "@/lib/photos";
import { siteDescription, siteName, siteTitle, siteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: siteTitle,
        template: `%s | ${siteTitle}`,
    },
    description: siteDescription,
    keywords: [
        "Javian Ng",
        "javian.captures",
        "photography portfolio",
        "photographer",
        ...ALL_TAGS,
    ],
    authors: [{ name: "Javian Ng", url: siteUrl }],
    creator: "Javian Ng",
    publisher: "Javian Ng",
    alternates: {
        canonical: siteUrl,
    },
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        ],
        apple: "/apple-touch-icon.png",
    },
    openGraph: {
        type: "website",
        url: siteUrl,
        siteName,
        title: siteTitle,
        description: siteDescription,
    },
    twitter: {
        card: "summary_large_image",
        title: siteTitle,
        description: siteDescription,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn(
                "h-full",
                "antialiased",
                geistSans.variable,
                geistMono.variable,
                "font-sans",
                inter.variable,
            )}
        >
            <body className="bg-background text-foreground flex min-h-full flex-col px-2">
                <JsonLd />
                <Suspense fallback={null}>
                    <Navbar />
                </Suspense>
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
