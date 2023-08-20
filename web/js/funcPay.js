const listaMun = ["ESTATAL", "AMEALCO", "PINAL", "ARROYO SECO", 
	"CADEREYTA", "COLON", "CORREGIDORA", "EZEQUIEL MONTES", 
	"HUIMILPAN", "JALPAN DE SERRA", "LANDA DE MATAMOROS", 
	"EL MARQUES", "PEDRO ESCOBEDO", "PEÑAMILLER", "QUERETARO", 
	"SAN JOAQUIN", "SAN JUAN DEL RIO", "TEQUISQUIAPAN", "TOLIMAN", "OTRO"];
	
	var listaCam=[];

//$(document).ready(function(){
	/*$("#pGraficar").dblclick(function () {
		alert("has hecho doble click en el grafasd");
	});
	$("div[class=AMEAL]").dblclick(function(){
  		alert("has hecho doble click en el aMEALco");
	});
	$(".CORRE").click(function () {
		alert("has hecho doble click en el Corregidora");
	});
	$(".QUERE").dblclick(function(){
  		alert("has hecho doble click en el qro.");
	});*/
//});

var info = function () {
	var cadena = '<div id="pGraficar" class="login-form"; style="position:relative;");style="padding: 0px;" >' +
		'<div style="position: absolute; left: 40px; top: 5px; z-index: 2;"></div>'+
		'</div>'+
		'<div id="datoEjeX" class="login-form"></div>';
		return cadena;
}

function llenaDatos () {
	    var parametros = {
        "opc": '1',
		"val":Math.random()
    };

    //alert('en llenaDatos');
    var request = {
				// cambiar el GET por un POST
        type: 'GET',
        dataType: 'json',
		url: 'servicios/ConsultaIQM.php',
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

function borraModal () {
	var vmodalEx = $("div[id ^= Modal]");
		if((vmodalEx.length) > 0){
			vmodalEx.remove();
		}
}

function Mimodal() {
	var params = {
        title: 'Gr&aacute;fica',
        content: info(),
        modal: true,
        events: {
            onCancel: function () { },
            onCreate: function () { },
            onShow: function () { }
        }
    }

    var modal = MDM6('getModal', params);
    modal.show();
};

function menuMuni() {
	var cadena = '<select name="entidades" id="entidades" class="form-control" onchange="limpiasvg(1)">';
	cadena += '<option value=20161> A\u00F1o 2016</option>'
	+ '<option value=20171> A\u00F1o 2017</option>'
	+ '<option value=20181> A\u00F1o 2018</option>';
	cadena += '</select>';
	$('#opcEstados').html(cadena);
	
	var cadenaMun= '<select name="municipios" id="municipios" class="form-control" onchange="limpiasvg(2)">'; //onchange="X(\'mun\')
	cadenaMun+= '<option value=0> POR MUNICIPIO</option>';
	cadenaMun+= '<option value=0> TOTAL ESTATAL</option>';
	cadenaMun+= '<option value=1> AMEALCO </option>';
	cadenaMun+= '<option value=2> PINAL DE AMOLES</option>';
	cadenaMun+= '<option value=3> ARROYO SECO </option>';
	cadenaMun+= '<option value=4> CADEREYTA </option>';
	cadenaMun+= '<option value=5> COLON </option>';
	cadenaMun+= '<option value=6> CORREGIDORA </option>';
	cadenaMun+= '<option value=7> EZEQUIEL MONTES</option>';
	cadenaMun+= '<option value=8> HUIMILPAN </option>';
	cadenaMun+= '<option value=9> JALPAN </option>';
	cadenaMun+= '<option value=10> LANDA </option>';
	cadenaMun+= '<option value=11> EL MARQUES </option>';
	cadenaMun+= '<option value=12> PEDRO ESCOBEDO </option>';
	cadenaMun+= '<option value=13> PEÑAMILLER </option>';
	cadenaMun+= '<option value=14> QUERETARO </option>';
	cadenaMun+= '<option value=15> SAN JOAQUIN </option>';
	cadenaMun+= '<option value=16> SAN JUAN DEL RIO </option>';
	cadenaMun+= '<option value=17> TEQUISQUIAPAN </option>';
	cadenaMun+= '<option value=18> TOLIMAN </option>';
	
	cadenaMun += '</select>';
	//alert (cadenaMun);
	$('#opcMun').html(cadenaMun);
	}

function ocultaDiv(x) {
	if (x.checked) {
		document.getElementById('misCombos').style.visibility = "hidden";
		document.getElementById('btnTotal').disabled = false;
	} else {
		document.getElementById('misCombos').style.visibility = "visible";
		document.getElementById('btnTotal').disabled = true;

	}
}

function iniciaFun() {
	//buscaEntidad(); // llena menú con los estados y mpios de la DB
	//console.log("esta en iniciaFun, antes de inciatodo()");
	//iniciatodo();
	menuMuni();	
	llenaDatos();
	//Mimodal();
}

/* **************************************** */

function acumulaMun (xDat) {
	/*subjson [{mun y datos}] dato= sotero, casados ,etc
		[{ej mun:amealco, edociv:casado...}{mun:pinal ...}...]*/
		var nuevo = xDat[0];
		var valor;
		var registro;
		var j;
		var popiedades = Object.keys(nuevo);
	for (let i=1;i<xDat.length;i++) {
		registro = xDat[i];
		for (j in registro) {
			if (Number.isInteger(registro[j])) {
				valor = registro[j];
				nuevo[j] += valor	;
			} else {
				nuevo[j]= "QUERETARO";
			}
		}
	}
	//console.log(nuevo);
	return nuevo;
	
}

function agrupaTot (k) {
	//Borrar esta funcion... ¿? creo si 99.9999%
	registro=todoJson[i];
	var regisvalores = Object.values(registro);
}

function muestraDatos (Json) {
	//var edosMun = JSON.stringify (json);
	//alert ("el json origen " + Json);
	todoJson = Json;
	// var campo="edoCiv";
	// OP6 es la grafica de pay, OP1 al 5 son de barra
	var Lacadena = '<select name="comboInt" id="edadUs" onchange="grafica(\'OP6\')" class="form-control" required>';  
		Lacadena+= '<option selected="true" disable="disable">RANGO DE EDAD</option>';
		Lacadena+= '<option value="TOTAL">TOTAL</option>';
		llenaSelect (Lacadena, 'edadUs');
	
	var Lacadena = '<select name="comboInt" id="edoCiv" onchange="grafica(\'OP1\')" class="form-control" required>';  
		Lacadena+= '<option selected="true" disable="disable"> ESTADO CIVIL...</option>';
		Lacadena+= '<option value="TOTAL"> TOTAL</option>';
		llenaSelect (Lacadena, 'edoCiv');
	
	var Lacadena = '<select name="comboInt" id="regime" onchange="grafica(\'OP2\')" class="form-control">'; 
		Lacadena+= '<option selected="false" disable="disable"> REGIMEN CONYUGAL...</option>';
		Lacadena+= '<option value="TOTAL"> TOTAL</option>';
		llenaSelect (Lacadena, "regime");
	
	var Lacadena = '<select name="comboInt" id="ocupac" onchange="grafica(\'OP3\')" class="form-control">';
		Lacadena+= '<option selected="false" disable="disable"> OCUPACION...</option>';	
		Lacadena+= '<option value="TOTAL"> TOTAL</option>';
		llenaSelect (Lacadena, "ocupac");
	
	//campo="ingresos";
	var Lacadena = '<select name="comboInt" id="escola" onchange="grafica(\'OP4\')" class="form-control">';
		Lacadena+= '<option selected="true" disable="disable"> ESCOLARIDAD...</option>';
		Lacadena+= '<option value="TOTAL"> TOTAL</option>';
		llenaSelect (Lacadena, "escola");
		
	var Lacadena = '<select name="comboInt" id="nivelS" onchange="grafica(\'OP5\')" class="form-control">';
		Lacadena+= '<option selected="true" disable="disable"> NIVELSOCIOECONÓMICO...</option>';
		Lacadena+= '<option value="TOTAL"> TOTAL</option>';
		llenaSelect (Lacadena, "nivelS");
}

function llenaSelect(cadena, xcampo) {
	
	var miArray = new Array();
	var desde = cadena.indexOf("id=");
	var paraDiv = cadena.substr(desde+4,6)
	paraDiv = 'opc' + paraDiv; 
	//debugger;
	if (xcampo == "edadUs") {
		//cadena+= '<option value="TotalE">Total Edo</option>';
	} else {
		for(var i in todoJson){
			var reg = todoJson[i];
			if (i==0) {
				var tem = reg.xcampo;
				cadena+= '<option value="' + reg[xcampo] + '">'+reg[xcampo] +'</option>';
				miArray.push(reg[xcampo] );
			} 
			else {
				var esta = miArray.includes (reg[xcampo]);
				//var longi = miArray.length;
				if (!esta) {
					cadena+= '<option value="'+reg[xcampo]+'">'+reg[xcampo]+'</option>';
					miArray.push(reg[xcampo]);
				}
			}
		}
	}
	cadena += '</select>';
	//alert ("llenaselec "+ miArray);
	var cambia='#'+paraDiv;
	$(cambia).html(cadena);
}

/* Codigo de D3js.org  */
function grafica (opcion) {
	//otraModal();
	borraModal();
	Mimodal();
	
	var comboMpiox = document.getElementById('municipios'); 
	var qEdo = comboMpiox.options[comboMpiox.selectedIndex].text;
	//alert("opcion; en grafica (d3)->"+opcion);
	
	switch (opcion) {
		case "OP1": {
			var gra01 = document.getElementById("edoCiv").value;
			var subJson = cuenta("edoCiv", gra01);
			var letrero = ("Estado Civil (" + gra01 + ")"); 
			//alert (dato);
			break;
		}
		case "OP2": {
			var gra01 = document.getElementById('regime').value;
			var subJson = cuenta("regime", gra01);
			var letrero = ("Regimen Conyugal (" + gra01 + ")"); 
			break;
		}
		case "OP3": {
			var gra01 = document.getElementById('ocupac').value;
			var subJson = cuenta("ocupac", gra01);
			var letrero = ("Personal Ocupado (" + gra01 + ")"); 
			break;
		}
		case "OP4": {
			var gra01 = document.getElementById('escola').value;
			var subJson = cuenta("escola", gra01);
			var letrero = ("Escolaridad (" + gra01 + ")"); 
			break;
		}
		case "OP5": {
			var gra01 = document.getElementById('nivelS').value;
			var subJson = cuenta("nivelS", gra01);
			var letrero = ("Nivel Socioeconómico (" + gra01 + ")"); 
			break;
		}
		case "OP6": {
			var gra01 = document.getElementById('edadUs').value;
			var subJson = cuenta("edadUs", gra01);
			var letrero = ("Rango de edad (" + gra01 + ")"); 
			break;
		}
		
	} // del switch
	//var Qgrafi = document.getElementById("tipoGrafica").checked;
	//console.log(subJson);
	/*subjson [{mun y datos}] dato= sotero, casados ,etc
		[{ej mun:amelaco, edociv:casado...}{mun:pinal ...}...]*/
	if (qEdo == "TOTAL ESTATAL") {
		datoPay= acumulaMun (subJson);
		limpiasvg(2);
		//console.log(datoPay);
		grafiPay(datoPay, true, letrero);
	} else {
		limpiasvg(2);
		graBarStack(subJson, letrero);
	}
	var ventaModa0 = document.getElementById('pGraficar').parentNode;
	var ventaModa = ventaModa0.parentNode;
		//$(ventaModa).attr("top","0");
		ventaModa.style="left: 400px; top: 5px;"
}

function grafiPay (Objdatos,estado, elTitulo) {
	// = {casado:22,divorciado:12...mun:"ameal"} objeto. estado solo para rango de edad "TRUE"
	var camT = Object.keys(Objdatos);
	for (i in Objdatos) {
		if (Objdatos[i] == 0) {
			delete Objdatos[i];
		}
	}
	var data=[];
	var titulo = Objdatos.mun;
	var encontro=listaMun.find(function (busSt) {
		return busSt.substr(0,6) == titulo.substr(0,6);
	});
	
	var datT = Object.values(Objdatos);

	for (var i=0; i<datT.length;i++) {
		if ($.isNumeric(datT[i])) {
			data.push({d01:camT[i],d02:datT[i]});
		}
	}
	if (estado) {
		data.sort(function (a,b) {
			if (a.d01 > b.d01) {
				return 1;
			}
			if (a.d01 < b.d01) {
				return -1;
			}
			return 0;
		});
			var radS = $('input[name=xyz]:checked', '#radios').val();
			var anio = document.getElementById('entidades');
			var anioS = anio.options[anio.selectedIndex].text;
			elTitulo2 = "Gr\u00E1fica: " + radS + "(" + anioS +") " + elTitulo;
	} else {
		elTitulo2 = elTitulo + " " + encontro;
	}
      var width = 560,
          height = 500,
          radius = Math.min(width, height) / 2;

	var color = d3.scaleOrdinal(d3.schemeCategory10);
      var arc = d3.arc()
          .outerRadius(radius - 10)
          .innerRadius(0);

      var labelArc = d3.arc()
          .outerRadius(radius - 40)
          .innerRadius(radius - 40);

      var pie = d3.pie()
          .sort(null)
          .value(function(d) { return d.d02; });

      var svg = d3.select("#miPay").append("svg")
		//.attr("class", "graph-svg-component")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2  + "," + height / 2 + ")");

        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .style("fill", function(d) { return color(d.data.d01); });

        g.append("text")
            .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
            .attr("dy", ".5em")
            .text(function(d) {return (d.data.d01)})
			
		g.append("text")
            .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
            .attr("dy", "2em")	
			.text(function(d) {return (d.data.d02)});
			
			document.getElementById("muestra").firstChild.nodeValue = encontro;
			
		var txt = d3.select("#miPay").append("Label")
			.append("text")
			.attr("x", 62)
			.attr("y", 20)
			.attr("text-anchor", "start")
			.style("font-size", "18px")
			.attr("fill","rgb(233,162,37)")
			.attr("font-family", "sans-serif")
			.text(elTitulo2);
			
		tablota(data, "P");
}

function graBarStack (data, letre) {
	var el = document.getElementById('muestra'); 
	if (el != null) { 
			el.style.display = 'block';
	} else {
		limpiasvg(2);
		el = document.getElementById('muestra');
		el.style.display = 'block';
	}
	var svgWidth = 900;
	var svgHeight = 500;
	var tt;
	var gKeys=Object.keys(data[0]);
	
	for (i=0;i<data.length;i++) {
		tt = data[i].mun;
		data[i].mun = tt.substr(0,6);
	}
	gKeys.shift();
	//console.log(gKeys);
	//debugger;

var Xsvg = d3.select("#miPay")
		.append("div")
		.append("svg")
		.attr("width", svgWidth)
		.attr("height", svgHeight)
		.attr("id","miSvg");
		
	
	var Txsvg = d3.select("#cuadro") //.append("Tabl").data(tabl);
		.style("font-size", "12px")
		.attr("font-family", "sans-serif")
		.attr("class","titulo_boton")	

var series = d3.stack().keys(gKeys)
    .offset(d3.stackOffsetDiverging)
    (data);

var svg = d3.select("#miSvg").attr("class", "graph-svg-component"),
    margin = {top: 20, right: 20, bottom: 30, left: 60},
    width = +svg.attr("width"),
    height = +svg.attr("height");	

var x = d3.scaleBand()
    .domain(data.map(function(d) { return d.mun; }))
    .rangeRound([margin.left, width - margin.right])
    .padding(0.1);

var y = d3.scaleLinear()
    .domain([d3.min(series, stackMin), d3.max(series, stackMax)])
    .rangeRound([height - margin.bottom, margin.top]);

var z = d3.scaleOrdinal(d3.schemeCategory10);

svg.append("g")
  .selectAll("g")
  .data(series)
  .enter().append("g")
    .attr("fill", function(d) { return z(d.key); })
  .selectAll("rect")
  .data(function(d) { return d; })
  .enter().append("rect")
    .attr("width", x.bandwidth)
    .attr("x", function(d) { return x(d.data.mun); })
    .attr("y", function(d) { return y(d[1]); })
    .attr("height", function(d) { return y(d[0]) - y(d[1]); })
	.attr("class", function(d, i) {return data[i].mun })
	.on("dblclick",function (d,i){
		limpiasvg(2);
		grafiPay(data[i],false,titulo);
	});

svg.append("g")
    .attr("transform", "translate(0," + y(0) + ")")
    .call(d3.axisBottom(x));

svg.append("g")
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(d3.axisLeft(y));
	
	var radS = $('input[name=xyz]:checked', '#radios').val();
	var anio = document.getElementById('entidades');
	var anioS = anio.options[anio.selectedIndex].text;
	var titulo = "Gr\u00E1fica: " + radS + "(" + anioS +") " + letre;

	var txt = d3.select("#miSvg").append("g")
		.append("text")
		.attr("x", 80)
		.attr("y", 20)
		//.attr("text-anchor", "start")
		.style("font-size", "14px")
		.attr("fill","rgb(30,30,60)")
		.attr("font-family", "sans-serif")
		.text(titulo);
		
	function stackMin(serie){
		return d3.min(serie, function(d) { return d[0]; });
	}

	function stackMax(serie) {
		return d3.max(serie, function(d) { return d[1]; });
	}

/* "contenido_a_mostrar" es el nombre que le dimos al DIV */
	
var tabl = tablota(data, "B");

}

function muestra_oculta(id){
		if (document.getElementById){ 
			var el = document.getElementById(id); 
			el.style.display = (el.style.display == 'none') ? 'block' : 'none';
		}
	}

function grafiLinea (datoJson, selId, selOpt){
	var elId;
	var existeSvg = false;
	var data = [];
	var datasetM = [];
	var svgWidth = 700;
	var svgHeight = 500;
	var barPadding = 1;
	var ax = [];
	var ay = [];
	for (var i in datoJson) {
		ay[i] = datoJson[i].dato;
		ax[i] = datoJson[i].cveMpio;
		data.push({x:datoJson[i].cveMpio,y:datoJson[i].dato})
	}
	var xMax = d3.max(ax);
	var xMin = d3.min(ax)-1;
	var yMax = d3.max(ay)+10;
	var yMin = 0;
	var formato= d3.format("03");
	margin_x = 32;
	margin_y = 50;

	x = d3.scaleLinear().domain([xMin, xMax]).range([0 + margin_x, svgWidth - margin_x]);
	y = d3.scaleLinear().domain([yMin, yMax]).range([0 + margin_y, svgHeight - margin_y]);

	var colorRam = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
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
	//var gDos = document.getElementById('laG');

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
g.append("svg:path")
.attr("style",miColor).attr("d", line(data));

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
	.attr("text-anchor", "middle")
	.style("font-size", "22px")
	.attr("fill","rgb(233,162,37)")
	.attr("font-family", "sans-serif")
	.text(radS +" (" + anioS + ")");
} 

var idP = "L"+elId;
var leyenda = "<p id=" + idP + ">" + selOpt + "</p>";
$('#datoEjeX').append(leyenda);
var temParg = document.getElementById(idP);
$(temParg).css('color', colorRam);

	 
// if (!existeSvg) {  
g.append("svg:text")
.attr("x", (svgWidth))
.attr("y", -5 )
//.attr("text-anchor", "middle")
.style("font-size", "9px")
.attr("font-family", "sans-serif")
.text("Mun");

g.selectAll("Dtext")
.data(ax)
.enter()
.append("svg:text")
.attr("class", "yLabel")
.attr("x", function(d) { return x(d)})
.attr("y", -10)
.text(function(d) { return formato(d)})
.style("text-anchor", "middle")
.attr("font-family", "sans-serif")
.attr("font-size", "9px");
 /*}*/
}

function grafiBarra (datoJson) {
	var dataset = [];
	var datasetM = [];
	var svgWidth = 500;
	var svgHeight = 400;
	var barPadding = 1;
	var colorRam = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
	
	var colorInv = roloc(colorRam);
	
	for (var i in datoJson) {
		dataset[i] = datoJson[i].dato;
		datasetM[i] = datoJson[i].muni;
	}
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
			return svgHeight - (d * 4);
			  // 		return yScale(svgHeight - (d * 4));
			})
		.attr("width", svgWidth / dataset.length - barPadding)
		.attr("height", function(d) {
			   		return d * 4;
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
				var miY = svgHeight - (d * 4) + 14;
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
				laY = svgHeight-380; }
			else {
				laY = svgHeight-390;
			}
			return laY})
		.attr("font-family", "sans-serif")
		.attr("font-size", "9px"); 
		//.attr("style", "writing-mode: tb")
		//.attr("style", "glyph-orientation-vertical: 0");
    
}

function tablota(data, BoP) {

	var columns=Object.keys(data[0]);
	var z = d3.scaleOrdinal(d3.schemeCategory10);
	
    var table = d3.select("#cuadro").append("table")
        .attr("style", "margin-left: 25px"),
        thead = table.append("thead"),
        tbody = table.append("tbody");
		
	
    // append the header row
    thead.append("tr")
        .selectAll("th")
        .data(columns)
        .enter()
        .append("th")
		.attr("style", "font-family: Courier")
		.attr("style", "font-size: 9px")
		.attr("bgcolor",function(d,i) { 
			if (i!=0 && BoP == "B") {
				// return z(d); 
				}
				})
        .text(function(column) { return column; });

    // create a row for each object in the data
    var rows = tbody.selectAll("tr")
        .data(data)
        .enter()
        .append("tr")
		.attr("bgcolor",function(d,i) { 
				if (BoP == "P") {
						return z(i); 
					}
				});

    // create a cell in each row for each column
    var cells = rows.selectAll("td")
        .data(function(row) {
            return columns.map(function(column) {
                return {column: column, value: row[column]};
            });
        })
        .enter()
        .append("td")
        .attr("style", "font-family: Courier")
		.attr("style", "font-size: 9px")
		.attr("align", function(d,i) {
			if (i == 0) {return "left"} else {return "center" }
		})
		.attr("bgcolor", function (d,i){
				if (i != 0) {
					return z(i)
				}
		})
        .html(function(d) { return d.value; });
    
    return table;
}

function limpiasvg(qg) {
	switch (qg) {
		case 1: {
			$("#pGraficar").empty() //.append('<div id="pBtn" style="position: absolute; left: 65px; top: 5px; z-index: 3;"></div>');
			.append('<div id = "muestra"; class="titulo_boton"; style="display:none;">Tabla <a style="cursor: pointer;" onClick="muestra_oculta(\'cuadro\')" title="" class="boton_mostrar">Mostrar/Ocultar</a></div>');
			$("#pGraficar")
			.append('<div id="cuadro" style="position: absolute; display:none; left: 65px; top: 45px; z-index: 2;"></div>');
			$("#datoEjeX").empty();
			$(function() {
				$("#cuadro").draggable();
			});
			break;
		}
		case 2: {
			$("#pGraficar").empty() //.append('<div id="pBtn" style="position: absolute; left: 65px; top: 5px; z-index: 3;"></div>');
			.append('<div id = "muestra"; class="titulo_boton"; style="display:block;">Tabla <a style="cursor: pointer;" onClick="muestra_oculta(\'cuadro\')" title="" class="boton_mostrar">Mostrar/Ocultar</a></div>');
			$("#pGraficar")
			.append('<div id="miPay" class="graph-svg-component" style="position: absolute; left: 0px; top: 29px; z-index: 2;"></div>');
			$("#pGraficar")
			.append('<div id="cuadro" style="position: absolute; left: 50px; top: 60px; z-index: 3;"></div>');
			// boton imprimir que llama la funcion para imprimir  
			// $("#miPay").append('<button type="button" onclick=printDiv("#miPay")>Imprimir</button>');
			$(function() {
				$("#cuadro").draggable();
			});

			break;
			}
		case 3: {
			// borrar verificar creo que ya no uso esta opción.*********
			$("#pGraficar").empty()
			.append('<div id = "muestra"; class="titulo_boton";>Tabla <a style="cursor: pointer;" onClick="muestra_oculta(\'miPay\')" title="" class="boton_mostrar">Mostrar / Ocultar</a></div>');
			$("#pGraficar")
			.append('<div id="miPay" style="position: absolute; left: 65px; top: 45px; z-index: 3;"></div>');
			$(function() {
				$("#miPay").draggable();
			});
			break;
		}
		case 4: {
			break;
		}
	}
	
	var Sel = document.getElementById("edoCiv");
	Sel.selectedIndex = 0;
	Sel = document.getElementById("regime");
	Sel.selectedIndex = 0;
	Sel = document.getElementById("ocupac");
	Sel.selectedIndex = 0;
	Sel = document.getElementById("escola");
	Sel.selectedIndex = 0;
	Sel = document.getElementById("nivelS");
	Sel.selectedIndex = 0;
	Sel = document.getElementById("edadUs");
	Sel.selectedIndex = 0;
}

function cuenta(aas,campoSel) {
	datos=[];
	
	var queEdo = document.getElementById('entidades').value;
	var misCombos = document.getElementsByName('comboInt');
	
	var munSel = document.getElementById('municipios').value;
	//var municipios=[];
	var numMpio;
	var queMpio;
	var numdelEdo=18+1 //municipios del estado mas uno;
	/*for (i=0;i<numdelEdo;i++) {
//		 municipios.push(i);
	//}
	*/
	var ComboId; //que combo se sele es el ID 
	var comboValue; // valor del select value=edoCiv, regime // miscomobos son todos los combos no ocupado
	
	var valoresCombo=[];
	
	for (i=0; i<misCombos.length; i++) {
			//comboValue = misCombos[i].options[misCombos[i].selectedIndex].value;
			if (misCombos[i].selectedIndex != 0) {
				comboValue = misCombos[i].options[misCombos[i].selectedIndex].value;
				ComboId = misCombos[i].id;
				if (comboValue == "TOTAL") {
					for (j=2;j<misCombos[i].length;j++) {
						valoresCombo.push(misCombos[i].options[j].value);
					}
				} else {
					valoresCombo.push(campoSel);
				}
				break;
			}
	}
	
	var siCuenta = true;
	var esViol = document.getElementById("Violencia").checked;
	
	var radios = document.getElementsByName("xyz"); // de radios, un valor de usuaria, hechos o agresor
	for(var i=0;i<radios.length;i++) {
        if(radios[i].checked) {
			var selTabla = radios[i].value;
		}
	}
	selTabla += queEdo;
	
	var objeto2;
	var objeto3;
	for (i=0;i<todoJson.length;i++) {
        siCuenta = queOpcionEs(esViol, selTabla, i);
		if (siCuenta) {
			queMpio = todoJson[i].munici;
			numMpio = buscaNumMpio(queMpio);
			
			if ((numMpio == munSel) || (munSel == 0)) {
				x = todoJson[i][ComboId];
				if (campoSel == todoJson[i][ComboId] || campoSel == "TOTAL") {
					objeto2 = agrupa (i, ComboId);
					// tengo solo dos campos: ***(mun y valor)*** valor = solterao, csadao, etc.
					//mas el original para label's
					juntar(objeto2);
					//agrega información faltante
				}
			}
		}
	}
	return datos;
}

function agrupa(k, IdCombo) {

	/*solo un registro
	 k = i, munMpio 0 es todos y valuecombo "total" o (soltera/o, casado +...) depende del combo
	*/
	var miJson = [];
	var registro = todoJson[k]; //mun:amealco,edociv:soltera/o,regimen:sociedad,...}
	var regisvalores = Object.values(registro);  // amealco, soltera/o, sociedad...
	for (i=0;i<regisvalores.length;i++) {
		let x = regisvalores[i];
		let xx;
		let cambia=[null, "SIN DATO", "DESCONOCE", "NO SABE"];
		
		function checa(cc) { //¿habria que sacar la funcion del for? creo si
			return x == cc; 
			}
			
		xx = cambia.find(checa);
		if (xx !== undefined ) {
			regisvalores[i]="DESCONOCE";
		}
	}
	
	var campos = Object.keys(registro); //munici,edociv,regime,...
	var grabMun;
	var tmpMunDat;
	var grabDato;
	 
	for (i=0;i<campos.length;i++) {
		if (campos[i] == "munici") {
			tmpMunDat = buscaNumMpio(regisvalores[i]);
			grabMun = listaMun[tmpMunDat];
		}
		if (campos[i] == IdCombo) {
			grabDato = regisvalores[i];
		}
		/* propiedad = registro.${prop}; //tablax,  estado, munici,  ...
		//valor = ${registro[prop]};   //usuaria20171, queretaro, amealco, soltero, ...
		*/
	}
	DatoSin = grabDato.replace(/[\\/\s]/g,""); //espacios y /
	miJson.push ({mun:grabMun, dato:grabDato});
	/*	todoJson[i].munipi, fechaN, 
	edoCiv regime ocupac nivelS escola
	*/
	return miJson;
}

function juntar (obj) {
	//obj = [{mun:"AMEALCO",dato:"solteroa"}] es array de 1 objeto ojo!!!
	var existeMun = -1;
	var i, proIdx;
	var existePro = false;
	var pro=[];
	var objTemp={};
	var objDato;
	
for (i=0; i<datos.length; i++) { // busca municipio
		if (datos[i].mun == obj[0].mun) {
			existeMun = i;
		} 

		//pro = Object.keys(datos[i]); // borrar
		for (j in datos[i]) { //busca prototipo 
			if (obj[0].dato == j) {
				existePro = true;
			}
		}
	}
	//pro=[];
	
	pro = Object.values(obj[0]);
	objTemp.mun = obj[0].mun;
	objTemp[obj[0].dato] = 1;
	
	if (existeMun != -1) {
		// si existe ya un municipio ... P.e. AMEALCO sumar la propiedad a ese mun
		if (existePro) {
			datos[existeMun][obj[0].dato] ++ 
			
		} else {
			// existe mun, pero no prop, agragar a la nueva prop a todos los registros(municipios).
			for (i=0; i<datos.length;i++){
				datos[i][obj[0].dato] = 0;
			}
			datos[existeMun][obj[0].dato] = 1;
		}
		
	}else {
		if (existePro) {  // no mun, si Prop. Agregar municipio y agregar propiedad solo al nuevo
			objDato = datos[0];
			for (p in objDato) {
				objTemp[p] = 0;
			}
		}else {
			// no mun, ni propiedad. agregar municipio y propiedades a todos los registros
			for (i=0; i<datos.length;i++){
				datos[i][obj[0].dato] = 0;
			}
			objDato = datos[0];
			for (p in objDato) {
				objTemp[p] = 0;
			}
		}
		
		datos.push(objTemp);
		i = datos.length - 1;
		datos[i].mun = obj[0].mun;
		datos[i][obj[0].dato]=1;
		
	}
} 

function buscaNumMpio(strMpio) {
	let lisMun = [{'mun':'AMEALCO','N':1},
					{'mun':'PINAL DE AMOLES','N':2},
					{'mun':'ARROYO SECO','N':3},
					{'mun':'CADEREYTA DE MONTES','N':4},
					{'mun':'COLON','N':5},
					{'mun':'CORREGIDORA'    ,'N':6},
					{'mun':'EZEQUIEL MONTES','N':7},
					{'mun':'HUIMILPAN'      ,'N':8},
					{'mun':'JALPAN DE SERRA','N':9},
					{'mun':'LANDA DE MATAMOROS','N':10},
					{'mun':'EL MARQUES','N':11},
					{'mun':'PEDRO ESCOBEDO','N':12},
					{'mun':'PEÑAMILLER','N':13},
					{'mun':'QUERETARO','N':14},
					{'mun':'SANTIAGO DE QUERETARO','N':14},
					{'mun':'SAN JOAQUIN','N':15},
					{'mun':'SAN JUAN DEL RIO','N':16},
					{'mun':'TEQUISQUIAPAN','N':17},
					{'mun':'TOLIMAN','N':18},
					{'mun':'OTROS','N':19},
					{'mun':'','N':20}];
	
	if (strMpio == null) {
		console.log("mun error:" + strMpio);
		strMpio = "Amun_ERROR";
	}
	var temp = quitaAcento(strMpio);
	var regresa;
	var posi=-1;
	strMpio = temp;
	temp = quitaLinea (strMpio);
	strMpio = temp;
	temp = strMpio.toUpperCase();
	strMpio = temp;
	for (let x of lisMun){
		var tam;
		if (strMpio == "COLON") {tam = 5;} else {tam = 7}
		var a = strMpio.substring(0,tam);
		var b = x.mun.substring(0,tam);
		if (a == b) {
			regresa = x.N;
			posi = lisMun.indexOf(x);
		}
	}
	if (posi == -1) {
		return lisMun[19].N;
	} else {
		return regresa;
	};
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
  var translate_re = /[_/]/g;
  var translate = {
    "_": " ", "/":"-" 
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
