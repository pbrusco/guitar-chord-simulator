export const SHAPES = {

    // =============================================
    // BARRE SHAPES
    // =============================================

    // --- Major ---
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

    // --- Minor ---
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

    // --- 7th ---
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

    // --- m7 ---
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

    // --- Maj7 ---
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
    },

    // =============================================
    // TRIAD SHAPES - Set 1-2-3
    // =============================================

    // --- Major ---
    'Triad Major (Root Pos)': {
        tags: ['Triad', 'Major', 'Root-Pos', 'Set123'],
        rootString: 3,
        offsets: [
            { string: 3, fret: 0, finger: 2 }, // Root
            { string: 2, fret: 0, finger: 3 }, // 3rd
            { string: 1, fret: -2, finger: 1 } // 5th
        ]
    },
    'Triad Major (1st Inv)': {
        tags: ['Triad', 'Major', '1st-Inv', 'Set123'],
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

    // --- Minor ---
    'Triad Minor (Root Pos)': {
        tags: ['Triad', 'm', 'Root-Pos', 'Set123'],
        rootString: 3,
        offsets: [
            { string: 3, fret: 0, finger: 2 },  // Root
            { string: 2, fret: -1, finger: 3 },  // b3
            { string: 1, fret: -2, finger: 1 }   // 5th
        ]
    },
    'Triad Minor (1st Inv)': {
        tags: ['Triad', 'm', '1st-Inv', 'Set123'],
        rootString: 1,
        offsets: [
            { string: 3, fret: 0, finger: 2 },   // b3
            { string: 2, fret: 0, finger: 3 },   // 5th
            { string: 1, fret: 0, finger: 1 }    // Root
        ]
    },
    'Triad Minor (2nd Inv)': {
        tags: ['Triad', 'm', '2nd-Inv', 'Set123'],
        rootString: 2,
        offsets: [
            { string: 3, fret: -1, finger: 2 },  // 5th
            { string: 2, fret: 0, finger: 3 },   // Root
            { string: 1, fret: -2, finger: 1 }   // b3
        ]
    },

    // --- Diminished ---
    'Triad dim (Root Pos Set123)': {
        tags: ['Triad', 'dim', 'Root-Pos', 'Set123'],
        rootString: 3,
        offsets: [
            { string: 3, fret: 0, finger: 2 },
            { string: 2, fret: -1, finger: 3 },  // b3
            { string: 1, fret: -3, finger: 1 }   // b5
        ]
    },
    'Triad dim (1st Inv Set123)': {
        tags: ['Triad', 'dim', '1st-Inv', 'Set123'],
        rootString: 1,
        offsets: [
            { string: 3, fret: 0, finger: 2 },   // b3
            { string: 2, fret: -1, finger: 3 },  // b5
            { string: 1, fret: 0, finger: 1 }    // Root
        ]
    },
    'Triad dim (2nd Inv Set123)': {
        tags: ['Triad', 'dim', '2nd-Inv', 'Set123'],
        rootString: 2,
        offsets: [
            { string: 3, fret: -2, finger: 2 },  // b5
            { string: 2, fret: 0, finger: 3 },   // Root
            { string: 1, fret: -2, finger: 1 }   // b3
        ]
    },

    // --- Augmented ---
    'Triad aug (Root Pos Set123)': {
        tags: ['Triad', 'aug', 'Root-Pos', 'Set123'],
        rootString: 3,
        offsets: [
            { string: 3, fret: 0, finger: 2 },
            { string: 2, fret: 0, finger: 3 },   // 3rd
            { string: 1, fret: -1, finger: 1 }   // #5
        ]
    },
    'Triad aug (1st Inv Set123)': {
        tags: ['Triad', 'aug', '1st-Inv', 'Set123'],
        rootString: 1,
        offsets: [
            { string: 3, fret: 1, finger: 2 },   // 3rd
            { string: 2, fret: 1, finger: 3 },   // #5
            { string: 1, fret: 0, finger: 1 }    // Root
        ]
    },
    'Triad aug (2nd Inv Set123)': {
        tags: ['Triad', 'aug', '2nd-Inv', 'Set123'],
        rootString: 2,
        offsets: [
            { string: 3, fret: 0, finger: 2 },   // #5
            { string: 2, fret: 0, finger: 3 },   // Root
            { string: 1, fret: -1, finger: 1 }   // 3rd
        ]
    },

    // --- Sus4 ---
    'Triad sus4 (Root Pos Set123)': {
        tags: ['Triad', 'sus4', 'Root-Pos', 'Set123'],
        rootString: 3,
        offsets: [
            { string: 3, fret: 0, finger: 2 },
            { string: 2, fret: 1, finger: 3 },   // 4th
            { string: 1, fret: -2, finger: 1 }   // 5th
        ]
    },
    'Triad sus4 (1st Inv Set123)': {
        tags: ['Triad', 'sus4', '1st-Inv', 'Set123'],
        rootString: 1,
        offsets: [
            { string: 3, fret: 2, finger: 2 },   // 4th
            { string: 2, fret: 0, finger: 3 },   // 5th
            { string: 1, fret: 0, finger: 1 }    // Root
        ]
    },
    'Triad sus4 (2nd Inv Set123)': {
        tags: ['Triad', 'sus4', '2nd-Inv', 'Set123'],
        rootString: 2,
        offsets: [
            { string: 3, fret: -1, finger: 2 },  // 5th
            { string: 2, fret: 0, finger: 3 },   // Root
            { string: 1, fret: 0, finger: 1 }    // 4th
        ]
    },

    // --- Sus2 ---
    'Triad sus2 (Root Pos Set123)': {
        tags: ['Triad', 'sus2', 'Root-Pos', 'Set123'],
        rootString: 3,
        offsets: [
            { string: 3, fret: 0, finger: 2 },
            { string: 2, fret: -2, finger: 3 },  // 2nd
            { string: 1, fret: -2, finger: 1 }   // 5th
        ]
    },
    'Triad sus2 (1st Inv Set123)': {
        tags: ['Triad', 'sus2', '1st-Inv', 'Set123'],
        rootString: 1,
        offsets: [
            { string: 3, fret: -1, finger: 2 },  // 2nd
            { string: 2, fret: 0, finger: 3 },   // 5th
            { string: 1, fret: 0, finger: 1 }    // Root
        ]
    },
    'Triad sus2 (2nd Inv Set123)': {
        tags: ['Triad', 'sus2', '2nd-Inv', 'Set123'],
        rootString: 2,
        offsets: [
            { string: 3, fret: -1, finger: 2 },  // 5th
            { string: 2, fret: 0, finger: 3 },   // Root
            { string: 1, fret: -3, finger: 1 }   // 2nd
        ]
    },

    // =============================================
    // TRIAD SHAPES - Set 3-4-5
    // =============================================

    // --- Major ---
    'Triad Major (Set 3-4-5 Root)': {
        tags: ['Triad', 'Major', 'Root-Pos', 'Set345'],
        rootString: 5,
        offsets: [
            { string: 5, fret: 0, finger: 3 }, // Root
            { string: 4, fret: -1, finger: 2 }, // 3rd
            { string: 3, fret: -3, finger: 1 }  // 5th
        ]
    },
    'Triad Major (Set 3-4-5 Inv 1)': {
        tags: ['Triad', 'Major', '1st-Inv', 'Set345'],
        rootString: 3,
        offsets: [
            { string: 5, fret: 2, finger: 3 }, // 3rd (Bass)
            { string: 4, fret: 0, finger: 1 }, // 5th
            { string: 3, fret: 0, finger: 1 }  // Root
        ]
    },
    'Triad Major (Set 3-4-5 Inv 2)': {
        tags: ['Triad', 'Major', '2nd-Inv', 'Set345'],
        rootString: 4,
        offsets: [
            { string: 5, fret: 0, finger: 2 }, // 5th (Bass)
            { string: 4, fret: 0, finger: 3 }, // Root
            { string: 3, fret: -1, finger: 1 } // 3rd
        ]
    },

    // --- Minor ---
    'Triad Minor (Set 3-4-5 Root)': {
        tags: ['Triad', 'm', 'Root-Pos', 'Set345'],
        rootString: 5,
        offsets: [
            { string: 5, fret: 0, finger: 3 },
            { string: 4, fret: -2, finger: 2 }, // b3
            { string: 3, fret: -3, finger: 1 }  // 5th
        ]
    },
    'Triad Minor (Set 3-4-5 Inv 1)': {
        tags: ['Triad', 'm', '1st-Inv', 'Set345'],
        rootString: 3,
        offsets: [
            { string: 5, fret: 1, finger: 3 }, // b3 (Bass)
            { string: 4, fret: 0, finger: 1 }, // 5th
            { string: 3, fret: 0, finger: 1 }  // Root
        ]
    },
    'Triad Minor (Set 3-4-5 Inv 2)': {
        tags: ['Triad', 'm', '2nd-Inv', 'Set345'],
        rootString: 4,
        offsets: [
            { string: 5, fret: 0, finger: 2 }, // 5th (Bass)
            { string: 4, fret: 0, finger: 3 }, // Root
            { string: 3, fret: -2, finger: 1 } // b3
        ]
    },

    // --- Diminished ---
    'Triad dim (Set 3-4-5 Root)': {
        tags: ['Triad', 'dim', 'Root-Pos', 'Set345'],
        rootString: 5,
        offsets: [
            { string: 5, fret: 0, finger: 3 },
            { string: 4, fret: -2, finger: 2 }, // b3
            { string: 3, fret: -4, finger: 1 }  // b5
        ]
    },
    'Triad dim (Set 3-4-5 Inv 1)': {
        tags: ['Triad', 'dim', '1st-Inv', 'Set345'],
        rootString: 3,
        offsets: [
            { string: 5, fret: 1, finger: 3 }, // b3 (Bass)
            { string: 4, fret: -1, finger: 1 }, // b5
            { string: 3, fret: 0, finger: 2 }  // Root
        ]
    },
    'Triad dim (Set 3-4-5 Inv 2)': {
        tags: ['Triad', 'dim', '2nd-Inv', 'Set345'],
        rootString: 4,
        offsets: [
            { string: 5, fret: -1, finger: 2 }, // b5 (Bass)
            { string: 4, fret: 0, finger: 3 },  // Root
            { string: 3, fret: -2, finger: 1 }  // b3
        ]
    },

    // --- Augmented ---
    'Triad aug (Set 3-4-5 Root)': {
        tags: ['Triad', 'aug', 'Root-Pos', 'Set345'],
        rootString: 5,
        offsets: [
            { string: 5, fret: 0, finger: 3 },
            { string: 4, fret: -1, finger: 2 }, // 3rd
            { string: 3, fret: -2, finger: 1 }  // #5
        ]
    },
    'Triad aug (Set 3-4-5 Inv 1)': {
        tags: ['Triad', 'aug', '1st-Inv', 'Set345'],
        rootString: 3,
        offsets: [
            { string: 5, fret: 2, finger: 3 }, // 3rd (Bass)
            { string: 4, fret: 1, finger: 1 }, // #5
            { string: 3, fret: 0, finger: 2 }  // Root
        ]
    },
    'Triad aug (Set 3-4-5 Inv 2)': {
        tags: ['Triad', 'aug', '2nd-Inv', 'Set345'],
        rootString: 4,
        offsets: [
            { string: 5, fret: 1, finger: 2 }, // #5 (Bass)
            { string: 4, fret: 0, finger: 3 }, // Root
            { string: 3, fret: -1, finger: 1 } // 3rd
        ]
    },

    // --- Sus4 ---
    'Triad sus4 (Set 3-4-5 Root)': {
        tags: ['Triad', 'sus4', 'Root-Pos', 'Set345'],
        rootString: 5,
        offsets: [
            { string: 5, fret: 0, finger: 3 },
            { string: 4, fret: 0, finger: 2 },  // 4th
            { string: 3, fret: -3, finger: 1 }  // 5th
        ]
    },
    'Triad sus4 (Set 3-4-5 Inv 1)': {
        tags: ['Triad', 'sus4', '1st-Inv', 'Set345'],
        rootString: 3,
        offsets: [
            { string: 5, fret: 3, finger: 3 }, // 4th (Bass)
            { string: 4, fret: 0, finger: 1 }, // 5th
            { string: 3, fret: 0, finger: 1 }  // Root
        ]
    },
    'Triad sus4 (Set 3-4-5 Inv 2)': {
        tags: ['Triad', 'sus4', '2nd-Inv', 'Set345'],
        rootString: 4,
        offsets: [
            { string: 5, fret: 0, finger: 2 }, // 5th (Bass)
            { string: 4, fret: 0, finger: 3 }, // Root
            { string: 3, fret: 0, finger: 1 }  // 4th
        ]
    },

    // --- Sus2 ---
    'Triad sus2 (Set 3-4-5 Root)': {
        tags: ['Triad', 'sus2', 'Root-Pos', 'Set345'],
        rootString: 5,
        offsets: [
            { string: 5, fret: 0, finger: 3 },
            { string: 4, fret: -3, finger: 2 }, // 2nd
            { string: 3, fret: -3, finger: 1 }  // 5th
        ]
    },
    'Triad sus2 (Set 3-4-5 Inv 1)': {
        tags: ['Triad', 'sus2', '1st-Inv', 'Set345'],
        rootString: 3,
        offsets: [
            { string: 5, fret: 0, finger: 3 }, // 2nd (Bass)
            { string: 4, fret: 0, finger: 1 }, // 5th
            { string: 3, fret: 0, finger: 1 }  // Root
        ]
    },
    'Triad sus2 (Set 3-4-5 Inv 2)': {
        tags: ['Triad', 'sus2', '2nd-Inv', 'Set345'],
        rootString: 4,
        offsets: [
            { string: 5, fret: 0, finger: 2 }, // 5th (Bass)
            { string: 4, fret: 0, finger: 3 }, // Root
            { string: 3, fret: -3, finger: 1 } // 2nd
        ]
    },

    // =============================================
    // TRIAD SHAPES - Set 4-5-6
    // =============================================

    // --- Major ---
    'Triad Major (Set 4-5-6 Root)': {
        tags: ['Triad', 'Major', 'Root-Pos', 'Set456'],
        rootString: 6,
        offsets: [
            { string: 6, fret: 0, finger: 3 }, // Root
            { string: 5, fret: -1, finger: 2 }, // 3rd
            { string: 4, fret: -3, finger: 1 }  // 5th
        ]
    },
    'Triad Major (Set 4-5-6 Inv 1)': {
        tags: ['Triad', 'Major', '1st-Inv', 'Set456'],
        rootString: 4,
        offsets: [
            { string: 6, fret: 2, finger: 3 }, // 3rd (Bass)
            { string: 5, fret: 0, finger: 2 }, // 5th
            { string: 4, fret: 0, finger: 1 }  // Root
        ]
    },
    'Triad Major (Set 4-5-6 Inv 2)': {
        tags: ['Triad', 'Major', '2nd-Inv', 'Set456'],
        rootString: 5,
        offsets: [
            { string: 6, fret: 0, finger: 2 }, // 5th (Bass)
            { string: 5, fret: 0, finger: 3 }, // Root
            { string: 4, fret: -1, finger: 1 } // 3rd
        ]
    },

    // --- Minor ---
    'Triad Minor (Set 4-5-6 Root)': {
        tags: ['Triad', 'm', 'Root-Pos', 'Set456'],
        rootString: 6,
        offsets: [
            { string: 6, fret: 0, finger: 3 },
            { string: 5, fret: -2, finger: 2 }, // b3
            { string: 4, fret: -3, finger: 1 }  // 5th
        ]
    },
    'Triad Minor (Set 4-5-6 Inv 1)': {
        tags: ['Triad', 'm', '1st-Inv', 'Set456'],
        rootString: 4,
        offsets: [
            { string: 6, fret: 1, finger: 3 }, // b3 (Bass)
            { string: 5, fret: 0, finger: 2 }, // 5th
            { string: 4, fret: 0, finger: 1 }  // Root
        ]
    },
    'Triad Minor (Set 4-5-6 Inv 2)': {
        tags: ['Triad', 'm', '2nd-Inv', 'Set456'],
        rootString: 5,
        offsets: [
            { string: 6, fret: 0, finger: 2 }, // 5th (Bass)
            { string: 5, fret: 0, finger: 3 }, // Root
            { string: 4, fret: -2, finger: 1 } // b3
        ]
    },

    // --- Diminished ---
    'Triad dim (Set 4-5-6 Root)': {
        tags: ['Triad', 'dim', 'Root-Pos', 'Set456'],
        rootString: 6,
        offsets: [
            { string: 6, fret: 0, finger: 3 },
            { string: 5, fret: -2, finger: 2 }, // b3
            { string: 4, fret: -4, finger: 1 }  // b5
        ]
    },
    'Triad dim (Set 4-5-6 Inv 1)': {
        tags: ['Triad', 'dim', '1st-Inv', 'Set456'],
        rootString: 4,
        offsets: [
            { string: 6, fret: 1, finger: 3 }, // b3 (Bass)
            { string: 5, fret: -1, finger: 2 }, // b5
            { string: 4, fret: 0, finger: 1 }  // Root
        ]
    },
    'Triad dim (Set 4-5-6 Inv 2)': {
        tags: ['Triad', 'dim', '2nd-Inv', 'Set456'],
        rootString: 5,
        offsets: [
            { string: 6, fret: -1, finger: 2 }, // b5 (Bass)
            { string: 5, fret: 0, finger: 3 },  // Root
            { string: 4, fret: -2, finger: 1 }  // b3
        ]
    },

    // --- Augmented ---
    'Triad aug (Set 4-5-6 Root)': {
        tags: ['Triad', 'aug', 'Root-Pos', 'Set456'],
        rootString: 6,
        offsets: [
            { string: 6, fret: 0, finger: 3 },
            { string: 5, fret: -1, finger: 2 }, // 3rd
            { string: 4, fret: -2, finger: 1 }  // #5
        ]
    },
    'Triad aug (Set 4-5-6 Inv 1)': {
        tags: ['Triad', 'aug', '1st-Inv', 'Set456'],
        rootString: 4,
        offsets: [
            { string: 6, fret: 2, finger: 3 }, // 3rd (Bass)
            { string: 5, fret: 1, finger: 2 }, // #5
            { string: 4, fret: 0, finger: 1 }  // Root
        ]
    },
    'Triad aug (Set 4-5-6 Inv 2)': {
        tags: ['Triad', 'aug', '2nd-Inv', 'Set456'],
        rootString: 5,
        offsets: [
            { string: 6, fret: 1, finger: 2 }, // #5 (Bass)
            { string: 5, fret: 0, finger: 3 }, // Root
            { string: 4, fret: -1, finger: 1 } // 3rd
        ]
    },

    // --- Sus4 ---
    'Triad sus4 (Set 4-5-6 Root)': {
        tags: ['Triad', 'sus4', 'Root-Pos', 'Set456'],
        rootString: 6,
        offsets: [
            { string: 6, fret: 0, finger: 3 },
            { string: 5, fret: 0, finger: 2 },  // 4th
            { string: 4, fret: -3, finger: 1 }  // 5th
        ]
    },
    'Triad sus4 (Set 4-5-6 Inv 1)': {
        tags: ['Triad', 'sus4', '1st-Inv', 'Set456'],
        rootString: 4,
        offsets: [
            { string: 6, fret: 3, finger: 3 }, // 4th (Bass)
            { string: 5, fret: 0, finger: 2 }, // 5th
            { string: 4, fret: 0, finger: 1 }  // Root
        ]
    },
    'Triad sus4 (Set 4-5-6 Inv 2)': {
        tags: ['Triad', 'sus4', '2nd-Inv', 'Set456'],
        rootString: 5,
        offsets: [
            { string: 6, fret: 0, finger: 2 }, // 5th (Bass)
            { string: 5, fret: 0, finger: 3 }, // Root
            { string: 4, fret: 0, finger: 1 }  // 4th
        ]
    },

    // --- Sus2 ---
    'Triad sus2 (Set 4-5-6 Root)': {
        tags: ['Triad', 'sus2', 'Root-Pos', 'Set456'],
        rootString: 6,
        offsets: [
            { string: 6, fret: 0, finger: 3 },
            { string: 5, fret: -3, finger: 2 }, // 2nd
            { string: 4, fret: -3, finger: 1 }  // 5th
        ]
    },
    'Triad sus2 (Set 4-5-6 Inv 1)': {
        tags: ['Triad', 'sus2', '1st-Inv', 'Set456'],
        rootString: 4,
        offsets: [
            { string: 6, fret: 0, finger: 3 }, // 2nd (Bass)
            { string: 5, fret: 0, finger: 2 }, // 5th
            { string: 4, fret: 0, finger: 1 }  // Root
        ]
    },
    'Triad sus2 (Set 4-5-6 Inv 2)': {
        tags: ['Triad', 'sus2', '2nd-Inv', 'Set456'],
        rootString: 5,
        offsets: [
            { string: 6, fret: 0, finger: 2 }, // 5th (Bass)
            { string: 5, fret: 0, finger: 3 }, // Root
            { string: 4, fret: -3, finger: 1 } // 2nd
        ]
    },

    // =============================================
    // TETRAD SHAPES - Root on 4 (Root Position)
    // =============================================

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
            { string: 4, fret: 0, finger: 0 },
            { string: 3, fret: 2, finger: 3 }, // 5th
            { string: 2, fret: 1, finger: 1 }, // b7
            { string: 1, fret: 1, finger: 2 }  // m3
        ]
    },
    'Tetrad m7b5 (Root on 4)': {
        tags: ['Tetrad', 'm7b5', 'Root-Pos'],
        rootString: 4,
        offsets: [
            { string: 4, fret: 0, finger: 0 },
            { string: 3, fret: 1, finger: 2 }, // b5
            { string: 2, fret: 1, finger: 1 }, // b7
            { string: 1, fret: 1, finger: 3 }  // m3
        ]
    },
    'Tetrad dim7 (Root on 4)': {
        tags: ['Tetrad', 'dim7', 'Root-Pos'],
        rootString: 4,
        offsets: [
            { string: 4, fret: 0, finger: 0 },
            { string: 3, fret: 1, finger: 2 }, // b5
            { string: 2, fret: 0, finger: 1 }, // bb7
            { string: 1, fret: 1, finger: 3 }  // m3
        ]
    },
    'Tetrad mMaj7 (Root on 4)': {
        tags: ['Tetrad', 'mMaj7', 'Root-Pos'],
        rootString: 4,
        offsets: [
            { string: 4, fret: 0, finger: 0 }, // Root
            { string: 3, fret: 2, finger: 3 }, // 5th
            { string: 2, fret: 2, finger: 2 }, // Maj7
            { string: 1, fret: 1, finger: 1 }  // m3
        ]
    },
    'Tetrad 6 (Root on 4)': {
        tags: ['Tetrad', '6', 'Root-Pos'],
        rootString: 4,
        offsets: [
            { string: 4, fret: 0, finger: 0 }, // Root
            { string: 3, fret: 2, finger: 2 }, // 5th
            { string: 2, fret: 0, finger: 1 }, // 6th
            { string: 1, fret: 2, finger: 3 }  // Maj3
        ]
    },
    'Tetrad m6 (Root on 4)': {
        tags: ['Tetrad', 'm6', 'Root-Pos'],
        rootString: 4,
        offsets: [
            { string: 4, fret: 0, finger: 0 }, // Root
            { string: 3, fret: 2, finger: 2 }, // 5th
            { string: 2, fret: 0, finger: 1 }, // 6th
            { string: 1, fret: 1, finger: 3 }  // m3
        ]
    },

    // =============================================
    // TETRAD SHAPES - Root on 6 (Drop 3)
    // =============================================

    'Tetrad Maj7 (Root on 6)': {
        tags: ['Tetrad', 'Maj7', 'Drop3'],
        rootString: 6,
        offsets: [
            { string: 6, fret: 0, finger: 0 }, // Root
            { string: 4, fret: 1, finger: 2 }, // 7th
            { string: 3, fret: 1, finger: 3 }, // 3rd
            { string: 2, fret: 0, finger: 1 }  // 5th
        ]
    },
    'Tetrad m7 (Root on 6)': {
        tags: ['Tetrad', 'm7', 'Drop3'],
        rootString: 6,
        offsets: [
            { string: 6, fret: 0, finger: 0 },
            { string: 4, fret: 0, finger: 1 }, // b7
            { string: 3, fret: 0, finger: 2 }, // b3
            { string: 2, fret: 0, finger: 3 }  // 5th
        ]
    },
    'Tetrad 7 (Root on 6)': {
        tags: ['Tetrad', '7th', 'Drop3'],
        rootString: 6,
        offsets: [
            { string: 6, fret: 0, finger: 0 },
            { string: 4, fret: 0, finger: 2 }, // b7
            { string: 3, fret: 1, finger: 1 }, // 3rd
            { string: 2, fret: 0, finger: 3 }  // 5th
        ]
    },
    'Tetrad m7b5 (Root on 6)': {
        tags: ['Tetrad', 'm7b5', 'Drop3'],
        rootString: 6,
        offsets: [
            { string: 6, fret: 0, finger: 0 },
            { string: 4, fret: 0, finger: 1 }, // b7
            { string: 3, fret: 0, finger: 2 }, // b3
            { string: 2, fret: -1, finger: 3 } // b5
        ]
    },
    'Tetrad dim7 (Root on 6)': {
        tags: ['Tetrad', 'dim7', 'Drop3'],
        rootString: 6,
        offsets: [
            { string: 6, fret: 0, finger: 0 },
            { string: 4, fret: -1, finger: 1 }, // bb7
            { string: 3, fret: 0, finger: 2 },  // b3
            { string: 2, fret: -1, finger: 3 }  // b5
        ]
    },
    'Tetrad mMaj7 (Root on 6)': {
        tags: ['Tetrad', 'mMaj7', 'Drop3'],
        rootString: 6,
        offsets: [
            { string: 6, fret: 0, finger: 0 }, // Root
            { string: 4, fret: 1, finger: 2 }, // Maj7
            { string: 3, fret: 0, finger: 1 }, // b3
            { string: 2, fret: 0, finger: 3 }  // 5th
        ]
    },

    // =============================================
    // TETRAD SHAPES - Root on 5 (Drop 2)
    // =============================================

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
            { string: 5, fret: 0, finger: 0 },
            { string: 4, fret: 2, finger: 2 }, // 5th
            { string: 3, fret: 0, finger: 0 }, // b7
            { string: 2, fret: 1, finger: 1 }  // b3
        ]
    },
    'Tetrad 7 (Root on 5)': {
        tags: ['Tetrad', '7th', 'Drop2'],
        rootString: 5,
        offsets: [
            { string: 5, fret: 0, finger: 0 },
            { string: 4, fret: 2, finger: 2 }, // 5th
            { string: 3, fret: 0, finger: 1 }, // b7
            { string: 2, fret: 2, finger: 3 }  // 3rd
        ]
    },
    'Tetrad m7b5 (Root on 5)': {
        tags: ['Tetrad', 'm7b5', 'Drop2'],
        rootString: 5,
        offsets: [
            { string: 5, fret: 0, finger: 0 },
            { string: 4, fret: 1, finger: 1 }, // b5
            { string: 3, fret: 0, finger: 0 }, // b7
            { string: 2, fret: 1, finger: 2 }  // b3
        ]
    },
    'Tetrad dim7 (Root on 5)': {
        tags: ['Tetrad', 'dim7', 'Drop2'],
        rootString: 5,
        offsets: [
            { string: 5, fret: 0, finger: 0 },
            { string: 4, fret: 1, finger: 1 }, // b5
            { string: 3, fret: -1, finger: 0 }, // bb7
            { string: 2, fret: 1, finger: 2 }  // b3
        ]
    },
    'Tetrad mMaj7 (Root on 5)': {
        tags: ['Tetrad', 'mMaj7', 'Drop2'],
        rootString: 5,
        offsets: [
            { string: 5, fret: 0, finger: 0 }, // Root
            { string: 4, fret: 2, finger: 2 }, // 5th
            { string: 3, fret: 1, finger: 1 }, // Maj7
            { string: 2, fret: 1, finger: 3 }  // b3
        ]
    }
};
