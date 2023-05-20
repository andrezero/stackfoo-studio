import { useEffect, useRef, useState } from 'preact/hooks';
import { Sampler } from 'tone';

import click from '../samples/click.wav';

export const useAudioFeedback = () => {
    const sampler = useRef<Sampler | null>(null);

    const [isReady, setReady] = useState(false);

    useEffect(() => {
        sampler.current = new Sampler(
            { A1: click },
            {
                onload: () => setReady(true),
            }
        ).toDestination();
    }, []);

    const play = () => {
        if (isReady) {
            sampler.current?.triggerAttack('A1');
        }
    };

    return {
        isReady,
        play,
    };
};
