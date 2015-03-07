define([
    "dojo/_base/array",
    "dojo/_base/declare"
],
function (array, declare) {
return declare(null, {
    x: null,
    y: null,
    constructor: function (x, y) {
        // vector constructor
        this.x = x;
        this.y = y;
    },

    setXandY: function (x, y) {
        this.x = x;
        this.y = y;
    },


    // Vector functions
    add: function(otherVector){
        return {
            x: this.x + otherVector.x,
            y: this.y + otherVector.y
        };
    },

    multiply: function (scalar) {
        return {
            x: this.x * scalar,
            y: this.y * scalar
        };
    },

    normalise: function () {
        var newX = this.x;
        var newY = this.y;
        var xsquared = this.x * this.x;
        var ysquared = this.y * this.y;
        var distance = Math.sqrt(xsquared + ysquared);
        newX = newX * (0.8 / (distance));
        newY = newY * (0.8 / (distance));
        this.setXandY(newX, newY);
    },


    dot: function (otherVector) {
        var dotProduct = ((this.x * otherVector.x) + (this.y * otherVector.y));
        return dotProduct;
    }

});
});