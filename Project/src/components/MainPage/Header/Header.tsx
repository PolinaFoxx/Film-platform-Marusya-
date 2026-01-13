import { FormSearch } from "./FormSearch/FormSearch"
import LogoIcon from "../../../assets/icons/white-logo.svg?react";
import GenreIcon from "../../../assets/icons/genres-icon.svg?react";
import SearchIcon from "../../../assets/icons/search-white.svg?react";
import ProfileIcon from "../../../assets/icons/profile-icon.svg?react";


import './Logo/Logo.scss'
import './Header.scss'
import { Link, useSearchParams } from "react-router-dom"
import { useState } from "react"

import { useQuery } from "@tanstack/react-query"
import { queryClient } from "../../../api/queryClient"
import SearchBanner from "./SearchBanner/SearchBanner"
import { fetchMe } from "../../type/user.type"
import { EntranceModal } from "./Modal/EntranceModal/EntranceModal";
import { AuthorizationModal } from "./Modal/AuthorizationModal/AuthorizationModal";
import { SuccessModal } from "./Modal/SuccessModal/SuccessModal";


export const Header = () => {
    //состояния для строки поиска
    const [searchParams, setsearchParams] = useSearchParams()
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false); //состояние для формы мобмлка
    const toggleMobileSearch = () => setIsMobileSearchOpen(!isMobileSearchOpen);
  const closeMobileSearch = () => setIsMobileSearchOpen(false);
    
    //handleSearchName меняет и сохраняет URL чтобы при обновлении страницы запись в поиске не потерялась.
    const handleSearchName = (value: string) => {    //берем строку из FormSearch
        //берем текущие параметры URL
        const newParams = new URLSearchParams(searchParams);

        //Метод set добавляет/обновляет параметр поиска
        newParams.set("searchTitle", value.toLowerCase());

        //Сохраняет в URL
        setsearchParams(newParams);
    };

    // Эта строка вычисляется ПРИ КАЖДОМ РЕНДЕРЕ и передается в ребенка
    const searchTitle = searchParams.get("searchTitle") || "";

    //Состояние модального окна. null - ничего не открыто
    const [activeModal, setActiveModal] = useState<'entrance' | 'auth' | 'success' | null>(null);

    //Функции переключатели(обработчики)
    const openEntranceModal = () => setActiveModal('entrance');//меняет флаг текущего состояния модалки входа
    const openAuthorizationModal = () => setActiveModal('auth');//меняет флаг текущего состояния модалки регестрации
    const openSuccessModal = () => setActiveModal('success');//меняет флаг текущего состояния модалки успешн.рег
    const closeModal = () => setActiveModal(null);//меняет флаг текущего состояния модалки 


    const meQuery = useQuery({
        queryFn: () => fetchMe(),//При запросе fetchMe проверяется, авторизован ли пользователь, и загружаются его данные.
        queryKey: ["users", "me"],
    }, queryClient)

    //console.log(meQuery.data)

    return (
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <Link to="/" className="logo">
                        <LogoIcon className="logo__icon" />
                    </Link>

                    {/* Мобильная навигация */}
                    <nav className="header__nav--mobile">
                        <Link to="/genres" className="header__link">
                            <GenreIcon />
                        </Link>


                        <button
                            className="header__search-mobile-btn--mobile"
                            onClick={toggleMobileSearch}
                            aria-label="Открыть поиск"
                        >
                            <SearchIcon />
                        </button>

                        {meQuery.data ? (
                            <Link to="/account" className="header__user--mobile">
                                <ProfileIcon />
                            </Link>

                        ) : (
                            // Если данных нет → кнопка «Войти» (открывает модалку)
                            <button className="header__authBtn--mobile" onClick={openEntranceModal}>
                                <ProfileIcon />
                            </button>
                        )}
                    </nav>

                    {isMobileSearchOpen && (
                        <FormSearch
                            placeholder="Поиск"
                            value={searchTitle}
                            onChange={handleSearchName}
                            size="small"
                            onClose={closeMobileSearch}
                        />
                    )}


                    <nav className="header__nav">
                        <Link to="/" className="header__link">
                            Главная
                        </Link>
                        <Link to="/genres" className="header__link">
                            Жанры
                        </Link>
                    </nav>

                    <FormSearch
                        placeholder="Поиск"
                        value={searchTitle}
                        onChange={handleSearchName}
                        onClose={closeModal}
                    />



                    <SearchBanner />

                    {meQuery.data ? (
                        <Link to="/account" className="header__user">
                            {meQuery.data.surname}
                        </Link>

                    ) : (
                        // Если данных нет → кнопка «Войти» (открывает модалку)
                        <button className="header__authBtn" onClick={openEntranceModal}>
                            Войти
                        </button>
                    )}


                    <EntranceModal
                        isOpen={activeModal === 'entrance'}
                        onClose={closeModal}
                        onSwitchToAuth={openAuthorizationModal}
                    />

                    <AuthorizationModal
                        isOpen={activeModal === 'auth'}
                        onClose={closeModal}
                        onSwitchToSuccess={openSuccessModal}
                        onSwitchToLogin={openEntranceModal}
                    />

                    <SuccessModal
                        isOpen={activeModal === 'success'}
                        onClose={closeModal}
                        onSwitchToEntrance={openEntranceModal}
                    />
                </div>
            </div>
        </header >
    )
}