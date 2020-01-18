var lastMouseX = 0,
  lastMouseY = 0;
var rotX = 0,
  rotY = 0;

$(document).on('mousedown', function(ev) {
  lastMouseX = ev.clientX;
  lastMouseY = ev.clientY;
  $(document).on('mousemove', mouseMoved);
});
$(document).on('mouseup', function() {
  $(document).off('mousemove', mouseMoved);
});

function mouseMoved(ev) {
  var deltaX = ev.pageX - lastMouseX;
  var deltaY = ev.pageY - lastMouseY;

  lastMouseX = ev.pageX;
  lastMouseY = ev.pageY;

  rotY -= deltaX * 0.1;
  rotX += deltaY * 0.1;

  $('#cube').css(
    'transform',
    'translateZ( -100px) rotateX( ' + rotX + 'deg) rotateY(' + rotY + 'deg)'
  );
}
