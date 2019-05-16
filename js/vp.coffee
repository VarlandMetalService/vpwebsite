load_video = ->
  header = $("#vp-cta video")
  width = $(window).width()
  if header.length > 0 && width >= 768
    header.html("<source src=\"" + header.data("video") + "\" type=\"video/mp4\">")

rem = ->
  html = document.getElementsByTagName('html')[0]
  return parseInt(window.getComputedStyle(html)['fontSize'])

set_borders = ->
  console.log "Running set_borders"
  card_tops = $(".vp-cta-card-image-overlay")
  card_tops.each (index, element) =>
    width = $(element).outerWidth()
    css =
      "border-left-width": (width / 2) + "px"
      "border-right-width": (width / 2) + "px"
    $(element).css(css)

$ ->
  try
    owl_xs =
      items: 1
      nav: false
      dots: true
      loop: true
    owl_md =
      items: 2
      nav: false
      dots: true
      loop: true
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
      margin: 2 * rem()
      onResized: set_borders
    $(".owl-carousel").owlCarousel(owl_options);
  load_video()
  set_borders()