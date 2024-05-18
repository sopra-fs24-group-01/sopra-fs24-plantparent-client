
const colors = [
  "#E6F4EA50", // Soft Green
  "#E0F7FA50", // Light Blue
  "#FFF9E650", // Pale Yellow
  "#F3E5F550", // Light Lavender
  "#FFE8E550", // Soft Peach
  "#FFE8E850", // Light Coral
  "#E8F7E050", // Pale Mint
  "#E0F0FF50", // Baby Blue
  "#F5E8FA50", // Lavender Blush
  "#FFEDE050"  // Pale Peach
];

export function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);

  return colors[randomIndex];
}