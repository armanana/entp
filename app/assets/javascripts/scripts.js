/**
*	Template Functions
*	URL: @Robocont
*	Description: Template specific functions and calls
*/

"use strict";

$( document ).ready( function(){
// Masonry UL 
var $container = $('.portfolio-1, .portfolio-3, .portfolio-4, .blog-1, .features-1').masonry({ columnWidth:30, gutter: 30});
});	
	
/*/*********************************************
Popup functions
*********************/ 


// Singup function

$(document).on('click', '.signupbtn' ,function(){	
	$('.signup').slideDown();
	$('.signin,.forget').slideUp();
});


// Singin function

$(document).on('click', '.signinbtn' ,function(){	
	$('.signin').slideDown();
	$('.forget,.signup').slideUp();
});


// Forget function

$(document).on('click', '.forgetpassbtn' ,function(){
	$('.signin,.signup').slideUp();
	$('.forget').slideDown();
});


// Message function

function message(message) {
	$('.ajax-inject .message').fadeIn("slow").delay(500).fadeOut("slow").text(message);	
}



/*/*********************************************
Ajax popup call function
*********************/ 
		
	
$( '.ajax-link' ).on( 'click', function () {
	var ajax_link = '.ajax-link';     							   // Menu Ajax li
	var ajax_inject = '.ajax-inject';							   // Ajax inject div (Pop ups)
	var page = $(this).attr('href');							   // Page link
	$(ajax_inject).addClass('active');
	$("body").addClass('popup');
	
		$.ajax({
			type: "POST",
			url: page,
			dataType: 'html',
			cache: false,
			success: function (data) {
				
				$(ajax_inject).html(data); 
			}
		});

	return false;
	
});

	
		
/*/*********************************************
Header & search auto fix position
*********************/ 


	
	$(window).on("scroll",function(){
		var page_top = $('.page_top').height() - $('body > .search').height();
		var menuautobg = $(window).height() - 100;
		var scrolltop =	$(window).scrollTop();
		
		if ( scrolltop >= page_top) {
		 $('body.searchfixed.menu-fix .search .fixing').addClass("active");
		}
		if ( scrolltop < page_top ){
		   $('body.searchfixed.menu-fix .search .fixing').removeClass('active');
		}
		
		if ( scrolltop >= menuautobg) {
		 $('body.menu-auto-bg').addClass("scrolltop");
		}
		if ( scrolltop < menuautobg ){
		   $('body.menu-auto-bg').removeClass('scrolltop');
		}
	}); 







/*/*********************************************
Page Slider
*********************/ 



$( window ).on("load",function(){
	var activeclass = 'active';
	var slid_time = '3000';
	
	var UlNavLi = '.pageslider .nav li';
	
	var sliders = {
		SliderClass	:	'.pageslider',
		activeclass	:	'active',
		SlidTime	:	'3000',
		SlidInterval:	'5000',
		current		:	1
		};

	
	for(var x = 1; x <= $(sliders.SliderClass).length; x++){
		var id = $(sliders.SliderClass).eq(x-1).attr('id');
		var autoloop = $('#' + id).hasClass('auto-loop');
		var carousel = $('#' + id).hasClass('carousel');
		if(carousel == true)
			{PageSliderCarousel(id , autoloop);}	
		else{
			PageSlider(id , autoloop);}	
	}


	//Carousel version

	function PageSliderCarousel(id,autoloop){
		var current = 1;
		var PageSlider = $('#' + id),
			PgsThumbs = $('.slid', PageSlider),
			PgsNav = $('ul.nav' , PageSlider),
			SliderContainer = $('.sliders', PageSlider),
			next = $('.next' , PageSlider),
			last = $('.last' , PageSlider),
			SliderWidth = PageSlider.width(),
			CountSlid = PgsThumbs.length;
			PgsThumbs.width(SliderWidth);	
			SliderContainer.width(SliderWidth * CountSlid);
			
			$(window).on("resize",function(){
				SliderWidth = PageSlider.width();
				PgsThumbs.width(SliderWidth);	
				SliderContainer.width(SliderWidth * CountSlid);
				current = 0;
				Pgs();
			});
			
			// Adding navigation li

			PageSlider.append("<ul class='nav'></ul>");
			var Pgs_list = '';
			PgsThumbs.eq(1).addClass(sliders.activeclass);
			for(var i = 1; i <= CountSlid; i++){
				$('ul.nav' , PageSlider).append("<li></li>");
			}
			
			var PgsList = $('.nav li' , PageSlider);
			PgsList.eq(0).addClass(sliders.activeclass);
			
			// Click sider nav

			PgsList.on("click",function(){
			var currentLi = $(this).index();
					PgsThumbs.removeClass(sliders.activeclass);
					PgsList.removeClass(sliders.activeclass);
					PgsThumbs.eq(currentLi).addClass(sliders.activeclass);
					PgsList.eq(currentLi).addClass(sliders.activeclass);
					SliderContainer.animate({'left' : '-' + SliderWidth * currentLi},sliders.SlidTime,'swing');
					current = currentLi++;
					
			});
			
			// Auto loop

			function PgsInit(){
				if(PgsThumbs.length > 0){
					var PgsInterval = setInterval(Pgs, sliders.SlidInterval);
					
				}
			}

			// Slide function
			
			function Pgs(){
				if(current < PgsThumbs.length){
					PgsThumbs.removeClass(sliders.activeclass);
					PgsList.removeClass(sliders.activeclass);
					PgsThumbs.eq(current).addClass(sliders.activeclass);
					PgsList.eq(current).addClass(sliders.activeclass);
					SliderContainer.animate({'left' : '-' + SliderWidth * current},sliders.SlidTime,'swing');
					current++;
					}
				else {
					current = 1;
					PgsThumbs.removeClass(sliders.activeclass);
					PgsList.removeClass(sliders.activeclass);
					PgsThumbs.eq(0).addClass(sliders.activeclass);
					PgsList.eq(0).addClass(sliders.activeclass);
					SliderContainer.animate({'left' : '0'},sliders.SlidTime,'swing');
				}
			}
			
			// Next slid
			
			next.on("click",function(){
					PgsThumbs.removeClass(sliders.activeclass);
					PgsList.removeClass(sliders.activeclass);
					PgsThumbs.eq(current).addClass(sliders.activeclass);
					PgsList.eq(current).addClass(sliders.activeclass);
					Pgs();
			});
			
			// Last Slid
			
			last.on("click",function(){
					current = sliders.current-2;
					if(current < 0){
						current = 0;
					}
					PgsThumbs.removeClass(sliders.activeclass);
					PgsList.removeClass(sliders.activeclass);
					PgsThumbs.eq(current).addClass(sliders.activeclass);
					PgsList.eq(current).addClass(sliders.activeclass);
					Pgs();
			});
			
			if(autoloop == true){
					setTimeout(PgsInit, 0);
					window.clearTimeout(PgsInit);
			}	
	}
	

	//Default version
	
	function PageSlider(){
				var current = 1;
				
		var PageSlider = $('#' + id),
			PgsThumbs = $('.slid', PageSlider),
			PgsNav = $('ul.nav' , PageSlider),
			SliderContainer = $('.sliders', PageSlider),
			next = $('.next' , PageSlider),
			last = $('.last' , PageSlider),
			CountSlid = PgsThumbs.length;
				
			// Adding navigation li*

			PageSlider.append("<ul class='nav'></ul>");
			var Pgs_list = '';
			PgsThumbs.eq(0).addClass(sliders.activeclass);
			for(var i = 1; i <= CountSlid; i++){
				$('ul.nav' , PageSlider).append("<li></li>");
			}
			var PgsList = $('.nav li' , PageSlider);
			PgsList.eq(0).addClass(sliders.activeclass);
				
			// Click sider nav
			
			PgsList.on("click",function(){
			var currentLi = $(this).index();
					PgsThumbs.removeClass(sliders.activeclass);
					PgsList.removeClass(sliders.activeclass);
					PgsThumbs.eq(currentLi).addClass(sliders.activeclass);
					PgsList.eq(currentLi).addClass(sliders.activeclass);
					current = currentLi++;
					
			});
			
			// Auto loop

			function PgsInit(){
				if(PgsThumbs.length > 1){
				setInterval(Pgs, slid_time);
				}
			}
			
			// Slide function
			
			function Pgs(){
				if(current < PgsThumbs.length){
					PgsThumbs.removeClass(sliders.activeclass);
					PgsList.removeClass(sliders.activeclass);
					PgsThumbs.eq(current).addClass(sliders.activeclass);
					PgsList.eq(current).addClass(sliders.activeclass);
					current++;
					}
				else {
					current = 0;
				}

			}
			
			// Next slid
			
			next.on("click",function(){
					current = current++;
					PgsThumbs.removeClass(sliders.activeclass);
					PgsList.removeClass(sliders.activeclass);
					PgsThumbs.eq(current).addClass(sliders.activeclass);
					PgsList.eq(current).addClass(sliders.activeclass);
					Pgs();
			});
			
			// Last Slid
			
			last.on("click",function(){
					current = current-2;
					if(current < 0)
					{
						current = 0;
					}
					PgsThumbs.removeClass(sliders.activeclass);
					PgsList.removeClass(sliders.activeclass);
					PgsThumbs.eq(current).addClass(sliders.activeclass);
					PgsList.eq(current).addClass(sliders.activeclass);
					Pgs();
			});
			if(autoloop == true){
					setTimeout(PgsInit, 0);
					window.clearTimeout(PgsInit);
			}	

		}
	});


	
	
	
	
	
	
	
