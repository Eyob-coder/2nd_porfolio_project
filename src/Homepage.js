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
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Set the position of the camera
camera.position.x = 5;
camera.position.y = 5;
camera.position.z = 5;

// Point the camera towards the center of the scene
camera.lookAt(new THREE.Vector3(0, 0, 0));


  // const camera = new THREE.PerspectiveCamera(
  //   75,
  //   window.innerWidth / window.innerHeight,
  //   0.1,
  //   1000
  // );
  // camera.position.z = 5;




  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

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
  canvas.style.height = "70vh";
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


      // Add cards
const loader = new THREE.TextureLoader();
const cardSizes = [
{ width: 3, height: 2.5, depth: 0.1 },
{ width: 2.5, height: 2, depth: 0.1 },
{ width: 3, height: 2, depth: 0.1 },
{ width: 3.5, height: 2.5, depth: 0.1 },
{ width: 2.5, height: 3.5, depth: 0.1 },
];

const textures = [
{
url: "./images/typography.png",
text: "Card 1",
},
{
url: "./images/meta-fun.png",
text: "Card 2",
},
{
url: "./images/advanced html-css.png",
text: "Card 3",
},
{
url: "./images/javascript.png",
text: "Card 4",
},
{
url: "./images/version",
text: "Card 5",
},
];

const cards = [];

for (let i = 0; i < cardSizes.length; i++) {
const geometry = new THREE.BoxGeometry(
cardSizes[i].width,
cardSizes[i].height,
cardSizes[i].depth
);
const texture = loader.load(textures[i].url);
const material = new THREE.MeshBasicMaterial({ map: texture });
const card = new THREE.Mesh(geometry, material);
// Position cards randomly around the pyramids
card.position.x = Math.random() * 4 - 2;
card.position.y = Math.random() * 4 - 2;
card.position.z = Math.random() * 4 - 2;
// Rotate cards away from the center of the scene
card.rotation.x = Math.random() * Math.PI - Math.PI / 2;
card.rotation.y = Math.random() * Math.PI - Math.PI / 2;
card.rotation.z = Math.random() * Math.PI - Math.PI / 2;
// Add click interaction to select cards
card.onClick = () => {
enlargeCard(card);
};
cards.push(card);
scene.add(card);
}

// Enlarge selected card
let selectedCard = null;
let selectedCardScaleMultiplier = 0;
const enlargeCard = (selectedObject) => {
// Shrink previously selected card
if (selectedCard !== null) {
selectedCardScaleMultiplier = 0;
}
// Enlarge selected card
selectedCard = selectedObject;
selectedCardScaleMultiplier = 0.75;
selectedCard.scale.multiplyScalar(selectedCardScaleMultiplier);
};



    // Animate pyramids
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);

      const dividerDesigner = document.querySelector(".divider-designer");
      const dividerDeveloper = document.querySelector(".divider-developer");

      if (isDesignerHovered) {
        dividerDesigner.classList.add("hovered");
        dividerDeveloper.classList.remove("hovered");
      } else if (isDeveloperHovered) {
        dividerDesigner.classList.remove("hovered");
        dividerDeveloper.classList.add("hovered");
      } else {
        dividerDesigner.classList.remove("hovered");
        dividerDeveloper.classList.remove("hovered");
      }
    };

    animate();



//     const init = () => {
//   // Create a new scene
//   const scene = new THREE.Scene();

//   // Set up camera
//   const camera = new THREE.PerspectiveCamera(
//     75,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
//   );
//   camera.position.z = 5;

//   // Set up renderer
//   const renderer = new THREE.WebGLRenderer({ antialias: true });
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   renderer.setPixelRatio(window.devicePixelRatio);
//   renderer.setClearColor(0x000000);

//   // Add canvas to DOM
//   const canvasContainer = document.getElementById("canvas-container");
//   canvasContainer.appendChild(renderer.domElement);

//   // Resize canvas to fit 100vh
//   const canvas = renderer.domElement;
//   canvas.style.height = "70vh";
//   canvas.style.width = "100vw";
//   renderer.setSize(canvas.clientWidth, canvas.clientHeight);

//   // Set up orbit controls
//   const controls = new OrbitControls(camera, renderer.domElement);
//   controls.enableDamping = true; // Add damping for smoother mouse movement
//   controls.dampingFactor = 0.1;
//   controls.rotateSpeed = 0.5; // Adjust rotation speed
//   controls.zoomSpeed = 1; // Adjust zoom speed

//   // Add pyramids
//   const geometry = new THREE.ConeGeometry(0.25, 1, 4);
//   const material = new THREE.MeshBasicMaterial({
//     color: 0xffffff,
//     wireframe: true,
//   });

//   const pyramidGroup = new THREE.Group();
//   for (let i = 0; i < 1000; i++) {
//     const mesh = new THREE.Mesh(geometry, material);
//     mesh.position.x = Math.random() * 10 - 5;
//     mesh.position.y = Math.random() * 10 - 5;
//     mesh.position.z = Math.random() * 10 - 5;
//     mesh.rotation.x = Math.random() * 2 * Math.PI;
//     mesh.rotation.y = Math.random() * 2 * Math.PI;
//     mesh.rotation.z = Math.random() * 2 * Math.PI;
//     // pyramidGroup.add(mesh);
//   }
//   scene.add(mesh);

//   // Add cards
// const loader = new THREE.TextureLoader();
// const cardSizes = [
// { width: 1, height: 1.5, depth: 0.1 },
// { width: 1.5, height: 1, depth: 0.1 },
// { width: 1, height: 1, depth: 0.1 },
// { width: 0.5, height: 0.5, depth: 0.1 },
// { width: 0.5, height: 0.5, depth: 0.1 },
// ];
// const textures = [
// {
// url: "https://threejsfundamentals.org/threejs/resources/images/playing-card-back.jpg",
// text: "Card 1",
// },
// {
// url: "https://threejsfundamentals.org/threejs/resources/images/playing-card-back.jpg",
// text: "Card 2",
// },
// {
// url: "https://threejsfundamentals.org/threejs/resources/images/playing-card-back.jpg",
// text: "Card 3",
// },
// {
// url: "https://threejsfundamentals.org/threejs/resources/images/playing-card-back.jpg",
// text: "Card 4",
// },
// {
// url: "https://threejsfundamentals.org/threejs/resources/images/playing-card-back.jpg",
// text: "Card 5",
// },
// ];

// const cards = [];

// for (let i = 0; i < cardSizes.length; i++) {
// const geometry = new THREE.BoxGeometry(
// cardSizes[i].width,
// cardSizes[i].height,
// cardSizes[i].depth
// );
// const texture = loader.load(textures[i].url);
// const material = new THREE.MeshBasicMaterial({ map: texture });
// const card = new THREE.Mesh(geometry, material);
// // Position cards randomly around the pyramids
// card.position.x = Math.random() * 4 - 2;
// card.position.y = Math.random() * 4 - 2;
// card.position.z = Math.random() * 4 - 2;
// // Rotate cards away from the center of the scene
// card.rotation.x = Math.random() * Math.PI - Math.PI / 2;
// card.rotation.y = Math.random() * Math.PI - Math.PI / 2;
// card.rotation.z = Math.random() * Math.PI - Math.PI / 2;
// // Add click interaction to select cards
// card.onClick = () => {
// enlargeCard(card);
// };
// cards.push(card);
// scene.add(card);
// }

// // Enlarge selected card
// let selectedCard = null;
// let selectedCardScaleMultiplier = 0;
// const enlargeCard = (selectedObject) => {
// // Shrink previously selected card
// if (selectedCard !== null) {
// selectedCardScaleMultiplier = 0;
// }
// // Enlarge selected card
// selectedCard = selectedObject;
// selectedCardScaleMultiplier = 0.75;
// selectedCard.scale.multiplyScalar(selectedCardScaleMultiplier);
// };

// // Animate pyramids and cards
// const animate = () => {
// requestAnimationFrame(animate);
// controls.update();
// renderer.render(scene, camera);

// // Animate cards
// for (let i = 0; i < cards.length; i++) {
// const card = cards[i];
// card.mesh.rotation.y += 0.01; // rotate the card around its Y axis
// }
// };

// animate();



  
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