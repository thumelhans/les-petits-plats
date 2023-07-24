import { RecipeModel } from '../models/recipeModel.js'
import { KeywordListView } from '../views/keywordListView.js'
/* import { RecipeListView } from '../views/recipeListView.js'
import { KeywordListView } from '../views/keywordListView.js'
import { RecipeCounterView } from '../views/recipeCounterView.js'*/
import { RecipeCardView } from '../views/recipeCardView.js'
import { KeywordListEvent } from '../controllers/keywordListEventController.js'
import { createHtmlElement } from '../views/htmlElementConstructor.js'
import { RecipeCounterView } from '../views/recipeCounterView.js'
import { FormController } from './formController.js'



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
        this._keywordListView = new KeywordListView()*/
        this._keywordListEvent = new KeywordListEvent()
        /*this._recipeCounterView = new RecipeCounterView()*/        
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
            this.displayCounter(searchResultList)
        } else {
            this.displayRecipe()
            this.displayCounter(this._recipeModel.getRecipe())
        }    

        //Gestion de l'affichage des mots clés
        this._keywordListEvent.main()
        this.displayKeywords()

        const test = new FormController()

        test.getValue().then((value) => {
            console.log(value)
        })

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
        const keywordView = new KeywordListView(ingredientArray, applianceArray, ustensilArray)

        keywordView.keywordView()
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
    
    displayCounter(result) {
        const newCounterView = new RecipeCounterView(result)

        newCounterView.counterView()
    }

    search() {
        let searchResult = []

        return searchResult
    }
}