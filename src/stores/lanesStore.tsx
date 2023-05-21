import { create } from 'zustand';

import { Lane } from '../types/studio';

type LanesState = {
    lanes: Lane[];
};

const EXAMPLE_LANE: Lane = {
    id: '1',
    name: 'drums',
    parts: [{ part: '1', time: 0 }],
};

const useStore = create<LanesState>(() => ({
    lanes: [EXAMPLE_LANE],
}));

export const useLanesStore = useStore;
