<?php
session_start();
include_once('conexion.php');

header("Access-Control-Allow-Origin: *");

$opcion= trim($_REQUEST['opc']);  //parametro que se mando en ajax archivo index.html /web

switch ($opcion){
	case '1': {
		$lista = array();
		for ($i=0;$i<12;$i++) {
			switch ($i){
				case 0:{
					$consulta = "SELECT entidad_u as ent, mpio_u as mun, caso_v, edad_u as eda, fec_nac_u as fec,
						lug_nac_u as lug, est_civ_u as eci, regimen_u as reg, escolar_u as esc, ocupacion_ as ocu, 
						dep_econ_u as dep, niv_socio_ as niv FROM iqm.c_usuaria_2017 ORDER BY ent, mun";	
					$tabla = "usuaria20171";
				break;}
				case 1:{
					$consulta = "SELECT entidad_he as ent, mpio_hec as mun, caso_v, edad_u as eda, 'N/A' as fec, 
						lug_hechos as lug, est_civ_u as eci, paren_agre as reg, escolar_u as esc, ocupacion_ as ocu,
						dep_econ_u as dep, niv_socio_ as niv FROM iqm.c_hecho_violencia_2017 ORDER BY ent, mun";
					$tabla = "hechos20171";
				break;}
				case 2:{
					$consulta = "SELECT entidad_a as ent, mpio_a as mun, caso_v, edad_a as eda, fec_nac_a as fec, 
						'SIN DATO' as lug, edo_civ_ag as eci, 'SIN DATO' as reg, escolar_a as esc, ocupacio01 as ocu, 
						'N/A' as dep, niv_soci01 as niv FROM iqm.c_persona_agresora_2017 ORDER BY ent, mun";
					$tabla = "agresor20171";
				break;}
				case 3:{
					$consulta = "SELECT nom_ent_us as ent, nom_mun_us as mun, violencia as caso_v, edad as eda, fecha_nac_ as fec, 
						lugar_nac_ as lug, estado_con as eci, regimen as reg, escolarida as esc, obrera_o__ as ocu, 
						'SIN DATO' as dep, niv_socio_ as niv FROM iqm.c_usuaria_2016 ORDER BY ent, mun";
					$tabla = "usuaria20161";
				break;}
				case 4:{
					$consulta = "SELECT nom_ent_us as ent, nom_mun_us as mun, violencia as caso_v, edad as eda, 'N/A' as fec, 
						lug_ocu_vi lug, estado_con as eci, paren_agre as reg, escolarida as esc, obrera_o__ as ocu, 
						'SIN DATO' as dep, niv_socio_ as niv FROM iqm.c_hecho_violencia_2016 ORDER BY ent, mun";
					$tabla = "hechos20161";
				break;
				}case 5:{
					$consulta = "SELECT nom_ent_ag as ent, mun_agre as mun, violencia as caso_v, edad_agre as eda, fecha_nac0 as fec, 
						'SIN DATO' as lug, estado_co0 as eci, regimen_ag as reg, niv_inst_a as esc, ocu_agre as ocu, 
						'N/A' as dep, niv_soci_a as niv FROM iqm.c_persona_agresora_2016 ORDER BY ent, mun";
					$tabla = "agresor20161";
				break;
				}case 6: {
					$consulta = "SELECT entidad_u as ent, mpio_u as mun, caso_v, edad_u as eda, fec_nac_u as fec, 
						lug_nac_u as lug, est_civ_u as eci, regimen_u as reg, escolar_u as esc, ocupacionu as ocu, 
						dep_econ_u as dep, niv_sociou as niv FROM iqm.c_usuaria_2018 ORDER BY ent, mun";
					$tabla = "usuaria20181";
				break;
				}case 7: {
					$consulta = "SELECT entidad_he as ent, mpio_hec as mun, caso_v as caso_v, 'N/A' as eda, 'N/A' as fec, 
						lug_hechos as lug, est_civ_u as eci, paren_agre as reg, escolar_u as esc, ocupacion_ as ocu, 
						dep_econ_u as dep, niv_socio_ as niv FROM iqm.c_hechos_1er_trim_2018 ORDER BY ent, mun";
					$tabla = "hechos20181";
				break;
				}case 8:{
					$consulta = "SELECT entidad_a as ent, mpio_a as mun, caso_v as caso_v, edad_a as eda, fec_nac_a as fec, 
						'SIN DATO' as lug, edo_civ_a as eci, 'SIN DATO' as reg, escolar_a as esc, ocupacio01 as ocu, 
						'N/A' as dep, niv_soci01 as niv FROM iqm.c_persona_agresora_1er_trim_2018 ORDER BY ent, mun";
					$tabla = "agresor20181";
				break;
				// cambiar las tablas de hechos y agresor por la nuevas 2018 totales (Lulú).
				} /* case 10:{
					$consulta = "SELECT entidad_he as ent, mpio_hec as mun, caso_v as caso_v, 'N/A' as eda, 'N/A' as fec, 
						lug_hechos as lug, est_civ_u as eci, paren_agre as reg, escolar_u as esc, ocupacion_ as ocu, 
						dep_econ_u as dep, niv_socio_ as niv FROM iqm.c_hechos_2do_trim_2018 ORDER BY ent, mun";
					$tabla = "hechos20182";
				break;
				}case 11:{
					$consulta = "SELECT entidad_a as ent, mpio_a as mun, caso_v as caso_v, edad_a as eda, fec_nac_a as fec, 
						'SIN DATO' as lug, edo_civ_ag as eci, 'SIN DATO' as reg, escolar_a as esc, ocupacio01 as ocu, 
						'N/A' as dep, niv_soci01 as niv FROM iqm.c_persona_agresora_2do_trim_2018 ORDER BY ent, mun";
					$tabla = "agresor20182";
				break;
				}
				*/
			} 
			$resultado=pg_query($consulta) or die('La consulta 1 fallo: ' . pg_last_error() . $i);
			$tbl= pg_Exec($conn, $consulta);
			$nFilas = pg_NumRows($tbl);
			for ($j=0;$j<$nFilas;$j++){
				$rg = pg_Fetch_Object($tbl,$j);
				//$wkt=$row[wkt];
				$lista[]=array(	"tablax"=>$tabla,
								"estado"=>$rg->ent,
								"munici"=>$rg->mun,
								"casoVi"=>$rg->caso_v,
								"edadUs"=>$rg->eda,
								"fechaN"=>$rg->fec,
								"LugarN"=>$rg->lug, 
								"edoCiv"=>$rg->eci, 
								"regime"=>$rg->reg,
								"escola"=>$rg->esc,
								"ocupac"=>$rg->ocu, 
								"depend"=>$rg->dep, 
								"nivelS"=>$rg->niv);
			}			
		}

		break;
	}
	case '2': {
	
		$consulta = "SELECT nom_ent, nom_mun, caso_v, edad_u, fec_nac_u, lug_nac_u, est_civ_u, regimen_u, escolar_u, ocupacion_, dep_econ_u, niv_socio_ FROM iqm.c_usuaria_2017 ORDER BY nom_ent, nom_mun";
		$resultado=pg_query($consulta) or die('La consulta 1 fallo: ' . pg_last_error());
		$tbl= pg_Exec($conn, $consulta);
		$nFilas = pg_NumRows($tbl);
		$lista = array();
		
		for ($i=0;$i<$nFilas;$i++){
			$rg = pg_Fetch_Object($tbl,$i);

				//$wkt=$row[wkt];
				
				$lista[]=array(	"tablax"=>"usuaria2017",
								"estado"=>$rg->nom_ent,
								"munici"=>$rg->nom_mun,
								"casoVi"=>$rg->caso_v,
								"edadUs"=>$rg->edad_u,
								"fechaN"=>$rg->fec_nac_u,
								"LugarN"=>$rg->lug_nac_u, 
								"edoCiv"=>$rg->est_civ_u, 
								"regime"=>$rg->regimen_u,
								"escola"=>$rg->escolar_u,
								"ocupac"=>$rg->ocupacion_, 
								"depend"=>$rg->dep_econ_u, 
								"nivelS"=>$rg->niv_socio_);
		}
		$consulta = "SELECT nom_ent, nom_mun, caso_v, edad_u, fec_nac_u, lug_nac_u, est_civ_u, regimen_u, escolar_u, ocupacion_, dep_econ_u, niv_socio_ FROM iqm.c_hecho_violencia_2017 ORDER BY nom_ent, nom_mun";
		$resultado=pg_query($consulta) or die('La consulta 2 fallo: ' . pg_last_error());
		$tbl= pg_Exec($conn, $consulta);
		$nFilas = pg_NumRows($tbl);
		//$lista = array();

		for ($i=0;$i<$nFilas;$i++){
			$rg = pg_Fetch_Object($tbl,$i);

				//$wkt=$row[wkt];
				
				$lista[]=array(	"tablax"=>"hechos2017",
								"estado"=>$rg->nom_ent,
								"munici"=>$rg->nom_mun,
								"casoVi"=>$rg->caso_v,
								"edadUs"=>$rg->edad_u,
								"fechaN"=>$rg->fec_nac_u,
								"LugarN"=>$rg->lug_nac_u, 
								"edoCiv"=>$rg->est_civ_u, 
								"regime"=>$rg->regimen_u,
								"escola"=>$rg->escolar_u,
								"ocupac"=>$rg->ocupacion_, 
								"depend"=>$rg->dep_econ_u, 
								"nivelS"=>$rg->niv_socio_);
		}
		
		$consulta = "SELECT entidad_a, nom_mun, caso_v, edad_u, fec_nac_u, lug_nac_u, est_civ_u, regimen_u, escolar_u, ocupacion_, dep_econ_u, niv_socio_ FROM iqm.c_persona_agresora_2017 ORDER BY entidad_a, nom_mun";
		$resultado=pg_query($consulta) or die('La consulta 3 fallo: ' . pg_last_error());
		$tbl= pg_Exec($conn, $consulta);
		$nFilas = pg_NumRows($tbl);
	
		for ($i=0;$i<$nFilas;$i++){
			$rg = pg_Fetch_Object($tbl,$i);

				//$wkt=$row[wkt];
				
				$lista[]=array(	"tablax"=>"agresor2017",
								"estado"=>$rg->entidad_a,
								"munici"=>$rg->nom_mun,
								"casoVi"=>$rg->caso_v,
								"edadUs"=>$rg->edad_u,
								"fechaN"=>$rg->fec_nac_u,
								"LugarN"=>$rg->lug_nac_u, 
								"edoCiv"=>$rg->est_civ_u, 
								"regime"=>$rg->regimen_u,
								"escola"=>$rg->escolar_u,
								"ocupac"=>$rg->ocupacion_, 
								"depend"=>$rg->dep_econ_u, 
								"nivelS"=>$rg->niv_socio_);
		}

		break;
}
case 3: {
		$consulta  = "SELECT nom_ent, nom_mun, caso_v, edad_u, fec_nac_u, lug_nac_u, est_civ_u, regimen_u, escolar_u, ocupacion_, dep_econ_u, niv_socio_ FROM iqm.usuaria2017_final 
			UNION ALL SELECT nom_ent, nom_mun, caso_v, edad_u, fec_nac_u, lug_nac_u, est_civ_u, regimen_u, escolar_u, ocupacion_, dep_econ_u, niv_socio_ FROM iqm.agresor2017_final 
			UNION ALL SELECT nom_ent, nom_mun, caso_v, edad_u, fec_nac_u, lug_nac_u, est_civ_u, regimen_u, escolar_u, ocupacion_, dep_econ_u, niv_socio_ FROM iqm.hecho2017_final ORDER BY nom_ent, nom_mun";
		$resultado=pg_query($consulta) or die('La consulta fallo: ' . pg_last_error());
		$tbl= pg_Exec($conn, $consulta);
		$nFilas = pg_NumRows($tbl);
		$lista = array();

		for ($i=0;$i<$nFilas;$i++){
			$rg = pg_Fetch_Object($tbl,$i);

				//$wkt=$row[wkt];
				
				$lista[]=array(	"estado"=>$rg->nom_ent,
								"munici"=>$rg->nom_mun,
								"casoVi"=>$rg->caso_v,
								"edadUs"=>$rg->edad_u,
								"fechaN"=>$rg->fec_nac_u,
								"LugarN"=>$rg->lug_nac_u, 
								"edoCiv"=>$rg->est_civ_u, 
								"regime"=>$rg->regimen_u,
								"escola"=>$rg->escolar_u,
								"ocupac"=>$rg->ocupacion_, 
								"depend"=>$rg->dep_econ_u, 
								"nivelS"=>$rg->niv_socio_);
		}
		break;
	}
} // del switch


$json= json_encode($lista);
pg_close($conn);

echo $json;
?>