export default class Puck extends Phaser.GameObjects.Ellipse {

    player; //player that has the puck
    bounced = 0;
    beingShoot = false;
    scoredRight = false;
    scoredLeft = false;
    rightRowScore;
    leftRowScore;

    /**  il costruttore serve ad istanziare un nuovo puck, 
     *   viene richiamato il costruttore di ellipse in 
     *   maniera da effettivamente farlo diventare tale. 
     *   Si abilita la fisica dell'oggetto, si genera nella 
     *   scena e viene loggata la creazione.
     */
    constructor(scene, posX, posY, size = 35, color = 0x202020) {
        super(scene, posX, posY, size, size, color);
        scene.physics.world.enable(this);
        scene.add.existing(this);
        console.log("Puck created at: [" + this.x + ";" + this.y + "]");
    }

    /**  Questo metodo serve a riassegnare il player che 
     *   possiede il puck, player è il nuovo player.
     */
    setPlayer(player) {
        console.log('setting puck to player: ' + player.name);
        this.player = player;
    }

    /** Questo metodo è richiamato da Phaser in automatico 
     *  ad ogni ciclo di gioco, serve per posizionare il 
     *  puck al centro del player che lo possiede, ovviamente 
     *  se non è tirato.
     */
    update() {
        if (this.player != null && this.beingShoot == false) {
            this.setPosition(this.player.x, this.player.y);
        }
    }
}