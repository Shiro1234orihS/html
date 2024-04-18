import  Joueur  from '../class/joueur.js';
import  Castus  from '../class/cactus.js';
import  Life  from '../class/life.js';
import  TextDisplay  from '../class/textDisplay.js';
import  Coyote  from '../class/coyote.js';
import  Balle  from '../class/balle.js';

class Game extends Phaser.Scene {
    constructor() {
    super('Game');
    }
    preload() {
        
        this.load.image('atlas', 'dist/assets/map/atlas.png');


        this.load.tilemapTiledJSON('map', 'dist/assets/map/main_map_2.json');   

        this.load.spritesheet('texture_jouer','dist/assets/img/sprite.png', {frameWidth: 48, frameHeight: 44})
        this.load.spritesheet('texture_cactus','dist/assets/img/CactusSheet.png', {frameWidth: 40, frameHeight: 40})
        this.load.spritesheet('texture_coyote','dist/assets/img/Coyote_Sheet.png', {frameWidth: 70, frameHeight: 70})
        this.load.spritesheet('texture_balle','dist/assets/img/balle.png', {frameWidth: 49, frameHeight: 50})
       
        
    }
    
    create() {
        
        this.nombre = 0;
        this.nombre2 = 0;
        this.scoree = 0;

        this.castusListe = [];
        this.coyoteListe = [];
        this.balleListe = [];
        
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

        //Création du joueur
        this.joueur = new Joueur(this, 1000, 1000, 'texture_jouer', 16);

        //Configuratuion du joueur
        this.add.existing(this.joueur);
        this.joueur.creationAnime(); // Appeler la méthode test ici
        this.physics.add.sprite(this.joueur);
        this.physics.add.collider(this.joueur, coucheFond4);
        this.physics.add.existing(this.joueur);
        this.joueur.body.setGravityY(0);
        this.joueur.body.setSize(16, 30);
        
        //Lancement de la caméra 
        this.cameras.main.startFollow(this.joueur);

        //Affiche les texture de collitions
        this.debug(coucheFond4);

        //Création de la bare de vie
        this.lifeBar = new Life(this, 70, 60, 150,15 , 0xFF0000);

        
    
        // Création du style de l'écriture
        const textStyle = {
            fontSize: '16px',
            fontFamily: 'Arial',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3,
            shadow: {
              offsetX: 2,
              offsetY: 2,
              color: '#333333',
              blur: 5,
              stroke: true,
              fill: true
            },
            resolution: 2 // Increase if text appears blurry on high-resolution screens
        };

        //Création des différentes action 
        this.barre_de_vie = new TextDisplay(this, 139, 97, 'Barre de vie : ', textStyle);        
        this.score = new TextDisplay(this,590, 97, 'Score : 0', textStyle);


        //Création des Cactus 
        this.creatationCactus(5 , coucheFond4 , this.joueur , this.lifeBar);
        //Création des Coyote 
        this.creatationCoyote(5 , coucheFond4);
    }

    update(time, delta ) {
        this.nombre = this.nombre +1
        this.nombre2 = this.nombre2 +1
        
        if( this.nombre == 60)
        {
            this.nombre = 0;
            this.scoree= this.scoree+1;
            
        }
         
        if( this.nombre2 >= 60 )
        {
            if(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q).isDown)
            {
                let balle = new Balle(this,this.joueur.x - 20 , this.joueur.y,'texture_balle','tir_gauche' , 2, 16);
                balle.creationAnime();
                this.physics.add.sprite(balle);
                this.physics.add.existing(balle);
                balle.body.setGravityY(0);
                balle.body.setSize(35, 30);
                this.balleListe.push(balle);
            }
            if(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown)
            {
                let balle = new Balle(this,this.joueur.x + 20 , this.joueur.y,'texture_balle','tir_gauche' , 1, 16);
                balle.creationAnime();
                this.physics.add.sprite(balle);
                this.physics.add.existing(balle);
                balle.body.setGravityY(0);
                balle.body.setSize(35, 30);
                this.balleListe.push(balle);
            }
            if(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z).isDown)
            {
                let balle = new Balle(this,this.joueur.x  , this.joueur.y- 20,'texture_balle','tir_gauche' , 4, 16);
                balle.creationAnime();
                this.physics.add.sprite(balle);
                this.physics.add.existing(balle);
                balle.body.setGravityY(0);
                balle.body.setSize(35, 30);
                this.balleListe.push(balle);
            }
            if(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown)
            {
                let balle = new Balle(this,this.joueur.x  , this.joueur.y- 20,'texture_balle','tir_gauche' , 3, 16);
                balle.creationAnime();
                this.physics.add.sprite(balle);
                this.physics.add.existing(balle);
                balle.body.setGravityY(0);
                balle.body.setSize(35, 30);
                this.balleListe.push(balle);
            }
            this.nombre2 = 0;

        }

        
        this.updatedeplacemen(this.balleListe,delta, this.joueur )

        this.joueur.deplacer(this.input.keyboard.createCursorKeys(),delta);

        this.updatedeplacement(this.castusListe,delta,  this.joueur )

        this.updatedeplacement(this.coyoteListe,delta,  this.joueur )
       
        this.score.setText('Score: ' +  this.scoree);
    }


    debug(coucheFond4){
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        coucheFond4.renderDebug(debugGraphics, {
            tileColor: null, // Couleur des tuiles non-collidables, mettez null pour ne pas les afficher
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Couleur des tuiles collidables, RGBA
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Couleur des lignes de contour des tuiles collidables   
        });
    }

    creatationCactus(nombre ,coucheFond4 , joueur , lifeBar ){

        for (let castus = 0; castus < nombre; castus++) {

            let minX = 600;
            let maxX = 1732;

            let minY = 600;
            let maxY = 1709;

            let y = Math.floor(Math.random() * (maxY - minY) + minY);
            let x = Math.floor(Math.random() * (maxX - minX) + minX);
          
            // Création des cactus
            let newCactus = new Castus(this, x, y, 'texture_cactus', 16);
            newCactus.creationAnime();
            this.physics.add.sprite(newCactus);
            this.physics.add.collider(newCactus, coucheFond4);
            this.physics.add.existing(newCactus);
            newCactus.body.setGravityY(0);
            newCactus.body.setSize(16, 30);
            
            // Ajoutez l'instance de Castus à la liste
            this.castusListe.push(newCactus);

            // Activer les collisions entre les personnages
            // this.physics.add.collider(this.joueur, newCactus, (joueur, cactus ,lifeBar ) => {
            //     lifeBar.decreaseLife(10); // Suppose que decreaseLife prend un paramètre 'amount'
            // }, null, this);
            
            
            
        }
    }

    creatationCoyote(nombre ,coucheFond4 ){

        for (let i = 0; i < nombre; i++) {

            let minX = 600;
            let maxX = 1732;

            let minY = 600;
            let maxY = 1709;

            let y = Math.floor(Math.random() * (maxY - minY) + minY);
            let x = Math.floor(Math.random() * (maxX - minX) + minX);
          
            // Création des cactus
            let newCoyote = new Coyote(this, x, y, 'texture_coyote', 16);
            newCoyote.creationAnime();
            this.physics.add.sprite(newCoyote);
            this.physics.add.collider(newCoyote, coucheFond4);
            this.physics.add.existing(newCoyote);
            newCoyote.body.setGravityY(0);
            newCoyote.body.setSize(35, 30);
            
            // Ajoutez l'instance de Castus à la liste
            this.coyoteListe.push(newCoyote);
        }
    }

    updatedeplacemen(liste , delta , joueur){

        if (liste !== null && liste !== undefined) {
            liste.forEach(element => {
                element.deplacer(this.input.keyboard.createCursorKeys(),delta ,joueur);
                element.dead(liste , joueur)
            });
        }
      
    }

    updatedeplacement(liste , delta , joueur){

        if (liste !== null && liste !== undefined) {
            liste.forEach(element => {
                element.deplacer(this.input.keyboard.createCursorKeys(),delta ,joueur);
              
            });
        }
    }

} 
export default Game;