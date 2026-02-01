import { Link } from "react-router-dom";
import type { TopFilm } from "../api/TopMoviesListRes";
import { TopMovieCard } from "./TopMovieCard/TopMovieCard";
import '../TopMoviesSection.scss'

interface TopMoviesListProps {
  films: TopFilm[];
}

export const TopMoviesList = ({ films }: TopMoviesListProps) => {
  return (
    <ul className="top-movies__list">
      {films.map((film, index) => (
        <li key={film.id} className="top-movies__item">
          <Link to={`/movie/${film.id}`} className="top-movie-link">
            <TopMovieCard
              posterUrl={film.posterUrl ?? 'Недоступно'}
              title={film.title}
              position={index + 1}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};