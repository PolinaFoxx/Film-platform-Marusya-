import './Footer.scss'
import Vk from "../../assets/icons/vk.svg?react"
import YouTube from "../../assets/icons/youtube.svg?react"
import Ok from "../../assets/icons/ok.svg?react"
import Tg from "../../assets/icons/telegram.svg?react"

export const Footer = () => {
    return (
        <footer className='footer'>
            <div className='container'>
                <div className='footer__wrapper'>

                    <ul className='footer__list'>
                        <li className='footer__item'>
                            <a href="#" className='footer__link'>
                                <Vk className='footer__svg' />
                            </a>
                        </li>
                        <li className='footer__item'>
                            <a href="#" className='footer__link'>
                                <YouTube className='footer__svg' />
                            </a>
                        </li>

                        <li className='footer__item'>
                            <a href="#" className='footer__link'>
                                <Ok className='footer__svg' />
                            </a>
                        </li>

                        <li className='footer__item'>
                            <a href="#" className='footer__link'>
                                <Tg className='footer__svg' />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};