

export function isInThePast(date: string) {
  const givenDate = new Date(date);
  const currentDate = new Date();
  
  return givenDate < currentDate;
}

export function calculateDifferenceInDays(date: string): string {
  const givenDate = new Date(date);
  const currentDate = new Date();
  const differenceInTime = currentDate.getTime() - givenDate.getTime();
  
  const result = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24)) * - 1;

  return result > 0 ? "+" + result : result.toString();
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("de-DE", { year: "numeric", month: "2-digit", day: "2-digit" })
}

export function formatDateYMD(date: string) {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  const day = ("0" + dateObj.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}

export function getRandomNumberBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}