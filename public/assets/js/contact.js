/*
 * BOARDWALK REIT
 * All Rights Reserve
*/

(function(window, document, $) {
    $(document).ready(function () {
        window.bwalk.form.applyMasking();
    });

    $(document).on('click touch', '.contact-form-submit-btn', function (e) {
        if (e && typeof e.preventDefault === 'function') {
            e.preventDefault();
        }
        var formId = $(this).attr('data-form');
        var successMessage = $(this).attr('data-success-message');
        var form = document.getElementById(formId);
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
                        $('#modal').modal('hide');
                        $('.alert-close').focus();
                    } else {
                        var section = document.getElementById('contact-form-' + formId);
                        if (section) {
                            section.scrollIntoView();
                        }
                    }

                    var target = document.getElementById('contact-form-' + formId);
                    target.parentNode.innerHTML = response.view;
                    window.bwalk.form.resetValidation(formId);
                    window.bwalk.form.applyMasking();
                },
                error: function () {
                    window.bwalk.alert.open('alert-warning', '', 'Failed');
                    $('.alert-close').focus();
                }
            });
        } else { window.bwalk.form.focusFirstError(form.id); }
    });
}(window, document, $));
