import { create } from 'zustand';

import { Instrument } from '../types/studio';

type InstrumentState = {
    instruments: Instrument[];
};

const EXAMPLE_INSTRUMENT = { id: '1', name: 'nena' };

const useStore = create<InstrumentState>(() => ({
    instruments: [EXAMPLE_INSTRUMENT],
}));

export const useInstrumentsStore = useStore;
