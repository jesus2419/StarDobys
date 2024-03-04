<?php

// Incluir el archivo de conexión a la base de datos
include 'db.php';

// Consulta para obtener todos los usuarios
$sql = "SELECT * FROM test";
$resultado = $conexion->query($sql);

// Verificar si se obtuvieron resultados
if ($resultado->num_rows > 0) {
    // Convertir los resultados en un arreglo asociativo
    $usuarios = array();
    while ($fila = $resultado->fetch_assoc()) {
        $usuarios[] = $fila;
    }
    // Devolver los usuarios como JSON
    echo json_encode($usuarios);
} else {
    echo "No se encontraron usuarios";
}

// Cerrar la conexión a la base de datos
$conexion->close();

?>
