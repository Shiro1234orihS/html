export default class FixedText extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, style) {
      super(scene, x, y, text, style);
      
      // Enregistrez la scène pour y accéder dans d'autres méthodes
      this.scene = scene;
      
      // Ajoutez cet objet texte à la scène
      this.scene.add.existing(this);
      
      // Fixez le texte pour qu'il ne bouge pas et ne zoom pas avec le défilement de la caméra
      this.setScrollFactor(0);

      console.log(this.x)
    }
  
    // Vous pouvez ajouter d'autres méthodes ici pour manipuler le texte (par exemple, le mettre à jour avec un nouveau score)
  }
  


  