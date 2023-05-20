import { FC } from 'preact/compat';

import { TimeStack } from '../../stacks/TimeStack/TimeStack';

export const MainScreen: FC = () => {
    return (
        <main>
            <TimeStack />
        </main>
    );
};
