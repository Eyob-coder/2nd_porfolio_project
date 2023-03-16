import React, { useState } from "react";
import * as THREE from "three";
// import Designer from "./pages/Designer";
// import Developer from "./pages/Developer";
import CanvasContainer from "./components/CanvasContainer";
import Divider from "./components/Divider"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./HomePage.css";

const HomePage = () => {
  const [isDesignerHovered, setIsDesignerHovered] = useState(false);
  const [isDeveloperHovered, setIsDeveloperHovered] = useState(false);

  const onDesignerHover = () => {
    setIsDesignerHovered(true);
    setIsDeveloperHovered(false);
  };

  const onDeveloperHover = () => {
    setIsDesignerHovered(false);
    setIsDeveloperHovered(true);
  };

  const onDividerLeave = () => {
    setIsDesignerHovered(false);
    setIsDeveloperHovered(false);
  };

  const init = () => {
  // Create a new scene
  const scene = new THREE.Scene();

  // Set up camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Set up renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000);

  // Add canvas to DOM
  const canvasContainer = document.getElementById("canvas-container");
  canvasContainer.appendChild(renderer.domElement);
  
  // Resize canvas to fit 100vh
  const canvas = renderer.domElement;
  canvas.style.height = "50vh";
  canvas.style.width = "100vw";
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);


  // Set up orbit controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // Add damping for smoother mouse movement
  controls.dampingFactor = 0.1;
  controls.rotateSpeed = 0.5; // Adjust rotation speed
  controls.zoomSpeed = 1; // Adjust zoom speed

  // Add pyramids
  const geometry = new THREE.ConeGeometry(0.25, 1, 4);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
  });

  for (let i = 0; i < 1000; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.random() * 10 - 5;
    mesh.position.y = Math.random() * 10 - 5;
    mesh.position.z = Math.random() * 10 - 5;
    mesh.rotation.x = Math.random() * 2 * Math.PI;
    mesh.rotation.y = Math.random() * 2 * Math.PI;
    mesh.rotation.z = Math.random() * 2 * Math.PI;
    scene.add(mesh);
  }

  // Add mouse movement interaction
  const onMouseMove = (event) => {
    const mouseX = event.clientX / window.innerWidth - 0.5;
    const mouseY = event.clientY / window.innerHeight - 0.5;
    camera.position.x = mouseX * 10;
    camera.position.y = -mouseY * 10;
    camera.lookAt(scene.position);
  };
  document.addEventListener("mousemove", onMouseMove, false);

  // Add mouse wheel zoom interaction
  const onMouseWheel = (event) => {
    const zoomSpeed = 0.2;
    camera.position.z += event.deltaY * zoomSpeed;
  };
  document.addEventListener("wheel", onMouseWheel, false);


    // Animate pyramids
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();
  };

  // Initialize three.js scene on component mount
  React.useEffect(() => {
    init();
  }, []);

  return (
    <div className="home-container">
	  <CanvasContainer />
      <Divider
        onDividerLeave={onDividerLeave}
        onDesignerHover={onDesignerHover}
        onDeveloperHover={onDeveloperHover}
        isDesignerHovered={isDesignerHovered}
        isDeveloperHovered={isDeveloperHovered}
      />
    </div>
  );
};

export default HomePage;
