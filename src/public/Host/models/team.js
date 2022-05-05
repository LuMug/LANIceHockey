export default class Team {

    players = new Array();
    name;
    color;
    score = 0;

    /** una volta passato il nome e il colore 
     *  del team questo viene generato, ovviamene 
     *  senza players.
     */
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }

    /** questo metodo serve ad aggiungere un player alla 
     *  lista di player.
     */
    addPlayer(player) {
        this.players.push(player);
        player.team = this;
    }

    /** questo metodo serve a rimuovere un player dalla 
     *  lista di player.
     */
    removePlayer(player) {
        var index = this.players.indexOf(player);
        if (index != -1) {
            this.players.splice(index, 1);
        }
    }
}