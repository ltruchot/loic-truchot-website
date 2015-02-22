/*#######################################################
 # Simple 2D vector class including vector functions   #
 #######################################################*/
Vector = (
	function () {
	    var x;
	    var y;
	    function Vector() { };
	    function Vector(x, y) {
	        // vector constructor
	        this.setX(x);
	        this.setY(y);
	    };
        //getters and setters
	    Vector.prototype.getX = function () {return this.x; };
	    Vector.prototype.setX = function (x) { this.x = x; };

	    Vector.prototype.getY = function () { return this.y;};
	    Vector.prototype.setY = function (y) { this.y = y; };

	    Vector.prototype.setXandY = function (x, y) {
	        this.setX(x);
	        this.setY(y);
	        return this;
	    }
	    Vector.prototype.getMagnitude = function(){ return this.magnitude; }


        // Vector functions
	    Vector.prototype.add = function(otherVector){
	        var newX = this.getX() + otherVector.getX();
	        var newY = this.getY() + otherVector.getY();
	        return new Vector(newX, newY);
	    }

	    Vector.prototype.subtract = function (otherVector) {
	        var newX = this.getX() - otherVector.getX();
	        var newY = this.getY() - otherVector.getY();
	        return new Vector(newX, newY);
	    }

	    Vector.prototype.multiply = function (scalar) {
	        var newX = this.getX() * scalar;
	        var newY = this.getY() * scalar;
	        //this.setX(this.getX() * scalar);
	        //this.setY(this.getY() * scalar);
	        return new Vector(newX,newY);
	    }

	    Vector.prototype.divide = function (scalar) {
	        this.setX(this.getX() / scalar);
	        this.setY(this.getY() / scalar);
	        return new Vector(this.x, this.y);
	    }

	    Vector.prototype.normalise = function () {
	        var newX = this.x;
	        var newY = this.y;
	        var xsquared = this.x * this.x;
	        var ysquared = this.y * this.y;
	        var distance = Math.sqrt(xsquared + ysquared);
	        newX = newX * (0.8 / (distance));
	        newY = newY * (0.8 / (distance));
	        return new Vector(newX, newY);
	    }

	    Vector.prototype.magnitude = function () {
	        var magnitude = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	        return magnitude;
	    }

	    Vector.prototype.dot = function (otherVector) {
	        var dotProduct = ((this.x * otherVector.getX()) + (this.y * otherVector.getY()));
	        return dotProduct;
	        //var newX = this.x * otherVector.getX();
	        //var newY = this.y * otherVector.getY();
	        //return new Vector(newX,newY);
	    }

	    return Vector;
	}
)();

