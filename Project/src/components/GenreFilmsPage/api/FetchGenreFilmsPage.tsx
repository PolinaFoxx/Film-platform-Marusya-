import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchFilmsByGenre } from './TypeGenreFilmsPage';
import GenreFilmsPage from '../GenreFilmsPage';
import { useMemo, useState } from 'react';


function FetchGenreFilmsPage() {
  const { genreSlug } = useParams<{ genreSlug: string }>();

  //Пагинация
  //начальное значение
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  // const [searchParams] = useSearchParams();

  // Используем React Query для получения фильмов по жанру
  const moviesQuery = useQuery({
    queryFn: () => {
      if (!genreSlug) {
        throw new Error('Genre slug is required');
      }
      return fetchFilmsByGenre(genreSlug);
    },
    queryKey: ['moviesByGenre', genreSlug], // Ключ включает genreSlug для кэширования по жанру
    enabled: !!genreSlug, // Запрос выполнится только если есть genreSlug
  });

  //useMemo. Теперь paginatedMovies будет вызываться тогда когда 
  const paginatedMovies = useMemo(() => {
    if (!moviesQuery.data) return [];

    //сортируем по рейтингу
    const sortedMovies = [...moviesQuery.data].sort((a, b) => (b.tmdbRating || 0) - (a.tmdbRating || 0));


    // берём первые фильмы, которые должны быть видны на текущей странице
    return sortedMovies.slice(0, currentPage * itemsPerPage);
  },
    [moviesQuery.data, currentPage]);//будут меняться данные и текущая страница

  const handleShowMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const isViewBtn =
    moviesQuery.status === "success" &&
    moviesQuery.data?.length > 0 &&
    paginatedMovies.length < moviesQuery.data.length;

  // Функция для форматирования названия жанра
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