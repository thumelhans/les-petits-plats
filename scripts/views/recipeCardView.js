// Gère l'affichage de la Card des recettes

export class RecipeCardView {
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
        const card = this.createHtmlElement('article', articleClass)

        
        //Création de l'élément IMG
        const imgClass = [
            'card-img-top'
        ]
        const imgAttributes = {
            src: `${this._path}${this._image}`,
            alt: ''
        }
        const imgCard = this.createHtmlElement('img', imgClass, imgAttributes)

        
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
        const bodyCard = this.createHtmlElement('div', bodyClass)

        
        //Création du titre contenant le nom de la recette
        const titleClass = [
            'card-title',
            'fs-5'
        ]
        const titleElement = this.createHtmlElement('h3', titleClass)
        titleElement.textContent = `${this._name}`


        //Création de la partie expliquant la recette
        const recipesBody = this.createHtmlElement('div')

        const recipesTitleClass = [
            'card-title',
            'fw-bold',
            'fs-6'
        ]
        const recipesTitle = this.createHtmlElement('h4', recipesTitleClass)
        recipesTitle.textContent = 'Recette'

        const recipesDescriptionClass = [
            'card-text'
        ]
        const recipesDescription = this.createHtmlElement('p', recipesDescriptionClass)
        recipesDescription.textContent = `${this._description}`

        recipesBody.append(recipesTitle, recipesDescription)


        // Création de la partie donnant les ingrédients et les quantités        
        const recipesUtils = this.createHtmlElement('div')
        
        const utilsTitleClass = [
            'card-title',
            'fw-bold',
            'fs-6'
        ]
        const utilsTitle = this.createHtmlElement('h4', utilsTitleClass)
        utilsTitle.textContent = 'Ingrédients'

        const utilsContainerClass = [
            'row', 
            'row-cols-2', 
            'd-flex', 
            'flex-row',
            'justify-content-between'
        ]
        const utilsContainer = this.createHtmlElement('div', utilsContainerClass)

        // Création des éléments HTML pour chaque ingrédient
        this._ingredients.forEach(element => {
            console.log(element.ingredient)
            const ingredientContainerClass = [
                'col'
            ]
            const ingredientContainer = this.createHtmlElement('div', ingredientContainerClass)

            const ingredientsClass = [
                'm-0'
            ]
            const ingredients = this.createHtmlElement('p', ingredientsClass)
            ingredients.textContent = `${element.ingredient}`

            const quantityClass= [
                'custom-color'
            ]
            const quantity = this.createHtmlElement('p', quantityClass)
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
    
    createHtmlElement(type, classes, idOrAttributes, attributes){
        const htmlElement = document.createElement(type)
        
        if(classes && Array.isArray(classes)) {
            classes.forEach((className) => {
                htmlElement.classList.add(className)
            })
        }
        
        if (typeof idOrAttributes === 'string') {
            htmlElement.id = idOrAttributes
        } else if (typeof idOrAttributes === 'object') {
            for (const attr in idOrAttributes) {
                htmlElement.setAttribute(attr, idOrAttributes[attr])
            }
        }
        
        if (attributes && typeof attributes === 'object') {
            for (const attr in attributes) {
                htmlElement.setAttribute(attr, attributes[attr])
            }
        }
        
        return htmlElement
    }
}
