<?php
error_reporting(0);

//Inicializa  las variables de conexión y forza estos valores por defecto
$h='localhost'; //IP del Servidor donde se encuentra la BD postgres
$p='5432'; //Puerto de postgres
$d='mdm6data'; //Nombre de base de datos
$u='postgres'; //Nombre usuario BD de postgres
$s='ger2000'; //Contraseña usuario BD de postgres

$conn = pg_connect("host=$h port=$p dbname=$d user=$u password=$s");

if (!$conn) {
	?>
	<script language="javascript">
		alert("xyz Exiten problemas en Conexión BD, contacte a Soporte T\u00e9cnico...");
	</script>
	<?php
	exit;
}
?>








