const images = import.meta.glob("./images/*.png", {
  eager: true,
  import: "default",
});

export function getImage(filename) {
  const key = `./images/${filename}`;
  const resolved = images[key];

  if (!resolved) {
    console.warn(`[flipkart-review-analysis/images] No image found for "${filename}"`);
  }

  return resolved;
}