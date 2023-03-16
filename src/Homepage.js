import React, { useState } from "react";
import * as THREE from "three";
import Designer from "./pages/Designer";
import Developer from "./pages/Developer";
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

    // Set up orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);

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
      <div id="canvas-container"></div>
      <div className="divider" onMouseLeave={onDividerLeave}>
        <div
          className={`divider-text ${isDesignerHovered ? "designer-hovered" : ""}`}
          onMouseEnter={onDesignerHover}
        >
          Designer
        </div>
        <div
          className={`divider-text ${
            isDeveloperHovered ? "developer-hovered" : ""
          }`}
          onMouseEnter={onDeveloperHover}
        >
          Developer
        </div>
      </div>
    </div>
  );
};

export default HomePage;
