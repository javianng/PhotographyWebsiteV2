// Regenerates the `photos` array in lib/photos.ts from whatever's in the
// "portfolio/" folder of your Cloudinary account. Run with `npm run sync-photos`.
//
// Every tag you've applied to an image in the Cloudinary Media Library (Media
// Library -> select image(s) -> Tags panel) is carried over as-is into that
// photo's `tags` array — there's no fixed taxonomy to match against, so any
// tag you add becomes a new filter button on the site after the next sync.
// Untagged images are still included (they just only show up under "all").

import { v2 as cloudinary } from "cloudinary";
import { config as loadEnv } from "dotenv";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const photosFile = path.join(__dirname, "..", "lib", "photos.ts");

loadEnv({ path: path.join(__dirname, "..", ".env.local"), quiet: true });

const FOLDER_PREFIX = "portfolio/";

function requireEnv(name) {
    const value = process.env[name];
    if (!value) {
        console.error(`Missing required env var ${name} in .env.local`);
        process.exit(1);
    }
    return value;
}

cloudinary.config({
    cloud_name: requireEnv("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME"),
    api_key: requireEnv("CLOUDINARY_API_KEY"),
    api_secret: requireEnv("CLOUDINARY_API_SECRET"),
});

async function fetchAllResources() {
    const resources = [];
    let nextCursor;
    do {
        const response = await cloudinary.api.resources({
            type: "upload",
            resource_type: "image",
            prefix: FOLDER_PREFIX,
            max_results: 500,
            tags: true,
            context: true,
            next_cursor: nextCursor,
        });
        resources.push(...response.resources);
        nextCursor = response.next_cursor;
    } while (nextCursor);
    return resources;
}

function humanize(publicId) {
    const filename = publicId.split("/").pop() ?? publicId;
    return filename
        .replace(/[-_]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

function toPhoto(resource) {
    const tags = [...(resource.tags ?? [])].sort();
    const context = resource.context?.custom ?? {};
    const label =
        context.caption ?? context.alt ?? humanize(resource.public_id);

    return {
        id: resource.public_id,
        publicId: resource.public_id,
        alt: context.alt ?? label,
        width: resource.width,
        height: resource.height,
        tags,
        caption: context.caption ?? label,
    };
}

function formatPhoto(photo) {
    const lines = [
        "    {",
        `        id: ${JSON.stringify(photo.id)},`,
        `        publicId: ${JSON.stringify(photo.publicId)},`,
        `        alt: ${JSON.stringify(photo.alt)},`,
        `        width: ${photo.width},`,
        `        height: ${photo.height},`,
        `        tags: ${JSON.stringify(photo.tags)},`,
        `        caption: ${JSON.stringify(photo.caption)},`,
        "    },",
    ];
    return lines.join("\n");
}

function writePhotosFile(photos) {
    const source = readFileSync(photosFile, "utf8");
    const startMarker = "// AUTO-GENERATED PHOTOS START";
    const endMarker = "// AUTO-GENERATED PHOTOS END";
    const startIndex = source.indexOf(startMarker);
    const endIndex = source.indexOf(endMarker);

    if (startIndex === -1 || endIndex === -1) {
        console.error(
            `Could not find ${startMarker} / ${endMarker} markers in ${photosFile}`,
        );
        process.exit(1);
    }

    const arrayBody =
        photos.length > 0 ? `\n${photos.map(formatPhoto).join("\n")}\n` : "";
    const generatedBlock = `${startMarker}\nexport const photos: Photo[] = [${arrayBody}];\n${endMarker}`;

    const before = source.slice(0, startIndex);
    const after = source.slice(endIndex + endMarker.length);
    writeFileSync(photosFile, `${before}${generatedBlock}${after}`);
}

async function main() {
    console.log(`Fetching resources under "${FOLDER_PREFIX}"...`);
    const resources = await fetchAllResources();
    console.log(`Found ${resources.length} image(s).`);

    const photos = resources.map(toPhoto);
    writePhotosFile(photos);
    console.log(`Wrote ${photos.length} photo(s) to lib/photos.ts.`);

    const untagged = photos.filter((p) => p.tags.length === 0);
    if (untagged.length > 0) {
        console.log(
            `\n${untagged.length} photo(s) have no tags yet (they'll only show under "all"):`,
        );
        for (const p of untagged) {
            console.log(`  - ${p.publicId}`);
        }
    }

    const allTags = Array.from(new Set(photos.flatMap((p) => p.tags))).sort();
    console.log(
        `\n${allTags.length} distinct tag(s) found: ${allTags.join(", ") || "(none)"}`,
    );
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
