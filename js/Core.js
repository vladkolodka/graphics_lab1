function Core(x1, x2, a, padding, scale){
    this.x1 = x1;
    this.x2 = x2;
    this.a = a;
    this.padding = padding;
    this.scale = scale;

    this.getGraphCords = function () {
        var cords = [];
        var offsetX = ((this.x1 * -1) + this.padding) * this.scale;
        for (var i = this.x1; i <= this.x2; i++)
            cords.push([i * this.scale + offsetX, ((-this.getY(i) + this.a) + this.padding) * this.scale]);

        return cords;
    };
    this.getY = function(x){
        return Number((Math.pow(this.a, 3) / (Math.pow(this.a, 2) + Math.pow(x, 2))).toFixed(1));
    };

    this.getYAxe = function(){
        return (Math.abs(this.x1) + this.padding) * this.scale;
    };
    this.getXAxe = function(){
        return (this.a + this.padding) * this.scale;
    };

    this.getWidth = function () {
        return ((this.x2 - this.x1) + this.padding * 2) * this.scale ;
    };
    this.getHeight = function () {
        return (this.a + Math.round(
            Math.abs(
                Math.min(this.getY(this.x1), this.getY(this.x2))
            )
        ) + this.padding * 2) * this.scale;
    };
}