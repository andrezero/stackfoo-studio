import { create } from 'zustand';

import { Part } from '../types/studio';

type PartsState = {
    parts: Part[];
};

const EXAMPLE_PART: Part = {
    id: '1',
    name: 'A',
    events: [
        {
            id: '1',
            type: 'note',
            time: 0,
            value: {
                note: 'C1',
                velocity: 100,
                duration: 1,
            },
        },
    ],
};

const useStore = create<PartsState>((set) => ({
    parts: [EXAMPLE_PART],
    addPart: ({ name, events }: Part) =>
        set(({ parts }) => ({
            parts: [
                {
                    id: Math.random() * 100 + '',
                    name,
                    events,
                },
                ...parts,
            ],
        })),
    removePart: (id: string) =>
        set(({ parts }) => ({
            parts: parts.filter((part) => part.id !== id),
        })),
    updatePart: ({ id, name, events }: Part) =>
        set(({ parts }) => ({
            parts: parts.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        name: name,
                        events: [...events],
                    };
                }
                return item;
            }),
        })),
}));

export const usePartsStore = useStore;
