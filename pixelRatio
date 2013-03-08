    //Author: Amann Malik
    //This function returns a function that, when called, sets var pixelRatio to be equal to pageZoom * systemZoom
    //systemZoom is either the DPI setting in windows or the viewport scaling on devices that support meta viewport
    //pageZoom is usually used on desktop style browsers and allow users to manually zoom the contents of a webpage using some keyboard shortcuts

var updatePixelRatio = (function() {
        if ('deviceXDPI' in screen) {
            if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
                var msViewportStyle = document.createElement("style");
                msViewportStyle.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}"));
                document.head.appendChild(msViewportStyle);
                return function() {
                    if (window.matchMedia('(orientation: landscape)').matches) {
                        pixelRatio = Math.round(screen.height / document.documentElement.clientWidth * 1000) / 1000;
                    }
                    else {
                        pixelRatio = Math.round(screen.width / document.documentElement.clientWidth * 1000) / 1000;
                    }
                };
            }
            else {
                return function() {
                    pixelRatio = screen.deviceXDPI / screen.logicalXDPI;
                };
            }
        }
        else {
            if ('opera' in window && window.outerWidth) {
                return function() {
                    pixelRatio = Math.floor((window.outerWidth / window.innerWidth) * 1000) / 1000;
                };
            }
            else {
                if ('devicePixelRatio' in window) {
                    if ('webkitTextSizeAdjust' in document.body.style) {
                        var div = document.createElement('div');
                        div.setAttribute('style', 'font-size: 10000px; height: 1em; -webkit-text-size-adjust: none;');
                        return function() {
                            document.body.appendChild(div);
                            var pageZoom = Math.round((10000 / div.clientHeight) * 1000) / 1000;
                            document.body.removeChild(div);
                            pixelRatio = pageZoom * window.devicePixelRatio;
                        };
                    }
                    else {
                        return function() {
                            pixelRatio = window.devicePixelRatio;
                        };
                    }
                }
                else {
                    return function() {
                        pixelRatio = 1;
                    };
                }
            }
        }
    })();
