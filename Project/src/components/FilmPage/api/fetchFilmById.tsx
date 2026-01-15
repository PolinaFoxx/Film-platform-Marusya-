import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import FilmPage from '../../../pages/FilmPage/FilmPage';
import { fetchFilmById } from './TypeFetchFilmById';

function FetchFilmPage() {
  const { movieId } = useParams<{ movieId: string }>();

  const movieQuery = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => {
      if (!movieId) {
        throw new Error('movieId is required');
      }
      return fetchFilmById(movieId);
    },
    enabled: !!movieId,
  });

  return <FilmPage movieQuery={movieQuery} />;
}

export default FetchFilmPage;
