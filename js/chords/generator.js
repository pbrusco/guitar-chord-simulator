import { SHAPES } from './shapes.js';

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Standard tuning: semitones from low E
const STRING_BASE = { 6: 0, 5: 5, 4: 10, 3: 15, 2: 19, 1: 24 };

// Map of string number to its open note index in NOTES array
const STRING_ROOTS = { 6: 4, 5: 9, 4: 2, 3: 7, 2: 11, 1: 4 };

function getNoteName(stringNum, fret) {
    const rootIndex = STRING_ROOTS[stringNum];
    if (rootIndex === undefined) return null;
    return NOTES[(rootIndex + fret) % 12];
}

// Core formula: compute fret offset for a note on a given string,
// normalized to a playable range (handles octave wrapping automatically)
function fretOffset(rootString, noteString, interval) {
    let offset = STRING_BASE[rootString] - STRING_BASE[noteString] + interval;
    while (offset < -4) offset += 12;
    while (offset > 9) offset -= 12;
    return offset;
}

// Assign fingers [1,2,3] sorted by fret ascending (ties: lower string gets higher finger)
function assignTriadFingers(positions) {
    const sorted = positions.slice().sort((a, b) => {
        if (a.fret !== b.fret) return a.fret - b.fret;
        return b.string - a.string; // lower pitch (higher string#) gets lower finger
    });
    sorted.forEach((p, i) => { p.finger = i + 1; }); // fingers 1, 2, 3
    return positions;
}

// Assign tetrad fingers: root=0 (index), others [1,2,3] by fret ascending
function assignTetradFingers(positions) {
    const rootPos = positions.find(p => p.isRoot);
    const others = positions.filter(p => !p.isRoot)
        .sort((a, b) => {
            if (a.fret !== b.fret) return a.fret - b.fret;
            return b.string - a.string;
        });
    rootPos.finger = 0;
    others.forEach((p, i) => { p.finger = i + 1; });
    return positions;
}

// =============================================
// TRIAD DEFINITIONS
// =============================================

const TRIAD_QUALITIES = {
    Major: { intervals: [0, 4, 7],  tag: 'Major', suffix: '' },
    m:     { intervals: [0, 3, 7],  tag: 'm',     suffix: 'm' },
    dim:   { intervals: [0, 3, 6],  tag: 'dim',   suffix: 'dim' },
    aug:   { intervals: [0, 4, 8],  tag: 'aug',   suffix: 'aug' },
    sus4:  { intervals: [0, 5, 7],  tag: 'sus4',  suffix: 'sus4' },
    sus2:  { intervals: [0, 2, 7],  tag: 'sus2',  suffix: 'sus2' },
};

const TRIAD_STRING_SETS = [
    { strings: [3, 2, 1], tag: 'Set123', label: 'Set 123' },
    { strings: [5, 4, 3], tag: 'Set345', label: 'Set 345' },
    { strings: [6, 5, 4], tag: 'Set456', label: 'Set 456' },
];

const TRIAD_INVERSIONS = [
    { rotation: 0, tag: 'Root-Pos', label: 'Root' },
    { rotation: 1, tag: '1st-Inv',  label: 'Inv 1' },
    { rotation: 2, tag: '2nd-Inv',  label: 'Inv 2' },
];

// =============================================
// TETRAD DEFINITIONS
// =============================================

const TETRAD_QUALITIES = {
    Maj7:    { noteSlots: { R: 0, '3': 4, '5': 7, '7': 11 }, tag: 'Maj7',  suffix: 'Maj7' },
    '7th':   { noteSlots: { R: 0, '3': 4, '5': 7, '7': 10 }, tag: '7th',   suffix: '7' },
    m7:      { noteSlots: { R: 0, '3': 3, '5': 7, '7': 10 }, tag: 'm7',    suffix: 'm7' },
    m7b5:    { noteSlots: { R: 0, '3': 3, '5': 6, '7': 10 }, tag: 'm7b5',  suffix: 'm7b5' },
    dim7:    { noteSlots: { R: 0, '3': 3, '5': 6, '7': 9 },  tag: 'dim7',  suffix: 'dim7' },
    mMaj7:   { noteSlots: { R: 0, '3': 3, '5': 7, '7': 11 }, tag: 'mMaj7', suffix: 'mMaj7' },
    '6':     { noteSlots: { R: 0, '3': 4, '5': 7, '7': 9 },  tag: '6',     suffix: '6' },
    m6:      { noteSlots: { R: 0, '3': 3, '5': 7, '7': 9 },  tag: 'm6',    suffix: 'm6' },
};

const TETRAD_VOICINGS = [
    { strings: [4, 3, 2, 1], order: ['R', '5', '7', '3'], tag: 'Root-Pos' },
    { strings: [6, 4, 3, 2], order: ['R', '7', '3', '5'], tag: 'Drop3' },
    { strings: [5, 4, 3, 2], order: ['R', '5', '7', '3'], tag: 'Drop2' },
];

// =============================================
// GENERATORS
// =============================================

export function generateBarreChords() {
    const library = {};
    const shapes = Object.keys(SHAPES).filter(key => SHAPES[key].tags.includes('Barre'));

    shapes.forEach(shapeKey => {
        const shape = SHAPES[shapeKey];
        if (!shape) return;

        for (let f = 1; f <= 12; f++) {
            const rootName = getNoteName(shape.rootString, f);

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

            library[chordName] = { positions, tags: [...shape.tags] };
        }
    });

    return library;
}

export function generateTriadChords() {
    const library = {};

    for (const [, quality] of Object.entries(TRIAD_QUALITIES)) {
        for (const set of TRIAD_STRING_SETS) {
            for (const inv of TRIAD_INVERSIONS) {
                // Rotate intervals: e.g. [0,4,7] with rotation=1 → [4,7,0]
                const rotated = [];
                for (let i = 0; i < 3; i++) {
                    rotated.push(quality.intervals[(i + inv.rotation) % 3]);
                }

                // Find which string index has the root (interval 0)
                const rootIdx = rotated.indexOf(0);
                const rootString = set.strings[rootIdx];

                // Compute offsets for each note
                const offsets = set.strings.map((str, i) => {
                    let interval = rotated[i];
                    // Notes on lower-pitched strings than root need octave adjustment
                    if (str > rootString) interval -= 12;
                    return { string: str, fret: fretOffset(rootString, str, interval) };
                });

                // Generate across all 12 frets
                for (let f = 1; f <= 12; f++) {
                    const rootName = getNoteName(rootString, f);

                    let valid = true;
                    const positions = offsets.map(o => {
                        const absFret = f + o.fret;
                        if (absFret < 0) valid = false;
                        return { string: o.string, fret: absFret };
                    });

                    if (!valid) continue;

                    assignTriadFingers(positions);

                    const chordName = `${rootName}${quality.suffix} (Triad ${inv.label} (${set.label}))`;
                    library[chordName] = {
                        positions,
                        tags: ['Triad', quality.tag, inv.tag, set.tag]
                    };
                }
            }
        }
    }

    return library;
}

export function generateTetradChords() {
    const library = {};

    for (const [, quality] of Object.entries(TETRAD_QUALITIES)) {
        for (const voicing of TETRAD_VOICINGS) {
            // Map note slots to intervals for this voicing's string order
            const intervals = voicing.order.map(slot => quality.noteSlots[slot]);

            // Root is always on the first (lowest) string in each voicing
            const rootString = voicing.strings[0];

            // Compute offsets
            const offsets = voicing.strings.map((str, i) => {
                let interval = intervals[i];
                // Notes on lower-pitched strings than root need octave adjustment
                if (str > rootString) interval -= 12;
                return {
                    string: str,
                    fret: fretOffset(rootString, str, interval),
                    isRoot: voicing.order[i] === 'R'
                };
            });

            for (let f = 1; f <= 12; f++) {
                const rootName = getNoteName(rootString, f);

                let valid = true;
                const positions = offsets.map(o => {
                    const absFret = f + o.fret;
                    if (absFret < 0) valid = false;
                    return { string: o.string, fret: absFret, isRoot: o.isRoot };
                });

                if (!valid) continue;

                assignTetradFingers(positions);

                // Clean up: remove isRoot helper flag
                positions.forEach(p => { delete p.isRoot; });

                const chordName = `${rootName}${quality.suffix} (Tetrad R${rootString})`;
                library[chordName] = {
                    positions,
                    tags: ['Tetrad', quality.tag, voicing.tag]
                };
            }
        }
    }

    return library;
}
