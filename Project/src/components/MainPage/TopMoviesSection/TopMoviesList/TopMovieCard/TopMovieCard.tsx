type TopMovieCardProps = {
    position: number;
  posterUrl?: string;
  title: string;
};

export const TopMovieCard = ({ 
position,
  posterUrl, 
  title, 
   
}: TopMovieCardProps) => {
  return (
    <div className="top-movies__item-card">
      <img 
        src={posterUrl}
        alt={title} 
        className="top-movies__item-image"
      />
      <div className="top-movies__rating-badge">
        <span className="top-movies__rating-value">
          {position}
        </span>
      </div>
      </div>
  );
};