(function() {
  var getMarker, handleScroll;

  getMarker = function() {
    var marker;
    marker = $("#vp-image-header-text");
    if (marker.length === 0) {
      marker = $("#vp-video-header-text");
      if (marker.length === 0) {
        return null;
      } else {
        return marker;
      }
    } else {
      return marker;
    }
  };

  handleScroll = function(nav, marker) {
    var marker_position, nav_bottom, nav_height, scroll_position;
    nav_height = nav.outerHeight(true);
    scroll_position = $(window).scrollTop();
    nav_bottom = scroll_position + nav_height;
    marker_position = marker.offset().top;
    if (scroll_position === 0) {
      return nav.removeClass("vp-nav-scroll");
    } else {
      if (nav_bottom >= marker_position) {
        return nav.addClass("vp-nav-scroll");
      } else {
        return nav.removeClass("vp-nav-scroll");
      }
    }
  };

  $(function() {
    var marker, nav, owl_breakpoints, owl_lg, owl_md, owl_options, owl_xs;
    try {
      owl_xs = {
        items: 1,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayHoverPause: true,
        loop: true
      };
      owl_md = {
        items: 2,
        nav: false,
        dots: true
      };
      owl_lg = {
        items: 4,
        nav: false,
        dots: false
      };
      owl_breakpoints = {
        0: owl_xs,
        768: owl_md,
        992: owl_lg
      };
      owl_options = {
        responsive: owl_breakpoints
      };
      $(".owl-carousel").owlCarousel(owl_options);
    } catch (error) {}
    marker = getMarker();
    if (marker) {
      nav = $("#vp-nav");
      handleScroll(nav, marker);
      $(window).on("scroll", function() {
        return handleScroll(nav, marker);
      });
      return $(window).on("resize", function() {
        return handleScroll(nav, marker);
      });
    }
  });

}).call(this);
