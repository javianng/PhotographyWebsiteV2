import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
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
    title: {
        default: "Javian Ng | javian.captures",
        template: "%s | Javian Ng | javian.captures",
    },
    description: "Photography portfolio by Javian Ng.",
    openGraph: {
        title: "Javian Ng | javian.captures",
        description: "Photography portfolio by Javian Ng.",
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
                <Suspense fallback={null}>
                    <Navbar />
                </Suspense>
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
