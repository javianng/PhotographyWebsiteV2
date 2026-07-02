import { ContactForm } from "@/components/contact-form";

export const metadata = {
    title: "Contact",
};

export default function ContactPage() {
    return (
        <section className="flex max-w-lg flex-col gap-6">
            <h1 className="text-lg font-medium text-foreground">Contact</h1>
            <ContactForm />
        </section>
    );
}
