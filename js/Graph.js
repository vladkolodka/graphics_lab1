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
        this.line(this.core.getXAxe(), 1, axesColor);
        this.line(this.core.getYAxe(), 1, axesColor);
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