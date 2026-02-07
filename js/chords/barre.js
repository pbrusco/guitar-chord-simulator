export const BARRE_CHORDS = {
    // === MAJOR ===
    'F (Barre 1fr)': {
        positions: [
            { string: 1, fret: 1, finger: 0 }, { string: 2, fret: 1, finger: 0 }, { string: 6, fret: 1, finger: 0 },
            { string: 3, fret: 2, finger: 1 },
            { string: 5, fret: 3, finger: 2 },
            { string: 4, fret: 3, finger: 3 }
        ],
        tags: ['Major', 'Barre', 'E-Shape']
    },
    'C (Barre 3fr)': {
        positions: [
            { string: 1, fret: 3, finger: 0 }, { string: 5, fret: 3, finger: 0 },
            { string: 4, fret: 5, finger: 1 },
            { string: 3, fret: 5, finger: 2 },
            { string: 2, fret: 5, finger: 3 }
        ],
        tags: ['Major', 'Barre', 'A-Shape']
    },
    'G (Barre 3fr)': {
        positions: [
            { string: 1, fret: 3, finger: 0 }, { string: 2, fret: 3, finger: 0 }, { string: 6, fret: 3, finger: 0 },
            { string: 3, fret: 4, finger: 1 },
            { string: 5, fret: 5, finger: 2 },
            { string: 4, fret: 5, finger: 3 }
        ],
        tags: ['Major', 'Barre', 'E-Shape']
    },
    'A (Barre 5fr)': {
        positions: [
              { string: 1, fret: 5, finger: 0 }, { string: 2, fret: 5, finger: 0 }, { string: 6, fret: 5, finger: 0 }, 
              { string: 3, fret: 6, finger: 1 }, 
              { string: 5, fret: 7, finger: 2 }, 
              { string: 4, fret: 7, finger: 3 } 
        ],
        tags: ['Major', 'Barre', 'E-Shape']
    },
    'D (Barre 5fr)': {
        positions: [
          { string: 1, fret: 5, finger: 0 }, { string: 5, fret: 5, finger: 0 },
          { string: 4, fret: 7, finger: 1 },
          { string: 3, fret: 7, finger: 2 },
          { string: 2, fret: 7, finger: 3 }
        ],
        tags: ['Major', 'Barre', 'A-Shape']
    },
    'E (Barre 7fr)': {
        positions: [
          { string: 1, fret: 7, finger: 0 }, { string: 5, fret: 7, finger: 0 },
          { string: 4, fret: 9, finger: 1 },
          { string: 3, fret: 9, finger: 2 },
          { string: 2, fret: 9, finger: 3 }
        ],
        tags: ['Major', 'Barre', 'A-Shape']
    },
    'C (Barre 8fr)': {
        positions: [
          { string: 1, fret: 8, finger: 0 }, { string: 2, fret: 8, finger: 0 }, { string: 6, fret: 8, finger: 0 },
          { string: 3, fret: 9, finger: 1 },
          { string: 5, fret: 10, finger: 2 },
          { string: 4, fret: 10, finger: 3 }
        ],
        tags: ['Major', 'Barre', 'E-Shape']
    },
    'G (Barre 10fr)': {
        positions: [
          { string: 1, fret: 10, finger: 0 }, { string: 5, fret: 10, finger: 0 },
          { string: 4, fret: 12, finger: 1 },
          { string: 3, fret: 12, finger: 2 },
          { string: 2, fret: 12, finger: 3 }
        ],
        tags: ['Major', 'Barre', 'A-Shape']
    },
    'D (Barre 10fr)': {
        positions: [
          { string: 1, fret: 10, finger: 0 }, { string: 2, fret: 10, finger: 0 }, { string: 6, fret: 10, finger: 0 },
          { string: 3, fret: 11, finger: 1 },
          { string: 5, fret: 12, finger: 2 },
          { string: 4, fret: 12, finger: 3 }
        ],
        tags: ['Major', 'Barre', 'E-Shape']
    },


    // === MINOR ===
    'Bm (Barre 2fr)': {
        positions: [
            { string: 1, fret: 2, finger: 0 }, { string: 5, fret: 2, finger: 0 },
            { string: 2, fret: 3, finger: 1 },
            { string: 4, fret: 4, finger: 2 },
            { string: 3, fret: 4, finger: 3 }
        ],
        tags: ['Minor', 'Barre', 'A-Shape']
    },
    'Am (Barre 5fr)': {
        positions: [
          { string: 1, fret: 5, finger: 0 }, { string: 2, fret: 5, finger: 0 }, { string: 3, fret: 5, finger: 0 }, { string: 6, fret: 5, finger: 0 },
          { string: 5, fret: 7, finger: 2 },
          { string: 4, fret: 7, finger: 3 }
        ],
        tags: ['Minor', 'Barre', 'Em-Shape']
    },
    'Dm (Barre 5fr)': {
        positions: [
          { string: 1, fret: 5, finger: 0 }, { string: 5, fret: 5, finger: 0 },
          { string: 4, fret: 7, finger: 2 },
          { string: 3, fret: 7, finger: 3 },
          { string: 2, fret: 6, finger: 1 }
        ],
        tags: ['Minor', 'Barre', 'Am-Shape']
    },
    'Em (Barre 7fr)': {
        positions: [
          { string: 1, fret: 7, finger: 0 }, { string: 5, fret: 7, finger: 0 },
          { string: 4, fret: 9, finger: 2 },
          { string: 3, fret: 9, finger: 3 },
          { string: 2, fret: 8, finger: 1 } 
        ],
        tags: ['Minor', 'Barre', 'Am-Shape']
    },
    'Dm (Barre 10fr)': {
        positions: [
          { string: 1, fret: 10, finger: 0 }, { string: 2, fret: 10, finger: 0 }, { string: 3, fret: 10, finger: 0 }, { string: 6, fret: 10, finger: 0 },
          { string: 5, fret: 12, finger: 2 },
          { string: 4, fret: 12, finger: 3 }
        ],
        tags: ['Minor', 'Barre', 'Em-Shape']
    }
};