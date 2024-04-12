
export default class  Joueur extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // Ajouter l'objet à la scène
        scene.add.existing(this);

        // Initialiser les propriétés ou les états du joueur
        this.vie = 100;
        this.vitesse = 250;
 
    }
    

    creationAnime(){
        this.anims.create({
            key: 'repos',
            frames: this.anims.generateFrameNumbers('texture_jouer', {start: 176 , end : 180}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'deplacement_hauts',
            frames: this.anims.generateFrameNumbers('texture_jouer', {start: 6 , end : 14}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'deplacement_droite',
            frames: this.anims.generateFrameNumbers('texture_jouer', {start: 76 , end : 84}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'deplacement_gauche',
            frames: this.anims.generateFrameNumbers('texture_jouer', {start: 111 , end : 120}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'deplacement_bas',
            frames: this.anims.generateFrameNumbers('texture_jouer', {start: 181 , end : 188}),
            frameRate: 10,
            repeat: -1
        });
         
        this.creationDeplacement_diagonale();
    }
    
    creationDeplacement_diagonale(){
       
        this.anims.create({
            key: 'deplacement_diago_DH',
            frames: this.anims.generateFrameNumbers('texture_jouer', {start: 251 , end : 259}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'deplacement_diag_BD',
            frames: this.anims.generateFrameNumbers('texture_jouer', {start: 41 , end : 49}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'deplacement_diag_GH',
            frames: this.anims.generateFrameNumbers('texture_jouer', {start: 214 , end : 224}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'deplacement_diag_GB',
            frames: this.anims.generateFrameNumbers('texture_jouer', {start: 147 , end : 155}),
            frameRate: 10,
            repeat: -1
        });
    }
    
    // Méthode pour déplacer le joueur
    deplacer(cursors , delta) {
        
       this.x = Math.ceil(this.x);
       this.y = Math.ceil(this.y);
        

        this.setVelocityX(0);
        this.setVelocityY(0);
        let animation= 'repos';

     
        // Logique pour déplacer le joueur en fonction des touches fléchées
        if (cursors.left.isDown) {
            animation= 'deplacement_gauche';
            this.setVelocityX(-this.vitesse);
        } 
        else if (cursors.right.isDown) {
            animation = 'deplacement_droite';
            this.setVelocityX(this.vitesse);
        } 
       
        if (cursors.up.isDown) {
            this.body.setVelocityY(-this.vitesse);
            animation = 'deplacement_hauts'
        } else if (cursors.down.isDown) {
            animation ='deplacement_bas';
            this.setVelocityY(this.vitesse);
        } 
        
        if (cursors.up.isDown && cursors.left.isDown) {
            animation = 'deplacement_diag_GH';
        } else if (cursors.up.isDown && cursors.right.isDown) {
            animation = 'deplacement_diago_DH';
        } else if (cursors.down.isDown && cursors.left.isDown) {
            animation = 'deplacement_diag_GB';
        } else if (cursors.down.isDown && cursors.right.isDown) {
            animation = 'deplacement_diag_BD';
        }
  

        this.anims.play(animation, true);
        
        
        //X et Y  = 2227
    }

   
    

    // Autres méthodes, comme prendre des dégâts ou attaquer
    recevoirDegats(degats) {
        this.vie -= degats;
        if (this.vie <= 0) {
            this.detruire();
        }
    }

    detruire() {
        // Supprimer le joueur de la scène, etc.
        this.destroy();
    }
}