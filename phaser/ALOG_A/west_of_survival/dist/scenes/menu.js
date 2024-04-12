class Menu extends Phaser.Scene {
    constructor() {
    super('Menu');
    }
    preload() {
    }
    create() {
        this.clickButton = this.add.text(100, 100, 'Start Game', { fill: '#0f0' }).setInteractive().on('pointerdown', () => {
            this.scene.start('Game');
        }
    );
    }
    
    update(time, delta) {
    }
    }
    export default Menu;