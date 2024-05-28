const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Освещение
const ambientLight = new THREE.AmbientLight(0x404040, 6); // мягкий белый свет
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 4.5);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Динамическое затухание вращения
controls.dampingFactor = 0.05; // Коэффициент затухания
controls.screenSpacePanning = false; // Панорамирование относительно экрана, а не камеры
controls.minDistance = 5; // Минимальное расстояние до объекта
controls.maxDistance = 100; // Максимальное расстояние до объекта
controls.maxPolarAngle = Math.PI / 2; // Максимальный угол по вертикали
controls.enableZoom = true;
controls.keys = {
	LEFT: 'ArrowLeft', //left arrow
	UP: 'ArrowUp', // up arrow
	RIGHT: 'ArrowRight', // right arrow
	BOTTOM: 'ArrowDown' // down arrow
}

// Загрузчик модели
const loader = new THREE.GLTFLoader();
loader.load(
    'models/smol_coin.gltf',
    function (gltf) {
        model = gltf.scene; // Сохраняем модель в переменную
        scene.add(model);
        model.scale.set(2, 2, 2);
        model.position.set(0, 0, 0);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log('An error happened during loading the model');
    }
);

// Функция анимации для вращения модели

let lastTime = 0;
const maxFPS = 60; // Ограничение до 30 FPS
function animate(timestamp) {
    requestAnimationFrame(animate);

    const delta = timestamp - lastTime;
    if (delta < 1000 / maxFPS) return; // Ограничиваем частоту кадров
    if (model) {
        model.rotation.y += 0.05; // Вращаем модель по оси Y
    }
    lastTime = timestamp;
    controls.update();
    renderer.render(scene, camera);
}

animate(); // Запуск анимации

