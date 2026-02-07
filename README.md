# 🎸 Guitar Hand Simulator

A 3D web application that simulates a human hand playing guitar chords. Built with Three.js, it features real-time inverse kinematics (IK) to position fingers accurately on a virtual fretboard, with special physics logic for Barre chords.

[**Live Demo**](https://pbrusco.github.io/guitar-chord-simulator/)

---

## 🇬🇧 English

### Overview
This project visualizes guitar chords on a 3D fretboard. Unlike static chord diagrams, this simulator positions a rigged 3D hand model dynamically based on string and fret data. It includes a sophisticated physics engine to handle the mechanical differences between "Open" chords and "Barre" chords (where one finger presses multiple strings).

### Features
*   **3D Hand Simulation**: Real-time rendering of fingers and knuckles.
*   **Barre Chord Physics**: Specific IK logic to flatten the index finger and rigid-lock the hand rotation for realistic barre chords.
*   **Modular Chord Library**: Organized modules for Open chords, Barre chords, Triads, and Quadriads (7ths) in pure JavaScript.
*   **Customization**:
    *   **Add Custom**: Editor to define your own chords on the fly.
    *   **Reset to Defaults**: Quickly reload the original library from the codebase.
*   **Glassmorphism UI**: Modern, dark-themed control panel with 3D-aware overlays.

### Installation & Usage
To run locally:

1.  Clone the repository:
    ```bash
    git clone https://github.com/pbrusco/guitar-chord-simulator.git
    ```
2.  Open `index.html` in your browser.
    *   *Note: Due to browser security policies regarding ES Modules, you may need to run a local server (e.g., Live Server in VS Code or `python3 -m http.server`).*

### Project Structure
*   `index.html`: Main entry point, 3D engine, and UI logic.
*   `js/chords/`: Modular chord definitions (Source of Truth).
    *   `open.js`: Standard open chords (C, A, G, E, D, etc.).
    *   `barre.js`: Movable barre shapes.
    *   `triads.js`: Triad inversions.
    *   `quadriads.js`: 7th chords.

---

## 🇪🇸 Español

### Descripción General
Este proyecto visualiza acordes de guitarra en un diapasón 3D. A diferencia de los diagramas de acordes estáticos, este simulador posiciona un modelo de mano 3D dinámicamente basándose en datos de cuerdas y trastes. Incluye un motor de física sofisticado para manejar las diferencias mecánicas entre acordes "Abiertos" y acordes con "Cejilla" (Barre chords).

### Características
*   **Simulación de Mano 3D**: Renderizado en tiempo real de dedos y nudillos.
*   **Física de Cejilla (Barre)**: Lógica de Cinemática Inversa (IK) específica para aplanar el dedo índice y bloquear la rotación de la mano.
*   **Biblioteca Modular**: Módulos organizados para acordes Abiertos, Cejillas, Tríadas y Cuatríadas en JavaScript puro.
*   **Personalización**:
    *   **Añadir Personalizado**: Editor para definir tus propios acordes al instante.
    *   **Resetear a Default**: Recarga rápidamente la biblioteca original desde el código.
*   **Interfaz Moderno**: Panel de control con diseño "Glassmorphism" (vidrio esmerilado).

### Instalación y Uso
Para correrlo localmente:

1.  Clona el repositorio:
    ```bash
    git clone https://github.com/pbrusco/guitar-chord-simulator.git
    ```
2.  Abre `index.html` en tu navegador.
    *   *Nota: Debido a políticas de seguridad de los navegadores con Módulos ES, es posible que necesites un servidor local (ej. Live Server en VS Code o `python3 -m http.server`).*

### Estructura del Proyecto
*   `index.html`: Punto de entrada principal, motor 3D y lógica de interfaz.
*   `js/chords/`: Definiciones modulares de acordes (Fuente de Verdad).
    *   `open.js`: Acordes abiertos estándar.
    *   `barre.js`: Formas de cejilla móviles.
    *   `triads.js`: Inversiones de tríadas.
    *   `quadriads.js`: Acordes de séptima.
