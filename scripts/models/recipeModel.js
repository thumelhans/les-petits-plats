/**
 * Classe permettant de gérer et accéder aux données présent dans recipes.js
 *
 * @export
 * @class RecipeModel
 */
export class RecipeModel {
    
    /**
     * Creates an instance of RecipeModel.
     * @param {array} recipes
     * @memberof RecipeModel
     */
    constructor(recipes){
        this._recipes = recipes
    }

    /**
     * Méthode permettant la récupérant brut des recettes
     *
     * @return {array} 
     * @memberof RecipeModel
     */
    getRecipe() {
        return this._recipes
    }
    
    
    /**
     * Méthode récupérant les noms de toutes les recettes
     *
     * @return {array} Retourne un tableau permettant de faire une recherche
     * @memberof RecipeModel
     */
    getRecipeName() {
        return this._recipes.map(({id, name}) => {return {id, name}})
    }
    
    /**
     * Méthode permettant de récupérer toutes les descriptions des recettes
     *
     * @return {array} Retourne un tableau permettant de faire une recherche
     * @memberof RecipeModel
     */
    getRecipeDescription() {
        return this._recipes.map(({id, description}) => {return {id, description}})
    }
    
    /**
     * Méthode permettant de récupérer tous les ingrédients de toutes les recettes
     *
     * @return {array} Retourne un tableau permettant de faire une recherche et de lister les mots clés
     * @memberof RecipeModel
     */
    getRecipeIngredients() {
        return this._recipes.map(({id, ingredients}) => {
            const ingredientsList = ingredients.map(({ingredient}) => ingredient)
            return {id, ingredients: ingredientsList}
        })
    }
    
    /**
     * Méthode permettant de récupérer tous les appareils utilent aux recettes
     *
     * @return {array} Retourne un tableau permettant de faire une recherche et de lister les mots clés
     * @memberof RecipeModel
     */
    getRecipeAppliances() {
        return this._recipes.map(({id, appliance}) => {return {id, appliance}})
    }
    
    /**
     * Méthode permettant de récupérer tous les ustensils utiles aux recettes
     *
     * @return {array} Retourne un tableau permettant de faire une recherche et de lister les mots clés
     * @memberof RecipeModel
     */
    getRecipeUstensils() {
        return this._recipes.map(({id, ustensils}) => {return {id, ustensils}})
    }
    
}