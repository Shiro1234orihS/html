import  Joueur  from '../class/joueur.js';
import  Castus  from '../class/cactus.js';

class Game extends Phaser.Scene {
    constructor() {
    super('Game');
    }
    preload() {
        
        this.load.image('atlas', 'dist/assets/map/atlas.png');


        this.load.tilemapTiledJSON('map', 'dist/assets/map/main_map_2.json');   

        this.load.spritesheet('texture_jouer','dist/assets/img/sprite.png', {frameWidth: 48, frameHeight: 44})
       
        
    }
    
    create() {
        var joueur;
        var castus;

        this.physics.world.setBounds(0, 0, 1000, 1000); // Configurez les limites du monde physique
        var map = this.make.tilemap({ key: 'map' });
        var tileset1 = map.addTilesetImage('atlas'); 
       
       
        const coucheFond1 = map.createLayer('sol', tileset1, 0, 0);
        const coucheFond2 = map.createLayer('decosanshitbox', tileset1, 0, 0);
        const coucheFond3 = map.createLayer('deco deriere maison', tileset1, 0, 0);
        const coucheFond4 = map.createLayer('Maison', tileset1, 0, 0);
        const coucheFond5 = map.createLayer('Deco devant maison', tileset1, 0, 0);
        const coucheFond6 = map.createLayer('deco sur', tileset1, 0, 0);

        coucheFond4.setCollisionBetween(1,10000);// collion avec les tuiles 1 à 25 : ground_1x1
       
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        
        // Configurer la caméra
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setZoom(1.5); // Réglez le zoom si nécessaire


        this.joueur = new Joueur(this, 1000, 1000, 'texture_jouer', 16);

        this.add.existing(this.joueur);
        this.joueur.creationAnime(); // Appeler la méthode test ici

        this.physics.add.sprite(this.joueur);
       // this.joueur.setCollideWorldBounds(true); // Empêche le joueur de sortir des limites du monde

        this.physics.add.collider(this.joueur, coucheFond4);
        
        this.physics.add.existing(this.joueur);
        this.joueur.body.setGravityY(0);
      
        this.joueur.body.setSize(16, 30);
        
        
        this.cameras.main.startFollow(this.joueur);
        
        //this.physics.add.collider(this.joueur, coucheFond4);




        const debugGraphics = this.add.graphics().setAlpha(0.75);
        coucheFond4.renderDebug(debugGraphics, {
            tileColor: null, // Couleur des tuiles non-collidables, mettez null pour ne pas les afficher
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Couleur des tuiles collidables, RGBA
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Couleur des lignes de contour des tuiles collidables   
        });




        this.castus = new Castus(this, 1000, 1000, 'texture_jouer', 16);
        let graphics = this.add.graphics({ lineStyle: { width: 1, color: 0xffffff }, fillStyle: { color: 0xffff00 } });
        this.castus.creategrille(graphics);
        
    }

    update(time, delta ) {

        this.joueur.deplacer(this.input.keyboard.createCursorKeys(),delta);
       
       

    }
} 
export default Game;