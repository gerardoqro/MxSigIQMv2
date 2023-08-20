
function menuEntidad() {
	var cadena = '<select name="entidades" id="entidades" class="form-control" onchange="limpiasvg()">';
	cadena += '<option value=20161> Año 2016</option>'
	+ '<option value=20171> Año 2017</option>'
	+ '<option value=20181> Año 2018(trim 1)</option>'
	+ '<option value=20182> Año 2018(trim 2)</option>';
	cadena += '</select>';
	$('#opcEstados').html(cadena);

	}
function iniciaFun()
{
	//buscaEntidad(); // llena menú con los estados y mpios de la DB
	menuEntidad();		// el combo de estados lo lleno con 2016, 2017 y 2018.
	llenaDatos();
}

/* **************************************** */

function llenaDatos  () {
	    var parametros = {
        "opc": '1',
		"val":Math.random()
    };

    //alert('en llenaDatos');
    var request = {
		
        type: 'GET',
        dataType: 'json',
		url: 'http://localhost/mxsig_iqm/servicios/ConsultaIQMGral.php',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: parametros,
		
        success: function (json) {
             //alert('bien tos '+json[2].fechaN);
			muestraDatos(json);
		},

        beforeSend: function () {},
        error: function (obj1, errX, obj2) { alert("error en json de consultaIQM=" + errX);},
        complete: function () {}
    };
    
    $.ajax(request);
	//alert('Junto a ajax> ' + request);
}

function muestraDatos (Json) {
	//var edosMun = JSON.stringify (json);
	//alert ("el json origen " + Json);
	todoJson = Json;

}


/* Codigo de D3js.org  */
function grafica () {
	//alert("opcion; en grafica (d3)->"+opcion);
	var selectID;
	//var gra01 = document.getElementById("edoCiv").value; //total edociv es campo total, edo, etc
	gra01 = "total_";
	var subJson = cuenta(gra01);
	var orden='mes';
	
	subJson.sort(function (a,b){
	if (a.mes > b.mes) {
		return 1;
	}
	if (a.mes < b.mes) {
		return -1;
	}
	return 0;
	})
	
	var Qgrafi = document.getElementById("tipoGrafica").checked;
	//console.log(subJson);
	if (Qgrafi) { 
		grafiLinea(subJson); 
		} else {grafiBarra(subJson);}
}

function grafiLinea (datoJson){
	var data = [];
	var elId;
	var existeSvg;
	var datasetM = [];
	var svgWidth = 700;
	var svgHeight = 500;
	var barPadding = 1;
	var ax = [];
	var ay = [];
	for (var i in datoJson) {
		ay[i] = datoJson[i].dato;
		ax[i] = datoJson[i].mes;
		data.push({x:datoJson[i].mes,y:datoJson[i].dato});
		datasetM[i]=datoJson[i].nomMes;
	}
	var xMax = d3.max(ax);
	var xMin = d3.min(ax)-1;
	var yMax = d3.max(ay)+10;
	var yMin = 0;
	var formato= function (mm) {
		var as = parseInt(mm);
		as--;
		//var meses = new Array ("X","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre","Otros");
		return datoJson[as].nomMes;
	};
	margin_x = 32;
	margin_y = 50;

	x = d3.scaleLinear().domain([xMin, xMax]).range([0 + margin_x, svgWidth - margin_x]);
	y = d3.scaleLinear().domain([yMin, yMax]).range([0 + margin_y, svgHeight - margin_y]);

	var colorRam = 'rgb(255,'+ (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
	
	var colorInv = roloc(colorRam);

	if ( document.getElementById('miSvg')) {
		var element = document.getElementById('miSvg');
		existeSvg = true;
		//element.parentNode.removeChild(element);
		}
	if (!existeSvg) {
		var svg = d3.select("#pGraficar")
		.append("svg:svg")
		.attr("width", svgWidth)
		.attr("height", svgHeight)
		.attr("id","miSvg");
	} else {
		var svg = d3.select("#pGraficar");
	}
//<g> element so that all the elements added to it internally will be grouped together.
	if (!existeSvg) {
		elId = "laG";
	}
	else {
		svgHijos = $('#miSvg').children('g').length;
		elId = "laG"+svgHijos;
	}
	var g = svg.append("svg:g").attr("id",elId)
	.attr("transform", "translate(0," + svgHeight + ")");
//declare a variable called line in which every data is converted into a point (x,y).

var line = d3.line();
line.x(function(d) { return x(d.x); });
line.y(function(d) { return -y(d.y); });

if (!existeSvg) {
//draw the xLabels
g.selectAll(".xLabel")
.data(x.ticks(data.length))//cantidad de ticks no intervalo
.enter().append("svg:text")
.attr("class", "xLabel")
.text(String)
.attr("x", function(d) { return x(d) })
.attr("y", -30) //distancia a  la linea
.style("color","red")
.attr("text-anchor", "middle");
 
// draw the yLabels
g.selectAll(".yLabel")
.data(y.ticks(data.length/2))
.enter().append("svg:text")
.attr("class", "yLabel")
.text(String)
.attr("x", 25)
.attr("y", function(d) { return -y(d) })
.attr("font-family", "sans-serif")
.attr("font-size", "12px")
.attr("text-anchor", "end");

// draw the x axis
g.append("svg:line")
.attr("x1", x(xMin))
.attr("x2", x(xMax)+20)
.attr("y1", -y(yMin))
.attr("y2", -y(yMin))
.attr("stroke-width","3")
.attr("font-family", "sans-serif")
.attr("font-size", "9px")
.attr("fill","none");
 
// draw the y axis
g.append("svg:line")
.attr("x1", x(xMin))
.attr("y1", -y(yMin))
.attr("x2", x(xMin))
.attr("y2", -y(yMax)-10)
.attr("stroke-width","2")
.attr("stroke","blue");
		
//draw the x ticks
g.selectAll(".xTicks") //Pequeña linea junto al tick
.data(x.ticks(data.length))
.enter().append("svg:line")
.attr("class", "xTicks")
.attr("x1", function(d) { return x(d); })
.attr("y1", -y(0))
.attr("x2", function(d) { return x(d); })
.attr("y2", -y(0)-5)
.attr("stroke-width", "2")
.attr("stroke","steelblue");
 
// draw the y ticks
g.selectAll(".yTicks")//Pequeña linea junto al tick
.data(y.ticks(5))
.enter().append("svg:line")
.attr("class", "yTicks")
.attr("y1", function(d) { return -1 * y(d); })
.attr("x1", x(0)+5)
.attr("y2", function(d) { return -1 * y(d); })
.attr("x2", x(0))
.attr("stroke","steelblue")
.attr("stroke-width","2");

//draw the x grid

g.selectAll(".xGrids")
.data(x.ticks(data.length))
.enter().append("svg:line")
.attr("class", "xGrids")
.attr("x1", function(d) { return x(d); })
.attr("y1", -y(yMin))
.attr("x2", function(d) { return x(d); })
.attr("y2", -y(yMax)-10)
.attr("stroke-width", "1")
.attr("stroke","lightgray");
 
// draw the y grid
g.selectAll(".yGrids")
.data(y.ticks(data.length/2))
.enter().append("svg:line")
.attr("class", "yGrids")
.attr("y1", function(d) { return -1 * y(d); })
.attr("x1", x(xMax)+20)
.attr("y2", function(d) { return -y(d); })
.attr("x2", x(xMin))
.attr("stroke-width", "1")
.attr("stroke","lightgray");
}

var miColor = "stroke:"+colorRam;
// este no va!!!!
  g.append("svg:path").attr("style",miColor)
  .attr("d", line(data));
  
if (existeSvg) {
	var nuevaG = document.getElementById(elId);
	var hijoPrev = svgHijos - 1;
	idPre = "laG"+hijoPrev;
	var gDos = document.getElementById(idPre);
	document.getElementById('miSvg').insertBefore(nuevaG,gDos)
} else {
	g.append("svg:path")
	.attr("style",miColor).attr("d", line(data));
}
var radS = $('input[name=xyz]:checked', '#radios').val();
var anio = document.getElementById('entidades');
var anioS = anio.options[anio.selectedIndex].text;

if (!existeSvg) {
g.append("svg:text")
.attr("x", (svgWidth / 2))
.attr("y", -svgHeight + 30 )
.style("font-size", "22px")
.attr("text-anchor", "middle")
.attr("font-family", "sans-serif")
.style("color","red")
.text("Fenómeno de Violencia en QRO. ");
}

var idP = "L"+elId;
var leyenda = "<p id=" + idP + ">" +radS + "(" +anioS+")" + "</p>";
$('#datoEjeX').append(leyenda);
var temParg = document.getElementById(idP);
$(temParg).css('color', colorRam);

g.append("svg:text")
.attr("x", (svgWidth))
.attr("y", -10 )
//.attr("text-anchor", "middle")
.style("font-size", "9px")
.attr("font-family", "sans-serif")
.text("Mes");

g.selectAll("Dtext")
.data(ax)
.enter()
.append("svg:text")
.attr("class", "yLabel")
.attr("x", function(d) { return x(d)})
.attr("y", -10)
.attr("text-anchor", "middle")
.text(function(d) { return formato(d)})
.attr("font-family", "sans-serif")
.attr("font-size", "9px");
}

function grafiBarra (datoJson) {
	var dataset = [];
	var datasetM = [];
	var svgWidth = 500;
	var svgHeight = 400;
	var barPadding = 1;
	var colorRam = 'rgb(255,' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
	
	var colorInv = roloc(colorRam);
	
	for (var i in datoJson) {
		dataset[i] = datoJson[i].dato;
		datasetM[i] = datoJson[i].nomMes;
	}
	var margin_x = 32;
	var margin_y = 50;
	var xMax = d3.max(dataset);
	var xMin = 0;
	var yMax = d3.max(dataset);
	var yMin = 0;
	
	x = d3.scaleLinear().domain([xMin, xMax]).range([0 + margin_x, svgWidth - margin_x]);
	y = d3.scaleLinear().domain([yMin, yMax]).range([0 + margin_y, svgHeight - margin_y]);
	
	//console.log (document.getElementById('miSvg'));
	if ( document.getElementById('miSvg')) {
		var element = document.getElementById('miSvg');
		element.parentNode.removeChild(element);
		//console.log ("eliminado");
		}

	var svg = d3.select("#pGraficar")
		.append("svg")
		.attr("width", svgWidth)
		.attr("height", svgHeight)
		.attr("id","miSvg");
		
	svg.selectAll("rect")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("x", function(d, i) {
			   		return i * (svgWidth / dataset.length);
			   })
		.attr("y", function(d) {
			return svgHeight - (d * 2);
			  // 		return yScale(svgHeight - (d * 4));
			})
		.attr("width", svgWidth / dataset.length - barPadding)
		.attr("height", function(d) {
			   		return d * 2;
			   })
		.attr("fill", colorRam);
		
	svg.selectAll("text")
		.data(dataset)
		.enter()
		.append("text")
		.text(function(d) {
		  		return d;
		   })
		.attr("text-anchor", "middle")
		.attr("x", function(d, i) {
		   		return i * (svgWidth / dataset.length) + (svgWidth / dataset.length - barPadding) / 2;
			   })
		.attr("y", function(d) {
				var miY = svgHeight - (d * 2) + 14;
				if (miY < 10) {
					miY = 11;
				}
				else if (miY > svgHeight - 14) {
					miY= svgHeight -10;
				}
		   		return  miY;
			   })
		.attr("font-family", "sans-serif")
		.attr("font-size", "11px")
		.attr("fill", colorInv);
		
		$("#datoEjeX").empty();
		
	var Gsvg = d3.select("#datoEjeX")
		.append("svg")
		.attr("width", svgWidth)
		.attr("height", svgHeight-300)
		.attr("id","SvgX");
		
	 Gsvg.selectAll("ejeX")
		.data(datasetM)
		.enter()
		.append("text")
		.text (function (d){
				return d.substring(0,8);
			})
		.attr("x", function(d, i) {
		   		return i * (svgWidth / dataset.length);
			   })
		.attr("y", function (d, i) {
			var laY
			if (i%2==0) {
				laY = svgHeight-390; }
			else {
				laY = svgHeight-390;
			}
			return laY})
		.attr("font-family", "sans-serif")
		.attr("font-size", "12px"); 
		//.attr("style", "writing-mode: tb")
		//.attr("style", "glyph-orientation-vertical: 0");
    
}

function limpiasvg(qg) {
	var esBarra = document.getElementById("tipoGrafica").checked;
	if (!esBarra || qg == 1){
	$("#pGraficar").empty();
	$("#datoEjeX").empty();
	}
	//var Sel = document.getElementById("edoCiv");
	//Sel.selectedIndex = 0;
}

function cuenta (elemento) {
	var siCuenta = true;
	var regresa = [];
	var datos = [];
	var listaMeses=[];
	var MesStr = [];
	var mes;
	var tot_Meses = 0;
	var pos_mes = 0;
	var meses = [];
	var encontro = false;
	var esViol = document.getElementById("Violencia").checked;
	var ctrl = document.getElementsByName("xyz"); // de radios, un valor de usuaria, hechos o agresor
	var anio = document.getElementById("entidades").value;
	
	for(var i=0;i<ctrl.length;i++) {
        if(ctrl[i].checked) {
			var tabla = ctrl[i].value;
		}
	}
	tabla += anio;
	for (var i in todoJson) {
		siCuenta = queOpcionEs(esViol, tabla, i);
		encontro = false;
		if (siCuenta) {
			mes = todoJson[i].fechaO.substring(3,5);
			for (ii=0; ii<tot_Meses; ii++) {
				if (mes == listaMeses[ii]) {
				// si lo encuentra 01 = 01 (enero)
					pos_Mes = ii
					encontro = true;
				}
			}
			if (encontro) {
				datos[pos_Mes]= datos[pos_Mes] + 1;
			} else {
				listaMeses.push(mes);
				datos.push(1);
				tot_Meses++;
				var numMpio = buscaNumMes(mes); //cambia a 01 a ENE,...
				MesStr.push(numMpio);;
				//console.log(listaMeses[i]);
			}
		}
	}
	
	for (i=0;i<12;i++) {
		//a diferencia de func.js aqui la pos 0 corresponde enero, 1 feb, etc, hasta 11.
		regresa.push({mes:i+1,dato:0,nomMes:""});
	}
	
	//*****IMPORTANTE CAMBIAR EL IN POR UN OF O ALGUN OTRO INCLUSO EL FOR NORMAL. ****
	for (i in datos) {
		var ij = parseInt(listaMeses[i]) - 1;
		regresa[ij].mes = listaMeses[i];
		regresa[ij].dato = datos[i];
		regresa[ij].nomMes = MesStr[i];
	}
		//console.log(regresa[i].muni + "-" + regresa[i].dato);
	return regresa;
}


function buscaNumMes(mes) {
	let lisMeses = [{'M':'ENE','N':1},
					{'M':'FEB','N':2},
					{'M':'MAR','N':3},
					{'M':'ABR','N':4},
					{'M':'MAY','N':5},
					{'M':'JUN','N':6},
					{'M':'JUL','N':7},
					{'M':'AGO','N':8},
					{'M':'SEP','N':9},
					{'M':'OCT','N':10},
					{'M':'NOV','N':11},
					{'M':'DIC','N':12},
					{'M':'xyz','N':13}];
	var regresa;
	var posi=-1;
	var a = parseInt(mes);
	for (let x of lisMeses){
		var b = x.N;
		if (a == b) {
			regresa = x.M;
			posi = lisMeses.indexOf(x);
			return regresa;
		}
	}
		return lisMeses[12].M;
}
var quitaAcento = (function() {
  var translate_re = /[ÁÉÍÓÚáéóú]/g;
  var translate = {
    "Á": "A", "É": "E", "Í": "I",
    "Ó": "O", "Ú": "U", "á": "a",
	"é": "e", "í": "i", "ó": "o", "ú": "u" // se pueden mas
  };
  return function(s) {
    return ( s.replace(translate_re, function(match) { 
      return translate[match]; 
    }) );
  }
})();

var quitaLinea = (function() {
  var translate_re = /[_]/g;
  var translate = {
    "_": " " 
  };
  return function(s) {
    return ( s.replace(translate_re, function(match) { 
      return translate[match]; 
    }) );
  }
})();

function queOpcionEs (V, tipo, ii) {
	var regresa = false;
	if (todoJson[ii].tablax == tipo) {
		if (V) {
			if (todoJson[ii].casoVi == "SI") regresa = true;
		} else regresa = true;
	}
	return regresa;
}

function roloc(xc){
		var l = xc.length;
		var c = [];
		for (i=0;i<l;i++) {
			if (xc[i]=="," || xc[i] == "(") c.push(i);
		}

		p = c[0]+1;
		u = c[1];
		d = c[2];
		t = l - 1;
		rr = 255^xc.substring(p,u);
		gg = 255^xc.substring(u+1,d);
		bb = 255^xc.substring(d+1,t);
  
		return "RGB("+rr+","+gg+","+bb+")";
	}
	
// ****** IMP *****
function printDiv(nombreDiv) {
     var contenido= document.getElementById(nombreDiv).innerHTML; 
	 var contenidoOriginal= document.body.innerHTML;
     document.body.innerHTML = contenido;

     window.print();

     document.body.innerHTML = contenidoOriginal;
}