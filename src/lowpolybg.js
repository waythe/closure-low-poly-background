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

wythe.lowpolybg.DEFAULT_PALETTE = {
    //Use the palette from ColorBrewer colors for chroma.js

    // sequential
    'OrRd': ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#b30000', '#7f0000'],
    'PuBu': ['#fff7fb', '#ece7f2', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#045a8d', '#023858'],
    'BuPu': ['#f7fcfd', '#e0ecf4', '#bfd3e6', '#9ebcda', '#8c96c6', '#8c6bb1', '#88419d', '#810f7c', '#4d004b'],
    'Oranges': ['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#a63603', '#7f2704'],
    'BuGn': ['#f7fcfd', '#e5f5f9', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#006d2c', '#00441b'],
    'YlOrBr': ['#ffffe5', '#fff7bc', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#993404', '#662506'],
    'YlGn': ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529'],
    'Reds': ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d'],
    'RdPu': ['#fff7f3', '#fde0dd', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177', '#49006a'],
    'Greens': ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'],
    'YlGnBu': ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'],
    'Purples': ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d'],
    'GnBu': ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081'],
    'Greys': ['#ffffff', '#f0f0f0', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525', '#000000'],
    'YlOrRd': ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'],
    'PuRd': ['#f7f4f9', '#e7e1ef', '#d4b9da', '#c994c7', '#df65b0', '#e7298a', '#ce1256', '#980043', '#67001f'],
    'Blues': ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b'],
    'PuBuGn': ['#fff7fb', '#ece2f0', '#d0d1e6', '#a6bddb', '#67a9cf', '#3690c0', '#02818a', '#016c59', '#014636'],

    // diverging
    'Spectral': ['#9e0142', '#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2'],
    'RdYlGn': ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837'],
    'RdBu': ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#f7f7f7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac', '#053061'],
    'PiYG': ['#8e0152', '#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#f7f7f7', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221', '#276419'],
    'PRGn': ['#40004b', '#762a83', '#9970ab', '#c2a5cf', '#e7d4e8', '#f7f7f7', '#d9f0d3', '#a6dba0', '#5aae61', '#1b7837', '#00441b'],
    'RdYlBu': ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'],
    'BrBG': ['#543005', '#8c510a', '#bf812d', '#dfc27d', '#f6e8c3', '#f5f5f5', '#c7eae5', '#80cdc1', '#35978f', '#01665e', '#003c30'],
    'RdGy': ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#ffffff', '#e0e0e0', '#bababa', '#878787', '#4d4d4d', '#1a1a1a'],
    'PuOr': ['#7f3b08', '#b35806', '#e08214', '#fdb863', '#fee0b6', '#f7f7f7', '#d8daeb', '#b2abd2', '#8073ac', '#542788', '#2d004b'],

    // qualitative
    'Set2': ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3'],
    'Accent': ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0', '#f0027f', '#bf5b17', '#666666'],
    'Set1': ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'],
    'Set3': ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f'],
    'Dark2': ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666'],
    'Paired': ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'],
    'Pastel2': ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae', '#f1e2cc', '#cccccc'],
    'Pastel1': ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec', '#f2f2f2'],

};

wythe.lowpolybg.defaultOpts = {
    width: 400, // Width of the generated canvas
    height: 200, // Height of the generated canvas
    cellSize: 30, // Expect size of triangle blocks, actual size will be randomized by variance parameter
    variance: 0.75, // Defined how much to randomize the block size
    palette: wythe.lowpolybg.DEFAULT_PALETTE, // Palette of the canvas, this directly influence the generated result, by default we use ColorBrewer for chroma.js
    shareColor: true, // If set to true, x and y will share the same palette. Recommend to keep it 'true', using different palette sometime will make the graph too messy.
    lineWidth: 1 // Line width of the triangles
};

wythe.lowpolybg.params = {};

wythe.lowpolybg.createLowPolyCanvas = function(identifier, opts) {
    this.calcParams_(identifier, opts);
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
        context.fillStyle = context.strokeStyle = goog.color.rgbToHex(triangle['color'][0], triangle['color'][1], triangle['color'][2]);
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

wythe.lowpolybg.calcParams_ = function(identifier, opts) {
    var self = this;
    var params = {};
    goog.object.extend(params, this.defaultOpts);
    goog.object.extend(params, opts);
    params.identifier = identifier;

    // calculate characters from identifier string
    params.hash = this.simpleHash_(identifier);
    params.xColors = this.getColorsFromHash_(params.palette, params.hash, 0);
	if(params.shareColor){
		params.yColors = params.xColors;
	}else{
		params.yColors = this.getColorsFromHash_(params.palette, params.hash, 1);
	}
    params.seed = this.getSeedFromHash_(params.hash);
    params.rand = new goog.testing.PseudoRandom(params.seed);

    params.points = this.generatePoints_(params);
    params.indices = wythe.delaunay.triangulate(params.points);
    params.triangles = [];
    for (var index = 0; index < params.indices.length; index += 3) {
		var vertices = [params.points[params.indices[index]], params.points[params.indices[index + 1]], params.points[params.indices[index + 2]]];
		var gravityCenter = self.getGravityCenter_(vertices);
        params.triangles.push({
            'vertices': vertices,
            'color': self.calculateGradientColor_(params, gravityCenter[0], gravityCenter[1])
        })
    }

    this.params = params;
};

wythe.lowpolybg.getGravityCenter_ = function(vertices){
	var x = goog.math.safeFloor((vertices[0][0] + vertices[1][0] + vertices[2][0])/3);
	var y = goog.math.safeFloor((vertices[0][1] + vertices[1][1] + vertices[2][1])/3);
	return [x, y];
}

wythe.lowpolybg.simpleHash_ = function(identifier) {
    var hashMethod = new goog.crypt.Md5();
    hashMethod.update(identifier);
    return hashMethod.digest();
};

wythe.lowpolybg.getColorsFromHash_ = function(palette, hash, axis) {
    // every 2 bytes stands for color, axis = 0 for x, axis = 1 for y
    var index = this.getNumberFromHash_(hash, axis * 2, 2);
    if (palette instanceof Array) {
        return palette[index % palette.length];
    }

    var keys = Object.keys(palette);
    return palette[keys[index % keys.length]];
};

wythe.lowpolybg.calculateGradientColor_ = function(params, x, y) {
    var xColor, yColor;
    //calculate x color
    var startXColorIndex = goog.math.safeFloor(x / params.width * (params.xColors.length - 1));
    if (startXColorIndex < 0) {
        startXColorIndex = 0;
    }
    if (startXColorIndex >= params.xColors.length) {
        startXColorIndex = params.xColors.length - 1;
    }
    var endXColorIndex = startXColorIndex + 1;
    if (endXColorIndex >= params.xColors.length) {
        endXColorIndex = params.xColors.length - 1;
    }
    var xStep = params.width / params.xColors.length;
    var xFactor = (x % xStep) / xStep;
    xColor = goog.color.blend(goog.color.hexToRgb(params.xColors[startXColorIndex]), goog.color.hexToRgb(params.xColors[endXColorIndex]), xFactor);

    //calculate y color
    var startYColorIndex = goog.math.safeFloor(y / params.height * (params.yColors.length - 1));
    if (startYColorIndex < 0) {
        startYColorIndex = 0;
    }
    if (startYColorIndex >= params.yColors.length) {
        startYColorIndex = params.yColors.length - 1;
    }
    var endYColorIndex = startYColorIndex + 1;
    if (endYColorIndex >= params.yColors.length) {
        endYColorIndex = params.yColors.length - 1;
    }
    var yStep = params.height / params.yColors.length;
    var yFactor = (y % yStep) / yStep;
    yColor = goog.color.blend(goog.color.hexToRgb(params.yColors[startYColorIndex]), goog.color.hexToRgb(params.yColors[endYColorIndex]), yFactor);

    return goog.color.blend(xColor, yColor, 0.5);
};

wythe.lowpolybg.getSeedFromHash_ = function(hash) {
    // last 4 bytes stands for color
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