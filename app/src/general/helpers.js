'use strict';

export function debounce (func, wait, immediate) {

    var timeout;
    return function () {

        var self = this;
        var args = arguments;
        var later = function () {

            timeout = null;
            if (!immediate) {
                func.apply(self, args);
            }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(self, args);
        }
    };
}

function easeInOutQuad (t, b, c, d) {

    t /= d / 2;
    if (t < 1) {
        return c / 2 * t * t + b;
    }
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}

export function scrollTo (element, to, duration) {

    var start = element.scrollTop;
    var change = to - start;
    var currentTime = 0;
    var increment = 20;

    var animateScroll = () => {

        currentTime += increment;
        var val = easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if (currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}
