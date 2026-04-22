import * as THREE from 'three';

const container = document.getElementById('app');
const startBtn = document.getElementById('start-btn');

// Scene + camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// Camera sits at the center of the sphere
camera.position.set(0, 0, 0.1);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Hidden <video> element that feeds the texture
const video = document.createElement('video');
video.src = '../0417-web.mp4';
video.loop = true;
video.muted = true;
video.playsInline = true;
video.crossOrigin = 'anonymous';
video.preload = 'auto';

const videoTexture = new THREE.VideoTexture(video);
videoTexture.colorSpace = THREE.SRGBColorSpace;
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;

// Sphere with inverted normals so the video renders on the inside
const geometry = new THREE.SphereGeometry(500, 60, 40);
geometry.scale(-1, 1, 1);

const material = new THREE.MeshBasicMaterial({ map: videoTexture });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Look-around state (yaw/pitch in radians)
let lon = 0;
let lat = 0;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let lonStart = 0;
let latStart = 0;

const canvas = renderer.domElement;

canvas.addEventListener('pointerdown', (e) => {
  isDragging = true;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  lonStart = lon;
  latStart = lat;
  canvas.setPointerCapture(e.pointerId);
});

canvas.addEventListener('pointermove', (e) => {
  if (!isDragging) return;
  const dx = e.clientX - dragStartX;
  const dy = e.clientY - dragStartY;
  lon = lonStart - dx * 0.1;
  lat = latStart + dy * 0.1;
  lat = Math.max(-85, Math.min(85, lat));
});

canvas.addEventListener('pointerup', (e) => {
  isDragging = false;
  canvas.releasePointerCapture(e.pointerId);
});

// Scroll to zoom (adjust FOV)
canvas.addEventListener('wheel', (e) => {
  e.preventDefault();
  camera.fov = Math.max(30, Math.min(100, camera.fov + e.deltaY * 0.05));
  camera.updateProjectionMatrix();
}, { passive: false });

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start video on user gesture (browsers block autoplay with sound otherwise)
startBtn.addEventListener('click', async () => {
  try {
    await video.play();
    startBtn.classList.add('hidden');
  } catch (err) {
    console.error('Could not start video:', err);
  }
});

// Render loop
function animate() {
  requestAnimationFrame(animate);

  // Convert lon/lat to a target point the camera looks at
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon);
  const target = new THREE.Vector3(
    500 * Math.sin(phi) * Math.cos(theta),
    500 * Math.cos(phi),
    500 * Math.sin(phi) * Math.sin(theta)
  );
  camera.lookAt(target);

  renderer.render(scene, camera);
}
animate();
