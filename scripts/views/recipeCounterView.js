import { createHtmlElement } from "./htmlElementConstructor.js"

// Gère l'affichage du nombre de recette afficher à l'utilisateur (toute si pas de recherche et le nombre selon le resultat de la recherche)

export class RecipeCounterView {
    constructor(result) {
        this._result = result
        this._counterQuery = document.querySelector('#recipes-result')
        this._totalMenu = document.createElement('p')
        this._isCounterAdded = false
    }

    createCounterView(){
        this._totalMenu.textContent = this._result.length
        this._counterQuery.prepend(this._totalMenu)
        this._isCounterAdded = true
    }

    updateCounterView(updatedResult) {
        if (this._isCounterAdded) {
            this._totalMenu.textContent = updatedResult.length
        }
    }
}
