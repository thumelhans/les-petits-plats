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
        this._keywordHtmlElement = null
    }
    
    createKeywordView() {
        
        if(!this._keywordHtmlElement){
            this._listQuery.forEach(element => {
                const keywordListClass = ['key-list']
                
                if (element.id === 'ingredient') {
                    
                    const keywordListId = element.id
                    this._keywordHtmlElement = createHtmlElement('div', keywordListClass, keywordListId)
                    this._ingredients.sort().forEach(ingredient => {
                        const ingredientView = this.createView(ingredient)
                        this._keywordHtmlElement.append(ingredientView)
                    })
                    
                }
                
                if (element.id === 'appliance') {
                    const keywordListId = element.id
                    this._keywordHtmlElement = createHtmlElement('div', keywordListClass, keywordListId)
                    this._appliances.sort().forEach(appliance => {
                        const applianceView = this.createView(appliance)
                        this._keywordHtmlElement.append(applianceView)
                    })
                }
                
                if (element.id === 'ustensils') {
                    const keywordListId = element.id
                    this._keywordHtmlElement = createHtmlElement('div', keywordListClass, keywordListId)
                    this._ustensils.sort().forEach(ustensil => {
                        const usentilsView = this.createView(ustensil)
                        this._keywordHtmlElement.append(usentilsView)
                    })
                }
                
                element.append(this._keywordHtmlElement)
            })
            
        }
        
    }
    
    createView(keyword){   
        let htmlElement

        let keywordId = keyword.replaceAll(' ', '-')
        
        htmlElement = createHtmlElement('li', '', keywordId)
        htmlElement.textContent = this.capitalizeFirstLetter(keyword)
        
        return htmlElement
    }
    
    updateKeywordsView(listId, keywordsList) {
        if (this._keywordHtmlElement) {
            const updatedHtmlElement = document.querySelector(`#${listId} .key-list`)
            const children = updatedHtmlElement.children
            
            for (let i = children.length - 1; i >= 0; i--) {
                const child = children[i]
                const keyword = child.id
                const matchesUpdatedKeyword = keywordsList.includes(keyword)
                
                if (!matchesUpdatedKeyword) {
                    child.classList.add('hidden')
                } else {
                    child.classList.remove('hidden')
                }
            } 
        }
    }
    
    capitalizeFirstLetter(word){
        return word.charAt(0).toUpperCase() + word.slice(1)
    }
    
    selectedKeywordView(selectedKeyword){
        const selectedKeywordSection = document.querySelector('#selected-tag')
        const isExistingElement = selectedKeywordSection.querySelectorAll('li')
        const selectedKeywordCopy = selectedKeyword
        
        // selectedKeywordCopy.forEach(keyword => {
            let isExistingInDom = false

            isExistingElement.forEach(element => {
                if(element.id === `tag-${selectedKeyword.id}`){
                    isExistingInDom = true
                }
            })

            if(!isExistingInDom){
                const keywordId = `tag-${selectedKeyword.id}`
                const keywordElement = createHtmlElement('li', '', keywordId)
                keywordElement.textContent = selectedKeyword.textContent
                
                const eraseIconClass = ['bi', 'bi-x', 'keyword-erase']
                const eraseIconId = `selected-erase-${selectedKeyword.id}`
                const keywordEraseIcon = createHtmlElement('i', eraseIconClass, eraseIconId)
                keywordElement.append(keywordEraseIcon)
                
                selectedKeywordSection.append(keywordElement)                
            }
        // })
    }
}