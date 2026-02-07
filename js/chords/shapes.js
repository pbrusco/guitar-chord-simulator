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
        tags: ['Triad', 'Major', '2nd-Inv', 'Set123'],
        rootString: 2,
        offsets: [
            { string: 3, fret: -1, finger: 2 }, // 5th
            { string: 2, fret: 0, finger: 3 },  // Root
            { string: 1, fret: -1, finger: 1 }  // 3rd
        ]
    },

    // === TRIADS (Set 3-4-5) ===
    'Triad Major (Set 3-4-5 Root)': {
        tags: ['Triad', 'Major', 'Root-Pos', 'Set345'],
        rootString: 5,
        offsets: [
            { string: 5, fret: 0, finger: 3 }, // Root
            { string: 4, fret: -1, finger: 2 }, // 3rd
            { string: 3, fret: -2, finger: 1 }  // 5th
        ]
    },
    // Inv 1 (Bass on 5). Root on 3. C(5)/E(9)/G(12). S5(E). S4(G). S3(C).
    // E(7). G(5). C(5). S5(+2 relative to S3). S4(0). S3(0).
    'Triad Major (Set 3-4-5 Inv 1)': {
        tags: ['Triad', 'Major', '1st-Inv', 'Set345'],
        rootString: 3,
        offsets: [
            { string: 5, fret: 2, finger: 3 }, // 3rd (Bass)
            { string: 4, fret: 0, finger: 1 }, // 5th
            { string: 3, fret: 0, finger: 1 }  // Root
        ]
    },
    // Inv 2 (Bass on 5). Root on 4. C/G. G(S5). C(S4). E(S3).
    // G(10). C(10). E(9). S5(0). S4(0). S3(-1).
    'Triad Major (Set 3-4-5 Inv 2)': {
        tags: ['Triad', 'Major', '2nd-Inv', 'Set345'],
        rootString: 4,
        offsets: [
            { string: 5, fret: 0, finger: 2 }, // 5th (Bass)
            { string: 4, fret: 0, finger: 3 }, // Root
            { string: 3, fret: -1, finger: 1 } // 3rd
        ]
    },

    // === TRIADS (Set 4-5-6) ===
    'Triad Major (Set 4-5-6 Root)': {
        tags: ['Triad', 'Major', 'Root-Pos', 'Set456'],
        rootString: 6,
        offsets: [
            { string: 6, fret: 0, finger: 3 }, // Root
            { string: 5, fret: -1, finger: 2 }, // 3rd
            { string: 4, fret: -3, finger: 1 }  // 5th
        ]
    },
    // Inv 1 (Bass on 6). Root on 4. C/E. E(S6). G(S5). C(S4).
    // E(12). G(10). C(10). Relative to 10 (S4). S6(+2). S5(0). S4(0).
    'Triad Major (Set 4-5-6 Inv 1)': {
        tags: ['Triad', 'Major', '1st-Inv', 'Set456'],
        rootString: 4,
        offsets: [
            { string: 6, fret: 2, finger: 3 }, // 3rd (Bass)
            { string: 5, fret: 0, finger: 2 }, // 5th
            { string: 4, fret: 0, finger: 1 }  // Root
        ]
    },
    // Inv 2 (Bass on 6). Root on 5. C/G. G(S6). C(S5). E(S4).
    // S6(3). S5(3). S4(2). Relative to S5(3). S6(0). S5(0). S4(-1).
    'Triad Major (Set 4-5-6 Inv 2)': {
        tags: ['Triad', 'Major', '2nd-Inv', 'Set456'],
        rootString: 5,
        offsets: [
            { string: 6, fret: 0, finger: 2 }, // 5th (Bass)
            { string: 5, fret: 0, finger: 3 }, // Root
            { string: 4, fret: -1, finger: 1 } // 3rd
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
            { string: 2, fret: 0, finger: 0 }, // bb7 (6th) - Barre via Index
            { string: 1, fret: 1, finger: 1 }  // m3
        ]
    },

    // === TETRADS (Root on 6 - Drop 3) ===
    'Tetrad Maj7 (Root on 6)': {
        tags: ['Tetrad', 'Maj7', 'Drop3'],
        rootString: 6,
        offsets: [
            { string: 6, fret: 0, finger: 0 }, // Root (Index)
            { string: 4, fret: 1, finger: 2 }, // 7th (Ring)
            { string: 3, fret: 1, finger: 3 }, // 3rd (Pinky)
            { string: 2, fret: 0, finger: 0 }  // 5th (Index)
        ]
    },
    'Tetrad m7 (Root on 6)': {
        tags: ['Tetrad', 'm7', 'Drop3'],
        rootString: 6,
        offsets: [
            { string: 6, fret: 0, finger: 0 }, // Root
            { string: 4, fret: 0, finger: 0 }, // b7
            { string: 3, fret: 0, finger: 0 }, // b3
            { string: 2, fret: 0, finger: 0 }  // 5th
        ]
    },
    'Tetrad 7 (Root on 6)': {
        tags: ['Tetrad', '7th', 'Drop3'],
        rootString: 6,
        offsets: [
            { string: 6, fret: 0, finger: 0 }, // Root
            { string: 4, fret: 0, finger: 0 }, // b7
            { string: 3, fret: 1, finger: 1 }, // 3rd (Middle)
            { string: 2, fret: 0, finger: 0 }  // 5th
        ]
    },

    // === TETRADS (Root on 5 - Drop 2) ===
    'Tetrad Maj7 (Root on 5)': {
        tags: ['Tetrad', 'Maj7', 'Drop2'],
        rootString: 5,
        offsets: [
            { string: 5, fret: 0, finger: 0 }, // Root
            { string: 4, fret: 2, finger: 2 }, // 5th
            { string: 3, fret: 1, finger: 1 }, // 7th
            { string: 2, fret: 2, finger: 3 }  // 3rd
        ]
    },
    'Tetrad m7 (Root on 5)': {
        tags: ['Tetrad', 'm7', 'Drop2'],
        rootString: 5,
        offsets: [
            { string: 5, fret: 0, finger: 0 }, // Root
            { string: 4, fret: 2, finger: 2 }, // 5th
            { string: 3, fret: 0, finger: 0 }, // b7
            { string: 2, fret: 1, finger: 1 }  // b3
        ]
    },
    'Tetrad 7 (Root on 5)': {
        tags: ['Tetrad', '7th', 'Drop2'],
        rootString: 5,
        offsets: [
            { string: 5, fret: 0, finger: 0 }, // Root
            { string: 4, fret: 2, finger: 2 }, // 5th
            { string: 3, fret: 0, finger: 0 }, // b7
            { string: 2, fret: 2, finger: 3 }  // 3rd
        ]
    }
};
