export const getRatingClass = (rating: number): string => {
  if (rating < 5) {
    return "hero-meta__rating--bad";
  }
  if (rating < 7) {
    return "hero-meta__rating--average";
  }
  if (rating < 8.5) {
    return "hero-meta__rating--good";
  }
  return "hero-meta__rating--excellent";
};

export default getRatingClass;