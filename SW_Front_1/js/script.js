jQuery(document).ready(function () {
    var btn = $('#upBtn');
    btn.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, '300');
    });

    $('.reviews').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        focusOnSelect: false,
        arrows: false,
        dots: true,
    });

    function resizeSlick() {
        if ($(window).width() < 650) {
            $('.reviews').slick('slickSetOption', 'slidesToShow', 1);
        }
        else {
            $('.reviews').slick('slickSetOption', 'slidesToShow', 2);
        }
    }

    resizeSlick();
    $(window).resize(resizeSlick);
});