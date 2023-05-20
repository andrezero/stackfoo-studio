import { Transport } from 'tone';
import { create } from 'zustand';

const DEFAULT_SIG_NUM = 4;
const DEFAULT_SIG_DIV = 4;

export const MIN_SIG_NUM = 2;
export const MAX_SIG_NUM = 16;
export const SIG_DIV_OPTIONS = [4, 8, 16];

type SignatureState = {
    num: number;
    setNum: (num: number) => void;
    div: number;
    setDiv: (div: number) => void;
};

const updateSignature = (num: number, div: number) => {
    Transport.timeSignature = num / (div / 4);
};

export const useSignatureStore = create<SignatureState>((set) => ({
    num: DEFAULT_SIG_NUM,
    setNum: (num) =>
        set(({ div }) => {
            updateSignature(num, div);
            return { num };
        }),
    div: DEFAULT_SIG_DIV,
    setDiv: (div) =>
        set(({ num }) => {
            updateSignature(num, div);
            return { div };
        }),
}));
