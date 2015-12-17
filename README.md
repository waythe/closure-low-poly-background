# Low Poly background image generator 

(closure-low-poly-background)
Generate low polygon background image from a identifier string.   
Image's characters will be decided by the identifier string.  
Written in google closure. 

### Usage ###

```js
	goog.require('wythe.lowpolybg')

	// detail of options described in next segment
	var options = {width:600, height:300,cellSize:45};

	// 'HelloWorld' is an identifier, pass different strings to generate different result
	var canvas = wythe.lowpolybg.createLowPolyCanvas('HelloWorld', options);
```

### Demo Result(Picture generated from 'HelloWorld'): ###

![image](https://github.com/waythe/closure-low-poly-background/raw/master/demo-result.png)

### Options ###

```js
    width: 400, // Width of the generated canvas
    height: 200, // Height of the generated canvas
    cellSize: 30, // Expect size of triangle blocks, actual size will be randomized by variance parameter
    variance: 0.75, // Defined how much to randomize the block size
    palette: wythe.lowpolybg.DEFAULT_PALETTE, // Palette of the canvas, this directly influence the generated result, by default we use ColorBrewer for chroma.js
    shareColor: true, // If set to true, x and y will share the same palette. Recommend to keep it 'true', using different palette sometime will make the graph too messy.
    lineWidth: 1 // Line width of the triangles
```

### Borrow from: ###
	https://github.com/ironwallaby/delaunay
	https://github.com/gka/chroma.js/blob/master/src/colors/colorbrewer.coffee

### License ### 
Apache License Version 2.0
