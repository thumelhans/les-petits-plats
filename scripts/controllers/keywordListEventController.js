import { createHtmlElement } from "../views/htmlElementConstructor.js"

export class KeywordListEvent {
    constructor(){
        this._menuQuery = document.querySelectorAll('#tag-search ul')
        this._menuHeading = '.tag-search-heading'
        this._menuChevronDown = '.bi-chevron-down'
        this._menuChevronUp = '.bi-chevron-up'
        this._formClose
        this._selectedKeywordElement = null
        this._isSelectedKeywordAdded = false
        this._keywordEraseIconList = []
        this._updatedkeywordEraseIconList
        this._selectedLi = []
        this._selectedTag = []
        this._addedKeywordElements = []
        this._onKeywordElementsUpdateCallback = null
    }
    
    main(){
        this.menuEvent()
        
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
        document.addEventListener('mousedown', (e) => {
            
            if(e.target.classList.value !== 'bi bi-x'){
                if(eventTarget.classList.contains('open') && !eventTarget.contains(e.target)){
                    this.closeMenu(eventTarget)
                    this.selectedKeywordHoverEvent(eventTarget.id)
                }
            }
            
        })
    }
    
    menuEvent(){
        this._menuQuery.forEach(menu => {
            
            menu.addEventListener('click', async (e) => {
                e.preventDefault()
                e.stopPropagation()
                
                const menuHeadingQuery = document.querySelector(`#${menu.id} ${this._menuHeading}`)
                const keyListQuery = document.querySelectorAll('.key-list li')
                
                keyListQuery.forEach(keyLi => {
                    if(e.target.id === keyLi.id){
                        
                        this.keywordEvent(menu.id, keyLi)
                    }
                })
                
                if(!menu.classList.contains('open')) {
                    this.openMenu(menu)
                } else {
                    if(menuHeadingQuery.contains(e.target)){
                        this.closeMenu(menu)
                    }
                }
                
                this.selectedKeywordHoverEvent(menu.id)
                
                
            })
            this.altCloseEvent(menu)
            
        })
        
    }
       
    keywordEvent(menuId, keyLi){
        
        const keywordList = document.querySelector(`#${menuId} .key-list`)

        if(!this._isSelectedKeywordAdded || this._selectedKeywordElement.id !== `selected-${menuId}`){
            const selectedKeywordClass = [`selected-keyword`]
            const selectedKeywordId = `selected-${menuId}`
            this._selectedKeywordElement = createHtmlElement('div', selectedKeywordClass, selectedKeywordId)
            keywordList.before(this._selectedKeywordElement)
            this._isSelectedKeywordAdded = true
        }
        
        let clonedKeyword
        if (keyLi && keyLi.parentNode) {
            
            if(keyLi.parentNode.id === menuId){
                clonedKeyword = keyLi.cloneNode(true)
                this._selectedKeywordElement.append(clonedKeyword)
            }else{
                console.log('Create before Return: ', this._addedKeywordElements)
                return
            }
        }
        
        if(!keyLi.classList.contains('hidden')){
            keyLi.classList.add('hidden')
        }
        
        this.updateKeywordElements(clonedKeyword)
    }
    
    selectedKeywordHoverEvent(menuId){
        
        const selectedMenu = document.querySelector(`#${menuId}`)
        this._selectedTag = document.querySelectorAll('#selected-tag li')
        
        if (selectedMenu.classList.contains('open')){
            
            if(!this._selectedKeywordElement){
                return
            }
            
            this._selectedLi = this._selectedKeywordElement.querySelectorAll('li')
            
            this._selectedLi.forEach((element) => {
                
                if (!element.querySelector('i')) {
                    const selectedKeywordClass = ['bi', 'bi-x', 'keyword-erase', 'hidden']
                    const selectedKeywordId = `erase-${element.id}`
                    const keywordEraseIcon = createHtmlElement('i', selectedKeywordClass, selectedKeywordId)
                    element.append(keywordEraseIcon)
                }
                
                const eraseIcon = element.querySelector('i')
                const eraseIconTest = eraseIcon.id.substring(6)
                
                element.addEventListener('mouseenter', (e) => {
                    
                    
                    if(e.target.id === eraseIconTest){
                        eraseIcon.classList.remove('hidden')
                    }else {
                        return
                    }
                    
                })
                
                element.addEventListener('mouseleave', (e) => {
                    
                    if(e.target.id === eraseIconTest){
                        eraseIcon.classList.add('hidden')
                    }else {
                        return
                    }
                })
                
            })
            
            if(this._selectedLi){
                let iconClicked = false
                
                for (const iconObj of this._selectedLi) {
                    
                    const icon = iconObj.querySelector('i')
                    
                    icon.addEventListener('click', (e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        
                        if (e.target.id === icon.id) {
                            
                            this.eraseSelectedKeyword(iconObj, menuId)
                        }
                        
                        iconClicked = true
                    })
                    
                    if (iconClicked) {
                        break
                    }
                }
            } else {
                return
            }
            
        }else{
            
            if(this._selectedTag){
                let iconClicked = false
                
                for (const iconObj of this._selectedTag) {
                    
                    const icon = iconObj.querySelector('i')
                    
                    icon.addEventListener('click', (e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        
                        if (e.target.id === icon.id) {
                            this.eraseSelectedKeyword(iconObj, menuId)
                        }
                        
                        iconClicked = true
                    })
                    
                    if (iconClicked) {
                        break
                    }
                }
            }else{
                return
            }
        }
    }
    
    eraseSelectedKeyword(target, menuId){
        
        console.log(target)
        this._selectedLi = document.querySelectorAll('.selected-keyword')

        console.log(this._selectedTag)
        
        for (let i = this._selectedTag.length - 1; i >= 0; i--) {
            const tag = this._selectedTag[i]
            const testingId = tag.id.substring(4)
    
            // console.log('Tag: ', tag.id);
            // console.log('Target: ', targetId);
            // console.log('Résultat: ', targetId === tag.id);
    
            if (tag.id === target.id || testingId === target.id) {
                console.log('Suppression depuis l élément lui-même ou le menu')
                console.log('Tag: ', tag)
                tag.remove()
            }
        }

        // this._selectedTag.forEach(tag => {
            
        //     console.log('Tag: ', tag.id)
        //     console.log('Target: ', target.id)
        //     console.log('Résultat: ', target.id === tag.id)
            
        //     // Permet du supprimer l'élément HTML soit par le biais de l'élément lui même, 
        //     // soit par le biais de l'élément présent dans le menu déroulant
        //     const testingId = tag.id.substring(4)
        //     console.log('TestingId: ', testingId)
        //     if(tag.id === target.id){
        //         console.log('Suppression depuis l élément lui même')
        //         tag.remove()
        //     } else if (testingId === target.id){
        //         console.log('Suppression depuis le menu')
        //         tag.remove()
        //     }
        // })
        
        this._selectedLi.forEach(keywordContainer => {
            
            const testingId = target.id.substring(4)
            
            for(const child of keywordContainer.children){
                if(target.id === child.id){
                    target.remove()
                    
                    const hiddenLi = document.querySelectorAll(`#${menuId} .key-list li`)
                    
                    hiddenLi.forEach(hiddenElem => {
                        if(hiddenElem.id === target.id){
                            hiddenElem.classList.remove('hidden')
                        }
                    })
                    // this.updateKeywordElements(child)
                }else if (testingId === child.id){
                    child.remove()
                    
                    const hiddenLi = document.querySelectorAll(`#${menuId} .key-list li`)
                    
                    hiddenLi.forEach(hiddenElem => {
                        if(hiddenElem.id === child.id){
                            hiddenElem.classList.remove('hidden')
                        }
                    })
                    // this.updateKeywordElements(child)
                }
            }
            
        })
        

    }
    
    onKeywordElementsUpdate(callback) {
        this._onKeywordElementsUpdateCallback = callback
    }
    
    updateKeywordElements(updatedElements) {

        if (this._onKeywordElementsUpdateCallback) {
            this._onKeywordElementsUpdateCallback(updatedElements)
        }
    }
}
