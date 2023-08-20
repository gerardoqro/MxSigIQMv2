var fondoColor1 = '#808000';
var lineaColor1 = '#00ff00';

var traeContenido = function () {
    //cadena = "<div id='uno'><p>Hi</p>" + '<div><H1>Hola Crayola</H1></div>' + "</div>";
    var cadena = '<div style="position:absolute; width:100%; height:600px">' +
        '<button id="btnExtent" style="background-color:#F05A24; border-color:#368a55;color:white; cursor:pointer;"> Extent </button>' +'&nbsp;&nbsp;&nbsp;' +
        '<button id="btnSize" style="background-color:#005A24; border-color:#368a55;color:white; cursor:pointer;"> Size </button>' + '&nbsp;&nbsp;&nbsp;' +
        '<button id="btnZoom" style="background-color:#005A24; border-color:#368a55;color:white; cursor:pointer;"> Zoom </button>' + '&nbsp;&nbsp;&nbsp;' +
        '<button id="btnPoligono" style="background-color:#703124; border-color:#368a55;color:white; cursor:pointer;"> Pol&iacute;­gono </button><br><br>' +
        '<button id="btnNota"     style="background-color:#403124; border-color:#368a55;color:white; cursor:pointer;"> Info            </button>' + '&nbsp;&nbsp;&nbsp;'+
        '<button id="btnModal"    style="background-color:#F05171; border-color:#368a55;color:white; cursor:pointer;"> Modal </button>' +
        '<hr>' +
        '</div>' +
        '<div id="lista" style="position:absolute; top:60px; width:100%; height:600px"></div>';
    return cadena
}


var pagHtmlGra = function (caso) {
	switch (caso) {
		case 1:
			window.open("web/graGral.html", "new");
			break;
		case 2:
			window.open("web/index.html", "new");
			break;
		case 3:
			window.open("web/IndexPay.html", "new");
			break;
		}
}

// esta funcion se llama desde jquery.ui.dinamicPanel.js, ahora esta desactivada es otro botón no activo.
var entrada = function () {
    $("#mdm6DinamicPanel_toolSet").css({ "height": "1600px" });
    //ajaxMunicipios();
}

var borra_ventanaModal = function() {
	var cadena = '<div style="position:relative;">' +
	'<h1 id="btnAbreModal">'+
	'<button id="btnVentanaModal" onclick="pagHtmlGra(1);" style="background-color:#F05A24; border-color:#368a55;color:white; cursor:pointer;">Gr&aacute;fica (totales)</button>' +
	'&nbsp;&nbsp;' +'</h1>'+
	'<p>Al pulsar el bot&oacute;n se presentaran a continuaci&ocute;n una serie de gr&acute;ficas (tanto las de barras y de las de lineas estas est&acute;n agrupadas por cada municipio del Estado de Quer&ecute;taro y por la variable que se seleccione.</p>' +
	'<p>Cabe mencionar que la informaci&ocute;n se toma directamente de la base de dato (postgres) por lo que es muy importante que la misma se encuentre homogenea y validada ya que se toma en base a ella.</p>'+
	'<button id="btnVentanaModal" onclick="pagHtmlGra(2);" style="background-color:#F05A24; border-color:#368a55;color:white; cursor:pointer;">Gr&aacute;ficas (especificas)</button>' +
	'<button id="btnVentanaModal" onclick="pagHtmlGra(3);" style="background-color:#F05A24; border-color:#368a55;color:white; cursor:pointer;">Gr&aacute;fica Particular</button>' +
	'</div>';
	
	$("#mdm6DinamicPanel_toolSet").css({ "height": "300px" });
	$('#miWidgets').html(cadena); 
}

var ventanaModal = function() {
	//Esta funcion es llamada cuando se da clic a icono nuevo, llamada desde jquery.iui.dinamicPanel.js
	// src="js/funcPay.js"
	
	var cadena = '<div style="position:relative;">' +
		'<div id="opcEstados" class="left-w3-agile"></div>&nbsp; ' +
		'<div id="opcMun" class="left-w3-agile"></div>' +
		'</div>'+
		'<div class="bg-agile4" style="color: #000" id="radios">'+
		'<p><input type="radio" name="xyz" id="chUsuaria" class="ch_ab" value="usuaria" onchange="limpiasvg(1)" checked/>Usuaria (o) </p>'+
		'<p><input type="radio" name="xyz" id="chHechode" class="ch_ab" value="hechos" onchange="limpiasvg(1)"/>Hecho de Violencia</p>'+
		'<p><input type="radio" name="xyz" id="chAgresor" class="ch_ab" value="agresor" onchange="limpiasvg(1)"/>Persona Agresora</p>'+
		'</div>'+
		'<div class="bg-agile4" style="padding: 1px;">'+
		'<p style="color: #F61010">'+
		'<input type="checkbox" id="Violencia" placeholder="Violencia" required="" checked/> Caso de Violencia</p>'+
		'</div>'+
		'<div id="misCombos" class="tabcontent">'+
		'<div id="opcedadUs"></div>'+
		'<div id="opcedoCiv"></div>'+
		'<div id="opcregime"></div>'+
		'<div id="opcocupac"></div>'+
		'<div id="opcescola"></div>'+
		'<div id="opcnivelS"></div>'+
		'</div>'+
		'<div id="Totl" class="tabcontent">'+
		'</div>';
		//'<input type="button" onclick="printDiv(\'miImp\')" value="imprimir" />;';
	$("#mdm6DinamicPanel_toolSet").css({ "height": "300px" });
	$('#miWidgets').html(cadena); // el div se crea en jquery.ui.dinamicPanel.js
	iniciaFun(); // en funcPay.js
}

var darClic = function (ex) {
    //alert("Longitud: " + ex.lon + " - Latitud: " + ex.lat);
    MDM6('newNotification', { message: "Muestra Notificación", time: 5000 });
    return 
}

// function iniciatodo() {
	console.log("primera linea de iniciatodo");
	debugger;
var projectParams = {
/*    'panel': {
        'left': {
            width: '300px', //se especifica el ancho del panel izquierdo a desplegar
            content: traeContenido(),
            load: function () { }
        }
    },*/

    'onLoad': function() {
        entra_prje();
    },
    'onMoveEnd': function () { alert ("en función zoom")},
    'onZoomEnd': function () { },
    'btnTogglePanels': true
};

	if (typeof (projectParams) != "undefined") {
		MDM6('init', projectParams); //se descomenta esta linea

		MDM6("define", "onIdentify", function (e) {
			
			otraModal(e);
			//darClic(e);
			//ajaxUnMunicipio(e);
			//otraModal();
		});
	}
// }

function entra_prje() {
	//console.log("entro a var projectparams, en onload");
}

function otraModal () {
	        var params = {
            title: 'Otra Modal',
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
}