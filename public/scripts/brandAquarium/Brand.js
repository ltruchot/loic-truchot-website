define([
        "dojo/_base/array",
        "dojo/_base/declare",
        "dojo/dom",
        "scripts/brandAquarium/Vector.js"
],
function (array, declare, dom, Vector) {
return declare(null, {

    position: null,
    lastGoodPosition: null,
    velocity: null,
    mass: null,
    imageUrl: null,
    x: null,
    y: null,
    clippedWidth: null,
    clippedHeight: null,
    startPositionsOfBrands: null,
    name: "",

    constructor: function (startPos, inMass,inVelX,inVelY,imgUrl,imgClippedWidth, imgClippedHeight, href, name) {
        this.startPositionsOfBrands = startPos;
        this.name = name;
        var canvasById = dom.byId('all-brands');
        var canvasAuthorizedWidth = canvasById.width - imgClippedWidth;
        var canvasAuthorizedHeight = canvasById.height - imgClippedHeight;
        this.setClippedWidth(imgClippedWidth);
        this.setClippedHeight(imgClippedHeight);
        var randomizedValues = this.getNewRandomizedPositions(canvasAuthorizedWidth, canvasAuthorizedHeight);

        this.startPositionsOfBrands.push({
            name: name,
            xLeft: randomizedValues.x,
            xRight:(randomizedValues.x + imgClippedWidth),
            yTop: randomizedValues.y,
            yBottom: (randomizedValues.y + imgClippedHeight)
        });

        this.position = new Vector(randomizedValues.x, randomizedValues.y);
        this.velocity = new Vector(inVelX, inVelY);

        this.setMass(inMass);
        this.setImageUrl(imgUrl);

        this.setHref(href);
    },

    getNewRandomizedPositions: function (width, height) {
        var randomizedX = Math.floor(Math.random() * width) + 1;
        var randomizedY = Math.floor(Math.random() * height) + 1;
        var insideIt = false;
        var j = 0;
        for (var i=0; i < this.startPositionsOfBrands.length; i++)  {
            var x1 = this.startPositionsOfBrands[i].xLeft,
                x2 = randomizedX,
                maxX1 = this.startPositionsOfBrands[i].xRight,
                maxX2 = randomizedX + this.getClippedWidth(),
                y1 = this.startPositionsOfBrands[i].yTop,
                y2 = randomizedY,
                maxY1 = this.startPositionsOfBrands[i].yBottom,
                maxY2 = randomizedY + this.getClippedHeight();
            var isInWidth = (x1 <= maxX2) && (maxX1 >= x2),
                isInHeight = (y1 <= maxY2) && (maxY1 >= y2);
            insideIt = isInWidth && isInHeight;
            if (insideIt) {
                randomizedX = Math.floor(Math.random() * width) + 1;
                randomizedY = Math.floor(Math.random() * height) + 1;
                i = -1;
                j++;
            }
        }
        return {
            x: randomizedX,
            y: randomizedY
        };
    },

    /* #######################
         # Getters and Setters #
         ####################### */

    setX: function (inX) { this.position.x = inX;},
    setY: function (inY) { this.position.y = inY;},

    getX: function () {return this.position.x;},
    getY: function () {return this.position.y;},

    setMass: function (inMass) { this.mass = inMass;},
    getMass: function () { return this.mass;},

    setImageUrl: function (imgUrl) { this.imageUrl = imgUrl;},
    getImageUrl: function () { return this.imageUrl;},

    setClippedWidth: function (clippedWidth) { this.clippedWidth = clippedWidth;},
    getClippedWidth: function () { return this.clippedWidth;},

    setClippedHeight: function (clippedHeight) { this.clippedHeight = clippedHeight;},
    getClippedHeight: function () { return this.clippedHeight;},

    setHref: function (href) { this.href = href;},
    getHref: function () { return this.href;}
});
});