"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    from_name: z.string().min(1, "Name is required"),
    from_email: z.email("Enter a valid email"),
    message: z.string().min(1, "Message is required"),
});

type FormValues = z.infer<typeof formSchema>;

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
    const [status, setStatus] = useState<FormStatus>("idle");
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { from_name: "", from_email: "", message: "" },
    });

    async function onSubmit(data: FormValues) {
        setStatus("submitting");

        try {
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                {
                    from_name: data.from_name,
                    from_email: data.from_email,
                    message: data.message,
                },
                { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! },
            );
            setStatus("success");
            form.reset();
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

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller
                    control={form.control}
                    name="from_name"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                            <Input {...field} id={field.name} aria-invalid={fieldState.invalid} />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    control={form.control}
                    name="from_email"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                type="email"
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    control={form.control}
                    name="message"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Message</FieldLabel>
                            <Textarea
                                {...field}
                                id={field.name}
                                rows={5}
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                {status === "error" ? (
                    <p className="text-sm text-destructive">
                        Something went wrong sending your message. Please try again.
                    </p>
                ) : null}
                <Button type="submit" disabled={status === "submitting"} className="self-start">
                    {status === "submitting" ? "Sending…" : "Send"}
                </Button>
            </FieldGroup>
        </form>
    );
}
