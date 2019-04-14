/*
 * BOARDWALK REIT
 * All Rights Reserve
*/

(function(window, document, $) {
    $(document).ready(function () {
        window.bwalk.form.applyMasking();
    });

    function scrollTop() {
        $('body, html').animate({ scrollTop: $('#opportunity-form').offset().top - 50 });
    }

    $(document).on('click touch', '#opportunity-form-submit-btn', function (e) {
        if (e && typeof e.preventDefault === 'function') {
            e.preventDefault();
        }
        var successMessage = $(this).attr('data-success-message');
        var form = document.getElementById('opportunity-form');
        if ($(form).valid()) {
            var data = new FormData(window.bwalk.form.sanatize(form.id));
            $.ajax({
                type: 'POST',
                url: form.getAttribute('action'),
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response.success) {
                        window.bwalk.alert.open('alert-success', '', successMessage);
                    }

                    form.parentNode.innerHTML = response.view;
                    window.bwalk.form.applyMasking();
                    scrollTop();
                    window.bwalk.form.resetValidation(form.id);
                }, error: function () { window.bwalk.alert.open('alert-warning', '', 'Failed'); }
            });
        } else { window.bwalk.form.focusFirstError(form.id); }
    });
}(window, document, $));
