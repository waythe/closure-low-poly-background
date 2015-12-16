goog.require('goog.dom')
goog.require('wythe.lowpolybg')

window.onload = function() {
    var body = goog.dom.getElementsByTagNameAndClass('body')[0];
    var canvas = wythe.lowpolybg.createLowPolyCanvas('HelloWorld', {});
    canvas.style.left = '0px';
    canvas.style.top = '0px';
    canvas.style.position = 'absolute';
    body.appendChild(canvas);
}