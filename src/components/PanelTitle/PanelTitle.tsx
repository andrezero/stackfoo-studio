import cx from 'classnames';
import { ComponentChildren } from 'preact';
import { FC } from 'preact/compat';

import './PanelTitle.css';

export interface PanelTitleProps {
    className?: string;
    label?: string;
    children?: ComponentChildren;
}

export const PanelTitle: FC<PanelTitleProps> = ({
    className,
    label,
    children,
}) => {
    const classNames = cx('PanelTitle', className);

    return (
        <h3 class={classNames}>
            {label && <span class="label">{label}</span>}
            <span class="title">{children}</span>
        </h3>
    );
};
