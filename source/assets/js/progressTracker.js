/*
 * BOARDWALK REIT
 * All Rights Reserve
*/

(function(window, document, $) {
    $(document).ready(function () {
        window.bwalk.form.applyMasking();
    });

    $(document).on('click touch', '.previous, .next, .edit, .page-item:not(.disabled)', function () {
        var current = $('li.active').attr('data-step');
        var next = $(this).attr('data-step');
        if (parseInt(next) < parseInt(current)) {
            setActiveStep(next);
        } else if (validate(current)) { setActiveStep(next); }
    });

    function scrollTop() {
        $('body, html').animate({ scrollTop: $('#contractor-form').offset().top - 50 });
    }

    function validate(step) {
        var valid = true;
        var validator = $('#contractor-form').validate();
        var section = $('#step-' + step);
        section.find('input, select, textarea').each(function() {
            var element = this;
            var type = $(element).attr('type');
            if (type === 'checkbox' || type === 'radio') return true;
            if (!validator.element(element)) {
                valid = false;
            }
            return true;
        });

        return valid;
    }

    function setActiveStep(step) {
        $('.step').hide();
        $('.form-steps > li').each(function() {
            var element = $(this);
            element.removeClass('active');
            if (element.attr('data-step') === step) {
                element.addClass('active').removeClass('disabled');
            }
        });
        var section = $('#step-' + step);
        $('.step-name').text(section.data('name'));
        if (step === '7') { setReviewSection(); }
        section.show();
        scrollTop();
    }

    function setReviewSection() {
        $('#contractor-form').find('input, select, textarea').each(function() {
            var element = $(this);
            var type = element.attr('type');
            if (type === 'checkbox') return;
            var id = element.attr('id');
            var prefix = '#rev';
            if (type === 'text' || type === 'tel' || type === 'datetime' || type === 'hidden' || element.is('textarea')) {
                $(prefix + id).html(element.val());
            } else if (element.is('select')) {
                $(prefix + id).html(element.find(':selected').text());
            } else if (type === 'radio') {
                if (element.is(':checked')) {
                    $(prefix + element.attr('name')).html(element.next().text());
                }
            }
        });

        $('#revServiceAreas').html(
            $.map($('#service-areas').find('input:checkbox:checked'), function (checkbox) {
                return ($(checkbox).parent().children('label').text()).replace(/,/g, '');
            }).join(', ')
        );

        $('#revWorkTypes').html(
            $.map($('#work-types').find('input:checkbox:checked'), function (checkbox) {
                return $(checkbox).parent().children('label').text();
            }).join(', ')
        );
    }

    $(document).on('click touch', '#contractor-form-submit', function (e) {
        if (e && typeof e.preventDefault === 'function') {
            e.preventDefault();
        }
        var successMessage = $(this).attr('data-success-message');
        var form = document.getElementById('contractor-form');
        var data = new FormData(form);
  
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
    });
}(window, document, $));
