import { RecipeModel } from '../models/recipeModel.js'
import { KeywordListView } from '../views/keywordListView.js'
/* import { RecipeListView } from '../views/recipeListView.js'
import { KeywordListView } from '../views/keywordListView.js'
import { RecipeCounterView } from '../views/recipeCounterView.js'*/
import { RecipeCardView } from '../views/recipeCardView.js'



/**
 * Classe permettant de coordonner les interactions entre les modèles et les vues
 *
 * @export
 * @class RecipeController
 */
export class RecipeController {
    constructor(recipes) {
        this._recipeModel = new RecipeModel(recipes)
        /* this._recipeListVieww = new RecipeListView()
        this._keywordListView = new KeywordListView()
        this._recipeCounterView = new RecipeCounterView()*/        
    }

    /**
     * Méthode permettant l'initialisation du controller
     *
     * @memberof RecipeController
     */
    init () {
        
        //Gestion de l'affichage des recettes
        const searchResult = this.search() //Doit être le return de la méthode de recherche
        let searchResultList

        if (searchResult.length > 0){
            searchResultList = this._recipeModel.getRecipe().filter(recipe => searchResult.includes(recipe.id))
            this.displayRecipe(searchResultList)
        } else {
            this.displayRecipe()
        }    

        //Gestion de l'affichage des mots clés
        this.displayKeywords()
    }
    
    /**
     * Méthode permettant de gérer l'affichage des cartes des recettes
     *
     * @param {array} searchResult // Tableau des recettes trouver ou pas dans la fonction de recherche
     * @memberof RecipeController
     */
    displayRecipe(searchResult) {
        const recipesList = this._recipeModel.getRecipe()
        let recipeView

        if(searchResult) {
            recipeView = searchResult.map((recipe) => new RecipeCardView(recipe))
        } else {
            recipeView = recipesList.map((recipe) => new RecipeCardView(recipe))
        }

        if (recipeView !== undefined){ //recipeView sera toujours défini soit par le tagsearch soit par le mainsearch soit par défaut
            recipeView.forEach(recipe => {
                recipe.createRecipeCard()
            })
        }
    }

    displayKeywords() {
        const ingredients = this._recipeModel.getRecipeIngredients()
        const appliances = this._recipeModel.getRecipeAppliances()
        const ustensils = this._recipeModel.getRecipeUstensils()

        
        const ingredientArray = this.keywords(ingredients)
        const applianceArray = this.keywords(appliances)
        const ustensilArray = this.keywords(ustensils)
        const keyWordView = new KeywordListView(ingredientArray, applianceArray, ustensilArray)

        keyWordView.keywordView()
    }
    
    /**
     * Méthode permettant de récupérer les mots clés en supprimant les doublons
     *
     * @param {array} array
     * @return {array} Retourne la liste des mots clés 
     */
    keywords(array){ // TODO Je sais que je peux résoudre le problème plus facilement, mais je veux apprendre à manipuler les objets et tableaux donc aller chercher des choses complexes
        const keyToExclude = 'id'
        const typeOfTest = Object.values(array[0])
        let itemKey
        let newArraySet
        if (typeof typeOfTest[1] !== 'string') {
            itemKey = Object.keys(array[0]).filter(key => key !== keyToExclude)
            newArraySet = new Set(array.map(item => item[itemKey][0]))
        } else {
            itemKey = Object.keys(array[0]).filter(key => key !== keyToExclude)
            newArraySet = new Set(array.map(item => item[itemKey]))
        }
        
        return Array.from(newArraySet) // TODO Le test de comparaison doit se faire sur la recherche, mais quid des fonctions/méthodes pour l'affichage des data comme la liste des mots clés?
    }
    
    displayCounter() {

    }

    search() {
        let searchResult = []

        return searchResult
    }
}