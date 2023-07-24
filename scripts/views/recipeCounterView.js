import { createHtmlElement } from "./htmlElementConstructor.js"


// Gère l'affichage du nombre de recette afficher à l'utilisateur (toute si pas de recherche et le nombre selon le resultat de la recherche)

export class RecipeCounterView {
    constructor(result) {
        this._result = result
    }

    counterView() {

        const counterQuery = document.querySelector('#recipes-result')
        const totalMenu = createHtmlElement('p')

        totalMenu.textContent = this._result.length
        
        counterQuery.prepend(totalMenu)

        return counterQuery
    }

}