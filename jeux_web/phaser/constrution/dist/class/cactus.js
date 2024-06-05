

export default class  Castus extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        // Ajouter l'objet à la scène
        scene.add.existing(this);
        this.texture = texture;
        this.vitesse = 200;
    }
    
    creationAnime(){
        this.anims.create({
            key: 'repos',
            frames: this.anims.generateFrameNumbers(this.texture, {start: 51 , end : 55}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'deplacement_hauts',
            frames: this.anims.generateFrameNumbers(this.texture, {start: 81 , end : 90}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'deplacement_droite',
            frames: this.anims.generateFrameNumbers(this.texture, {start: 30 , end : 39}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'deplacement_gauche',
            frames: this.anims.generateFrameNumbers(this.texture, {start: 13 , end : 1}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'deplacement_bas',
            frames: this.anims.generateFrameNumbers(this.texture, {start: 56 , end : 65}),
            frameRate: 10,
            repeat: -1
        });
        
    }
   
    deplacer(cursors , delta , joueur ) {
        
        // on arrondi les valeur de X  et Y pour pouvoir suivre le joueur 
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        
        let animation= 'repos';

        // Logique pour déplacer le joueur en fonction des touches fléchées
        if (joueur.x > this.x )
        {
            this.setVelocityX(this.vitesse);
            animation = 'deplacement_droite';
        }
        else if(joueur.x  < this.x)
        {
            this.setVelocityX(-this.vitesse);
            animation= 'deplacement_gauche';
        }
        else
        {
            this.setVelocityX(0);
        }


        if (joueur.y < this.y) {
            this.body.setVelocityY(-this.vitesse);
            animation = 'deplacement_hauts'
        } else if (joueur.y> this.y) {
            animation ='deplacement_bas';
            this.setVelocityY(this.vitesse);
        } 
        else
        {
            this.setVelocityY(0);
        }

       

        this.anims.play(animation, true);
        
        
        //X et Y  = 2227
    }
    
}