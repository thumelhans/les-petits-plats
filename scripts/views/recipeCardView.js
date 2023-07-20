import { createHtmlElement } from "./htmlElementConstructor.js"

/**
 * Classe gérant la vue des cartes
 *
 * @export
 * @class RecipeCardView
 */
export class RecipeCardView {
    /**
     * Creates an instance of RecipeCardView.
     * @param {array} data
     * @memberof RecipeCardView
     */
    constructor(data) {
        this._id = data.id
        this._image = data.image
        this._path = './assets/recipes/'
        this._name = data.name
        this._ingredients = data.ingredients
        this._time = data.time
        this._description = data.description
        this._recipesDomQuery = document.querySelector('#recipes')
    }
    
    /**
     * Méthode permettant la création de la vue des recettes. 
     * La méthode textContent est appliquée pour des raisons de sécurité.
     *
     * @return {HTMLElement} Retourne la vue de la carte
     * @memberof RecipeCardView
     */
    createRecipeCard() {
        
        //Création de l'élément de la carte
        const articleClass = [
            'card',
            'col',
            'bg-white',
            'rounded-4',
            'mb-4',
            'p-0',
            'd-flex',
            'flex-column',
            'justify-content-between',
        ]
        const card = createHtmlElement('article', articleClass)

        
        //Création de l'élément IMG
        const imgClass = [
            'card-img-top'
        ]
        const imgAttributes = {
            src: `${this._path}${this._image}`,
            alt: ''
        }
        const imgCard = createHtmlElement('img', imgClass, imgAttributes)

        
        //Création du corps de la carte
        const bodyClass = [
            'card-body',
            'container',
            'd-flex',
            'flex-column',
            'justify-content-center',
            'gap-5',
            'px-4',
            'py-0'
        ]
        const bodyCard = createHtmlElement('div', bodyClass)

        
        //Création du titre contenant le nom de la recette
        const titleClass = [
            'card-title',
            'fs-5'
        ]
        const titleElement = createHtmlElement('h3', titleClass)
        titleElement.textContent = `${this._name}`


        //Création de la partie expliquant la recette
        const recipesBody = createHtmlElement('div')

        const recipesTitleClass = [
            'card-title',
            'fw-bold',
            'fs-6'
        ]
        const recipesTitle = createHtmlElement('h4', recipesTitleClass)
        recipesTitle.textContent = 'Recette'

        const recipesDescriptionClass = [
            'card-text'
        ]
        const recipesDescription = createHtmlElement('p', recipesDescriptionClass)
        recipesDescription.textContent = `${this._description}`

        recipesBody.append(recipesTitle, recipesDescription)


        // Création de la partie donnant les ingrédients et les quantités        
        const recipesUtils = createHtmlElement('div')
        
        const utilsTitleClass = [
            'card-title',
            'fw-bold',
            'fs-6'
        ]
        const utilsTitle = createHtmlElement('h4', utilsTitleClass)
        utilsTitle.textContent = 'Ingrédients'

        const utilsContainerClass = [
            'row', 
            'row-cols-2', 
            'd-flex', 
            'flex-row',
            'justify-content-between'
        ]
        const utilsContainer = createHtmlElement('div', utilsContainerClass)

        // Création des éléments HTML pour chaque ingrédient
        this._ingredients.forEach(element => {
            const ingredientContainerClass = [
                'col'
            ]
            const ingredientContainer = createHtmlElement('div', ingredientContainerClass)

            const ingredientsClass = [
                'm-0'
            ]
            const ingredients = createHtmlElement('p', ingredientsClass)
            ingredients.textContent = `${element.ingredient}`

            const quantityClass= [
                'custom-color'
            ]
            const quantity = createHtmlElement('p', quantityClass)
            quantity.textContent = `${element.quantity}${element.unit ? ' ' + element.unit : ''}`

            ingredientContainer.append(ingredients, quantity)

            utilsContainer.append(ingredientContainer)
        })

        // Injection des éléments créés
        recipesUtils.append(utilsTitle, utilsContainer)
        bodyCard.append(titleElement, recipesBody, recipesUtils)
        card.append(imgCard, bodyCard)

        this._recipesDomQuery.appendChild(card)
                
        return card
    }
}
