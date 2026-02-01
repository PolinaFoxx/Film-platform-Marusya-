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
    placeholder?: string;
    size?: FormSize;
}
export const FormSearch = ({ placeholder, value, onChange, size = 'full', onClose }: TProps) => {

    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleClear = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            setLocalValue('');
            onChange('');
        }, [onChange]
    );

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        setLocalValue(newValue);
        onChange(newValue);
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
                    className="custom-input__field" aria-label="Поле поиска" name="search-field" />

                <button className="custom-input__btn" aria-label="Выполнить поиск" type="button">
                    <SearchIcon className='custom-input__svg' />
                </button>
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