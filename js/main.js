(function ($) {
    "use strict";


    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    let sliders = document.querySelectorAll('.slider');

    sliders.forEach(function (slider) {
        let sliderRange = slider.querySelector('.slider_range');
        let sliderBefore = slider.querySelector('.slider_before');
        let sliderSeparator = slider.querySelector('.slider_separator');

        function uptdateSliderPosition() {
            sliderBefore.style = `width:${sliderRange.value}%`;
            sliderSeparator.style = `left:${sliderRange.value}%`;
        }

        sliderRange.addEventListener('input', uptdateSliderPosition);

        let isDragging = false;

        sliderSeparator.addEventListener('mousedown', function () {
            isDragging = true;
        })

        document.addEventListener('mouseup', function () {
            isDragging = false;
        })

        document.addEventListener('mousemove', function (e) {
            if (isDragging) {
                let sliderRect = slider.getBoundingClientRect();
                let newWidth = (e.clientX - sliderRect.left) /
                    sliderRect.width * 100;
                sliderRange.value = newWidth;
                uptdateSliderPosition();
            }
        })
    });


})(jQuery);

