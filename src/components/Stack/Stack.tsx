import cx from 'classnames';
import { ComponentChildren } from 'preact';
import { FC } from 'preact/compat';

import './Stack.css';

export interface StackProps {
    className?: string;
    columns?: number;
    children?: ComponentChildren;
}

export const Stack: FC<StackProps> = ({ className, columns, children }) => {
    const classNames = cx('Stack', className);
    return (
        <div class={classNames} style={{ '--columns': columns }}>
            {children}
        </div>
    );
};
