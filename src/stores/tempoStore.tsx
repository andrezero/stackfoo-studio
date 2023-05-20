import { Transport } from 'tone';
import { create } from 'zustand';

const DEFAULT_BPM = 100;

export const MIN_BPM = 30;
export const MAX_BPM = 300;

type TempoState = {
    bpm: number;
    setBpm: (bpm: number) => void;
};

export const useTempoStore = create<TempoState>((set) => ({
    bpm: DEFAULT_BPM,
    setBpm: (bpm) => {
        Transport.bpm.value = bpm;
        set(() => {
            return { bpm };
        });
    },
}));
