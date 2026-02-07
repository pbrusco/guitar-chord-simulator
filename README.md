# 🎸 Guitar Hand Simulator

A 3D web application that simulates a human hand playing guitar chords. Built with Three.js, it features real-time inverse kinematics (IK) to position fingers accurately on a virtual fretboard, with special physics logic for Barre chords.

[**Live Demo**](https://pbrusco.github.io/guitar-chord-simulator/)

---

## 🇬🇧 English

### Overview
This project visualizes guitar chords on a 3D fretboard. Unlike static chord diagrams, this simulator positions a rigged 3D hand model dynamically based on string and fret data. It utilizes procedurally generated textures for realistic skin rendering and features a sophisticated physics engine to handle the mechanical differences between "Open" chords and "Barre" chords.

### Features
*   **Realistic 3D Hand**: 
    *   Procedural skin textures with subsurface scattering simulation.
    *   Physically based materials for realistic lighting and sheen.
    *   Tapered finger geometry with fingernails.
*   **Smart Physics Engine**: 
    *   Real-time Inverse Kinematics (IK) for finger placement.
    *   Specialized logic for Barre chords to flatten the index finger and adjust wrist rotation.
*   **Search & Organization**:
    *   Real-time search filtering.
    *   Color-coded chord groups (Open, Barre, Power, Jazz, etc.).
*   **Multi-Language Support**: Full UI and Chord Name translation (English / Spanish).
*   **Mobile Optimized**: Responsive UI with specific camera angles and controls for mobile devices.
*   **Customization**:
    *   **Chord Editor**: Add your own custom chords.
    *   **Hand Adjustment**: Fine-tune hand offsets per chord.
    *   **Library Management**: Reset defaults or save changes to local storage.

### Installation & Usage
To run locally:

1.  Clone the repository:
    ```bash
    git clone https://github.com/pbrusco/guitar-chord-simulator.git
    ```
2.  Open `index.html` in your browser.
    *   *Note: Due to browser security policies regarding ES Modules, you may need to run a local server (e.g., Live Server in VS Code or `python3 -m http.server`).*

### Project Structure
*   `index.html`: Entry point and UI structure.
*   `css/style.css`: Styling for the glassmorphic UI and responsive layout.
*   `js/app.js`: Core logic, 3D engine (Three.js), IK solver, and UI handlers.
*   `js/chords/`: Modular chord definitions.
    *   `open.js`: Standard open chords.
    *   `barre.js`: Movable barre shapes.
    *   `triads.js`: Theory-based chord shapes.

---

## 🇪🇸 Español

### Descripción General
Este proyecto visualiza acordes de guitarra en un diapasón 3D. A diferencia de los diagramas estáticos, este simulador posiciona una mano 3D dinámicamente. Utiliza texturas generadas procedimentalmente para una piel realista y cuenta con un motor de física avanzado para diferenciar mecánicamente entre acordes "Abiertos" y acordes con "Cejilla".

### Características
*   **Mano 3D Realista**: 
    *   Texturas de piel procedimentales con simulación de dispersión subsuperficial.
    *   Materiales basados en física (PBR) para iluminación realista.
    *   Geometría de dedos detallada con uñas.
*   **Motor de Física Inteligente**: 
    *   Cinemática Inversa (IK) en tiempo real.
    *   Lógica especializada para acordes con Cejilla (Barre) que aplana el dedo índice y ajusta la muñeca.
*   **Búsqueda y Organización**:
    *   Filtrado de búsqueda en tiempo real.
    *   Grupos de acordes codificados por colores (Abiertos, Cejilla, Power, Jazz, etc.).
*   **Soporte Multi-idioma**: Traducción completa de UI y nombres de acordes (Inglés / Español).
*   **Optimizado para Móvil**: UI responsiva con ángulos de cámara y controles específicos para móviles.
*   **Personalización**:
    *   **Editor de Acordes**: Añade tus propios acordes personalizados.
    *   **Ajuste de Mano**: Calibra la posición de la mano para cada acorde.
    *   **Gestión de Librería**: Guardado local y restauración de valores por defecto.

### Estructura del Proyecto
*   `index.html`: Punto de entrada y estructura UI.
*   `css/style.css`: Estilos para la interfaz y diseño responsivo.
*   `js/app.js`: Lógica principal, motor 3D (Three.js), sistema IK y manejo de UI.
*   `js/chords/`: Definiciones modulares de acordes.
