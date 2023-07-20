import { createHtmlElement } from "./htmlElementConstructor.js"

// Gère l'affichage des mots clés pour la recherche par tag



export class KeywordListView {
    /**
     * Creates an instance of KeywordListView.
     * @param {array} ingredients
     * @param {array} appliances
     * @param {array} ustensils
     * @memberof KeywordListView
     */
    constructor(ingredients, appliances, ustensils) {
        this._ingredients = ingredients
        this._appliances = appliances
        this._ustensils = ustensils
        this._listQuery = document.querySelectorAll('#tag-search ul')
    }

    test(){
        console.log('Noeud HTML', this._listQuery)
        console.log('Ingrédients', this._ingredients)
        console.log('Appareils', this._appliances)
        console.log('Ustensils', this._ustensils)
    }

    keywordView(){

        this._listQuery.forEach(element => {
            const keywordId = "key-list"
            let keywordHtmlElement = createHtmlElement('div', '' ,keywordId)

            if (element.id === 'ingredient') {

                this._ingredients.sort().forEach(keyword => { // TODO ajouter une div pour restreindre le scroll exclusivement aux mots clés
                    const ingredientHtmlElement = createHtmlElement('p') // TODO Je peux laisser en P ou en terme de bonne pratique ça doit être un lien ?
                    ingredientHtmlElement.textContent = keyword
                    keywordHtmlElement.append(ingredientHtmlElement)
                })
                element.append(keywordHtmlElement)
            }
            
            if (element.id === 'appliance') {
                
                this._appliances.sort().forEach(keyword => {
                    const applianceHtmlElement = createHtmlElement('p')
                    applianceHtmlElement.textContent = keyword
                    keywordHtmlElement.append(applianceHtmlElement)
                })
                element.append(keywordHtmlElement)
            }
            
            if (element.id === 'ustensils') {
                
                this._ustensils.sort().forEach(keyword => {
                    const ustensilsHtmlElement = createHtmlElement('p')
                    ustensilsHtmlElement.textContent = keyword
                    keywordHtmlElement.append(ustensilsHtmlElement)
                })
                element.append(keywordHtmlElement)
            }

        })

    }

}