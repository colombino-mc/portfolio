export function animate(scene, camera, renderer, controls) {
    const clock = new THREE.Clock();
    const maxFPS = 120;
    const frameDuration = 1000 / maxFPS;

    function render(timestamp) {
        requestAnimationFrame(render);

        if (!window.lastTime) {
            window.lastTime = timestamp;
        }

        const delta = timestamp - window.lastTime;
        if (delta >= frameDuration) {
            window.lastTime = timestamp;

            if (window.model) {
                window.model.rotation.y += 0.01;
            }

            controls.update();
            renderer.render(scene, camera);
        }

        return clock.getDelta();
    }

    render(); // Start the animation loop
}
