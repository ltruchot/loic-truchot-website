define([
    "dojo/_base/array",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom",
    "scripts/brandAquarium/Vector.js"
],
function (array, declare, lang, dom, Vector) {
return declare(null, {

    canvasWidth: null,
    canvasHeight: null,

    constructor: function (inWidth,inHeight) {
        // set simulations canvas width and height.
        this.canvasWidth = inWidth;
        this.canvasHeight = inHeight;
    },

    update: function (deltaTime, brandArray) {
        /*#### Move brands ####### */
        this.updateBrandPos(deltaTime, brandArray);
        /*##### Wall collision ####### */
        this.checkWallCollision(brandArray);
        /*###### brand/brand collision ######## */
        array.forEach(brandArray, lang.hitch(this, function (brand) {
            array.forEach(brandArray, lang.hitch(this, function (comparedBrand) {
                if (brand !== comparedBrand) {
                    if (this.checkBrandCollision(brand, comparedBrand)) {
                        this.brandCollisionResponse(brand, comparedBrand);
                    }
                }
            }));
        }));

    },


    updateBrandPos: function (deltaTime, brandArray) {
        array.forEach(brandArray, function (brand) {
            brand.lastGoodPosition = brand.position; // save the brand last good position.
            var currentVelocity = brand.velocity.multiply(deltaTime/10);
            var newBrandPositions = brand.position.add(currentVelocity);
            brand.position = new Vector(newBrandPositions.x, newBrandPositions.y); // add the brands (velocity * deltaTime) to position.
        });
    },

    checkWallCollision: function (brandArray) {
        array.forEach(brandArray, lang.hitch(this, function (brand) {

            /*##### Collisions on the X axis ##### */
            var toRightToX = brand.getX() + (brand.getClippedWidth()) >= this.canvasWidth;
            var toLeftToX = brand.getX() - (brand.getClippedWidth()) <= 0;

            if (toRightToX || toLeftToX) {
                    brand.velocity.x = -brand.velocity.x; // if collided with a wall on x Axis, reflect Velocity.X.
                    brand.position = brand.lastGoodPosition; // reset brand to the last good position (Avoid objects getting stuck in each other).
            }

            /*##### Collisions on the Y axis ##### */
            var underY = brand.getY() <= 0;
            var overY = brand.getY() + brand.getClippedHeight() >= this.canvasHeight;
            if (underY || overY) { // check for y collisions.
                    brand.velocity.y = -brand.velocity.y; // if collided with a wall on x Axis, reflect Velocity.X.
                    brand.position = brand.lastGoodPosition;
            }
        }));
    },

    checkBrandCollision: function (brand1, brand2) {

        var x1 = brand1.getX(),
            x2 = brand2.getX(),
            w1 = brand1.getClippedWidth(),
            w2 = brand2.getClippedWidth(),
            y1 = brand1.getY(),
            y2 = brand2.getY(),
            h1 = brand1.getClippedHeight(),
            h2 = brand2.getClippedHeight();
        var isInWidth = (x1 <= x2+w2) && (x1+w1 >= x2),
            isInHeight = (y1 <= y2+h2) && (y1+h1 >= y2);

        return  (isInWidth && isInHeight);

    },

    brandCollisionResponse: function (brand1, brand2) {
            var xDistance = (brand2.getX() - brand1.getX());
            var yDistance = (brand2.getY() - brand1.getY());

            var normalVector = new Vector(xDistance, yDistance); // normalise this vector store the return value in normal vector.
            normalVector.normalise();


            var tangentVector = new Vector((normalVector.y * -1), normalVector.x);

            // create ball scalar normal direction.
            var brand1scalarNormal =  normalVector.dot(brand1.velocity);
            var brand2scalarNormal = normalVector.dot(brand2.velocity);

            // create scalar velocity in the tagential direction.
            var brand1scalarTangential = tangentVector.dot(brand1.velocity);
            var brand2scalarTangential = tangentVector.dot(brand2.velocity);

            var brand1ScalarNormalAfter = (brand1scalarNormal * (brand1.getMass() - brand2.getMass()) + 2 * brand2.getMass() * brand2scalarNormal) / (brand1.getMass() + brand2.getMass());
            var brand2ScalarNormalAfter = (brand2scalarNormal * (brand2.getMass() - brand1.getMass()) + 2 * brand1.getMass() * brand1scalarNormal) / (brand1.getMass() + brand2.getMass());

            var brand1scalarNormalAfterVector = normalVector.multiply(brand1ScalarNormalAfter); // brand1Scalar normal doesnt have multiply not a vector.
            var brand2scalarNormalAfterVector = normalVector.multiply(brand2ScalarNormalAfter);

            var brand1ScalarNormalVectorPositions = (tangentVector.multiply(brand1scalarTangential));
            var brand1ScalarNormalVector = new Vector(brand1ScalarNormalVectorPositions.x, brand1ScalarNormalVectorPositions.y);
            var brand2ScalarNormalVectorPositions = (tangentVector.multiply(brand2scalarTangential));
            var brand2ScalarNormalVector = new Vector(brand2ScalarNormalVectorPositions.x, brand2ScalarNormalVectorPositions.y);

            var brand1VelocityPositions = brand1ScalarNormalVector.add(brand1scalarNormalAfterVector);
            var brand2VelocityPositions = brand2ScalarNormalVector.add(brand2scalarNormalAfterVector);
            brand1.velocity = new Vector(brand1VelocityPositions.x, brand1VelocityPositions.y);
            brand2.velocity = new Vector(brand2VelocityPositions.x, brand2VelocityPositions.y);

            brand1.position = brand1.lastGoodPosition;
            brand2.position = brand2.lastGoodPosition;
    }

});
});