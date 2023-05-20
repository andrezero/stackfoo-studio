import { FC } from 'preact/compat';

import { useToneStore } from './stores/toneStore';
import { MainScreen } from './screens/MainScreen/MainScreen';
import { SplashScreen } from './screens/SplashScreen/SplashScreen';

import './app.css';

export const App: FC = () => {
    const { isReady } = useToneStore();

    return <>{!isReady ? <SplashScreen /> : <MainScreen />}</>;
};
