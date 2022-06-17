// Example colors, feel free to change these if you want
export const COLORS = [
  "#f44336",
  "#2196f3",
  "#ffeb3b",
  "#4caf50",
  "#7e57c2",
  "#795548",
];

// Simple utility to format time string in 00:00 structure
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
};
// choose a random object from the array
export function randomInArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}
