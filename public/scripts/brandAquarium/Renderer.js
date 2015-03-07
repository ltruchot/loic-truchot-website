define([
    "dojo/_base/array",
    "dojo/_base/declare",
    "dojo/dom"
],
function (array, declare, dom) {
return declare(null, {

    canvasColour: "#FFFFF",
    constructor: function (inCanvasColour) {
        this.canvasColour = inCanvasColour;
    },

    draw: function (context, brandArray) {
        // draw Canvas Background.
        this.drawCanvasBackground(context);
        // draw Balls.
        this.drawBrands(context, brandArray);
    },

    drawCanvasBackground: function (context) {
        var canvas = dom.byId('all-brands');
        context.beginPath();
        context.fillStyle = this.canvasColour;
        context.fillRect(0, 0, canvas.width, canvas.height);
    },

    drawBrands: function (context, brandArray) {

        array.forEach(brandArray, function (brand) {
            if (brand.getColour) {
                context.beginPath();
                // draw brand using brand objects data.
                context.arc(brand.getX(), brand.getY(),brand.getRadius(), 0, Math.PI * 2, false);
                context.strokeStyle = "000000";
                context.stroke();
                context.fillStyle = brand.getColour();
                context.fill();
                context.closePath();
            }
            else {
                var img = new Image();
                img.src = brand.getImageUrl();
                context.drawImage(img, brand.getX(), brand.getY(), brand.getClippedWidth(), brand.getClippedHeight());
            }
        });

    }
});
});