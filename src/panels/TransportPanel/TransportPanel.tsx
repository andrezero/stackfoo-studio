import { Loop, Transport } from 'tone';
import { FC } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';
import { Time } from 'tone/build/esm/core/type/Units';

import { useTransport } from '../../hooks/useTransport';
import { IconButton } from '../../components/IconButton';
import { Input } from '../../components/Input';
import { Panel } from '../../components/Panel';
import { PanelTitle } from '../../components/PanelTitle';
import { formatPosition } from '../../utils/position';

import './TransportPanel.css';

export const TransportPanel: FC = () => {
    const { isPlaying, toggle, rewind } = useTransport();
    const [position, setPosition] = useState<Time>(Transport.position);

    const handleRewindClick = () => {
        rewind();
    };

    const handlePlayClick = () => {
        toggle();
    };

    useEffect(() => {
        Transport.on('ticks', () => {
            setPosition(Transport.position);
        });

        new Loop(() => setPosition(Transport.position), '16n').start(0);
    }, []);

    return (
        <Panel className="TransportPanel" horizontal>
            <PanelTitle label="T">Transport</PanelTitle>
            <Input
                type="text"
                value={`${formatPosition(`${position}`)}`}
                maxLength={7}
                className="PositionInput"
            />
            <div class="actions">
                <IconButton onClick={handleRewindClick}>⧏</IconButton>
                <IconButton onClick={handlePlayClick} active={isPlaying}>
                    {isPlaying ? '◾' : '▶'}
                </IconButton>
            </div>
        </Panel>
    );
};
