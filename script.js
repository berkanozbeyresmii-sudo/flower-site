// SAHNE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// KAMERA
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 6;

// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ❤️ KALP ŞEKLİ
const heartShape = new THREE.Shape();

heartShape.moveTo(0, 0);
heartShape.bezierCurveTo(0, 0, -2, -2, -4, 0);
heartShape.bezierCurveTo(-6, 4, -2, 6, 0, 8);
heartShape.bezierCurveTo(2, 6, 6, 4, 4, 0);
heartShape.bezierCurveTo(2, -2, 0, 0, 0, 0);

// 3D DERİNLİK
const geometry = new THREE.ExtrudeGeometry(heartShape, {
  depth: 2,
  bevelEnabled: true,
  bevelThickness: 0.5,
  bevelSize: 0.5,
  bevelSegments: 5
});

const material = new THREE.MeshStandardMaterial({
  color: 0xff3366,
  metalness: 0.6,
  roughness: 0.3
});

const heart = new THREE.Mesh(geometry, material);
heart.scale.set(0.3, 0.3, 0.3);
heart.position.set(0, -1, 0);
scene.add(heart);

// IŞIKLAR
const light1 = new THREE.PointLight(0xffffff, 1);
light1.position.set(5, 5, 5);
scene.add(light1);

const light2 = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(light2);

// ANİMASYON
function animate() {
  requestAnimationFrame(animate);
  heart.rotation.y += 0.01;
  heart.rotation.x += 0.005;
  renderer.render(scene, camera);
}

animate();

// EKRAN BOYUTU
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});