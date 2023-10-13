import * as THREE from "three";

interface TacticsWorld {
  scene: THREE.Scene;
  tick: () => void;
}

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.z = 2;

const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

function tick() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
}

async function createWorld(): Promise<TacticsWorld> {
  const scene = new THREE.Scene();

  // The world is light gray
  scene.background = new THREE.Color(0xa0a0a0);

  // Add the default cube (thanks Blender)
  scene.add(cube);
  scene.add(plane);

  // TODO: load objects
  // https://threejs.org/docs/index.html#examples/en/loaders/GLTFLoader

  return { scene, tick };
}

export default createWorld;
