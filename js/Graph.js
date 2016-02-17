function Graph(id){
    this.object = document.getElementById(id);
    this.graph = this.object.getContext('2d');
    this.core = new Core();

    this.init = function () {
        this.core.scanValues();
        this.setSize(this.core.getWidth(0), this.core.getHeight(0));
    };
    this.print = function(){
        this.line(this.core.getGraphCords(), 1, "red");
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

        var width = end - start + 20;
        var height = a + Math.round(a/2);


        console.log(y);
    };

    this.test = function(){
        this.graph.beginPath();
        this.graph.moveTo(0, 5);
        this.graph.lineTo(90, 5);
        this.graph.lineWidth = 10;

        // set line color
        this.graph.strokeStyle = '#ff0000';
        this.graph.stroke();
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