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
        this._initKeywordView()
        this._ingredientArray //TODO dans le cadre de la recherche par array methode, utilise les méthodes de set (genre array.has(inputValue))
        this._applianceArray
        this._ustensilArray
        
        this._formController = new FormController()
    }
    
    /**
    * Méthode permettant l'initialisation du controller
    *
    * @memberof RecipeController
    */
    async init () {
        
        //Gestion de l'affichage des mots clés
        this.displayKeywords()
        this._keywordListEvent.main()
        this._keywordListEvent.onKeywordElementsUpdate((updatedElements) => {
            // console.log(updatedElements)
            this._searchValue = updatedElements.id
            // console.log(this._searchValue)
            
            this._keywordView.selectedKeywordView(updatedElements)
            
            const resultRecipeID = this.search(this._searchValue, 'tag')
            
            console.log(this._searchValue)
            
            if(!this._searchValue || this._searchValue.length < 3){
                this._filteredRecipes = this._recipeModel.getRecipe()
                lastInputID = []
            } else {
                this._filteredRecipes = this._recipeModel
                .getRecipe().filter((recipe) => resultRecipeID.includes(recipe.id))
            }
            
            this.updateDisplay()
        })
        
        
        //Gestion de la recherche
        const searchInputs = document.querySelectorAll('input')
        // const formController = new FormController()
        
        //Affichage par défaut des recherches
        this.updateDisplay()
        
        let lastInputID = []
        
        
        this._formController.setUpdateCallback((updateValue) =>{
            const selectInput = document.querySelectorAll('input')
            let inputID = null
            
            this._searchValue = updateValue
            if(updateValue === undefined){
                this._searchValue = ''
            }
            
            for (let i = selectInput.length - 1; i >= 0; i--) {
                if (selectInput[i].value) {
                    inputID = selectInput[i].id
                    break
                }
            }
            
            if(lastInputID.length < 1){
                lastInputID.push(inputID)
            }
            
            if(lastInputID[0] === 'main-search'){
                const resultRecipeID = this.search(this._searchValue, 'main')
                
                console.log(this._searchValue)
                
                if(!this._searchValue || this._searchValue.length < 3){
                    this._filteredRecipes = this._recipeModel.getRecipe()
                    lastInputID = []
                } else {
                    this._filteredRecipes = this._recipeModel
                    .getRecipe().filter((recipe) => resultRecipeID.includes(recipe.id))
                }
                
                this.updateDisplay()
            } else {
                
                if(!this._searchValue){
                    this.displayKeywords(lastInputID[0], this._searchValue)
                    lastInputID = []
                }else{
                    this.displayKeywords(inputID, this._searchValue)
                }
            }
            
        })
        
        searchInputs.forEach(input => {
            input.addEventListener('input', () => {
                this._formController.updateValue(input)
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
    
    _initKeywordView(){
        const ingredients = this._recipeModel.getRecipeIngredients()
        const appliances = this._recipeModel.getRecipeAppliances()
        const ustensils = this._recipeModel.getRecipeUstensils()
        
        this._ingredientArray = this.keywords(ingredients) //TODO dans le cadre de la recherche par array methode, utilise les méthodes de set (genre array.has(inputValue))
        this._applianceArray = this.keywords(appliances)
        this._ustensilArray = this.keywords(ustensils)
        
        this._keywordView = new KeywordListView(this._ingredientArray, this._applianceArray, this._ustensilArray)
        
    }
    
    displayKeywords(listHTMLId, keywords) {
        
        if(!listHTMLId){
            this._keywordView.createKeywordView()
        } else {
            const listName = listHTMLId.split('-')
            
            if (listName[1] === 'ingredient'){
                const updatedIngredient = Array
                .from(this._ingredientArray)
                .filter(item => item.toLowerCase().includes(keywords.toLowerCase()))
                
                console.log(this._ingredientArray)
                
                if(!keywords){
                    this._keywordView.updateKeywordsView(listName[1], this._ingredientArray)
                }
                this._keywordView.updateKeywordsView(listName[1], updatedIngredient)
            }
            
            if (listName[1] === 'appliance'){
                const updatedAppliance = Array
                .from(this._applianceArray)
                .filter(item => item.toLowerCase().includes(keywords.toLowerCase()))
                
                console.log(this._applianceArray)
                
                if(!keywords){
                    this._keywordView.updateKeywordsView(listName[1], this._applianceArray)
                }
                this._keywordView.updateKeywordsView(listName[1], updatedAppliance)
            }
            
            if (listName[1] === 'ustensils'){
                const updatedUstensil = Array
                .from(this._ustensilArray)
                .filter(item => item.toLowerCase().includes(keywords.toLowerCase()))
                
                console.log(this._ustensilArray)
                
                if(!keywords){
                    this._keywordView.updateKeywordsView(listName[1], this._applianceArray)
                }
                this._keywordView.updateKeywordsView(listName[1], updatedUstensil)
            }
        }
        
    }
    
    /**
    * Méthode permettant de récupérer les mots clés en supprimant les doublons avec l'obet new Set
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
            newArraySet = new Set(array.map(item => item[itemKey][0].toLowerCase()))
        } else {
            itemKey = Object.keys(array[0]).filter(key => key !== keyToExclude)
            newArraySet = new Set(array.map(item => item[itemKey].toLowerCase()))
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
    
    search(inputWord, type) {
        const userNewSearch = new Search(this._recipeModel)
        let searchResult = []
        
        searchResult = userNewSearch.search(inputWord, type)
        
        return searchResult
    }
    
    async updateDisplay() {
        
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