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
    const [searchParams, setsearchParams] = useSearchParams()
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false); //состояние для формы мобмлка
    const toggleMobileSearch = () => setIsMobileSearchOpen(!isMobileSearchOpen);
    const closeMobileSearch = () => setIsMobileSearchOpen(false);

    const handleSearchName = (value: string) => {
        const newParams = new URLSearchParams(searchParams);

        newParams.set("searchTitle", value.toLowerCase());

        setsearchParams(newParams);
    };

    const searchTitle = searchParams.get("searchTitle") || "";

    const [activeModal, setActiveModal] = useState<'entrance' | 'auth' | 'success' | null>(null);

    const openEntranceModal = () => setActiveModal('entrance');
    const openAuthorizationModal = () => setActiveModal('auth');
    const openSuccessModal = () => setActiveModal('success');
    const closeModal = () => setActiveModal(null);


    const meQuery = useQuery({
        queryFn: () => fetchMe(),
        queryKey: ["users", "me"],
    }, queryClient)

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