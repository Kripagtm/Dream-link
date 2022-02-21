
(function ($) {

    "use strict";
	
	siteNavigation();
	
	
	// SCROLL TO ELEMENT
	scrollToAnim();
	
	// LINE PROGRESS BAR
	enableLineProgress();
	
	// RADIAL PROGRESS BAR
	enableRadialProgress()
	
	// ACCORDIAN
	panelAccordian();
	
	// ENABLE SWIPER SLIDER
	enableSwiper();
	
	
	// ISOTOPE testimonial WITH FILTER
	if(isExists('.testimonialContainer')){
		var $container = $('.testimonialContainer');
		$container.isotope({
			filter: '*',
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false
			}
		});
	 
		$('.testimonialFilter a').click(function(){
			$('.testimonialFilter .current').removeClass('current');
			$(this).addClass('current');
	 
			var selector = $(this).attr('data-filter');
			$container.isotope({
				filter: selector,
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false
				}
			 });
			 return false;
		}); 
	}
	
	$('a[href="#"]').on('click', function(event){
		return;
	});
	
	
	$('[data-nav-menu]').on('click', function(event){
		
		var $this = $(this),
			visibleHeadArea = $this.data('nav-menu');
		
		$(visibleHeadArea).toggleClass('visible');
		
	});

	
	var winWidth = $(window).width();
	dropdownMenu(winWidth);
	
	$(window).on('resize', function(){
		dropdownMenu(winWidth);
		
	});
	
	var countLineProgress = 0;
	var countCounterUp = 0;
	
	var a = 0 ;
	
	countCounterUp = enableCounterUp(countCounterUp);
	
	$(window).on('scroll', function(){
		
		countCounterUp = enableCounterUp(countCounterUp);
	
	});

	
})(jQuery);

function panelAccordian(){
	
	var panelTitle = $('.panel-title');
	panelTitle.on('click', function(){
		
		$(this).toggleClass('active');
		
	});
	
}

function enableRadialProgress(){
	
	$(".radial-progress").each(function(){
		var $this = $(this),
			progPercent = $this.data('prog-percent');
			
		var bar = new ProgressBar.Circle(this, {
			color: '#aaa',
			strokeWidth: 3,
			trailWidth: 1,
			easing: 'easeInOut',
			duration: 1400,
			text: {
				
			},
			from: { color: '#aaa', width: 1 },
			to: { color: '#F50A93', width: 3 },
			// Set default step function for all animate calls
			step: function(state, circle) {
				circle.path.setAttribute('stroke', state.color);
				circle.path.setAttribute('stroke-width', state.width);

				var value = Math.round(circle.value() * 100);
				if (value === 0) {
					circle.setText('');
				} else {
					circle.setText(value);
				}

			}
		});
		
		$(this).waypoint(function(){
		   bar.animate(progPercent);  
		},{offset: "90%"})
		
	});
}

function enableLineProgress(){
	
	$(".line-progress").each(function(){
		var $this = $(this),
			progPercent = $this.data('prog-percent');
			
		var bar = new ProgressBar.Line(this, {
			strokeWidth: 1,
			easing: 'easeInOut',
			duration: 1400,
			color: '#F50A93',
			trailColor: '#eee',
			trailWidth: 1,
			svgStyle: {width: '100%', height: '100%'},
			text: {
				style: {
					
				},
			},
			from: {color: '#FFEA82'},
			to: {color: '#ED6A5A'},
			step: (state, bar) => {
				bar.setText(Math.round(bar.value() * 100) + ' %');
			}
		});
		
		$(this).waypoint(function(){
		   bar.animate(progPercent);  
		},{offset: "90%"})
		
	});
}

function enableCounterUp(a){
	
	var counterElement;
	
	if(isExists('#counter')){ counterElement = $('#counter'); }
	else{ return; }
		
	var oTop = $('#counter').offset().top - window.innerHeight;
	if (a == 0 && $(window).scrollTop() > oTop) {
		$('.counter-value').each(function() {
			var $this = $(this),
				countDuration = $this.data('duration'),
				countTo = $this.attr('data-count');
			$({
				countNum: $this.text()
			}).animate({
				countNum: countTo
			},{

				duration: countDuration,
				easing: 'swing',
				step: function() {
					$this.text(Math.floor(this.countNum));
				},
				complete: function() {
					$this.text(this.countNum);
				}

			});
		});
		a = 1;
	}

	return a;
}
function countdownTime(){
	
	if(isExists('#clock')){
		$('#clock').countdown('2018/01/01', function(event){
			var $this = $(this).html(event.strftime(''
				+ '<div class="time-sec"><span class="title">%D</span> days </div>'
				+ '<div class="time-sec"><span class="title">%H</span> hours </div>'
				+ '<div class="time-sec"><span class="title">%M</span> minutes </div>'
				+ '<div class="time-sec"><span class="title">%S</span> seconds </div>'));
		});
	}
}



function dropdownMenu(winWidth){
	
	if(winWidth > 767){
		
		$('.main-menu li.drop-down').on('mouseover', function(){
			var $this = $(this),
				menuAnchor = $this.children('a');
				
			menuAnchor.addClass('mouseover');
			
		}).on('mouseleave', function(){
			var $this = $(this),
				menuAnchor = $this.children('a');
				
			menuAnchor.removeClass('mouseover');
		});
		
	}else{
		
		$('.main-menu li.drop-down > a').on('click', function(){
			
			if($(this).attr('href') == '#') return false;
			if($(this).hasClass('mouseover')){ $(this).removeClass('mouseover'); }
			else{ $(this).addClass('mouseover'); }
			return false;
		});
	}
	
}

function isExists(elem){
	if ($(elem).length > 0) { 
		return true;
	}
	return false;
}

function scrollToAnim(){
	// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 500, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
}

function siteNavigation(){
	
	if(isExists('.site-navigation')){
		var elemCount = $('.site-navigation li').length - 2;
		var count = 0;
		
		var navIDs = [];
		$('.site-navigation').find('li > a').each(function(){
			var id = $(this).attr('href');
			if(id != '#') navIDs.push(id); 
		});
		
		$('.site-navigation > li > a').on('click', function(){
			
			var $this = $(this),
				clickedElem;
			
			$('.site-navigation > li > a').removeClass('active');
			
			if($this.hasClass('btn-next')) count++;
			else if($this.hasClass('btn-prev')) count--;
			else{
				clickedElem = $this.attr('href');
				count = jQuery.inArray(clickedElem, navIDs) + 1;
			}
			
			if((count > elemCount) || (count < 1)) {
				count = 0;
				$('html, body').animate({ scrollTop: 0 }, 100);
				return;
			}
			
			var currentAnchor = $('.site-navigation > li > a[href="'+ navIDs[count-1] +'"]');
			currentAnchor.addClass('active');
			
			$('html, body').animate({ scrollTop: $(navIDs[count-1]).offset().top }, 300);
			
		});
	}
	
}

function enableSwiper(){
	
	if ( isExists('.swiper-container') ) {
		
		

		$('.swiper-container').each(function (index) {
			
			
	
			var swiperDirection 			= $(this).data('swiper-direction'),
				swiperSlidePerView			= $(this).data('swiper-slides-per-view'),
				swiperBreakpoints			= $(this).data('swiper-breakpoints'),
				swiperSpeed					= $(this).data('swiper-speed'),
				swiperCrossFade				= $(this).data('swiper-crossfade'),
				swiperLoop					= $(this).data('swiper-loop'),
				swiperAutoplay 				= $(this).data('swiper-autoplay'),
				swiperMousewheelControl 	= $(this).data('swiper-wheel-control'),
				swipeSlidesPerview 			= $(this).data('slides-perview'),
				swiperMargin 				= parseInt($(this).data('swiper-margin')),
				swiperSlideEffect 			= $(this).data('slide-effect'),
				swiperAutoHeight 			= $(this).data('autoheight'),
				swiperScrollbar 			= ($(this).data('scrollbar') ? $(this).find('.swiper-scrollbar') : null);
				swiperScrollbar 			= (isExists(swiperScrollbar) ? swiperScrollbar : null);
				
			
			var swiper = new Swiper($(this)[0], {
				pagination			: $(this).find('.swiper-pagination'),
				
				autoplayDisableOnInteraction: false,
				slidesPerView		: ( swiperSlidePerView ? swiperSlidePerView : 1 ),
				direction			: ( swiperDirection ? swiperDirection : 'horizontal'),
				loop				: ( swiperLoop ? swiperLoop : false),
				nextButton			: '.swiper-button-next',
				prevButton			: '.swiper-button-prev',
				autoplay			: ( swiperAutoplay ? swiperAutoplay : false),
				paginationClickable	: true,
				spaceBetween		: ( swiperMargin ? swiperMargin : 0),
				mousewheelControl	: ( (swiperMousewheelControl) ? swiperMousewheelControl : false),
				scrollbar			: ( swiperScrollbar ? swiperScrollbar : null ),
				scrollbarHide		: false,
				speed				: ( swiperSpeed ? swiperSpeed : 1000 ),
				autoHeight			: ( (swiperAutoHeight == false) ? swiperAutoHeight : true ),
				effect				: ( swiperSlideEffect ? swiperSlideEffect : 'coverflow' ),
				fade				: { crossFade: swiperCrossFade ? swiperCrossFade : false },
				breakpoints			: {
											1200: { slidesPerView: swiperBreakpoints ? 3 : 1, },
											992: { slidesPerView: swiperBreakpoints ? 2 : 1, },
											580: { slidesPerView: 1, }
											
										},
			});
			
			$('.swiper-container').hover(function(){
				swiper.stopAutoplay();
			}, function(){
				swiper.startAutoplay();
			});
			
			
		});
		
		
	}
}
