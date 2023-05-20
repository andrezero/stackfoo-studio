import { useEffect, useRef, useState } from 'preact/hooks';
import { Sampler, Transport, TransportTime } from 'tone';

import click from '../samples/click.wav';
import wood from '../samples/wood.mp3';

const steps = [
    { time: 0, note: 'C1', velocity: 0.7 },
    { time: '0:1', note: 'C2', velocity: 0.5 },
    { time: '0:2', note: 'C2', velocity: 0.5 },
    { time: '0:3', note: 'C2', velocity: 0.5 },
    { time: '1:0', note: 'C2', velocity: 0.5 },
    { time: '1:1', note: 'C2', velocity: 0.5 },
    { time: '1:2', note: 'C2', velocity: 0.5 },
    { time: '1:3', note: 'C2', velocity: 0.5 },
    { time: '2:0', note: 'C2', velocity: 0.5 },
    { time: '2:1', note: 'C2', velocity: 0.5 },
    { time: '2:2', note: 'C2', velocity: 0.5 },
    { time: '2:3', note: 'C2', velocity: 0.5 },
    { time: '3:0', note: 'C2', velocity: 0.5 },
    { time: '3:1', note: 'C2', velocity: 0.5 },
    { time: '3:2', note: 'C2', velocity: 0.5 },
    { time: '3:3', note: 'C2', velocity: 0.5 },
];

export const useMetronome = () => {
    const sampler = useRef<Sampler | null>(null);
    const [isOn, setIsOn] = useState<boolean>(false);
    const [isReady, setReady] = useState(false);

    const isOnRef = useRef<boolean>(false);

    useEffect(() => {
        sampler.current = new Sampler(
            { C1: click, C2: wood },
            {
                onload: () => setReady(true),
            }
        ).toDestination();

        Transport.scheduleRepeat((time) => tickMetronome(time), '4n', '@4n');
    }, []);

    const tickMetronome = (time: number) => {
        if (!isOnRef.current) {
            return;
        }
        const bbs = TransportTime().toBarsBeatsSixteenths();
        const beat = parseInt(bbs.split(':')[1]);
        sampler.current?.triggerAttackRelease(
            steps[beat].note,
            '4n',
            time,
            steps[beat].velocity
        );
    };

    const toggle = () => {
        setIsOn(!isOn);
        isOnRef.current = !isOn;
    };

    return {
        isOn,
        isReady,
        toggle,
    };
};
