//Author: Amann Malik
//https://github.com/amannm/WebDeviceMetrics

var getZoom = (function() {
        if ('deviceXDPI' in screen) {
            if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
                var msViewportStyle = document.createElement("style");
                msViewportStyle.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}"));
                document.head.appendChild(msViewportStyle);
                return function() {
                    if (window.matchMedia('(orientation: landscape)').matches) {
                        return Math.round(screen.height / document.documentElement.clientWidth * 1000) / 1000;
                    }
                    else {
                        return Math.round(screen.width / document.documentElement.clientWidth * 1000) / 1000;
                    }
                };
            }
            else {
                return function() {
                    return screen.deviceXDPI / screen.logicalXDPI;
                };
            }
        }
        else {
            if ('opera' in window && window.outerWidth) {
                return function() {
                    return Math.floor((window.outerWidth / window.innerWidth) * 1000) / 1000;
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
                            return pageZoom * window.devicePixelRatio;
                        };
                    }
                    else {
                        return function() {
                            return window.devicePixelRatio;
                        };
                    }
                }
                else {
                    return function() {
                        return 1;
                    };
                }
            }
        }
    })();
