goog.provide('wythe.lowpolybg');

goog.require('goog.dom');
goog.require('goog.array');
goog.require('goog.object');
goog.require('goog.math');
goog.require('goog.color');
goog.require('goog.style');
goog.require('goog.testing.PseudoRandom');
goog.require('goog.crypt.Md5');
goog.require('wythe.delaunay');

wythe.lowpolybg.defaultOpts = {
    width: 400, // Default width
    height: 200, // Default height
    cellSize: 30, // Size of the cells used to generate a randomized grid
    variance: 0.75, // how much to randomize the grid
    seed: null, // Seed for the RNG
    lineWidth: 1 // Line width of the triangles
};

wythe.lowpolybg.params = {};

wythe.lowpolybg.createLowPolyCanvas = function(identifier, container, opts) {
    this.calcParams_(identifier, container, opts);
    return this.drawTriangles_(this.params);
};

wythe.lowpolybg.drawTriangles_ = function(params) {
    var canvas = document.createElement('canvas');
    canvas.id = params.identifier;
    canvas.width = params.width;
    canvas.height = params.height;

    context = canvas.getContext("2d");
    context.canvas.width = params.width;
    context.canvas.height = params.height;

    goog.array.forEach(params.triangles, function(triangle) {
        context.fillStyle = context.strokeStyle = triangle['color'];
        context.lineWidth = params.lineWidth;
        context.beginPath();
        context.moveTo.apply(context, triangle['vertices'][0]);
        context.lineTo.apply(context, triangle['vertices'][1]);
        context.lineTo.apply(context, triangle['vertices'][2]);
        context.fill();
        context.stroke();
    });

    return canvas;
};

wythe.lowpolybg.calcParams_ = function(identifier, container, opts) {
    var params = {};
    goog.object.extend(params, this.defaultOpts);
    goog.object.extend(params, opts);
    params.identifier = identifier;
    params.container = container;

    // calculate characters from identifier string
    params.hash = this.simpleHash_(identifier);
    params.colors = this.getColorsFromHash_(params.hash);
    params.seed = this.getSeedFromHash_(params.hash);
    params.rand = new goog.testing.PseudoRandom(params.seed);

    // get width and height of the dom
    params.width = goog.style.getSize(container).width;
    params.height = goog.style.getSize(container).height;

    params.points = this.generatePoints_(params);
    params.indices = wythe.delaunay.triangulate(params.points);
    params.triangles = [];
    for (var index = 0; index < params.indices.length; index += 3) {
        params.triangles.push({
            'vertices': [params.points[params.indices[index]], params.points[params.indices[index + 1]], params.points[params.indices[index + 2]]],
            'color': goog.color.rgbToHex(goog.math.randomInt(255), goog.math.randomInt(255), goog.math.randomInt(255))
        })
    }

    this.params = params;
};

wythe.lowpolybg.simpleHash_ = function(identifier) {
    var hashMethod = new goog.crypt.Md5();
    hashMethod.update(identifier);
    return hashMethod.digest();
};

wythe.lowpolybg.getColorsFromHash_ = function(hash) {
	
};

wythe.lowpolybg.getSeedFromHash_ = function(hash) {
    return this.getNumberFromHash_(hash, 12, 4);
};

wythe.lowpolybg.getNumberFromHash_ = function(hash, startIndex, length) {
    var index;
    var value = 0;
    for (index = startIndex; index < startIndex + length; index++) {
        value *= 255;
        value += hash[index];
    }
    return value;
}

wythe.lowpolybg.generatePoints_ = function(params) {
    // calculate how many cells we're going to have on each axis (pad by 2 cells on each edge)
    params.xCellAmount = goog.math.safeFloor((params.width + 4 * params.cellSize) / params.cellSize);
    params.yCellAmount = goog.math.safeFloor((params.height + 4 * params.cellSize) / params.cellSize);

    // figure out the bleed widths to center the grid
    params.xOutBounds = ((params.xCellAmount * params.cellSize) - params.width) / 2;
    params.yOutBounds = ((params.yCellAmount * params.cellSize) - params.height) / 2;

    // how much can out points wiggle (+/-) given the cell padding?
    params.variance = params.cellSize * params.variance / 2;

    var points = [];
    for (var i = -params.xOutBounds; i < params.width + params.xOutBounds; i += params.cellSize) {
        for (var j = -params.yOutBounds; j < params.height + params.yOutBounds; j += params.cellSize) {
            var x = i + params.cellSize / 2 + params.rand.random() * params.variance * 2 - params.variance;
            var y = j + params.cellSize / 2 + params.rand.random() * params.variance * 2 - params.variance;
            points.push([goog.math.safeFloor(x), goog.math.safeFloor(y)]);
        }
    }
    return points;
};