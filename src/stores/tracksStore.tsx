import { create } from 'zustand';

import { Track } from '../types/studio';

type TrackState = {
    tracks: Track[];
};

const EXAMPLE_TRACK: Track = {
    id: '1',
    name: 'nena',
    type: 'instrument',
    instrument: '1',
    lanes: [{ lane: '1' }],
    channels: [{ channel: '1', tag: 'out' }],
};

const useStore = create<TrackState>(() => ({
    tracks: [EXAMPLE_TRACK],
}));

export const useTracksStore = useStore;
