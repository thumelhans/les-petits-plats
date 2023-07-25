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
import { Search } from './searchController.js'



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
        this._searchValue = ''
        this._filteredRecipes = this._recipeModel.getRecipe()
        this._newCounterView = new RecipeCounterView(this._filteredRecipes)
        this._counterViewAdded = false
    }
    
    /**
     * Méthode permettant l'initialisation du controller
    *
    * @memberof RecipeController
    */
    async init () {
       
        //Gestion de l'affichage des mots clés
        this._keywordListEvent.main()
        this.displayKeywords()
        
        
        //Gestion de la recherche
        const searchInputs = document.querySelectorAll('input')
        const formController = new FormController()
        
        
        formController.setUpdateCallback(async (updateValue) =>{ // TODO gérer la suppression du champ par la croix
            this._searchValue = updateValue
            const resultRecipeID = this.search(this._searchValue)
            this._filteredRecipes = this._recipeModel.getRecipe().filter((recipe) => resultRecipeID.includes(recipe.id))
            
            //Gestion de l'affichage des recettes
            this.updateDisplay()
        })
        
        this.updateDisplay()
        
        searchInputs.forEach(input => {
            input.addEventListener('input', () => {
                formController.updateValue(input)
            })
        })
        
    }
    
    /**
     * Méthode permettant de gérer l'affichage des cartes des recettes
    *
    * @param {array} searchResult // Tableau des recettes trouver ou pas dans la fonction de recherche
    * @memberof RecipeController
    */
    async displayRecipe() {
        const recipesList = this._filteredRecipes
        const recipeView = recipesList.map((recipe) => new RecipeCardView(recipe))
        
        recipeView.forEach(recipe => {
            recipe.createRecipeCard()
        })

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
    
    displayCounter() {

        if(!this._counterViewAdded){
            this._newCounterView.createCounterView()
            this._counterViewAdded = true
        }

        this._newCounterView.updateCounterView(this._filteredRecipes)
    }

    search(inputWord) {
        const userNewSearch = new Search(this._recipeModel, 'main')
        let searchResult = []
        
        searchResult = userNewSearch.search(inputWord)
        
        return searchResult
    }
    
    async updateDisplay() {
        
        // Effacer les anciennes cartes avant d'afficher les nouvelles
        this.clearRecipeDisplay()
        await this.displayRecipe()
        this.displayCounter()
    }
    
    clearRecipeDisplay() {
        const recipeCards = document.querySelectorAll('.recipe-card')
        
        recipeCards.forEach((card) => {
            card.remove()
        })
    }
}