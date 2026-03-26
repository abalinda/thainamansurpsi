/*
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#page-wrapper'),
		$banner = $('#banner'),
		$header = $('#header'),
		$whatsapp = $('.whatsapp-float');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Mobile?
		if (browser.mobile)
			$body.addClass('is-mobile');
		else {

			breakpoints.on('>medium', function() {
				$body.removeClass('is-mobile');
			});

			breakpoints.on('<=medium', function() {
				$body.addClass('is-mobile');
			});

		}

	// Scrolly.
		// Prefer native smooth scroll when available (faster and less jank).
		var supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
		if (!supportsNativeSmoothScroll) {
			var scrollyOffset = $header.outerHeight();
			$window.on('resize', function() {
				scrollyOffset = $header.outerHeight();
			});
			$('.scrolly')
				.scrolly({
					speed: 700,
					offset: function() { return scrollyOffset; }
				});
		}

	// Menu.
		$('#menu')
			.append('<a href="#menu" class="close"></a>')
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right',
				target: $body,
				visibleClass: 'is-menu-visible'
			});

	// Header.
		var useAltHeader = $header.hasClass('alt'),
			manageWhatsappOnLanding = $body.hasClass('landing') && $whatsapp.length > 0,
			setWhatsappVisibility = function(isVisible) {
				if (!manageWhatsappOnLanding)
					return;

				$whatsapp
					.toggleClass('is-visible', isVisible)
					.attr('aria-hidden', isVisible ? 'false' : 'true');

				if (isVisible)
					$whatsapp.removeAttr('tabindex');
				else
					$whatsapp.attr('tabindex', '-1');
			};

		if ($whatsapp.length > 0 && !manageWhatsappOnLanding)
			$whatsapp.attr('aria-hidden', 'false');

		if ($banner.length > 0
		&&	(useAltHeader || manageWhatsappOnLanding)) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight() + 1,
				initialize:	function() { setWhatsappVisibility(false); },
				terminate:	function() {
					if (useAltHeader)
						$header.removeClass('alt');

					setWhatsappVisibility(true);
				},
				enter:		function() {
					if (useAltHeader)
						$header.addClass('alt');

					setWhatsappVisibility(false);
				},
				leave:		function() {
					if (useAltHeader)
						$header.removeClass('alt');

					setWhatsappVisibility(true);
				}
			});

		}

})(jQuery);
