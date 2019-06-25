export function debounce(func, delay) {
    /**
      * @source https://medium.com/@_jh3y/throttling-and-debouncing-in-javascript-b01cad5c8edf
      * @example
      * const myEl = document.querySelector('div')
      * myEl.addEventListener('click', throttle(
      *     ()=> console.log('debounce()'),
      *     1000
      * )
      * myEl.click()
      * myEl.click()
      * // 1000ms later
      * ... 'debounce()'
      */
    let inDebounce = undefined
    return function () {
        const context = this
        const args = arguments
        clearTimeout(inDebounce)
        return inDebounce = setTimeout(function () {
            return func.apply(context, args)
        }, delay)
    }
}

export function throttle(func, limit) {
    /**
     * @source Same as debounce function
     * @example
     * const myEl = document.querySelector('div')
     * myEl.addEventListener('click', throttle(
     *     ()=> console.log('throttle()'),
     *     1000
     * )
     * myEl.click()
     * ... 'throttle()'
     * myEl.click()
     * // 1000ms later
     * ... 'throttle()'
     * 
     */
    let inThrottle = false
    let lastFunc = undefined
    let throttleTimer = undefined
    return function () {
        let context = this
        let args = arguments
        if (inThrottle) {
            clearTimeout(lastFunc)
            // noinspection JSValidateTypes
            return lastFunc = setTimeout(function () {
                func.apply(context, args)
                return inThrottle = false
            }, limit)
        } else {
            func.apply(context, args)
            // noinspection JSValidateTypes
            inThrottle = true
            // noinspection JSValidateTypes
            return throttleTimer = setTimeout(function () {
                return inThrottle = false
            }, limit)
        }
    }
}


/**
 * @func titleCase
 * @param {String} str
 * @returns {String}
 * @example
 * titleCase('mY shIfT KeY IS BroKEn')
 * >>> 'My Shift Key Is Broken'
 */
export const titleCase = (str)=> str.replace(/\w\S*/g, (txt)=>
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
)

/**
 * @func kabobCase
 * @param {String} str
 * @returns {String}
 * @example
 * kabobCase('HelloWorld')
 * >>> 'Hello-world'
 */
export const kabobCase = (str)=> str.replace(/([A-Z])/g, ($1)=> "-"+$1.toLowerCase())

/**
 * @func camelCase
 * @param {String} str
 * @returns {String}
 * @example
 * camelCase('Hello-world')
 * >>> 'HelloWorld'
 */
export const camelCase = (str)=> str.replace(/(\-[a-z])/g, ($1)=> $1.toUpperCase().replace('-',''))

