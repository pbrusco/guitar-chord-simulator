export const OPEN_CHORDS = {
    // === Major ===
    'C Open': {
        positions: [
            { string: 2, fret: 1, finger: 0 },
            { string: 4, fret: 2, finger: 1 },
            { string: 5, fret: 3, finger: 2 },
            { string: 3, fret: 0, finger: -1 },
            { string: 1, fret: 0, finger: -1 }
        ],
        tags: ['Major', 'Open']
    },
    'A Open': {
        positions: [ { string: 4, fret: 2, finger: 0 }, { string: 3, fret: 2, finger: 1 }, { string: 2, fret: 2, finger: 2 }, { string: 5, fret: 0, finger: -1 } ],
        tags: ['Major', 'Open']
    },
    'G Open': {
        positions: [ { string: 5, fret: 2, finger: 0 }, { string: 6, fret: 3, finger: 1 }, { string: 1, fret: 3, finger: 2 }, { string: 2, fret: 0, finger: -1 }, { string: 3, fret: 0, finger: -1 }, { string: 4, fret: 0, finger: -1 } ],
        tags: ['Major', 'Open']
    },
    'E Open': {
        positions: [ { string: 3, fret: 1, finger: 0 }, { string: 5, fret: 2, finger: 1 }, { string: 4, fret: 2, finger: 2 }, { string: 6, fret: 0, finger: -1 }, { string: 2, fret: 0, finger: -1 }, { string: 1, fret: 0, finger: -1 } ],
        tags: ['Major', 'Open']
    },
    'D Open': {
        positions: [ { string: 3, fret: 2, finger: 0 }, { string: 1, fret: 2, finger: 1 }, { string: 2, fret: 3, finger: 2 }, { string: 4, fret: 0, finger: -1 } ],
        tags: ['Major', 'Open']
    },

    // === Minor ===
    'Am Open': {
        positions: [ { string: 2, fret: 1, finger: 0 }, { string: 4, fret: 2, finger: 1 }, { string: 3, fret: 2, finger: 2 }, { string: 5, fret: 0, finger: -1 } ],
        tags: ['Minor', 'Open']
    },
    'Em Open': {
        positions: [ { string: 5, fret: 2, finger: 1 }, { string: 4, fret: 2, finger: 2 }, { string: 6, fret: 0, finger: -1 }, { string: 3, fret: 0, finger: -1 }, { string: 2, fret: 0, finger: -1 }, { string: 1, fret: 0, finger: -1 } ],
        tags: ['Minor', 'Open']
    },
    'Dm Open': {
        positions: [ { string: 1, fret: 1, finger: 0 }, { string: 3, fret: 2, finger: 1 }, { string: 2, fret: 3, finger: 2 }, { string: 4, fret: 0, finger: -1 } ],
        tags: ['Minor', 'Open']
    },

    // === Dominant 7th ===
    'A7 Open': {
        positions: [ { string: 4, fret: 2, finger: 0 }, { string: 3, fret: 0, finger: -1 }, { string: 2, fret: 2, finger: 1 }, { string: 5, fret: 0, finger: -1 } ],
        tags: ['7', 'Open']
    },
    'E7 Open': {
        positions: [ { string: 3, fret: 1, finger: 0 }, { string: 5, fret: 2, finger: 1 }, { string: 6, fret: 0, finger: -1 }, { string: 4, fret: 0, finger: -1 }, { string: 2, fret: 0, finger: -1 }, { string: 1, fret: 0, finger: -1 } ],
        tags: ['7', 'Open']
    },
    'D7 Open': {
        positions: [ { string: 3, fret: 2, finger: 0 }, { string: 1, fret: 2, finger: 1 }, { string: 2, fret: 1, finger: 2 }, { string: 4, fret: 0, finger: -1 } ],
        tags: ['7', 'Open']
    },
    'G7 Open': {
        positions: [ { string: 6, fret: 3, finger: 0 }, { string: 5, fret: 2, finger: 1 }, { string: 1, fret: 1, finger: 2 }, { string: 2, fret: 0, finger: -1 }, { string: 3, fret: 0, finger: -1 }, { string: 4, fret: 0, finger: -1 } ],
        tags: ['7', 'Open']
    },
    'C7 Open': {
        positions: [ { string: 2, fret: 1, finger: 0 }, { string: 4, fret: 2, finger: 1 }, { string: 5, fret: 3, finger: 2 }, { string: 3, fret: 3, finger: 3 }, { string: 1, fret: 0, finger: -1 } ],
        tags: ['7', 'Open']
    },

    // === Minor 7th ===
    'Am7 Open': {
        positions: [ { string: 2, fret: 1, finger: 0 }, { string: 4, fret: 2, finger: 1 }, { string: 3, fret: 0, finger: -1 }, { string: 5, fret: 0, finger: -1 }, { string: 1, fret: 0, finger: -1 } ],
        tags: ['m7', 'Open']
    },
    'Em7 Open': {
        positions: [ { string: 5, fret: 2, finger: 1 }, { string: 6, fret: 0, finger: -1 }, { string: 4, fret: 0, finger: -1 }, { string: 3, fret: 0, finger: -1 }, { string: 2, fret: 0, finger: -1 }, { string: 1, fret: 0, finger: -1 } ],
        tags: ['m7', 'Open']
    },
    'Dm7 Open': {
        positions: [ { string: 1, fret: 1, finger: 0 }, { string: 2, fret: 1, finger: 1 }, { string: 3, fret: 2, finger: 2 }, { string: 4, fret: 0, finger: -1 } ],
        tags: ['m7', 'Open']
    },

    // === Major 7th ===
    'CMaj7 Open': {
        positions: [ { string: 2, fret: 0, finger: -1 }, { string: 4, fret: 2, finger: 1 }, { string: 5, fret: 3, finger: 2 }, { string: 3, fret: 0, finger: -1 }, { string: 1, fret: 0, finger: -1 } ],
        tags: ['Maj7', 'Open']
    },
    'FMaj7 Open': {
        positions: [ { string: 4, fret: 3, finger: 0 }, { string: 3, fret: 2, finger: 1 }, { string: 2, fret: 1, finger: 2 }, { string: 1, fret: 0, finger: -1 } ],
        tags: ['Maj7', 'Open']
    },
    'GMaj7 Open': {
        positions: [ { string: 6, fret: 3, finger: 0 }, { string: 5, fret: 2, finger: 1 }, { string: 1, fret: 2, finger: 2 }, { string: 4, fret: 0, finger: -1 }, { string: 3, fret: 0, finger: -1 }, { string: 2, fret: 0, finger: -1 } ],
        tags: ['Maj7', 'Open']
    },

    // === Sus2 ===
    'Asus2 Open': {
        positions: [ { string: 4, fret: 2, finger: 0 }, { string: 3, fret: 2, finger: 1 }, { string: 2, fret: 0, finger: -1 }, { string: 5, fret: 0, finger: -1 } ],
        tags: ['sus2', 'Open']
    },
    'Dsus2 Open': {
        positions: [ { string: 3, fret: 2, finger: 0 }, { string: 1, fret: 0, finger: -1 }, { string: 2, fret: 3, finger: 1 }, { string: 4, fret: 0, finger: -1 } ],
        tags: ['sus2', 'Open']
    },

    // === Sus4 ===
    'Asus4 Open': {
        positions: [ { string: 4, fret: 2, finger: 0 }, { string: 3, fret: 2, finger: 1 }, { string: 2, fret: 3, finger: 2 }, { string: 5, fret: 0, finger: -1 } ],
        tags: ['sus4', 'Open']
    },
    'Dsus4 Open': {
        positions: [ { string: 3, fret: 2, finger: 0 }, { string: 1, fret: 3, finger: 1 }, { string: 2, fret: 3, finger: 2 }, { string: 4, fret: 0, finger: -1 } ],
        tags: ['sus4', 'Open']
    },
    'Esus4 Open': {
        positions: [ { string: 5, fret: 2, finger: 1 }, { string: 4, fret: 2, finger: 2 }, { string: 3, fret: 2, finger: 3 }, { string: 6, fret: 0, finger: -1 }, { string: 2, fret: 0, finger: -1 }, { string: 1, fret: 0, finger: -1 } ],
        tags: ['sus4', 'Open']
    }
};
