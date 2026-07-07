const images = import.meta.glob("./images/*.png", {
  eager: true,
  import: "default",
});

export function getImage(filename) {
  const key = `./images/${filename}`;
  const resolved = images[key];

  if (!resolved) {
    console.warn(`[covid/images] No image found for "${filename}"`);
  }

  return resolved;
}