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


    let sliders1 = document.querySelectorAll('.slider');

    sliders1.forEach(function (slider) {
        let sliderRange = slider.querySelector('.slider_range');
        let sliderBefore1 = slider.querySelector('.slider_before1');
        let sliderSeparator = slider.querySelector('.slider_separator');

        function updateSliderPosition() {
            sliderBefore1.style.width = sliderRange.value + '%';
            sliderSeparator.style.left = sliderRange.value + '%';
        }

        function handleSliderSeparatorMouseDown() {
            isDragging = true;
        }

        function handleDocumentMouseUp() {
            isDragging = false;
        }

        function handleDocumentMouseMove(e) {
            if (isDragging) {
                let sliderRect = slider.getBoundingClientRect();
                let newWidth = (e.clientX - sliderRect.left) / sliderRect.width * 100;
                sliderRange.value = newWidth;
                updateSliderPosition();
            }
        }

        function handleSliderSeparatorTouchStart() {
            isDragging = true;
        }

        function handleDocumentTouchEnd() {
            isDragging = false;
        }

        function handleDocumentTouchMove(e) {
            if (isDragging) {
                let sliderRect = slider.getBoundingClientRect();
                let touch = e.touches[0];
                let newWidth = (touch.clientX - sliderRect.left) / sliderRect.width * 100;
                sliderRange.value = newWidth;
                updateSliderPosition();
            }
        }

        sliderRange.addEventListener('input', updateSliderPosition);

        let isDragging = false;

        sliderSeparator.addEventListener('mousedown', handleSliderSeparatorMouseDown);
        document.addEventListener('mouseup', handleDocumentMouseUp);
        document.addEventListener('mousemove', handleDocumentMouseMove);

        sliderSeparator.addEventListener('touchstart', handleSliderSeparatorTouchStart);
        document.addEventListener('touchend', handleDocumentTouchEnd);
        document.addEventListener('touchmove', handleDocumentTouchMove);
    });



    function onSubmit(token) {
        document.getElementById("demo-form").submit();
    }

   



})(jQuery);

