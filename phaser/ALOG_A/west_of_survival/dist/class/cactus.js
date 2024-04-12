import  Node  from '../class/node.js';

export default class  Castus extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // Ajouter l'objet à la scène
        scene.add.existing(this);


        

       
    }
    
    creategrille(graphics){
        let rows = 46; // Nombre de lignes
        let cols = 46; 
        let grid = new Array(cols);
        
        
        
        for (let i = 10; i < cols; i++) {
           
            grid[i] = new Array(rows);
            for (let j = 9; j < rows; j++) {
                grid[i][j] = new Node(i, j);
                // Marquer aléatoirement des obstacles pour l'exemple
                if (Math.random() < 0.2) {
                    grid[i][j].obstacle = true;
                    console.log(grid[i][j].f);
                }
            }
        }

       
        

        // Dessiner la grille
        for (let i = 10; i < cols; i++) {
            for (let j = 9; j < rows; j++) {
                if ( grid[i][j].obstacle) {
                    graphics.fillStyle(0xff0000, 1); // Couleur rouge pour les obstacles
                    graphics.fillRect(i * 40, j * 40, 40, 40); // Adapter la taille selon votre grille
                }
                graphics.strokeRect(i * 40, j * 40, 40, 40); // Dessiner le contour de chaque cellule
               
            }
        }

       
    }




    
}