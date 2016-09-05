;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);
	var winW = $win.width();

	var Infographic = function($element) {
		this.$infographic = $element;
		this.$stage = this.$infographic.find('.infographic-inner');
		this.$player = this.$infographic.find('.infographic-player');
		this.$playerInner = this.$infographic.find('.infographic-player-inner');
		this.$btnStart = this.$infographic.find('.btn-start');
		this.$btnExit = this.$infographic.find('.btn-exit');
		this.$characterPopup = this.$infographic.find('.infographic-start');
		this.stageWidth = this.$stage.width() - 480; // stage margins because of scale
		this.scroll = 0;
		this.lastScroll = 0;
		this.lastOffset = 0;
		this.scrollInterval;
		this.isMacLike = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)?true:false;
		this.isIOS = navigator.platform.match(/(iPhone|iPod|iPad)/i)?true:false;
		this.transformMatrix = {
			0: [0,0],
			1: [5,5],
			2: [10,10],
			3: [20,15],
			4: [30,18],
			5: [55,25],
			6: [80,30],
			7: [100,30],
			8: [120,25],
			9: [140,25],
			10: [150,0],
			11: [140,-10],
			12: [140,-10],
			13: [140,-10],
			14: [130,-10],
			15: [120,-10],
			16: [110,-10],
			17: [100,-10],
			18: [90,-10],
			19: [80,-10],
			20: [70,-10],
			21: [60,-10],
			22: [50,-10],
			23: [45,-8],
			24: [40,-6],
			25: [40,-2],
			26: [40,-2],
			27: [45,-2],
			28: [55,5],
			29: [60,15],
			30: [65,20],
			31: [80,25],
			32: [100,30],
			33: [120,30],
			34: [140,30],
			35: [160,25],
			36: [165,20],
			37: [170,18],
			38: [175,0],
			39: [175,0],
			40: [170,-5],
			41: [165,-5],
			42: [160,-5],
			43: [155,-5],
			44: [150,-5],
			45: [145,-5],
			46: [140,-5],
			47: [135,-5],
			48: [130,-5],
			49: [125,-5],
			50: [110,-5],
			51: [100,-5],
			52: [90,-5],
			53: [80,-5],
			54: [70,-5],
			55: [65,-5],
			56: [60,-5],
			57: [50,-5],
			58: [40,0],
			59: [40,0],
			60: [40,0],
			61: [40,0],
			62: [40,0],
			63: [40,0],
			64: [40,0],
			65: [40,0],
			66: [40,0],
			67: [40,5],
			68: [50,10],
			69: [50,10],
			70: [55,10],
			71: [60,10],
			72: [65,10],
			73: [70,10],
			74: [75,10],
			75: [80,10],
			76: [80,10],
			77: [80,10],
			78: [80,10],
			79: [82,10],
			78: [85,10],
			79: [85,10],
			80: [90,10],
			81: [95,10],
			82: [100,10],
			83: [100,10],
			84: [100,10],
			85: [100,10],
			86: [100,8],
			87: [100,8],
			88: [100,7],
			89: [100,5],
			90: [100,0],
			91: [100,-2],
			92: [100,-4],
			93: [100,-6],
			94: [100,0],
			95: [90,-2],
			96: [85,-4],
			97: [80,-6],
			98: [75,-6],
			99: [70,-6],
			100: [65,-6],
			101: [65,-7],
			102: [65,-8],
			103: [65,-9],
			104: [55,-10],
			105: [45,-9],
			106: [40,-8],
			107: [40,-7],
			108: [40,-7],
			109: [40,-5],
			110: [40,-3],
			111: [40,0],
			112: [40,0],
			113: [40,3],
			114: [45,6],
			115: [50,9],
			116: [55,10],
			117: [60,10],
			118: [65,10],
			119: [70,10],
			120: [75,10],
			121: [80,15],
			122: [85,15],
			123: [90,20],
			124: [110,25],
			125: [130,25],
			126: [130,25],
			127: [140,25],
			128: [150,20],
			129: [160,5],
			130: [160,0],
			131: [150,-10],
			132: [145,-10],
			133: [140,-15],
			134: [135,-20],
			135: [130,-25],
			136: [120,-30],
			137: [110,-35],
			138: [105,-33],
			139: [90,-30],
			140: [80,-30],
			141: [70,-30],
			142: [40,-20],
			143: [35,-20],
			143: [25,-20],
			144: [15,-15],
			145: [15,-10],
			146: [15,-5],
			147: [15,0],
			148: [15,5],
			149: [15,5],
			150: [15,5],
			151: [15,5],
			152: [15,15],
			153: [20,20],
			155: [30,20],
			156: [40,20],
			157: [50,20],
			155: [55,20],
			159: [60,20],
		}

		this.init();
	};

	Infographic.prototype.init = function() {
		this.bind();
		this.$stage.swipeEvents();
	};

	Infographic.prototype.bind = function() {
		var self = this;

		self.$btnStart.on('click', function (event) {
			var character = $(this).data('character');

			self.startGame(character);

			event.preventDefault();
		});

		self.$btnExit.on('click', function (event) {
			self.stopGame();

			event.preventDefault();
		});
	};

	Infographic.prototype.togglePopups = function() {
		if (winW > 767) {
			$('.infographic-popup-trigger').each(function() {
				var $this = $(this);
				var offsetLeft = $this.offset().left;

				if (offsetLeft <= winW/2 + 40 && offsetLeft >= winW/2 - 40) { // 80 is the width of the logo so the popup can be toggled when its below the logo
					$($this.attr('href')).addClass('infographic-popup-visible')
						.siblings().removeClass('infographic-popup-visible');
				}
			});
		}
	};

	Infographic.prototype.startGame = function(character) {
		var self = this;
		self.$infographic.addClass('infographic-runing');
		self.$player.addClass('infographic-player-' + character);
		self.toggleScroll(true);

		if (winW > 1279) {
			$('html, body').animate({
				scrollTop: self.$infographic.offset().top - $('.header').outerHeight()
			}, 500)
		}

		$doc.off('keydown').on('keydown', function (event) {
			var key = event.which;

			if ( key == 39 ) { // Arrow right
				self.translateViaKeys('right');
			}

			if ( key == 37 ) { //Arrow left
				self.translateViaKeys('left');
			}
		});

		self.$stage.off('swipeLeft').on('swipeLeft', function() {
			self.translateViaSwipe('right');
		}).off('swipeRight').on('swipeRight', function() {
			self.translateViaSwipe('left');
		});
	};

	Infographic.prototype.stopGame = function() {
		this.$infographic.removeClass('infographic-runing');
		this.$player.removeClass().addClass('infographic-player');
		this.toggleScroll(false);
	};

	Infographic.prototype.changeScrollPoistion = function(directon) {
		var self = this;

		if (directon < 0) {
			self.scroll++
		} else {
			self.scroll--

			if (self.scroll <= 0) {
				self.scroll = 0;
			}
		}

		self.translateStage(self.scroll);
		self.rotatePlayer(self.scroll);
		self.translatePlayer(self.scroll);
		self.togglePopups();
		self.$player.addClass('infographic-player-moving');
	};

	Infographic.prototype.translateViaSwipe = function(directon) {
		var self = this;

		if (directon == 'right') {
			self.scroll+=5
		} else if (directon == 'left') {
			self.scroll-=5

			if (self.scroll <= 0) {
				self.scroll = 0;
			}
		}

		self.translateStage(self.scroll);
		self.rotatePlayer(self.scroll);
		self.translatePlayer(self.scroll);
		self.togglePopups();
		self.$player.addClass('infographic-player-moving');
	};

	Infographic.prototype.translateViaKeys = function(directon) {
		var self = this;

		if (directon == 'right') {
			self.scroll++
		} else if (directon == 'left') {
			self.scroll--

			if (self.scroll <= 0) {
				self.scroll = 0;
			}
		}

		self.translateStage(self.scroll);
		self.rotatePlayer(self.scroll);
		self.translatePlayer(self.scroll);
		self.togglePopups();
		self.$player.addClass('infographic-player-moving');
	};

	Infographic.prototype.toggleScroll = function(toggle) {
		var self = this;

		if (toggle) {
			$win.on('mousewheel', function(event) {
				var directon = event.originalEvent.wheelDelta;

				if ( self.scrollInterval ) clearTimeout(self.scrollInterval);

				if (self.isMacLike || self.isIOS) {
				    self.scrollInterval = setTimeout(function(){
				    	self.changeScrollPoistion(directon);
				    }, 15);
				} else {
					self.changeScrollPoistion(directon);
				}

				event.preventDefault();
			});
		} else {
			$win.off('mousewheel');
		}
	};

	Infographic.prototype.translateStage = function(scroll) {
		var factor = 32; // This magic number equalizes scroll distance
		var offset = scroll * factor;
		var isScrolling = offset <= this.stageWidth - winW;

		if (winW < 768) {
			isScrolling = offset <= this.stageWidth - ( winW + 300);
		}

		if ( isScrolling ) {
			this.$stage.css({
				'transform': 'translate3d(-'+ offset +'px, 0, 0)'
			});

			this.lastScroll = this.scroll;
		} else {
			this.scroll = this.lastScroll;
		}

		this.$stage.toggleClass('infographic-inner-end', !isScrolling);
	};

	Infographic.prototype.rotatePlayer = function(scroll) {
		if (this.transformMatrix[scroll] != undefined) {
			var y = this.transformMatrix[scroll][0];
			var deg = this.transformMatrix[scroll][1];

			this.$playerInner.css({
				'transform': 'translateY('+ y +'px) rotate('+ deg +'deg)'
			});
		}
	};

	Infographic.prototype.translatePlayer = function(scroll) {
		var factor = 12.8; // This magic number equalizes scroll distance
		var offset = scroll * factor;

		if ( offset <= 951 - this.$player.width()/2 - 100) {
			this.$player.css({
				'transform': 'translate3d('+ offset +'px, 0, 0)'
			});

			this.lastOffset = offset;
		}
	};

	var Timeline = function($element) {
		this.$timeline = $element;
		this.$stage = this.$timeline.find('.timeline-stage');
		this.$prev = this.$timeline.find('.timeline-prev');
		this.$next = this.$timeline.find('.timeline-next');
		this.timelineWidth = this.$timeline.find('.timeline-image').width();
		this.scroll = 0;
		this.lastScroll = 0;

		this.init();
	}

	Timeline.prototype.init = function() {
		this.bind();
		this.$timeline.swipeEvents();
	};

	Timeline.prototype.bind = function() {
		var self = this;

		self.$prev.on('click touchstart', function (event) {
			self.slideTo('right');

			event.preventDefault();
		});

		self.$next.on('click touchstart', function (event) {
			self.slideTo('left')

			event.preventDefault();
		});

		this.$timeline.on('swipeLeft', function (event) {
			self.slideTo('left');
		});

		this.$timeline.on('swipeRight', function (event) {
			self.slideTo('right');
		});

		$doc.on('keydown', function (event) {
			var key = event.which;

			if ( key == 39 ) { // Arrow right
				self.slideTo('left');
			}

			if ( key == 37 ) { //Arrow left
				self.slideTo('right');
			}
		});
	};

	Timeline.prototype.slideTo = function(directon) {
		if (directon == 'left') {
			this.scroll++;
		} else if (directon == 'right') {
			this.scroll--;

			if (this.scroll < 0) {
				this.scroll = 0;
			}
		}

		this.translateStage(this.scroll);
	};

	Timeline.prototype.translateStage = function(scroll) {
		var factor = 400;
		var offset = scroll * factor;
		var isScrolling = offset <= this.timelineWidth - winW;

		if ( isScrolling ) {
			this.$stage.css({
				'transform': 'translate3d(-'+ offset +'px, 0, 0)'
			});

			this.lastScroll = this.scroll;
		} else {
			this.scroll = this.lastScroll;
		}
	};

	$.fn.swipeEvents = function() {
	    return this.each(function() {

	        var startX;
	        var startY;
	        var $this = $(this);

	        $this.bind('touchstart', touchstart);

	        function touchstart(event) {
	            var touches = event.originalEvent.touches;
	            if (touches && touches.length) {
	                startX = touches[0].pageX;
	                startY = touches[0].pageY;
	                $this.bind('touchmove', touchmove);
	            }
	        }

	        function touchmove(event) {
	            var touches = event.originalEvent.touches;

	            if (touches && touches.length) {
	                var deltaX = startX - touches[0].pageX;
	                var deltaY = startY - touches[0].pageY;

	                if (deltaX >= 50) {
	                    $this.trigger("swipeLeft");
	                }
	                if (deltaX <= -50) {
	                    $this.trigger("swipeRight");
	                }
	                if (deltaY >= 50) {
	                    $this.trigger("swipeUp");
	                }
	                if (deltaY <= -50) {
	                    $this.trigger("swipeDown");
	                }
	                if (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50) {
	                    $this.unbind('touchmove', touchmove);
	                }
	            }
	        }
	    });
	};

	function resizeImages(winW) {
		if( winW > 767 && winW % 2 === 1) {
	        var largeImageHeight = $smallImage.height() * 2;

	        $largeImage.css({
	            height: largeImageHeight
	        });
	    } else {
	        $largeImage.attr('style', '');
	    }
	}

	var $largeImage, $smallImage, $wrapper;

	$doc.ready(function() {
		var $infographicPopups = $('.infographic-popup');
		var infographic;

		$wrapper = $('.wrapper');
		$largeImage = $('.photos-main').find('img');
		$smallImage = $('.photo-small:eq(0)').find('img');
		var winW = $win.width();

		$win.on('resize', function() {
		    winW = $win.width();

		    resizeImages(winW);
		});

		resizeImages(winW);

		//Locations
		$('.location-trigger, .location h4').on('click', function (event) {
			$(this).closest('.location').toggleClass('location-active')

			event.preventDefault();
		});

		//Infographic init
		if ($('.infographic').length) {
			infographic = new Infographic($('.infographic'));
		}

		//Infographic popups
		$('.infographic-popup-trigger').on('click', function (event) {
			var $target = $($(this).attr('href'));

			$target.toggleClass('infographic-popup-visible').siblings().removeClass('infographic-popup-visible');

			event.preventDefault();
		});

		$infographicPopups.on('click', '.link-close', function (event) {
			$(this).closest('.infographic-popup').removeClass('infographic-popup-visible');

			event.preventDefault();
		});

		$doc.on('click', function (event) {
			if (!$(event.target).closest('.infographic-popups').length && !$(event.target).closest('.infographic-popups-triggers').length) {
				$infographicPopups.removeClass('infographic-popup-visible');
			}
		});

		// Scroll to
		function scrollTo(to, duration) {
			$('html, body').stop().animate({
				scrollTop: to
			}, duration);
		};

		// Intro Scroll
		var $intro = $('.intro');

		$('.intro .intro-scroll').on('click', function(event) {
			event.preventDefault();

			scrollTo($intro.offset().top + $intro.outerHeight() - 35, 500)
		});

		// Footer Button Top
		$('.footer-btn-top').on('click', function(event) {
			event.preventDefault();

			scrollTo(0, 500);
		});

		// Footer Button Top
		$('.btn-top').on('click', function(event) {
			event.preventDefault();

			scrollTo(0, 500);
		});

		// Custom Select
		$('.select').dropdown();

		// Animate Numbers
		var $numbers = $('[data-animate-number]');
		function animateNumbers() {
			$numbers.each(function(index, el) {
				var $this = $(this);
				var number = parseInt($this.data('animate-number'));

				$({ val: 0 }).animate({ val: number }, {
					duration: 3000,
					easing: 'swing',
					step: function() {
						$this.text(Math.round(this.val));
					}
				});
			});
		};

		var numbersAnimated = false;

		if ($numbers.length) {
			$win.on('scroll load resize', function(event) {
				if (!numbersAnimated && $win.scrollTop() + $win.height() >= $('.section-about').offset().top + $win.height() / 2) {
					animateNumbers();
					numbersAnimated = true;
				};
			});
		};

		//Slider-results
		$('.slider-results .slides').addClass('owl-carousel').owlCarousel({
			margin: 10,
			mouseDrag: false,
			nav: true,
			navText: ['<', '>'],
			responsive: {
				0: {
					items: 1,
					autoWidth: true
				},
				768: {
					autoWidth: false,
					items: 3
				}
			}
		});

		// Slider Facts
		var $sliderFacts = $('.slider-facts .slides').owlCarousel({
			items: 1,
			nav: true,
			navText: ['<i class="ico-prev"></i>', '<i class="ico-next"></i>'],
			navContainer: '.slider-facts .slider-actions'
		});

		$sliderFacts.on('change.owl.carousel', function(event) {
			numbersAnimated = false;
			animateNumbers();
			numbersAnimated = true;
		});

		// Slider Words
		var $sliderWords = $('.slider-words .slides').slick({
			infinite: true,
			arrows: false,
			draggable: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			vertical: true,
			autoplay: true,
			autoplaySpeed: 1000,
			pauseOnHover: false,
			focusOnSelect: true,
			touchMove: false
		});

		// Slider Facts
		$('.slider-words-alt .slides').owlCarousel({
			loop: true,
			items: 1,
			nav: true,
			navText: ['<i class="ico-prev"></i>', '<i class="ico-next"></i>']
		});


		$('.slider-words .slide-toggle').on('click', function(event) {
			event.preventDefault();
			event.stopPropagation();

			var $slide = $(this).closest('.slide');
			var $this = $(this);

			if ($slide.hasClass('slide-expanded')) {
				$sliderWords.slick('slickPlay')
			} else {
				$sliderWords.slick('slickPause')
			};

			$slide.toggleClass('slide-expanded');

			$('body').one('click', function(event) {
				$slide.removeClass('slide-expanded');
				$sliderWords.slick('slickPlay')
			});
		});

		$('.slider-words .slide-word').on('click', function(event) {
			event.preventDefault();

			setTimeout(function() {
				$('.slider-words .slick-current .slide-toggle').trigger('click');
			}, 500);
		});

		$('.slider-words .slide-photos').on('click', function(event) {
			event.stopPropagation();
		});

		// Slider Axes
		var $sliderAxes = $('.slider-axes .slides').owlCarousel({
			items: 1,
			msouseDrag: false,
			dots: true
		});

		if ($sliderAxes.length) {
			$win.on('scroll', function(event) {
				if ($sliderAxes.offset().top + 100 - ($win.scrollTop() + $win.height()) < 0) {
					$sliderAxes.addClass('slider-axes-active');
				};
			});
		}

		// Slider Facts Secondary
		var $sliderFacts = $('.facts-slider').owlCarousel({
			items: 1,
			nav: true,
			navText: ['<i class="ico-prev"></i>', '<i class="ico-next"></i>']
		});

		$sliderFacts.on('change.owl.carousel', function(event) {
			numbersAnimated = false;
			animateNumbers();
			numbersAnimated = true;
		});


		// Slider Facts Secondary
		var $sliderFacts = $('.students-slider').owlCarousel({
			items: 1,
			nav: true,
			navText: ['<i class="ico-prev"></i>', '<i class="ico-next"></i>']
		});

		$sliderFacts.on('change.owl.carousel', function(event) {
			numbersAnimated = false;
			animateNumbers();
			numbersAnimated = true;
		});

		// Slider Arts
		$('.slider-arts .slides').owlCarousel({
			loop: true,
			items: 1,
			margin: 10,
			nav: true,
			navText: ['<i class="ico-prev-alt"></i>', '<i class="ico-next-alt"></i>']
		});

		var $sliderArtsCaptions = $('.slider-arts-captions').owlCarousel({
			loop: true,
			items: 1,
			margin: 10,
			nav: false,
			touchDrag: false,
			mouseDrag: false,
			animateIn: 'fadeIn',
			animateout: 'fadeOut'
		});

		$('.slider-arts .slides').on('change.owl.carousel', function(event) {
			if (event.namespace && event.property.name === 'position') {
				var target = event.relatedTarget.relative(event.property.value, true);
				$sliderArtsCaptions.owlCarousel('to', target, 300, true);
			}
		})


		// Slider Arts
		$('.slider-calendar .slides').owlCarousel({
			loop: true,
			items: 3,
			margin: 20,
			nav: true,
			navText: ['<i class="ico-prev"></i>', '<i class="ico-next"></i>'],
			responsive: {
				0: {
					items: 1
				},
				768: {
					items: 3
				}
			}
		});

		// Slider-members

		$('.slider-members .owl-carousel').owlCarousel({
			loop: true,
			items: 1,
			nav: true,
			navText: ['<i class="ico-prev"></i>', '<i class="ico-next"></i>']
		});

		// Tabs
		(function(){
			var activeTabClass = 'active';

			$('.section-article-alt .list-pages a').on('click', function(event) {
				var $tabLink = $(this);
				var $targetTab = $($tabLink.attr('href'));

				$tabLink
					.parent()
					.add($targetTab)
					.addClass(activeTabClass)
						.siblings()
						.removeClass(activeTabClass);

				event.preventDefault();
			});

			$('.tabs-nav a').on('click', function(event) {
				var $tabLink = $(this);
				var $targetTab = $($tabLink.attr('href'));

				$tabLink
					.parent()
					.add($targetTab)
					.addClass(activeTabClass)
						.siblings()
						.removeClass(activeTabClass);

				event.preventDefault();
			});

			$('.tabs-nav-secondary a').on('click', function(event) {
				var $tabLink = $(this);
				var $targetTab = $($tabLink.attr('href'));

				$tabLink
					.parent()
					.add($targetTab)
					.addClass(activeTabClass)
						.siblings()
						.removeClass(activeTabClass);

				$tabLink.closest('ul').closest('li').siblings().find('.active').removeClass('active');

				event.preventDefault();
			});
		})();

		// Tab Info
		$('.tab-info a').on('click', function(event) {
			event.preventDefault();
			$(this).parent().toggleClass('active');
		});

		// Tabs Explore
		$('.tabs-teritary .tabs-nav a').on('click', function(event) {
			event.preventDefault();

			$(this).closest('.section-explore').addClass('section-explore-expanded');
		});

		$('.tabs-teritary .tab-reset').on('click', function(event) {
			event.preventDefault();

			$(this).closest('.tab.active').removeClass('active').closest('.tab.active').removeClass('active').closest('.tab.active').removeClass('active');
			$(this).closest('.section-explore-expanded').removeClass('section-explore-expanded').find('.tabs-nav .active').removeClass('active');
		});

		$('.tabs-quaternary .tab-btn').on('click', function(event) {
			event.preventDefault();

			$(this).closest('.tab').addClass('active').siblings().removeClass('active');
		});

		$('.tabs-quaternary .tab-close').on('click', function(event) {
			event.preventDefault();

			$(this).closest('.tab').removeClass('active').closest('.tabs-quaternary').find('active').removeClass('active');
		});

		// Feed Items Isotope
		var $feedItems = $('#feed-items').isotope({
			masonry: {
				columnWidth: 0,
				gutter: 0
			}
		});

		$('#feed-items').imagesLoaded().progress( function() {
			$feedItems.isotope('layout');
		});

		// Button Load
		$('.btn-load').on('click', function(event) {
			event.preventDefault();

			var target = $(this).data('target');
			var href = $(this).attr('href');

			$.ajax({
				url: href,
				type: 'get',
				success: function(data) {
					var $elements = $(data);

					$(target)
						.append($elements)
						.isotope('appended', $elements);
				}
			});
		});

		// Button Audio
		$('.btn-audio').on('click', function(event) {
			event.preventDefault();

			var $target = $($(this).attr('href'));
			$target[0].play();
		});

		// Inversed Header
		var $triggerHeader = $('.trigger-header');
		var $header = $('.header');

		if ($triggerHeader.length) {
			$win.on('scroll', function(event) {
				if ($win.scrollTop() >= $triggerHeader.offset().top) {
					$header.addClass('header-inversed');$header.addClass('header-inversed')
				} else {
					$header.removeClass('header-inversed')
				};
			});
		};

		// Skrollr Init
		var isMobile = (function(a,b){
			if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) {
				return true;
			} else {
				return false;
			}
		})(navigator.userAgent||navigator.vendor||window.opera);

		if (!isMobile && winW > 1023) {
			s = skrollr.init({
				mobileCheck: function() {
					return false;
				},
				forceHeight: false,
				smoothScrolling: false
			});

			$win.on('load', function(event) {
				s.refresh();
			});
		};

		// Video Popup
		$('.link-video').magnificPopup({
			type: 'iframe',
			removalDelay: 300,
			mainClass: 'mfp-fade'
		});

		// Search Box
		var $searchBox = $('.search-box')

		$('.btn-search').on('click', function(event) {
			event.preventDefault();

			$searchBox.addClass('search-box-visible');
		});

		$('.search-box-close').on('click', function(event) {
			event.preventDefault();

			$searchBox.removeClass('search-box-visible');
		});

		// Search Placeholder
		$('.search input').on('focus', function(event) {
			var placeholder = $(this).attr('placeholder');
			$(this).attr('placeholder', '');

			$(this).one('blur', function(event) {
				$(this).attr('placeholder', placeholder);
			});
		});

		// Mobile Nav
		var $navMobile = $('.nav-mobile');

		$('.btn-nav').on('click', function(event) {
			event.preventDefault();
			event.stopPropagation();

			$navMobile.addClass('nav-mobile-visible');
			$('body, html').addClass('body-lock');

			$('body').one('click', function(event) {
				$navMobile.removeClass('nav-mobile-visible');
				$('body, html').removeClass('body-lock');
			});
		});

		$('.nav-mobile .nav-close').on('click', function(event) {
			event.preventDefault();

			$navMobile.removeClass('nav-mobile-visible');
			$('body, html').removeClass('body-lock');
		});

		$('.nav-mobile .nav-toggle').on('click', function(event) {
			event.preventDefault();

			$(this)
				.siblings('.nav-dropdown').slideToggle(300)
				.closest('li').toggleClass('nav-expanded');
		});

		$('.nav-mobile').on('click', function(event) {
			event.stopPropagation();
		});

		// Intro Video Overlay
		$('.intro-video-play').on('click', function(event) {
			event.preventDefault();

			$('.intro-video-overlay').addClass('intro-video-overlay-visible').find('iframe').attr('src', $(this).attr('href'));
		});

		// Nav Search Button
		$('.nav-search-btn').on('click', function(event) {
			event.preventDefault();

			$('.nav-search').toggleClass('nav-search-visible');
		});


        $('.search-close').on('click', function(event) {
            event.preventDefault();

            $('.nav-search').toggleClass('nav-search-visible');
        });

		// List Sortable
		$('.list-sortable').sortable();

		// Custom Scrollbar
		$('.custom-scroll').mCustomScrollbar({
			scrollInertia: 250
		});

		// Bookmarks
		$('.link-bookmarks').on('click', function(event) {
			event.preventDefault();
			event.stopPropagation();

			var $target = $($(this).attr('href'));

			$target.toggleClass('bookmarks-visible');

			$('body').one('click', function(event) {
				$target.removeClass('bookmarks-visible');
			});
		});

		$('.bookmarks').on('click', function(event) {
			event.stopPropagation();
		});

		$('.bookmarks-btn-setup').on('click', function(event) {
			event.preventDefault();
			$(this).siblings('.bookmarks-setup').slideToggle().closest('li').toggleClass('active');
		});

		$('.bookmarks-edit-btn-popup').on('click', function(event) {
			event.preventDefault();
			$(this).closest('.bookmarks').addClass('bookmarks-editmode');
		});

		$('.bookmarks-edit-foot a').on('click', function(event) {
			event.preventDefault();
			$(this).closest('.bookmarks').removeClass('bookmarks-editmode');
		});

		// Intro Links
		$('.intro-links a').on('click', function(event) {
			if ($(this).siblings('ul').length) {
				event.preventDefault();

				$(this)
					.siblings('ul').slideToggle(300)
					.parent('li').toggleClass('active')
					.siblings().removeClass('active')
					.find('ul').slideUp(300);
			}
		});

		// Passport Flip Book
		var $passport = $('.passport-pages').bookblock({
			circular: true
		});

		if ($passport.length) {
			$('.passport-next').on('click', function(event) {
				event.preventDefault();
				$passport.bookblock('next');
			});

			$('.passport-prev').on('click', function(event) {
				event.preventDefault();
				$passport.bookblock('prev');
			});
		};

		// Autocomplete
		var availableTags = [
			{ "value": "Accountant", "tab": "#tab-career-inner1" },
			{ "value": "Advertising Executive", "tab": "#tab-career-inner2" },
			{ "value": "Auditor", "tab": "#tab-career-inner2" },
			{ "value": "Business Analyst", "tab": "#tab-career-inner1" },
			{ "value": "Chief Financial Officer", "tab": "#tab-career-inner2" },
			{ "value": "Commercial Banker", "tab": "#tab-career-inner1" },
			{ "value": "Economist", "tab": "#tab-career-inner2" },
			{ "value": "Entrepreneur", "tab": "#tab-career-inner1" },
			{ "value": "Financial Advisor", "tab": "#tab-career-inner2" },
			{ "value": "Financial Planner", "tab": "#tab-career-inner1" },
			{ "value": "Marketing Specialist", "tab": "#tab-career-inner2" },
			{ "value": "Public Relations Specialist", "tab": "#tab-career-inner1" },
			{ "value": "Statistician", "tab": "#tab-career-inner2" },
			{ "value": "Stockbroker", "tab": "#tab-career-inner2" },
			{ "value": "Tax Accountant", "tab": "#tab-career-inner1" },
			{ "value": "Tax Lawyer", "tab": "#tab-career-inner2" },
			{ "value": "Tax Specialist", "tab": "#tab-career-inner1" },
			{ "value": "Treasure", "tab": "#tab-career-inner2" }
		];

		$('.search-career input').autocomplete({
			source: availableTags,
			select: function(ui, event) {
				$(event.item.tab).addClass('active').siblings().removeClass('active');
			}
		});

		// Section Costs Info
		$('.section-costs .section-info-toggle, .section-financial-aid .section-info-toggle').on('click', function(event) {
			event.preventDefault();

			$(this).closest('.section-info').toggleClass('active');
		});

		$('.section-costs .section-info-close').on('click', function(event) {
			event.preventDefault();

			$(this).closest('.section-info').removeClass('active');
		});

		// Accordion
		$('.accordion .accordion-head').on('click', function(event) {
			event.preventDefault();

			$(this).closest('.accordion-section').toggleClass('active').siblings().removeClass('active');
		});


		$('.list-pages .list-pages-head i').on('click', function(event) {

			$(this).closest('.list-pages-section').toggleClass('expanded').siblings().removeClass('expanded');
		});

		// Section Toggle
		$('.section-article .section-title').on('click', function(event) {
			event.preventDefault();

			$(this).closest('.section-image').toggleClass('active');
		});

		// Costs Reveal
		$('[data-reveal]').on('change', function(event) {
			var $target = $($(this).data('reveal'));

			$target.addClass('active').siblings().removeClass('active');
		});

		// Chart Animation
		var $chart = $('.chart');

		if ($chart.length) {
			$win.on('scroll', function(event) {
				if ($win.scrollTop() + $win.height() > $chart.offset().top + $chart.outerHeight()) {
					$chart.addClass('active');
				}
			});
		}

		// Scroll-animation

		 function performanceData(topPosition) {
			$('.update , .js-animation').each(function() {
			  var element = $(this),
			  winH = $win.height()/1.2

			  for (var i = element.length - 1; i >= 0; i--) {
				  var currentElementTop = element.eq(i).offset().top - winH,
					  currentScrollTop = topPosition

				if ( topPosition > currentElementTop ) {
					setTimeout(function() {
						element.addClass('animate');
					}, 100);

				} else {
				  setTimeout(function() {
					 element.removeClass('animate')
				  }, 100);
				};
			  };
			})
		  };

		  // Scroll animation
			   $win.on('scroll', function(){
				 var topPosition = $win.scrollTop()

				 performanceData(topPosition);
			   });

		// Keyword-popup

		$('.list-keywords li > a').on('click', function(event){
			$(this).next().addClass('visible');
			event.preventDefault();
		});

		$('.btn-del').on('click', function(event){
			$(this).parents('.popup').removeClass('visible');
			event.preventDefault();
		});

		$(document).on("click",".list-letters a[href^='#']",function(e){
		  var href=$(this).attr("href"),target=$(href).parents(".mCustomScrollbar");
		  if(target.length){
			e.preventDefault();
			target.mCustomScrollbar("scrollTo",href);
		  }
		});

		// Mobile-tabs


		$('.tabs-quinary .tabs-body .tab > a').on('click', function(event){

			$(this).closest('.tab').toggleClass('expand').siblings().removeClass('expand');

			event.preventDefault();

		});


		$win.on('resize', function() {
			winW = $win.width();
		}).on('load', function() {
			//Timeline
			if ($('.timeline').length) {
				timeline = new Timeline($('.timeline'));
			}
		});
	});
})(jQuery, window, document);
