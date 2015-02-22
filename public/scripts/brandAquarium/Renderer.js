Renderer = (function (Context) {
    var canvasColour;
    function Renderer(inCanvasColour) {
        canvasColour = inCanvasColour;
    };

    Renderer.prototype.draw = function(context, brandArray) {
        // draw Canvas Background.
        drawCanvasBackground(context);
        // draw Balls.
        drawBalls(context, brandArray);
    }

    function drawCanvasBackground(context) {
        canvas = document.getElementById('all-brands');
        context.beginPath();
        context.fillStyle = canvasColour;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    function drawBalls(context,brandArray) {
        for (var i = 0; i < brandArray.length; i++) {

            if (brandArray[i].getColour) {
              context.beginPath();
              // draw brand using brand objects data.
              context.arc(brandArray[i].getX(), brandArray[i].getY(),brandArray[i].getRadius(), 0, Math.PI * 2, false);
              context.strokeStyle = "000000";
              context.stroke();
              context.fillStyle = brandArray[i].getColour();
              context.fill();
              context.closePath();
            }
            else {
              var img = new Image();
              img.src = brandArray[i].getImageUrl();
              context.drawImage(img, brandArray[i].getX(), brandArray[i].getY(), brandArray[i].getClippedWidth(), brandArray[i].getClippedHeight());
            }
        }
    }

    return Renderer;
})();