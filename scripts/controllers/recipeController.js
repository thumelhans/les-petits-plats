import { RecipeModel } from '../models/recipeModel.js'
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

    init () {
        this.displayRecipe()
        
    }
    
    displayRecipe() {
        //Fonction principale de Display des recette
        const recipesList = this._recipeModel.getRecipe()
        const recipeView = recipesList.map((recipe) => new RecipeCardView(recipe))
        
        recipeView.forEach(recipe => {
            recipe.createRecipeCard()
        })
    }
}