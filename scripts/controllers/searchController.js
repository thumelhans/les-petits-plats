export class Search {
    constructor(recipes, type){
        this._word
        this._type = type
        this._recipeName = recipes.getRecipeName()
        this._recipeDescription = recipes.getRecipeDescription()
        this._recipeIngredient = recipes.getRecipeIngredients()
    }
    
    search(word){
        this._word = word
        if(this._word){
            let searchResult = []
            
            const mainTypeSearchResult = this.mainTypeSearch()
            
            mainTypeSearchResult.forEach(resultID => {
                searchResult.push(resultID)
            })
            
            return searchResult
        }
        
    }
    
    mainTypeSearch(){
        const mainTypeSearchResult = []
        const nameResult = this.nameSearch()
        const descriptionResult = this.descriptionSearch()
        const ingredientResult = this.ingredientSearch()
        
        nameResult.forEach(resultID => {
            let isDuplicate = false
            for(let i = 0; i < mainTypeSearchResult.length; i++){
                if (resultID === mainTypeSearchResult[i]){
                    isDuplicate = true
                    break
                }
            }
            
            if(!isDuplicate){
                mainTypeSearchResult.push(resultID)
            }
        })
        
        descriptionResult.forEach(resultID => {
            let isDuplicate = false
            for(let i = 0; i < mainTypeSearchResult.length; i++){
                if (resultID === mainTypeSearchResult[i]){
                    isDuplicate = true
                    break
                }
            }
            
            if(!isDuplicate){
                mainTypeSearchResult.push(resultID)
            }
        })
        
        ingredientResult.forEach(resultID => {
            let isDuplicate = false
            for(let i = 0; i < mainTypeSearchResult.length; i++){
                if (resultID === mainTypeSearchResult[i]){
                    isDuplicate = true
                    break
                }
            }
            
            if(!isDuplicate){
                mainTypeSearchResult.push(resultID)
            }
        })
        
        return mainTypeSearchResult
    }
    
    nameSearch(){
        let nameResultSearch = []
        
        for(let i = 0; i < this._recipeName.length; i++){
            const wordsArray = this._recipeName[i].name.split(' ')
            
            for(let j = 0; j < wordsArray.length; j++){
                const partialMatch = this.isPartialMatch(
                    this.removeAccents(this._word.toLowerCase()), this.removeAccents(wordsArray[j].toLowerCase()))
                if(partialMatch){
                    nameResultSearch.push(this._recipeName[i].id)
                    console.log('Name: ', wordsArray[j], this._recipeName[i].id)
                    break
                }
            }
        }
        
        return nameResultSearch
    }
        
    descriptionSearch(){
        let descriptionResultSearch = []
        
        for(let i = 0; i < this._recipeDescription.length; i++){
            const wordsArray = this._recipeDescription[i].description.split(' ')

            for(let j = 0; j < wordsArray.length; j++){
                const partialMatch = this.isPartialMatch(
                    this.removeAccents(this._word.toLowerCase()), this.removeAccents(wordsArray[j].toLowerCase()))
                if(partialMatch){
                    console.log('Desciption: ', wordsArray[j], this._recipeDescription[i].id)
                    descriptionResultSearch.push(this._recipeDescription[i].id)
                    break
                }
            }

        }

        return descriptionResultSearch
    }

    ingredientSearch(){
        let ingredientResultSearch = []

        for(let i = 0; i < this._recipeIngredient.length; i++){
            const listOfIngredient = this._recipeIngredient[i].ingredients

            listOfIngredient.forEach(ingredient => {
                const wordsArray = ingredient.split(' ')

                for(let j = 0; j < wordsArray.length; j++){
                    const partialMatch = this.isPartialMatch(
                        this.removeAccents(this._word.toLowerCase()), this.removeAccents(wordsArray[j].toLowerCase()))
                    if(partialMatch){
                        console.log('Ingrédients: ', wordsArray[j], this._recipeIngredient[i].id)
                        ingredientResultSearch.push(this._recipeIngredient[i].id)
                        break
                    }
                }
                
            })
            
        }
        
        return ingredientResultSearch
    }
    
    isPartialMatch(word, targetWord) {
        if (word === '' || targetWord === '') {
            return false
        }
        
        let wordIndex = 0
        
        for (let i = 0; i < targetWord.length; i++) {
            const currentChar = targetWord[i]
            
            if (currentChar === word[wordIndex]) {
                wordIndex++
                
                if (wordIndex === word.length) {
                    return true
                }
            } else {
                wordIndex = 0
            }
        }
        
        return false
    }
    
    removeAccents(word) {
        const accentsMap = {
            'à': 'a', 'á': 'a', 'â': 'a', 'ä': 'a', 'ã': 'a', 'å': 'a',
            'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
            'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
            'ò': 'o', 'ó': 'o', 'ô': 'o', 'ö': 'o', 'õ': 'o', 'ø': 'o',
            'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',
            'ñ': 'n', 'ç': 'c',
        }
        
        let result = ''
        
        for (let i = 0; i < word.length; i++) {
            const char = word[i]
            if (accentsMap[char]) {
                result += accentsMap[char]
            } else {
                result += char
            }
        }
        
        return result
    }
}