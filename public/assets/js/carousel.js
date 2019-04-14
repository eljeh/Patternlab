/*
 * BOARDWALK REIT
 * All Rights Reserve
*/

(function (window, $) {
    var jumbotronCarouselConfig = {
        lazyLoad: 'ondemand',
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 0,
        dots: true,
        speed: 2000,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 6000,
        fade: true,
        prevArrow: '<button type="button" class="slick-prev" tabindex="0"><span class="visuallyhidden">Previous</span><span class="icon-cta-left"></span></button>',
        nextArrow: '<button type="button" class="slick-next" tabindex="0"><span class="visuallyhidden">Next</span><span class="icon-cta"></span></button>'
    };

    var jumbotronCarouselFadeConfig = {
        lazyLoad: 'ondemand',
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 0,
        fade: true,
        dots: false,
        speed: 2000,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 6000,
        prevArrow: '',
        nextArrow: ''
    };

    var featureCarouselTileConfig = {
        rows: 0,
        cssEase: 'linear',
        speed: 1000,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        prevArrow: '<button type="button" class="slick-prev" tabindex="0"><span class="visuallyhidden">Previous</span><span class="icon-cta-left"></span></button>',
        nextArrow: '<button type="button" class="slick-next" tabindex="0"><span class="visuallyhidden">Next</span><span class="icon-cta"></span></button>',
        fade: true
    };

    var imageCarouselConfig = {
        lazyLoad: 'ondemand',
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 0,
        infinite: true,
        autoplay: true,
        fade: true,
        cssEase: 'linear',
        dots: false,
        prevArrow: '',
        nextArrow: ''
    };

    var galleryCarouselConfig = {
        lazyLoad: 'ondemand',
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 0,
        dots: true,
        speed: 2000,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 6000,
        fade: true,
        prevArrow: '<button type="button" class="slick-prev slick-nav-video-control" tabindex="0"><span class="visuallyhidden">Previous</span><span class="icon-cta-left"></span></button>',
        nextArrow: '<button type="button" class="slick-next slick-nav-video-control" tabindex="0"><span class="visuallyhidden">Next</span><span class="icon-cta"></span></button>',
        responsive: [{
            breakpoint: 1024,
            settings: {
                dots: false
            }
        }]
    };

    var perksCarouselConfig = {
        rows: 0,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev" tabindex="0"><span class="visuallyhidden">Previous</span><span class="icon-ctrl"></span></button>',
        nextArrow: '<button type="button" class="slick-next" tabindex="0"><span class="visuallyhidden">Next</span><span class="icon-ctrl"></span></button>',
        dots: false,
        speed: 1000,
        infinite: true,
        autoplay: false,
        slidesToShow: 3,
        responsive: [{
            breakpoint: 769,
            settings: {
                slidesToShow: 1
            }
        }]
    };

    var widgetCarouselConfig = {
        lazyLoad: 'ondemand',
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 0,
        infinite: true,
        autoplay: true,
        fade: true,
        cssEase: 'linear',
        dots: false,
        prevArrow: '',
        nextArrow: ''
    };

    var mobileCarouselConfig = {
        rows: 0,
        speed: 500,
        cssEase: 'linear',
        prevArrow: '<button type="button" class="slick-prev" tabindex="0"><span class="visuallyhidden">Previous</span><span class="icon-ctrl"></span></button>',
        nextArrow: '<button type="button" class="slick-next" tabindex="0"><span class="visuallyhidden">Next</span><span class="icon-ctrl"></span></button>',
        dots: true
    };

    var iconSubnavSliderConfig = {
        rows: 0,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 2,
        dots: false,
        prevArrow: false,
        nextArrow: false,
        responsive: [{
            breakpoint: 500,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }]
    };

    function initFeatureCarouselTile() {
        var items = $('.feature-carousel-tile-carousel');
        if (items.length) {
            var ids = [];
            items.each(function () {
                ids.push($(this).attr('id'));
            });

            ids.forEach(function (id) {
                if ($('#' + id + ' img').length > 1) { $('#' + id).slick(featureCarouselTileConfig); }
            });
        }
    }

    function initImageCarousel() {
        var config = imageCarouselConfig;
        $('.image-carousel').each(function () {
            if ($(this).children().length > 1) {
                config.dots = true;
                config.prevArrow = '<button type="button" class="slick-prev" tabindex="0"><span class="visuallyhidden">Previous</span><span class="icon-cta-left"></span></button>';
                config.nextArrow = '<button type="button" class="slick-next" tabindex="0"><span class="visuallyhidden">Next</span><span class="icon-cta"></span></button>';
            } else {
                config.dots = false;
                config.prevArrow = '';
                config.nextArrow = '';
            }

            $(this).slick(config)
                .on('afterChange', function (event, slick, currentSlide, nextSlide) {
                    $(".slick-slide > .image-caption").addClass('hidden');
                    $('.slick-active > .image-caption').removeClass('hidden');
                });
        });
    }

    function initGalleryCarousel() {
        var config = galleryCarouselConfig;
        $('.gallery-carousel').each(function () {
            if ($(this).children().length > 1) {
                $(this).slick(config).on('setPosition', function (event, slick) {
                    $('.tour-iframe, .youtube-iframe').css('height', slick.$slideTrack.height() + 'px');
                });
            }
        });
    }

    function initPerksCarousel() {
        $('.perks-carousel').each(function () {
            if ($(this).children().length > 3) {
                $(this).slick(perksCarouselConfig);
            }
        });
    }

    function initWidgetCarousel() {
        var config = widgetCarouselConfig;
        $('.widget-carousel').each(function () {
            if ($(this).children().length > 1) {
                config.dots = true;
                config.prevArrow = '<button type="button" class="slick-prev" tabindex="0"><span class="visuallyhidden">Previous</span><span class="icon-cta-left"></span></button>';
                config.nextArrow = '<button type="button" class="slick-next" tabindex="0"><span class="visuallyhidden">Next</span><span class="icon-cta"></span></button>';
            } else {
                config.dots = false;
                config.prevArrow = '';
                config.nextArrow = '';
            }

            $(this).slick(config);
        });
    }

    function mediaSize() {
        if (!window.matchMedia('(min-width: 992px)').matches) {
            window.bwalk.carousel.init('mobile-carousel', mobileCarouselConfig);
        }

        if (!window.matchMedia('(min-width: 768px)').matches) {
            window.bwalk.carousel.init('icon-subnav-slider', iconSubnavSliderConfig);
        }
    }

    window.bwalk = window.bwalk || {};
    window.bwalk.carousel = window.bwalk.carousel || {};

    /**
     * Handler - Init slick carousel(s).
     * @param {string} className Class name
     * @param {object} config Slick carousel config
     */
    window.bwalk.carousel.init = function (className, config) {
        $('.' + className).each(function () {
            $(this).slick(config);
        });
    };

    /**
     * Handler - Destroy slick carousel(s).
     * @param {string} className Class name
     */
    window.bwalk.carousel.destroy = function (className) {
        $('.' + className).each(function () {
            $(this).slick('unslick');
        });
    };

    $(document).ready(function () {
        mediaSize();
        initFeatureCarouselTile();
        initImageCarousel();
        initPerksCarousel();
        initWidgetCarousel();
        initGalleryCarousel();
        window.bwalk.carousel.init('jumbotron-carousel', jumbotronCarouselConfig);
        window.bwalk.carousel.init('jumbotron-carousel-fade', jumbotronCarouselFadeConfig);
    });
}(window, $));
