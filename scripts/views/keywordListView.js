import { createHtmlElement } from "./htmlElementConstructor.js"

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

    keywordView(){

        this._listQuery.forEach(element => {
            const keywordListId = "key-list"
            
            let keywordHtmlElement = createHtmlElement('div', '', keywordListId)

            if (element.id === 'ingredient') {

                this._ingredients.sort().forEach(keyword => {
                    const keywordId = keyword
                    const ingredientHtmlElement = createHtmlElement('li', '', keywordId)
                    ingredientHtmlElement.textContent = this.capitalizeFirstLetter(keyword)
                    keywordHtmlElement.append(ingredientHtmlElement)
                })
                element.append(keywordHtmlElement)
            }
            
            if (element.id === 'appliance') {
                
                this._appliances.sort().forEach(keyword => {
                    const keywordId = keyword
                    const applianceHtmlElement = createHtmlElement('li', '', keywordId)
                    applianceHtmlElement.textContent = this.capitalizeFirstLetter(keyword)
                    keywordHtmlElement.append(applianceHtmlElement)
                })
                element.append(keywordHtmlElement)
            }
            
            if (element.id === 'ustensils') {
                
                this._ustensils.sort().forEach(keyword => {
                    const keywordId = keyword
                    const ustensilsHtmlElement = createHtmlElement('li', keywordId)
                    ustensilsHtmlElement.textContent = this.capitalizeFirstLetter(keyword)
                    keywordHtmlElement.append(ustensilsHtmlElement)
                })
                element.append(keywordHtmlElement)
            }

        })

    }

    capitalizeFirstLetter(word){
        return word.charAt(0).toUpperCase() + word.slice(1)
    }
}