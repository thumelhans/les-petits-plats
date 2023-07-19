/**
 * Classe permettant de gérer et accéder aux données présent dans recipes.js
 *
 * @export
 * @class RecipeModel
 */
export class RecipeModel {
    
    /**
     * Creates an instance of RecipeModel.
     * @param {*} recipes
     * @memberof RecipeModel
     */
    constructor(recipes){
        this._recipes = recipes
    }

    getRecipe() {
        return this._recipes
    }
    
    /**
     * Permet de récupérer les données des recettes pour les CardView
     *
     * @param {*} id
     * @memberof RecipeModel
     */
    getRecipeViewData(id) {       
        const cardViewData = this._recipes
            .filter(element => parseInt(id) === parseInt(element.id))
            .map(({ name, description, ingredients }) => {
                const ingredientsData = ingredients.map(({ ingredient, quantity, unit }) => ({
                    ingredient,
                    quantity: quantity || '',
                    unit: unit || ''
                }))

                return { name, description, ingredients: ingredientsData }
            })
        
        return cardViewData
    }

    /**
     * Fonction récupérant les noms de toutes les recettes
     *
     * @return {*} Retourne un tableau permettant de faire une recherche
     * @memberof RecipeModel
     */
    getRecipeName() {
        return this._recipes.map(({id, name}) => {return {id, name}})
    }
    
    /**
     * Fonction permettant de récupérer toutes les descriptions des recettes
     *
     * @return {*} Retourne un tableau permettant de faire une recherche
     * @memberof RecipeModel
     */
    getRecipeDescription() {
        return this._recipes.map(({id, description}) => {return {id, description}})
    }
    
    /**
     * Fonction permettant de récupérer tous les ingrédients de toutes les recettes
     *
     * @return {*} Retourne un tableau permettant de faire une recherche et de lister les mots clés
     * @memberof RecipeModel
     */
    getRecipeIngredients() {
        return this._recipes.map(({id, ingredients}) => {
            const ingredientsList = ingredients.map(({ingredient}) => ingredient)
            return {id, ingredients: ingredientsList}
        })
    }
    
    /**
     * Fonction permettant de récupérer tous les appareils utilent aux recettes
     *
     * @return {*} Retourne un tableau permettant de faire une recherche et de lister les mots clés
     * @memberof RecipeModel
     */
    getRecipeAppliances() {
        return this._recipes.map(({id, appliance}) => {return {id, appliance}})
    }
    
    /**
     * Fonction permettant de récupérer tous les ustensils utiles aux recettes
     *
     * @return {*} Retourne un tableau permettant de faire une recherche et de lister les mots clés
     * @memberof RecipeModel
     */
    getRecipeUstensils() {
        return this._recipes.map(({id, ustensils}) => {return {id, ustensils}})
    }
    
}