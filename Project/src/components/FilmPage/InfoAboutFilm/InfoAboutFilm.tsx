import type { Film } from "../../GenreFilmsPage/api/TypeGenreFilmsPage";
import './InfoAboutFilm.scss'

interface InfoAboutFilmProps {
  movie: Film;
};

const InfoAboutFilm = ({ movie }: InfoAboutFilmProps) => {
  return (
    <section className="info">
      <div className="container">

        <h2 className="info__title">О фильме</h2>
        <ul className="info__list">

          <li className="info__item">
            <div className="info__name"> 
            <span  className="info__text">Язык оригинала</span>
            <div className="info__border"></div>
            </div>
            <span className="info__data"> {movie.language}</span>
          </li>

          <li className="info__item">
            <div className="info__name"> 
            <span className="info__text">Бюджет</span>
            <div className="info__border"></div>
            </div>
            <span  className="info__data" >{movie.budget ?? '—'}</span>
          </li>

          <li className="info__item">
            <div className="info__name"> 
            <span className="info__text">Выручка</span>
            <div className="info__border"></div>
            </div>
            <span  className="info__data" >{movie.revenue ?? '—'}</span>
          </li>

          <li className="info__item">
            <div className="info__name"> 
            <span className="info__text">Режиссёр</span>
            <div className="info__border"></div>
            </div>
            <span  className="info__data" >{movie.director}</span>
          </li>

          <li className="info__item">
            <div className="info__name">
            <span className="info__text">Продакшн</span>
            <div className="info__border"></div>
             </div>
            <span  className="info__data" >{movie.production ?? '—'}</span>
          </li>

          <li className="info__item">
            <div className="info__name"> 
            <span className="info__text">Награды</span>
            <div className="info__border"></div>
            </div>
            <span className="info__data">{movie.awardsSummary ?? '—'}</span>
          </li>
        </ul>
      </div>

    </section>
  );
};

export default InfoAboutFilm;