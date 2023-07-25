import { createHtmlElement } from "../views/htmlElementConstructor.js"

// Le but est de vérifier la conformité des infos entrées et return les data
export class FormController {
    constructor() {
        this._mainSearchForm = 'main-search-form'
        this._mainSearchFormInput = document.querySelector('#main-search')
        this._mainSearchFormButton = document.querySelector(`#${this._mainSearchForm} button`)
        this._mainSearchFormReset = document.querySelector(`#${this._mainSearchForm} .bi-x`)
        this._tagSearchFormInput = document.querySelectorAll('#tag-search form input')
        this._tagSearchFormButton = document.querySelector('#tag-search form button')
        this._searchValue = null
        this._resetInputButton
        this._updateCallback = null
        
        this.formMainSearchEvent()
        this.forTagSearchEvent()
        this.formSearchEvent()
    }

    formMainSearchEvent(){
        this.formSearchEvent(this._mainSearchFormInput, this._mainSearchFormButton)
    }

    forTagSearchEvent(){
        this._tagSearchFormInput.forEach(input => {
            this.formSearchEvent(input, this._tagSearchFormButton)
        })
    }

    formSearchEvent(input, button) {

        if(button){
            button.addEventListener('click', (e) => {
                e.preventDefault()
    
                this.updateValue(input)
                this.cleanInputField(input)
            })
        }
        
        if(input){
            input.addEventListener('keydown', (e) => {
                
                if(e.key === 'Enter'){
                    e.preventDefault()
                    
                    this.updateValue(input)
                    this.cleanInputField(input)
                }
            })

            input.addEventListener('input', (e) => {
                const userInputValue = input.value
                const regexTest = this.regexTest(userInputValue)
                
                this._resetInputButton = input.nextElementSibling
                if(!this._resetInputButton.classList.contains('bi-x')){
                    this.createResetButton(input)
    
                    this.resetButtonEvent(input)
                }
                
                if (userInputValue.length >= 3 && regexTest){
                    this.updateValue(input)
                }
            })
        }
        
    }
    
    createResetButton(input){
        const resetInputButtonClass = ['bi', 'bi-x']
        this._resetInputButton = createHtmlElement('i', resetInputButtonClass)
        input.insertAdjacentElement('afterend',this._resetInputButton)
    }
    
    resetButtonEvent(input){
        this._resetInputButton.addEventListener('click', (e) => {
            this.cleanInputField(input)
            this.updateValue('')
            this._resetInputButton.remove()
        })
    }

    updateValue(input) {
        this._searchValue = input.value
        console.log('Valeur mise à jour', this._searchValue)

        if (this._updateCallback) {
            this._updateCallback(this._searchValue)
        }
    }

    cleanInputField(input){
        input.value = ''
    }
    
    async getValue() {
        return new Promise((resolve) => {
            const intervalId = setInterval(() => {
                if (this._searchValue !== null){
                    clearInterval(intervalId)
                    resolve(this._searchValue.toLowerCase())
                    this._searchValue = null
                }
            }, 100)
        })
    }
    
    regexTest(word) {
        const regex = /^[A-Za-zÀ-ÿ][a-zÀ-ÿ-]+$/
        return regex.test(word)
    }

    setUpdateCallback(callback) {
        this._updateCallback = callback
    }

    
}
