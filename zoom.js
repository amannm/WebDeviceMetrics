//Author: Amann Malik
//https://github.com/amannm/WebDeviceMetrics

var getZoom = function() {
    if ('deviceXDPI' in screen) {
        //Microsoft
        if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
            //Windows Phone 8
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
            //Non-Windows Phone 8
            return function() {
                return screen.deviceXDPI / screen.logicalXDPI;
            };
        }
    }
    else {
        if ('devicePixelRatio' in window) {
            //Webkit, Firefox, Opera
            var dpra = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(window), 'devicePixelRatio');
            if (dpra === 'undefined') {
                //Webkit, Opera
                if (window.devicePixelRatio === 1) {
                    //Either wrong or simply an unzoomed device
                    if ('opera' in window) {
                        //trick should work on Opera Desktop
                        //should have no effect where dpr is legitimate 1
                        var operaZoomLevels = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0];
                        return function() {
                            return snapZoom(window.outerWidth / window.innerWidth, 8, operaZoomLevels);
                        };
                    }
                    else {
                        if ('webkitTextSizeAdjust' in document.body.style) {
                            //mobile webkit or older Desktop builds of Webkit
                            //the following shouldn't make any difference on the legitimate 1 dpr devices
                            return function() {
                                var div = document.createElement('div');
                                div.setAttribute('style', 'font-size: 10000px; height: 1em; -webkit-text-size-adjust: none;');
                                document.body.appendChild(div);
                                var pageZoom = Math.round((10000 / div.clientHeight) * 1000) / 1000;
                                document.body.removeChild(div);
                                return pageZoom * window.devicePixelRatio;
                            };
                        }
                        else {
                            //Newer webkit desktop (spring 2013) build removes the above trick, but allows the use of this new trick that is similar to the opera one
                            var chromeZoomLevels = [0.25, 0.33, 0.5, 0.67, 0.75, 0.9, 1, 1.1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4, 5];
                            return function() {
                                return snapZoom(window.outerWidth / window.innerWidth, 6, chromeZoomLevels)
                            };
                        }
                    }
                }
                else {
                    //It's not a usually bogus "1" . Most likely a legitimate devicePixelRatio value on a mobile device
                    return function() {
                        return window.devicePixelRatio;
                    };
                }
            }
            else {
                //Firefox Desktop's lovely dynamic pageZoom involving devicePixelRatio getter
                return dpra.get;
            }
        }
        else {
            //Things without deviceXDPI and devicePixelRatio  
            return function() {
                return 1;
            };
        }
    }
};

var snapZoom = function(number, startIndex, arr) {
    if (Math.abs(arr[startIndex] - number) > Math.abs(arr[startIndex + 1] - number)) {
        for (var count = startIndex + 1; count < arr.length - 1; count++) {
            if (Math.abs(arr[count] - number) < Math.abs(arr[count + 1] - number)) {
                return arr[count];
            }
        }
    }
    else {
        if (Math.abs(arr[startIndex] - number) > Math.abs(arr[startIndex - 1] - number)) {
            for (var count = startIndex - 1; count > 0; count--) {
                if (Math.abs(arr[count] - number) < Math.abs(arr[count - 1] - number)) {
                    return arr[count];
                }
            }
        }
        else {
            return arr[startIndex];
        }
    }
};
