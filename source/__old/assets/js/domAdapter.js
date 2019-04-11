/*
 * BOARDWALK REIT
 * All Rights Reserve
*/

(function (window, document, $) {
    $(document).ready(function () {
        $('#m-nav-panel-find').find('input, button, a').attr('tabindex', '-1');
        $('#mobile-nav-container').find('button, input, a').attr('tabindex', '-1');
        if ('objectFitImages' in window) {
            window.objectFitImages();
        }
        if (window.matchMedia('(max-width: 1200px)').matches) {
            $(document).on('focus', '.jumbotron input, .mobile-location-component input, #filters input', function () {
                $('html, body').animate({ scrollTop: $(this).offset().top - 20 }, 500);
            });
        }
        if (window.innerWidth < 768) {
            $('.property-offerings').addClass('collapse');
        }
        updateResponsiveImage();
    });

    $(document).on('keydown', 'label[role=button]', function (e) {
        var key = e.keyCode || e.which;
        if (key === 13) {
            $(this).click();
            e.preventDefault();
        }
    });

    $(document).on('click touch', 'ul#main-navigation li a', function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $('#m-nav-panel-find, #m-nav-panel-investors, #m-nav-panel-search').removeClass('panel-open');
            $('ul#main-navigation li a, .u-nav-search a').removeClass('active');
            $(this).addClass('active');
        }
    });

    $(document).on('click touch', '.m-nav-aboutus a', function () {
        $('#m-nav-panel-find,#m-nav-panel-investors, #m-nav-panel-search').removeClass('panel-open');
        $('#m-nav-panel-aboutus').toggleClass('panel-open');
        if ($('#m-nav-panel-aboutus').hasClass('panel-open')) {
            $('#m-nav-panel-aboutus').find('a, button').attr('tabindex', '0');
            $('#m-nav-panel-aboutus a').first().focus();
        } else { $('#m-nav-panel-aboutus').find('a,button').attr('tabindex', '-1'); }
    });

    $(document).on('click touch', '.m-nav-investors a', function () {
        $('#m-nav-panel-find, #m-nav-panel-aboutus, #m-nav-panel-search').removeClass('panel-open');
        $('#m-nav-panel-investors').find('input, button, a').attr('tabindex', '0');
        $('#m-nav-panel-investors').toggleClass('panel-open');
        $('#m-nav-panel-investors a').first().focus();
    });

    $(document).on('click touch', '.m-nav-find a', function () {
        $('#m-nav-panel-investors, #m-nav-panel-aboutus, #m-nav-panel-search').removeClass('panel-open');
        $('#m-nav-panel-find').find('input, button, a').attr('tabindex', '0');
        $('#m-nav-panel-find').toggleClass('panel-open');
        if ($('#m-nav-panel-find').hasClass('panel-open')) {
            $('#m-nav-panel-find a').removeClass('active');
            $('#m-nav-panel-find input[type=search]').focus();
        }
    });

    $(document).on('click touch', '.u-nav-search a.open-search', function () {
        var loginWidth = $('.u-nav-login').outerWidth();
        var langWidth = $('.u-nav-lang').outerWidth();
        var searchWidth = $('.u-nav-search').innerWidth();
        $('.u-nav-search').width('24px');
        $('.u-nav-sitesearch').find('input, button, a').attr('tabindex', '0');
        $('.u-nav-sitesearch').width(loginWidth + langWidth + searchWidth + 20);
        $(' .u-nav-search a, .u-nav-sitesearch').toggleClass('hidden');
        $('.u-nav-sitesearch input[type=search]').focus();
    });

    $(document).on('click touch', '.close-search', function () {
        $('.u-nav-sitesearch').find('input, button, a').attr('tabindex', '-1');
        $('.u-nav-search a, .u-nav-sitesearch').toggleClass('hidden');
        $('.open-search').focus();
    });

    $(document).on('click touch', '#m-nav-panel-find .close', function () {
        $('#m-nav-panel-find').removeClass('panel-open');
        $('ul#main-navigation li a').removeClass('active');
    });

    $(document).on('click touch', '#m-nav-panel-aboutus .close', function () {
        $('#m-nav-panel-aboutus').removeClass('panel-open');
        $('ul#main-navigation li a').removeClass('active');
        $('#m-nav-panel-aboutus').find('a, button').attr('tabindex', '-1');
        $('.m-nav-aboutus a').first().focus();
    });

    $(document).on('click touch', '.skip-link', function () {
        $('#main-focus-content').attr('tabindex', '0').focus();
    });

    $(document).on('click tap', 'button.view-map-btn', function () {
        $('html, body').animate({ scrollTop: $(this).offset().top }, 600);
        $('#viewMapText').toggle();
        $('#closeMapText').toggle();
    });

    $(document).on('click tap', '.advanced-filters-toggle button', function () {
        $('html, body').animate({ scrollTop: $('.advanced-filters-toggle button').offset().top }, 600);
    });

    $(document).on('click tap', "button[data-target='#applyPosition']", function () {
        $('html, body').animate({ scrollTop: $(this).offset().top + 100 }, 600);
    });

    $(document).on('click tap', '.property-detail-dropdown', function () {
        var clickedBtn = $(this);
        $('html, body').animate({ scrollTop: $(clickedBtn).offset().top }, 600);
    });

    $(document).on('click tap', '.contact-bubble', function () {
        $('html, body').animate({ scrollTop: $('#contact-form-section').offset().top + 110 }, 900);
    });

    $(document).on('click', '#btn-mobile-find-your-home', function () {
        $('html, body').animate({ scrollTop: $('#btn-mobile-find-your-home').offset().top + 70 }, 500);
    });

    $(document).on('focus', '.property-list-item-details-top', function () {
        $(this).closest('.property-list-item').addClass('selected-property');
    });

    $(document).on('blur', '.property-list-item-details-top', function () {
        $(this).closest('.property-list-item').removeClass('selected-property');
    });

    $(document).on('focus', '.slick-dots button', function () {
        $(this).closest('.slick-dots').addClass('active-list');
    });

    $(document).on('blur', '.slick-dots button', function () {
        $(this).closest('.slick-dots').removeClass('active-list');
    });

    $(document).on('click touch', '.mobile-nav-toggle a, #mobile-nav-container .close', function () {
        $('#mobile-nav-container').toggleClass('open');
    });

    $(document).on('click touch', '.skip-link', function () {
        $('#main-focus-content').attr('tabindex', '0').focus();
    });

    $(document).on('click touch', 'a[href="#main-display-brand"], a[href="#left-display-brand"], a[href="#right-display-brand"]', function (evt) {
        evt.preventDefault();
        var id = $(this).attr('href');
        $(id).find('a').first().attr('tabindex', '1').focus();
    });

    $(window).on('resize', function () {
        updateResponsiveImage();
    }).resize();

    function updateResponsiveImage() {
        var windowsWidth = $(window).width();
        var responsiveImage = $('.responsive-image');
        if (responsiveImage.length > 0) {
            switch (true) {
                case windowsWidth < 992:
                    responsiveImage.addClass('imageCrop-sm');
                    responsiveImage.removeClass('imageCrop-md imageCrop-lg');
                    break;
                case windowsWidth < 1200:
                    responsiveImage.addClass('imageCrop-md');
                    responsiveImage.removeClass('imageCrop-lg imageCrop-sm');
                    break;
                case windowsWidth >= 1200:
                    responsiveImage.addClass('imageCrop-lg');
                    responsiveImage.removeClass('imageCrop-md imageCrop-sm');
                    break;
            }
        }
    }
}(window, document, $));
