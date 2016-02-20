function Graph(id){
    this.object = document.getElementById(id);
    this.graph = this.object.getContext('2d');
    this.core = new Core();

    this.init = function () {

        this.core.scanValues();
        this.setSize(this.core.getWidth(),this.core.getHeight());

    };
    this.print = function(){
        this.setAxes(this.core.x1, this.core.x2, this.core.a, "blue");
        this.line(this.core.getGraphCords(), 2, "red");
    };

    this.setSize = function(width, height){
        this.object.width = width;
        this.object.height = height;
    };

    this.setBackground = function(color){
        this.graph.fillStyle = color;
        this.graph.fillRect(0, 0, this.object.width, this.object.height);
    };
    
    
    this.setAxes = function(start, end, a, color){
        var y = !!((start >= -60 && start <= 60) || (end >= -60 && end <= 60) || (start < 0 && end > 0));


        var yAxe = this.core.getYAxe();
        var xAxe = this.core.getXAxe();
        var width = this.core.getWidth();
        var height = this.core.getHeight();
        var scale = this.core.scale;

        // Y
        if(y){
            this.line([
                [yAxe, 0], [yAxe, height]
            ], 1, color);
            this.line([
                    [yAxe - 1.5 * scale, 2 * scale], [yAxe, 0], [yAxe + 1.5 * scale, 2 * scale]
                ], 1, color
            );
        }

        // X
        this.line([
            [0, xAxe], [width, xAxe]
        ], 1, color);

        this.line([
                [width - 2 * scale, xAxe - (1.5 * scale)], [width, xAxe], [width - 2 * scale, xAxe + (1.5 * scale)]
            ], 1, color
        );

        var step = 5 * scale;
        var i = yAxe - step;

        while (i - step >= 0){
            this.line([
                [i, xAxe - scale], [i, xAxe + scale]
            ], 1, color);
            i -= step;
        }

        i = yAxe + step;
        while (i + step <= width){
            this.line([
                [i, xAxe - scale], [i, xAxe + scale]
            ], 1, color);
            i += step;
        }

        i = xAxe - step;
        while (i - step >= 0){
            this.line([
                [yAxe - scale, i], [yAxe + scale, i]
            ], 1, color);
            i -= step;
        }

        i = xAxe + step;
        while (i + step <= height){
            this.line([
                [yAxe - scale, i], [yAxe + scale, i]
            ], 1, color);
            i += step;
        }
    };

    this.line = function(points, width, color){
        this.graph.beginPath();
        this.graph.moveTo(points[0][0], points[0][1]);

        for(var i = 1; i < points.length; i++)
            this.graph.lineTo(points[i][0], points[i][1]);

        this.graph.lineWidth = width;
        this.graph.strokeStyle = color;
        this.graph.stroke();
    };
    this.init();
}