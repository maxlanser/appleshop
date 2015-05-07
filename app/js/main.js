"use strict";
$(document).ready(function() {
    $('.navigation__list > li:last-child').addClass('last-child');
    $('.product-spec-list > li:last-child').addClass('last-child');
    $('.view__pagination-toggle-select').change(function(){
    	var toggleClass = $('.view__pagination-toggle-select option:selected').val();
    	if (toggleClass === 'lines') {
    		$('.products__list').removeClass('grid');
    		if ($('.products__list').hasClass(toggleClass) === false) {
    			$('.products__list').addClass(toggleClass);
    		}
    	}
    	if (toggleClass === 'grid') {
    		$('.products__list').removeClass('lines');
    		if ($('.products__list').hasClass(toggleClass) == false) {
    			$('.products__list').addClass(toggleClass);
    		}
    	}
    });


    // browser window scroll (in pixels) after which the "back to top" link is shown
	var offset = 300,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 1200,
		//duration of the top scrolling animation (in ms)
		scroll_top_duration = 700,
		//grab the "back to top" link
		$back_to_top = $('.go-top');

	//hide or show the "back to top" link
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('go-is-visible') : $back_to_top.removeClass('go-is-visible go-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('go-fade-out');
		}
	});

	//smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});

	$('.view__pagination-toggle-select').styler();

});