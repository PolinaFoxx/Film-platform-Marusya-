import { Link } from 'react-router-dom';
import type { GenresArray } from '../api/TypeGeners';
import genresData from '../genresData';
import './GenreCards.scss'
import './GenreList.scss'

interface GenreListProps {
  genres: GenresArray;
}

export const GenreList = ({ genres }: GenreListProps) => {
  return (
    <section className="genres">
      <div className="container">
        <h1 className="genres__title">Жанры фильмов</h1>


        <ul className='genres__list'>

          {genres.map((genre) => {
            // ищем картинку для этого жанра
            const genreImage = genresData.find(g => g.slug === genre.slug)?.image;

            return (

              <li key={genre.id} className="genres__item">
                <Link to={`/genre/${genre.slug}`} className="genres__link">
                  <div className="genres-card">
                    <div className='genres-card__wrapper'>
                      {genreImage ? (

                        <img
                          src={genreImage}
                          alt={genre.name}
                          className="genres-card__image"
                        />
                      ) : (
                        //заглушка
                        <div>
                          <span>{genre.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <div className='genres-card__bottom'>
                      <span className="genres-card__name">{genre.name}</span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

    </section>
  );
};