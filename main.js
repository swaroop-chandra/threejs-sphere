import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "gsap";

//Scene
const scene = new THREE.Scene();

//Geometry
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#00ff88",
  roughness: 0.2,
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

//Sizes
const sizes = {
  width: window.innerWidth,
  heigth: window.innerHeight,
};

//light
const lightEffect = new THREE.PointLight(0xffffff, 1, 100);
lightEffect.position.set(10, 10, 10);
lightEffect.intensity = 1.25;
scene.add(lightEffect);

//Camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.heigth,
  0.1,
  100
);
camera.position.z = 20;
scene.add(camera);

//renderer

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.heigth);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

//Resize
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.heigth = window.innerHeight;

  camera.aspect = sizes.width / sizes.heigth;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.heigth);
});

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 10;

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

//Timeline
const tl = gsap.timeline({ defaults: { duration: 1 } });

tl.fromTo(sphere.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
tl.fromTo("nav", { y: "-100%" }, { y: 0 });

//Mouse animation
let mouseDown = false;
let rgb = [];
window.addEventListener("mousedown", (e) => {
  mouseDown = true;
});
window.addEventListener("mouseup", (e) => {
  mouseDown = false;
});

window.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.heigth) * 255),
      150,
    ];
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
    gsap.to(sphere.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    });
  }
});
