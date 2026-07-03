"use client";

import { Button } from "@/components/ui/button";
import { ALL_TAGS } from "@/lib/photos";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function Navbar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const activeTag = searchParams.get("tag");

    return (
        <header className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur">
            <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-2 px-4 py-4 sm:px-6">
                <Button
                    size="sm"
                    variant={pathname === "/" && !activeTag ? "default" : "outline"}
                    asChild
                >
                    <Link href="/">Javian Ng</Link>
                </Button>
                {ALL_TAGS.map((tag) => (
                    <Button
                        key={tag}
                        size="sm"
                        variant={pathname === "/" && activeTag === tag ? "default" : "outline"}
                        asChild
                    >
                        <Link href={`/?tag=${tag}`}>{tag}</Link>
                    </Button>
                ))}
                <Button size="sm" variant={pathname === "/about" ? "default" : "outline"} asChild>
                    <Link href="/about">About</Link>
                </Button>
                <Button size="sm" variant={pathname === "/contact" ? "default" : "outline"} asChild>
                    <Link href="/contact">Contact me</Link>
                </Button>
            </nav>
        </header>
    );
}
