import Menu from "./scenes/menu.js";
import Game from "./scenes/game.js";
import  Joueur  from "./class/joueur.js";

window.config = {
            width: 800,
            height: 600,
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            type: Phaser.AUTO,
            scene: [Menu ,Game], 
            backgroundColor: '#2d2d2d',
            physics: {
            default: 'arcade',
            arcade: {
            gravity: {y: 0},
            debug: true
        }
    },
};
const game = new Phaser.Game(window.config);

