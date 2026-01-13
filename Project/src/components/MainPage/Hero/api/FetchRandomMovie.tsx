import { useQuery } from "@tanstack/react-query";
import { Hero } from "../Hero";
import { fetchRandomFilm } from "./RandomFilmRes";


export const FetchRandomMovie = () => {


  // Хук useQuery для получения случайного фильма
  const randomMovieQuery = useQuery({
    queryFn: fetchRandomFilm, 
    queryKey: ["randomMovie"],    // Ключ для кеширования
  });

  // Обработка состояний 
  switch (randomMovieQuery.status) {
    case "pending":
      return (<div><span> Загрузка</span></div>);

    case "success": {
      const movie = randomMovieQuery.data;

      return (
      
          <Hero movie={movie}   onRandomClick={() => randomMovieQuery.refetch()}/>
      );
    }

    case "error":
      return (<div>
        <span>
          Произошла ошибка
        </span>
        {/* <button onClick={() => noteListQuery.refetch()}>Повторите запрос</button> */}
      </div>)
  }
}


