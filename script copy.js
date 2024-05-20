import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

function main() {

  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  const fov = 45;
  const aspect = 2;
  const near = 0.1;
  const far = 150;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 20);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('black');
  const skyloader = new THREE.TextureLoader();
  const skytexture = skyloader.load(
    "bridge.jpg", () => {
      skytexture.mapping = THREE.EquirectangularReflectionMapping;
      skytexture.colorSpace = THREE.SRGBColorSpace;
      scene.background = skytexture;
    }
  );
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

  const planeSize = 80;
  const loader = new THREE.TextureLoader();
  const texture1 = loader.load('f.png');
  texture1.wrapS = THREE.RepeatWrapping;
  texture1.wrapT = THREE.RepeatWrapping;
  texture1.magFilter = THREE.NearestFilter;
  texture1.colorSpace = THREE.SRGBColorSpace;
  const repeats = planeSize / 2;
  texture1.repeat.set(repeats, repeats);

  const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
  const planeMat = new THREE.MeshPhongMaterial({
    map: texture1,
    side: THREE.DoubleSide,
  });
  const planemesh = new THREE.Mesh(planeGeo, planeMat);
  planemesh.rotation.x = Math.PI * - .5;
  planemesh.position.y = -2
  scene.add(planemesh);

  const texture2 = loader.load("nahidwin.jpg")
  texture2.colorSpace = THREE.SRGBColorSpace
  const cubeSize = 4;
  const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
  const cubeMat = new THREE.MeshPhongMaterial({ color: '#8AC' });
  const cubemesh = new THREE.Mesh(cubeGeo, cubeMat);
  cubemesh.position.set(cubeSize + 1, cubeSize / 2, 0);
  scene.add(cubemesh);
  function makeCubeInstance(geometry, x, z) {
    const material = new THREE.MeshPhongMaterial({
      map: texture2,
    })

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;
    cube.position.z = z;

    return cube;
  }
  const cubes = [
    makeCubeInstance(cubeGeo, -4, 0),
  ];
  const cylindergeometry = new THREE.CylinderGeometry();
  function makeCylinderInstance(geometry, color, x, z) {
    const material = new THREE.MeshPhongMaterial({ color });

    const cylinder = new THREE.Mesh(geometry, material);
    scene.add(cylinder);

    cylinder.position.x = x;
    cylinder.position.y = -1;
    cylinder.position.z = z;
    return cylinder;
  }
  makeCylinderInstance(cylindergeometry, 0x1844aa, -2, 4)
  var mapo = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ]
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
      if (mapo[i][j] == 1) {
        cubes.concat([makeCubeInstance(cubeGeo, i * 5 - 37, j * 5 - 37)])
      }
    }
  }

  const sphereRadius = 3;
  const sphereWidthDivisions = 32;
  const sphereHeightDivisions = 16;
  const sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
  const sphereMat = new THREE.MeshPhongMaterial({ color: '#CA8' });
  const spheremesh = new THREE.Mesh(sphereGeo, sphereMat);
  spheremesh.position.set(- sphereRadius - 1, sphereRadius + 2, 0);
  scene.add(spheremesh);



  class ColorGUIHelper {

    constructor(object, prop) {

      this.object = object;
      this.prop = prop;

    }
    get value() {

      return `#${this.object[this.prop].getHexString()}`;

    }
    set value(hexString) {

      this.object[this.prop].set(hexString);
    }

  }

  //lights
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.AmbientLight(color, intensity);
  scene.add(light);
  const directionlight = new THREE.DirectionalLight(color, intensity);
  directionlight.position.set(0, 10, 0);
  directionlight.target.position.set(-5, 0, 0);
  scene.add(directionlight);
  scene.add(directionlight.target);
  const pointlight = new THREE.PointLight(color, 50);
  scene.add(pointlight)
  const pointhelper = new THREE.PointLightHelper(pointlight);
  scene.add(pointhelper);
  const directionhelper = new THREE.DirectionalLightHelper(directionlight);
  scene.add(directionhelper);
  const gui = new GUI();
  gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
  gui.add(directionlight, 'intensity', 0, 5, 0.01);
  gui.add(directionlight.target.position, 'x', -10, 10);
  gui.add(directionlight.target.position, 'z', -10, 10);
  gui.add(directionlight.target.position, 'y', 0, 10);
  gui.add(pointlight, 'intensity', 0, 150, 1)
  renderer.setSize(window.innerWidth, window.innerHeight);


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
}


main();