/**
 * @func debounce
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
export const debounce = (func, delay) => {
    let inDebounce
    return function () {
        const context = this
        const args = arguments
        clearTimeout(inDebounce)
        inDebounce = setTimeout(() => func.apply(context, args), delay)
    }
}


/**
 * @func throttle
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
export const throttle = (func, limit) => {
    let lastFunc
    let lastRan
    return function () {
        const context = this
        const args = arguments
        if (!lastRan) {
            func.apply(context, args)
            lastRan = Date.now()
        } else {
            clearTimeout(lastFunc)
            lastFunc = setTimeout(function () {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args)
                    lastRan = Date.now()
                }
            }, limit - (Date.now() - lastRan))
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
export const titleCase = (str) => str.replace(/\w\S*/g, (txt) =>
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
export const kabobCase = (str) => str.replace(/([A-Z])/g, ($1) => "-" + $1.toLowerCase())

/**
 * @func camelCase
 * @param {String} str
 * @returns {String}
 * @example
 * camelCase('Hello-world')
 * >>> 'HelloWorld'
 */
export const camelCase = (str) => str.replace(/(\-[a-z])/g, ($1) => $1.toUpperCase().replace('-', ''))


/**
 * @source: https://stackoverflow.com/a/442474
 */
export function getOffset(el) {
    let _x = 0;
    let _y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}