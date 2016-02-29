function Graph(id, core){
    this.object = document.getElementById(id);
    this.graph = this.object.getContext('2d');
    this.core = core;

    this.init = function (background) {
        this.setSize(this.core.width, this.core.height);
        this.setBackground(background);

    };
    this.print = function (line_width, line_color, axes_color, points_color, text_color, type) {
        this.line(this.core.getGraphCords(), line_width, line_color);
        this.setAxes(this.core.x1, this.core.x2, this.core.a, axes_color, points_color, text_color, type);
    };

    this.setSize = function (width, height) {
        this.object.width = width;
        this.object.height = height;
    };

    this.setBackground = function (color) {
        this.graph.fillStyle = color;
        this.graph.fillRect(0, 0, this.object.width, this.object.height);
    };


    this.setAxes = function (start, end, a, axesColor, pointsColor, textColor, type) {
        this.graph.font = "2px sans-serif";
        var xAxeCords = this.core.getXAxe();
        var yAxeCords = this.core.getYAxe();
        var width = this.core.width;
        var height = this.core.height;
        var step = 5;
        var increment = 0;

        // отрисовка осей
        this.line(xAxeCords, 1, axesColor);
        this.line(yAxeCords, 1, axesColor);

        // отрисовка points
        if(this.core.fakeY){
            // X
            increment = this.core.realX(this.core.x1 + step);
            for(i = xAxeCords[0][0]; i <= width; i+=increment){
                this.line([
                    [i, height], [i, height - 5]
                ], 1, pointsColor);
            }

            // Y
            increment = this.core.realY(this.core.a - step);
            for(i = 0; i < height; i+=increment){
                this.line([
                    [0, i], [5, i]
                ], 1, pointsColor);
            }
        } else{
            // Y
            increment = this.core.realY(this.core.a - step);
            var yAxe = yAxeCords[0][0];
            for(var i = 0; i < height; i+=increment){
                this.line([
                    [yAxe - 5, i], [yAxe + 5, i]
                ], 1, pointsColor);
            }
            increment = this.core.realX(this.core.x1 + step);
            // X-
            for(i = yAxe; i > 0; i-=increment){
                this.line([
                    [i, height], [i, height - 5]
                ], 1, pointsColor);
            }

            // X+
            for(i = yAxe; i < width; i+=increment){
                this.line([
                    [i, height], [i, height - 5]
                ], 1, pointsColor);
            }
        }

    };

    this.line = function (points, width, color) {
        this.graph.beginPath();
        this.graph.moveTo(points[0][0], points[0][1]);

        for (var i = 1; i < points.length; i++)
            this.graph.lineTo(points[i][0], points[i][1]);

        this.graph.lineWidth = width;
        this.graph.strokeStyle = color;
        this.graph.stroke();
    };
    this.text = function(text, x, y, color){
        var oldColor = this.graph.fillStyle;

        this.graph.fillStyle = color;
        this.graph.fillText(text, x, y);

        this.graph.fillStyle = oldColor;
    };
    this.circle = function(x, y, r, color){
        this.graph.beginPath();
        this.graph.fillStyle = color;
        this.graph.arc(x, y, r,0, 2*Math.PI);
        this.graph.fill();
    };
    this.getLink = function(){
        return this.object.toDataURL('image/png').replace(/^data:image\/png/, 'data:application/octet-stream');
    }
}