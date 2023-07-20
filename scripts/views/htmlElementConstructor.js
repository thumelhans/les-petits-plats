/**
 * Méthode permettant la création d'éléments HTML
 *
 * @param {string} type
 * @param {array} classes
 * @param {array or object} idOrAttributes
 * @param {object} attributes
 * @return {HTMLElement} 
 * @memberof RecipeCardView
 */
export function createHtmlElement(type, classes, idOrAttributes, attributes) {
    const htmlElement = document.createElement(type)
    
    if(classes && Array.isArray(classes)) {
        classes.forEach((className) => {
            htmlElement.classList.add(className)
        })
    }
    
    if (typeof idOrAttributes === 'string') {
        htmlElement.id = idOrAttributes
    } else if (typeof idOrAttributes === 'object') {
        for (const attr in idOrAttributes) {
            htmlElement.setAttribute(attr, idOrAttributes[attr])
        }
    }
    
    if (attributes && typeof attributes === 'object') {
        for (const attr in attributes) {
            htmlElement.setAttribute(attr, attributes[attr])
        }
    }
    
    return htmlElement
}
