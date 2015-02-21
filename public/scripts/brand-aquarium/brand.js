brand = (function (context) {

  var position;
  var lastGoodPosition
  var velocity;
  var mass;
  var imageUrl;
  var x;
  var y;
  var clippedWidth;
  var clippedHeight;

  function brand(inMass,inVelX,inVelY,imgUrl,imgClippedWidth, imgClippedHeight, href, name) { // constructor
    var canvasById = document.getElementById('all-brands');
    var canvasAuthorizedWidth = canvasById.width - imgClippedWidth,
      canvasAuthorizedHeight = canvasById.height - imgClippedHeight;
    this.setClippedWidth(imgClippedWidth);
    this.setClippedHeight(imgClippedHeight);
    var randomizedValues = this.getNewRandomizedPositions(canvasAuthorizedWidth, canvasAuthorizedHeight);

    startPositionsOfBrands.push({
      name: name,
      xLeft: randomizedValues.x,
      xRight:(randomizedValues.x + imgClippedWidth),
      yTop: randomizedValues.y,
      yBottom: (randomizedValues.y + imgClippedHeight)
    });

    /*console.log(startPositionsOfBrands);*/

    this.position = new vector();
/*    console.log("href = " + href)
    console.log("x = " + randomizedValues.x);
    console.log("y = " + randomizedValues.y);*/
    this.position.setX(randomizedValues.x);
    this.position.setY(randomizedValues.y);

    this.velocity = new vector();
    this.velocity.setX(inVelX);
    this.velocity.setY(inVelY);

    this.setMass(inMass);
    this.setImageUrl(imgUrl);

    this.setHref(href);
  }

  brand.prototype.getNewRandomizedPositions = function (width, height) {
    var randomizedX = Math.floor(Math.random() * width) + 1;
    var randomizedY = Math.floor(Math.random() * height) + 1;
    var insideIt = false;
    var j = 0;
    for (var i=0; i < window.startPositionsOfBrands.length; i++)  {
      var x1 = window.startPositionsOfBrands[i].xLeft,
        x2 = randomizedX,
        maxX1 = window.startPositionsOfBrands[i].xRight,
        maxX2 = randomizedX + this.getClippedWidth(),
        y1 = window.startPositionsOfBrands[i].yTop,
        y2 = randomizedY,
        maxY1 = window.startPositionsOfBrands[i].yBottom,
        maxY2 = randomizedY + this.getClippedHeight();
      var isInWidth = (x1 <= maxX2) && (maxX1 >= x2),
        isInHeight = (y1 <= maxY2) && (maxY1 >= y2);
      insideIt = isInWidth && isInHeight;
      if (insideIt) {
        randomizedX = Math.floor(Math.random() * width) + 1;
        randomizedY = Math.floor(Math.random() * height) + 1;
        i = -1;
        j++
      }
    }
    return {
      x: randomizedX,
      y: randomizedY
    };
  }

  /* #######################
     # Getters and Setters #
     ####################### */

  brand.prototype.setX = function (inX) { this.position.setX(inX);}
  brand.prototype.setY = function (inY) { this.position.setY(inY);}

  brand.prototype.getX = function () {return this.position.getX();}
  brand.prototype.getY = function () {return this.position.getY();}

  brand.prototype.setMass = function (inMass) { this.mass = inMass;}
  brand.prototype.getMass = function () { return this.mass;}

  brand.prototype.setImageUrl = function (imgUrl) { this.imageUrl = imgUrl;}
  brand.prototype.getImageUrl = function () { return this.imageUrl;}

  brand.prototype.setClippedWidth = function (clippedWidth) { this.clippedWidth = clippedWidth;}
  brand.prototype.getClippedWidth = function () { return this.clippedWidth;}

  brand.prototype.setClippedHeight = function (clippedHeight) { this.clippedHeight = clippedHeight;}
  brand.prototype.getClippedHeight = function () { return this.clippedHeight;}

  brand.prototype.setHref = function (href) { this.href = href;}
  brand.prototype.getHref = function () { return this.href;}

   return brand;

})();