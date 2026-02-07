export const SHAPES = {
    // === MAJORS ===
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
    
    // === MINORS ===
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

    // === 7THs ===
    'E-Shape 7th': {
        tags: ['7th', 'Barre', 'E7-Shape'],
        rootString: 6,
        offsets: [
            { string: 6, fret: 0, finger: 0 },
            { string: 5, fret: 2, finger: 2 },
            { string: 4, fret: 0, finger: 0 }, // Open relative to barre (b7)
            { string: 3, fret: 1, finger: 1 },
            { string: 2, fret: 0, finger: 0 }, // Open
            { string: 1, fret: 0, finger: 0 }  // Open
        ]
    },
    'A-Shape 7th': {
        tags: ['7th', 'Barre', 'A7-Shape'],
        rootString: 5,
        offsets: [
            { string: 5, fret: 0, finger: 0 },
            { string: 4, fret: 2, finger: 2 },
            { string: 3, fret: 0, finger: 0 }, // Open relative to barre (b7)
            { string: 2, fret: 2, finger: 3 },
            { string: 1, fret: 0, finger: 0 }
        ]
    },

    // === TRIADS (Strings 1-2-3) ===
    'Triad Major (Root Pos)': {
        tags: ['Triad', 'Major', 'Root-Pos'],
        rootString: 3,
        offsets: [
            { string: 3, fret: 0, finger: 2 }, // Root
            { string: 2, fret: 0, finger: 3 }, // 3rd
            { string: 1, fret: -2, finger: 1 } // 5th
        ]
    },
    'Triad Major (1st Inv)': {
        tags: ['Triad', 'Major', '1st-Inv'],
        rootString: 1,
        offsets: [
            { string: 3, fret: 1, finger: 2 }, // 3rd
            { string: 2, fret: 0, finger: 3 }, // 5th
            { string: 1, fret: 0, finger: 1 }  // Root
        ]
    },
    'Triad Major (2nd Inv)': {
        tags: ['Triad', 'Major', '2nd-Inv'],
        rootString: 2,
        offsets: [
            { string: 3, fret: -1, finger: 2 }, // 5th
            { string: 2, fret: 0, finger: 3 },  // Root
            { string: 1, fret: -1, finger: 1 }  // 3rd
        ]
    },

    // === CUATRIADS (Tetrads on strings 1-2-3-4) ===
    'Tetrad Maj7 (Root on 4)': {
        tags: ['Tetrad', 'Maj7', 'Root-Pos'],
        rootString: 4,
        offsets: [
            { string: 4, fret: 0, finger: 0 }, // Root
            { string: 3, fret: 2, finger: 2 }, // 5th
            { string: 2, fret: 2, finger: 3 }, // Maj7
            { string: 1, fret: 2, finger: 1 }  // Maj3
        ]
    },
    'Tetrad 7 (Root on 4)': {
        tags: ['Tetrad', '7th', 'Root-Pos'],
        rootString: 4,
        offsets: [
            { string: 4, fret: 0, finger: 0 }, // Root
            { string: 3, fret: 2, finger: 2 }, // 5th
            { string: 2, fret: 1, finger: 1 }, // b7
            { string: 1, fret: 2, finger: 3 }  // Maj3
        ]
    },
    'Tetrad m7 (Root on 4)': {
        tags: ['Tetrad', 'm7', 'Root-Pos'],
        rootString: 4,
        offsets: [
            { string: 4, fret: 0, finger: 0 }, // Root
            { string: 3, fret: 2, finger: 2 }, // 5th
            { string: 2, fret: 1, finger: 1 }, // b7
            { string: 1, fret: 1, finger: 1 }  // m3 (Barre likely needed or finger 1 flat)
        ]
    },
    'Tetrad m7b5 (Root on 4)': {
        tags: ['Tetrad', 'm7b5', 'Root-Pos'],
        rootString: 4,
        offsets: [
            { string: 4, fret: 0, finger: 0 }, // Root
            { string: 3, fret: 1, finger: 2 }, // b5
            { string: 2, fret: 1, finger: 1 }, // b7
            { string: 1, fret: 1, finger: 1 }  // m3
        ]
    },
    'Tetrad dim7 (Root on 4)': {
        tags: ['Tetrad', 'dim7', 'Root-Pos'],
        rootString: 4,
        offsets: [
            { string: 4, fret: 0, finger: 0 }, // Root
            { string: 3, fret: 1, finger: 2 }, // b5
            { string: 2, fret: 0, finger: -1 },// bb7 (6th) - wait. 
                                               // 7th (b7) is fret 1. bb7 is fret 0.
                                               // relative to root.
                                               // e.g. D dim7: D, F, Ab, B (Cb).
                                               // S4: D. S3: Ab. S2: B. S1: F.
                                               // S4(0). S3(1). S2(0). S1(1).
            { string: 1, fret: 1, finger: 1 }  // m3
        ] // Note: S2 fret 0 might be implicitly open if Finger is -1 or handled?
          // But here offset is relative to Root Fret. If Root is fret 5. S2 is fret 5.
    }
};
