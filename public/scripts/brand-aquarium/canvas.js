launchBrandAquarium = function (canvasWidth, canvasHeight) {
  window.canvasCreationInProgress = true;
  if ((typeof(window.currentCanvasTimeout) !== 'undefined') && (window.currentCanvasTimeout !== null)) {
     $("canvas#all-brands").unbind("click");
     $("canvas#all-brands").unbind("mousemove");
     $("canvas#all-brands").undelegate("click");
     $("canvas#all-brands").undelegate("mousemove");
    window.shouldContinueCanvasLoop = false;
    window.clearInterval(window.currentCanvasTimeout);
    var currentCanvas = document.getElementById('all-brands');
    var currentContext = currentCanvas.getContext('2d');
    currentContext.clearRect(0, 0, currentCanvas.width, currentCanvas.height);
    currentCanvas.width = currentCanvas.width;
   }
   var parent = $("canvas#all-brands").parent();
    $("canvas#all-brands").remove()
    parent.html('<canvas id="all-brands" width="' + canvasWidth + '" height="' + canvasHeight + '" style="opacity:0.75;border:dashed 1px #000">' +
      'Your Browser does not support the canvas tag'+
      '</canvas>');

    var canvas;
    var context;

    var renderer = new Renderer('#FFFFFF'); // takes colour for canvas.
    var simulation;
    var brandArray = new Array();

    // frameRate Variables.
    var frameRate = 60;
    var frameTimer = 1000 / frameRate;

    // DeltaTime variables.
    var lastTime = Date.now(); // inistalise lastTime.
    var thisTime;
    var deltaTime;

    function initializeCanvas() {
        //find the canvas element using its id attribute.
        canvas = document.getElementById('all-brands');


        //once canvas is created, create the simulation passing the width and height of canvas
        simulation = new Simulation(canvas.width,canvas.height);

        /*########## Error checking to see if canvas is supported ############## */
        if (!canvas) {
            alert('Error: cannot find the canvas element!');
            return;
        }
        if (!canvas.getContext) {
            alert('Error: no canvas.getContent!');
            return;
        }
        context = canvas.getContext('2d');

        if (!context) {
            alert('Error: failed to getContent');
            return;
        }
        createBrands();
        bindBrandsToClick();
        bindBrandsToMouseOver();
        window.shouldContinueCanvasLoop = true;
        window.currentCanvasTimeout = window.setInterval(mainLoop, frameTimer);
        window.canvasCreationInProgress = false;

/*        mainLoop(); // enter the main loop.*/
    }
    function createBrands() {
      /* Ball takes Mass| vX | vY | imgUrl | imgClippedWidth | imgClippedHeight | href | name */
      window.startPositionsOfBrands = [];
      brandArray.push(new brand(40, 1, 5, '/images/partenaires/coffeescript.png', 117, 20, 'http://coffeescript.org/', "coffeescript"));
      brandArray.push(new brand(20, 2, 4, '/images/partenaires/stylus.png', 32, 30, 'http://learnboost.github.io/stylus/', "stylus"));
      brandArray.push(new brand(20, 4, 2, '/images/partenaires/brunch-white.png', 30, 30, 'http://brunch.io/', "brunch"));
      brandArray.push(new brand(20, 5, 1, '/images/partenaires/backbone-white.png', 17, 20, 'http://backbonejs.org/', "backbone"));
      brandArray.push(new brand(20, 5, 0, '/images/partenaires/jade.png', 36, 20, 'http://jade-lang.com/', "jade"));
      brandArray.push(new brand(40, 0, 4, '/images/partenaires/meteor.png', 56, 20, 'https://www.meteor.com/', "meteor"));
      brandArray.push(new brand(40, 4, 2, '/images/partenaires/nodejs-white.png', 74, 20, 'http://nodejs.org/', "nodejs"));
      brandArray.push(new brand(20, 2, 3, '/images/partenaires/canvas-sized/js-canvas.png', 21, 24, 'http://javascript.crockford.com/', "js"));
      brandArray.push(new brand(40, 5, 5, '/images/partenaires/npm.png', 51, 20, 'https://www.npmjs.org/', "npm"));
      brandArray.push(new brand(40, 2, 1, '/images/partenaires/canvas-sized/jquery-canvas.png', 39, 32, 'http://jquery.com/', "jquery"));
      brandArray.push(new brand(20, 2, 5, '/images/partenaires/bootstrap.png', 20, 20, 'http://getbootstrap.com/', "bootstrap"));
      brandArray.push(new brand(20, 2, 5, '/images/partenaires/canvas-sized/sass-canvas.png', 40, 30, 'http://sass-lang.com/', "sass"));
      brandArray.push(new brand(30, 1, 1, '/images/partenaires/canvas-sized/html5-canvas.png', 31, 30, 'http://dev.w3.org/html5/html-author/', "html5"));


    }

    function mainLoop() {
        if (!window.shouldContinueCanvasLoop) return;
        thisTime = Date.now();
        deltaTime = thisTime - lastTime;

        renderer.draw(context, brandArray);
        simulation.update(deltaTime, brandArray);

        lastTime = thisTime;
    }
    function bindBrandsToClick () {
      $("canvas#all-brands").on("click", function (event) {
        var x = event.pageX - $(this).offset().left,
        y = event.pageY - $(this).offset().top;
        brandArray.forEach(function(element) {
          var underY = y > element.position.y;
          var overY = y < element.position.y + element.getClippedHeight();
          var toRightToX = x > element.position.x;
          var toLeftToX = x < element.position.x + element.getClippedWidth();
          if (underY && overY && toRightToX && toLeftToX) {
            window.open(element.getHref(), "_blank");
          }

        });

      });
    }
  function bindBrandsToMouseOver () {
    $("canvas#all-brands").on("mousemove", function (event) {
      $(this).css("cursor", "default");
      var x = event.pageX - $(this).offset().left,
      y = event.pageY - $(this).offset().top;
      brandArray.forEach(function(element) {
        var underY = y > element.position.y;
        var overY = y < (element.position.y + element.getClippedHeight());
        var toRightToX = x > element.position.x;
        var toLeftToX = x < (element.position.x + element.getClippedWidth());
        if (underY && overY && toRightToX && toLeftToX) {
          $("canvas#all-brands").css("cursor", "pointer");
        }
      });

    });
    }
    initializeCanvas();
}