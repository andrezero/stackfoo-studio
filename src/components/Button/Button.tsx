import cx from 'classnames';
import { ComponentChildren } from 'preact';
import { FC } from 'preact/compat';

import './Button.css';

export interface ButtonProps {
    size?: string;
    onClick?: () => void;
    onTap?: () => void;
    active?: boolean;
    disabled?: boolean;
    className?: string;
    children?: ComponentChildren;
}

export const Button: FC<ButtonProps> = ({
    size = 'm',
    onClick,
    onTap,
    active,
    disabled,
    className,
    children,
}) => {
    const classNames = cx(
        'Button',
        { 'is-active': active },
        `Button-size-${size}`,
        className
    );

    const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === 'Enter') {
            onTap?.();
        }
    };

    const handleKeyPress = (ev: KeyboardEvent) => {
        ev.preventDefault();
        if (!onTap && ev.key === 'Enter') {
            onClick?.();
        }
    };

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            onMouseDown={onTap}
            onTouchStart={onTap}
            onKeyDown={handleKeyDown}
            onKeyPress={handleKeyPress}
            class={classNames}
        >
            {children}
        </button>
    );
};
