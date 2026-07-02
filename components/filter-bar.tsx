import { Button } from "@/components/ui/button";

type FilterBarProps = {
    tags: string[];
    activeTag: string | null;
    onTagChange: (tag: string | null) => void;
};

export function FilterBar({ tags, activeTag, onTagChange }: FilterBarProps) {
    return (
        <div className="mb-6 flex flex-wrap gap-2">
            <Button size="sm" variant={activeTag === null ? "default" : "outline"} onClick={() => onTagChange(null)}>
                all
            </Button>
            {tags.map((tag) => (
                <Button
                    key={tag}
                    size="sm"
                    variant={activeTag === tag ? "default" : "outline"}
                    onClick={() => onTagChange(tag)}
                >
                    {tag}
                </Button>
            ))}
        </div>
    );
}
