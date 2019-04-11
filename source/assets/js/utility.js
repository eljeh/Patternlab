/*
 * BOARDWALK REIT
 * All Rights Reserve
*/

(function(window, document, $) {
    // ----------------------------- Start IFramed Youtube Control -----------------------------

    /*
     * @author       Rob W (http://stackoverflow.com/a/7513356/938089
     * @description  Executes function on a framed YouTube video (see previous link)
     *               For a full list of possible functions, see:
     *               http://code.google.com/apis/youtube/js_api_reference.html
     * @param String frame_id The id of (the div containing) the frame
     * @param String func     Desired function to call, eg. "playVideo"
     * @param Array  args     (optional) List of arguments to pass to function func*/
    function callYTPlayer(frame_id, func, args) {
        if (window.jQuery && frame_id instanceof jQuery) { frame_id = frame_id.get(0).id; }
        var iframe = document.getElementById(frame_id);
        if (iframe && iframe.tagName.toUpperCase() !== 'IFRAME') {
            iframe = iframe.getElementsByTagName('iframe')[0];
        }
        if (iframe) {
            // Frame exists,
            iframe.contentWindow.postMessage(JSON.stringify({
                "event": 'command',
                "func": func,
                "args": args || [],
                "id": frame_id
            }), '*');
        }
    }

    // Slick carousel hook
    $('body').on('click touch', '.slick-nav-video-control', function () {
        var section = $(this.parentElement).first('div.slick-list')[0];
        if (section) {
            $('.youtube-iframe:not(.slick-cloned)', section).each(function () {
                try {
                    callYTPlayer(this.id, 'pauseVideo');
                } catch (e) { console.log('Could not pause youtube video.'); }
            });
        }
    });

    // ----------------------------- END IFramed Youtube Control -----------------------------
}(window, document, $));
