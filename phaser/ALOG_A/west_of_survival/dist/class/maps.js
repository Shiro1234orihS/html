export default class  Maps extends Phaser.GameObjects.Sprite{
    constructor() {
       
    }

   
    preload() {
          
        this.load.image('atlas', 'dist/assets/map/atlas.png');
        this.load.image('bandit', 'dist/assets/map/bandit.png' );
        this.load.image('barman', 'dist/assets/map/barman.png');
        this.load.image('sherrif', 'dist/assets/map/sherrif.png');

        this.load.tilemapTiledJSON('map', 'dist/assets/map/main_map_2.json');   

   
        
    }

    
    create() {

        var map = this.make.tilemap({ key: 'map' });
        var tileset = map.addTilesetImage('atlas'); 
        // var maisson = map.addTilesetImage('Maison', 'atlas');
       
       
        const coucheFond = map.createLayer('sol', tileset, 0, 0);
        // var maisson = map.createLayer('Maison', sol, 0, 0);

        // Configurer la caméra
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setZoom(0.5); // Réglez le zoom si nécessaire
       
    }

    update() {
        
    }
}