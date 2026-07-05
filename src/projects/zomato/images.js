// Eagerly imports every image in this folder so Vite bundles and
// hashes them correctly for production (not just the dev server).
// Keys look like "./images/zomato-step-01.png".
const images = import.meta.glob("./images/*.png", {
  eager: true,
  import: "default",
});

export function getImage(filename) {
  const key = `./images/${filename}`;
  const resolved = images[key];

  if (!resolved) {
    console.warn(`[zomato/images] No image found for "${filename}"`);
  }

  return resolved;
}