import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

function main() {

  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  var audioLoader = new THREE.AudioLoader();
  var listener = new THREE.AudioListener();
  var audio = new THREE.Audio(listener);
  audioLoader.load('race2.mp3', function(buffer) {
      audio.setBuffer(buffer);
  });
  var start = false;
  document.getElementById('startButton').onclick = function() {start = true, audio.play()}
  document.getElementById('resetButton').onclick = function() {start = false, b1.position.x = 800, b2.position.x = 800, b3.position.x = 800, b4.position.x = 800, b5.position.x = 800, b6.position.x = 800, camera.position.x = 800}
  const fov = 45;
  const aspect = 2;
  const near = 0.1;
  const far = 2000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(800, 50, 450);
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(800, 5, 0);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('black');


  var b1, b2, b3, b4, b5, b6;
  const objLoader = new OBJLoader();
  const mtlLoader = new MTLLoader();
  mtlLoader.load('Canoe.mtl', (mtl) => {
    mtl.preload();
    objLoader.setMaterials(mtl);
  })
  objLoader.load('Canoe.obj', (boat1) => {
    boat1.scale.set(0.2, 0.1,0.1)
    boat1.position.z = 20;
    boat1.position.x = 800;
    b1 = boat1;
    scene.add(b1);
    var boat2 = boat1.clone()
    boat2.position.z = 60;
    b2 = boat2;
    scene.add(b2)
    var boat3 = boat1.clone()
    boat3.position.z = 100;
    b3 = boat3;
    scene.add(b3)
    var boat4 = boat1.clone()
    boat4.position.z = -20;
    b4 = boat4;
    scene.add(b4)
    var boat5 = boat1.clone()
    boat5.position.z = -60;
    b5 = boat5;
    scene.add(b5)
    var boat6 = boat1.clone()
    boat6.position.z = -100;
    b6 = boat6;
    scene.add(b6)
  });

  mtlLoader.load('flag.mtl', (mtl)=> {
    mtl.preload();
    objLoader.setMaterials(mtl);
  })

  objLoader.load('flag.obj', (flag1) => {
    flag1.scale.set(20,20,20)
    flag1.rotation.set(0,2,0)
    flag1.position.x = 750
    scene.add(flag1)
    var flag2 = flag1.clone()
    flag2.position.z = 40
    scene.add(flag2)
    var flag3 = flag1.clone()
    flag3.position.z = 80
    scene.add(flag3)
    var flag4 = flag1.clone()
    flag4.position.z = -40
    scene.add(flag4)
    var flag5 = flag1.clone()
    flag5.position.z = -80
    scene.add(flag5)
    var flag6 = flag1.clone()
    flag6.position.x = -750
    scene.add(flag6)
    var flag7 = flag6.clone()
    flag7.position.z = 40
    scene.add(flag7)
    var flag8 = flag6.clone()
    flag8.position.z = 80
    scene.add(flag8)
    var flag9 = flag6.clone()
    flag9.position.z = -40
    scene.add(flag9)
    var flag10 = flag6.clone()
    flag10.position.z = -80
    scene.add(flag10)
  })
  const planeSize = 1000;
  const loader = new THREE.TextureLoader();
  const texture1 = loader.load('f.png');
  texture1.wrapS = THREE.RepeatWrapping;
  texture1.wrapT = THREE.RepeatWrapping;
  texture1.magFilter = THREE.NearestFilter;
  texture1.colorSpace = THREE.SRGBColorSpace;
  const repeats = planeSize / 2;
  texture1.repeat.set(repeats, repeats);

  const planeGeo = new THREE.PlaneGeometry(planeSize*2, planeSize*0.8,128,128);
  const planeMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: {
        type: "f",
        value: 0.0
      }
    },
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
    side: THREE.DoubleSide
  });
  const planemesh = new THREE.Mesh(planeGeo, planeMat);
  planemesh.rotation.x = Math.PI * - .5;
  planemesh.position.y = -2
  scene.add(planemesh);

  const texture2 = loader.load("brick.png")
  texture2.colorSpace = THREE.SRGBColorSpace
  const cubeSize = 40;
  const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
  const skycubeloader = new THREE.CubeTextureLoader;
  const skycubetexture = skycubeloader.load(["db.jpg","db.jpg","db.jpg","db.jpg","db.jpg","db.jpg",])
  scene.background = skycubetexture
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

  for(var i=1020; i>=-1020; i=i-40) {
    makeCubeInstance(cubeGeo, i, 420)
    makeCubeInstance(cubeGeo, i, -420)
  }
  for(var i=420; i>=-420; i=i-40) {
    makeCubeInstance(cubeGeo, 1020, i)
    makeCubeInstance(cubeGeo, -1020, i)
  }
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
 // makeCylinderInstance(cylindergeometry, 0x1844aa, -2, 4)
  
  const sphereRadius = 3;
  const sphereWidthDivisions = 32;
  const sphereHeightDivisions = 16;
  const sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
  const sphereMat = new THREE.MeshPhongMaterial({ color: '#CA8' });
  const spheremesh = new THREE.Mesh(sphereGeo, sphereMat);
  spheremesh.position.set(- sphereRadius - 1, sphereRadius + 2, 0);
  //scene.add(spheremesh);

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
  const directionlight = new THREE.DirectionalLight(color, intensity*4);
  directionlight.position.set(1000, 300, 0);
  directionlight.target.position.set(0, 0, 0);
  scene.add(directionlight);
  scene.add(directionlight.target);
  /*const pointlight = new THREE.PointLight(color, 50);
  scene.add(pointlight)
  const pointhelper = new THREE.PointLightHelper(pointlight);
  scene.add(pointhelper);*/
  const directionhelper = new THREE.DirectionalLightHelper(directionlight);
  scene.add(directionhelper);
  const gui = new GUI();
  gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
  gui.add(directionlight, 'intensity', 0, 5, 0.01);
  //gui.add(directionlight.target.position, 'x', -10, 10);
  //gui.add(directionlight.target.position, 'z', -10, 10);
  //gui.add(directionlight.target.position, 'y', 0, 10);
  //gui.add(pointlight, 'intensity', 0, 150, 1)
  renderer.setSize(window.innerWidth, window.innerHeight);

  function render(time) {
    time *= 0.001;  // convert time to seconds
    if(b1) {
      if (b1.position.x <= -850 && b2.position <= -850 && b3.position <= -850 && b4.position <= -850 && b5.position <= -850 && b6.position <= -850) {
        b1.position.x = -850
        b2.position.x = -850
        b3.position.x = -850
        b4.position.x = -850
        b5.position.x = -850
        b6.position.x = -850
      }
      else {
        if(start == true) {
          if(camera.position.x <= -850) {
            camera.position.x = -850
          }
          else {
            camera.position.x -= 4
          }
          if(b1.position.x > 750){
            b1.position.x -= 2
          }
          else if(b1.position.x <=750 &&  b1.position.x > 700) {
            b1.position.x -= 4
          }
          else if(b1.position.x <=700 && b1.position.x > 600) {
            b1.position.x -= 6
          }
          else if(b1.position.x <=600 && b1.position.x > -400) {
            b1.position.x -= 4
          }
          else if(b1.position.x <=400 && b1.position.x > -800) {
            b1.position.x -= 5.75
          }
          else if (b1.position.x <=800 && b1.position.x > -850) {
            b1.position.x -= 2
          }
          if(b2.position.x > 750){
            b2.position.x -= 2
          }
          else if(b2.position.x <=750 &&  b2.position.x > 700) {
            b2.position.x -= 4
          }
          else if(b2.position.x <=700 && b2.position.x > 600) {
            b2.position.x -= 5
          }
          else if(b2.position.x <=600 && b2.position.x > -400) {
            b2.position.x -= 3.9
          }
          else if(b2.position.x <=400 && b2.position.x > -800) {
            b2.position.x -= 7
          }
          else if (b2.position.x <=800 && b2.position.x > -850) {
            b2.position.x -= 2
          }
          if(b3.position.x > 750){
            b3.position.x -= 1.5
          }
          else if(b3.position.x <=750 &&  b3.position.x > 700) {
            b3.position.x -= 3
          }
          else if(b3.position.x <=700 && b3.position.x > 600) {
            b3.position.x -= 3.5
          }
          else if(b3.position.x <=600 && b3.position.x > -400) {
            b3.position.x -= 4
          }
          else if(b3.position.x <=400 && b3.position.x > -800) {
            b3.position.x -= 7
          }
          else if (b3.position.x <=800 && b3.position.x > -850) {
            b3.position.x -= 2
          }
          if(b4.position.x > 750){
            b4.position.x -= 1.5
          }
          else if(b4.position.x <=750 &&  b4.position.x > 700) {
            b4.position.x -= 4
          }
          else if(b4.position.x <=700 && b4.position.x > 600) {
            b4.position.x -= 4
          }
          else if(b4.position.x <=600 && b4.position.x > -400) {
            b4.position.x -= 4
          }
          else if(b4.position.x <=400 && b4.position.x > -800) {
            b4.position.x -= 5
          }
          else if (b4.position.x <=800 && b4.position.x > -850) {
            b4.position.x -= 2
          }
          if(b5.position.x > 750){
            b5.position.x -= 1.5
          }
          else if(b5.position.x <=750 &&  b5.position.x > 700) {
            b5.position.x -= 3
          }
          else if(b5.position.x <=700 && b5.position.x > 600) {
            b5.position.x -= 3.5
          }
          else if(b5.position.x <=600 && b5.position.x > -400) {
            b5.position.x -= 4
          }
          else if(b5.position.x <=400 && b5.position.x > -800) {
            b5.position.x -= 6
          }
          else if (b5.position.x <=800 && b5.position.x > -850) {
            b5.position.x -= 2
          }
          if(b6.position.x > 750){
            b6.position.x -= 1
          }
          else if(b6.position.x <=750 &&  b6.position.x > 700) {
            b6.position.x -= 4
          }
          else if(b6.position.x <=700 && b6.position.x > 600) {
            b6.position.x -= 6
          }
          else if(b6.position.x <=600 && b6.position.x > -300) {
            b6.position.x -= 3.5
          }
          else if(b6.position.x <=300 && b6.position.x > -800) {
            b6.position.x -= 8
          }
          else if (b6.position.x <=800 && b6.position.x > -850) {
            b6.position.x -= 2
          }
        }
      }
    }
    
    planeMat.uniforms[ 'uTime' ].value = time*2.5;
    /*cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });*/
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}


main();