import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

//scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);
camera.position.z = 4
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//shapes
const boxgeometry = new THREE.BoxGeometry(1, 1, 1);
const spheregeometry = new THREE.SphereGeometry(0.5);
const cylindergeometery = new THREE.CylinderGeometry();

function render(time) {
  time *= 0.001;  // convert time to seconds
  cubes.forEach((cube, ndx) => {
    const speed = 1 + ndx * .1;
    const rot = time * speed;
    cube.rotation.x = rot;
    cube.rotation.y = rot;
  });

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}

requestAnimationFrame(render);
const color = 0xFFFFFF;
const intensity = 8;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);
const loader = new THREE.TextureLoader();
const texture = loader.load('nahidwin.jpg');
texture.colorSpace = THREE.SRGBColorSpace;

function makeCubeInstance(geometry, x) {
  const material = new THREE.MeshBasicMaterial({
    map: texture,
  })

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  cube.position.x = x;

  return cube;
}
function makeSphereInstance(geometry, color, x) {
  const material = new THREE.MeshPhongMaterial({color});

  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  sphere.position.x = x;
  sphere.position.y = 2;
  return sphere;
}
function makeCylinderInstance(geometry, color, x) {
  const material = new THREE.MeshPhongMaterial({color});

  const cylinder = new THREE.Mesh(geometry, material);
  scene.add(cylinder);

  cylinder.position.x = x;
  cylinder.position.y = -2;
  return cylinder;
}
const cubes = [
  makeCubeInstance(boxgeometry, -2),
];
makeSphereInstance(spheregeometry, 0x8844aa, -2)
makeCylinderInstance(cylindergeometery,  0x1844aa, -2)

//object
const objLoader = new OBJLoader();
const mtlLoader = new MTLLoader();
mtlLoader.load('Roman Centurion.mtl', (mtl) => {
  mtl.preload();
  objLoader.setMaterials(mtl);
})
objLoader.load('Roman Centurion.obj', (root) => {
  root.position.x = 2;
  scene.add(root);
});
