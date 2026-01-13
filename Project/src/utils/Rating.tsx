// utils/Rating.ts
export const getRatingClass = (rating: number): string => {
  if (rating < 5) {
    return "hero-meta__rating--bad"; // было "banner-film__rating--bad"
  }
  if (rating < 7) {
    return "hero-meta__rating--average"; // было "banner-film__rating--average"
  }
  if (rating < 8.5) {
    return "hero-meta__rating--good"; // было "banner-film__rating--good"
  }
  return "hero-meta__rating--excellent"; // было "banner-film__rating--excellent"
};

export default getRatingClass;