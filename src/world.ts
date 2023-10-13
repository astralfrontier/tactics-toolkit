import * as THREE from "three";
import generateMap from "./map";

interface TacticsWorld {
  scene: THREE.Scene;
  tick: () => void;
}

function tick() {
  // TODO: perform any mutations to the world here
}

const materials: Record<string, THREE.MeshBasicMaterial> = {
  CYAN: new THREE.MeshBasicMaterial({ color: 0xe0ffff }),
  MAGENTA: new THREE.MeshBasicMaterial({ color: 0xee82ee }),
  YELLOW: new THREE.MeshBasicMaterial({ color: 0xffffe0 }),
  BLACK: new THREE.MeshBasicMaterial({ color: 0x000000 }),
};

async function createWorld(): Promise<TacticsWorld> {
  const scene = new THREE.Scene();

  // Add all squares from the map
  const worldMap = generateMap();

  // Set the world color based on our map
  scene.background = new THREE.Color(worldMap.sky);

  worldMap.squares.forEach((square) => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = materials[square.model];
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    mesh.position.x = square.x;
    mesh.position.y = square.y;
    mesh.position.z = square.z;
  });

  // TODO: load objects
  // https://threejs.org/docs/index.html#examples/en/loaders/GLTFLoader

  return { scene, tick };
}

export default createWorld;
