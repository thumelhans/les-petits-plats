export class KeywordListEvent {
    constructor(){
        this._menuQuery = document.querySelectorAll('#tag-search ul')
        this._menuHeading = '.tag-search-heading'
        this._menuChevronDown = '.bi-chevron-down'
        this._menuChevronUp = '.bi-chevron-up'
        this._formClose
    }
    
    main(){
        
        this._menuQuery.forEach(menu => {
            menu.addEventListener('click', (e) => {
                e.preventDefault()
                
                const menuHeadingQuery = document.querySelector(`#${menu.id} ${this._menuHeading}`)
                const formQuery = document.querySelector(`#${menu.id} form`)
                const keywordQuery = document.querySelector(`#${menu.id} li`)
                
                if(!menu.classList.contains('open')) {
                    this.openMenu(menu)
                } else {
                    if(menuHeadingQuery.contains(e.target)){
                        this.closeMenu(menu)
                    }
                }
                
                this.altCloseEvent(menu)
                
                if(formQuery.contains(e.target)){
                    console.log('J applique la recherche de mot clé')
                }
                
                if(keywordQuery.contains(e.target)){
                    console.log('Je selectionne le mot clé')
                }
                
            })
        })
        
    }
    
    openMenu(eventTarget){
        
        const chevronDownQuery = document.querySelector(`#${eventTarget.id} ${this._menuChevronDown}`)
        const menuHeadingQuery = document.querySelector(`#${eventTarget.id} ${this._menuHeading}`)
        
        eventTarget.classList.toggle('open')
        
        chevronDownQuery.classList.toggle('bi-chevron-up')
        chevronDownQuery.classList.toggle('bi-chevron-down')
        
        eventTarget.classList.toggle('close-height')
        menuHeadingQuery.classList.toggle('close-margin')
        
    }
    
    closeMenu(eventTarget){
        
        const chevronUpQuery = document.querySelector(`#${eventTarget.id} ${this._menuChevronUp}`)
        const menuHeadingQuery = document.querySelector(`#${eventTarget.id} ${this._menuHeading}`)
        
        eventTarget.classList.toggle('open')
        
        chevronUpQuery.classList.toggle('bi-chevron-up')
        chevronUpQuery.classList.toggle('bi-chevron-down')
        
        eventTarget.classList.toggle('close-height')
        menuHeadingQuery.classList.toggle('close-margin')
        
    }
    
    altCloseEvent(eventTarget){
        document.addEventListener('click', (e) => {
            e.preventDefault()

            if(e.target.classList.value !== 'bi bi-x'){
                if(eventTarget.classList.contains('open') && !eventTarget.contains(e.target)){
                    this.closeMenu(eventTarget)
                }
            }
            
        })
    }
}
