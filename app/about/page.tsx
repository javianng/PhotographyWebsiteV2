import Image from "next/image";

export const metadata = {
    title: "About",
};

export default function AboutPage() {
    return (
        <section className="mx-auto flex max-w-5xl flex-col gap-8">
            <div className="flex flex-col gap-4 sm:flex-row">
                <h1 className="w-3/5">About Javian Ng</h1>
                <div className="w-full space-y-1 text-xs sm:w-2/5">
                    <p>
                        We live in a world moving fast - clickbait thumbnails,
                        feeds refreshed every second, images conjured from a
                        prompt instead of a moment. Attention is cheap, and
                        beauty is manufactured on demand.
                    </p>
                    <p>
                        But some things can't be prompted into existence. A
                        certain slant of light. The second before someone
                        laughs. A stillness that only happens once.
                    </p>
                    <p>
                        I chase those moments and freeze them, not to perform,
                        but to preserve. Every photograph here is real: a place
                        I stood, a light I waited for, a story that happened
                        once and will never happen the same way again.
                    </p>
                    <p>
                        This isn't content. It's a collection of moments that
                        were mine to witness, and now, yours to see.
                    </p>
                </div>
            </div>
            <div className="grid w-full grid-cols-2">
                <Image
                    src="/me_1.jpeg"
                    alt="Javian Ng"
                    height={800}
                    width={800}
                    className="aspect-video object-cover"
                />
                <Image
                    src="/me_2.jpeg"
                    alt="Javian Ng"
                    height={800}
                    width={800}
                    className="aspect-video object-cover"
                />
            </div>
        </section>
    );
}
