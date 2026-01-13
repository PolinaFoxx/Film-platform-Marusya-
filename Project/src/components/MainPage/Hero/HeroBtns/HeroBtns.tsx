import LikeIcon from "../../../../assets/icons/icon-like.svg?react";
import RandomIcon from "../../../../assets/icons/icon-randomFilm.svg?react";
import LikeIconCheked from "../../../../assets/icons/like-cheked.svg?react";

import './HeroBtns.scss'

import { Link } from "react-router-dom";
import type { MovieBase } from "../../../type/film.type/film.type";
import TrailerModal from "../TrailerModal/TrailerModal";
import { useState, type MouseEvent } from 'react';
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../../api/queryClient";
import { fetchMe } from "../../../type/user.type";
import { deleteFavoriteFilm, fetchAddFavorites } from "../../../type/favorites.type";
import { useAuthModal } from "../../../../hooks/useAuthModal";
import { EntranceModal } from "../../Header/Modal/EntranceModal/EntranceModal";
import { AuthorizationModal } from "../../Header/Modal/AuthorizationModal/AuthorizationModal";
import { fetchFilmById } from "../../../FilmPage/api/TypeFetchFilmById";

interface HeroBtnsProps {
  showAboutButton?: boolean;
  showHistoryButton?: boolean;
  onRandomClick?: () => void,
  movie: MovieBase,
  onSwitchToAuth?: () => void,
};

export const HeroBtns = ({
  showAboutButton = true,
  showHistoryButton = true,
  onRandomClick,
  movie,
}: HeroBtnsProps) => {

  // Используем хук
  const {
    isLoginOpen,
    isRegisterOpen,
    openLogin,
    closeModal,
    switchToRegister,
    switchToLogin
  } = useAuthModal();

  //Управление состоянием модалки видео
  const [trailerId, setTrailerId] = useState<string | null>(null);//состояние текущего видео 
  const [isModalOpen, setIsModalOpen] = useState(false);// для трейлера

  //Запрос прверки пользователя авториз\не авториз
  const meQuery = useQuery({
    queryFn: () => fetchMe(),//запрос данных о текущем пользователе
    queryKey: ["users", "me"],
  }, queryClient)

  // Мутация для добавления в избранное
  const addFavoriteMutation = useMutation({
    mutationFn: () => fetchAddFavorites(movie.id),
    onSuccess: () => {
      // Инвалидируем кеш для обновления данных
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
      queryClient.invalidateQueries({ queryKey: ["favorites", "me"] });
    }
  });

  // Мутация для удаления из избранного
  const deleteFavoriteMutation = useMutation({
    mutationFn: () => deleteFavoriteFilm(movie.id),
    onSuccess: () => {
      // Инвалидируем кеш для обновления данных
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
      queryClient.invalidateQueries({ queryKey: ["favorites", "me"] });
    }
  });

  const favorites = meQuery.data?.favorites || []; //получаем массив изранных фильмов
  //Проверка, добавлен ли уже фильм в избранное
  const isFavorite = favorites.includes(movie.id.toString());

  // Пока грузится проверка
  if (meQuery.isLoading) {
    return <div>Загрузка...</div>;
  }

  // Обработчик toggle для избранного
  const handleFavoriteClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (meQuery.data) {
      // Пользователь авторизован
      if (isFavorite) {
        // Удаляем из избранного
        deleteFavoriteMutation.mutate();
      } else {
        // Добавляем в избранное
        addFavoriteMutation.mutate();
      }
    } else {
      // Не авторизован — открываем модалку входа
      openLogin();
    }
  };

  const handleClick = () => {
    if (onRandomClick) {
      onRandomClick();
    }
  }

  const handleClickTrailer = () => {
    fetchFilmById(movie.id)//запрос на сервер за видео
      .then(dataFilm => {//получаем объект
        setTrailerId(dataFilm.trailerYouTubeId); // setTrailerId сохраняет текущ св-во т.е видео т.е trailerId = текущ.видео
        setIsModalOpen(true);// Открываем модалку
      })
      .catch(error => {
        console.error('Ошибка загрузки трейлера:', error);
      });
  };


  return (
    <div className="hero-btns" >
      <button className="hero-btns__primary" onClick={handleClickTrailer}>
        Трейлер
      </button>
      <TrailerModal
        isOpen={isModalOpen}
        trailerId={trailerId}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="hero-btns__btns-mobile">

          <Link to={`/movie/${movie.id}`}>
            {showAboutButton && (
              <button className="hero-btns__about">О фильме</button>
            )}
          </Link>

          {/* Избранное */}
          <button
            className={`hero-btns__like ${isFavorite ? 'active' : ''}`}
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
            disabled={addFavoriteMutation.isPending || deleteFavoriteMutation.isPending}
          >
            {/* Показываем нужную иконку в зависимости от состояния */}
            {isFavorite ? (
              <LikeIconCheked className="hero-btns__icon" />
            ) : (
              <LikeIcon className="hero-btns__icon" />
            )}
          </button>
      
        {showHistoryButton && (
          <button
            className="hero-btns__films"
            aria-label="История просмотров"
            onClick={handleClick}
          >
            <RandomIcon className="hero-btns__icon" />
          </button>
        )}
      </div>

      {/* Модалки */}
      <EntranceModal
        isOpen={isLoginOpen}
        onClose={closeModal}
        onSwitchToAuth={switchToRegister}
      />

      <AuthorizationModal
        isOpen={isRegisterOpen}
        onClose={closeModal}
        onSwitchToSuccess={closeModal}
        onSwitchToLogin={switchToLogin}
      />
    </div>
  );
};

