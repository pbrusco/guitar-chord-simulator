import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Import Chord Libraries - Adjusted paths for being inside js/ folder
import { OPEN_CHORDS } from './chords/open.js';
import { BARRE_CHORDS } from './chords/barre.js';
import { TRIAD_CHORDS } from './chords/triads.js';
import { QUADRIAD_CHORDS } from './chords/quadriads.js';

// ==========================================
// TRANSLATION MANAGER
// ==========================================
const TranslationManager = {
    lang: 'en',
    dict: {
        en: {
            title: "🎸 Hand Simulator",
            add_custom: "➕ Add Custom",
            finger_pos: "📍 Finger Positions",
            hand_adj: "🛠 Hand Adjustment",
            save_offset: "Save Offset",
            reset_lib: "Reset Library to Defaults",
            reloads: "(Reloads from js/chords/ folders)",
            chord_editor: "Chord Editor",
            chord_name: "Chord Name",
            tags_lbl: "Tags",
            save_changes: "Save Changes",
            delete: "Delete",
            manage_lib: "Manage Library",
            // Dynamic
            saved: "Saved!",
            del_confirm: "Delete ",
            reset_confirm: "Reset entire library to defaults?",
            name_req: "Chord Name is required!",
            
            // Tags
            "Barre": "Barre", "Open": "Open", "Major": "Major", "Minor": "Minor", 
            "E-Shape": "E-Shape", "A-Shape": "A-Shape", "Em-Shape": "Em-Shape", "Am-Shape": "Am-Shape", "Triad": "Triad"
        },
        es: {
            title: "🎸 Simulador de Mano",
            add_custom: "➕ Añadir Personalizado",
            finger_pos: "📍 Posición de Dedos",
            hand_adj: "🛠 Ajuste de Mano",
            save_offset: "Guardar Pos.",
            reset_lib: "Restaurar Biblioteca",
            reloads: "(Recarga desde carpetas js/chords/)",
            chord_editor: "Editor de Acordes",
            chord_name: "Nombre del Acorde",
            tags_lbl: "Etiquetas",
            save_changes: "Guardar Cambios",
            delete: "Eliminar",
            manage_lib: "Gestionar Librería",
            // Dynamic
            saved: "Guardado!",
            del_confirm: "Eliminar ",
            reset_confirm: "¿Restaurar biblioteca completa a valores por defecto?",
            name_req: "¡Se requiere nombre del Acorde!",
            
            // Tags
            "Barre": "Cejilla", "Open": "Abierto", "Major": "Mayor", "Minor": "Menor", 
            "E-Shape": "Forma-Mi", "A-Shape": "Forma-La", "Em-Shape": "Forma-Mim", "Am-Shape": "Forma-Lam", "Triad": "Tríada"
        }
    },

    setLang(lang) {
        this.lang = lang;
        
        // Update Buttons
        const btnEn = document.getElementById('lang-en');
        const btnEs = document.getElementById('lang-es');
        if(btnEn) btnEn.style.opacity = lang === 'en' ? 1 : 0.5;
        if(btnEs) btnEs.style.opacity = lang === 'es' ? 1 : 0.5;

        // Update Static Text
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if(this.dict[lang][key]) {
                // Check if it has an icon (hacky but works for Add Custom)
                if(el.children.length === 0) el.textContent = this.dict[lang][key];
                else {
                    // Preserve icon if possible
                    if(key === 'add_custom') {
                        // Keep the icon if it's purely text replacement intended
                        // But current impl replaces content. 
                        // In original code: if(key === 'add_custom') el.textContent = ... which wipes the icon "➕ " if it was text.
                        // Actually the original code had "➕ Add Custom" in the text string in dict.
                        el.textContent = this.dict[lang][key];
                    }
                }
            }
        });

        // Re-render Components
        uiManager.renderChordButtons();
        if(GuitarApp.currentChordName) uiManager.renderDiagram(GuitarApp.currentChordName);
    },

    t(key) {
        return this.dict[this.lang][key] || key;
    },

    // Convert Chord Name to Target Lang
    translateChordName(name) {
        if(this.lang === 'en') return name;

        // Simple parser for Latin Notation
        let translated = name;
        
        const notes = { 'C': 'Do', 'D': 'Re', 'E': 'Mi', 'F': 'Fa', 'G': 'Sol', 'A': 'La', 'B': 'Si' };
        
        // 1. Replace Roots
        for(let note in notes) {
            const regex = new RegExp(`^${note}`, 'g'); 
            if(translated.match(regex)) {
                    translated = translated.replace(regex, notes[note]);
                    break; 
            }
        }

        // 2. Replace Terms in parens
        translated = translated.replace('Open', 'Abierto');
        translated = translated.replace('Barre', 'Cejilla');
        translated = translated.replace(/(\d+)fr/, '$1tr'); // 3fr -> 3tr

        return translated;
    }
};
window.TranslationManager = TranslationManager;

// ==========================================
// DATA & LIBRARY MANAGER
// ==========================================
const DEFAULTS = {
    chords: {
        ...OPEN_CHORDS,
        ...BARRE_CHORDS,
        ...TRIAD_CHORDS,
        ...QUADRIAD_CHORDS
    },
    offsets: {
        // Generic Open Chords
        'C Open': { x: 0, y: 0 },
        'A Open': { x: -1, y: 0.4 },
        'G Open': { x: -0.3, y: 1 },
        'E Open': { x: -0.1, y: 0.8 },
        'D Open': { x: -1, y: 0 },
        'Am Open': { x: 0, y: 0 },
        'Em Open': { x: 0, y: 0 },
        'Dm Open': { x: 0, y: 0 },
        
        // Generic Barres
        'F (Barre 1fr)': { x: -0.2, y: -0.2 },
        'Bm (Barre 2fr)': { x: -0.2, y: -0.2 }
    }
};

const LibraryManager = {
    data: { chords: {}, offsets: {} },

    async init() {
        this.loadFromStorage();
    },

    loadFromStorage() {
        const saved = localStorage.getItem('guitarChordLibrary');
        if (saved) {
            try {
                let parsed = JSON.parse(saved);
                this.loadData(parsed);
            } catch(e) { console.error("Corrupt library", e); this.resetDataToDefaults(); }
        } else {
            this.resetDataToDefaults();
        }
    },

    loadData(parsed) {
        if (!parsed) return;

        // VALIDATION check
        let dirty = false;
        if(parsed.chords) {
            for(let k in parsed.chords) {
                if(Array.isArray(parsed.chords[k])) {
                    parsed.chords[k] = { positions: parsed.chords[k], tags: [] };
                    dirty = true;
                }
            }
        }

        this.data = parsed;
        // Structure check
        if(!this.data.chords) this.data.chords = JSON.parse(JSON.stringify(DEFAULTS.chords));
        if(!this.data.offsets) this.data.offsets = JSON.parse(JSON.stringify(DEFAULTS.offsets));
    },

    resetDataToDefaults() {
        this.data.chords = JSON.parse(JSON.stringify(DEFAULTS.chords));
        this.data.offsets = JSON.parse(JSON.stringify(DEFAULTS.offsets));
    },

    save() {
        localStorage.setItem('guitarChordLibrary', JSON.stringify(this.data));
        uiManager.renderChordButtons();
    },

    resetLibrary() {
        if(confirm(TranslationManager.t('reset_confirm'))) {
            localStorage.removeItem('guitarChordLibrary');
            localStorage.removeItem('guitarHandOffsets');
            this.resetDataToDefaults();
            this.save();
            window.location.reload(); 
        }
    }
};

// ==========================================
// 3D SCENE & ENGINE
// ==========================================
const GuitarApp = {
    scene: null, camera: null, renderer: null, controls: null,
    neckGroup: null, handGroup: null, markerGroup: null,
    fingers: [], knucklePositions: [],
    currentChordName: null,
    handOffset: new THREE.Vector3(),
    palmPosition: new THREE.Vector3(-4, -1, 1.5), // Base Palm Pos
    fingerTargets: [null, null, null, null],
    
    // Animation State
    actualFingerPositions: [],
    actualKnucklePositions: [],
    transitionSpeed: 0.15,

    // Configs
    strings: [],
    fretPositions: [], 
    stringColors: [0xe8e8e8, 0xe0e0e0, 0xd8d8d8, 0xb8b8b8, 0xa8a8a8, 0x989898],
    fingerColors: [0x00ffff, 0xffff00, 0xff8800, 0xff88ff],
    skinTones: [0xf5c9a6, 0xf2c4a0, 0xf0c19a, 0xeebb94],
    fingerConfigs: [
        { offset: new THREE.Vector3(-0.35, 0, 0), lengths: [0.5, 0.4, 0.3] },   // Index
        { offset: new THREE.Vector3(-0.10, 0, 0), lengths: [0.58, 0.45, 0.32] },  // Middle
        { offset: new THREE.Vector3(0.15, 0, 0), lengths: [0.54, 0.42, 0.3] },   // Ring
        { offset: new THREE.Vector3(0.40, 0, 0), lengths: [0.44, 0.35, 0.26] }   // Pinky
    ],

    init() {
        // Setup Three.js Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a2e);

        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            this.camera.position.set(-1.7, 9.5, 5.0);
        } else {
            this.camera.position.set(-1.7, 7.2, 2.7);
        }

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        document.body.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        
        if (isMobile) {
            this.controls.target.set(-2.4, 0.7, 1.5);
        } else {
            this.controls.target.set(-2.4, 0.7, -0.3);
        }
        
        this.controls.addEventListener('change', () => this.updateCameraInfo());

        this.addLights();
        this.buildNeck();
        this.buildHand();
        
        this.updateCameraInfo();
        this.animate();

        // Listeners
        window.addEventListener('resize', () => this.onResize());
    },

    addLights() {
        const ambient = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambient);
        const dir = new THREE.DirectionalLight(0xffffff, 1);
        dir.position.set(5, 10, 5);
        dir.castShadow = true;
        this.scene.add(dir);
    },

    buildNeck() {
        this.neckGroup = new THREE.Group();
        this.scene.add(this.neckGroup);

        // Fretboard
        const board = new THREE.Mesh(
            new THREE.BoxGeometry(14, 0.3, 2),
            new THREE.MeshStandardMaterial({ color: 0x3d2314 })
        );
        board.receiveShadow = true;
        this.neckGroup.add(board);

        // Headstock
        const headstock = new THREE.Mesh(
            new THREE.BoxGeometry(2.5, 0.25, 2.2),
            new THREE.MeshStandardMaterial({ color: 0x2e1a0f }) 
        );
        headstock.position.set(-8.2, -0.05, 0); 
        headstock.rotation.z = -0.15; 
        this.neckGroup.add(headstock);

        // Frets
        const scaleLength = 12;
        const nutX = -6;
        for (let i = 0; i <= 15; i++) {
            const dist = scaleLength - (scaleLength / Math.pow(2, i / 12));
            const fretX = nutX + dist;
            this.fretPositions.push(fretX);
            
            let fret;
            if (i === 0) {
                fret = new THREE.Mesh(
                    new THREE.BoxGeometry(0.25, 0.25, 2.0),
                    new THREE.MeshStandardMaterial({ 
                        color: 0xfffdd0, 
                        roughness: 0.3 
                    })
                );
                fret.position.set(fretX - 0.08, 0.25, 0);
            } else {
                fret = new THREE.Mesh(
                    new THREE.BoxGeometry(0.08, 0.1, 1.8),
                    new THREE.MeshStandardMaterial({ color: 0xc0c0c0, metalness: 0.8, roughness: 0.2 })
                );
                fret.position.set(fretX, 0.2, 0);
            }
            this.neckGroup.add(fret);

            if ([3, 5, 7, 9, 12, 15].includes(i)) {
                const dot = new THREE.Mesh(
                    new THREE.CircleGeometry(0.1, 16),
                    new THREE.MeshStandardMaterial({ color: 0xffffff })
                );
                dot.rotation.x = -Math.PI / 2;
                dot.position.set(fretX - 0.3, 0.16, 0);
                this.neckGroup.add(dot);
            }
        }

        // Strings
        for (let i = 0; i < 6; i++) {
            const thickness = 0.015 + i * 0.005;
            const yPos = 0.7 - i * 0.28;
            const strMesh = new THREE.Mesh(
                new THREE.CylinderGeometry(thickness, thickness, 13, 8),
                new THREE.MeshStandardMaterial({ color: this.stringColors[i], metalness: 0.9, roughness: 0.3 })
            );
            strMesh.rotation.z = Math.PI / 2;
            strMesh.position.set(0, 0.35, yPos);
            this.neckGroup.add(strMesh);
            this.strings.push({ mesh: strMesh, y: yPos });
        }
    },

    buildHand() {
        this.handGroup = new THREE.Group();
        this.scene.add(this.handGroup);
        
        this.markerGroup = new THREE.Group();
        this.scene.add(this.markerGroup);

        // Initialize Fingers
        for (let i = 0; i < 4; i++) {
            const fConfig = this.fingerConfigs[i];
            const f = new Finger(this.fingerColors[i], fConfig.offset, fConfig.lengths, this.scene);
            this.fingers.push(f);
            this.knucklePositions.push(new THREE.Vector3());
            this.actualFingerPositions.push(new THREE.Vector3());
            this.actualKnucklePositions.push(new THREE.Vector3());
        }
    },

    getNotePosition(stringIdx, fret) {
        const idx = 6 - stringIdx; 
        if(!this.strings[idx]) return new THREE.Vector3();
        
        const y = this.strings[idx].y;
        let x;
        if (fret === 0) x = this.fretPositions[0] - 0.5;
        else x = (this.fretPositions[fret] + this.fretPositions[fret - 1]) / 2;
        
        return new THREE.Vector3(x, 0.5, y);
    },

    setChord(name) {
        if (!LibraryManager.data.chords[name]) return;
        
        const offset = LibraryManager.data.offsets[name] || { x: 0, y: 0, z: 0 };
        this.handOffset.set(offset.x, offset.y, offset.z);
        this.currentChordName = name;
        uiManager.updateUIForChord(name, offset);

        this.updatePositions();
    },

    updatePositions() {
        const name = this.currentChordName;
        if(!name || !LibraryManager.data.chords[name]) return;
        if(!this.markerGroup) return;

        this.fingerTargets = [null, null, null, null];
        this.markerGroup.clear();
        
        const chordObj = LibraryManager.data.chords[name];
        const chordNotes = chordObj.positions || chordObj;
        let avgX = 0, avgZ = 0, count = 0;
        
        const fingerNotes = [[], [], [], []];

        chordNotes.forEach(note => {
            const pos = this.getNotePosition(note.string, note.fret);
            fingerNotes[note.finger].push({ ...note, pos });
            
            if (note.fret > 0) {
                const m = new THREE.Mesh(
                    new THREE.CircleGeometry(0.12, 16),
                    new THREE.MeshBasicMaterial({ color: this.fingerColors[note.finger], transparent: true, opacity: 0.8, side: THREE.DoubleSide })
                );
                m.rotation.x = -Math.PI / 2;
                m.position.set(pos.x, 0.16, pos.z);
                this.markerGroup.add(m);

                const r = new THREE.Mesh(
                    new THREE.RingGeometry(0.14, 0.17, 16),
                    new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
                );
                r.rotation.x = -Math.PI / 2;
                r.position.set(pos.x, 0.162, pos.z);
                this.markerGroup.add(r);
            }
            avgX += pos.x;
            avgZ += pos.z;
            count++;
        });

        for(let i=0; i<4; i++) {
            const notes = fingerNotes[i];
            if (notes.length > 0) {
                if (notes.length > 1) {
                    this.fingers[i].isBarre = true;
                    notes.sort((a,b) => b.pos.z - a.pos.z);
                    
                    const maxNote = notes[0];
                    const minNote = notes[notes.length-1];
                    
                    const tipPos = maxNote.pos.clone();
                    tipPos.z = Math.max(0.72, tipPos.z + 0.05); 
                    this.fingerTargets[i] = tipPos;

                    const zCenter = (minNote.pos.z + maxNote.pos.z) / 2;
                    const zSize = (maxNote.pos.z - minNote.pos.z) + 0.4;
                    
                    const highlight = new THREE.Mesh(
                        new THREE.BoxGeometry(0.35, 0.04, zSize),
                        new THREE.MeshBasicMaterial({ 
                            color: this.fingerColors[i], 
                            transparent: true, 
                            opacity: 0.3 
                        })
                    );
                    highlight.position.set(maxNote.pos.x, 0.12, zCenter);
                    this.markerGroup.add(highlight);

                } else {
                    this.fingers[i].isBarre = false;
                    this.fingerTargets[i] = notes[0].pos;
                }
            } else {
                this.fingers[i].isBarre = false; 
            }
        }

        if (count > 0) { avgX /= count; avgZ /= count; }

        let barreZ = 0;
        let barreY = 0;
        
        let baseX = avgX + this.handOffset.x;
        const barreFingerIdx = this.fingers.findIndex(f => f.isBarre);
        
        if(barreFingerIdx !== -1) {
                barreZ = 0.6;
                barreY = -0.2;
                
                const tipX = this.fingerTargets[barreFingerIdx].x;
                const idealBaseX = tipX - this.fingerConfigs[barreFingerIdx].offset.x;

                let xShift = this.handOffset.x;
                
                if(xShift > 0.5) xShift = 0.5;
                if(xShift < -0.5) xShift = -0.5;

                baseX = idealBaseX + xShift;

                const yStagger = [0, 0.08, 0.06, -0.04][barreFingerIdx];
                barreY = (0.48 - yStagger) - (-0.4);
                
                this.currentYOffset = 0; 
        } else {
                this.currentYOffset = this.handOffset.y;
        }

        const knuckleY = -0.4 + this.currentYOffset + barreY;
        const fixedKnuckleZ = -0.95; 
        const knuckleZ = fixedKnuckleZ; 

        for (let i = 0; i < 4; i++) {
            const config = this.fingerConfigs[i];
            const yStagger = [0, 0.08, 0.06, -0.04][i];
            const zStagger = i * 0.05;
            this.knucklePositions[i].set(
                baseX + config.offset.x,
                knuckleY + yStagger,
                knuckleZ + zStagger
            );
        }

        for (let i = 0; i < 4; i++) {
            if (!this.fingerTargets[i]) {
                let left = -1, right = -1;
                for(let j=i-1; j>=0; j--) if(this.fingerTargets[j]) { left = j; break; }
                for(let j=i+1; j<4; j++) if(this.fingerTargets[j]) { right = j; break; }
                
                let tx = baseX + this.fingerConfigs[i].offset.x;
                let tz = avgZ;
                
                if (left !== -1 && right !== -1) {
                    const rangeTotal = this.fingerConfigs[right].offset.x - this.fingerConfigs[left].offset.x;
                    const myRel = (this.fingerConfigs[i].offset.x - this.fingerConfigs[left].offset.x) / rangeTotal;
                    tx = this.fingerTargets[left].x + (this.fingerTargets[right].x - this.fingerTargets[left].x) * myRel;
                    tz = this.fingerTargets[left].z + (this.fingerTargets[right].z - this.fingerTargets[left].z) * myRel;
                } else if (left !== -1) {
                    tx = Math.max(tx, this.fingerTargets[left].x + 0.2);
                    tz = this.fingerTargets[left].z;
                } else if (right !== -1) {
                    tx = Math.min(tx, this.fingerTargets[right].x - 0.2);
                    tz = this.fingerTargets[right].z;
                }

                this.fingerTargets[i] = new THREE.Vector3(tx, 1.1, tz);
            }
        }
    },

    updateCameraInfo() {
        const info = document.getElementById('camera-info');
        if(!info) return;
        const p = this.camera.position;
        info.innerHTML = `Cam: ${p.x.toFixed(1)}, ${p.y.toFixed(1)}, ${p.z.toFixed(1)}`;
    },

    animate() {
        requestAnimationFrame(() => this.animate());
        
        let palmCenter = new THREE.Vector3();
        let activeCount = 0;

        for (let i = 0; i < 4; i++) {
            const targetF = this.fingerTargets[i];
            const targetK = this.knucklePositions[i];

            if (targetF && targetK) {
                if(this.actualKnucklePositions[i].lengthSq() === 0) {
                    this.actualKnucklePositions[i].copy(targetK);
                    this.actualFingerPositions[i].copy(targetF);
                }

                this.actualFingerPositions[i].lerp(targetF, this.transitionSpeed);
                this.actualKnucklePositions[i].lerp(targetK, this.transitionSpeed);

                palmCenter.add(this.actualKnucklePositions[i]);
                activeCount++;

                this.fingers[i].setTarget(this.actualFingerPositions[i]);
                this.fingers[i].update(this.actualKnucklePositions[i]);
            }
        }
        
        if (this.palmMesh && activeCount > 0) {
            palmCenter.divideScalar(activeCount);
            this.palmMesh.position.set(palmCenter.x, palmCenter.y - 0.15, palmCenter.z + 0.6);
            this.palmMesh.rotation.x = -0.2; 
        }

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    },

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
};

// ==========================================
// TEXTURE GENERATOR
// ==========================================
function createSkinTexture() {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // Base Skin Tone
    ctx.fillStyle = '#f5c9a6';
    ctx.fillRect(0,0,size,size);
    
    // 1. Noise / Pores
    for(let i=0; i<80000; i++) {
        const x = Math.random() * size;
        const y = Math.random() * size;
        ctx.fillStyle = `rgba(160, 82, 45, ${Math.random() * 0.08})`; 
        ctx.fillRect(x,y,2,2);
    }
    
    // 2. Subsurface scattering simulation
    for(let i=0; i<50; i++) {
            const x = Math.random() * size;
            const y = Math.random() * size;
            const r = 20 + Math.random() * 60;
            const grd = ctx.createRadialGradient(x,y,0, x,y,r);
            grd.addColorStop(0, "rgba(255, 100, 100, 0.04)");
            grd.addColorStop(1, "rgba(255, 100, 100, 0)");
            ctx.fillStyle = grd;
            ctx.beginPath();
            ctx.arc(x,y,r,0,Math.PI*2);
            ctx.fill();
    }

    // 3. Highlights
    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.moveTo(0, size/2);
    ctx.bezierCurveTo(size/3, size/3, size*2/3, size*2/3, size, size/2);
    ctx.stroke();

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
}

const SHARED_SKIN_TEX = createSkinTexture();

// ==========================================
// FINGER CLASS
// ==========================================
class Finger {
    constructor(color, offset, lengths, scene) {
        this.lengths = lengths;
        this.segments = [];
        this.joints = [];
        this.targetPos = new THREE.Vector3();
        this.isBarre = false;

        const skinMat = new THREE.MeshPhysicalMaterial({ 
            map: SHARED_SKIN_TEX,
            color: 0xffffff,
            roughness: 0.65, 
            metalness: 0.0,
            reflectivity: 0.5,
            sheen: 0.5,
            sheenColor: 0xffddcc,
            sheenRoughness: 0.5,
            side: THREE.FrontSide
        });
        
        const tipMat = new THREE.MeshPhysicalMaterial({ 
            color: color, 
            roughness: 0.3,
            metalness: 0.1,
            clearcoat: 0.4,
            clearcoatRoughness: 0.2
        });

        const jointMat = skinMat;

        lengths.forEach((l) => {
            const seg = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.1, l, 16), skinMat);
            seg.castShadow = true;
            scene.add(seg);
            this.segments.push(seg);
        });

        for(let i=0; i<4; i++) {
            const m = (i === 3) ? tipMat : skinMat;
            const joint = new THREE.Mesh(new THREE.SphereGeometry(0.1, 24, 24), m); 
            joint.castShadow = true;
            scene.add(joint);
            this.joints.push(joint);
        }
    }

    setTarget(pos) { 
        this.targetPos.copy(pos); 
    }

    update(knucklePos) {
        const p0 = knucklePos.clone();
        const p2 = this.targetPos.clone();
        
        let pos;

        const totalLen = this.lengths.reduce((a,b)=>a+b,0);
        const t1 = this.lengths[0]/totalLen;
        const t2 = (this.lengths[0] + this.lengths[1])/totalLen;

        if (this.isBarre) {
            const barreHeight = 0.42;
            p2.y = barreHeight; 
            
            const getBarrePoint = (t) => {
                return new THREE.Vector3(
                    p0.x + (p2.x - p0.x) * t,
                    barreHeight, 
                    p0.z + (p2.z - p0.z) * t
                );
            };

            const j1 = getBarrePoint(t1);
            const j2 = getBarrePoint(t2);
            
            pos = [p0, j1, j2, p2];

        } else {
            const mid = new THREE.Vector3().addVectors(p0, p2).multiplyScalar(0.5);
            const dist = p0.distanceTo(p2);
            
            mid.y = Math.max(p0.y, p2.y) + 0.6 + (dist * 0.15);
            
            if (p0.z > 0) mid.z += 0.5;
            else mid.z -= 0.5;

            const getP = (t) => {
                const u = 1 - t;
                return new THREE.Vector3(
                    u*u*p0.x + 2*u*t*mid.x + t*t*p2.x,
                    u*u*p0.y + 2*u*t*mid.y + t*t*p2.y,
                    u*u*p0.z + 2*u*t*mid.z + t*t*p2.z
                );
            };

            pos = [p0, getP(t1), getP(t2), p2];
        }

        const maxZ = 0.75;
        const minZ = -0.95;
        const safeHeight = 0.38; 

        pos.forEach(p => {
            if(p.z > maxZ) p.z = maxZ;
            if(p.z < minZ) p.z = minZ;

            if(p.y < safeHeight) {
                p.y = safeHeight;
            }
        });

        for(let i=0; i<4; i++) this.joints[i].position.copy(pos[i]);
        for(let i=0; i<3; i++) {
            const center = new THREE.Vector3().lerpVectors(pos[i], pos[i+1], 0.5);
            this.segments[i].position.copy(center);
            this.segments[i].lookAt(pos[i+1]);
            this.segments[i].rotateX(Math.PI/2);
            const d = pos[i].distanceTo(pos[i+1]);
            this.segments[i].scale.set(1, d / this.lengths[i], 1);
        }
    }
}

// ==========================================
// UI MANAGER
// ==========================================
const uiManager = {
    updateUIForChord(name, offset) {
        document.querySelectorAll('.chord-btn').forEach(b => {
            b.classList.remove('active');
            if(b.textContent === name) b.classList.add('active');
        });
        document.getElementById('current-chord-display').textContent = TranslationManager.translateChordName(name);

        ['x', 'y'].forEach(axis => {
            const input = document.querySelector(`input[oninput*="'${axis}'"]`);
            if(input && offset[axis] !== undefined) input.value = offset[axis];
            const disp = document.getElementById(`offset-${axis}`);
            if(disp && offset[axis] !== undefined) disp.textContent = parseFloat(offset[axis]).toFixed(1);
        });

        this.renderDiagram(name);
    },

    updateHandOffset(axis, value) {
        value = parseFloat(value);
        GuitarApp.handOffset[axis] = value;
        document.getElementById(`offset-${axis}`).textContent = value.toFixed(1);
        if(GuitarApp.currentChordName) GuitarApp.updatePositions();
    },

    saveCurrentOffset() {
        const name = GuitarApp.currentChordName;
        if(!name) return;
        const ho = GuitarApp.handOffset;
        LibraryManager.data.offsets[name] = { x: ho.x, y: ho.y };
        LibraryManager.save();
        const btn = document.querySelector(`button[onclick="uiManager.saveCurrentOffset()"]`);
        if(btn) {
            const old = btn.textContent;
            btn.textContent = TranslationManager.t('saved'); 
            setTimeout(()=>btn.textContent=old, 1000);
        }
    },

    resetCurrentOffset() {
        const name = GuitarApp.currentChordName;
        if (!DEFAULTS.offsets[name]) return; 
        const def = DEFAULTS.offsets[name];
        LibraryManager.data.offsets[name] = { ...def };
        LibraryManager.save();
        GuitarApp.setChord(name); 
    },

    renderChordButtons() {
        const container = document.getElementById('chord-buttons-container');
        if(!container) return;
        container.innerHTML = '';
        
        const searchInput = document.getElementById('chord-search-input');
        const filter = searchInput ? searchInput.value.toLowerCase().trim() : '';
        
        const chords = LibraryManager.data.chords;
        const groups = {};
        const sortOrder = ['Open', 'Barre', 'Power', 'Jazz', 'Basic']; 
        
        Object.keys(chords).forEach(key => {
            if (filter) {
                const chord = chords[key];
                const translatedName = TranslationManager.translateChordName(key).toLowerCase();
                const keyMatch = key.toLowerCase().includes(filter) || translatedName.includes(filter);
                
                const tagMatch = chord.tags && chord.tags.some(t => {
                    const translatedTag = TranslationManager.t(t).toLowerCase();
                    return t.toLowerCase().includes(filter) || translatedTag.includes(filter);
                });

                if (!keyMatch && !tagMatch) return;
            }

            const chord = chords[key];
            let group = (chord.tags && chord.tags.length > 0) ? chord.tags[0] : 'Other';
            
            if (!groups[group]) groups[group] = [];
            groups[group].push(key);
        });

        const sortedGroups = Object.keys(groups).sort((a, b) => {
            const idxA = sortOrder.indexOf(a);
            const idxB = sortOrder.indexOf(b);
            
            if (idxA !== -1 && idxB !== -1) return idxA - idxB;
            if (idxA !== -1) return -1;
            if (idxB !== -1) return 1;
            
            if (a === 'Other') return 1;
            if (b === 'Other') return -1;
            
            return a.localeCompare(b);
        });

        const groupColors = {
            'Open': '#10b981',   
            'Barre': '#3b82f6',  
            'Power': '#ef4444',  
            'Jazz': '#8b5cf6',   
            'Basic': '#f59e0b',  
            'Other': '#64748b'   
        };

        sortedGroups.forEach((groupName) => {
            const color = groupColors[groupName] || groupColors['Other'];

            groups[groupName].sort().forEach(key => {
                const btn = document.createElement('button');
                btn.className = 'chord-btn';
                if (GuitarApp.currentChordName === key) btn.classList.add('active');
                
                btn.style.borderBottom = `2px solid ${color}`;
                
                btn.textContent = TranslationManager.translateChordName(key);
                
                btn.onclick = () => GuitarApp.setChord(key);
                btn.oncontextmenu = (e) => {
                    e.preventDefault();
                    window.editChord(key);
                };
                container.appendChild(btn);
            });
        });
    },

    renderDiagram(chordName) {
        const fullChord = LibraryManager.data.chords[chordName];
        if(!fullChord) return;
        const chord = fullChord.positions || fullChord; 
        const tags = fullChord.tags || [];

        const stringNames = ['e', 'B', 'G', 'D', 'A', 'E'];
        
        let html = '';
        if(tags.length) {
            html += `<div style="margin-bottom:10px; font-size: 0.8em; color: var(--accent-color);">
                ${tags.map(t => {
                    const label = TranslationManager.t(t);
                    return `<span style="border:1px solid #555; padding:2px 6px; border-radius:4px; margin-right:4px;">${label}</span>`;
                }).join('')}
            </div>`;
        }

        const fingerList = document.getElementById('finger-list');
        if(fingerList) fingerList.innerHTML = html;

        const frets = chord.map(c => c.fret).filter(f => f > 0);
        const minFret = frets.length ? Math.min(...frets) : 1;
        const maxFret = frets.length ? Math.max(...frets) : 1;
        
        let startFret = 1;
        if (maxFret > 4) startFret = minFret;

        const numCols = 5; 
        let board = '<pre>  Frm:  ';
        for(let i=0; i<numCols; i++) {
            board += (startFret + i).toString().padEnd(4);
        }
        board += '\n';

        const label = startFret === 1 ? '  nut ' : `fr${startFret}`.padEnd(6);
        board += label + '─' + '┬───'.repeat(numCols) + '\n';

        for(let s=1; s<=6; s++) {
            const lbl = stringNames[s-1].padEnd(1);
            let line = `   ${lbl} │`;
            for(let i=0; i<numCols; i++) {
                const f = startFret + i;
                const hit = chord.find(c => c.string === s && c.fret === f);
                line += hit ? ` ${hit.finger+1} │` : '───│';
            }
            board += line + '\n';
        }
        board += '</pre>';
        const fbText = document.getElementById('fretboard-text');
        if(fbText) fbText.innerHTML = board;
    }
};

// ==========================================
// EXPORT GLOBALS FOR HTML
// ==========================================
window.libraryManager = LibraryManager;
window.uiManager = uiManager;

// Modal Logic Globals
window.togglePanel = function() {
    const p = document.getElementById('panel-content');
    const b = document.getElementById('toggle-btn');
    if(p.style.display === 'none') { 
        p.style.display = 'block'; 
        b.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>'; 
    } else { 
        p.style.display = 'none'; 
        b.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>'; 
    }
}

window.openModal = function() {
    document.getElementById('chordModal').style.display = 'block';
    setupForm(); 
}
window.closeModal = function() { document.getElementById('chordModal').style.display = 'none'; }

window.editChord = function(name) {
    document.getElementById('chordModal').style.display = 'block';
    document.getElementById('edit-name').value = name;
    setupForm(name);
}

function setupForm(name) {
    const container = document.getElementById('string-inputs');
    if(!container) return;
    container.innerHTML = '';
    
    const chordObj = name ? LibraryManager.data.chords[name] : {};
    const positions = chordObj.positions || (Array.isArray(chordObj) ? chordObj : []);
    const tags = chordObj.tags || [];

    const tagInput = document.createElement('div');
    tagInput.className = 'form-group';
    tagInput.innerHTML = `
        <label>${TranslationManager.t('tags_lbl')}</label>
        <input type="text" id="edit-tags" value="${tags.join(', ')}" placeholder="e.g. Major, Open, Barre">
    `;
    container.appendChild(tagInput);

    const divider = document.createElement('div');
    divider.className = 'divider';
    container.appendChild(divider);

    const labels = ['High e', 'B', 'G', 'D', 'A', 'Low E'];

    const header = document.createElement('div');
    header.style.display = 'grid';
    header.style.gridTemplateColumns = '60px 1fr 1fr';
    header.style.marginBottom = '8px';
    header.style.fontSize = '0.8rem';
    header.style.opacity = '0.7';
    header.innerHTML = '<span>String</span><span>Fret</span><span>Finger</span>';
    container.appendChild(header);

    for(let s=1; s<=6; s++) {
        const note = positions.find(n => n.string === s);
        const fret = note ? note.fret : 0;
        const finger = note ? note.finger : -1;
        
        const div = document.createElement('div');
        div.className = 'string-row';
        div.innerHTML = `
            <label class="string-label">${labels[s-1]}</label>
            <input type="number" min="0" max="24" id="fret-${s}" value="${fret}" class="fret-input">
            <select id="finger-${s}" class="finger-select">
                <option value="-1" ${finger===-1?'selected':''}>-</option>
                <option value="0" ${finger===0?'selected':''}>${TranslationManager.lang === 'es' ? 'Índice' : 'Index'}</option>
                <option value="1" ${finger===1?'selected':''}>${TranslationManager.lang === 'es' ? 'Medio' : 'Middle'}</option>
                <option value="2" ${finger===2?'selected':''}>${TranslationManager.lang === 'es' ? 'Anular' : 'Ring'}</option>
                <option value="3" ${finger===3?'selected':''}>${TranslationManager.lang === 'es' ? 'Meñique' : 'Pinky'}</option>
            </select>
        `;
        container.appendChild(div);
    }
    
    const delBtn = document.getElementById('delete-chord-btn');
    if(delBtn) {
        if(name) {
            delBtn.style.display = 'block';
            delBtn.textContent = TranslationManager.t('delete');
            delBtn.onclick = () => window.deleteChord(name);
        } else {
            delBtn.style.display = 'none';
        }
    }
}

window.saveChordFromForm = function() {
    const name = document.getElementById('edit-name').value.trim();
    if(!name) return alert(TranslationManager.t('name_req'));
    
    const tagStr = document.getElementById('edit-tags').value;
    const tags = tagStr.split(',').map(s => s.trim()).filter(s => s.length > 0);

    const positions = [];
    for(let s=1; s<=6; s++) {
        const fretInput = document.getElementById(`fret-${s}`);
        const fingerInput = document.getElementById(`finger-${s}`);
        if(fretInput && fingerInput) {
            const fret = parseInt(fretInput.value);
            const finger = parseInt(fingerInput.value);
            if(finger >= 0) positions.push({string: s, fret, finger});
        }
    }
    
    LibraryManager.data.chords[name] = { positions, tags };
    if(!LibraryManager.data.offsets[name]) LibraryManager.data.offsets[name] = {x:0, y:0};
    
    LibraryManager.save();
    window.closeModal();
    GuitarApp.setChord(name);
}

window.deleteChord = function(name) {
    if(confirm(TranslationManager.t('del_confirm') + name + '?')) {
        delete LibraryManager.data.chords[name];
        delete LibraryManager.data.offsets[name];
        LibraryManager.save();
        window.closeModal();
        GuitarApp.setChord(Object.keys(LibraryManager.data.chords)[0] || 'C');
    }
};

// --- BOOTSTRAP ---
(async function bootstrap() {
    try {
        await LibraryManager.init();
        GuitarApp.init();

        uiManager.renderChordButtons();

        const keys = Object.keys(LibraryManager.data.chords);
        const firstChord = keys.length > 0 ? keys[0] : 'C'; 
        GuitarApp.setChord(firstChord);

        if (window.innerWidth <= 768) {
            window.togglePanel();
        }
    } catch(e) {
        console.error("Bootstrap failed:", e);
        alert("App startup failed: " + e);
    }
})();