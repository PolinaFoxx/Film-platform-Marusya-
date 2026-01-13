import './HeroMeta.scss'
import RatingIcon from "../../../../assets/icons/star-icon.svg?react";
import getRatingClass from '../../../../utils/Rating';


export type MetaProps = {
  tmdbRating: number | null;
  releaseYear: number;
  genre: string;
  runtime: number;
  variant?: 'default' | 'xs'
};


export const HeroMeta = ({ tmdbRating, releaseYear, genre, runtime, variant = 'default' }: MetaProps) => {
  // Преобразуем runtime 
  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Форматируем рейтинг для отображения
  const formatRating = (rating: number | null): string => {
    if (rating === null) return 'N/A';
    return rating.toFixed(1); // Оставляем один знак после запятой
  };

  return (
    <div className={`hero-meta ${variant === 'xs' ? 'hero-meta--xs' : ''} hero-meta--mobile`}>
      {tmdbRating !== null && (
        <div className={`hero-meta__rating ${getRatingClass(tmdbRating)}`}>
          <RatingIcon
            className="hero-meta__rating-icon"
          />
          <span className="hero-meta__rating-text">
            {formatRating(tmdbRating)}
          </span>
        </div>
      )}
      <span className="hero-meta__year">{releaseYear}</span>
      <span className="hero-meta__genre">{genre}</span>
      <span className="hero-meta__duration">{formatDuration(runtime)}</span>
    </div>
  )

}