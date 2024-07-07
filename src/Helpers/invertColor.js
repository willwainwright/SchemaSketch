export const invertColor = (hex) => {
  // Ensure the input is a valid hex code
  if (hex.startsWith("#")) {
    hex = hex.slice(1);
  }

  // Handle shorthand hex codes
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Convert to RGB
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  // Invert the RGB components
  const invertedR = (255 - r).toString(16).padStart(2, "0");
  const invertedG = (255 - g).toString(16).padStart(2, "0");
  const invertedB = (255 - b).toString(16).padStart(2, "0");

  // Combine the inverted components back into a hex code
  const invertedHex = `#${invertedR}${invertedG}${invertedB}`;

  return invertedHex;
};
