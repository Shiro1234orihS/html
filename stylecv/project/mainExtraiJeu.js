const spriteData = {
    "repos_droite": { "frames": [1, 2, 3, 4, 5], "isLooping": true, "frameDuration": 200 },
    "deplacement_droite": { "frames": [6, 7, 8, 9, 10, 11, 12, 13, 14], "isLooping": true, "frameDuration": 200 },
    "tir_droite": { "frames": [15, 16, 17, 18, 19], "isLooping": true, "frameDuration": 200 },
    "repos_gauche": { "frames": [20, 21, 22, 23, 24], "isLooping": true, "frameDuration": 200 },
    "deplacement_gauche": { "frames": [25, 26, 27, 28, 29, 30, 31, 32, 33], "isLooping": true, "frameDuration": 200 },
    "tir_gauche": { "frames": [34, 35,36, 37, 38,39], "isLooping": true, "frameDuration": 200 },
    "repos": { "frames": [40, 41,42, 43, 44], "isLooping": true, "frameDuration": 200 },
    "morts": { "frames": [58, 59, 60, 61, 62, 63, 64, 65, 66,67,68,69,70,71], "isLooping": true, "frameDuration": 200 }
};

let currentAnimation = null;
let currentFrameIndex = 0;
let animationInterval = null;
let positionX = 50; // Position initiale du cow-boy en pourcentage
let movingDirection = 'left'; // Direction initiale

function startAnimation(animationName) {
    if (currentAnimation !== animationName) {
        clearInterval(animationInterval);
        currentAnimation = animationName;
        currentFrameIndex = 0;
        playAnimation();
    }
}

function playAnimation() {
    const animation = spriteData[currentAnimation];
    const spriteElement = document.getElementById('cowboy');

    const frameWidth = 48;  // Largeur d'une frame
    const frameHeight = 44; // Hauteur d'une frame
    const framesPerRow = 8; // Nombre de frames par ligne dans la spritesheet

    animationInterval = setInterval(() => {
        const frameNumber = animation.frames[currentFrameIndex] - 1; // Convertir en indice de base 0
        const frameX = (frameNumber % framesPerRow) * frameWidth;  // Position X de la frame
        const frameY = Math.floor(frameNumber / framesPerRow) * frameHeight; // Position Y de la frame

        spriteElement.style.backgroundPosition = `-${frameX}px -${frameY}px`;

        currentFrameIndex++;
        if (currentFrameIndex >= animation.frames.length) {
            if (animation.isLooping) {
                currentFrameIndex = 0;
            } else {
                clearInterval(animationInterval);
            }
        }
    }, animation.frameDuration);
}
// Fonction pour déplacer le personnage automatiquement
function autoMoveCharacter() {
    const spriteContainer = document.querySelector('.sprite-container');
    if (movingDirection === 'left') {
        positionX -= 0.2; // Ajuster la vitesse de déplacement vers la gauche
        if (positionX <= 10) { // Limite à gauche
            movingDirection = 'right';
            startAnimation('deplacement_droite');
        }
    } else if (movingDirection === 'right') {
        positionX += 0.2; // Ajuster la vitesse de déplacement vers la droite
        if (positionX >= 90) { // Limite à droite
            movingDirection = 'left';
            startAnimation('deplacement_gauche');
        }
    }
    spriteContainer.style.left = positionX + '%';
    requestAnimationFrame(autoMoveCharacter);
}

// Démarrer le mouvement automatique
startAnimation('repos');
autoMoveCharacter();

