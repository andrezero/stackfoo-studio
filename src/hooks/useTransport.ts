import { Transport } from 'tone';

import { useTransportStore } from '../stores/transportStore';

export const useTransport = () => {
    const { isPlaying, setIsPlaying } = useTransportStore();

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
