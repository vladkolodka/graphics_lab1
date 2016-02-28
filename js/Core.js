function Core(x1, x2, a, step, heightError){
    this.x1 = x1;
    this.x2 = x2;
    this.a = a;
    this.step = step;
    this.width = window.innerWidth - 17;
    this.height = window.innerHeight - heightError;

    this.getGraphCords = function () {
        // вычисление массива координат графика
        var cords = [];
        var minY = this.getMinY();

        for (var i = this.x1; i <= this.x2; i+=this.step)
            cords.push([
                this.realX(i),
                this.height * (this.a - this.func(i)) / (this.a - minY)
            ]);

        return cords;
    };
    this.func = function(x){
        // функция Локон Аньези
        return Number((Math.pow(this.a, 3) / (Math.pow(this.a, 2) + Math.pow(x, 2))));
    };

    this.getYAxe = function(){
        // координаты линии оси Y

        var self = this;

        if(this.x1 <= 0 && this.x2 >= 0){
            // график проходит через x=0
            return main();
        }
        /*if(Math.abs(this.x1) <= 20 || Math.abs(this.x2) <= 20){
            // одна из точек близка к 0
            return main();
        }*/

        return helper();

        function main(){
            console.log(1);
            // основная ось
            var x1_ = self.realX(0);
            return [[x1_, 0], [x1_, self.height]];
        }
        function helper(){
            // вспомогательная ось, c учетом ширины линии оси (1)
            return [[1, 0], [1, self.height]];
        }
    };
    this.getXAxe = function(){
        // координаты линии оси X с учетом ширины линии оси (1)
        return [[0, this.height - 1], [this.width, this.height - 1]];
    };

    this.getMinY = function(){
        // поиск минимального значения Y
        return Math.min(this.func(this.x1), this.func(this.x2));
    };

    this.realX = function(x){
        return this.width * (x - this.x1) / (this.x2 - this.x1);
    };
}