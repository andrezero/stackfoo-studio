import cx from 'classnames';
import { ChangeEvent, FC } from 'preact/compat';

import './Input.css';

export interface InputProps {
    id?: string;
    type?: string;
    size?: 's' | 'm' | 'l';
    value?: string;
    maxLength?: number;
    min?: number;
    max?: number;
    disabled?: boolean;
    onValueChange?: (id: string) => void;
    className?: string;
}

export const Input: FC<InputProps> = ({
    id,
    type,
    size = 'm',
    value,
    maxLength,
    min,
    max,
    disabled,
    onValueChange,
    className,
}) => {
    const handleChange = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        onValueChange?.(target?.value || '');
    };

    const classNames = cx('Input', className, `Input-size-${size}`);

    return (
        <input
            id={id}
            type={type}
            value={value}
            maxLength={maxLength}
            min={min}
            max={max}
            disabled={disabled}
            onChange={handleChange}
            class={classNames}
        />
    );
};
