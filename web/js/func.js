function inicializa_xhr () {
	//NO UTULIZADA version con JS puro sin Jquery.
	if(window.XMLHttpRequest) {
    return new XMLHttpRequest(); 
  }
  else if(window.ActiveXObject) {
    return new ActiveXObject("Microsoft.XMLHTTP");
  }
}

function procesaRespuesta() {
	//NO UTILIZADA
  if(xhttp.readyState == READY_STATE_COMPLETE) {
    if(xhttp.status == 200) {
		alert ("en la fun " +xhttp.status);
      //document.getElementById("respuesta").innerHTML = peticion_http.responseText;
    }
  }
}

function miAjax(datos){
	//alert ("en miAjax")
	// NO LA UTILIZO, PERO FUNCIONA, ES AJAX CON JS PURO. UTILIZO LA DE JQUERY

	var READY_STATE_COMPLETE=4;
	var xhttp = null;
	xhttp = inicializa_xhr();
	alert(xhttp.status);
	if (xhttp) {
		xhttp.onreadystatechange = procesaRespuesta;
		//alert (xhttp.onreadystatechange);
		xhttp.open('POST','../servicios/Consultados.php',false);
		xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhttp.send("opc=1&nocache=" + Math.random());
	}
	
	if (xhttp.status == 200)
		alert("fuera fun"+xhttp.responseText)
	else alert ("err "+xhttp.statusText);
}

var buscaEntidad = function () {
    var parametros = {
        "opc": '4',
		"val":Math.random()
    };

    //alert('en func.js');
    var request = {
		
        type: 'GET',
        dataType: 'json',
		url: '../servicios/Consultados.php',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: parametros,
		
        success: function (json) {
             //alert('bien tos '+json[2].clave);
			llenaSoloEntidad(json); // llena todos los estados.
		},

        beforeSend: function () {},
        error: function (obj1, errX, obj2) { alert("error en sacar json consultados=" + errX);},
        complete: function () {}
    };
    
    $.ajax(request);
	//alert('Junto a ajax> ' + request.json);
}

function buscaEdo(valor, index, todo){
	/* Array.prototype.unique=function(a){
		return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
		});
		var estados = json.unique();
		alert (estados);   
		FUNCION QUE NO UTILIZO, SOLO COMO EJEMPLO: SI PASABA EL JSON A OBJETOS o ARRAY
		pero esta funcional es muy interesante selecciona las no repetidos de un array*/
		
	}

var llenaSoloEntidad = function (json) {
		//alert (json[23].nomedo);
		//var edosMun = JSON.stringify (json);
		//alert ("el json origen " + edosMun);
		var cadena = '<select name="entidades" id="entidades" class="form-control" onchange="selecMun(this.value,this)">';
		
		//var soloEstados = edosMun.map(buscaEdo);
		for(var i in json){
			var reg= json[i];
			if (i==0) {
			cadena+= '<option value='+reg.edo+' >'+reg.nomedo+'</option>';
			//cadena[0].pasar = json;
			} else {
				var regOld = json[i-1];
				if (reg.edo!=regOld.edo) {
					if (reg.edo == "22") { 
					cadena+= '<option value='+reg.edo+' selected="selected">'+reg.nomedo+'</option>';
					} else {
					cadena+= '<option value='+reg.edo+' >'+reg.nomedo+'</option>';
					}
				}
			}
		}
		cadena += '</select>';
		//alert (cadena);
		$('#opcEstados').html(cadena);
		var paras = document.getElementById('opcEstados')
		//document.getElementById('Querétaro').selected= "true";
		paras.pasar = json;
		selecMun("22",paras)
		//alert ("paras.pasar(json) ="+paras.pasar[22].mpio);
	}

function selecMun(estado,xjson) {
	//alert ("estado=" +estado);
	var paras = document.getElementById('opcEstados');
	//alert ("json->"+ paras.pasar[estado-1].nommpio);
	var cadenaMun= '<select name="municipios" id="municipios" class="form-control ;">'; //onchange="X(\'mun\')
	
	for (var i in paras.pasar) {
		var reg = paras.pasar[i];
		if (reg.edo == estado) {
			cadenaMun+= '<option value='+reg.mpio+' >'+reg.nommpio+'</option>';
		}
	}
	cadenaMun += '</select>';
	//alert (cadenaMun);
	$('#opcMun').html(cadenaMun);
}
function menuEntidad() {
	var cadena = '<select name="entidades" id="entidades" class="form-control" onchange="limpiasvg(2)">';
	cadena += '<option value=20161> Año 2016</option>'
	+ '<option value=20171> Año 2017</option>'
	+ '<option value=20181> Año 2018(trim 1)</option>'
	+ '<option value=20182> Año 2018(trim 2)</option>';
	cadena += '</select>';
	$('#opcEstados').html(cadena);
	var paras = document.getElementById('opcEstados')
	var cadenaMun= '<select name="municipios" id="municipios" class="form-control ;">'; //onchange="X(\'mun\')
	cadenaMun+= '<option value=001> AMEALCO </option>';
	cadenaMun+= '<option value=002> PINAL DE AMOLES</option>';
	cadenaMun+= '<option value=003> ARROYO SECO </option>';
	cadenaMun+= '<option value=004> CADEREYTA </option>';
	cadenaMun+= '<option value=005> COLON </option>';
	cadenaMun+= '<option value=006> CORREGIDORA </option>';
	cadenaMun+= '<option value=007> EZEQUIEL MONTES</option>';
	cadenaMun+= '<option value=008> HUIMILPAN </option>';
	cadenaMun+= '<option value=009> JALPAN </option>';
	cadenaMun+= '<option value=010> LANDA </option>';
	cadenaMun+= '<option value=011> EL MARQUES </option>';
	cadenaMun+= '<option value=012> PEDRO ESCOBEDO </option>';
	cadenaMun+= '<option value=013> PEÑAMILLER </option>';
	cadenaMun+= '<option value=014> QUERETARO </option>';
	cadenaMun+= '<option value=015> SAN JOAQUIN </option>';
	cadenaMun+= '<option value=016> SAN JUAN DEL RIO </option>';
	cadenaMun+= '<option value=017> TEQUISQUIAPAN </option>';
	cadenaMun+= '<option value=018> TOLIMAN </option>';
	
	cadenaMun += '</select>';
	//alert (cadenaMun);
	$('#opcMun').html(cadenaMun);
	}
function iniciaFun()
{
	//buscaEntidad(); // llena menú con los estados y mpios de la DB
	menuEntidad();		// el combo de estados lo lleno con 2016, 2017 y 2018 y el otro combo con los mun (¿quitarlo?).
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
		url: '../servicios/ConsultaIQM.php',
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
	// var campo="edoCiv";
	var Lacadena = '<select name="opcEdoCivil" id="edoCiv" onchange="grafica(\'OP1\')" class="form-control" required>';  
		Lacadena+= '<option selected="true" disable="disable"> ESTADO CIVIL...</option>';
		llenaSelect (Lacadena, 'edoCiv');
	
	var Lacadena = '<select name="opcRegimen" id="regime" onchange="grafica(\'OP2\')" class="form-control">'; 
		Lacadena+= '<option selected="false" disable="disable"> REGIMEN CONYUGAL...</option>';	
		llenaSelect (Lacadena, "regime");
	
	var Lacadena = '<select name="opcOcupacion" id="ocupac" onchange="grafica(\'OP3\')" class="form-control">';
		Lacadena+= '<option selected="false" disable="disable"> OCUPACION...</option>';	
		llenaSelect (Lacadena, "ocupac");
	
	//campo="ingresos";
	var Lacadena = '<select name="opcEscolar" id="escola" onchange="grafica(\'OP4\')" class="form-control">';
		Lacadena+= '<option selected="true" disable="disable"> ESCOLARIDAD...</option>';	
		llenaSelect (Lacadena, "escola");
		
	var Lacadena = '<select name="opcNivelSocio" id="nivelS" onchange="grafica(\'OP5\')" class="form-control">';
		Lacadena+= '<option selected="true" disable="disable"> NIVELSOCIOECONÓMICO...</option>';	
		llenaSelect (Lacadena, "nivelS");
}

function llenaSelect(cadena, xcampo) {
	
	var miArray = new Array();
	var hasta = cadena.indexOf("id=");
	var paraDiv = cadena.substr(14,hasta-16)
	for(var i in todoJson){
		var reg = todoJson[i];
		//debugger;
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
				//miArray[longi]=reg.edoCiv;
				miArray.push(reg[xcampo]);
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
	//alert("opcion; en grafica (d3)->"+opcion);
	var selectID;
	switch (opcion) {
		case "OP1": {
			var gra01 = document.getElementById("edoCiv").value;
			var subJson = cuenta("edoCiv", gra01);
			selectID = "edoCiv";
			//alert (dato);
			break;
		}
		case "OP2": {
			var gra01 = document.getElementById('regime').value;
			var subJson = cuenta("regime", gra01);
			selectID = "regime";
			break;
		}
		case "OP3": {
			var gra01 = document.getElementById('ocupac').value;
			var subJson = cuenta("ocupac", gra01);
			selectID = "ocupac";
			break;
		}
		case "OP4": {
			var gra01 = document.getElementById('escola').value;
			var subJson = cuenta("escola", gra01);
			selectID = "escola";
			break;
		}
		case "OP5": {
			var gra01 = document.getElementById('nivelS').value;
			var subJson = cuenta("nivelS", gra01);
			selectID = "nivelS";
			break;
		}
		
	} // del switch
	var Qgrafi = document.getElementById("tipoGrafica").checked;
	/*	subJson.sort(function (a,b){
		if (a.cveMpio > b.cveMpio) {
			return 1;
		}
		if (a.cveMpio < b.cveMpio) {
			return -1;
		}
		return 0;
	}) */
	if (Qgrafi) { 
		grafiLinea(subJson, selectID, gra01); 
		} else {grafiBarra(subJson);}
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
 //}
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

function limpiasvg(qg) {
	if (qg==1) {
		$("#pGraficar").empty();
		$("#datoEjeX").empty();
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
}

function cuenta (queDato, elemento) {
	// en quedato tengo el id= del opcion ej edoCiv o regimen u ocupa y en 
	// elemento que parte seleccione ej soltero, bienes ... ó desempleado...
	var datos = [];
	var regresa = [];
	var listaMpios = [];
	var numMun = [];
	var tot_Mpios = 0;
	var pos_Mun = 0;
	var encontro = false;
	var queEdo = document.getElementById('entidades').value;  // variable que contiene el año (¡deberia cambiar el nombre!)
	//queEdo = quitaAcento(queEdo);
	//queEdo = quitaAcento("Querétaro"); // comentar esto
	
	/*var queMpio = document.getElementById('municipios').value;
	queMpio = quitaAcento(queMpio);
	//alert ("queMpio "+queMpio); // 001
	if (queMpio == '') { //todos los municipios
		queMpio = '000';
	}*/
	var j = 0;
	var myObj = {};
	var siCuenta = true;
	
	var esViol = document.getElementById("Violencia").checked;
	var ctrl = document.getElementsByName("xyz"); // de radios, un valor de usuaria, hechos o agresor
	for(var i=0;i<ctrl.length;i++) {
        if(ctrl[i].checked) {
			var sel = ctrl[i].value;
		}
	}
	sel += queEdo;
	
	for (var i in todoJson) {
        siCuenta = queOpcionEs(esViol, sel, i);
		
		//if (todoJson[i].estado.toUpperCase() == queEdo.toUpperCase() && siCuenta) { // <= parte este se puede quitar todos son querétaro
		if (siCuenta) { // <= parte este se puede quitar todos son querétaro
			//if ((todoJson[i].munici.toUpperCase() == queMpio) || (queMpio == "000")) {
				// no lo hago por mun ya que no tengo el dato numerico 001 solo el nombre AMEALCO, etc.
				// no implementado porque hay diferencias EL MARQUES EL_MARQUES; etc.
				
				if (elemento == todoJson[i][queDato]) { // elemento = soltero/a quedato = edoCiv
					// soltero = soltero
					for (ii=0; ii<tot_Mpios; ii++) { //busca ese munic en todo el vector de municipios listaMpios
						if (todoJson[i].munici == listaMpios[ii]) {
							// si lo encuentra amealco = amealco de ii=0 ó ii=5
							pos_Mun = ii
							encontro = true;
						}
					}
					if (encontro) {
						datos[pos_Mun]= datos[pos_Mun] + 1;
					}
					else {
						listaMpios.push(todoJson[i].munici);
						datos.push(1);
						tot_Mpios++;
						var numMpio = buscaNumMpio(todoJson[i].munici);
						numMun.push(numMpio);;
						//cosole.log(listaMpios[i]);
					}
					encontro = false;
				}
			//  } // if seleciona solo un municipio
		}
	}
	for (i=0;i<20;i++) {
		//a diferencia de fungral.js aqui la pos 0 corresponde a total, 1 amealco 1 pinal, etc, 19 otros
		regresa.push({muni:i,dato:0,cveMpio:i});
	}
	j=0;
	for (i in datos) {
		//*****IMPORTANTE CAMBIAR EL IN POR UN OF O ALGUN OTRO INCLUSO EL FOR NORMAL. ****
		var ij = parseInt(numMun[i]);
		if (regresa[ij].dato == 0) { 
			regresa[ij].muni = listaMpios[i];
			regresa[ij].dato = datos[i];	
			if (numMun[i] < 19) {
				j = j + datos[i]; // acumula datos para estatal
			}
			regresa[ij].cveMpio = numMun[i];
		} else {
			var temp = regresa[ij].dato + datos[i];
			regresa[ij].dato = temp;
			if (numMun[i] < 19) {
				j = j + datos[i];
			}
		}
		//regresa.push({muni:listaMpios[i],dato:datos[i],cveMpio:numMun[i]});
		
	}
	regresa[0].muni = "EDO";
	regresa[0].dato = j;
	regresa[0].cveMpio = "0";
	//datos.push({munici:todoJson[i].munici, dato:j});
	//alert ("son " + i +" datos=>" + datos);
	return regresa;
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
					{'mun':'OTRO','N':19},
					{'mun':'','N':20}];
	var temp = quitaAcento(strMpio);
	var regresa;
	var posi=-1;
	strMpio = temp;
	temp = quitaLinea (strMpio);
	strMpio = temp;
	temp = strMpio.toUpperCase();
	strMpio = temp;
	for (let x of lisMun){
		var a = strMpio.substring(0,6);
		var b = x.mun.substring(0,6);
		if (a == b) {
			regresa = x.N;
			posi = lisMun.indexOf(x);
		}
	}
	if (posi == -1) {
		return lisMun[18].N;
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