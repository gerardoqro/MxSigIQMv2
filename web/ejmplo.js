var data = [{'y': 224, 'x': 1970}, {'y': 1241, 'x': 1971}, {'y': 908, 'x': 1972}, {'y': 1441, 'x': 1973}, {'y': 947, 'x': 1974}, {'y': 1366, 'x': 1975}, {'y': 1017, 'x': 1976}, {'y': 849, 'x': 1977}, {'y': 1235, 'x': 1978}, {'y': 764, 'x': 1979}, {'y': 1201, 'x': 1980}, {'y': 1035, 'x': 1981}, {'y': 1113, 'x': 1982}, {'y': 1106, 'x': 1983}, {'y': 1010, 'x': 1984}, {'y': 1050, 'x': 1985}, {'y': 1133, 'x': 1986}, {'y': 1323, 'x': 1987}, {'y': 829, 'x': 1988}, {'y': 905, 'x': 1989}, {'y': 1073, 'x': 1990}, {'y': 1122, 'x': 1991}, {'y': 997, 'x': 1992}, {'y': 1371, 'x': 1993}, {'y': 957, 'x': 1994}, {'y': 990, 'x': 1995}, {'y': 1179, 'x': 1996}, {'y': 1422, 'x': 1997}, {'y': 1019, 'x': 1998}, {'y': 890, 'x': 1999}, {'y': 1091, 'x': 2000}, {'y': 1393, 'x': 2001}, {'y': 1419, 'x': 2002}, {'y': 977, 'x': 2003}, {'y': 901, 'x': 2004}];

var ax = [];
var ay = [];
data.forEach(function(d,i){
  ax[i] = d.x;
  ay[i] = d.y;
})
var xMax = d3.max(ax);
var xMin = d3.min(ax)-1;
var yMax = d3.max(ay)+100;
var yMin = 0;

w = 1100;
h = 300;

margin_x = 32;
margin_y = 50;

x = d3.scale.linear().domain([xMin, xMax]).range([0 + margin_x, w - margin_x]);
y = d3.scale.linear().domain([yMin, yMax]).range([0 + margin_y, h - margin_y]);

//<svg> element that represents the root of all the other elements you’re going to add
var svg = d3.select("body")
.append("svg:svg")
.attr("width", w)
.attr("height", h);
 
//<g> element so that all the elements added to it internally will be grouped together.
var g = svg.append("svg:g").attr("transform", "translate(0," + h + ")");

//declare a variable called line in which every data is converted into a point (x,y).
var line = d3.svg.line();
line.x(function(d) { return x(d.x); });
line.y(function(d) { return -y(d.y); });
 
 
//draw the xLabels
g.selectAll(".xLabel")
.data(x.ticks(data.length))//cantidad de ticks no intervalo
.enter().append("svg:text")
.attr("class", "xLabel")
.text(String)
.attr("x", function(d) { return x(d) })
.attr("y", -30) //distancia a  la linea
.attr("text-anchor", "middle");
 
// draw the yLabels
g.selectAll(".yLabel")
.data(y.ticks(data.length/2))
.enter().append("svg:text")
.attr("class", "yLabel")
.text(String)
.attr("x", 25)
.attr("y", function(d) { return -y(d) })
.attr("text-anchor", "end");

// draw the x axis
g.append("svg:line")
.attr("x1", x(xMin))
.attr("x2", x(xMax)+20)
.attr("y1", -y(yMin))
.attr("y2", -y(yMin));
 
// draw the y axis
g.append("svg:line")
.attr("x1", x(xMin))
.attr("y1", -y(yMin))
.attr("x2", x(xMin))
.attr("y2", -y(yMax)-10);
 
//draw the x ticks
g.selectAll(".xTicks") //Pequeña linea junto al tick
.data(x.ticks(data.length))
.enter().append("svg:line")
.attr("class", "xTicks")
.attr("x1", function(d) { return x(d); })
.attr("y1", -y(0))
.attr("x2", function(d) { return x(d); })
.attr("y2", -y(0)-5);
 
// draw the y ticks
g.selectAll(".yTicks")//Pequeña linea junto al tick
.data(y.ticks(5))
.enter().append("svg:line")
.attr("class", "yTicks")
.attr("y1", function(d) { return -1 * y(d); })
.attr("x1", x(0)+5)
.attr("y2", function(d) { return -1 * y(d); })
.attr("x2", x(0));
 
//draw the x grid
g.selectAll(".xGrids")
.data(x.ticks(data.length))
.enter().append("svg:line")
.attr("class", "xGrids")
.attr("x1", function(d) { return x(d); })
.attr("y1", -y(yMin))
.attr("x2", function(d) { return x(d); })
.attr("y2", -y(yMax)-10)
 
// draw the y grid
g.selectAll(".yGrids")
.data(y.ticks(data.length/2))
.enter().append("svg:line")
.attr("class", "yGrids")
.attr("y1", function(d) { return -1 * y(d); })
.attr("x1", x(xMax)+20)
.attr("y2", function(d) { return -y(d); })
.attr("x2", x(xMin));

 
// draw the line of data points
g.append("svg:path").attr("d", line(data));

g.append("svg:text")
.attr("x", (w / 2))
.attr("y", -h + 30 )
.attr("text-anchor", "middle")
.style("font-size", "22px")
.text("Precipitaciones anuales en 9 de Julio (1970 - 2004)");