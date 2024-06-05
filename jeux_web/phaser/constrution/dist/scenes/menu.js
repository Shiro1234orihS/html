class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    preload() {
        // Charger l'image de fond et l'image pour le bouton
        this.load.image('background', 'dist/assets/img_menu/fond_menu.webp'); // Remplace avec le chemin correct
        this.load.image('button', 'dist/assets/img_menu/bouton_stard.png'); // Remplace avec le chemin correct
    }

    create() {
        // Ajouter l'image de fond
        let bg = this.add.image(0, 0, 'background').setOrigin(0, 0);
        bg.displayWidth = this.sys.canvas.width;
        bg.displayHeight = this.sys.canvas.height;

        // Création et mise à l'échelle du bouton de démarrage avec une image
        let buttonImage = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'button')
            .setInteractive()
            .setScale(0.5); // Ajuste cette valeur pour changer la taille du bouton

        // Aligner le bouton au centre de la scène
        // Pas besoin de conteneur si tu n'utilises pas de texte séparé sur le bouton
        buttonImage.setOrigin(0.5, 0.5); // Centrer le bouton

        // Actions du bouton
        buttonImage.on('pointerdown', () => this.startGame())
                   .on('pointerover', () => buttonImage.setTint(0xffcc00)) // Changement de teinte au survol
                   .on('pointerout', () => buttonImage.clearTint()); // Retour à la teinte normale
    }

    startGame() {
        // Logique pour démarrer le jeu
        this.scene.start('Game');
    }

    // ... Les autres méthodes restent les mêmes
}

export default Menu;
