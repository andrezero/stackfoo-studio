import { context } from 'tone';
import { create } from 'zustand';

type ToneState = {
    isReady: boolean;
    setIsReady: () => Promise<void>;
};

export const useToneStore = create<ToneState>((set) => ({
    isReady: false,
    setIsReady: async () => {
        await context.resume();
        set({ isReady: true });
    },
}));
