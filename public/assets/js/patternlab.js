/*
 * BOARDWALK REIT
 * All Rights Reserve
*/

(function(document, $) {
    function videoModals() {
        $('.video-modal').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    }

    function initDatePicker() {
        $('.datepicker').datepicker();
    }

    function toggleAdvancedFilters() {
        $('#property-range-toggle').on('click', function () {
            $('#showFullPropertyTypeRange').collapse('toggle');
        });
        $('#showFullPropertyTypeRange').on('show.bs.collapse', function () {
            $("#property-range-marker").addClass('open');
        });
        $('#showFullPropertyTypeRange').on('hide.bs.collapse', function () {
            $("#property-range-marker").removeClass('open');
        });
    }

    function clearCityCollapse() {
        $('#m-nav-panel-find .btn-group .btn').on('click', function () {
            $('.cities-dropdown').hide();
            var btnId = $(this).attr('id');
            console.log(btnId);
            if (btnId === 'btn-alberta-cities') { $('#city-alberta').fadeIn(); }
            if (btnId === 'btn-ontario-cities') { $('#city-ontario').fadeIn(); }
            if (btnId === 'btn-quebec-cities') { $('#city-quebec').fadeIn(); }
            if (btnId === 'btn-saskatchewan-cities') { $('#city-saskatchewan').fadeIn(); }
        });
    }

    function investorBlockToggle() {
        if (window.innerWidth > 991) {
            $('.market-summary-arrow-show').on('click', function () {
                $('.market-summary-expanded').removeClass('hidden');
                $('.investor-downloads').addClass('hidden');
                $(this).addClass('hidden');
            });
            $('.market-summary-arrow-hide').on('click', function () {
                $('.market-summary-expanded').addClass('hidden');
                $('.investor-downloads').removeClass('hidden');
                $('.market-summary-arrow-show').removeClass('hidden');
            });
        } else {
            $('.market-summary-expanded').removeClass('hidden');
            $('.market-summary-arrow-show').addClass('hidden');
            $('.market-summary-arrow-hide').addClass('hidden');
        }
    }

    // Deal with the open and close states of the advanced filters component
    function smallScreenAccordion() {
        if (window.innerWidth < 768) {
            $('#advancedFilterCollapse').collapse("hide");
            $('.advanced-filters-toggle-small').on('click', function () {
                $('#filterAccordion').addClass('active');
                console.log(window.innerWidth);
            });
            $('#advancedFilterCollapse').on('hidden.bs.collapse', function () {
                $('#filterAccordion').removeClass('active');
            });
        }
    }

    function telephoneFormatting() {
        $('input[type=tel]').on('change', function () {
            var number = $(this).val();
            number = number.replace(/(\d{3})(\d{3})(\d{4})/, '($1)$2-$3');
            $(this).val(number);
        });
    }

    function init() {
        videoModals();
        initDatePicker();
    }

    init();

    $(document).ready(function () {
        toggleAdvancedFilters();
        clearCityCollapse();
        investorBlockToggle();
        smallScreenAccordion();
        telephoneFormatting();
        $('#tableSorterExample').tablesorter({
            sortList: [[0, 0]]
        });
    });
}(document, $));
