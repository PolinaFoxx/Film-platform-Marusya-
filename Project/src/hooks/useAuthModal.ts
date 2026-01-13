// hooks/useAuthModal.ts
import { useState } from 'react';

type ModalType = 'login' | 'register' | null;

export const useAuthModal = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  
  const open = (type: 'login' | 'register') => setActiveModal(type);
  const close = () => setActiveModal(null);
  const switchTo = (type: 'login' | 'register') => setActiveModal(type);
  
  return {
    // Состояния
    isLoginOpen: activeModal === 'login',
    isRegisterOpen: activeModal === 'register',
    isOpen: activeModal !== null,
    
    // Методы
    openLogin: () => open('login'),
    openRegister: () => open('register'),
    closeModal: close,
    switchToLogin: () => switchTo('login'),
    switchToRegister: () => switchTo('register'),
    
    // Для прямого доступа
    activeModal,
  };
};