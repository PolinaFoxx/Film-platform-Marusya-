import LogoIcon from "../../../../../assets/icons/black-logo.svg?react";
import CloseIcon from "../../../../../assets/icons/close-icon.svg?react"

import "../Modal.scss";
interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToEntrance: () => void;
}

export const SuccessModal = ({ isOpen, onClose, onSwitchToEntrance }: SuccessModalProps) => {
    //условный рендер
    if (!isOpen) return null;

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                <LogoIcon className="modal__logo" />
                <h2 className="modal__title">
                    Регистрация завершена
                </h2>
                <p className="modal__text">Используйте вашу электронную почту для входа</p>
                <button
                    className="modal__btn"
                    onClick={onSwitchToEntrance}
                >
                    Войти
                </button>

                <button className="modal__close"
                    onClick={onClose}
                >
                    <CloseIcon className="modal__svg" />
                </button>
            </div>
        </div>
    )
}
