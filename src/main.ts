import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import createWorld from "./world";

// Set up basic rendering shit and attach the scene to the DOM
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document
  .querySelector<HTMLDivElement>("#app")!
  .appendChild(renderer.domElement);

// The currently active camera. Reassign to change perspective
let activeCamera: THREE.Camera;

const primaryCamera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
primaryCamera.position.z = 5;
activeCamera = primaryCamera;

// TODO: create other cameras
// https://threejs.org/docs/index.html#api/en/cameras/OrthographicCamera

const controls = new OrbitControls(primaryCamera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.enablePan = false;
controls.enableDamping = true;
controls.update();

const world = await createWorld();

function animate() {
  requestAnimationFrame(animate);
  world.tick();
  controls.update();
  renderer.render(world.scene, activeCamera);
}
animate();

// TODO: handle user input
