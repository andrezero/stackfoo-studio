import { create } from 'zustand';

import { Channel } from '../types/studio';

type ChannelsState = {
    channels: Channel[];
};

const EXAMPLE_CHANNEL: Channel = { id: '1', name: 'A', volume: 100 };

const useStore = create<ChannelsState>(() => ({
    channels: [EXAMPLE_CHANNEL],
}));

export const useChannelsStore = useStore;
