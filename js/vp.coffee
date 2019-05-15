getMarker = ->
  marker = $("#vp-image-header-text")
  if marker.length == 0
    marker = $("#vp-video-header-text")
    if marker.length == 0
      return null
    else
      return marker
  else
    return marker

handleScroll = (nav, marker) ->
  nav_height = nav.outerHeight(true)
  scroll_position = $(window).scrollTop()
  nav_bottom = scroll_position + nav_height
  marker_position = marker.offset().top
  if scroll_position == 0
    nav.removeClass("vp-nav-scroll")
  else
    if nav_bottom >= marker_position
      nav.addClass("vp-nav-scroll")
    else
      nav.removeClass("vp-nav-scroll")

$ ->
  try
    owl_xs =
      items: 1
      nav: false
      dots: true
      autoplay: true
      autoplayHoverPause: true
      loop: true
    owl_md =
      items: 2
      nav: false
      dots: true
    owl_lg =
      items: 4
      nav: false
      dots: false
    owl_breakpoints =
      0: owl_xs
      768: owl_md
      992: owl_lg
    owl_options =
      responsive: owl_breakpoints
    $(".owl-carousel").owlCarousel(owl_options);
  marker = getMarker()
  if marker
    nav = $("#vp-nav")
    handleScroll(nav, marker)
    $(window).on "scroll", ->
      handleScroll(nav, marker)
    $(window).on "resize", ->
      handleScroll(nav, marker)