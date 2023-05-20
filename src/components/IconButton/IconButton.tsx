import { FC } from 'preact/compat';

import { Button, ButtonProps } from '../Button';

import './IconButton.css';

export interface IconButtonProps extends ButtonProps {}

export const IconButton: FC<IconButtonProps> = ({
    className,
    children,
    ...props
}) => {
    return (
        <Button {...props} className={`IconButton ${className || ''}`}>
            {children}
        </Button>
    );
};
