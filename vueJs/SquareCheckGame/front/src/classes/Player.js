export default class Joueur {
    constructor(id, nom, score = 0) {
        this.id = id; // ID unique
        this.nom = nom; // Nom du joueur
        this.score = score; // Score initial
    }

    // Méthode pour mettre à jour le score
    mettreAJourScore(nouveauScore) {
        this.score = nouveauScore;
    }

    // Méthode pour renvoyer les données du joueur
    getDetails() {
        return {
            id: this.id,
            nom: this.nom,
            score: this.score
        };
    }
}
