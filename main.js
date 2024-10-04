import { initScene } from './initScene.js';
import { initModelLoader } from './modelLoader.js';
import { initCameraControls } from './cameraControls.js';
import { animate } from './animate.js';
import { createCube } from './components/cube.js';
import { addFullScreenAndResizeListeners } from './utils/screenUtils.js';

const { scene, camera, renderer } = initScene();
initModelLoader(scene);

// Add event listeners for full-screen and resize
addFullScreenAndResizeListeners(camera, renderer);

const controls = initCameraControls(camera, renderer); // Initialize and get controls

const cube = createCube(scene); // Create and add the cube to the scene

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb (memory)
document.body.appendChild(stats.dom);

// Add event listeners for full-screen and resize
addFullScreenAndResizeListeners(camera, renderer);

let clock = new THREE.Clock();

function animateWithStats() {
    requestAnimationFrame(animateWithStats);

    stats.begin(); // Begin measuring

    // Update the shader time uniform with the same time as the animation
    let delta = animate(scene, camera, renderer, controls);

    stats.end(); // End measuring
}

animateWithStats(); // Start the animation loop with stats