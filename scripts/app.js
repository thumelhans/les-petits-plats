import { recipes } from './recipes.js'
import { RecipeController } from './controllers/recipeController.js'

/**
 * Fonction gérant l'initialisation de l'application
 *
 */
function startApp(){
    document.addEventListener('DOMContentLoaded', () => {
        const recipeController = new RecipeController(recipes)
    
        recipeController.init()
    })
}

startApp()