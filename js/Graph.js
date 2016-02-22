function Graph(id, core){
    this.object = document.getElementById(id);
    this.graph = this.object.getContext('2d');
    this.core = core;

    this.init = function (background) {
        this.setSize(this.core.getWidth(), this.core.getHeight());
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
        var y = !!((start >= -60 && start <= 60) || (end >= -60 && end <= 60) || (start < 0 && end > 0));


        var yAxe = this.core.getYAxe();
        var xAxe = this.core.getXAxe();
        var width = this.core.getWidth();
        var height = this.core.getHeight();
        var scale = this.core.scale;
        this.graph.font = 2 * scale + "px sans-serif";

        // Y
        if (y) {
            this.line([
                [yAxe, 0], [yAxe, height]
            ], 1, axesColor);
            this.line([
                    [yAxe - 1.5 * scale, 2 * scale], [yAxe, 0], [yAxe + 1.5 * scale, 2 * scale]
                ], 1, axesColor
            );
        }

        // X
        this.line([
            [0, xAxe], [width, xAxe]
        ], 1, axesColor);

        this.line([
                [width - 2 * scale, xAxe - (1.5 * scale)], [width, xAxe], [width - 2 * scale, xAxe + (1.5 * scale)]
            ], 1, axesColor
        );

        var interval = 5;
        var step = interval * scale;
        var i = yAxe - step;
        var n = interval * -1;

        while (i - step >= 0) {
            if(type)
                this.circle(i, xAxe, scale, pointsColor);
            else
                this.line([
                    [i, xAxe - scale], [i, xAxe + scale]
                ], 1, pointsColor);
            this.text(n, i - scale, xAxe -  scale * 2, textColor);
            n -= interval;
            i -= step;
        }

        i = yAxe + step;
        n = interval;
        while (i + step <= width) {
            if(type)
                this.circle(i, xAxe, scale, pointsColor);
            else
                this.line([
                    [i, xAxe - scale], [i, xAxe + scale]
                ], 1, pointsColor);
            this.text(n, i - scale, xAxe -  scale * 2, textColor);
            n += interval;
            i += step;
        }

        i = xAxe - step;
        n = 5;
        while (i - step >= 0) {
            if(type)
                this.circle(yAxe, i, scale, pointsColor);
            else
                this.line([
                    [yAxe - scale, i], [yAxe + scale, i]
                ], 1, pointsColor);
            this.text(n, yAxe + scale * 2, i + scale, textColor);
            n += interval;
            i -= step;
        }

        i = xAxe + step;
        n = -5;
        while (i + step <= height) {
            if(type)
                this.circle(yAxe, i, scale, pointsColor);
            else
                this.line([
                    [yAxe - scale, i], [yAxe + scale, i]
                ], 1, pointsColor);
            this.text(n, yAxe + scale * 2, i + scale, textColor);
            n -= interval;
            i += step;
        }

        this.graph.font = 3 * scale + "px sans-serif";
        this.text("0", yAxe + scale / 2, xAxe - scale, textColor);
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