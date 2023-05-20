import { useState } from 'preact/hooks';
import { Transport } from 'tone';

export const useTransport = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const toggle = () => {
        if (!isPlaying) {
            Transport.start();
        } else {
            Transport.pause();
        }
        setIsPlaying(!isPlaying);
    };

    const rewind = () => (Transport.position = 0);

    return {
        isPlaying,
        toggle,
        rewind,
        time: Transport.position,
    };
};
