
export default class  Balle extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture,animatio,nombre ,frame) {
        super(scene, x, y, texture, frame);

        // Ajouter l'objet à la scène
        scene.add.existing(this);
        this.texture = texture;
        this.animation = animatio;
        this.vitesse = 300;
        this.deplacemaen = nombre 
    }
    

    creationAnime(){
        this.anims.create({
            key: 'tir_gauche',
            frames: this.anims.generateFrameNumbers(this.texture, {start: 35 , end : 31}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'tir_droite',
            frames: this.anims.generateFrameNumbers(this.texture, {start: 41 , end : 44}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'tir_hauts',
            frames: this.anims.generateFrameNumbers(this.texture, {start: 35 , end : 31}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'tir_bas',
            frames: this.anims.generateFrameNumbers(this.texture, {start: 35 , end : 31}),
            frameRate: 10,
            repeat: -1
        });
    }
    deplacer(){
       
        if(this.deplacemaen == 1){
            this.setVelocityX(this.vitesse);
            
        }
        if(this.deplacemaen ==2){
            this.setVelocityX(-this.vitesse);
           
        }
        if(this.deplacemaen == 3){
            this.setVelocityY(this.vitesse);
           
        }
        if(this.deplacemaen == 4){
            this.setVelocityY(-this.vitesse);
           
        }
        
        this.anims.play(this.animation, true);
    }
   
    dead(tableau,joueur){
       
        // Calcul de la distance entre la balle et le joueur sur les axes x et y
        let distanceX = Math.abs(joueur.x - this.x);
        let distanceY = Math.abs(joueur.y - this.y);

        // Seuil de distance pour supprimer la balle (par exemple, 100 unités)
        let seuilDistance = 200;

        // Vérifie si la balle est trop loin du joueur sur l'un ou l'autre des axes
        if(distanceX > seuilDistance || distanceY > seuilDistance){
            // Trouve l'indice de cette balle dans le tableau
            let indiceASupprimer = tableau.findIndex(element => element === this);

            // Vérifie que l'indice existe avant de supprimer
            if(indiceASupprimer !== -1){
                tableau.splice(indiceASupprimer, 1);
                this.destroy();
            }
        }
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