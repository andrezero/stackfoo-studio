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
        const value =
            Math.round(100 * Math.min(Math.max(bpm, MIN_BPM), MAX_BPM)) / 100;
        Transport.bpm.value = value;
        set(() => {
            return { bpm: value };
        });
    },
}));
