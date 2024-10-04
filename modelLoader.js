export function initModelLoader(scene) {
    const loader = new THREE.GLTFLoader();
    loader.load(
        'assets/models/smol_coin.gltf',
        function (gltf) {
            const model = gltf.scene;
            model.traverse(function(node) {
                if (node.isMesh) {
                    node.castShadow = true; // Each mesh in the model casts shadow
                    node.receiveShadow = true; // Each mesh in the model receives shadow
                }
            });
            scene.add(model);
            model.scale.set(2, 2, 2);
            model.position.set(0, 0, 0);
            window.model = model; // Attach the model to the window object for global access
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.log('An error happened during loading the model');
        }
    );
}
