/*
 * BOARDWALK REIT
 * All Rights Reserve
*/

(function(window, document) {
    function setCookie(name, value, days) {
        var d = new Date();
        d.setTime(d.getTime() + (days*24*60*60*1000));
        var expires = 'expires='+ d.toUTCString();
        document.cookie = name + '=' + value + ';' + expires + ';path=/';
    }

    function getBlob(data) {
        if (!window.fetch) return new Promise(function (resolve) { resolve(new Blob()); });
        return window.fetch(data).then(function(result) {
            return result.blob();
        });
    }

    function clientSupportsWebP(blob) {
        if (!window.createImageBitmap) return new Promise(function (resolve) { resolve(false); });
        return window.createImageBitmap(blob).then(function() {
            return true;
        }, function() { return false; });
    }

    if ('Promise' in window) {
        getBlob('data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=').then(function (blob) {
            clientSupportsWebP(blob).then(function(supported) {
                if (supported) {
                    setCookie('supportWebP', true, 1);
                } else { setCookie('supportWebP', false, 1); }
            });
        });
    }
}(window, document));
