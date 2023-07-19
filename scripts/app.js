import { recipes } from './recipes.js'
import { RecipeController } from './controllers/recipeController.js'

//Initialise le controller

function startApp(){
    document.addEventListener('DOMContentLoaded', () => {
        const recipeController = new RecipeController(recipes)
    
        recipeController.init()
    })
}

startApp()