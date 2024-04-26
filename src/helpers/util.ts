

export function isInThePast(date: string) {
  const givenDate = new Date(date);
  const currentDate = new Date();
  
  return givenDate < currentDate;
}

export function calculateDifferenceInDays(date: string) {
  const givenDate = new Date(date);
  const currentDate = new Date();
  const differenceInTime = currentDate.getTime() - givenDate.getTime();
  
  return Math.ceil(differenceInTime / (1000 * 60 * 60 * 25)) * - 1;
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("de-DE", { year: "numeric", month: "2-digit", day: "2-digit" })
}