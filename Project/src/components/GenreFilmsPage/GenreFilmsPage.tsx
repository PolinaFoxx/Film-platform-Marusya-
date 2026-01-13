import type { UseQueryResult } from "@tanstack/react-query";
import type { FilmsResponse } from "./api/TypeGenreFilmsPage";
import { Link } from "react-router-dom";
import './GenreFilmsPage.scss'
import GenreIcon from "../../assets/icons/genre-icon.svg?react"
import type { MovieBase } from "../type/film.type/film.type";
// import unavailablePoster from '../../assets/images/unavailable.jpg';


interface GenreFilmsPageProps {
  moviesQuery: UseQueryResult<MovieBase[], Error>;
  genreSlug?: string;
  formatGenreTitle: (slug?: string) => string;
  pagination: FilmsResponse;
  onShowMore: () => void;
  isViewBtn: boolean; 
}

function GenreFilmsPage({
  moviesQuery,
  genreSlug,
  formatGenreTitle,
  pagination,
  onShowMore,
  isViewBtn,
}: GenreFilmsPageProps) {

  // Получаем отсортированные фильмы (первые 10 по рейтингу)
  // const getSortedMovies = () => {
  //   if (!moviesQuery.data || moviesQuery.data.length === 0) {
  //     return [];
  //   }

  //   // Копируем массив для сортировки
  //   const moviesCopy = [...moviesQuery.data];

  //   // Сортируем по рейтингу по убыванию (от самого высокого к самому низкому)
  //   return moviesCopy
  //     .sort((a, b) => {
  //       // Проверяем наличие рейтинга
  //       const ratingA = a.tmdbRating || 0;
  //       const ratingB = b.tmdbRating || 0;

  //       return ratingB - ratingA; // по убыванию
  //     })
  //     .slice(0, 10); // берем только первые 10
  // };

  // const sortedMovies = getSortedMovies();

  console.log(moviesQuery.data);
  return (

    <section className="genre-films">
      <div className="container">
        <div className="genre-films__wrapper">
          <GenreIcon className="genre-films__svg" />
          <h1 className="genre-films__title">
            {formatGenreTitle(genreSlug)}
          </h1>
        </div>


        {moviesQuery.isPending && (
          <div className="genres-loading">
            <span>Загрузка фильмов...</span>
          </div>
        )}

        {moviesQuery.isError && (
          <div className="genres-error">
            <span>Не удалось загрузить фильмы</span>
            <button onClick={() => moviesQuery.refetch()}>
              Повторить запрос
            </button>
          </div>
        )}

        {moviesQuery.isSuccess && moviesQuery.data.length === 0 && (
          <div className="no-movies">
            <p>К сожалению, фильмов в этом жанре не найдено</p>
          </div>
        )}

        {moviesQuery.isSuccess && pagination.length > 0 && (
          <ul className="genre-films__list" >
            {pagination.map((movie) => (
              <li className="genre-films__item" key={movie.id}>

                <Link
                  to={`/movie/${movie.id}`}
                  className="genre-films__link"
                >

                  <img
                    src={movie.posterUrl ?? '/images/u.jpg'}
                    alt={movie.title}
                    className="genre-films__image"
                    loading="lazy"
                  />
                </Link>
              </li>

            ))}
          </ul>
        )}

        {isViewBtn && (
          <button

            type="button"
            className="genre-films__btn"
            onClick={onShowMore}

          >Показать еще</button>

        )}
      </div>
    </section>

  );
}

export default GenreFilmsPage;
