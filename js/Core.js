function Core(){
    this.x1 = undefined;
    this.x2 = undefined;
    this.a = undefined;

    this.scanValues = function(){
        this.x1 = -120;
        this.x2 =  120;
        this.a =   60;

        return !(this.a <= 0 || this.x2 >= this.x1);

    };
    this.getGraphCords = function () {
        var cords = [];
        var offsetX = (this.x1 * -1);

        for (var i = this.x1; i <= this.x2; i++){
            var y = this.getY(i);
            cords.push([i + offsetX, -y + this.a]);
            console.log(y + ' : ' + -y + this.a);
        }

        return cords;
    };
    this.getY = function(x){
        return Number((Math.pow(x, 3) / (Math.pow(this.a, 2) + Math.pow(x, 2))).toFixed(1));
    };

    this.getWidth = function (idents) {
        return this.x2 - this.x1 + idents;
    };
    this.getHeight = function (idents) {
        return this.a + Math.round(
                Math.abs(
                    Math.min(this.getY(this.x1), this.getY(this.x2))
                )
            ) + idents;
    };
}