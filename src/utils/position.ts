const pad = (str: string, len: number, char: string = '0'): string => {
    return Array(len - str.length + 1).join(char) + str;
};

export const formatPosition = (pos: string): string => {
    const sides = pos.split('.');
    const parts = sides[0].split(':');
    return [
        pad(parts[0], 3),
        pad(Number(parts[1]) + 1 + '', 1),
        pad(Number(parts[2]) + 1 + '', 1),
    ].join(':');
};
