/*
 * BOARDWALK REIT
 * All Rights Reserve
*/

(function(window, document, $) {
    window.bwalk = window.bwalk || {};
    window.bwalk.form = window.bwalk.form || {};

    /**
     * Handler - Sanitize form.
     * @param {any} id Form identifier
     * @return {DOMElement} Form.
     */
    window.bwalk.form.sanatize = function(id) {
        var form = document.getElementById(id);
        // Fix for issue on safari where form elements of type file with no value fails to post.
        for (var i = 0; i < form.elements.length; i++) {
            if (form.elements[i].type === 'file') {
                if (form.elements[i].value === '') {
                    form.elements[i].parentNode.removeChild(form.elements[i]);
                }
            }
        }
        return form;
    };

    /**
     * Handler - Reset form validation.
     * @param {any} id Form identifier
     */
    window.bwalk.form.resetValidation = function(id) {
        var form = $('#' + id);
        form.data('unobtrusiveValidation', null);
        form.data('validator', null);
        $.validator.unobtrusive.parse(form);
    };

    /**
     * Handler - Focus first form error.
     * @param {any} id Form identifier
     */
    window.bwalk.form.focusFirstError = function(id) {
        var form = $('#' + id);
        var validator = form.validate();
        if (validator.errorList && validator.errorList.length > 0) {
            $(validator.errorList[0].element).focus();
        }
    };

    /**
     * Handler - Apply masking
     */
    window.bwalk.form.applyMasking = function() {
        $('[type="tel"]').mask('(#00) 000-0000');
    };

    /**
     *  Handler - On change event for input of type file.
     */
    $(document).on('change', 'input[type="file"]', function() {
        var text, item = $(this), files = this.files;
        if (files && files.length > 1) {
            text = files.length + ' ' + item.attr('data-multi-file-label');
        } else if (files.length === 1) {
            text = files[0].name;
        } else { text = item.closest('.input-file').find('.input-file__name').attr('aria-label'); }
        item.closest('.input-file').find('.input-file__name').html(text);
    });

    /**
     *  Handler - Modal button click event.
     */
    $(document).on('click touch', '.modal-button', function () {
        var elem = $(this);
        var modal = $('#modal');
        modal.load(elem.attr('data-url'), '', function () {
            modal.modal();
            setTimeout(function() { $('#modal').find('button.close').focus(); }, 500);
            var formId = $(modal).find('form').attr('id');
            if (formId) {
                window.bwalk.form.resetValidation(formId);
            }
        });
    });
}(window, document, $));
