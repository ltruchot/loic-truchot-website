define([
    "dojo/_base/array",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/dom-style",
    "dojo/on",
    "scripts/brandAquarium/Brand",
    "scripts/brandAquarium/Renderer",
    "scripts/brandAquarium/Simulation"
],
function (array, declare, lang, dom, domConstruct, domStyle, on, Brand, Renderer, Simulation) {
return declare(null, {

    brandArray: [],

    canvas: null,

    canvasCreationInProgress: false,

    canvasHeight: 0,

    canvasWidth: 0,

    clickHandlers: null,

    currentCanvasTimeout: null,

    context: null,

    deltaTime: null,

    frameTimer: 60000,

    lastTime: null,

    mousemoveHandlers: null,

    renderer: null,

    shouldContinueCanvasLoop: true,

    simulation: null,

    thisTime: null,

    constructor: function (canvasWidth, canvasHeight) {
        debugger;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.renderer = new Renderer('#FFFFFF'); // takes colour for canvas.
        this.clickHandlers = [];
        this.mousemoveHandlers = [];
    },

    removeEventsHandlers: function (handlers) {
        array.forEach(handlers, function (handler) {
            handler.remove();
        });
        handlers = [];
    },

    launchBrandAquarium: function () {
        debugger;
        if (!this.canvasCreationInProgress) {
            this.canvas = dom.byId("all-brands");
            this.canvasCreationInProgress = true;
            var currentCanvas = dom.byId("#all-brands");
            if (this.currentCanvasTimeout) {
                this.removeEventsHandlers(this.clickHandlers);
                this.removeEventsHandlers(this.mousemoveHandlers);
                this.shouldContinueCanvasLoop = false;
                window.clearInterval(this.currentCanvasTimeout);
                var currentContext = this.canvas.getContext('2d');
                currentContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.canvas.width = this.canvas.width;
            }
            var parent = this.canvas.parentNode;
            domConstruct.destroy(this.canvas);
            domConstruct('<canvas id="all-brands" width="' + canvasWidth + '" height="' + canvasHeight + '" style="opacity:0.75;border:dashed 1px #000">' +
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
        this.currentCanvasTimeout = window.setInterval(this.mainLoop, this.frameTimer);
        this.canvasCreationInProgress = false;

/*        mainLoop(); // enter the main loop.*/
    },
    createBrands: function () {
        /* Ball takes Mass| vX | vY | imgUrl | imgClippedWidth | imgClippedHeight | href | name */
        window.startPositionsOfBrands = [];
        this.brandArray.push(new Brand(40, 1, 5, '/images/partenaires/coffeescript.png', 117, 20, 'http://coffeescript.org/', "coffeescript"));
        this.brandArray.push(new Brand(20, 2, 4, '/images/partenaires/stylus.png', 32, 30, 'http://learnboost.github.io/stylus/', "stylus"));
        this.brandArray.push(new Brand(20, 4, 2, '/images/partenaires/brunch-white.png', 30, 30, 'http://brunch.io/', "brunch"));
        this.brandArray.push(new Brand(20, 5, 1, '/images/partenaires/backbone-white.png', 17, 20, 'http://backbonejs.org/', "backbone"));
        this.brandArray.push(new Brand(20, 5, 0, '/images/partenaires/jade.png', 36, 20, 'http://jade-lang.com/', "jade"));
        this.brandArray.push(new Brand(40, 0, 4, '/images/partenaires/meteor.png', 56, 20, 'https://www.meteor.com/', "meteor"));
        this.brandArray.push(new Brand(40, 4, 2, '/images/partenaires/nodejs-white.png', 74, 20, 'http://nodejs.org/', "nodejs"));
        this.brandArray.push(new Brand(20, 2, 3, '/images/partenaires/canvas-sized/js-canvas.png', 21, 24, 'http://javascript.crockford.com/', "js"));
        this.brandArray.push(new Brand(40, 5, 5, '/images/partenaires/npm.png', 51, 20, 'https://www.npmjs.org/', "npm"));
        this.brandArray.push(new Brand(40, 2, 1, '/images/partenaires/canvas-sized/jquery-canvas.png', 39, 32, 'http://jquery.com/', "jquery"));
        this.brandArray.push(new Brand(20, 2, 5, '/images/partenaires/bootstrap.png', 20, 20, 'http://getbootstrap.com/', "bootstrap"));
        this.brandArray.push(new Brand(20, 2, 5, '/images/partenaires/canvas-sized/sass-canvas.png', 40, 30, 'http://sass-lang.com/', "sass"));
        this.brandArray.push(new Brand(30, 1, 1, '/images/partenaires/canvas-sized/html5-canvas.png', 31, 30, 'http://dev.w3.org/html5/html-author/', "html5"));


    },

    mainLoop: function() {
        if (!this.shouldContinueCanvasLoop) return;
        this.thisTime = Date.now();
        this.deltaTime = this.thisTime - this.lastTime;

        this.renderer.draw(this.context, this.brandArray);
        this.simulation.update(deltaTime, this.brandArray);

        this.lastTime = this.thisTime;
    },

    bindBrandsToClick: function () {
        this.clickHandlers.push(
            on(this.canvas, "click",  lang.hitch(this, function (event) {
                var x = event.pageX - event.target.offsetLeft,
                y = event.pageY - event.target.offsetTop;
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
            on(this.canvas, "mousemove", lang.hitch(function (event) {
                domStyle.set(event.target, "cursor", "default");
                var x = event.pageX - event.target.offsetLeft,
                y = event.pageY - event.target.offsetTop;
                array.forEach(this.brandArray, function(element) {
                    var underY = y > element.position.y;
                    var overY = y < (element.position.y + element.getClippedHeight());
                    var toRightToX = x > element.position.x;
                    var toLeftToX = x < (element.position.x + element.getClippedWidth());
                    if (underY && overY && toRightToX && toLeftToX) {
                        domStyle.set(event.target, "cursor", "default");
                    }
                });

            }))
        );
    }
});
});