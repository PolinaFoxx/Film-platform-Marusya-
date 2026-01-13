import SearchIcon from '../../../../assets/icons/search-icon.svg?react';
import EraseIcon from '../../../../assets/icons/erase-icon.svg?react';

import './FormSearch.scss'
import './CustomInputSearch.scss'

import { useCallback, useEffect, useState } from 'react';

type FormSize = "full" | "small";

interface TProps {
    value: string;
    onChange: (value: string) => void;
    onClose: () => void;
    //     disabled?: boolean;
    placeholder?: string;
    size?: FormSize;
}
export const FormSearch = ({ placeholder, value, onChange, size = 'full', onClose }: TProps) => {

    //Локасльное состояние  для того чтобы не вызывать перерендр родителя при каждом изменении инпута
    const [localValue, setLocalValue] = useState(value); //принимает текущее значение пропса value из родителя
    // После инициализации localValue живет своей жизнью и не синхронизируется автоматически с пропсом value. Только через useEffect.


    // Синхронизация с внешним value().
    // если родительское состояние value меняется (не через onChange этого компонента), то локальное состояние синхронизируется.
    useEffect(() => {
        //если значение в инпуте поменяется извне(сброс формы родителем)
        setLocalValue(value);//обновляем локальное состояние localValue чтобы оно соотвествовало value из родителя
    }, [value]);

    //Используем useCallback используется для мемоизации функции, чтобы она не пересоздавалась при каждом рендере, если не изменились зависимости
    const handleClear = useCallback(//useCallback запоминает функцию между рендерами
        (e: React.MouseEvent) => {
            e.preventDefault();
            setLocalValue('');//очищаем локальное состояние
            // Имитируем событие onChange для Header
            onChange('');//передаем пустую строку
        }, [onChange]
    );

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        setLocalValue(newValue);//обновляем локальное состяние localValue
        onChange(newValue);//передаем значение
        //для того чтобы родитель мог обновиться
    }, [onChange]);

    if (size === 'small') {
        return (
            <div className='search-bg' onClick={onClose}>
                <form action="" className='form-search--mobile' onClick={(e) => e.stopPropagation()}>
                    <div className="custom-input">
                        <input
                            type="text"
                            value={localValue}
                            onChange={handleInputChange}
                            placeholder={placeholder}
                            // disabled={disabled}
                            className="custom-input__field" aria-label="Поле поиска" name="search-field" />

                        <button className="custom-input__btn" aria-label="Выполнить поиск" type="button">
                            <SearchIcon className='custom-input__svg' />
                        </button>
                        <button className='custom-input__btn custom-input__btn--erase'
                            type='button'
                            onClick={handleClear}
                        >
                            <EraseIcon className="custom-input__svg custom-input__svg--erase" />
                        </button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <form action="" className='form-search'>
            <div className="custom-input">
                <input
                    type="text"
                    value={localValue}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    // disabled={disabled}
                    className="custom-input__field" aria-label="Поле поиска" name="search-field" />

                <button className="custom-input__btn" aria-label="Выполнить поиск" type="button">
                    <SearchIcon className='custom-input__svg' />
                </button>
                {/* кнопка очистки показывается если localValue.length больше нуля т.е в  localValue что-то есть*/}
                {localValue.length > 0 && (
                    <button className='custom-input__btn custom-input__btn--erase'
                        type='button'
                        onClick={handleClear}
                    >
                        <EraseIcon className="custom-input__svg custom-input__svg--erase" />
                    </button>
                )}
            </div>
        </form>
    )
}