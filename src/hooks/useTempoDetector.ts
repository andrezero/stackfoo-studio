import { useState } from 'preact/hooks';

import { MAX_BPM, MIN_BPM, useTempoStore } from '../stores/tempoStore';

const IDLE_TIMEOUT_MS = 2500;
const MINUTE = 60000;
const MIN_ENTRIES = 3;
const MAX_ENTRIES = 5;

type Stability = 'good' | 'bad' | 'terrible';

type TempoDetector = {
    tap: () => void;
    isDetecting: boolean;
    count: number;
    delta?: number;
    stable?: Stability;
};

const stabilityThresholds: Record<Stability, number> = {
    good: 1,
    bad: 2,
    terrible: 8,
};

export const useTempoDetector = (): TempoDetector => {
    const { bpm, setBpm } = useTempoStore();
    const [timeoutId, setTimeoutId] = useState<number>();
    const [isDetecting, setIsDetecting] = useState<boolean>(false);
    const [entries, setEntries] = useState<number[]>([]);

    const first = entries[0] || 0;
    const last = entries.length > 1 ? entries[entries.length - 1] : 0;
    const prev = entries.length > 2 ? entries[entries.length - 2] : 0;
    const isValid = first && last;

    const avg = isValid
        ? (MINUTE * (entries.length - 1)) / (last - first)
        : undefined;
    const newBpm = avg && Math.round(avg * 100) / 100;

    const delta = avg && prev && MINUTE / (last - prev) - avg;
    const adjusted = delta && newBpm && (delta * 10) / newBpm;
    const stable =
        ((adjusted &&
            Object.entries(stabilityThresholds).find(
                ([_, value]) => value > Math.abs(adjusted)
            )?.[0]) as Stability) || 'terrible';

    if (newBpm) {
        const value = Math.min(MAX_BPM, Math.max(MIN_BPM, newBpm));
        if (value !== bpm) {
            setBpm(value);
        }
    }

    const count =
        MIN_ENTRIES > entries.length ? MIN_ENTRIES - entries.length : 0;

    return {
        tap: () => {
            clearTimeout(timeoutId);
            const timeout = setTimeout(() => {
                setEntries([]);
                setIsDetecting(false);
            }, IDLE_TIMEOUT_MS);
            setTimeoutId(timeout);
            const previous = isDetecting ? entries : [];
            const now = Date.now();
            setIsDetecting(true);
            setEntries([...previous, now].slice(-1 * MAX_ENTRIES));
        },
        isDetecting,
        count,
        delta: adjusted,
        stable: stable || 'good',
    };
};
