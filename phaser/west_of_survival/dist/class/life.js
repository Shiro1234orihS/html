export default class Life extends Phaser.GameObjects.Graphics {
    constructor(scene, x, y,taille_H , taille_D ,couleur = 0xFF0000) {
        super(scene);

        // Enregistrez la scène pour y accéder dans d'autres méthodes
        this.scene = scene;

        // Ajoutez cet objet graphique à la scène
        this.scene.add.existing(this);

        // Définissez la couleur de la barre de vie
        this.couleur = couleur;

        // Initialiser la barre de vie
        this.initLifeBar(x, y,taille_H , taille_D);
    }

    initLifeBar(x, y,taille_H , taille_D) {
        // Définit la position initiale
        this.x = x;
        this.y = y;

        // Utilisez les méthodes de Graphics pour dessiner la barre de vie
        this.fillStyle(this.couleur, 1);
        this.fillRect(x, y, taille_H , taille_D); // Position et dimensions de la barre de vie
        this.lineStyle(2, 0x000000); // Contour de la barre
        this.strokeRect(x, y, taille_H , taille_D); // Position et dimensions du contour
        
        // Ajustement pour que la barre de vie ne bouge pas avec le scrolling de la caméra
        this.setScrollFactor(0);
    }

    // Vous pouvez ajouter d'autres méthodes ici pour manipuler la barre de vie (par exemple, la réduire lors des dégâts)
}