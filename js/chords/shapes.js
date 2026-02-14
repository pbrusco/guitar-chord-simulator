// Barre chord shapes — manually defined because barre fingerings (index finger
// across all strings) don't follow a simple algorithmic pattern.
// Triads and tetrads are generated from interval definitions in generator.js.

export const SHAPES = {

    // === Major ===
    'E-Shape Major': {
        tags: ['Major', 'Barre', 'E-Shape'],
        rootString: 6,
        offsets: [
            { string: 6, fret: 0, finger: 0 },
            { string: 5, fret: 2, finger: 2 },
            { string: 4, fret: 2, finger: 3 },
            { string: 3, fret: 1, finger: 1 },
            { string: 2, fret: 0, finger: 0 },
            { string: 1, fret: 0, finger: 0 }
        ]
    },
    'A-Shape Major': {
        tags: ['Major', 'Barre', 'A-Shape'],
        rootString: 5,
        offsets: [
            { string: 5, fret: 0, finger: 0 },
            { string: 4, fret: 2, finger: 1 },
            { string: 3, fret: 2, finger: 2 },
            { string: 2, fret: 2, finger: 3 },
            { string: 1, fret: 0, finger: 0 }
        ]
    },

    // === Minor ===
    'E-Shape Minor': {
        tags: ['Minor', 'Barre', 'Em-Shape'],
        rootString: 6,
        offsets: [
            { string: 6, fret: 0, finger: 0 },
            { string: 5, fret: 2, finger: 2 },
            { string: 4, fret: 2, finger: 3 },
            { string: 3, fret: 0, finger: 0 },
            { string: 2, fret: 0, finger: 0 },
            { string: 1, fret: 0, finger: 0 }
        ]
    },
    'A-Shape Minor': {
        tags: ['Minor', 'Barre', 'Am-Shape'],
        rootString: 5,
        offsets: [
            { string: 5, fret: 0, finger: 0 },
            { string: 4, fret: 2, finger: 2 },
            { string: 3, fret: 2, finger: 3 },
            { string: 2, fret: 1, finger: 1 },
            { string: 1, fret: 0, finger: 0 }
        ]
    },

    // === 7th ===
    'E-Shape 7th': {
        tags: ['7th', 'Barre', 'E7-Shape'],
        rootString: 6,
        offsets: [
            { string: 6, fret: 0, finger: 0 },
            { string: 5, fret: 2, finger: 2 },
            { string: 4, fret: 0, finger: 0 },
            { string: 3, fret: 1, finger: 1 },
            { string: 2, fret: 0, finger: 0 },
            { string: 1, fret: 0, finger: 0 }
        ]
    },
    'A-Shape 7th': {
        tags: ['7th', 'Barre', 'A7-Shape'],
        rootString: 5,
        offsets: [
            { string: 5, fret: 0, finger: 0 },
            { string: 4, fret: 2, finger: 2 },
            { string: 3, fret: 0, finger: 0 },
            { string: 2, fret: 2, finger: 3 },
            { string: 1, fret: 0, finger: 0 }
        ]
    },

    // === m7 ===
    'E-Shape m7': {
        tags: ['m7', 'Barre', 'Em7-Shape'],
        rootString: 6,
        offsets: [
            { string: 6, fret: 0, finger: 0 },
            { string: 5, fret: 2, finger: 2 },
            { string: 4, fret: 0, finger: 0 },
            { string: 3, fret: 0, finger: 0 },
            { string: 2, fret: 0, finger: 0 },
            { string: 1, fret: 0, finger: 0 }
        ]
    },
    'A-Shape m7': {
        tags: ['m7', 'Barre', 'Am7-Shape'],
        rootString: 5,
        offsets: [
            { string: 5, fret: 0, finger: 0 },
            { string: 4, fret: 2, finger: 2 },
            { string: 3, fret: 0, finger: 0 },
            { string: 2, fret: 1, finger: 1 },
            { string: 1, fret: 0, finger: 0 }
        ]
    },

    // === Maj7 ===
    'E-Shape Maj7': {
        tags: ['Maj7', 'Barre', 'EMaj7-Shape'],
        rootString: 6,
        offsets: [
            { string: 6, fret: 0, finger: 0 },
            { string: 5, fret: 2, finger: 2 },
            { string: 4, fret: 1, finger: 1 },
            { string: 3, fret: 1, finger: 3 },
            { string: 2, fret: 0, finger: 0 },
            { string: 1, fret: 0, finger: 0 }
        ]
    },
    'A-Shape Maj7': {
        tags: ['Maj7', 'Barre', 'AMaj7-Shape'],
        rootString: 5,
        offsets: [
            { string: 5, fret: 0, finger: 0 },
            { string: 4, fret: 2, finger: 1 },
            { string: 3, fret: 1, finger: 2 },
            { string: 2, fret: 2, finger: 3 },
            { string: 1, fret: 0, finger: 0 }
        ]
    }
};
