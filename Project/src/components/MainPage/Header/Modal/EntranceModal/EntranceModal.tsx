import LogoIcon from "../../../../../assets/icons/black-logo.svg?react";
import CloseIcon from "../../../../../assets/icons/close-icon.svg?react"
import "../Modal.scss";
import "../InputModal.scss";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient } from "../../../../../api/queryClient"
import { login } from "../../../../type/user.type"
import { EmailIcon } from "../../../../../assets/icons/EmailIcon/EmailIcon";
import { PasswordIcon } from "../../../../../assets/icons/PasswordIcon/PasswordIcon";


interface EntranceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToAuth: () => void;
}

export const EntranceModal = ({ isOpen, onClose, onSwitchToAuth }: EntranceModalProps) => {
    //  состояние  формы
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    //отправляем данные на сервер
    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["users", "me"] });
            onClose(); // Закрыть модалку после успешного входа
        },
    }, queryClient);


    //условный рендер
    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        // Отправка данных для входа
        loginMutation.mutate({
            email: formData.email,
            password: formData.password
        });
    };

    return (

        <div className="modal" onClick={onClose}>
            {/* при клике по фогу модалка закрывается */}
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                {/* e.stopPropagation() = "не передавай клик родителям".Иначе фон не закроется 
                Клик на контент → не закрываем (блокируем всплытие)
                */}

                <LogoIcon className="modal__logo" />

                <form className="modal__form" onSubmit={handleSubmit}>
                    <div className="modal__wrapper">

                        <div className="input-modal">
                            <input
                                type="email"
                                placeholder="Электронная почта"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="input-modal__filed"
                            />
                            <EmailIcon className="input-modal__svg" />
                        </div>

                        <div className="input-modal">
                            <input
                                type="password"
                                placeholder="Пароль"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="input-modal__filed"
                            />
                            <PasswordIcon className="input-modal__svg" />
                        </div>

                    </div>


                    {loginMutation.error && <span> {loginMutation.error.message}</span>}

                    <button className="modal__btn"
                        type="submit"
                    >
                        Войти
                    </button>
                </form>

                <button
                    className="modal__btn-black"
                    type="button"
                    onClick={onSwitchToAuth}
                >
                    Регистрация
                </button>
                <button className="modal__close"
                    onClick={onClose}

                >
                    <CloseIcon className="modal__svg" />
                </button>
            </div>
        </div>
    );
};
