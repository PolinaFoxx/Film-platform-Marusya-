import { Link, Navigate, Outlet } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../../components/type/user.type";
import './MyAccountPage.scss';
import LikeIcon from "../../assets/icons/icon-like.svg?react"
import AccountIcon from "../../assets/icons/icon-account.svg?react"


const MyAccountPage = () => {
    const { data: user } = useQuery({
        queryFn: fetchMe,
        queryKey: ["users", "me"],
    });

    if (!user) {
        return <Navigate to="/" replace />;
    }
    return (
        <section className="account">
            <div className="container">

                <h1 className="account__title">Мой аккаунт</h1>
                <ul className="account__list">
                    <li className="account__item" >
                        <LikeIcon className="account__icon" />
                        <Link to="/account/favorites" className="account__link" >Избранные <span className="account__link-mobile">фильмы</span></Link>
                    </li>
                    <li className="account__item" >
                        <AccountIcon className="account__icon" />
                        <Link to="/account/settings" className="account__link">Настройка  <span className="account__link-mobile">аккаунта</span></Link>
                    </li>
                </ul>
                <Outlet />
            </div>

        </section>
    )

}
export default MyAccountPage