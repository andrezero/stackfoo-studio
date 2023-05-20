import cx from 'classnames';
import { ComponentChildren } from 'preact';
import { FC } from 'preact/compat';

import './Panel.css';

export interface PanelProps {
    className?: string;
    horizontal?: boolean;
    children?: ComponentChildren;
}

export const Panel: FC<PanelProps> = ({ className, horizontal, children }) => {
    const classNames = cx('Panel', className, { horizontal });

    return <div class={classNames}>{children}</div>;
};
