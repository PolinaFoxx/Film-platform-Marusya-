import { Hero } from '../../components/MainPage/Hero/Hero';
import InfoAboutFilm from '../../components/FilmPage/InfoAboutFilm/InfoAboutFilm';
import type { UseQueryResult } from '@tanstack/react-query';
import type { MovieFull } from '../../components/type/film.type/film.type';

interface Props {
  movieQuery: UseQueryResult<MovieFull>
  onRandomClick?: () => void
};

const FilmPage = ({ movieQuery, onRandomClick }: Props) => {
  if (movieQuery.status === 'pending') return <div>Загрузка...</div>;
  if (movieQuery.status === 'error') return <div>Ошибка</div>;

  const movie = movieQuery.data;

  return (
    <>
      <Hero
        movie={movie}
        showAboutButton={false}
        showHistoryButton={false}
        onRandomClick={onRandomClick}
      />
      <InfoAboutFilm movie={movie} />
    </>
  );
};

export default FilmPage;
