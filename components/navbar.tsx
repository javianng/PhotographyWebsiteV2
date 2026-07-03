import { Button, buttonVariants } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ALL_TAGS } from "@/lib/photos";
import { Menu } from "lucide-react";
import Link from "next/link";

export function Navbar() {
    return (
        <header>
            <nav className="mx-auto flex max-w-5xl justify-between py-5">
                {/* large screen */}
                <Button
                    size="none"
                    variant="link"
                    className="text-md lowercase"
                    asChild
                >
                    <Link href="/">javian.captures</Link>
                </Button>
                <div className="hidden gap-3 sm:flex sm:flex-wrap">
                    {ALL_TAGS.map((tag) => (
                        <Button
                            key={tag}
                            size="none"
                            variant="link"
                            className="text-muted-foreground text-xs lowercase"
                            asChild
                        >
                            <Link href={`/?tag=${tag}`}>{tag}</Link>
                        </Button>
                    ))}
                    <Button
                        size="none"
                        variant="link"
                        className="text-muted-foreground text-xs lowercase"
                        asChild
                    >
                        <Link href="/about">About</Link>
                    </Button>
                    <Button
                        size="none"
                        variant="link"
                        className="text-muted-foreground text-xs lowercase"
                        asChild
                    >
                        <Link href="/connect">Connect</Link>
                    </Button>
                </div>

                {/* small screen menu */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            size="icon-sm"
                            variant="ghost"
                            className="sm:hidden"
                            aria-label="Open menu"
                        >
                            <Menu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <SheetTitle className="sr-only">Menu</SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col items-start gap-1 px-4">
                            {ALL_TAGS.map((tag) => (
                                <SheetClose asChild key={tag}>
                                    <Link
                                        href={`/?tag=${tag}`}
                                        className={
                                            buttonVariants({
                                                size: "sm",
                                                variant: "link",
                                            }) + " text-xs lowercase"
                                        }
                                    >
                                        {tag}
                                    </Link>
                                </SheetClose>
                            ))}
                            <SheetClose asChild>
                                <Link
                                    href="/about"
                                    className={
                                        buttonVariants({
                                            size: "sm",
                                            variant: "link",
                                        }) + " text-xs lowercase"
                                    }
                                >
                                    About
                                </Link>
                            </SheetClose>
                            <SheetClose asChild>
                                <Link
                                    href="/connect"
                                    className={
                                        buttonVariants({
                                            size: "sm",
                                            variant: "link",
                                        }) + " text-xs lowercase"
                                    }
                                >
                                    Connect
                                </Link>
                            </SheetClose>
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </header>
    );
}
