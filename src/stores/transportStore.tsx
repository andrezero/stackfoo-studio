import { create } from 'zustand';

type TransportState = {
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
};

const useStore = create<TransportState>((set) => ({
    isPlaying: false,
    setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
}));

export const useTransportStore = useStore;
