export function initCameraControls(camera, renderer, controls) {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 5;
    controls.maxDistance = 100;
    controls.maxPolarAngle = Math.PI;
    controls.enableZoom = true;
    controls.keys = {
        LEFT: 'ArrowLeft',
        UP: 'KeyW',
        RIGHT: 'ArrowRight',
        BOTTOM: 'ArrowDown'
    }
    return controls;
}
