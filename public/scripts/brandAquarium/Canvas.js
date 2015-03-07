define([
    "dojo/_base/array",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/dom-style",
    "dojo/dom-geometry",
    "dojo/on",
    "scripts/brandAquarium/Brand.js",
    "scripts/brandAquarium/Renderer.js",
    "scripts/brandAquarium/Simulation.js"
],
function (array, declare, lang, dom, domConstruct, domStyle, domGeometry, on, Brand, Renderer, Simulation) {
return declare(null, {

    brandArray: [],

    canvas: null,

    canvasCreationInProgress: false,

    canvasHeight: 0,

    canvasWidth: 0,

    clickHandlers: null,

    currentCanvasRefreshInterval: null,

    context: null,

    deltaTime: null,

    frameTimer: 1000 / 60,

    lastTime: null,

    mousemoveHandlers: null,

    renderer: null,

    shouldContinueCanvasLoop: true,

    simulation: null,

    startPositionsOfBrands: null,

    thisTime: null,

    constructor: function (canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.renderer = new Renderer('#FFFFFF'); // takes colour for canvas.
        this.clickHandlers = [];
        this.mousemoveHandlers = [];
        this.startPositionsOfBrands = [];
    },

    removeEventsHandlers: function (handlers) {
        array.forEach(handlers, function (handler) {
            handler.remove();
        });
        handlers = [];
    },

    launchBrandAquarium: function () {
        if (!this.canvasCreationInProgress) {
            this.canvas = dom.byId("all-brands");
            this.canvasCreationInProgress = true;
            if (this.currentCanvasRefreshInterval) {
                this.removeEventsHandlers(this.clickHandlers);
                this.removeEventsHandlers(this.mousemoveHandlers);
                this.shouldContinueCanvasLoop = false;
                window.clearInterval(this.currentCanvasRefreshInterval);
                var currentContext = this.canvas.getContext('2d');
                currentContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.canvas.width = this.canvas.width;
            }
            var parent = this.canvas.parentNode;
            domConstruct.destroy(this.canvas);
            domConstruct.place('<canvas id="all-brands" width="' + this.canvasWidth + '" height="' + this.canvasHeight + '" style="opacity:0.75;border:dashed 1px #000">' +
                'Your Browser does not support the canvas tag'+
                '</canvas>', parent);
            this.canvas = dom.byId("all-brands");

            this.lastTime = Date.now(); // inistalise lastTime.
            this.initializeCanvas();
        }
    },

    initializeCanvas: function  () {
        //find the canvas element using its id attribute.
        this.canvas = document.getElementById('all-brands');


        //once canvas is created, create the simulation passing the width and height of canvas
        this.simulation = new Simulation(this.canvas.width,this.canvas.height);

        /*########## Error checking to see if canvas is supported ############## */
        if (!this.canvas) {
                alert('Error: cannot find the canvas element!');
                return;
        }
        if (!this.canvas.getContext) {
                alert('Error: no canvas.getContent!');
                return;
        }
        this.context = this.canvas.getContext('2d');

        if (!this.context) {
                alert('Error: failed to getContent');
                return;
        }
        this.createBrands();
        this.bindBrandsToClick();
        this.bindBrandsToMouseOver();
        this.shouldContinueCanvasLoop = true;
        this.currentCanvasRefreshInterval = setInterval(lang.hitch(this, function () {
            this.mainLoop();
        }), this.frameTimer);
        this.canvasCreationInProgress = false;
    },
    createBrands: function () {
        /* Ball takes Mass| vX | vY | imgUrl | imgClippedWidth | imgClippedHeight | href | name */
        this.brandArray.push(
            new Brand(this.startPositionsOfBrands, 40, 1, 5, '/images/partenaires/coffeescript.png', 117, 20, 'http://coffeescript.org/', "coffeescript"),
            new Brand(this.startPositionsOfBrands, 20, 2, 4, '/images/partenaires/stylus.png', 32, 30, 'http://learnboost.github.io/stylus/', "stylus"),
            new Brand(this.startPositionsOfBrands, 20, 4, 2, '/images/partenaires/brunch-white.png', 30, 30, 'http://brunch.io/', "brunch"),
            new Brand(this.startPositionsOfBrands, 20, 5, 1, '/images/partenaires/backbone-white.png', 17, 20, 'http://backbonejs.org/', "backbone"),
            new Brand(this.startPositionsOfBrands, 20, 5, 0, '/images/partenaires/jade.png', 36, 20, 'http://jade-lang.com/', "jade"),
            new Brand(this.startPositionsOfBrands, 40, 0, 4, '/images/partenaires/meteor.png', 56, 20, 'https://www.meteor.com/', "meteor"),
            new Brand(this.startPositionsOfBrands, 40, 4, 2, '/images/partenaires/nodejs-white.png', 74, 20, 'http://nodejs.org/', "nodejs"),
            new Brand(this.startPositionsOfBrands, 20, 2, 3, '/images/partenaires/canvas-sized/js-canvas.png', 21, 24, 'http://javascript.crockford.com/', "js"),
            new Brand(this.startPositionsOfBrands, 40, 5, 5, '/images/partenaires/npm.png', 51, 20, 'https://www.npmjs.org/', "npm"),
            new Brand(this.startPositionsOfBrands, 40, 2, 1, '/images/partenaires/canvas-sized/jquery-canvas.png', 39, 32, 'http://jquery.com/', "jquery"),
            new Brand(this.startPositionsOfBrands, 20, 2, 5, '/images/partenaires/bootstrap.png', 20, 20, 'http://getbootstrap.com/', "bootstrap"),
            new Brand(this.startPositionsOfBrands, 20, 2, 5, '/images/partenaires/canvas-sized/sass-canvas.png', 40, 30, 'http://sass-lang.com/', "sass"),
            new Brand(this.startPositionsOfBrands, 30, 1, 1, '/images/partenaires/canvas-sized/html5-canvas.png', 31, 30, 'http://dev.w3.org/html5/html-author/', "html5")
        );

    },

    mainLoop: function() {
        if (!this.shouldContinueCanvasLoop) {
            return;
        }
        this.thisTime = Date.now();
        this.deltaTime = this.thisTime - this.lastTime;
        this.renderer.draw(this.context, this.brandArray);
        this.simulation.update(this.deltaTime, this.brandArray);
        this.lastTime = this.thisTime;
    },

    bindBrandsToClick: function () {
        this.clickHandlers.push(
            on(this.canvas, "click",  lang.hitch(this, function (event) {
                var x = event.pageX - domGeometry.position(event.target, true).x;
                var y = event.pageY - domGeometry.position(event.target, true).y;
                array.forEach(this.brandArray, function(element) {
                    var underY = y > element.position.y;
                    var overY = y < element.position.y + element.getClippedHeight();
                    var toRightToX = x > element.position.x;
                    var toLeftToX = x < element.position.x + element.getClippedWidth();
                    if (underY && overY && toRightToX && toLeftToX) {
                       location.href = element.getHref();
                    }

                });

            }))
        );
    },
    bindBrandsToMouseOver: function () {
        this.mousemoveHandlers.push(
            on(this.canvas, "mousemove", lang.hitch(this, function (event) {                
                domStyle.set(event.target, "cursor", "default");
                var x = event.pageX - domGeometry.position(event.target, true).x;
                var y = event.pageY - domGeometry.position(event.target, true).y;          
                array.forEach(this.brandArray, function(brand) {
                    if (brand.name === "coffeescript") {
                        var myY = brand.position.y;
                        var myYClippedHeight = (brand.position.y + brand.getClippedHeight());
                        var myX = brand.position.x;
                    }
                    var underY = y > brand.position.y;
                    var overY = y < (brand.position.y + brand.getClippedHeight());
                    var toRightToX = x > brand.position.x;
                    var toLeftToX = x < (brand.position.x + brand.getClippedWidth());
                    if (underY && overY && toRightToX && toLeftToX) {
                        domStyle.set(event.target, "cursor", "pointer");
                    }
                });

            }))
        );
    }
});
});