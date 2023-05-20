import cx from 'classnames';
import { ChangeEvent, FC } from 'preact/compat';

import './Select.css';
import { ComponentChildren } from 'preact';

export interface SelectProps {
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
    children?: ComponentChildren;
}

export const Select: FC<SelectProps> = ({
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
    children,
}) => {
    const handleChange = (event: ChangeEvent) => {
        const target = event.target as HTMLSelectElement;
        onValueChange?.(target?.value || '');
    };

    const classNames = cx('Select', className, `Select-size-${size}`);

    return (
        <select
            id={id}
            type={type}
            value={value}
            maxLength={maxLength}
            min={min}
            max={max}
            disabled={disabled}
            onChange={handleChange}
            class={classNames}
        >
            {children}
        </select>
    );
};
