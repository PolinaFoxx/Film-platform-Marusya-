import { FetchTopMoviesList } from "./api/FetchTopMoviesList";
import './TopMoviesSection.scss'

export const TopMoviesSection = () => {
  return (
    <section className="top-movies">
      <div className="container">

        <h2 className="top-movies__title">Топ 10 фильмов</h2>
        <FetchTopMoviesList />
      </div>
    </section>
  );
};