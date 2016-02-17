function Core(){
    this.x1 = undefined;
    this.x2 = undefined;
    this.a = undefined;

    this.scanValues = function(){
        this.x1 = -60;
        this.x2 =  60;
        this.a =   40;

        return !(this.a <= 0 || this.x2 >= this.x1);

    };
    this.getGraphCords = function () {
        var cords = [];
        var offsetX = (this.x1 * -1) + 5;

        for (var i = this.x1; i <= this.x2; i++)
            cords.push([i + offsetX, -this.getY(i) + this.a + 5]);

        return cords;
    };
    this.getY = function(x){
        return Number((Math.pow(x, 3) / (Math.pow(this.a, 2) + Math.pow(x, 2))).toFixed(1));
    };
}