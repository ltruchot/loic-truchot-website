Simulation = (function (Context) {
    var canvas_Width;
    var canvas_Height;

    function Simulation(inWidth,inHeight) {
        // set simulations canvas width and height.
        canvas_Width = inWidth;
        canvas_Height = inHeight;
    }
    Simulation.prototype.update = function (deltaTime, ballArray) {
        /*#### Move balls ####### */
        updateBallPos(deltaTime, ballArray);
        /*##### Wall collision ####### */
        checkWallCollision(ballArray);
        /*###### ball ball collision ######## */
        for (var i = 0; i < ballArray.length; i++) {
            for (var j = 0; j < ballArray.length; j++) {
                if (ballArray[i] != ballArray[j]) {
                    if (checkBallCollision(ballArray[i], ballArray[j])) {
                        ballCollisionResponce(ballArray[i], ballArray[j]);
                    }
                }
            }
        }
    }


    function updateBallPos(deltaTime, ballArray) {
        for (var i = 0; i < ballArray.length; i++) {
          ballArray[i].lastGoodPosition = ballArray[i].position; // save the balls last good position.
          ballArray[i].position = ballArray[i].position.add((ballArray[i].velocity.multiply(deltaTime/10))); // add the balls (velocity * deltaTime) to position.
        }
    }
    function checkWallCollision(ballArray) {
        for (var i = 0; i < ballArray.length; i++) {

          /*##### Collisions on the X axis ##### */
          toRightToX = ballArray[i].getX() + (ballArray[i].getClippedWidth()) >= canvas_Width;
          toLeftToX = ballArray[i].getX() - (ballArray[i].getClippedWidth()) <= 0;

          if (toRightToX || toLeftToX) {
              ballArray[i].velocity.setX(-ballArray[i].velocity.getX()); // if collided with a wall on x Axis, reflect Velocity.X.
              ballArray[i].position = ballArray[i].lastGoodPosition; // reset ball to the last good position (Avoid objects getting stuck in each other).
          }

          /*##### Collisions on the Y axis ##### */
          var underY = ballArray[i].getY() <= 0
          var overY = ballArray[i].getY() + ballArray[i].getClippedHeight() >= canvas_Height
          if (underY || overY) { // check for y collisions.
              ballArray[i].velocity.setY(-ballArray[i].velocity.getY()); // if collided with a wall on x Axis, reflect Velocity.X.
              ballArray[i].position = ballArray[i].lastGoodPosition;
          }
        }
    }
    function checkBallCollision(ball1, ball2) {

      var x1 = ball1.getX(),
        x2 = ball2.getX(),
        w1 = ball1.getClippedWidth(),
        w2 = ball2.getClippedWidth(),
        y1 = ball1.getY(),
        y2 = ball2.getY(),
        h1 = ball1.getClippedHeight(),
        h2 = ball2.getClippedHeight();
      var isInWidth = (x1 <= x2+w2) && (x1+w1 >= x2),
        isInHeight = (y1 <= y2+h2) && (y1+h1 >= y2);

      return  (isInWidth && isInHeight);

    }
    function ballCollisionResponce(ball1, ball2) {
        var xDistance = (ball2.getX() - ball1.getX());
        var yDistance = (ball2.getY() - ball1.getY());

        var normalVector = new vector(xDistance, yDistance); // normalise this vector store the return value in normal vector.
        normalVector = normalVector.normalise();

        var tangentVector = new vector((normalVector.getY() * -1), normalVector.getX());

        // create ball scalar normal direction.
        var ball1scalarNormal =  normalVector.dot(ball1.velocity);
        var ball2scalarNormal = normalVector.dot(ball2.velocity);

        // create scalar velocity in the tagential direction.
        var ball1scalarTangential = tangentVector.dot(ball1.velocity);
        var ball2scalarTangential = tangentVector.dot(ball2.velocity);

        var ball1ScalarNormalAfter = (ball1scalarNormal * (ball1.getMass() - ball2.getMass()) + 2 * ball2.getMass() * ball2scalarNormal) / (ball1.getMass() + ball2.getMass());
        var ball2ScalarNormalAfter = (ball2scalarNormal * (ball2.getMass() - ball1.getMass()) + 2 * ball1.getMass() * ball1scalarNormal) / (ball1.getMass() + ball2.getMass());

        var ball1scalarNormalAfter_vector = normalVector.multiply(ball1ScalarNormalAfter); // ball1Scalar normal doesnt have multiply not a vector.
        var ball2scalarNormalAfter_vector = normalVector.multiply(ball2ScalarNormalAfter);

        var ball1ScalarNormalVector = (tangentVector.multiply(ball1scalarTangential));
        var ball2ScalarNormalVector = (tangentVector.multiply(ball2scalarTangential));;

        ball1.velocity = ball1ScalarNormalVector.add(ball1scalarNormalAfter_vector);
        ball2.velocity = ball2ScalarNormalVector.add(ball2scalarNormalAfter_vector);

        ball1.position = ball1.lastGoodPosition;
        ball2.position = ball2.lastGoodPosition;
    }

    return Simulation;
})();