import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
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
    title: {
        default: "Javian Ng — Photography",
        template: "%s — Javian Ng",
    },
    description: "Photography portfolio by Javian Ng.",
    openGraph: {
        title: "Javian Ng — Photography",
        description: "Photography portfolio by Javian Ng.",
        // TODO: add a real openGraph image once you have your own Cloudinary assets.
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
            <body className="min-h-full flex flex-col bg-background text-foreground">
                <Navbar />
                <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
