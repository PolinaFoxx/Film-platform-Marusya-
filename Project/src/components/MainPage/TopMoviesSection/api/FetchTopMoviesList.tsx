import { useQuery } from "@tanstack/react-query";
import { TopMoviesList } from "../TopMoviesList/TopMoviesList";
import { fetchTopFilms } from "./TopMoviesListRes";

export const FetchTopMoviesList = () => {
  const topFilmsQuery = useQuery({
    queryFn: fetchTopFilms,
    queryKey: ["topFilms"],
  });

  switch (topFilmsQuery.status) {
    case "pending":
      return <div><span>Загрузка топ-фильмов...</span></div>;

    case "success":
      return <TopMoviesList films={topFilmsQuery.data} />;

    case "error":
      return (
        <div>
          <span>Произошла ошибка</span>
          <button onClick={() => topFilmsQuery.refetch()}>
            Повторить запрос
          </button>
        </div>
      );
  }
};