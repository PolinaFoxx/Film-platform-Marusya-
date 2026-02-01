import { useQuery } from "@tanstack/react-query";
import { fetchGenres } from "./TypeGeners";
import { GenreList } from "../GenreList/GenreList";

export const FetchGenresList = () => {
  const genresQuery = useQuery({
    queryFn: fetchGenres,
    queryKey: ["genres"],
  });

  switch (genresQuery.status) {
    case "pending":
      return (
        <div className="genres-loading">
          <span>Загрузка жанров...</span>
        </div>
      );

    case "success":
      return <GenreList genres={genresQuery.data} />;

    case "error":
      return (
        <div className="genres-error">
          <span>Не удалось загрузить жанры</span>
          <button onClick={() => genresQuery.refetch()}>
            Повторить запрос
          </button>
        </div>
      );
  }
};