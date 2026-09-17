// Public visual assets observed on the user-provided reference homepage.
// Retained as replaceable reference imagery; project and article copy is original.
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
const assets = [
  [
    "project-1",
    "4Q3tbfRFBVIpmil4P3jBdTyEMQ.png?scale-down-to=1024&width=4096&height=2528"
  ],
  [
    "project-2",
    "uIYgOjLalxU6NqoHE9OvSm3A.png?scale-down-to=1024&width=4096&height=2528"
  ],
  [
    "project-3",
    "Z0MW1kJ2muu3oKalaaevGhzb50.png?scale-down-to=2048&width=4096&height=2528"
  ],
  [
    "project-4",
    "Hp85fHnYz8x5gsLNUMFGzUSc.png?scale-down-to=1024&width=4096&height=2528"
  ],
  [
    "project-5",
    "peU2EaKJETfGgCgHtmwVEak7dUM.png?scale-down-to=1024&width=4096&height=2528"
  ],
  [
    "project-6",
    "VDOmErEemKadIwjMvsyXbLKctw.png?scale-down-to=2048&width=4096&height=2528"
  ],
  [
    "service-1",
    "3Sf5E4NjNFzkMt3qNf6TK6N8t8.png?width=500&height=333"
  ],
  [
    "service-2",
    "zT9W3BZ83iDMtzCQSLiy4buGMkQ.jpeg?width=1199&height=767"
  ],
  [
    "service-3",
    "1YHkJ0vMckTuTE6oTFgpS7rtDI.jpeg?width=904&height=1200"
  ],
  [
    "service-4",
    "dygIimZ16NJkQoxe0W3rJJxPhQ.jpeg?width=960&height=1200"
  ],
  [
    "journal-1",
    "8PsG5ZVuFZwVax0Xi373LC11ZoI.webp?width=800&height=741"
  ],
  [
    "journal-2",
    "fz2gDWXIdxF6hzxrGtKPQqIfM8Q.webp?width=800&height=741"
  ],
  [
    "journal-3",
    "aL9Ftl3PqmSayu5YuOmkxK5Np8w.webp?width=800&height=741"
  ]
];
const output = path.resolve("public/reference");
await fs.mkdir(output, { recursive: true });
for (const [name, source] of assets) {
  const response = await fetch("https://framerusercontent.com/images/" + source);
  if (!response.ok) throw new Error(name + ": HTTP " + response.status);
  const buffer = Buffer.from(await response.arrayBuffer());
  const info = await sharp(buffer).resize({ width: name === "project-3" || name === "project-6" ? 1800 : 1000, withoutEnlargement: true }).webp({ quality: 84 }).toFile(path.join(output, name + ".webp"));
  console.log(name + ": " + info.size + " bytes");
}
