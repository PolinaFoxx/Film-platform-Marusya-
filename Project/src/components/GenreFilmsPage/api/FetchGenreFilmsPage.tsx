import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchFilmsByGenre } from './TypeGenreFilmsPage';
import GenreFilmsPage from '../GenreFilmsPage';
import { useMemo, useState } from 'react';

function FetchGenreFilmsPage() {
  const { genreSlug } = useParams<{ genreSlug: string }>();

  //Пагинация
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const moviesQuery = useQuery({
    queryFn: () => {
      if (!genreSlug) {
        throw new Error('Genre slug is required');
      }
      return fetchFilmsByGenre(genreSlug);
    },
    queryKey: ['moviesByGenre', genreSlug],
    enabled: !!genreSlug,
  });


  const paginatedMovies = useMemo(() => {
    if (!moviesQuery.data) return [];

    const sortedMovies = [...moviesQuery.data].sort((a, b) => (b.tmdbRating || 0) - (a.tmdbRating || 0));
    return sortedMovies.slice(0, currentPage * itemsPerPage);
  },
    [moviesQuery.data, currentPage]);

  const handleShowMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const isViewBtn =
    moviesQuery.status === "success" &&
    moviesQuery.data?.length > 0 &&
    paginatedMovies.length < moviesQuery.data.length;

  const formatGenreTitle = (slug: string | undefined) => {
    if (!slug) return '';
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <GenreFilmsPage
      moviesQuery={moviesQuery}
      genreSlug={genreSlug}
      formatGenreTitle={formatGenreTitle}
      pagination={paginatedMovies}
      isViewBtn={isViewBtn}
      onShowMore={handleShowMore}
    />
  );
}

export default FetchGenreFilmsPage;