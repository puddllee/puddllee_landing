$(document).ready(function () {
  "use strict";

  var MAX_SCROLL = 1000;
  var MIN_PERCENT = 0.8;
  var currentScroll = 0;

  $('body').on('wheel', function (event) {
    var e = event.originalEvent;
    currentScroll += e.deltaY;
    if (currentScroll < 0) currentScroll = 0;
    if (currentScroll > MAX_SCROLL) currentScroll = MAX_SCROLL;
    setTransform();
  });

  function setTransform() {
    var percent = 1 - (MIN_PERCENT * (currentScroll / MAX_SCROLL));
    var rightDiv = $('#right-div');
    rightDiv.css({
      'scaleX': percent,
      'transform-origin': 'center right'
    });
  }
});
