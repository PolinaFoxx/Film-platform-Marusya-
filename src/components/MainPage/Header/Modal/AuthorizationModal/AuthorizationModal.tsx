import "../Modal.scss";
import "../InputModal.scss";

import CloseIcon from "../../../../../assets/icons/close-icon.svg?react"
import LogoIcon from "../../../../../assets/icons/black-logo.svg?react";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { registerUser } from "../../../../type/user.type"
import { queryClient } from "../../../../../api/queryClient"
import { EmailIcon } from "../../../../../assets/icons/EmailIcon/EmailIcon";
import { FioIcon } from "../../../../../assets/icons/FioIcon/FioIcon";
import { PasswordIcon } from "../../../../../assets/icons/PasswordIcon/PasswordIcon";

interface AuthorizationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToSuccess: () => void;
    onSwitchToLogin?: () => void
}

export const AuthorizationModal = ({ isOpen, onClose, onSwitchToSuccess, onSwitchToLogin }: AuthorizationModalProps) => {

    const [formData, setFormData] = useState({
        email: "",
        name: "",
        surname: "",
        password: "",
        confirmPassword: ""
    });

    const [showErrors, setShowErrors] = useState(false);

    const regMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            onSwitchToSuccess();
        }
    }, queryClient)

    //условный рендер
    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const isFormValid =
            formData.email.trim() !== "" &&
            formData.name.trim() !== "" &&
            formData.surname.trim() !== "" &&
            formData.password.trim() !== "" &&
            formData.confirmPassword.trim() !== "" &&
            formData.password === formData.confirmPassword;

        if (!isFormValid) {
            setShowErrors(true);
            return;
        }
        setShowErrors(false);

        const userData = {
            email: formData.email,
            password: formData.password,
            name: formData.name,
            surname: formData.surname
        };

        regMutation.mutate(userData);
    };

    return (

        <div className="modal" onClick={onClose}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
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
                                className={`input-modal__filed ${showErrors && !formData.email.trim() ? 'input-modal__filed--error' : ''}`}
                            />
                            <EmailIcon className="input-modal__svg" />
                        </div>

                        <div className="input-modal">
                            <input
                                type="text"
                                placeholder="Имя"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className={`input-modal__filed ${showErrors && !formData.name.trim() ? 'input-modal__filed--error' : ''}`}
                            />
                            <FioIcon className="input-modal__svg" />

                        </div>

                        <div className="input-modal">
                            <input
                                type="text"
                                placeholder="Фамилия"
                                name="surname"
                                value={formData.surname}
                                onChange={handleChange}
                                required
                                className={`input-modal__filed ${showErrors && !formData.surname.trim() ? 'input-modal__filed--error' : ''}`}
                            />
                            <FioIcon className="input-modal__svg" />

                        </div>

                        <div className="input-modal">
                            <input
                                type="password"
                                placeholder="Пароль"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className={`input-modal__filed ${showErrors && !formData.password.trim() ? 'input-modal__filed--error' : ''}`}
                            />
                            <PasswordIcon className="input-modal__svg" />
                        </div>

                        <div className="input-modal">
                            <input
                                type="password"
                                placeholder="Подтвердите пароль"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className={`input-modal__filed ${showErrors && (!formData.confirmPassword.trim() || formData.password !== formData.confirmPassword) ? '--error' : ''}`}
                            />
                            <PasswordIcon className="input-modal__svg" />

                        </div>
                    </div>
                    {/* Сообщение об ошибке */}
                    {showErrors && (
                        <div style={{ color: 'red', marginBottom: '16px', textAlign: 'center' }}>
                            {formData.password !== formData.confirmPassword
                                ? 'Пароли не совпадают!'
                                : 'Пожалуйста, заполните все поля'}
                        </div>
                    )}

                    {regMutation.error && (
                        <div style={{ color: 'red', marginBottom: '16px', textAlign: 'center' }}>
                            {regMutation.error.message}
                        </div>
                    )}
                    <button type="submit" className="modal__btn">
                        Создать аккаунт
                    </button>

                </form>
                {/* Кнопка для перехода ко входу */}
                <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="modal__btn-black"
                >
                    У меня есть пароль
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
