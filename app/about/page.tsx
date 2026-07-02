import { cloudinaryUrl } from "@/lib/photos";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "About",
};

export default function AboutPage() {
    return (
        <section className="flex flex-col gap-8">
            <div className="relative aspect-video w-full overflow-hidden">
                <Image
                    src={cloudinaryUrl("samples/landscapes/nature-mountains", 1600)}
                    alt="Javian Ng"
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                />
            </div>

            {/* TODO: replace with your real bio */}
            <div className="flex max-w-2xl flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
                <h1 className="text-lg font-medium text-foreground">About</h1>
                <p>
                    I&apos;m Javian, a photographer drawn to the quiet moments in between — the way
                    light falls across a street at dusk, or a face caught mid-thought. Most of what
                    I shoot starts as a walk with no destination in mind.
                </p>
                <p>
                    My work moves between street photography, landscapes, and portraits, usually
                    shot on location rather than in a studio. I&apos;m less interested in a
                    perfectly composed frame than in one that feels true to the moment it captures.
                </p>
                <p>
                    Based between a few cities and always looking for the next one worth
                    photographing. If you&apos;d like to work together, I&apos;d love to hear from
                    you —{" "}
                    <Link href="/contact" className="text-foreground underline underline-offset-4">
                        get in touch
                    </Link>
                    .
                </p>
            </div>
        </section>
    );
}
