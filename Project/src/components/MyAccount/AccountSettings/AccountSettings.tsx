import { useQuery } from "@tanstack/react-query";
import { fetchMe, logout } from "../../type/user.type";
import './AccountSettings.scss'
import EmailIcon from "../../../assets/icons/settings-icon.svg?react"

const AccountSettings = () => {

    const { data: user } = useQuery({
        queryFn: fetchMe,
        queryKey: ["users", "me"],
    });

    // Функция для получения инициалов
    const getInitials = (name: string, surname: string) => {
        // Берем первую букву имени и первую букву фамилии
        const firstInitial = name ? name.charAt(0).toUpperCase() : '';
        const lastInitial = surname ? surname.charAt(0).toUpperCase() : '';

        // Возвращаем инициалы (например: "ИФ")
        return `${firstInitial}${lastInitial}`;
    };
    if (!user) return <div>Загрузка...</div>;

    const initials = getInitials(user.name, user.surname);

    return (
        <div className="settings">
            <ul className="settings__list">
                <li className="settings__item">
                    <span className="settings__svg-container">
                        {initials}
                    </span>
                    <div className="settings__wrapper">
                        <h2 className="settings__title">Имя Фамилия</h2>
                        <p className="settings__info">{user.name} {user.surname}</p>
                    </div>
                </li>

                <li className="settings__item">
                    <span className="settings__svg-container settings__svg-container--email">
                        <EmailIcon className="settings__svg" />
                    </span>
                    <div className="settings__wrapper">

                        <h2 className="settings__title">Электронная почта</h2>
                        <p className="settings__info">{user.email}</p>
                    </div>

                </li>


            </ul>
            <button className="settings__btn" onClick={() => logout()}>Выйти из аккаунта</button>
        </div>
    )
}

export default AccountSettings