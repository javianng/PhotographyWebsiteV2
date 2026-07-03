import { ConnectForm } from "@/components/connect-form";
import { pageMetadata } from "@/lib/site";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = pageMetadata({
    title: "Contact",
    description:
        "Get in touch with Javian Ng for photography collaborations, bookings, and inquiries.",
    path: "/connect",
});

export default function ContactPage() {
    return (
        <section className="mx-auto flex max-w-5xl flex-col gap-8">
            <div className="flex flex-col gap-4 sm:flex-row">
                <h1 className="w-3/5">Contact</h1>
                <div className="w-full space-y-1 text-xs sm:w-2/5">
                    <p>
                        Keen to collaborate, have questions, or just want to say
                        hi? Fill out the form below and I'll get back to you as
                        soon as I can.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <Image
                    src="/me_2.jpeg"
                    alt="Javian Ng"
                    height={800}
                    width={800}
                />
                <ConnectForm />
            </div>
        </section>
    );
}
