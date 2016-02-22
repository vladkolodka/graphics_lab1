document.addEventListener('DOMContentLoaded', function(){
    var content = document.getElementById('content');

    document.getElementById('data').onsubmit = function(){
        var x1 = Number(document.getElementsByName('x1')[0].value);
        var x2 = Number(document.getElementsByName('x2')[0].value);
        var a = Number(document.getElementsByName('a')[0].value);
        var padding = Number(document.getElementsByName('padding')[0].value);
        var scale = Number(document.getElementsByName('scale')[0].value);
        var line_width = Number(document.getElementsByName('line_width')[0].value);

        if(x2 <= x1){
            alert("X2 должно быть больше X1");
            return false;
        }
        if(a < 0){
            alert("A должно быть больше 0");
            return false;
        }
        if(padding < 0){
            alert("padding не может быть меньше 0");
            return false;
        }
        if(scale < 0){
            alert("scale не может быть меньше 0");
            return false;
        }
        if(line_width < 1){
            alert("Ширина линии графика не может быть меньше 1");
            return false;
        }

        content.innerHTML = "";
        var canvas = document.createElement('canvas');
        canvas.setAttribute('id', 'graph');
        content.appendChild(canvas);



        var core = new Core(
            Number(document.getElementsByName('x1')[0].value),
            Number(document.getElementsByName('x2')[0].value),
            Number(document.getElementsByName('a')[0].value),
            Number(document.getElementsByName('padding')[0].value),
            Number(document.getElementsByName('scale')[0].value)
        );
        var graph = new Graph('graph', core);
        graph.init(
            document.getElementsByName('background')[0].value
        );

        graph.print(
            Number(document.getElementsByName('line_width')[0].value),
            document.getElementsByName('line_color')[0].value,
            document.getElementsByName('axes_color')[0].value,
            document.getElementsByName('points_color')[0].value,
            document.getElementsByName('text_color')[0].value,
            Number(document.getElementsByName('points_type')[0].selectedIndex)
        );
        content.appendChild(document.createElement('br'));
        var link = document.createElement('a');
        link.setAttribute('href', graph.getLink());
        link.setAttribute('download', "image.png");
        link.innerHTML = "Download as image";
        content.appendChild(link);
        return false;
    };
}, false);