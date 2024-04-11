

export function isInThePast(date: string) {
  const givenDate = new Date(date);
  const currentDate = new Date();
  return givenDate < currentDate;
}