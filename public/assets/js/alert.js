/*
 * BOARDWALK REIT
 * All Rights Reserve
*/

(function(window, document, $) {
    window.bwalk = window.bwalk || {};
    window.bwalk.alert = window.bwalk.alert || {};

    window.bwalk.alert.open = function(type, heading, text) {
        $('.alert').addClass(type);
        if (heading) {
            $('.alert').append('<h4 class="alert-heading mb-0">' + heading + '</h4>');
        }
        if (text) {
            $('.alert').append('<p class="mb-0">' + text + '</p>');
        }
        $('.alert').fadeIn();
    };

    window.bwalk.alert.close = function() {
        $('.alert').hide();
        $('.alert').removeClass(function (index, css) {
            return (css.match(/\balert-\S+/g) || []).join(' ');
        });
        $('.alert h4').remove();
        $('.alert p').remove();
    };

    $(document).on('click touch', '.alert-close', window.bwalk.alert.close);
}(window, document, $));
