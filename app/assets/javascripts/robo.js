/**
*	Robo Framework Functions
*	URL: @Roboframwork
*	Description: Template specific functions and calls
*/

(function() {
	"use strict";
	/*
	*	Framework Functions Options
	*/

	// Links Smoot scroll
	var menu_linkscroll = '.link_page';
	
	// Sign in/up form & links
	var ajaxdiv = '.ajax-inject';
	
	// Retina imgs elements
	var retina_img = '';	// element or class name
	
	// Counter number
	var count_number_elemet = '.timer';
	
	// Compact menu icon
	var compact_menu_icon = '.compact-menu-icon';
	
	// Google map settings
	var mapdivid = 'map';
	var markericon = '../img/map-marker.png';
	var mapzoom = 8;
	var mapzoomcontrol = false;	
	
	
	var Robo = {
		init: function(){
			Robo.link_page();
			Robo.accordion();
			Robo.tabs();
			Robo.players();
			Robo.loading();
			Robo.compactmenu();
			Robo.escape();
			Robo.retina();
			Robo.maps();
			Robo.parallax();
			Robo.count();
		},
		
		
		link_page: function(){
			
			// Scroll TO
			
			$(menu_linkscroll).on("click",function(){
				var parent = $('a',this).attr("href");
				$('html,body').animate({scrollTop: $( parent).offset().top},'swing');
				return false;
			});
		},		

		compactmenu: function(){
			
			// Compact navigation

			$(compact_menu_icon).on("click",function(){
			  $('body').toggleClass("menu-active");
			});
			
			// Responsive navigation
			var menu_responsive = $('.menu.responsive');
			if ($(window).width() < 768) {
			  menu_responsive.addClass('compact');
			}
			$(window).on("resize",function(){
				if ($(window).width() < 768) {
					menu_responsive.addClass('compact');
				}
				else{
					menu_responsive.removeClass('compact');
				}
			});
			
		},		

		
		accordion: function(){
			
			// Accordion
			
			$(".accordion li > a").on("click",function(){
				var accordionli = $(this).parent("li").hasClass( "active");
				if(accordionli == true)
				{  
					$(this).parent().parent().find("div.content").slideUp();
					$(this).parent("li").removeClass('active');
				}
				
				else{
					$(this).parent().parent().find("div.content").slideUp();
					$(this).parent().find("div.content").slideDown();
					$(this).parent().parent().find("li").removeClass('active');
					$(this).parent("li").addClass('active');	
				}
				
			});
		},
		
		tabs: function(){
			
			// Tabs
			
			$(".tabs ul li").on("click",function(){
				var taburl = $("a",this).attr( "href" );
				$(this).parent().parent().find("div").removeClass('active');
				$(this).parent().parent().find(taburl).addClass('active');
				$(this).parent().find("li").removeClass('active');
				$(this).addClass('active');
				return false;
			});
		},	
		
		
		loading: function(){
			
			// Loading animation show
			

				$( window ).on("load",function(){
					$(".loading").removeClass('loading');
					});
				$(document).on({
					ajaxStart: function() { $(ajaxdiv).addClass("loading");},
					ajaxStop: function() { $(ajaxdiv).removeClass("loading"); }    
				});
				
		},			
		
		escape: function(){
			
			// escape key & Close button
			
				$(document).on("keyup",function(e){
					if (e.keyCode == 27) 
					{ 
					$(ajaxdiv).removeClass('active'); 
					$('body').removeClass('menu-active popup');
					}  
				});
				
			// close icon
			
				$(document).on("click" , ".close" , function(){
					$(ajaxdiv).removeClass('active'); 
					$('body').removeClass('menu-active popup');

				});
			
			
		},			
		
		retina: function(){
			
			// Retina Display images
			
			if (window.devicePixelRatio > 1) {
				var lowresImages = $(retina_img);
				lowresImages.each(function(i) {
					var retinasrc = $(this).attr('src');
					var retina_str = retinasrc,
					replacement = '@2x.';
					retinasrc = retina_str.replace(/.([^.]*)$/, replacement + '$1');
					$(this).attr('src', retinasrc);
				});
			}

		},			
		
		count: function(){
			
			// Count number to
			
			
			$.fn.countTo = function (options) {
				options = options || {};

				return $(this).each(function () {
					var settings = $.extend({}, $.fn.countTo.defaults, {
						from:            $(this).data('from'),
						to:              $(this).data('to'),
						speed:           $(this).data('speed'),
						refreshInterval: $(this).data('refresh-interval'),
						decimals:        $(this).data('decimals')
					}, options);

					var loops = Math.ceil(settings.speed / settings.refreshInterval),
						increment = (settings.to - settings.from) / loops;

					var self = this,
						$self = $(this),
						loopCount = 0,
						value = settings.from,
						data = $self.data('countTo') || {};

					$self.data('countTo', data);

					if (data.interval) {
						clearInterval(data.interval);
					}
					render(value);

					function updateTimer() {
						value += increment;
						loopCount++;

						render(value);

						if (typeof(settings.onUpdate) == 'function') {
							settings.onUpdate.call(self, value);
						}

						if (loopCount >= loops) {
							// remove the interval
							$self.removeData('countTo');
							clearInterval(data.interval);
							value = settings.to;

							if (typeof(settings.onComplete) == 'function') {
								settings.onComplete.call(self, value);
							}
						}
					}

					function render(value) {
						var formattedValue = settings.formatter.call(self, value, settings);
						$self.text(formattedValue);
					}
				});
				
			};

			$.fn.countTo.defaults = {
				from: 0,               // the number the element should start at
				to: 0,                 // the number the element should end at
				speed: 1000,           // how long it should take to count between the target numbers
				refreshInterval: 100,  // how often the element should be updated
				decimals: 0,           // the number of decimal places to show
				formatter: formatter,  // handler for formatting the value before rendering
				onUpdate: null,        // callback method for every time the element is updated
				onComplete: null       // callback method for when the element finishes updating
			};

			function formatter(value, settings) {
				return value.toFixed(settings.decimals);
			}
			$(count_number_elemet).countTo();
		},
			



		parallax: function(){
			
			// Parallax effect
			
			$(window).on("scroll",function(){

				var res = {
					scroll: 	$(window).scrollTop(),		// Window height
					height:		$('.parallax').height()		// Div height
					};				
				var translate = res.scroll / 3;
				var opacityheight = (res.scroll * 100 / res.height) / 100;
				var result_opacity = 1 - opacityheight * 1.2;
				
				if ( res.scroll > 0) {

					$('.parallax img , .parallax .video ').css({
					  '-webkit-transform' : 'translate(0, ' + translate +'px)',
					  '-moz-transform'    : 'translate(0, ' + translate +'px)',
					  '-ms-transform'     : 'translate(0, ' + translate +'px)',
					  '-o-transform'      : 'translate(0, ' + translate +'px)',
					  'transform'         : 'translate(0, ' + translate +'px)',
					  'opacity'           : result_opacity
					});
				 
				} 
			}); 
	
	

		},
			

			
		maps: function(){
			
			// Map settings

				var map, 
				data_lat_map = $("#" + mapdivid).attr('data-lat'),
				data_lng_map = $("#" + mapdivid).attr('data-lng'),
				data_marker = $("#" + mapdivid).attr('data-marker'),
				mapstyle = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}];	

				if(data_lat_map){
					google.maps.event.addDomListener(window, 'load', init);
				}
				
				function init() {
					
					var mapOptions = {
						center: 				new google.maps.LatLng(data_lat_map , data_lng_map),
						zoom: 					mapzoom,
						zoomControl:			mapzoomcontrol,
						disableDoubleClickZoom: true,
						mapTypeControl: 		false,
						scaleControl: 			true,
						scrollwheel:			false,
						panControl: 			false,
						streetViewControl: 		false,
						draggable : 			true,
						overviewMapControl: 	false,
						overviewMapControlOptions: { opened: false, },
						mapTypeId: 				google.maps.MapTypeId.ROADMAP,
						styles:					mapstyle,	
						}

					var mapElement = document.getElementById(mapdivid);
					var map = new google.maps.Map(mapElement, mapOptions);
					var locations = [];
					


					
					if(data_marker && data_lat_map)
						{

						var beachMarker = new google.maps.Marker({
							position: new google.maps.LatLng(data_lat_map,data_lng_map),
							map: map,
							icon: markericon 
							});
						beachMarker.setMap(map);	
						}
			}				
		},		
		
		
		players: function(){
			
			// Video player	
			
			$(".video .stop").on("click",function(){
				var videoplayer = $(this).parent().parent().find("video")[0];
				var videodiv = $(this).parent().parent(".video");
				videoplayer.pause(); 
				videodiv.removeClass('active');
				videoplayer.currentTime = 0;
				return false;
				});
			$(".video .pause").on("click",function(){
				var videoplayer = $(this).parent().parent().find("video")[0];
				var videodiv = $(this).parent().parent(".video");
				videoplayer.pause(); 
				videodiv.removeClass('active');
				return false;
				});
			$("video").on("click",function(){
				var videoplayer = $(this)[0];
				var videodiv = $(this).parent(".video");
				if (videoplayer.paused){ 
					videoplayer.play();
					videodiv.addClass('active');
					}
				else {
					videoplayer.pause(); 
					videodiv.removeClass('active');
				}

			});
			$(".video .play").on("click",function(){
				var videoplayer = $(this).parent().find("video")[0];
				var videodiv = $(this).parent(".video");
				if (videoplayer.paused){ 
					videoplayer.play();
					videodiv.addClass('active');
					}
				else {
					videoplayer.pause(); 
					videodiv.removeClass('active');
				}

			});
			
			
			// Audio player
			
			$(".audio .play").on("click",function(){
				var audioplayer = $(this).parent().find("audio")[0];
				var audiodiv = $(this).parent(".audio");
	
				if (audioplayer.paused){ 
					audioplayer.play();
					audiodiv.addClass('active');
					}
				else {
					audioplayer.pause(); 
					audiodiv.removeClass('active');
				}
			});
			
			$(".audio .stop").on("click",function(){
				var audioplayer = $(this).parent().find("audio")[0];
				var audiodiv = $(this).parent(".audio");
				audiodiv.removeClass('active');
				audioplayer.pause();
				audioplayer.currentTime = 0;
				});
		}
		
		
		
	};
	

	
	Robo.init();
	
})(jQuery);


 