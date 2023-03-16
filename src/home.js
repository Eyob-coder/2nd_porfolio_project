import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Create the scene
const scene = new THREE.Scene();

// Create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor('#000000');
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the pyramids
const pyramidCount = 200;
const pyramidGeometry = new THREE.CylinderGeometry(0, 1, 2, 4, 1);
const pyramidMaterial = new THREE.MeshBasicMaterial({ color: '#ffffff', wireframe: true });
const pyramids = [];

for (let i = 0; i < pyramidCount; i++) {
  const pyramid = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
  pyramid.position.set(
    Math.random() * 40 - 20,
    Math.random() * 40 - 20,
    Math.random() * 40 - 20
  );
  pyramid.rotation.set(
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    Math.random() * Math.PI
  );
  pyramids.push(pyramid);
  scene.add(pyramid);
}

// Create the animation loop
function animate() {
  requestAnimationFrame(animate);

  pyramids.forEach((pyramid) => {
    pyramid.position.y -= 0.05;
    if (pyramid.position.y < -20) {
      pyramid.position.y = 20;
    }
  });

  renderer.render(scene, camera);
}

animate();
