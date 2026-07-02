"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur">
            <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-4 sm:px-6">
                <Link href="/" className="text-sm font-medium tracking-wide text-foreground">
                    Javian Ng
                </Link>
                <div className="flex items-center gap-6 text-sm">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "transition-colors hover:text-foreground",
                                    isActive
                                        ? "font-medium text-foreground"
                                        : "text-muted-foreground",
                                )}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </header>
    );
}
