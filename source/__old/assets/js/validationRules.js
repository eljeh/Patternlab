/*
 * BOARDWALK REIT
 * All Rights Reserve
*/

(function(document, $) {
    // This is required, to tackle the issue with hidden input created by html.checkboxfor along with how our label replace the clickable area for our actual checkbox.
    $(document).on('change', 'input[data-val-booleanrequiredif]', function () {
        $(this).closest('form').validate().element(this);
    });

    $.validator.unobtrusive.adapters.add('booleanrequiredif', ['propertyname', 'propertyvalue', 'expectedvalue'], function (options) {
        options.rules['booleanrequiredif'] = options.params;
    });

    $.validator.addMethod('booleanrequiredif', function (value, element, parameters) {
        var currentPropValue = (document.getElementById('VehicleRequired').value || '').toLowerCase();
        if (currentPropValue === parameters.propertyvalue.toLowerCase()) {
            return (value || '').toLowerCase() === parameters.expectedvalue.toLowerCase();
        }
        return true;
    });


    // This is required, in order to validate when a user click cancel when prompted to attach a file.
    $(document).on('change', 'input[data-val-maxfilesize]', function () {
        $(this).closest('form').validate().element(this);
    });

    $.validator.unobtrusive.adapters.add('maxfilesize', ['max'], function (options) {
        options.rules['maxfilesize'] = options.params;
    });

    $.validator.addMethod('maxfilesize', function (value, element, parameters) {
        if (element.files && element.files.length > 0) {
            var sum = 0;
            for (var i = 0; i < element.files.length; i++) {
                var item = element.files[i];
                sum = sum + item.size;
            }
            return sum <= parseFloat(parameters.max);
        }
        return true;
    });


    // This is required, in order to validate when a user click cancel when prompted to attach a file.
    $(document).on('change', 'input[data-val-allowfileextensions]', function () {
        $(this).closest('form').validate().element(this);
    });

    $.validator.unobtrusive.adapters.add('allowfileextensions', ['extensions'], function (options) {
        options.rules['allowfileextensions'] = options.params;
    });

    $.validator.addMethod('allowfileextensions', function (value, element, parameters) {
        if (element.files && element.files.length > 0) {
            var extensions = (parameters.extensions || '').toLowerCase();
            var list = extensions.split(',');
            for (var i = 0; i < element.files.length; i++) {
                if (list.indexOf(element.files[i].name.split('.').pop().toLowerCase()) === -1) {
                    return false;
                }
            }
        }
        return true;
    });
}(document, $));
