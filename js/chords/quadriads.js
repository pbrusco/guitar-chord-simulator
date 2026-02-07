export const QUADRIAD_CHORDS = {
    'Cmaj7': {
        positions: [
            { string: 5, fret: 3, finger: 2 },
            { string: 4, fret: 5, finger: 3 },
            { string: 3, fret: 4, finger: 1 },
            { string: 2, fret: 5, finger: 3 } // Pinky often bars or just 4 fingers
        ],
        tags: ['Maj7', 'Shell']
    },
    'G7 (Open)': {
        positions: [
            { string: 6, fret: 3, finger: 2 },
            { string: 5, fret: 2, finger: 1 },
            { string: 1, fret: 1, finger: 0 }
        ],
        tags: ['Dom7', 'Open']
    },
    'Dm7 (E-Shape 5fr)': {
        positions: [
            { string: 3, fret: 5, finger: 1 }, // Barre-ish
            { string: 5, fret: 5, finger: 0 },
            { string: 4, fret: 7, finger: 2 },
            { string: 2, fret: 6, finger: 1 }
        ],
        tags: ['Min7', 'Barre']
    },
    'E7 (Open)': {
        positions: [
            { string: 5, fret: 2, finger: 1 },
            { string: 3, fret: 1, finger: 0 }
        ],
        tags: ['Dom7', 'Open']
    }
};