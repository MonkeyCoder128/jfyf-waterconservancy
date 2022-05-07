/**
 * 函数防抖 (只执行最后一次点击)
 * @param fn
 * @param delay
 * @returns {Function}
 * @constructor
 */
export const Debounce = (fn, t) => {
    let delay = t || 500
    let timer = null
    return function () {
        let args = arguments
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(() => { //因为是箭头函数 所以this指向里面可以直接用
            fn.apply(this, args)
        }, delay)
    }
};

/**
 * 函数节流
 * @param fn
 * @param interval
 * @returns {Function}
 * @constructor
 */
export const Throttle = (fn, t) => {
    let last
    let timer
    let interval = t || 500
    return function () {
        let args = arguments
        let now = +new Date()
        if (last && now - last < interval) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                last = now
                fn.apply(this, args)
            }, interval)
        } else {
            last = now
            fn.apply(this, args)
        }
    }
}

