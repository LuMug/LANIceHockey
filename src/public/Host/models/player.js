export default class Player extends Phaser.GameObjects.Ellipse {

    scene;
    name;
    scoredGoals = 0;
    angle = 0;
    intensity = 0;
    ip;
    followText;
    puckCollider;
    lastVelocityX;
    lastVelocityY;
    constVelocity = 4;

    /** questo metodo è il costruttore, invoca il costruttore
     *  della classe ellipse, setta la posizione di partenza,
     *  nome, indirizzo ip e creiamo il testo con scritto il
     *  nome che segue il giocatore. Abilitiamo anche la fisica
     *  e aggiungiamo sia player che scritta alla scena.
     */
    constructor(scene, name, posX, posY, ip, team) {
        super(scene, posX, posY, 20, 20, team.color);
        this.scene = scene;
        this.name = name;
        this.ip = ip;
        this.followText = scene.add.text(100, 100, '', { font: '20px Courier', fill: '#00ff00' });
        this.followText.setText(this.name);
        scene.physics.world.enable(this);
        scene.add.existing(this);
        scene.add.existing(this.followText);
    }

    /** questo metodo una volta passato collider lo assegna
     *  all'attributo puckCollider.
     */
    setPuckCollider(collider) {
        this.puckCollider = collider;
    }

    /** questo metodo prende l'angolo passato come argomento
     *  e lo assegna all'attributo angle.
     */
    setAngle(angle) {
        this.angle = angle;
    }

    /** questo metodo una volta passata un'intensità la
     *  assegnerà all'attributo intensity.
     */
    setIntensity(intensity) {
        this.intensity = intensity;
    }

    /** questo metodo una volta passato un team colora
     *  il player del colore del team.
     */
    setColor(team) {
        this.setFillStyle(team.color);
    }

    /**  questo metodo viene invocato automaticamente
     *   dal motore di Phaser e permettere di fare delle
     *   azioni ad ogni ciclo di gioco. Noi lo utiliziamo
     *   per calcolare la velocità angolare del player
     *   in maniera da farlo muovere seguendo il joystick
     *   e assegnamo anche la nuova posizione del nome del
     *   giocatore in maniera da seguire il player. Assegnamo
     *   anche lastVelocityX e lastVelocityY.
     */
    update() {
        var x = (this.intensity * Math.cos(this.angle * Math.PI / 180)) * this.constVelocity;
        var y = -(this.intensity * Math.sin(this.angle * Math.PI / 180)) * this.constVelocity;
        if (x != 0 && y != 0) {
            this.lastVelocityX = x;
            this.lastVelocityY = y;
        }
        this.body.setVelocity(x, y);
        this.followText.setPosition(this.x, this.y);
    }

    /** questo metodo serve per disattivare il collider e dunque
     *  fare in modo che il disco venga tirato dal player, se
     *  ciò non succedesse il player appena lo tira lo riprende
     *  dunque non sarebbe giocabile.
     */
    removeCollider() {
        this.scene.physics.world.removeCollider(this.puckCollider);
    }

    /** questo metodo serve ad attivare un collider tra il puck e
     *  il player.
     */
    addCollider() {
        var coll = this.scene.physics.add.collider(this, this.scene.puck, this.scene.changePuckOwner);
        this.setPuckCollider(coll);
    }

    /** Questo metodo serve a duplicare la velocità di movimento
     *  per mezzo secondo.
     */
    speed() {
        this.constVelocity = 8;
        setTimeout(() => { this.constVelocity = 4; }, 800);
    }
}