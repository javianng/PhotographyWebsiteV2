"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<FormStatus>("idle");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("submitting");

        try {
            await emailjs.sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                formRef.current!,
                { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! },
            );
            setStatus("success");
            formRef.current?.reset();
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    }

    if (status === "success") {
        return (
            <p className="text-sm text-foreground">
                Thanks for reaching out — I&apos;ll get back to you soon.
            </p>
        );
    }

    const inputClasses = cn(
        "w-full border border-input bg-input/30 px-3 py-2 text-sm text-foreground",
        "outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
    );

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
                <label htmlFor="from_name" className="text-sm text-muted-foreground">
                    Name
                </label>
                <input
                    id="from_name"
                    name="from_name"
                    type="text"
                    required
                    className={inputClasses}
                />
            </div>
            <div className="flex flex-col gap-1.5">
                <label htmlFor="from_email" className="text-sm text-muted-foreground">
                    Email
                </label>
                <input
                    id="from_email"
                    name="from_email"
                    type="email"
                    required
                    className={inputClasses}
                />
            </div>
            <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm text-muted-foreground">
                    Message
                </label>
                <textarea id="message" name="message" rows={5} required className={inputClasses} />
            </div>
            {status === "error" ? (
                <p className="text-sm text-destructive">
                    Something went wrong sending your message. Please try again.
                </p>
            ) : null}
            <Button type="submit" disabled={status === "submitting"} className="self-start">
                {status === "submitting" ? "Sending…" : "Send"}
            </Button>
        </form>
    );
}
