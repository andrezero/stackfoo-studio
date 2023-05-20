import { FC } from 'preact/compat';

import { Stack } from '../../components/Stack';
import { TransportPanel } from '../../panels/TransportPanel';
import { MetronomePanel } from '../../panels/MetronomePanel';

export const TimeStack: FC = () => {
    return (
        <Stack columns={3}>
            <section>
                <TransportPanel />
            </section>
            <section>
                <MetronomePanel />
            </section>
        </Stack>
    );
};
