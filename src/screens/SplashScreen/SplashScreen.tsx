import { FC, useState } from 'preact/compat';

import { useToneStore } from '../../stores/toneStore';
import { Button } from '../../components/Button';

import './SplashScreen.css';

export interface SpashScreenProps {}

export const SplashScreen: FC<SpashScreenProps> = () => {
    const [isStarting, setIsStarting] = useState(false);

    const { setIsReady } = useToneStore();

    const handleClick = async () => {
        setIsStarting(true);
        await setIsReady();
        console.info('Tone started');
    };

    return (
        <div className="SplashScreen">
            <Button size="l" disabled={isStarting} onClick={handleClick}>
                {isStarting ? '...' : 'Foo'}
            </Button>
        </div>
    );
};
