import { SHAPES } from './shapes.js';

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Map of string number to its open note index
const STRING_ROOTS = {
    6: 4, // E
    5: 9, // A
    4: 2, // D 
    3: 7, // G
    2: 11,// B
    1: 4  // E
};

function getNoteName(stringNum, fret) {
    const rootIndex = STRING_ROOTS[stringNum];
    if (rootIndex === undefined) return null;
    const noteIndex = (rootIndex + fret) % 12;
    return NOTES[noteIndex];
}

export function generateBarreChords() {
    const library = {};
    
    // Shapes defined in shapes.js
    const shapes = [
        'E-Shape Major', 'A-Shape Major', 
        'E-Shape Minor', 'A-Shape Minor',
        'E-Shape 7th', 'A-Shape 7th'
    ];

    shapes.forEach(shapeKey => {
        const shape = SHAPES[shapeKey];
        if(!shape) return;

        // Generate for frets 1 to 12
        for(let f=1; f<=12; f++) {
            const rootName = getNoteName(shape.rootString, f);
            
            // Determine suffix
            let suffix = '';
            if (shape.tags.includes('Minor')) suffix = 'm';
            else if (shape.tags.includes('7th')) suffix = '7';
            
            // Name: "F (Barre 1fr)" or "Bm (Barre 2fr)" or "E7 (Barre Xfr)"
            const chordName = `${rootName}${suffix} (Barre ${f}fr)`; 
            
            const positions = shape.offsets.map(p => ({
                string: p.string, 
                fret: f + p.fret, 
                finger: p.finger
            }));

            library[chordName] = {
                positions,
                tags: [...shape.tags]
            };
        }
    });

    return library;
}

export function generateTriadChords() {
    const library = {};
    const shapes = [
        'Triad Major (Root Pos)', 'Triad Major (1st Inv)', 'Triad Major (2nd Inv)',
        'Triad Major (Set 3-4-5 Root)', 'Triad Major (Set 3-4-5 Inv 1)', 'Triad Major (Set 3-4-5 Inv 2)',
        'Triad Major (Set 4-5-6 Root)', 'Triad Major (Set 4-5-6 Inv 1)', 'Triad Major (Set 4-5-6 Inv 2)'
    ];

    shapes.forEach(shapeKey => {
        const shape = SHAPES[shapeKey];
        if(!shape) return;

        for(let f=1; f<=12; f++) {
            const rootName = getNoteName(shape.rootString, f);
            
            // Generate variant name
            let variant = "";
            let set = "";
            
            if(shapeKey.includes("Set 3-4-5")) set = " (Set 345)";
            else if(shapeKey.includes("Set 4-5-6")) set = " (Set 456)";
            else set = " (Set 123)"; // Default first ones

            if(shapeKey.includes("Root Pos") || shapeKey.includes("Root")) variant = `(Triad Root${set})`;
            else if(shapeKey.includes("1st Inv")) variant = `(Triad Inv 1${set})`;
            else if(shapeKey.includes("2nd Inv")) variant = `(Triad Inv 2${set})`;

            const chordName = `${rootName} ${variant}`;

            let valid = true;
            const positions = shape.offsets.map(p => {
                const absFret = f + p.fret;
                if(absFret < 0) valid = false; 
                return {
                    string: p.string,
                    fret: absFret,
                    finger: p.finger
                };
            });

            if(valid) {
                 library[chordName] = {
                    positions,
                    tags: [...shape.tags] // 'Triad', 'Major'
                };
            }
        }
    });
    return library;
}

export function generateTetradChords() {
    const library = {};
    const shapes = [
        'Tetrad Maj7 (Root on 4)', 
        'Tetrad 7 (Root on 4)', 
        'Tetrad m7 (Root on 4)', 
        'Tetrad m7b5 (Root on 4)',
        'Tetrad dim7 (Root on 4)',
        'Tetrad Maj7 (Root on 6)', 'Tetrad m7 (Root on 6)', 'Tetrad 7 (Root on 6)',
        'Tetrad Maj7 (Root on 5)', 'Tetrad m7 (Root on 5)', 'Tetrad 7 (Root on 5)'
    ];

    shapes.forEach(shapeKey => {
        const shape = SHAPES[shapeKey];
        if(!shape) return;

        for(let f=1; f<=12; f++) {
            const rootName = getNoteName(shape.rootString, f);
            
            // Name: "C Maj7 (Tetrad Root)"
            let type = "Maj";
            if(shapeKey.includes("Maj7")) type = "Maj7";
            else if(shapeKey.includes("m7b5")) type = "m7b5";
            else if(shapeKey.includes("dim7")) type = "dim7";
            else if(shapeKey.includes("m7")) type = "m7"; 
            else if(shapeKey.includes(" 7 ")) type = "7";

            let voicing = "";
            if(shapeKey.includes("Root on 6")) voicing = " R6";
            else if(shapeKey.includes("Root on 5")) voicing = " R5";
            else if(shapeKey.includes("Root on 4")) voicing = " R4";

            // Format: "D Maj7 (Tetrad R6)"
            const chordName = `${rootName}${type} (Tetrad${voicing})`;

            let valid = true;
            const positions = shape.offsets.map(p => {
                const absFret = f + p.fret;
                if(absFret < 0) valid = false;
                return {
                    string: p.string,
                    fret: absFret,
                    finger: p.finger < 0 ? 0 : p.finger
                };
            });

            if(valid) {
                 library[chordName] = {
                    positions,
                    tags: [...shape.tags] 
                };
            }
        }
    });

    return library;
}

