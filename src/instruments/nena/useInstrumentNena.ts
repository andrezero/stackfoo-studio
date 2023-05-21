import { useEffect } from 'preact/hooks';
import { Transport, TransportTime } from 'tone';

export const useInstrumentNena = () => {
    const tick = (time: number) => {
        const bbs = TransportTime().toBarsBeatsSixteenths();
        const beat = parseInt(bbs.split(':')[1]);

        console.log('nena', bbs, beat, time);
    };

    useEffect(() => {
        const id = Transport.scheduleRepeat((time) => tick(time), '1m', '@4n');
        return () => {
            console.log('clearing nena');
            Transport.clear(id);
        };
    }, []);
};
