(function() {
  var load_video, rem, set_up_cards;

  load_video = function() {
    var header, width;
    header = $("#vp-header video");
    width = $(window).width();
    if (header.length > 0 && width >= 768) {
      return header.html("<source src=\"" + header.data("video") + "\" type=\"video/mp4\">");
    }
  };

  rem = function() {
    var html;
    html = document.getElementsByTagName('html')[0];
    return parseInt(window.getComputedStyle(html)['fontSize']);
  };

  set_up_cards = function() {
    var card_tops;
    card_tops = $(".vp-cta-card-image-overlay");
    return card_tops.each((function(_this) {
      return function(index, element) {
        var css, width;
        width = $(element).outerWidth();
        css = {
          "border-left-width": (width / 2) + "px",
          "border-right-width": (width / 2) + "px"
        };
        return $(element).css(css);
      };
    })(this));
  };

  $(function() {
    var owl_breakpoints, owl_lg, owl_md, owl_options, owl_xs;
    try {
      owl_xs = {
        items: 1,
        nav: false,
        dots: true,
        loop: true
      };
      owl_md = {
        items: 2,
        nav: false,
        dots: true,
        loop: true
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
    return load_video();
  });

}).call(this);
