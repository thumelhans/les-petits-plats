export class Search {
    constructor(recipes){
        this._word
        this._recipeName = recipes.getRecipeName()
        this._recipeDescription = recipes.getRecipeDescription()
        this._recipeIngredient = recipes.getRecipeIngredients()
        this._recipeAppliance = recipes.getRecipeAppliances()
        this._recipeUstensil = recipes.getRecipeUstensils()
    }
    
    search(word, type){
        this._word = word
        if(this._word){
            let searchResult = []
            
            if(type === 'main'){
                const mainTypeSearchResult = this.mainTypeSearch()
                
                mainTypeSearchResult.forEach(resultID => {
                    searchResult.push(resultID)
                })
            }else if(type === 'tag'){
                const tagTypeSearchResult = this.tagTypeSearch()
                
                tagTypeSearchResult.forEach(resultID => {
                    searchResult.push(resultID)
                })
            }
            
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

    tagTypeSearch(){
        const tagTypeSearchResult = []
        const applianceResult = this.applianceSearch()
        const ustensilResult = this.ustensilSearch()
        const ingredientResult = this.ingredientSearch()
                
        applianceResult.forEach(resultID => {
            let isDuplicate = false
            for(let i = 0; i < tagTypeSearchResult.length; i++){
                if (resultID === tagTypeSearchResult[i]){
                    isDuplicate = true
                    break
                }
            }
            
            if(!isDuplicate){
                tagTypeSearchResult.push(resultID)
            }
        })
        
        ustensilResult.forEach(resultID => {
            let isDuplicate = false
            for(let i = 0; i < tagTypeSearchResult.length; i++){
                if (resultID === tagTypeSearchResult[i]){
                    isDuplicate = true
                    break
                }
            }
            
            if(!isDuplicate){
                tagTypeSearchResult.push(resultID)
            }
        })
        
        ingredientResult.forEach(resultID => {
            let isDuplicate = false
            for(let i = 0; i < tagTypeSearchResult.length; i++){
                if (resultID === tagTypeSearchResult[i]){
                    isDuplicate = true
                    break
                }
            }
            
            if(!isDuplicate){
                tagTypeSearchResult.push(resultID)
            }
        })
        
        return tagTypeSearchResult
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
                        ingredientResultSearch.push(this._recipeIngredient[i].id)
                        break
                    }
                }
                
            })
            
        }
        
        return ingredientResultSearch
    }
    
    applianceSearch(){
        let applianceResultSearch = []

        for(let i = 0; i < this._recipeAppliance.length; i++){
            const wordsArray = this._recipeAppliance[i].appliance.split(' ')
            
            for(let j = 0; j < wordsArray.length; j++){
                const partialMatch = this.isPartialMatch(
                    this.removeAccents(this._word.toLowerCase()), this.removeAccents(wordsArray[j].toLowerCase()))
                if(partialMatch){
                    applianceResultSearch.push(this._recipeAppliance[i].id)
                    break
                }
            }
        }
        
        return applianceResultSearch
    }

    ustensilSearch(){
        let ustensilResultSearch = []

        for(let i = 0; i < this._recipeUstensil.length; i++){
            const listOfUstensil = this._recipeUstensil[i].ustensils

            listOfUstensil.forEach(ustensil => {
                const wordsArray = ustensil.split(' ')

                for(let j = 0; j < wordsArray.length; j++){
                    const partialMatch = this.isPartialMatch(
                        this.removeAccents(this._word.toLowerCase()), this.removeAccents(wordsArray[j].toLowerCase()))
                    if(partialMatch){
                        ustensilResultSearch.push(this._recipeUstensil[i].id)
                        break
                    }
                }
                
            })
            
        }
        
        return ustensilResultSearch
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