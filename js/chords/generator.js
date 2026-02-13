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

// Discover shapes dynamically by tag
function getShapesByTag(tag) {
    return Object.keys(SHAPES).filter(key => SHAPES[key].tags.includes(tag));
}

export function generateBarreChords() {
    const library = {};
    const shapes = getShapesByTag('Barre');

    shapes.forEach(shapeKey => {
        const shape = SHAPES[shapeKey];
        if(!shape) return;

        for(let f=1; f<=12; f++) {
            const rootName = getNoteName(shape.rootString, f);

            // Determine suffix from tags (order matters: check specific before general)
            let suffix = '';
            if (shape.tags.includes('m7')) suffix = 'm7';
            else if (shape.tags.includes('Maj7')) suffix = 'Maj7';
            else if (shape.tags.includes('Minor')) suffix = 'm';
            else if (shape.tags.includes('7th')) suffix = '7';

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
    const shapes = getShapesByTag('Triad');

    shapes.forEach(shapeKey => {
        const shape = SHAPES[shapeKey];
        if(!shape) return;

        for(let f=1; f<=12; f++) {
            const rootName = getNoteName(shape.rootString, f);

            // Extract quality from tags
            let quality = '';
            if (shape.tags.includes('m')) quality = 'm';
            else if (shape.tags.includes('dim')) quality = 'dim';
            else if (shape.tags.includes('aug')) quality = 'aug';
            else if (shape.tags.includes('sus4')) quality = 'sus4';
            else if (shape.tags.includes('sus2')) quality = 'sus2';
            // Major => quality stays ''

            // Determine set from tags
            let set = "";
            if (shape.tags.includes('Set345')) set = " (Set 345)";
            else if (shape.tags.includes('Set456')) set = " (Set 456)";
            else set = " (Set 123)";

            // Determine inversion from tags
            let variant = "";
            if (shape.tags.includes('Root-Pos')) variant = `(Triad Root${set})`;
            else if (shape.tags.includes('1st-Inv')) variant = `(Triad Inv 1${set})`;
            else if (shape.tags.includes('2nd-Inv')) variant = `(Triad Inv 2${set})`;

            const chordName = `${rootName}${quality} ${variant}`;

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
                    tags: [...shape.tags]
                };
            }
        }
    });
    return library;
}

export function generateTetradChords() {
    const library = {};
    const shapes = getShapesByTag('Tetrad');

    shapes.forEach(shapeKey => {
        const shape = SHAPES[shapeKey];
        if(!shape) return;

        for(let f=1; f<=12; f++) {
            const rootName = getNoteName(shape.rootString, f);

            // Derive type from tags (order matters: check specific before general)
            let type = '';
            if (shape.tags.includes('mMaj7')) type = 'mMaj7';
            else if (shape.tags.includes('Maj7')) type = 'Maj7';
            else if (shape.tags.includes('m7b5')) type = 'm7b5';
            else if (shape.tags.includes('dim7')) type = 'dim7';
            else if (shape.tags.includes('m7')) type = 'm7';
            else if (shape.tags.includes('m6')) type = 'm6';
            else if (shape.tags.includes('6')) type = '6';
            else if (shape.tags.includes('7th')) type = '7';

            const voicing = ` R${shape.rootString}`;
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
