import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Import Chord Libraries - Adjusted paths for being inside js/ folder
import { OPEN_CHORDS } from './chords/open.js';
import { BARRE_CHORDS } from './chords/barre.js';
import { TRIAD_CHORDS } from './chords/triads.js';
import { TETRAD_CHORDS } from './chords/tetrads.js';

// ==========================================
// TRANSLATION MANAGER
// ==========================================
const TranslationManager = {
    lang: 'es',
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
            "All": "All",
            
            // Tags
            "Barre": "Barre", "Open": "Open", "Major": "Major", "Minor": "Minor", 
            "E-Shape": "E-Shape", "A-Shape": "A-Shape", "Em-Shape": "Em-Shape", "Am-Shape": "Am-Shape", 
            "Triad": "Triad", "Tetrad": "Tetrad",
            "Root-Pos": "Root Pos", "1st-Inv": "1st Inv", "2nd-Inv": "2nd Inv",
            "beginner": "🎓 Beginner",
            // Chord Types
            "m": "m", "7": "7"
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
            "All": "Todos",
            
            // Tags
            "Barre": "Cejilla", "Open": "Abierto", "Major": "Mayor", "Minor": "Menor", 
            "E-Shape": "Forma-Mi", "A-Shape": "Forma-La", "Em-Shape": "Forma-Mim", "Am-Shape": "Forma-Lam", 
            "Triad": "Tríada", "Tetrad": "Cuatríada",
            "Root-Pos": "Pos-Raíz", "1st-Inv": "1ª Inv", "2nd-Inv": "2ª Inv",
            "7th": "7ª", "dim": "Disminuido", "aug": "Aumentado", "maj7": "Maj7", "m7": "m7",
            "beginner": "🎓 Principiante",
            // Chord Types
            "m": "m", "7": "7"
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
                 el.textContent = this.dict[lang][key];
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
        // Sort keys by length DESC to match 'Bb' before 'B'
        const sortedNotes = Object.keys(notes).sort((a,b) => b.length - a.length);
        
        for(let note of sortedNotes) {
            const regex = new RegExp(`^${note}`, ''); 
            if(translated.match(regex)) {
                // Check next char to ensure we don't match B in Bb again if we missed it
                const next = translated[note.length];
                if(next !== '#' && next !== 'b') {
                    translated = translated.replace(regex, notes[note]);
                    break;
                }
            }
        }

        // 2. Replace Terms 
        translated = translated.replace('(Open)', '(Abierto)');
        translated = translated.replace('Open', 'Abierto');
        translated = translated.replace('Barre', 'Cejilla');
        translated = translated.replace('Triad', 'Tríada');
        translated = translated.replace('Tetrad', 'Cuatríada');
        translated = translated.replace('Root', 'Raíz');
        translated = translated.replace('Inv', 'Inv'); // Same
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
        ...TETRAD_CHORDS,
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
        'Dm Open': { x: 0, y: 0 }
    }
};

const LibraryManager = {
    data: { chords: {}, offsets: {} },

    async init() {
         this.data.chords = JSON.parse(JSON.stringify(DEFAULTS.chords));
         this.data.offsets = JSON.parse(JSON.stringify(DEFAULTS.offsets));
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
            this.camera.position.set(-0.5, 10.5, 6.0);
        } else {
            this.camera.position.set(-0.5, 8.0, 4.0);
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
                // Calculate geometric center of the fret
                const prevX = this.fretPositions[i-1];
                const centerX = (fretX + prevX) / 2;

                if (i === 12) {
                    // Double dots
                    [-0.55, 0.55].forEach(zOffset => {
                        const dot = new THREE.Mesh(
                            new THREE.CircleGeometry(0.1, 24),
                            new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 })
                        );
                        dot.rotation.x = -Math.PI / 2;
                        dot.position.set(centerX, 0.152, zOffset);
                        this.neckGroup.add(dot);
                    });
                } else {
                    const dot = new THREE.Mesh(
                        new THREE.CircleGeometry(0.1, 24),
                        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 })
                    );
                    dot.rotation.x = -Math.PI / 2;
                    dot.position.set(centerX, 0.152, 0);
                    this.neckGroup.add(dot);
                }
            }
        }

        // Strings
        // Invert generation so i=0 is Top (High Z) and is Low E (Thick)
        // i=5 is Bottom (Low Z) and is High e (Thin)
        for (let i = 0; i < 6; i++) {
            const thickness = 0.040 - i * 0.005; // 0.040 downto 0.015
            const yPos = 0.7 - i * 0.28;
            
            // Revert color usage so i=0 (Thick) gets Darker color (last in array)
            // Array is Light->Dark. So we need last index first.
            const colorIdx = 5 - i; 
            
            const strMesh = new THREE.Mesh(
                new THREE.CylinderGeometry(thickness, thickness, 13, 8),
                new THREE.MeshStandardMaterial({ color: this.stringColors[colorIdx], metalness: 0.9, roughness: 0.3 })
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
    selectedSelectorRoot: 'C',
    selectedSelectorType: 'Major',
    selectedSelectorCategory: 'All', // New State
    beginnerMode: false,

    toggleBeginnerMode() {
        this.beginnerMode = !this.beginnerMode;
        
        const btn = document.getElementById('beginner-btn');
        if(btn) {
           btn.style.opacity = this.beginnerMode ? '1' : '0.5';
           // btn.innerHTML = this.beginnerMode ? '🎓 Beginner' : '<span style="filter:grayscale(1)">🎓</span> Beginner';
        }
        
        // Reset selection if switching TO beginner mode
        if(this.beginnerMode) {
            this.selectedSelectorRoot = 'C';
            this.selectedSelectorType = 'Major';
            GuitarApp.setChord('C Open');
        } else {
             // ensure visible
             const catContainer = document.getElementById('category-selector');
             if(catContainer) catContainer.style.display = 'flex';
        }
        
        this.renderSelectors();
    },

    updateUIForChord(name, offset) {
        document.getElementById('current-chord-display').textContent = TranslationManager.translateChordName(name);

        // --- NEW SELECTOR LOGIC ---
        const notesOrder = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B'];
        // Find longest matching root
        const sortedNotes = [...notesOrder].sort((a,b) => b.length - a.length);
        let root = 'C';
        for(const n of sortedNotes) {
            if(name.startsWith(n)) {
                // Ensure next char is not part of a longer note symbol (unlikely with sorted check)
                root = n;
                break;
            }
        }

        // Type
        let suffix = name.substring(root.length);
        let type = "Major";
        const parenIdx = suffix.indexOf(' (');
        if(parenIdx !== -1) {
            let t = suffix.substring(0, parenIdx).trim();
            if(t) type = t;
        } else if(suffix.trim()) {
            type = suffix.trim();
        }
        // Remove "Open" from type/mode name to sync correctly
        type = type.replace(/Open/g, '').trim(); 
        if(type === '') type = 'Major';
        
        // Sync State
        if (this.selectedSelectorRoot !== root) this.selectedSelectorRoot = root;
        
        // Handle Empty = Major alias
        const norm = t => (t === '' || t === 'Major') ? 'Major' : t;
        if (norm(this.selectedSelectorType) !== norm(type)) {
            this.selectedSelectorType = norm(type);
        }

        // Sync Category based on tags of current chord
        const chordData = LibraryManager.data.chords[name];
        if(chordData && chordData.tags) {
            if(chordData.tags.includes('Open')) this.selectedSelectorCategory = 'Open';
            else if(chordData.tags.includes('Barre')) this.selectedSelectorCategory = 'Barre';
            else if(chordData.tags.includes('Triad')) this.selectedSelectorCategory = 'Triad';
            else if(chordData.tags.includes('Tetrad')) this.selectedSelectorCategory = 'Tetrad';
            else this.selectedSelectorCategory = 'All';
        }
        
        this.renderSelectors();

        ['x', 'y'].forEach(axis => {
            const input = document.querySelector(`input[oninput*="'${axis}'"]`);
            if(input && offset && offset[axis] !== undefined) input.value = offset[axis];
            const disp = document.getElementById(`offset-${axis}`);
            if(disp && offset && offset[axis] !== undefined) disp.textContent = parseFloat(offset[axis]).toFixed(1);
        });

        this.renderDiagram(name);
    },

    updateHandOffset(axis, value) {
        value = parseFloat(value);
        GuitarApp.handOffset[axis] = value;
        document.getElementById(`offset-${axis}`).textContent = value.toFixed(1);
        if(GuitarApp.currentChordName) GuitarApp.updatePositions();
    },

    resetCurrentOffset() {
        const name = GuitarApp.currentChordName;
        if (!DEFAULTS.offsets[name]) return; 
        const def = DEFAULTS.offsets[name];
        LibraryManager.data.offsets[name] = { ...def }; 
        // No save call
        GuitarApp.setChord(name); 
    },

    selectSelectorRoot(root) {
        this.selectedSelectorRoot = root;
        this.renderSelectors();
        this.tryAutoSelectChord();
    },
    selectSelectorType(type) {
        this.selectedSelectorType = type;
        this.renderSelectors();
        this.tryAutoSelectChord();
    },
    selectSelectorCategory(cat) {
        this.selectedSelectorCategory = cat;
        this.renderSelectors();
        // Maybe try to select the first chord in this category?
    },

    tryAutoSelectChord() {
        // Logic will need update to respect Category too
        const root = this.selectedSelectorRoot;
        const type = this.selectedSelectorType;
        const cat = this.selectedSelectorCategory;

        if(!root || !type) return;

        // Current tags for scoring
        const currentName = GuitarApp.currentChordName;
        let p_tags = [];
        if(currentName && LibraryManager.data.chords[currentName]) {
             p_tags = LibraryManager.data.chords[currentName].tags || [];
        }

        const keys = Object.keys(LibraryManager.data.chords);
        
        const candidates = keys.filter(k => {
            if(!k.startsWith(root)) return false;
            const afterRoot = k[root.length];
            if(afterRoot === '#' || afterRoot === 'b') return false;

            let suffix = k.substring(root.length);
            let kType = "Major";
            const pIdx = suffix.indexOf(' (');
            if(pIdx !== -1) {
                let t = suffix.substring(0, pIdx).trim();
                if(t) kType = t;
            } else if(suffix.trim()) {
                kType = suffix.trim();
            }
            
            // Fix: Strip "Open" from kType to match selector Logic
            kType = kType.replace(/Open/g, '').trim();

            const norm = t => (t === '' || t === 'Major') ? 'Major' : t;
            if (norm(kType) !== norm(type)) return false;

            // Check Category
            // IF Beginner Mode: FORCE check for 'Open' tag
            if (this.beginnerMode) {
                const cTags = LibraryManager.data.chords[k].tags || [];
                if (!cTags.includes('Open')) return false;
            } else if (cat !== 'All') {
                const cTags = LibraryManager.data.chords[k].tags || [];
                if (!cTags.includes(cat)) return false;
            }

            return true;
        });

        if(candidates.length === 0) return;

        // Score
        let best = candidates[0];
        let maxScore = -1;

        candidates.forEach(k => {
            let score = 0;
            const data = LibraryManager.data.chords[k];
            const tags = data.tags || [];

            p_tags.forEach(pt => {
                 if(pt.includes('Shape') && tags.includes(pt)) score += 10;
                 if(pt.includes('Triad') && tags.includes(pt)) score += 5;
                 if(pt.includes('Inv') && tags.includes(pt)) score += 5;
            });
            const mk = k.match(/(\d+)fr/);
            const fret = mk ? parseInt(mk[1]) : 0;
            // Sorting Logic: Prefer lower frets for stable default selection
            // We give a small bonus to lower frets, but if a "Shape" or "Triad" match was found above, it might override.
            // If we want STRICT "First Option" behavior (usually meaning lowest fret / simplest), 
            // we should perhaps just sort the candidates by fret and pick the first one?
            // The request says "automatically select the first option of the variants".
            // The variants in UI are sorted by fret. So let's align this logic to that.
        });
        
        // Revised Logic: Just pick the "First" variant as it would appear in the UI list.
        // The UI sorts by Fret number.
        candidates.sort((a,b) => {
             const extract = (s) => {
                 const m = s.match(/(\d+)fr/);
                 return m ? parseInt(m[1]) : 0;
             };
             const fa = extract(a);
             const fb = extract(b);
             if(fa !== fb) return fa - fb;
             return a.localeCompare(b);
        });
        
        // Select the first one
        best = candidates[0];
        
        GuitarApp.setChord(best);
    },

    renderSelectors() {
        if(!LibraryManager.data || !LibraryManager.data.chords) return;
        const chords = LibraryManager.data.chords;
        let keys = Object.keys(chords);
        
        // Filter for Beginner Mode
        if(this.beginnerMode) {
            keys = keys.filter(k => {
                const c = chords[k];
                return c.tags && c.tags.includes('Open');
            });
            // Hide Category Selector
            const catContainer = document.getElementById('category-selector');
            if(catContainer) catContainer.style.display = 'none';
            
            // Should also hide/disable variations if too many? No, simple opens usually don't have many.
        } else {
             const catContainer = document.getElementById('category-selector');
             if(catContainer) catContainer.style.display = 'flex';
        }

        const notesOrder = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B'];

        // 1. ROOTS
        const roots = new Set();
        keys.forEach(k => {
             for(const n of notesOrder) {
                 if(k.startsWith(n)) {
                     const next = k[n.length];
                     if(next !== '#' && next !== 'b') {
                         roots.add(n);
                         break; 
                     }
                 }
             }
        });
        
        let validRoot = this.selectedSelectorRoot;
        if(!roots.has(validRoot) && roots.size > 0) validRoot = 'C'; 
        this.selectedSelectorRoot = validRoot;

        const rootContainer = document.getElementById('root-selector');
        if(rootContainer) {
            rootContainer.innerHTML = '';
            const sortedRoots = notesOrder.filter(n => roots.has(n));
            sortedRoots.forEach(r => {
                const btn = document.createElement('button');
                btn.className = `selector-btn ${r === validRoot ? 'selected' : ''}`;
                btn.textContent = r;
                btn.onclick = () => this.selectSelectorRoot(r);
                rootContainer.appendChild(btn);
            });
        }

        // Filter keys by Root
        const rootKeys = keys.filter(k => {
            if(!k.startsWith(validRoot)) return false;
            const remainder = k.substring(validRoot.length);
            return !['#','b'].includes(remainder[0]);
        });

        // 2. TYPES (Modes) - Now dependent on Root only
        const types = new Set();
        const typeMap = {}; // type -> list of keys

        rootKeys.forEach(k => {
            let suffix = k.substring(validRoot.length);
            let type = "Major";
            const pIdx = suffix.indexOf(' (');
            if(pIdx !== -1) {
                let t = suffix.substring(0, pIdx).trim();
                if(t) type = t;
            } else if(suffix.trim()) {
                type = suffix.trim();
            }
            // Remove "Open" from type/mode name to avoid it appearing as a mode
            type = type.replace(/Open/g, '').trim(); 
            if(type === '') type = 'Major';

            types.add(type);
            
            if(!typeMap[type]) typeMap[type] = [];
            typeMap[type].push(k);
        });

        let validType = this.selectedSelectorType;
        const norm = t => (t === '' || t === 'Major') ? 'Major' : t;
        
        let exists = false;
        if(types.has(validType)) exists = true;
        
        if(!exists) {
            // Priority: Major -> Minor -> m -> First available
            if(types.has('Major')) validType = 'Major';
            else if(types.has('m')) validType = 'm';
            else if(types.has('Minor')) validType = 'Minor';
            else if(types.size > 0) validType = Array.from(types)[0];
        }
        if (validType) this.selectedSelectorType = validType;

        const typeContainer = document.getElementById('type-selector');
        if(typeContainer) {
            typeContainer.innerHTML = '';
            const typeOrder = ['Major', 'Minor', 'm', '7', 'm7', 'maj7', 'dim', 'aug'];
            const sortedTypes = Array.from(types).sort((a,b) => {
                const idxA = typeOrder.indexOf(a);
                const idxB = typeOrder.indexOf(b);
                if(idxA!==-1 && idxB!==-1) return idxA - idxB;
                if(idxA!==-1) return -1;
                if(idxB!==-1) return 1;
                return a.localeCompare(b);
            });

            sortedTypes.forEach(t => {
                const btn = document.createElement('button');
                btn.className = `selector-btn ${t === validType ? 'selected' : ''}`;
                const labelKey = (t === 'Major' || t === '') ? 'Major' : t;
                btn.textContent = TranslationManager.t(labelKey);
                btn.onclick = () => this.selectSelectorType(t);
                typeContainer.appendChild(btn);
            });
        }

        // Filter keys by Type
        const typeKeys = (typeMap[validType] || []);

        // 3. CATEGORIES (Disposition) - Now dependent on Root + Type
        const categories = new Set(['All']);
        typeKeys.forEach(k => {
            const data = chords[k];
            if(data.tags) {
                if(data.tags.includes('Open')) categories.add('Open');
                if(data.tags.includes('Barre')) categories.add('Barre');
                if(data.tags.includes('Triad')) categories.add('Triad');
                if(data.tags.includes('Tetrad')) categories.add('Tetrad');
            }
        });

        let validCat = this.selectedSelectorCategory || 'All';
        // If the previously selected category doesn't exist for this Root+Type, fallback to 'All'
        // But 'All' always exists in our logic.
        // However, if we want to force a specific filtered view:
        if(!categories.has(validCat)) validCat = 'All';
        this.selectedSelectorCategory = validCat;

        const catContainer = document.getElementById('category-selector');
        if(catContainer) {
            catContainer.innerHTML = '';
            const catOrder = ['All', 'Open', 'Barre', 'Triad', 'Tetrad'];
            const sortedCats = Array.from(categories).sort((a,b) => {
                 let ia = catOrder.indexOf(a);
                 let ib = catOrder.indexOf(b);
                 if(ia === -1) ia = 99; 
                 if(ib === -1) ib = 99;
                 return ia - ib;
            });
            
            sortedCats.forEach(c => {
                const btn = document.createElement('button');
                btn.className = `selector-btn ${c === validCat ? 'selected' : ''}`;
                const label = TranslationManager.t ? (TranslationManager.t(c) || c) : c;
                btn.textContent = label;
                btn.onclick = () => this.selectSelectorCategory(c);
                catContainer.appendChild(btn);
            });
        }

        // Filter keys by Category
        const finalKeys = typeKeys.filter(k => {
            if(validCat === 'All') return true;
            const data = chords[k];
            return data.tags && data.tags.includes(validCat);
        });

        // 4. VARIATIONS
        const varContainer = document.getElementById('variation-selector');
        if(varContainer) {
            // Hide if Beginner Mode OR only 1 option available?
            // User requested to UNHIDE it for beginner mode for now (or maybe just keep it visible if multiple exist?)
            // "Begginer mode still does not work, try unhidding the variant selector"
            // Reverting logic to show it unless just 1 option
            if (finalKeys.length <= 1) {
                varContainer.style.display = 'none';
            } else {
                varContainer.style.display = 'flex';
            }

            varContainer.innerHTML = '';
            
            finalKeys.sort((a,b) => {
                 const extract = (s) => {
                     const m = s.match(/(\d+)fr/);
                     return m ? parseInt(m[1]) : 0;
                 };
                 const fa = extract(a);
                 const fb = extract(b);
                 if(fa !== fb) return fa - fb;
                 return a.localeCompare(b);
            });

            finalKeys.forEach(k => {
                const pIdx = k.indexOf('(');
                let label = k;
                if(pIdx !== -1) {
                    label = k.substring(pIdx+1, k.length-1);
                } else {
                     label = "Default"; 
                }
                if(label.startsWith("Barre ")) label = label.substring(6); 
                
                const chordData = LibraryManager.data.chords[k];
                const tags = chordData.tags || [];
                let tagText = "";
                tags.forEach(t => {
                    if(t.includes('Shape')) tagText = t;
                });

                const btn = document.createElement('div');
                btn.className = `variation-btn ${GuitarApp.currentChordName === k ? 'active' : ''}`;
                btn.onclick = () => GuitarApp.setChord(k);
                btn.innerHTML = `<span>${label}</span> <span class="variation-tag">${tagText}</span>`;
                varContainer.appendChild(btn);
            });
        }
    },

    renderChordButtons() { this.renderSelectors(); },


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
            
            // Check for Open/Muted
            // Note: chord array only contains played notes. Missing means muted/x.
            const pos = chord.find(c => c.string === s);
            let marker = ' ';
            if(!pos) marker = 'x';
            else if(pos.fret === 0) marker = 'o';

            let line = ` ${marker} ${lbl} │`;
            for(let i=0; i<numCols; i++) {
                const f = startFret + i;
                const hit = chord.find(c => c.string === s && c.fret === f);
                // Adjust finger display: use finger number if defined > 0, else maybe just dot?
                // Using finger+1 (data is 0-indexed fingers 0..3) -> 1..4.
                // Shapes.js uses finger 0=Index. Display 1.
                // Barre logic might imply multiple fingers? No, data has explicit fingers.
                // Thumb is T? Generally not supported yet but just in case.
                
                let val = '●'; // Default dot
                if(hit && hit.finger !== undefined && hit.finger >= 0) val = (hit.finger + 1).toString();
                // If finger is -1 (e.g. some generated?) use T or dot
                if(hit && hit.finger === -1) val = 'T';

                line += hit ? ` ${val} │` : '───│';
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
};


// Removed Modal Logic

// --- BOOTSTRAP ---
(async function bootstrap() {
    try {
        await LibraryManager.init();
        GuitarApp.init();

        uiManager.renderSelectors();

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