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

//设置cookie
export const setCookie = (c_name, c_pwd, exdays) => {
    var exdate = new Date(); //获取时间
    exdate.setDate(exdate.getDate() + exdays); //保存的天数
    //字符串拼接cookie
    document.cookie = c_name + "=" + c_pwd + ((exdays == null) ? "" : ";expires=" + exdate.toGMTString())
}

//读取cookie
export const getCookie = (name) => {
    var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if(arr = document.cookie.match(reg))
    return (arr[2]);
    else
    return null
}
//清除cookie
export const clearCookie = (name) => {
    var exp  = new Date()
    exp.setTime(exp.getTime() - 1);
    var cval = gatCookie(name);
    if(cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();

}
