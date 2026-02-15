import { generateBarreChords, generateTriadChords, generateTetradChords } from './js/chords/generator.js';
import { OPEN_CHORDS } from './js/chords/open.js';

const STRING_BASE = { 6: 0, 5: 5, 4: 10, 3: 15, 2: 19, 1: 24 };
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const INTERVAL_NAMES = {
    0: 'R', 1: 'b2', 2: '2', 3: 'b3', 4: '3', 5: '4', 6: 'b5',
    7: '5', 8: '#5', 9: '6', 10: 'b7', 11: '7'
};

// Expected unique intervals (mod 12) for each chord type
const EXPECTED = {
    // Triads
    'Major': [0, 4, 7], 'm': [0, 3, 7], 'dim': [0, 3, 6],
    'aug': [0, 4, 8], 'sus4': [0, 5, 7], 'sus2': [0, 2, 7],
    // Barre
    'Major-barre': [0, 4, 7], 'Minor-barre': [0, 3, 7],
    '7th-barre': [0, 4, 7, 10], 'm7-barre': [0, 3, 7, 10], 'Maj7-barre': [0, 4, 7, 11],
    // Tetrads
    'Maj7': [0, 4, 7, 11], '7': [0, 4, 7, 10], 'm7': [0, 3, 7, 10],
    'm7b5': [0, 3, 6, 10], 'dim7': [0, 3, 6, 9], 'mMaj7': [0, 3, 7, 11],
    '6': [0, 4, 7, 9], 'm6': [0, 3, 7, 9],
    // Open (same as above but for the fallback)
    'Minor': [0, 3, 7],
};

function getIntervalsFromPositions(positions, rootNote) {
    const intervals = new Set();
    positions.forEach(p => {
        if (p.fret >= 0) {
            const semitone = STRING_BASE[p.string] + p.fret;
            const noteIdx = (4 + semitone) % 12; // 4 because low E = index 4
            const interval = ((noteIdx - rootNote) % 12 + 12) % 12;
            intervals.add(interval);
        }
    });
    return [...intervals].sort((a, b) => a - b);
}

function extractRootAndType(name, tags) {
    // For triads: "C (Triad Root (Set 123))" or "Cm (Triad Root (Set 123))"
    // For tetrads: "CMaj7 (Tetrad R4)"
    // For barre: "Cm (Barre 1fr)"
    // For open: "C Open", "Am7 Open"
    let root = name[0];
    let idx = 1;
    if (name[1] === '#' || name[1] === 'b') { root += name[1]; idx++; }

    const rootNoteIdx = NOTES.indexOf(root);

    // Determine type from tags
    if (tags.includes('Barre')) {
        if (tags.includes('m7')) return { rootNoteIdx, type: 'm7-barre' };
        if (tags.includes('Maj7')) return { rootNoteIdx, type: 'Maj7-barre' };
        if (tags.includes('Minor')) return { rootNoteIdx, type: 'Minor-barre' };
        if (tags.includes('7th')) return { rootNoteIdx, type: '7th-barre' };
        if (tags.includes('Major')) return { rootNoteIdx, type: 'Major-barre' };
    }
    if (tags.includes('Triad')) {
        for (const q of ['m', 'dim', 'aug', 'sus4', 'sus2', 'Major']) {
            if (tags.includes(q)) return { rootNoteIdx, type: q };
        }
    }
    if (tags.includes('Tetrad')) {
        for (const q of ['mMaj7', 'Maj7', 'm7b5', 'dim7', 'm7', 'm6', '6', '7th']) {
            if (tags.includes(q)) return { rootNoteIdx, type: q === '7th' ? '7' : q };
        }
    }
    if (tags.includes('Open')) {
        for (const q of ['m7', 'Maj7', '7', 'sus2', 'sus4', 'Minor', 'Major']) {
            if (tags.includes(q)) return { rootNoteIdx, type: q };
        }
    }
    return { rootNoteIdx, type: null };
}

let errorCount = 0;
let totalChecked = 0;

function checkLibrary(name, library) {
    console.log(`\n=== ${name} ===`);
    let count = 0;
    for (const [chordName, chord] of Object.entries(library)) {
        const { rootNoteIdx, type } = extractRootAndType(chordName, chord.tags || []);
        if (rootNoteIdx === -1 || !type) {
            console.log(`⚠ ${chordName}: Could not parse (root=${rootNoteIdx}, type=${type})`);
            continue;
        }
        const expected = EXPECTED[type];
        if (!expected) {
            console.log(`⚠ ${chordName}: No expected intervals for type '${type}'`);
            continue;
        }
        const intervals = getIntervalsFromPositions(chord.positions, rootNoteIdx);

        // For open chords, allow missing 5th (common voicing)
        let match;
        if ((chord.tags || []).includes('Open')) {
            match = expected.every(e => e === 7 || intervals.includes(e));
        } else {
            match = JSON.stringify(intervals) === JSON.stringify(expected);
        }

        if (!match) {
            const got = intervals.map(i => `${i}(${INTERVAL_NAMES[i]})`).join(', ');
            const exp = expected.map(i => `${i}(${INTERVAL_NAMES[i]})`).join(', ');
            console.log(`❌ ${chordName}`);
            console.log(`   Type: ${type} | Got: [${got}] | Expected: [${exp}]`);
            errorCount++;
        }
        count++;
    }
    totalChecked += count;
    console.log(`Checked: ${count} chords`);
}

const barre = generateBarreChords();
const triads = generateTriadChords();
const tetrads = generateTetradChords();

checkLibrary('BARRE CHORDS', barre);
checkLibrary('TRIAD CHORDS', triads);
checkLibrary('TETRAD CHORDS', tetrads);
checkLibrary('OPEN CHORDS', OPEN_CHORDS);

console.log(`\n=== TOTALS ===`);
console.log(`Barre: ${Object.keys(barre).length}`);
console.log(`Triads: ${Object.keys(triads).length}`);
console.log(`Tetrads: ${Object.keys(tetrads).length}`);
console.log(`Open: ${Object.keys(OPEN_CHORDS).length}`);
console.log(`TOTAL: ${Object.keys(barre).length + Object.keys(triads).length + Object.keys(tetrads).length + Object.keys(OPEN_CHORDS).length}`);
console.log(`\nChecked: ${totalChecked} | Errors: ${errorCount}`);
