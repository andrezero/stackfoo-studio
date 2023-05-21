import { Time } from 'tone/build/esm/core/type/Units';

export type FooEventType =
    | 'note'
    | 'cc'
    | 'pc'
    | 'tempo'
    | 'signature'
    | 'volume';

export type FooEvent = {
    id: string;
    type: FooEventType;
    time: Time;
    value: FooNoteValue;
};
export type FooNoteValue = {
    note: string;
    velocity?: number;
    duration?: number;
};

export type FooNoteEvent = FooEvent & {
    type: 'note';
    value: FooNoteValue;
};

export type Part = {
    id: string;
    name: string;
    events: FooEvent[];
};

export type LanePart = {
    part: string;
    time: Time;
};

export type Lane = {
    id: string;
    name: string;
    parts: LanePart[];
};

export type TrackLane = {
    lane: string;
};

export type TrackType = 'instrument' | 'audio';

export type Track = {
    id: string;
    name: string;
    type: TrackType;
    instrument?: string;
    lanes?: TrackLane[];
    channels: { channel: string; tag: string }[];
};

export type SignatureTrack = {
    signature: { num: number; div: number };
};

export type TempoTrack = {
    bpm: number;
};

export type Channel = {
    id: string;
    name: string;
    volume: number;
};

export type Instrument = {
    id: string;
    name: string;
};
