import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Création de la scène principale
const scene = new THREE.Scene();

// Configuration de la caméra
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5; // Position rapprochée de la caméra

// Variables globales pour l'objet chargé et les contrôles
let object;
let controls;
let objToRender = 'models';
let mouseX = 0, mouseY = 0; // Variables pour stocker la position de la souris

// Chargement du modèle GLTF
const loader = new GLTFLoader();
loader.load(
    './../../ressource/projet/item5/models/scene.gltf',
    function (gltf) {
        object = gltf.scene;
        scene.add(object); // Ajout de l'objet à la scène
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded'); // Affichage du pourcentage de chargement
    },
    function (error) {
        console.error(error); // Affichage des erreurs de chargement
    }
);

// Configuration du renderer
const container = document.getElementById("container3D");
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight); // Utilise la taille du conteneur
console.log(container.clientWidth, container.clientHeight)
container.appendChild(renderer.domElement);

// Ajout de lumières à la scène
const ambientLight = new THREE.AmbientLight(0x333333, 1);
scene.add(ambientLight);

const lights = [];
const lightPositions = [
    [500, 500, 500],
    [-500, -500, 500],
    [-500, 500, -500],
    [500, -500, -500]
];

lightPositions.forEach(pos => {
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(...pos);
    lights.push(light);
    scene.add(light);
});

// Configuration des contrôles de la caméra
controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Activer le lissage des mouvements
controls.dampingFactor = 0.25; // Facteur de lissage
controls.enableZoom = true; // Activer le zoom

// Fonction d'animation
function animate() {
    requestAnimationFrame(animate);

    // Mettre à jour les contrôles à chaque frame
    controls.update();
    
    // Rendu de la scène
    renderer.render(scene, camera);
}

// Ajouter un écouteur d'événement pour redimensionner la fenêtre
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Ajouter un écouteur d'événement pour capturer la position de la souris
document.onmousemove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
}

// Lancer l'animation
animate();
