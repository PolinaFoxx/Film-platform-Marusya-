import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteFavoriteFilm, fetchGetFavorites } from "../../type/favorites.type";
import { Link } from "react-router-dom";
import { queryClient } from "../../../api/queryClient";
import './SelectedFilms.scss'
import CloseIcon from "../../../assets/icons/close-icon.svg?react"

const SelectedFilms = () => {
  const getFavoritesQuery = useQuery({
    queryFn: () => fetchGetFavorites(),
    queryKey: ["favorites", "me"],
  });

  const deleteFavoritesQuery = useMutation({
    mutationFn: deleteFavoriteFilm,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["favorites", "me"] })
      console.log('фильм успешно удален');
    }
  })


  const handleDelete = (movieId: number) => {
    deleteFavoritesQuery.mutate(movieId);
  };
  if (getFavoritesQuery.isLoading) return <div>Загрузка...</div>;
  if (getFavoritesQuery.isError) return <div>Ошибка</div>;

  const movies = getFavoritesQuery.data || [];

  return (
    <div className="select-films">

      <ul className="select-films__list" >
        {movies.map((movie) => (
          <li key={movie.id} className="select-films__item" >
            <div className="select-films__item-card">
              <Link to={`/movie/${movie.id}`} className="select-films__link">
                <img src={movie.posterUrl || ''} alt={movie.title}  className="select-films__img"/>
              </Link>
            </div>
            <button className="select-films__btn" onClick={() => handleDelete(movie.id)}>
            < CloseIcon/>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedFilms