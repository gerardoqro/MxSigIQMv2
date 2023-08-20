<?php
session_start();
include_once('conexion.php');

header("Access-Control-Allow-Origin: *");

$opcion= trim($_REQUEST['opc']);  //parametro que se mando en ajax archivo init.js, 3 parametros

switch ($opcion){
    case '1': { //Consulta lista de municipios
		$vsql= "SELECT cve_mun, nom_mun, ST_AsText(the_geom) as wkt FROM mgm.municipios WHERE cve_ent = '22' ORDER BY 1";

		$tbl= pg_Exec($conn, $vsql);
		$rgs= pg_NumRows($tbl);

		if ($rgs>0) {
			for ($i=0;$i<$rgs;$i++){
				$rg = pg_Fetch_Object($tbl,$i);
				
				$lista[]= array("clave"   => $rg->cve_mun,
								"nombre"  => $rg->nom_mun,
								"wkt"     => $rg->wkt
						  );
			}
		} else {
			$lista[]= array("clave"  => '---',
							"nombre" => '---',
							"wkt"    => '---'
						  );
		}
	break;
	}
	
	case '2': {
		$lat = trim($_REQUEST['lat']);
		$lon = trim($_REQUEST['lon']);
				
		$vsql = "SELECT cve_ent, ST_AsText(the_geom) as wkt FROM mgm.estados WHERE ST_Within(ST_GeomFromText(";
		$vsql = $vsql."'POINT(".$lon." ".$lat.")',900913),the_geom)=true";
				
		$tbl = pg_Exec($conn, $vsql);
		$rgs = pg_NumRows($tbl);

		if ($rgs>0) {
			for ($i=0;$i<$rgs;$i++){
				$rg = pg_Fetch_Object($tbl,$i);
				
				$lista[]= array("cve_ent"  => $rg->cve_ent,
								"wkt"      => $rg->wkt
						  );
			}

			$json= json_encode($lista);
			
		} else {
			$lista[]= array("cve_ent"  => '---',
							"wkt"      => '---'
						  );
		}
	break;
	
	}
	case '3': {
		$vsql= "Select escolar_u, count(escolar_u) as numer from iqm.agresor2017_final group by escolar_u";
		$tbl= pg_Exec($conn, $vsql);
		$rgs= pg_NumRows($tbl);
		
		if ($rgs>0) {
			for ($i=0;$i<$rgs;$i++){
				$rg = pg_Fetch_Object($tbl,$i);
				
				$lista[]= array("esco"  => $rg->escolar_u,
								"cant"      => $rg->numer
						  );
			}

			$json= json_encode($lista);
			
		} else {
			$lista[]= array("cve_ent"  => '---',
							"wkt"      => '---'
						  );
		}
		break;
	}
	
}

$json= json_encode($lista);
pg_close($conn);

echo $json;
?>