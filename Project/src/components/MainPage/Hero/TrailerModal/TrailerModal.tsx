import './TrailerModal.scss'

import CloseIcon from "../../../../assets/icons/close-icon.svg?react"
import Loader from './Loader/Loader';
import { useState } from 'react';

interface HeroPropsTrilerId {
    trailerId: string | null;
    isOpen: boolean;
    onClose: () => void;
}

const TrailerModal = ({ trailerId, isOpen, onClose }: HeroPropsTrilerId) => {
    const [isLoading, setIsLoading] = useState(true);


    
    const handleIframeLoad = () => {
        setIsLoading(false);
    };

    
    const handleClose = () => {
        setIsLoading(true); // Сбрасываем при закрытии
        onClose();
    };

    //isModalOpen: true — модалка открыта (когда получили trailerId) когда запрос отправился 
    if (!isOpen) return null; // Не показывать если не открыта

    return (

        <div className='trailer-modal'>
            {/* Показываем лоадер, если видео грузится */}
            {isLoading && (
                <div className="trailer-modal__loader">
                    <Loader />
                </div>
            )}            <iframe
                className='trailer-modal__video'
                src={`https://www.youtube.com/embed/${trailerId}`}
                title="Трейлер"
                allowFullScreen
                onLoad={handleIframeLoad}

            />
            <button onClick={handleClose} className='trailer-modal__btn' >
                <CloseIcon  className='trailer-modal__svg'/>
            </button>
        </div>
    )
}
export default TrailerModal