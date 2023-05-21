import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import { Sampler, Transport } from 'tone';

import { useTransportStore } from '../stores/transportStore';

import click from '../samples/click.wav';
import wood from '../samples/wood.mp3';

const steps = [
    ,
    ,
    ,
    { accents: [1] }, // 3
    { accents: [2] }, // 4
    { accents: [2, 4] }, // 5
    { accents: [3] }, // 6
    { accents: [3, 5] }, // 7
    { accents: [3, 6] }, // 8
    { accents: [4, 7] }, // 9
    { accents: [4, 8] }, // 10
    { accents: [5, 8] }, // 11
    { accents: [5, 10] }, // 12
    { accents: [6, 11] }, // 13
    { accents: [6, 12] }, // 14
    { accents: [4, 10, 13] }, // 15
    { accents: [4, 10, 14] }, // 16
];

export const useMetronome = (num: number, div: number, mute: boolean) => {
    const sampler = useRef<Sampler | null>(null);
    const [isOn, setIsOn] = useState<boolean>(false);
    const [isReady, setReady] = useState(false);

    const { isPlaying } = useTransportStore();

    useEffect(() => {
        sampler.current = new Sampler(
            { C1: click, C2: wood },
            {
                onload: () => setReady(true),
            }
        ).toDestination();
    }, []);

    const tickMetronome = useCallback(
        (time: number) => {
            const bbs = Transport.position;
            const [_, b, s] = (bbs as string).split(':');
            const beat = parseInt(b);
            const sub = parseInt(s);
            const accents = steps[num]?.accents || [];
            const velocity = !beat
                ? 1
                : sub
                ? 0.2
                : accents.includes(beat)
                ? 1
                : 0.5;
            const note = !beat && !sub ? 'C1' : 'C2';
            console.log(beat, accents);
            sampler.current?.triggerAttackRelease(
                note,
                `${div}n`,
                time,
                velocity
            );
        },
        [num, div]
    );

    useEffect(() => {
        if (!isPlaying || !isOn || mute) {
            return;
        }
        const id = Transport.scheduleRepeat(tickMetronome, `${div}n`, 0);
        return () => {
            Transport.clear(id);
        };
    }, [num, div, isPlaying, isOn, mute]);

    const toggle = () => {
        setIsOn(!isOn);
    };

    return {
        isOn,
        isReady,
        toggle,
    };
};
