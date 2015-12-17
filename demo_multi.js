goog.require('goog.dom')
goog.require('wythe.lowpolybg')

window.onload = function() {
    var body = goog.dom.getElementsByTagNameAndClass('body')[0];
    for (var i=0; i<900; i++){
        var canvas = wythe.lowpolybg.createLowPolyCanvas(''+i, {width:600, height:300,cellSize:45});
        body.appendChild(canvas);
    }
}
