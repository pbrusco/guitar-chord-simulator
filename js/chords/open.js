export const OPEN_CHORDS = {
    'C Open': { 
        positions: [ 
            { string: 2, fret: 1, finger: 0 }, 
            { string: 4, fret: 2, finger: 1 }, 
            { string: 5, fret: 3, finger: 2 },
            { string: 3, fret: 0, finger: -1 }, // G
            { string: 1, fret: 0, finger: -1 }  // E
        ], 
        tags: ['Major', 'Open'] 
    },
    'A Open': { 
        positions: [ { string: 4, fret: 2, finger: 0 }, { string: 3, fret: 2, finger: 1 }, { string: 2, fret: 2, finger: 2 }, { string: 5, fret: 0, finger: -1}  ], 
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
    }
};