import cx from 'classnames';
import { ChangeEvent, FC, useState } from 'preact/compat';

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
    autoConfirm?: boolean;
    onValueChange?: (value: string) => void;
    onConfirmValue?: (value: string) => void;
    onCancelValue?: () => void;
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
    autoConfirm,
    onValueChange,
    onConfirmValue,
    onCancelValue,
    className,
}) => {
    const [currentValue, setCurrentValue] = useState<string | undefined>();

    const handleChange = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        const v = target?.value || '';
        setCurrentValue(v);
        onValueChange?.(v);
    };

    const confirm = () => {
        setCurrentValue(undefined);
        onConfirmValue?.(currentValue || '');
    };

    const cancel = () => {
        setCurrentValue(undefined);
        onCancelValue?.();
    };

    const handleFocus = () => {
        setCurrentValue(value);
    };

    const handleBlur = () => {
        if (autoConfirm) {
            confirm();
        } else {
            cancel();
        }
    };

    const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === 'Escape') {
            cancel();
        } else if (ev.key === 'Enter') {
            confirm();
        } else if (currentValue === undefined) {
            setCurrentValue(value);
        }
    };

    const classNames = cx('Input', className, `Input-size-${size}`, {
        'is-modified': currentValue !== undefined && currentValue !== value,
    });

    return (
        <input
            id={id}
            type={type}
            value={currentValue === undefined ? value : currentValue}
            maxLength={maxLength}
            min={min}
            max={max}
            disabled={disabled}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            class={classNames}
        />
    );
};
